// Rate limiter for Google Drive API
// Respects Google's API quotas:
// - 20,000 requests per 100 seconds per user
// - 3 write requests per second sustained
// - 750 GB upload per day per user

interface RateLimiterOptions {
  maxRequestsPer100Seconds?: number
  maxWriteRequestsPerSecond?: number
  maxDailyUploadGB?: number
}

export class RateLimiter {
  private requestTimes: number[] = []
  private writeTimes: number[] = []
  private dailyUploadedBytes = 0
  private dailyUploadStartTime = Date.now()
  private dailyLimitExceeded = false
  private dailyLimitExceededAt: Date | null = null
  
  private readonly maxRequestsPer100Seconds: number
  private readonly maxWriteRequestsPerSecond: number
  private readonly maxDailyUploadGB: number
  private readonly maxDailyUploadBytes: number
  
  constructor(options: RateLimiterOptions = {}) {
    this.maxRequestsPer100Seconds = options.maxRequestsPer100Seconds || 10000 // Much more conservative
    this.maxWriteRequestsPerSecond = options.maxWriteRequestsPerSecond || 1 // Very conservative - 1 per second
    this.maxDailyUploadGB = options.maxDailyUploadGB || 740 // Leave 10GB buffer
    this.maxDailyUploadBytes = this.maxDailyUploadGB * 1024 * 1024 * 1024
  }
  
  // Check if we need to wait before making a request
  async waitForReadRequest(): Promise<void> {
    const now = Date.now()
    
    // Clean up old request times (older than 100 seconds)
    this.requestTimes = this.requestTimes.filter(time => now - time < 100000)
    
    // Check if we're at the limit
    if (this.requestTimes.length >= this.maxRequestsPer100Seconds) {
      // Calculate how long to wait
      const oldestRequest = this.requestTimes[0]
      const waitTime = 100000 - (now - oldestRequest) + 100 // Add 100ms buffer
      
      if (waitTime > 0) {
        console.log(`Rate limit: waiting ${waitTime}ms for read request`)
        await this.sleep(waitTime)
      }
    }
    
    // Record this request
    this.requestTimes.push(Date.now())
  }
  
  // Check if we need to wait before making a write request
  async waitForWriteRequest(sizeBytes: number = 0): Promise<void> {
    const now = Date.now()
    
    // First check general request limit
    await this.waitForReadRequest()
    
    // Clean up old write times (older than 1 second)
    this.writeTimes = this.writeTimes.filter(time => now - time < 1000)
    
    // Check write rate limit (3 per second)
    if (this.writeTimes.length >= this.maxWriteRequestsPerSecond) {
      const oldestWrite = this.writeTimes[0]
      const waitTime = 1000 - (now - oldestWrite) + 100 // Add 100ms buffer
      
      if (waitTime > 0) {
        console.log(`Rate limit: waiting ${waitTime}ms for write request`)
        await this.sleep(waitTime)
      }
    }
    
    // Check daily upload limit
    if (sizeBytes > 0) {
      // Reset daily counter if it's a new day
      if (now - this.dailyUploadStartTime > 24 * 60 * 60 * 1000) {
        this.dailyUploadedBytes = 0
        this.dailyUploadStartTime = now
      }
      
      // Check if this upload would exceed daily limit
      if (this.dailyUploadedBytes + sizeBytes > this.maxDailyUploadBytes) {
        const timeUntilReset = 24 * 60 * 60 * 1000 - (now - this.dailyUploadStartTime)
        throw new Error(`Daily upload limit reached (${this.maxDailyUploadGB}GB). Resets in ${Math.ceil(timeUntilReset / 1000 / 60)} minutes`)
      }
      
      this.dailyUploadedBytes += sizeBytes
    }
    
    // Record this write request
    this.writeTimes.push(Date.now())
  }
  
