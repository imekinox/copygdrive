

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."queue_status" AS ENUM (
    'pending',
    'processing',
    'completed',
    'failed',
    'retrying'
);


ALTER TYPE "public"."queue_status" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."auto_queue_job"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
        BEGIN
          -- Handle both 'pending' and 'queued' statuses
          IF NEW.status IN ('pending', 'queued') THEN
            INSERT INTO job_queue (job_id, status)
            VALUES (NEW.id, 'pending')
            ON CONFLICT (job_id) DO NOTHING;
          END IF;
          RETURN NEW;
        END;
        $$;


ALTER FUNCTION "public"."auto_queue_job"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."claim_next_job"("p_worker_id" "text") RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_queue_id UUID;
BEGIN
  -- Find and lock the next available job
  SELECT id INTO v_queue_id
  FROM job_queue
  WHERE status IN ('pending', 'retrying')
    AND (next_retry_at IS NULL OR next_retry_at <= NOW())
  ORDER BY created_at
  LIMIT 1
  FOR UPDATE SKIP LOCKED;
  
  IF v_queue_id IS NOT NULL THEN
    -- Claim the job
    UPDATE job_queue
    SET 
      status = 'processing',
      worker_id = p_worker_id,
      started_at = COALESCE(started_at, NOW()),
      heartbeat_at = NOW(),
      attempt_count = attempt_count + 1
    WHERE id = v_queue_id;
  END IF;
  
  RETURN v_queue_id;
END;
$$;


ALTER FUNCTION "public"."claim_next_job"("p_worker_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."complete_job"("p_queue_id" "uuid", "p_worker_id" "text") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_updated BOOLEAN;
BEGIN
  UPDATE job_queue
  SET 
    status = 'completed',
    completed_at = NOW(),
    heartbeat_at = NOW()
  WHERE id = p_queue_id 
    AND worker_id = p_worker_id 
    AND status = 'processing';
  
  v_updated := FOUND;
  RETURN v_updated;
END;
$$;


ALTER FUNCTION "public"."complete_job"("p_queue_id" "uuid", "p_worker_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."fail_job"("p_queue_id" "uuid", "p_worker_id" "text", "p_error" "text", "p_retry" boolean DEFAULT true) RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_updated BOOLEAN;
  v_attempt_count INTEGER;
  v_max_attempts INTEGER;
BEGIN
  -- Get current attempt count
  SELECT attempt_count, max_attempts 
  INTO v_attempt_count, v_max_attempts
  FROM job_queue
  WHERE id = p_queue_id;
  
  IF p_retry AND v_attempt_count < v_max_attempts THEN
    -- Schedule retry with exponential backoff
    UPDATE job_queue
    SET 
      status = 'retrying',
      last_error = p_error,
      next_retry_at = NOW() + INTERVAL '1 minute' * POWER(2, v_attempt_count),
      heartbeat_at = NOW(),
      worker_id = NULL -- Release the job
    WHERE id = p_queue_id 
      AND worker_id = p_worker_id 
      AND status = 'processing';
  ELSE
    -- Mark as permanently failed
    UPDATE job_queue
    SET 
      status = 'failed',
      last_error = p_error,
      completed_at = NOW(),
      heartbeat_at = NOW()
    WHERE id = p_queue_id 
      AND worker_id = p_worker_id 
      AND status = 'processing';
  END IF;
  
  v_updated := FOUND;
  RETURN v_updated;
END;
$$;


ALTER FUNCTION "public"."fail_job"("p_queue_id" "uuid", "p_worker_id" "text", "p_error" "text", "p_retry" boolean) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, image)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."recover_stale_jobs"("p_stale_minutes" integer DEFAULT 5) RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_recovered INTEGER;
BEGIN
  UPDATE job_queue
  SET 
    status = 'retrying',
    worker_id = NULL,
    next_retry_at = NOW(),
    last_error = 'Worker heartbeat timeout'
  WHERE status = 'processing'
    AND heartbeat_at < NOW() - INTERVAL '1 minute' * p_stale_minutes;
  
  GET DIAGNOSTICS v_recovered = ROW_COUNT;
  RETURN v_recovered;
END;
$$;


ALTER FUNCTION "public"."recover_stale_jobs"("p_stale_minutes" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_job_heartbeat"("p_queue_id" "uuid", "p_worker_id" "text", "p_progress_data" "jsonb" DEFAULT NULL::"jsonb") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_updated BOOLEAN;
BEGIN
  UPDATE job_queue
  SET 
    heartbeat_at = NOW(),
    progress_data = COALESCE(p_progress_data, progress_data)
  WHERE id = p_queue_id 
    AND worker_id = p_worker_id 
    AND status = 'processing';
  
  v_updated := FOUND;
  RETURN v_updated;
END;
$$;


ALTER FUNCTION "public"."update_job_heartbeat"("p_queue_id" "uuid", "p_worker_id" "text", "p_progress_data" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."accounts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "type" "text" NOT NULL,
    "provider" "text" NOT NULL,
    "provider_account_id" "text" NOT NULL,
    "refresh_token" "text",
    "access_token" "text",
    "expires_at" bigint,
    "token_type" "text",
    "scope" "text",
    "id_token" "text",
    "session_state" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."accounts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."copy_items" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "job_id" "uuid" NOT NULL,
    "source_id" "text" NOT NULL,
    "source_name" "text" NOT NULL,
    "source_path" "text" NOT NULL,
    "mime_type" "text" NOT NULL,
    "size" "text",
    "new_id" "text",
    "status" "text" DEFAULT 'pending'::"text",
    "error" "text",
    "retry_count" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "copy_items_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'copying'::"text", 'completed'::"text", 'failed'::"text", 'skipped'::"text"])))
);


ALTER TABLE "public"."copy_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."copy_jobs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "source_folder_id" "text" NOT NULL,
    "source_folder_name" "text" NOT NULL,
    "dest_folder_id" "text" NOT NULL,
    "dest_folder_name" "text" NOT NULL,
    "status" "text" DEFAULT 'queued'::"text",
    "total_items" integer,
    "completed_items" integer DEFAULT 0,
    "failed_items" integer DEFAULT 0,
    "total_bytes" "text" DEFAULT '0'::"text",
    "copied_bytes" "text" DEFAULT '0'::"text",
    "credits_used" integer DEFAULT 0,
    "credits_reserved" integer DEFAULT 0,
    "error_message" "text",
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "prisma_job_id" "text",
    CONSTRAINT "copy_jobs_status_check" CHECK (("status" = ANY (ARRAY['queued'::"text", 'scanning'::"text", 'copying'::"text", 'completed'::"text", 'failed'::"text", 'cancelled'::"text"])))
);


ALTER TABLE "public"."copy_jobs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."credit_purchases" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "credits" integer NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "currency" "text" DEFAULT 'usd'::"text",
    "stripe_payment_intent_id" "text",
    "stripe_session_id" "text",
    "status" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "credit_purchases_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'completed'::"text", 'failed'::"text"])))
);


ALTER TABLE "public"."credit_purchases" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."job_queue" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "job_id" "uuid" NOT NULL,
    "status" "public"."queue_status" DEFAULT 'pending'::"public"."queue_status" NOT NULL,
    "worker_id" "text",
    "attempt_count" integer DEFAULT 0 NOT NULL,
    "max_attempts" integer DEFAULT 3 NOT NULL,
    "last_error" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "next_retry_at" timestamp with time zone,
    "heartbeat_at" timestamp with time zone,
    "current_item_id" "uuid",
    "progress_data" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    CONSTRAINT "valid_status_dates" CHECK (((("status" = 'pending'::"public"."queue_status") AND ("started_at" IS NULL)) OR (("status" = ANY (ARRAY['processing'::"public"."queue_status", 'retrying'::"public"."queue_status"])) AND ("started_at" IS NOT NULL)) OR (("status" = ANY (ARRAY['completed'::"public"."queue_status", 'failed'::"public"."queue_status"])) AND ("started_at" IS NOT NULL))))
);


ALTER TABLE "public"."job_queue" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."job_queue_status" AS
 SELECT "jq"."id",
    "jq"."job_id",
    "jq"."status",
    "jq"."worker_id",
    "jq"."attempt_count",
    "jq"."max_attempts",
    "jq"."last_error",
    "jq"."created_at",
    "jq"."started_at",
    "jq"."completed_at",
    "jq"."next_retry_at",
    "jq"."heartbeat_at",
    "jq"."current_item_id",
    "jq"."progress_data",
    "cj"."user_id",
    "cj"."source_folder_name" AS "source_name",
    "cj"."dest_folder_name" AS "destination_name",
    "cj"."total_items",
    "cj"."completed_items",
        CASE
            WHEN (("jq"."status" = 'processing'::"public"."queue_status") AND ("jq"."heartbeat_at" > ("now"() - '00:05:00'::interval))) THEN 'healthy'::"text"
            WHEN ("jq"."status" = 'processing'::"public"."queue_status") THEN 'stale'::"text"
            ELSE 'inactive'::"text"
        END AS "health_status"
   FROM ("public"."job_queue" "jq"
     JOIN "public"."copy_jobs" "cj" ON (("jq"."job_id" = "cj"."id")));