  // Helper to sleep for a given number of milliseconds
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  // Retry with exponential backoff for rate limit errors
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    isWrite: boolean = false,
    sizeBytes: number = 0,
    maxRetries: number = 5
  ): Promise<T> {
    let lastError: any
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Wait for rate limit
        if (isWrite) {
          await this.waitForWriteRequest(sizeBytes)
        } else {
          await this.waitForReadRequest()
        }
        
        // Execute the operation
        return await operation()
        
      } catch (error: any) {
        lastError = error
        
        // Log FULL error response for debugging
        console.log('═══════════════════════════════════════════════════════')
        console.log('🔴 GOOGLE DRIVE API ERROR - FULL RESPONSE:')
        console.log('═══════════════════════════════════════════════════════')
        console.log('Error Code:', error?.code)
        console.log('Error Status:', error?.status)
        console.log('Error Message:', error?.message)
        
        // Log errors array if present
        if (error?.errors) {
          console.log('\n📋 Error Details Array:')
          console.log(JSON.stringify(error.errors, null, 2))
        }
        
        // Log response if present
        if (error?.response) {
          console.log('\n📨 Response Object:')
          console.log('- Status:', error.response.status)
          console.log('- StatusText:', error.response.statusText)
          console.log('- Headers:', error.response.headers)
          if (error.response.data) {
            console.log('- Data:', JSON.stringify(error.response.data, null, 2))
          }
        }
        
        // Log config if present (shows request details)
        if (error?.config) {
          console.log('\n📤 Request Config:')
          console.log('- URL:', error.config.url)
          console.log('- Method:', error.config.method)
          console.log('- Headers:', error.config.headers)
        }
        
        console.log('═══════════════════════════════════════════════════════')
        
        // Extract quota information from error if available
        if (error?.errors?.[0]) {
          const errorDetail = error.errors[0]
          if (errorDetail.reason === 'userRateLimitExceeded' || errorDetail.reason === 'rateLimitExceeded') {
            console.log('\n⚠️ RATE LIMIT DETECTED:')
            console.log('- Domain:', errorDetail.domain)
            console.log('- Reason:', errorDetail.reason)
            console.log('- Message:', errorDetail.message)
            console.log('- Location:', errorDetail.location)
            console.log('- LocationType:', errorDetail.locationType)
            
            // Check if it's the daily limit
            if (errorDetail.message?.includes('750 GB') || errorDetail.message?.includes('daily')) {
              console.log('\n🚨 DAILY 750 GB UPLOAD LIMIT EXCEEDED!')
              // Store this information
              this.dailyLimitExceeded = true
              this.dailyLimitExceededAt = new Date()
            }
          }
        }
        
        // Check if it's a rate limit error
        if (error?.message?.includes('rate limit') || 
            error?.message?.includes('User rate limit exceeded') ||
            error?.code === 403 || 
            error?.code === 429) {
          
          // Exponential backoff: 1s, 2s, 4s, 8s, 16s
          const backoffTime = Math.pow(2, attempt) * 1000
          console.log(`Rate limit hit, retrying after ${backoffTime}ms (attempt ${attempt + 1}/${maxRetries})`)
          await this.sleep(backoffTime)
          
          // Clear recent requests to give more room
          const now = Date.now()
          this.requestTimes = this.requestTimes.filter(time => now - time > 5000)
          this.writeTimes = this.writeTimes.filter(time => now - time > 2000)
          
        } else {
          // Not a rate limit error, throw immediately
          throw error
        }
      }
    }
    
    // All retries exhausted
    throw lastError
  }
  
  // Get current rate limit status
  getStatus() {
    const now = Date.now()
    const recentRequests = this.requestTimes.filter(time => now - time < 100000).length
    const recentWrites = this.writeTimes.filter(time => now - time < 1000).length
    const dailyUploadedGB = this.dailyUploadedBytes / (1024 * 1024 * 1024)
    
    return {
      recentRequests,
      maxRequests: this.maxRequestsPer100Seconds,
      recentWrites,
      maxWrites: this.maxWriteRequestsPerSecond,
      dailyUploadedGB: dailyUploadedGB.toFixed(2),
      maxDailyGB: this.maxDailyUploadGB,
      dailyLimitExceeded: this.dailyLimitExceeded,
      dailyLimitExceededAt: this.dailyLimitExceededAt,
      timeUntilReset: this.dailyLimitExceededAt 
        ? Math.max(0, 24 * 60 * 60 * 1000 - (now - this.dailyLimitExceededAt.getTime()))
        : null
    }
  }
}

// Singleton instance per user
const rateLimiters = new Map<string, RateLimiter>()

export function getRateLimiter(userId: string): RateLimiter {
  if (!rateLimiters.has(userId)) {
    rateLimiters.set(userId, new RateLimiter())
  }
  return rateLimiters.get(userId)!
}