ALTER VIEW "public"."job_queue_status" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."oauth_accounts" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "provider" "text" NOT NULL,
    "provider_account_id" "text" NOT NULL,
    "refresh_token" "text",
    "access_token" "text",
    "expires_at" integer,
    "token_type" "text",
    "scope" "text",
    "id_token" "text",
    "session_state" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."oauth_accounts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "name" "text",
    "image" "text",
    "credits" integer DEFAULT 100,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "email_verified" timestamp with time zone
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."sessions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "session_token" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "expires" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."verification_tokens" (
    "identifier" "text" NOT NULL,
    "token" "text" NOT NULL,
    "expires" timestamp with time zone NOT NULL
);


ALTER TABLE "public"."verification_tokens" OWNER TO "postgres";


ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "accounts_provider_provider_account_id_key" UNIQUE ("provider", "provider_account_id");



ALTER TABLE ONLY "public"."copy_items"
    ADD CONSTRAINT "copy_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."copy_jobs"
    ADD CONSTRAINT "copy_jobs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."credit_purchases"
    ADD CONSTRAINT "credit_purchases_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."job_queue"
    ADD CONSTRAINT "job_queue_job_id_unique" UNIQUE ("job_id");



ALTER TABLE ONLY "public"."job_queue"
    ADD CONSTRAINT "job_queue_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."oauth_accounts"
    ADD CONSTRAINT "oauth_accounts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."oauth_accounts"
    ADD CONSTRAINT "oauth_accounts_provider_provider_account_id_key" UNIQUE ("provider", "provider_account_id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_session_token_key" UNIQUE ("session_token");



ALTER TABLE ONLY "public"."verification_tokens"
    ADD CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("identifier", "token");



CREATE INDEX "idx_accounts_user_id" ON "public"."accounts" USING "btree" ("user_id");



CREATE INDEX "idx_copy_items_job" ON "public"."copy_items" USING "btree" ("job_id");



CREATE INDEX "idx_copy_items_job_status" ON "public"."copy_items" USING "btree" ("job_id", "status");



CREATE INDEX "idx_copy_jobs_status" ON "public"."copy_jobs" USING "btree" ("status");



CREATE INDEX "idx_copy_jobs_user_status" ON "public"."copy_jobs" USING "btree" ("user_id", "status");



CREATE INDEX "idx_credit_purchases_user" ON "public"."credit_purchases" USING "btree" ("user_id");



CREATE INDEX "idx_queue_active" ON "public"."job_queue" USING "btree" ("worker_id", "heartbeat_at") WHERE ("status" = 'processing'::"public"."queue_status");



CREATE INDEX "idx_queue_job_id" ON "public"."job_queue" USING "btree" ("job_id");



CREATE INDEX "idx_queue_pending" ON "public"."job_queue" USING "btree" ("status", "next_retry_at") WHERE ("status" = ANY (ARRAY['pending'::"public"."queue_status", 'retrying'::"public"."queue_status"]));



CREATE INDEX "idx_sessions_token" ON "public"."sessions" USING "btree" ("session_token");



CREATE INDEX "idx_sessions_user_id" ON "public"."sessions" USING "btree" ("user_id");



CREATE OR REPLACE TRIGGER "trigger_auto_queue_job" AFTER INSERT ON "public"."copy_jobs" FOR EACH ROW EXECUTE FUNCTION "public"."auto_queue_job"();



CREATE OR REPLACE TRIGGER "update_copy_items_updated_at" BEFORE UPDATE ON "public"."copy_items" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_copy_jobs_updated_at" BEFORE UPDATE ON "public"."copy_jobs" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_oauth_accounts_updated_at" BEFORE UPDATE ON "public"."oauth_accounts" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_profiles_updated_at" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."copy_items"
    ADD CONSTRAINT "copy_items_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."copy_jobs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."copy_jobs"
    ADD CONSTRAINT "copy_jobs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."credit_purchases"
    ADD CONSTRAINT "credit_purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."job_queue"
    ADD CONSTRAINT "job_queue_current_item_id_fkey" FOREIGN KEY ("current_item_id") REFERENCES "public"."copy_items"("id");



ALTER TABLE ONLY "public"."job_queue"
    ADD CONSTRAINT "job_queue_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."copy_jobs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."oauth_accounts"
    ADD CONSTRAINT "oauth_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



CREATE POLICY "Service role has full access to accounts" ON "public"."accounts" USING ((("auth"."jwt"() ->> 'role'::"text") = 'service_role'::"text"));



CREATE POLICY "Service role has full access to sessions" ON "public"."sessions" USING ((("auth"."jwt"() ->> 'role'::"text") = 'service_role'::"text"));



CREATE POLICY "Service role has full access to verification_tokens" ON "public"."verification_tokens" USING ((("auth"."jwt"() ->> 'role'::"text") = 'service_role'::"text"));



CREATE POLICY "Users can create own jobs" ON "public"."copy_jobs" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete own jobs" ON "public"."copy_jobs" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage own oauth accounts" ON "public"."oauth_accounts" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own jobs" ON "public"."copy_jobs" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view own job items" ON "public"."copy_items" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."copy_jobs"
  WHERE (("copy_jobs"."id" = "copy_items"."job_id") AND ("copy_jobs"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can view own job queue entries" ON "public"."job_queue" FOR SELECT USING (("job_id" IN ( SELECT "copy_jobs"."id"
   FROM "public"."copy_jobs"
  WHERE ("copy_jobs"."user_id" = "auth"."uid"()))));



CREATE POLICY "Users can view own jobs" ON "public"."copy_jobs" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own oauth accounts" ON "public"."oauth_accounts" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own profile" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view own purchases" ON "public"."credit_purchases" FOR SELECT USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."accounts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."credit_purchases" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."job_queue" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."oauth_accounts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."sessions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."verification_tokens" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";






ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."copy_items";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."copy_jobs";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."job_queue";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."auto_queue_job"() TO "anon";
GRANT ALL ON FUNCTION "public"."auto_queue_job"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."auto_queue_job"() TO "service_role";



GRANT ALL ON FUNCTION "public"."claim_next_job"("p_worker_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."claim_next_job"("p_worker_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."claim_next_job"("p_worker_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."complete_job"("p_queue_id" "uuid", "p_worker_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."complete_job"("p_queue_id" "uuid", "p_worker_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."complete_job"("p_queue_id" "uuid", "p_worker_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."fail_job"("p_queue_id" "uuid", "p_worker_id" "text", "p_error" "text", "p_retry" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."fail_job"("p_queue_id" "uuid", "p_worker_id" "text", "p_error" "text", "p_retry" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."fail_job"("p_queue_id" "uuid", "p_worker_id" "text", "p_error" "text", "p_retry" boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."recover_stale_jobs"("p_stale_minutes" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."recover_stale_jobs"("p_stale_minutes" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."recover_stale_jobs"("p_stale_minutes" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_job_heartbeat"("p_queue_id" "uuid", "p_worker_id" "text", "p_progress_data" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."update_job_heartbeat"("p_queue_id" "uuid", "p_worker_id" "text", "p_progress_data" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_job_heartbeat"("p_queue_id" "uuid", "p_worker_id" "text", "p_progress_data" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";


















GRANT ALL ON TABLE "public"."accounts" TO "anon";
GRANT ALL ON TABLE "public"."accounts" TO "authenticated";
GRANT ALL ON TABLE "public"."accounts" TO "service_role";



GRANT ALL ON TABLE "public"."copy_items" TO "anon";
GRANT ALL ON TABLE "public"."copy_items" TO "authenticated";
GRANT ALL ON TABLE "public"."copy_items" TO "service_role";



GRANT ALL ON TABLE "public"."copy_jobs" TO "anon";
GRANT ALL ON TABLE "public"."copy_jobs" TO "authenticated";
GRANT ALL ON TABLE "public"."copy_jobs" TO "service_role";



GRANT ALL ON TABLE "public"."credit_purchases" TO "anon";
GRANT ALL ON TABLE "public"."credit_purchases" TO "authenticated";
GRANT ALL ON TABLE "public"."credit_purchases" TO "service_role";



GRANT ALL ON TABLE "public"."job_queue" TO "anon";
GRANT ALL ON TABLE "public"."job_queue" TO "authenticated";
GRANT ALL ON TABLE "public"."job_queue" TO "service_role";



GRANT ALL ON TABLE "public"."job_queue_status" TO "anon";
GRANT ALL ON TABLE "public"."job_queue_status" TO "authenticated";
GRANT ALL ON TABLE "public"."job_queue_status" TO "service_role";



GRANT ALL ON TABLE "public"."oauth_accounts" TO "anon";
GRANT ALL ON TABLE "public"."oauth_accounts" TO "authenticated";
GRANT ALL ON TABLE "public"."oauth_accounts" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."sessions" TO "anon";
GRANT ALL ON TABLE "public"."sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."sessions" TO "service_role";



GRANT ALL ON TABLE "public"."verification_tokens" TO "anon";
GRANT ALL ON TABLE "public"."verification_tokens" TO "authenticated";
GRANT ALL ON TABLE "public"."verification_tokens" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
