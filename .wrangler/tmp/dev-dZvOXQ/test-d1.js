var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/@prisma/client/runtime/wasm-engine-edge.js
var require_wasm_engine_edge = __commonJS({
  "node_modules/@prisma/client/runtime/wasm-engine-edge.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var Xo = Object.create;
    var kt = Object.defineProperty;
    var Zo = Object.getOwnPropertyDescriptor;
    var es = Object.getOwnPropertyNames;
    var ts = Object.getPrototypeOf;
    var rs = Object.prototype.hasOwnProperty;
    var ie = /* @__PURE__ */ __name((t, e) => () => (t && (e = t(t = 0)), e), "ie");
    var Fe = /* @__PURE__ */ __name((t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), "Fe");
    var nt = /* @__PURE__ */ __name((t, e) => {
      for (var r in e) kt(t, r, { get: e[r], enumerable: true });
    }, "nt");
    var mn = /* @__PURE__ */ __name((t, e, r, n) => {
      if (e && typeof e == "object" || typeof e == "function") for (let i of es(e)) !rs.call(t, i) && i !== r && kt(t, i, { get: /* @__PURE__ */ __name(() => e[i], "get"), enumerable: !(n = Zo(e, i)) || n.enumerable });
      return t;
    }, "mn");
    var it = /* @__PURE__ */ __name((t, e, r) => (r = t != null ? Xo(ts(t)) : {}, mn(e || !t || !t.__esModule ? kt(r, "default", { value: t, enumerable: true }) : r, t)), "it");
    var ns = /* @__PURE__ */ __name((t) => mn(kt({}, "__esModule", { value: true }), t), "ns");
    function xr(t, e) {
      if (e = e.toLowerCase(), e === "utf8" || e === "utf-8") return new y(as.encode(t));
      if (e === "base64" || e === "base64url") return t = t.replace(/-/g, "+").replace(/_/g, "/"), t = t.replace(/[^A-Za-z0-9+/]/g, ""), new y([...atob(t)].map((r) => r.charCodeAt(0)));
      if (e === "binary" || e === "ascii" || e === "latin1" || e === "latin-1") return new y([...t].map((r) => r.charCodeAt(0)));
      if (e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le") {
        let r = new y(t.length * 2), n = new DataView(r.buffer);
        for (let i = 0; i < t.length; i++) n.setUint16(i * 2, t.charCodeAt(i), true);
        return r;
      }
      if (e === "hex") {
        let r = new y(t.length / 2);
        for (let n = 0, i = 0; i < t.length; i += 2, n++) r[n] = parseInt(t.slice(i, i + 2), 16);
        return r;
      }
      dn(`encoding "${e}"`);
    }
    __name(xr, "xr");
    function is(t) {
      let r = Object.getOwnPropertyNames(DataView.prototype).filter((a) => a.startsWith("get") || a.startsWith("set")), n = r.map((a) => a.replace("get", "read").replace("set", "write")), i = /* @__PURE__ */ __name((a, f) => function(h = 0) {
        return V(h, "offset"), X(h, "offset"), $3(h, "offset", this.length - 1), new DataView(this.buffer)[r[a]](h, f);
      }, "i"), o = /* @__PURE__ */ __name((a, f) => function(h, C = 0) {
        let A = r[a].match(/set(\w+\d+)/)[1].toLowerCase(), k = ss[A];
        return V(C, "offset"), X(C, "offset"), $3(C, "offset", this.length - 1), os(h, "value", k[0], k[1]), new DataView(this.buffer)[r[a]](C, h, f), C + parseInt(r[a].match(/\d+/)[0]) / 8;
      }, "o"), s = /* @__PURE__ */ __name((a) => {
        a.forEach((f) => {
          f.includes("Uint") && (t[f.replace("Uint", "UInt")] = t[f]), f.includes("Float64") && (t[f.replace("Float64", "Double")] = t[f]), f.includes("Float32") && (t[f.replace("Float32", "Float")] = t[f]);
        });
      }, "s");
      n.forEach((a, f) => {
        a.startsWith("read") && (t[a] = i(f, false), t[a + "LE"] = i(f, true), t[a + "BE"] = i(f, false)), a.startsWith("write") && (t[a] = o(f, false), t[a + "LE"] = o(f, true), t[a + "BE"] = o(f, false)), s([a, a + "LE", a + "BE"]);
      });
    }
    __name(is, "is");
    function dn(t) {
      throw new Error(`Buffer polyfill does not implement "${t}"`);
    }
    __name(dn, "dn");
    function Dt(t, e) {
      if (!(t instanceof Uint8Array)) throw new TypeError(`The "${e}" argument must be an instance of Buffer or Uint8Array`);
    }
    __name(Dt, "Dt");
    function $3(t, e, r = cs + 1) {
      if (t < 0 || t > r) {
        let n = new RangeError(`The value of "${e}" is out of range. It must be >= 0 && <= ${r}. Received ${t}`);
        throw n.code = "ERR_OUT_OF_RANGE", n;
      }
    }
    __name($3, "$");
    function V(t, e) {
      if (typeof t != "number") {
        let r = new TypeError(`The "${e}" argument must be of type number. Received type ${typeof t}.`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(V, "V");
    function X(t, e) {
      if (!Number.isInteger(t) || Number.isNaN(t)) {
        let r = new RangeError(`The value of "${e}" is out of range. It must be an integer. Received ${t}`);
        throw r.code = "ERR_OUT_OF_RANGE", r;
      }
    }
    __name(X, "X");
    function os(t, e, r, n) {
      if (t < r || t > n) {
        let i = new RangeError(`The value of "${e}" is out of range. It must be >= ${r} and <= ${n}. Received ${t}`);
        throw i.code = "ERR_OUT_OF_RANGE", i;
      }
    }
    __name(os, "os");
    function pn(t, e) {
      if (typeof t != "string") {
        let r = new TypeError(`The "${e}" argument must be of type string. Received type ${typeof t}`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(pn, "pn");
    function ms(t, e = "utf8") {
      return y.from(t, e);
    }
    __name(ms, "ms");
    var y;
    var ss;
    var as;
    var ls;
    var us;
    var cs;
    var b;
    var Pr;
    var u = ie(() => {
      "use strict";
      y = class t extends Uint8Array {
        static {
          __name(this, "t");
        }
        _isBuffer = true;
        get offset() {
          return this.byteOffset;
        }
        static alloc(e, r = 0, n = "utf8") {
          return pn(n, "encoding"), t.allocUnsafe(e).fill(r, n);
        }
        static allocUnsafe(e) {
          return t.from(e);
        }
        static allocUnsafeSlow(e) {
          return t.from(e);
        }
        static isBuffer(e) {
          return e && !!e._isBuffer;
        }
        static byteLength(e, r = "utf8") {
          if (typeof e == "string") return xr(e, r).byteLength;
          if (e && e.byteLength) return e.byteLength;
          let n = new TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
          throw n.code = "ERR_INVALID_ARG_TYPE", n;
        }
        static isEncoding(e) {
          return us.includes(e);
        }
        static compare(e, r) {
          Dt(e, "buff1"), Dt(r, "buff2");
          for (let n = 0; n < e.length; n++) {
            if (e[n] < r[n]) return -1;
            if (e[n] > r[n]) return 1;
          }
          return e.length === r.length ? 0 : e.length > r.length ? 1 : -1;
        }
        static from(e, r = "utf8") {
          if (e && typeof e == "object" && e.type === "Buffer") return new t(e.data);
          if (typeof e == "number") return new t(new Uint8Array(e));
          if (typeof e == "string") return xr(e, r);
          if (ArrayBuffer.isView(e)) {
            let { byteOffset: n, byteLength: i, buffer: o } = e;
            return "map" in e && typeof e.map == "function" ? new t(e.map((s) => s % 256), n, i) : new t(o, n, i);
          }
          if (e && typeof e == "object" && ("length" in e || "byteLength" in e || "buffer" in e)) return new t(e);
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        static concat(e, r) {
          if (e.length === 0) return t.alloc(0);
          let n = [].concat(...e.map((o) => [...o])), i = t.alloc(r !== void 0 ? r : n.length);
          return i.set(r !== void 0 ? n.slice(0, r) : n), i;
        }
        slice(e = 0, r = this.length) {
          return this.subarray(e, r);
        }
        subarray(e = 0, r = this.length) {
          return Object.setPrototypeOf(super.subarray(e, r), t.prototype);
        }
        reverse() {
          return super.reverse(), this;
        }
        readIntBE(e, r) {
          V(e, "offset"), X(e, "offset"), $3(e, "offset", this.length - 1), V(r, "byteLength"), X(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i = i * 256 + n.getUint8(o);
          return n.getUint8(0) & 128 && (i -= Math.pow(256, r)), i;
        }
        readIntLE(e, r) {
          V(e, "offset"), X(e, "offset"), $3(e, "offset", this.length - 1), V(r, "byteLength"), X(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i += n.getUint8(o) * Math.pow(256, o);
          return n.getUint8(r - 1) & 128 && (i -= Math.pow(256, r)), i;
        }
        readUIntBE(e, r) {
          V(e, "offset"), X(e, "offset"), $3(e, "offset", this.length - 1), V(r, "byteLength"), X(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i = i * 256 + n.getUint8(o);
          return i;
        }
        readUintBE(e, r) {
          return this.readUIntBE(e, r);
        }
        readUIntLE(e, r) {
          V(e, "offset"), X(e, "offset"), $3(e, "offset", this.length - 1), V(r, "byteLength"), X(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i += n.getUint8(o) * Math.pow(256, o);
          return i;
        }
        readUintLE(e, r) {
          return this.readUIntLE(e, r);
        }
        writeIntBE(e, r, n) {
          return e = e < 0 ? e + Math.pow(256, n) : e, this.writeUIntBE(e, r, n);
        }
        writeIntLE(e, r, n) {
          return e = e < 0 ? e + Math.pow(256, n) : e, this.writeUIntLE(e, r, n);
        }
        writeUIntBE(e, r, n) {
          V(r, "offset"), X(r, "offset"), $3(r, "offset", this.length - 1), V(n, "byteLength"), X(n, "byteLength");
          let i = new DataView(this.buffer, r, n);
          for (let o = n - 1; o >= 0; o--) i.setUint8(o, e & 255), e = e / 256;
          return r + n;
        }
        writeUintBE(e, r, n) {
          return this.writeUIntBE(e, r, n);
        }
        writeUIntLE(e, r, n) {
          V(r, "offset"), X(r, "offset"), $3(r, "offset", this.length - 1), V(n, "byteLength"), X(n, "byteLength");
          let i = new DataView(this.buffer, r, n);
          for (let o = 0; o < n; o++) i.setUint8(o, e & 255), e = e / 256;
          return r + n;
        }
        writeUintLE(e, r, n) {
          return this.writeUIntLE(e, r, n);
        }
        toJSON() {
          return { type: "Buffer", data: Array.from(this) };
        }
        swap16() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 2) e.setUint16(r, e.getUint16(r, true), false);
          return this;
        }
        swap32() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 4) e.setUint32(r, e.getUint32(r, true), false);
          return this;
        }
        swap64() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 8) e.setBigUint64(r, e.getBigUint64(r, true), false);
          return this;
        }
        compare(e, r = 0, n = e.length, i = 0, o = this.length) {
          return Dt(e, "target"), V(r, "targetStart"), V(n, "targetEnd"), V(i, "sourceStart"), V(o, "sourceEnd"), $3(r, "targetStart"), $3(n, "targetEnd", e.length), $3(i, "sourceStart"), $3(o, "sourceEnd", this.length), t.compare(this.slice(i, o), e.slice(r, n));
        }
        equals(e) {
          return Dt(e, "otherBuffer"), this.length === e.length && this.every((r, n) => r === e[n]);
        }
        copy(e, r = 0, n = 0, i = this.length) {
          $3(r, "targetStart"), $3(n, "sourceStart", this.length), $3(i, "sourceEnd"), r >>>= 0, n >>>= 0, i >>>= 0;
          let o = 0;
          for (; n < i && !(this[n] === void 0 || e[r] === void 0); ) e[r] = this[n], o++, n++, r++;
          return o;
        }
        write(e, r, n, i = "utf8") {
          let o = typeof r == "string" ? 0 : r ?? 0, s = typeof n == "string" ? this.length - o : n ?? this.length - o;
          return i = typeof r == "string" ? r : typeof n == "string" ? n : i, V(o, "offset"), V(s, "length"), $3(o, "offset", this.length), $3(s, "length", this.length), (i === "ucs2" || i === "ucs-2" || i === "utf16le" || i === "utf-16le") && (s = s - s % 2), xr(e, i).copy(this, o, 0, s);
        }
        fill(e = 0, r = 0, n = this.length, i = "utf-8") {
          let o = typeof r == "string" ? 0 : r, s = typeof n == "string" ? this.length : n;
          if (i = typeof r == "string" ? r : typeof n == "string" ? n : i, e = t.from(typeof e == "number" ? [e] : e ?? [], i), pn(i, "encoding"), $3(o, "offset", this.length), $3(s, "end", this.length), e.length !== 0) for (let a = o; a < s; a += e.length) super.set(e.slice(0, e.length + a >= this.length ? this.length - a : e.length), a);
          return this;
        }
        includes(e, r = null, n = "utf-8") {
          return this.indexOf(e, r, n) !== -1;
        }
        lastIndexOf(e, r = null, n = "utf-8") {
          return this.indexOf(e, r, n, true);
        }
        indexOf(e, r = null, n = "utf-8", i = false) {
          let o = i ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
          n = typeof r == "string" ? r : n;
          let s = t.from(typeof e == "number" ? [e] : e, n), a = typeof r == "string" ? 0 : r;
          return a = typeof r == "number" ? a : null, a = Number.isNaN(a) ? null : a, a ??= i ? this.length : 0, a = a < 0 ? this.length + a : a, s.length === 0 && i === false ? a >= this.length ? this.length : a : s.length === 0 && i === true ? (a >= this.length ? this.length : a) || this.length : o((f, h) => (i ? h <= a : h >= a) && this[h] === s[0] && s.every((A, k) => this[h + k] === A));
        }
        toString(e = "utf8", r = 0, n = this.length) {
          if (r = r < 0 ? 0 : r, e = e.toString().toLowerCase(), n <= 0) return "";
          if (e === "utf8" || e === "utf-8") return ls.decode(this.slice(r, n));
          if (e === "base64" || e === "base64url") {
            let i = btoa(this.reduce((o, s) => o + Pr(s), ""));
            return e === "base64url" ? i.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : i;
          }
          if (e === "binary" || e === "ascii" || e === "latin1" || e === "latin-1") return this.slice(r, n).reduce((i, o) => i + Pr(o & (e === "ascii" ? 127 : 255)), "");
          if (e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le") {
            let i = new DataView(this.buffer.slice(r, n));
            return Array.from({ length: i.byteLength / 2 }, (o, s) => s * 2 + 1 < i.byteLength ? Pr(i.getUint16(s * 2, true)) : "").join("");
          }
          if (e === "hex") return this.slice(r, n).reduce((i, o) => i + o.toString(16).padStart(2, "0"), "");
          dn(`encoding "${e}"`);
        }
        toLocaleString() {
          return this.toString();
        }
        inspect() {
          return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
        }
      };
      ss = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, as = new TextEncoder(), ls = new TextDecoder(), us = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], cs = 4294967295;
      is(y.prototype);
      b = new Proxy(ms, { construct(t, [e, r]) {
        return y.from(e, r);
      }, get(t, e) {
        return y[e];
      } }), Pr = String.fromCodePoint;
    });
    var g;
    var x;
    var c = ie(() => {
      "use strict";
      g = { nextTick: /* @__PURE__ */ __name((t, ...e) => {
        setTimeout(() => {
          t(...e);
        }, 0);
      }, "nextTick"), env: {}, version: "", cwd: /* @__PURE__ */ __name(() => "/", "cwd"), stderr: {}, argv: ["/bin/node"], pid: 1e4 }, { cwd: x } = g;
    });
    var P;
    var m = ie(() => {
      "use strict";
      P = globalThis.performance ?? (() => {
        let t = Date.now();
        return { now: /* @__PURE__ */ __name(() => Date.now() - t, "now") };
      })();
    });
    var E;
    var p = ie(() => {
      "use strict";
      E = /* @__PURE__ */ __name(() => {
      }, "E");
      E.prototype = E;
    });
    var w;
    var d = ie(() => {
      "use strict";
      w = class {
        static {
          __name(this, "w");
        }
        value;
        constructor(e) {
          this.value = e;
        }
        deref() {
          return this.value;
        }
      };
    });
    function hn(t, e) {
      var r, n, i, o, s, a, f, h, C = t.constructor, A = C.precision;
      if (!t.s || !e.s) return e.s || (e = new C(t)), q ? L(e, A) : e;
      if (f = t.d, h = e.d, s = t.e, i = e.e, f = f.slice(), o = s - i, o) {
        for (o < 0 ? (n = f, o = -o, a = h.length) : (n = h, i = s, a = f.length), s = Math.ceil(A / N), a = s > a ? s + 1 : a + 1, o > a && (o = a, n.length = 1), n.reverse(); o--; ) n.push(0);
        n.reverse();
      }
      for (a = f.length, o = h.length, a - o < 0 && (o = a, n = h, h = f, f = n), r = 0; o; ) r = (f[--o] = f[o] + h[o] + r) / J | 0, f[o] %= J;
      for (r && (f.unshift(r), ++i), a = f.length; f[--a] == 0; ) f.pop();
      return e.d = f, e.e = i, q ? L(e, A) : e;
    }
    __name(hn, "hn");
    function ce(t, e, r) {
      if (t !== ~~t || t < e || t > r) throw Error(ke + t);
    }
    __name(ce, "ce");
    function ue(t) {
      var e, r, n, i = t.length - 1, o = "", s = t[0];
      if (i > 0) {
        for (o += s, e = 1; e < i; e++) n = t[e] + "", r = N - n.length, r && (o += Pe(r)), o += n;
        s = t[e], n = s + "", r = N - n.length, r && (o += Pe(r));
      } else if (s === 0) return "0";
      for (; s % 10 === 0; ) s /= 10;
      return o + s;
    }
    __name(ue, "ue");
    function bn(t, e) {
      var r, n, i, o, s, a, f = 0, h = 0, C = t.constructor, A = C.precision;
      if (j(t) > 16) throw Error(Tr + j(t));
      if (!t.s) return new C(te);
      for (e == null ? (q = false, a = A) : a = e, s = new C(0.03125); t.abs().gte(0.1); ) t = t.times(s), h += 5;
      for (n = Math.log(Oe(2, h)) / Math.LN10 * 2 + 5 | 0, a += n, r = i = o = new C(te), C.precision = a; ; ) {
        if (i = L(i.times(t), a), r = r.times(++f), s = o.plus(he(i, r, a)), ue(s.d).slice(0, a) === ue(o.d).slice(0, a)) {
          for (; h--; ) o = L(o.times(o), a);
          return C.precision = A, e == null ? (q = true, L(o, A)) : o;
        }
        o = s;
      }
    }
    __name(bn, "bn");
    function j(t) {
      for (var e = t.e * N, r = t.d[0]; r >= 10; r /= 10) e++;
      return e;
    }
    __name(j, "j");
    function vr(t, e, r) {
      if (e > t.LN10.sd()) throw q = true, r && (t.precision = r), Error(oe + "LN10 precision limit exceeded");
      return L(new t(t.LN10), e);
    }
    __name(vr, "vr");
    function Pe(t) {
      for (var e = ""; t--; ) e += "0";
      return e;
    }
    __name(Pe, "Pe");
    function ot(t, e) {
      var r, n, i, o, s, a, f, h, C, A = 1, k = 10, R = t, _ = R.d, O = R.constructor, D = O.precision;
      if (R.s < 1) throw Error(oe + (R.s ? "NaN" : "-Infinity"));
      if (R.eq(te)) return new O(0);
      if (e == null ? (q = false, h = D) : h = e, R.eq(10)) return e == null && (q = true), vr(O, h);
      if (h += k, O.precision = h, r = ue(_), n = r.charAt(0), o = j(R), Math.abs(o) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) R = R.times(t), r = ue(R.d), n = r.charAt(0), A++;
        o = j(R), n > 1 ? (R = new O("0." + r), o++) : R = new O(n + "." + r.slice(1));
      } else return f = vr(O, h + 2, D).times(o + ""), R = ot(new O(n + "." + r.slice(1)), h - k).plus(f), O.precision = D, e == null ? (q = true, L(R, D)) : R;
      for (a = s = R = he(R.minus(te), R.plus(te), h), C = L(R.times(R), h), i = 3; ; ) {
        if (s = L(s.times(C), h), f = a.plus(he(s, new O(i), h)), ue(f.d).slice(0, h) === ue(a.d).slice(0, h)) return a = a.times(2), o !== 0 && (a = a.plus(vr(O, h + 2, D).times(o + ""))), a = he(a, new O(A), h), O.precision = D, e == null ? (q = true, L(a, D)) : a;
        a = f, i += 2;
      }
    }
    __name(ot, "ot");
    function fn(t, e) {
      var r, n, i;
      for ((r = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (n = e.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +e.slice(n + 1), e = e.substring(0, n)) : r < 0 && (r = e.length), n = 0; e.charCodeAt(n) === 48; ) ++n;
      for (i = e.length; e.charCodeAt(i - 1) === 48; ) --i;
      if (e = e.slice(n, i), e) {
        if (i -= n, r = r - n - 1, t.e = Ne(r / N), t.d = [], n = (r + 1) % N, r < 0 && (n += N), n < i) {
          for (n && t.d.push(+e.slice(0, n)), i -= N; n < i; ) t.d.push(+e.slice(n, n += N));
          e = e.slice(n), n = N - e.length;
        } else n -= i;
        for (; n--; ) e += "0";
        if (t.d.push(+e), q && (t.e > It || t.e < -It)) throw Error(Tr + r);
      } else t.s = 0, t.e = 0, t.d = [0];
      return t;
    }
    __name(fn, "fn");
    function L(t, e, r) {
      var n, i, o, s, a, f, h, C, A = t.d;
      for (s = 1, o = A[0]; o >= 10; o /= 10) s++;
      if (n = e - s, n < 0) n += N, i = e, h = A[C = 0];
      else {
        if (C = Math.ceil((n + 1) / N), o = A.length, C >= o) return t;
        for (h = o = A[C], s = 1; o >= 10; o /= 10) s++;
        n %= N, i = n - N + s;
      }
      if (r !== void 0 && (o = Oe(10, s - i - 1), a = h / o % 10 | 0, f = e < 0 || A[C + 1] !== void 0 || h % o, f = r < 4 ? (a || f) && (r == 0 || r == (t.s < 0 ? 3 : 2)) : a > 5 || a == 5 && (r == 4 || f || r == 6 && (n > 0 ? i > 0 ? h / Oe(10, s - i) : 0 : A[C - 1]) % 10 & 1 || r == (t.s < 0 ? 8 : 7))), e < 1 || !A[0]) return f ? (o = j(t), A.length = 1, e = e - o - 1, A[0] = Oe(10, (N - e % N) % N), t.e = Ne(-e / N) || 0) : (A.length = 1, A[0] = t.e = t.s = 0), t;
      if (n == 0 ? (A.length = C, o = 1, C--) : (A.length = C + 1, o = Oe(10, N - n), A[C] = i > 0 ? (h / Oe(10, s - i) % Oe(10, i) | 0) * o : 0), f) for (; ; ) if (C == 0) {
        (A[0] += o) == J && (A[0] = 1, ++t.e);
        break;
      } else {
        if (A[C] += o, A[C] != J) break;
        A[C--] = 0, o = 1;
      }
      for (n = A.length; A[--n] === 0; ) A.pop();
      if (q && (t.e > It || t.e < -It)) throw Error(Tr + j(t));
      return t;
    }
    __name(L, "L");
    function wn(t, e) {
      var r, n, i, o, s, a, f, h, C, A, k = t.constructor, R = k.precision;
      if (!t.s || !e.s) return e.s ? e.s = -e.s : e = new k(t), q ? L(e, R) : e;
      if (f = t.d, A = e.d, n = e.e, h = t.e, f = f.slice(), s = h - n, s) {
        for (C = s < 0, C ? (r = f, s = -s, a = A.length) : (r = A, n = h, a = f.length), i = Math.max(Math.ceil(R / N), a) + 2, s > i && (s = i, r.length = 1), r.reverse(), i = s; i--; ) r.push(0);
        r.reverse();
      } else {
        for (i = f.length, a = A.length, C = i < a, C && (a = i), i = 0; i < a; i++) if (f[i] != A[i]) {
          C = f[i] < A[i];
          break;
        }
        s = 0;
      }
      for (C && (r = f, f = A, A = r, e.s = -e.s), a = f.length, i = A.length - a; i > 0; --i) f[a++] = 0;
      for (i = A.length; i > s; ) {
        if (f[--i] < A[i]) {
          for (o = i; o && f[--o] === 0; ) f[o] = J - 1;
          --f[o], f[i] += J;
        }
        f[i] -= A[i];
      }
      for (; f[--a] === 0; ) f.pop();
      for (; f[0] === 0; f.shift()) --n;
      return f[0] ? (e.d = f, e.e = n, q ? L(e, R) : e) : new k(0);
    }
    __name(wn, "wn");
    function De(t, e, r) {
      var n, i = j(t), o = ue(t.d), s = o.length;
      return e ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + Pe(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (i < 0 ? "e" : "e+") + i) : i < 0 ? (o = "0." + Pe(-i - 1) + o, r && (n = r - s) > 0 && (o += Pe(n))) : i >= s ? (o += Pe(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + Pe(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += Pe(n))), t.s < 0 ? "-" + o : o;
    }
    __name(De, "De");
    function gn(t, e) {
      if (t.length > e) return t.length = e, true;
    }
    __name(gn, "gn");
    function En(t) {
      var e, r, n;
      function i(o) {
        var s = this;
        if (!(s instanceof i)) return new i(o);
        if (s.constructor = i, o instanceof i) {
          s.s = o.s, s.e = o.e, s.d = (o = o.d) ? o.slice() : o;
          return;
        }
        if (typeof o == "number") {
          if (o * 0 !== 0) throw Error(ke + o);
          if (o > 0) s.s = 1;
          else if (o < 0) o = -o, s.s = -1;
          else {
            s.s = 0, s.e = 0, s.d = [0];
            return;
          }
          if (o === ~~o && o < 1e7) {
            s.e = 0, s.d = [o];
            return;
          }
          return fn(s, o.toString());
        } else if (typeof o != "string") throw Error(ke + o);
        if (o.charCodeAt(0) === 45 ? (o = o.slice(1), s.s = -1) : s.s = 1, ds.test(o)) fn(s, o);
        else throw Error(ke + o);
      }
      __name(i, "i");
      if (i.prototype = S, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = En, i.config = i.set = fs, t === void 0 && (t = {}), t) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], e = 0; e < n.length; ) t.hasOwnProperty(r = n[e++]) || (t[r] = this[r]);
      return i.config(t), i;
    }
    __name(En, "En");
    function fs(t) {
      if (!t || typeof t != "object") throw Error(oe + "Object expected");
      var e, r, n, i = ["precision", 1, Ue, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (e = 0; e < i.length; e += 3) if ((n = t[r = i[e]]) !== void 0) if (Ne(n) === n && n >= i[e + 1] && n <= i[e + 2]) this[r] = n;
      else throw Error(ke + r + ": " + n);
      if ((n = t[r = "LN10"]) !== void 0) if (n == Math.LN10) this[r] = new this(n);
      else throw Error(ke + r + ": " + n);
      return this;
    }
    __name(fs, "fs");
    var Ue;
    var ps;
    var Cr;
    var q;
    var oe;
    var ke;
    var Tr;
    var Ne;
    var Oe;
    var ds;
    var te;
    var J;
    var N;
    var yn;
    var It;
    var S;
    var he;
    var Cr;
    var Mt;
    var xn = ie(() => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      Ue = 1e9, ps = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, q = true, oe = "[DecimalError] ", ke = oe + "Invalid argument: ", Tr = oe + "Exponent out of range: ", Ne = Math.floor, Oe = Math.pow, ds = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, J = 1e7, N = 7, yn = 9007199254740991, It = Ne(yn / N), S = {};
      S.absoluteValue = S.abs = function() {
        var t = new this.constructor(this);
        return t.s && (t.s = 1), t;
      };
      S.comparedTo = S.cmp = function(t) {
        var e, r, n, i, o = this;
        if (t = new o.constructor(t), o.s !== t.s) return o.s || -t.s;
        if (o.e !== t.e) return o.e > t.e ^ o.s < 0 ? 1 : -1;
        for (n = o.d.length, i = t.d.length, e = 0, r = n < i ? n : i; e < r; ++e) if (o.d[e] !== t.d[e]) return o.d[e] > t.d[e] ^ o.s < 0 ? 1 : -1;
        return n === i ? 0 : n > i ^ o.s < 0 ? 1 : -1;
      };
      S.decimalPlaces = S.dp = function() {
        var t = this, e = t.d.length - 1, r = (e - t.e) * N;
        if (e = t.d[e], e) for (; e % 10 == 0; e /= 10) r--;
        return r < 0 ? 0 : r;
      };
      S.dividedBy = S.div = function(t) {
        return he(this, new this.constructor(t));
      };
      S.dividedToIntegerBy = S.idiv = function(t) {
        var e = this, r = e.constructor;
        return L(he(e, new r(t), 0, 1), r.precision);
      };
      S.equals = S.eq = function(t) {
        return !this.cmp(t);
      };
      S.exponent = function() {
        return j(this);
      };
      S.greaterThan = S.gt = function(t) {
        return this.cmp(t) > 0;
      };
      S.greaterThanOrEqualTo = S.gte = function(t) {
        return this.cmp(t) >= 0;
      };
      S.isInteger = S.isint = function() {
        return this.e > this.d.length - 2;
      };
      S.isNegative = S.isneg = function() {
        return this.s < 0;
      };
      S.isPositive = S.ispos = function() {
        return this.s > 0;
      };
      S.isZero = function() {
        return this.s === 0;
      };
      S.lessThan = S.lt = function(t) {
        return this.cmp(t) < 0;
      };
      S.lessThanOrEqualTo = S.lte = function(t) {
        return this.cmp(t) < 1;
      };
      S.logarithm = S.log = function(t) {
        var e, r = this, n = r.constructor, i = n.precision, o = i + 5;
        if (t === void 0) t = new n(10);
        else if (t = new n(t), t.s < 1 || t.eq(te)) throw Error(oe + "NaN");
        if (r.s < 1) throw Error(oe + (r.s ? "NaN" : "-Infinity"));
        return r.eq(te) ? new n(0) : (q = false, e = he(ot(r, o), ot(t, o), o), q = true, L(e, i));
      };
      S.minus = S.sub = function(t) {
        var e = this;
        return t = new e.constructor(t), e.s == t.s ? wn(e, t) : hn(e, (t.s = -t.s, t));
      };
      S.modulo = S.mod = function(t) {
        var e, r = this, n = r.constructor, i = n.precision;
        if (t = new n(t), !t.s) throw Error(oe + "NaN");
        return r.s ? (q = false, e = he(r, t, 0, 1).times(t), q = true, r.minus(e)) : L(new n(r), i);
      };
      S.naturalExponential = S.exp = function() {
        return bn(this);
      };
      S.naturalLogarithm = S.ln = function() {
        return ot(this);
      };
      S.negated = S.neg = function() {
        var t = new this.constructor(this);
        return t.s = -t.s || 0, t;
      };
      S.plus = S.add = function(t) {
        var e = this;
        return t = new e.constructor(t), e.s == t.s ? hn(e, t) : wn(e, (t.s = -t.s, t));
      };
      S.precision = S.sd = function(t) {
        var e, r, n, i = this;
        if (t !== void 0 && t !== !!t && t !== 1 && t !== 0) throw Error(ke + t);
        if (e = j(i) + 1, n = i.d.length - 1, r = n * N + 1, n = i.d[n], n) {
          for (; n % 10 == 0; n /= 10) r--;
          for (n = i.d[0]; n >= 10; n /= 10) r++;
        }
        return t && e > r ? e : r;
      };
      S.squareRoot = S.sqrt = function() {
        var t, e, r, n, i, o, s, a = this, f = a.constructor;
        if (a.s < 1) {
          if (!a.s) return new f(0);
          throw Error(oe + "NaN");
        }
        for (t = j(a), q = false, i = Math.sqrt(+a), i == 0 || i == 1 / 0 ? (e = ue(a.d), (e.length + t) % 2 == 0 && (e += "0"), i = Math.sqrt(e), t = Ne((t + 1) / 2) - (t < 0 || t % 2), i == 1 / 0 ? e = "5e" + t : (e = i.toExponential(), e = e.slice(0, e.indexOf("e") + 1) + t), n = new f(e)) : n = new f(i.toString()), r = f.precision, i = s = r + 3; ; ) if (o = n, n = o.plus(he(a, o, s + 2)).times(0.5), ue(o.d).slice(0, s) === (e = ue(n.d)).slice(0, s)) {
          if (e = e.slice(s - 3, s + 1), i == s && e == "4999") {
            if (L(o, r + 1, 0), o.times(o).eq(a)) {
              n = o;
              break;
            }
          } else if (e != "9999") break;
          s += 4;
        }
        return q = true, L(n, r);
      };
      S.times = S.mul = function(t) {
        var e, r, n, i, o, s, a, f, h, C = this, A = C.constructor, k = C.d, R = (t = new A(t)).d;
        if (!C.s || !t.s) return new A(0);
        for (t.s *= C.s, r = C.e + t.e, f = k.length, h = R.length, f < h && (o = k, k = R, R = o, s = f, f = h, h = s), o = [], s = f + h, n = s; n--; ) o.push(0);
        for (n = h; --n >= 0; ) {
          for (e = 0, i = f + n; i > n; ) a = o[i] + R[n] * k[i - n - 1] + e, o[i--] = a % J | 0, e = a / J | 0;
          o[i] = (o[i] + e) % J | 0;
        }
        for (; !o[--s]; ) o.pop();
        return e ? ++r : o.shift(), t.d = o, t.e = r, q ? L(t, A.precision) : t;
      };
      S.toDecimalPlaces = S.todp = function(t, e) {
        var r = this, n = r.constructor;
        return r = new n(r), t === void 0 ? r : (ce(t, 0, Ue), e === void 0 ? e = n.rounding : ce(e, 0, 8), L(r, t + j(r) + 1, e));
      };
      S.toExponential = function(t, e) {
        var r, n = this, i = n.constructor;
        return t === void 0 ? r = De(n, true) : (ce(t, 0, Ue), e === void 0 ? e = i.rounding : ce(e, 0, 8), n = L(new i(n), t + 1, e), r = De(n, true, t + 1)), r;
      };
      S.toFixed = function(t, e) {
        var r, n, i = this, o = i.constructor;
        return t === void 0 ? De(i) : (ce(t, 0, Ue), e === void 0 ? e = o.rounding : ce(e, 0, 8), n = L(new o(i), t + j(i) + 1, e), r = De(n.abs(), false, t + j(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
      };
      S.toInteger = S.toint = function() {
        var t = this, e = t.constructor;
        return L(new e(t), j(t) + 1, e.rounding);
      };
      S.toNumber = function() {
        return +this;
      };
      S.toPower = S.pow = function(t) {
        var e, r, n, i, o, s, a = this, f = a.constructor, h = 12, C = +(t = new f(t));
        if (!t.s) return new f(te);
        if (a = new f(a), !a.s) {
          if (t.s < 1) throw Error(oe + "Infinity");
          return a;
        }
        if (a.eq(te)) return a;
        if (n = f.precision, t.eq(te)) return L(a, n);
        if (e = t.e, r = t.d.length - 1, s = e >= r, o = a.s, s) {
          if ((r = C < 0 ? -C : C) <= yn) {
            for (i = new f(te), e = Math.ceil(n / N + 4), q = false; r % 2 && (i = i.times(a), gn(i.d, e)), r = Ne(r / 2), r !== 0; ) a = a.times(a), gn(a.d, e);
            return q = true, t.s < 0 ? new f(te).div(i) : L(i, n);
          }
        } else if (o < 0) throw Error(oe + "NaN");
        return o = o < 0 && t.d[Math.max(e, r)] & 1 ? -1 : 1, a.s = 1, q = false, i = t.times(ot(a, n + h)), q = true, i = bn(i), i.s = o, i;
      };
      S.toPrecision = function(t, e) {
        var r, n, i = this, o = i.constructor;
        return t === void 0 ? (r = j(i), n = De(i, r <= o.toExpNeg || r >= o.toExpPos)) : (ce(t, 1, Ue), e === void 0 ? e = o.rounding : ce(e, 0, 8), i = L(new o(i), t, e), r = j(i), n = De(i, t <= r || r <= o.toExpNeg, t)), n;
      };
      S.toSignificantDigits = S.tosd = function(t, e) {
        var r = this, n = r.constructor;
        return t === void 0 ? (t = n.precision, e = n.rounding) : (ce(t, 1, Ue), e === void 0 ? e = n.rounding : ce(e, 0, 8)), L(new n(r), t, e);
      };
      S.toString = S.valueOf = S.val = S.toJSON = S[Symbol.for("nodejs.util.inspect.custom")] = function() {
        var t = this, e = j(t), r = t.constructor;
        return De(t, e <= r.toExpNeg || e >= r.toExpPos);
      };
      he = /* @__PURE__ */ function() {
        function t(n, i) {
          var o, s = 0, a = n.length;
          for (n = n.slice(); a--; ) o = n[a] * i + s, n[a] = o % J | 0, s = o / J | 0;
          return s && n.unshift(s), n;
        }
        __name(t, "t");
        function e(n, i, o, s) {
          var a, f;
          if (o != s) f = o > s ? 1 : -1;
          else for (a = f = 0; a < o; a++) if (n[a] != i[a]) {
            f = n[a] > i[a] ? 1 : -1;
            break;
          }
          return f;
        }
        __name(e, "e");
        function r(n, i, o) {
          for (var s = 0; o--; ) n[o] -= s, s = n[o] < i[o] ? 1 : 0, n[o] = s * J + n[o] - i[o];
          for (; !n[0] && n.length > 1; ) n.shift();
        }
        __name(r, "r");
        return function(n, i, o, s) {
          var a, f, h, C, A, k, R, _, O, D, ye, z, F, Y, Se, Er, se, St, Ot = n.constructor, Yo = n.s == i.s ? 1 : -1, le = n.d, B = i.d;
          if (!n.s) return new Ot(n);
          if (!i.s) throw Error(oe + "Division by zero");
          for (f = n.e - i.e, se = B.length, Se = le.length, R = new Ot(Yo), _ = R.d = [], h = 0; B[h] == (le[h] || 0); ) ++h;
          if (B[h] > (le[h] || 0) && --f, o == null ? z = o = Ot.precision : s ? z = o + (j(n) - j(i)) + 1 : z = o, z < 0) return new Ot(0);
          if (z = z / N + 2 | 0, h = 0, se == 1) for (C = 0, B = B[0], z++; (h < Se || C) && z--; h++) F = C * J + (le[h] || 0), _[h] = F / B | 0, C = F % B | 0;
          else {
            for (C = J / (B[0] + 1) | 0, C > 1 && (B = t(B, C), le = t(le, C), se = B.length, Se = le.length), Y = se, O = le.slice(0, se), D = O.length; D < se; ) O[D++] = 0;
            St = B.slice(), St.unshift(0), Er = B[0], B[1] >= J / 2 && ++Er;
            do
              C = 0, a = e(B, O, se, D), a < 0 ? (ye = O[0], se != D && (ye = ye * J + (O[1] || 0)), C = ye / Er | 0, C > 1 ? (C >= J && (C = J - 1), A = t(B, C), k = A.length, D = O.length, a = e(A, O, k, D), a == 1 && (C--, r(A, se < k ? St : B, k))) : (C == 0 && (a = C = 1), A = B.slice()), k = A.length, k < D && A.unshift(0), r(O, A, D), a == -1 && (D = O.length, a = e(B, O, se, D), a < 1 && (C++, r(O, se < D ? St : B, D))), D = O.length) : a === 0 && (C++, O = [0]), _[h++] = C, a && O[0] ? O[D++] = le[Y] || 0 : (O = [le[Y]], D = 1);
            while ((Y++ < Se || O[0] !== void 0) && z--);
          }
          return _[0] || _.shift(), R.e = f, L(R, s ? o + j(R) + 1 : o);
        };
      }();
      Cr = En(ps);
      te = new Cr(1);
      Mt = Cr;
    });
    var v;
    var be;
    var l = ie(() => {
      "use strict";
      xn();
      v = class extends Mt {
        static {
          __name(this, "v");
        }
        static isDecimal(e) {
          return e instanceof Mt;
        }
        static random(e = 20) {
          {
            let n = globalThis.crypto.getRandomValues(new Uint8Array(e)).reduce((i, o) => i + o, "");
            return new Mt(`0.${n.slice(0, e)}`);
          }
        }
      }, be = v;
    });
    function Es() {
      return false;
    }
    __name(Es, "Es");
    function kr() {
      return { dev: 0, ino: 0, mode: 0, nlink: 0, uid: 0, gid: 0, rdev: 0, size: 0, blksize: 0, blocks: 0, atimeMs: 0, mtimeMs: 0, ctimeMs: 0, birthtimeMs: 0, atime: /* @__PURE__ */ new Date(), mtime: /* @__PURE__ */ new Date(), ctime: /* @__PURE__ */ new Date(), birthtime: /* @__PURE__ */ new Date() };
    }
    __name(kr, "kr");
    function xs() {
      return kr();
    }
    __name(xs, "xs");
    function Ps() {
      return [];
    }
    __name(Ps, "Ps");
    function vs(t) {
      t(null, []);
    }
    __name(vs, "vs");
    function Ts() {
      return "";
    }
    __name(Ts, "Ts");
    function Cs() {
      return "";
    }
    __name(Cs, "Cs");
    function As() {
    }
    __name(As, "As");
    function Rs() {
    }
    __name(Rs, "Rs");
    function Ss() {
    }
    __name(Ss, "Ss");
    function Os() {
    }
    __name(Os, "Os");
    function ks() {
    }
    __name(ks, "ks");
    function Ds() {
    }
    __name(Ds, "Ds");
    function Is() {
    }
    __name(Is, "Is");
    function Ms() {
    }
    __name(Ms, "Ms");
    function _s() {
      return { close: /* @__PURE__ */ __name(() => {
      }, "close"), on: /* @__PURE__ */ __name(() => {
      }, "on"), removeAllListeners: /* @__PURE__ */ __name(() => {
      }, "removeAllListeners") };
    }
    __name(_s, "_s");
    function Ls(t, e) {
      e(null, kr());
    }
    __name(Ls, "Ls");
    var Fs;
    var Us;
    var Nn;
    var qn = ie(() => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      Fs = {}, Us = { existsSync: Es, lstatSync: kr, stat: Ls, statSync: xs, readdirSync: Ps, readdir: vs, readlinkSync: Ts, realpathSync: Cs, chmodSync: As, renameSync: Rs, mkdirSync: Ss, rmdirSync: Os, rmSync: ks, unlinkSync: Ds, watchFile: Is, unwatchFile: Ms, watch: _s, promises: Fs }, Nn = Us;
    });
    function Ns(...t) {
      return t.join("/");
    }
    __name(Ns, "Ns");
    function qs(...t) {
      return t.join("/");
    }
    __name(qs, "qs");
    function Bs(t) {
      let e = Bn(t), r = Vn(t), [n, i] = e.split(".");
      return { root: "/", dir: r, base: e, ext: i, name: n };
    }
    __name(Bs, "Bs");
    function Bn(t) {
      let e = t.split("/");
      return e[e.length - 1];
    }
    __name(Bn, "Bn");
    function Vn(t) {
      return t.split("/").slice(0, -1).join("/");
    }
    __name(Vn, "Vn");
    function js(t) {
      let e = t.split("/").filter((i) => i !== "" && i !== "."), r = [];
      for (let i of e) i === ".." ? r.pop() : r.push(i);
      let n = r.join("/");
      return t.startsWith("/") ? "/" + n : n;
    }
    __name(js, "js");
    var jn;
    var Vs;
    var $s;
    var Qs;
    var Ut;
    var $n = ie(() => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      jn = "/", Vs = ":";
      $s = { sep: jn }, Qs = { basename: Bn, delimiter: Vs, dirname: Vn, join: qs, normalize: js, parse: Bs, posix: $s, resolve: Ns, sep: jn }, Ut = Qs;
    });
    var Qn = Fe((lm, Js) => {
      Js.exports = { name: "@prisma/internals", version: "6.15.0", description: "This package is intended for Prisma's internal use", main: "dist/index.js", types: "dist/index.d.ts", repository: { type: "git", url: "https://github.com/prisma/prisma.git", directory: "packages/internals" }, homepage: "https://www.prisma.io", author: "Tim Suchanek <suchanek@prisma.io>", bugs: "https://github.com/prisma/prisma/issues", license: "Apache-2.0", scripts: { dev: "DEV=true tsx helpers/build.ts", build: "tsx helpers/build.ts", test: "dotenv -e ../../.db.env -- jest --silent", prepublishOnly: "pnpm run build" }, files: ["README.md", "dist", "!**/libquery_engine*", "!dist/get-generators/engines/*", "scripts"], devDependencies: { "@babel/helper-validator-identifier": "7.25.9", "@opentelemetry/api": "1.9.0", "@swc/core": "1.11.5", "@swc/jest": "0.2.37", "@types/babel__helper-validator-identifier": "7.15.2", "@types/jest": "29.5.14", "@types/node": "18.19.76", "@types/resolve": "1.20.6", archiver: "6.0.2", "checkpoint-client": "1.1.33", "cli-truncate": "4.0.0", dotenv: "16.5.0", empathic: "2.0.0", esbuild: "0.25.5", "escape-string-regexp": "5.0.0", execa: "5.1.1", "fast-glob": "3.3.3", "find-up": "7.0.0", "fp-ts": "2.16.9", "fs-extra": "11.3.0", "fs-jetpack": "5.1.0", "global-dirs": "4.0.0", globby: "11.1.0", "identifier-regex": "1.0.0", "indent-string": "4.0.0", "is-windows": "1.0.2", "is-wsl": "3.1.0", jest: "29.7.0", "jest-junit": "16.0.0", kleur: "4.1.5", "mock-stdin": "1.0.0", "new-github-issue-url": "0.2.1", "node-fetch": "3.3.2", "npm-packlist": "5.1.3", open: "7.4.2", "p-map": "4.0.0", resolve: "1.22.10", "string-width": "7.2.0", "strip-ansi": "6.0.1", "strip-indent": "4.0.0", "temp-dir": "2.0.0", tempy: "1.0.1", "terminal-link": "4.0.0", tmp: "0.2.3", "ts-node": "10.9.2", "ts-pattern": "5.6.2", "ts-toolbelt": "9.6.0", typescript: "5.4.5", yarn: "1.22.22" }, dependencies: { "@prisma/config": "workspace:*", "@prisma/debug": "workspace:*", "@prisma/dmmf": "workspace:*", "@prisma/driver-adapter-utils": "workspace:*", "@prisma/engines": "workspace:*", "@prisma/fetch-engine": "workspace:*", "@prisma/generator": "workspace:*", "@prisma/generator-helper": "workspace:*", "@prisma/get-platform": "workspace:*", "@prisma/prisma-schema-wasm": "6.15.0-5.85179d7826409ee107a6ba334b5e305ae3fba9fb", "@prisma/schema-engine-wasm": "6.15.0-5.85179d7826409ee107a6ba334b5e305ae3fba9fb", "@prisma/schema-files-loader": "workspace:*", arg: "5.0.2", prompts: "2.4.2" }, peerDependencies: { typescript: ">=5.1.0" }, peerDependenciesMeta: { typescript: { optional: true } }, sideEffects: false };
    });
    var Hn = Fe((Ep, Kn) => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      Kn.exports = (t, e = 1, r) => {
        if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof t != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof t}\``);
        if (typeof e != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof e}\``);
        if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (e === 0) return t;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return t.replace(n, r.indent.repeat(e));
      };
    });
    var Xn = Fe((_p, Yn) => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      Yn.exports = ({ onlyFirst: t = false } = {}) => {
        let e = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(e, t ? void 0 : "g");
      };
    });
    var ei = Fe((Vp, Zn) => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      var ta = Xn();
      Zn.exports = (t) => typeof t == "string" ? t.replace(ta(), "") : t;
    });
    var Br = Fe((zy, oi) => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      oi.exports = /* @__PURE__ */ function() {
        function t(e, r, n, i, o) {
          return e < r || n < r ? e > n ? n + 1 : e + 1 : i === o ? r : r + 1;
        }
        __name(t, "t");
        return function(e, r) {
          if (e === r) return 0;
          if (e.length > r.length) {
            var n = e;
            e = r, r = n;
          }
          for (var i = e.length, o = r.length; i > 0 && e.charCodeAt(i - 1) === r.charCodeAt(o - 1); ) i--, o--;
          for (var s = 0; s < i && e.charCodeAt(s) === r.charCodeAt(s); ) s++;
          if (i -= s, o -= s, i === 0 || o < 3) return o;
          var a = 0, f, h, C, A, k, R, _, O, D, ye, z, F, Y = [];
          for (f = 0; f < i; f++) Y.push(f + 1), Y.push(e.charCodeAt(s + f));
          for (var Se = Y.length - 1; a < o - 3; ) for (D = r.charCodeAt(s + (h = a)), ye = r.charCodeAt(s + (C = a + 1)), z = r.charCodeAt(s + (A = a + 2)), F = r.charCodeAt(s + (k = a + 3)), R = a += 4, f = 0; f < Se; f += 2) _ = Y[f], O = Y[f + 1], h = t(_, h, C, D, O), C = t(h, C, A, ye, O), A = t(C, A, k, z, O), R = t(A, k, R, F, O), Y[f] = R, k = A, A = C, C = h, h = _;
          for (; a < o; ) for (D = r.charCodeAt(s + (h = a)), R = ++a, f = 0; f < Se; f += 2) _ = Y[f], Y[f] = R = t(_, h, R, D, Y[f + 1]), h = _;
          return R;
        };
      }();
    });
    var ci = ie(() => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
    });
    var mi = ie(() => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
    });
    var Li = Fe((YP, Ga) => {
      Ga.exports = { name: "@prisma/engines-version", version: "6.15.0-5.85179d7826409ee107a6ba334b5e305ae3fba9fb", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "85179d7826409ee107a6ba334b5e305ae3fba9fb" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.76", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var sr;
    var Fi = ie(() => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      sr = class {
        static {
          __name(this, "sr");
        }
        events = {};
        on(e, r) {
          return this.events[e] || (this.events[e] = []), this.events[e].push(r), this;
        }
        emit(e, ...r) {
          return this.events[e] ? (this.events[e].forEach((n) => {
            n(...r);
          }), true) : false;
        }
      };
    });
    var eu = {};
    nt(eu, { DMMF: /* @__PURE__ */ __name(() => pt, "DMMF"), Debug: /* @__PURE__ */ __name(() => G, "Debug"), Decimal: /* @__PURE__ */ __name(() => be, "Decimal"), Extensions: /* @__PURE__ */ __name(() => Ar, "Extensions"), MetricsClient: /* @__PURE__ */ __name(() => Ye, "MetricsClient"), PrismaClientInitializationError: /* @__PURE__ */ __name(() => I, "PrismaClientInitializationError"), PrismaClientKnownRequestError: /* @__PURE__ */ __name(() => Z, "PrismaClientKnownRequestError"), PrismaClientRustPanicError: /* @__PURE__ */ __name(() => Ee, "PrismaClientRustPanicError"), PrismaClientUnknownRequestError: /* @__PURE__ */ __name(() => Q, "PrismaClientUnknownRequestError"), PrismaClientValidationError: /* @__PURE__ */ __name(() => K, "PrismaClientValidationError"), Public: /* @__PURE__ */ __name(() => Rr, "Public"), Sql: /* @__PURE__ */ __name(() => ee, "Sql"), createParam: /* @__PURE__ */ __name(() => Ri, "createParam"), defineDmmfProperty: /* @__PURE__ */ __name(() => Mi, "defineDmmfProperty"), deserializeJsonResponse: /* @__PURE__ */ __name(() => et, "deserializeJsonResponse"), deserializeRawResult: /* @__PURE__ */ __name(() => br, "deserializeRawResult"), dmmfToRuntimeDataModel: /* @__PURE__ */ __name(() => ii, "dmmfToRuntimeDataModel"), empty: /* @__PURE__ */ __name(() => Ni, "empty"), getPrismaClient: /* @__PURE__ */ __name(() => Ko, "getPrismaClient"), getRuntime: /* @__PURE__ */ __name(() => Ae, "getRuntime"), join: /* @__PURE__ */ __name(() => Ui, "join"), makeStrictEnum: /* @__PURE__ */ __name(() => Ho, "makeStrictEnum"), makeTypedQueryFactory: /* @__PURE__ */ __name(() => _i, "makeTypedQueryFactory"), objectEnumValues: /* @__PURE__ */ __name(() => zt, "objectEnumValues"), raw: /* @__PURE__ */ __name(() => Hr, "raw"), serializeJsonQuery: /* @__PURE__ */ __name(() => nr, "serializeJsonQuery"), skip: /* @__PURE__ */ __name(() => rr, "skip"), sqltag: /* @__PURE__ */ __name(() => zr, "sqltag"), warnEnvConflicts: /* @__PURE__ */ __name(() => void 0, "warnEnvConflicts"), warnOnce: /* @__PURE__ */ __name(() => ut, "warnOnce") });
    module.exports = ns(eu);
    u();
    c();
    m();
    p();
    d();
    l();
    var Ar = {};
    nt(Ar, { defineExtension: /* @__PURE__ */ __name(() => Pn, "defineExtension"), getExtensionContext: /* @__PURE__ */ __name(() => vn, "getExtensionContext") });
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function Pn(t) {
      return typeof t == "function" ? t : (e) => e.$extends(t);
    }
    __name(Pn, "Pn");
    u();
    c();
    m();
    p();
    d();
    l();
    function vn(t) {
      return t;
    }
    __name(vn, "vn");
    var Rr = {};
    nt(Rr, { validator: /* @__PURE__ */ __name(() => Tn, "validator") });
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function Tn(...t) {
      return (e) => e;
    }
    __name(Tn, "Tn");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var Sr;
    var Cn;
    var An;
    var Rn;
    var Sn = true;
    typeof g < "u" && ({ FORCE_COLOR: Sr, NODE_DISABLE_COLORS: Cn, NO_COLOR: An, TERM: Rn } = g.env || {}, Sn = g.stdout && g.stdout.isTTY);
    var gs = { enabled: !Cn && An == null && Rn !== "dumb" && (Sr != null && Sr !== "0" || Sn) };
    function U(t, e) {
      let r = new RegExp(`\\x1b\\[${e}m`, "g"), n = `\x1B[${t}m`, i = `\x1B[${e}m`;
      return function(o) {
        return !gs.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
      };
    }
    __name(U, "U");
    var Xu = U(0, 0);
    var _t = U(1, 22);
    var Lt = U(2, 22);
    var Zu = U(3, 23);
    var On = U(4, 24);
    var ec = U(7, 27);
    var tc = U(8, 28);
    var rc = U(9, 29);
    var nc = U(30, 39);
    var qe = U(31, 39);
    var kn = U(32, 39);
    var Dn = U(33, 39);
    var In = U(34, 39);
    var ic = U(35, 39);
    var Mn = U(36, 39);
    var oc = U(37, 39);
    var _n = U(90, 39);
    var sc = U(90, 39);
    var ac = U(40, 49);
    var lc = U(41, 49);
    var uc = U(42, 49);
    var cc = U(43, 49);
    var mc = U(44, 49);
    var pc = U(45, 49);
    var dc = U(46, 49);
    var fc = U(47, 49);
    u();
    c();
    m();
    p();
    d();
    l();
    var ys = 100;
    var Ln = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var Ft = [];
    var Fn = Date.now();
    var hs = 0;
    var Or = typeof g < "u" ? g.env : {};
    globalThis.DEBUG ??= Or.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= Or.DEBUG_COLORS ? Or.DEBUG_COLORS === "true" : true;
    var st = { enable(t) {
      typeof t == "string" && (globalThis.DEBUG = t);
    }, disable() {
      let t = globalThis.DEBUG;
      return globalThis.DEBUG = "", t;
    }, enabled(t) {
      let e = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = e.some((i) => i === "" || i[0] === "-" ? false : t.match(RegExp(i.split("*").join(".*") + "$"))), n = e.some((i) => i === "" || i[0] !== "-" ? false : t.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return r && !n;
    }, log: /* @__PURE__ */ __name((...t) => {
      let [e, r, ...n] = t;
      (console.warn ?? console.log)(`${e} ${r}`, ...n);
    }, "log"), formatters: {} };
    function bs(t) {
      let e = { color: Ln[hs++ % Ln.length], enabled: st.enabled(t), namespace: t, log: st.log, extend: /* @__PURE__ */ __name(() => {
      }, "extend") }, r = /* @__PURE__ */ __name((...n) => {
        let { enabled: i, namespace: o, color: s, log: a } = e;
        if (n.length !== 0 && Ft.push([o, ...n]), Ft.length > ys && Ft.shift(), st.enabled(o) || i) {
          let f = n.map((C) => typeof C == "string" ? C : ws(C)), h = `+${Date.now() - Fn}ms`;
          Fn = Date.now(), a(o, ...f, h);
        }
      }, "r");
      return new Proxy(r, { get: /* @__PURE__ */ __name((n, i) => e[i], "get"), set: /* @__PURE__ */ __name((n, i, o) => e[i] = o, "set") });
    }
    __name(bs, "bs");
    var G = new Proxy(bs, { get: /* @__PURE__ */ __name((t, e) => st[e], "get"), set: /* @__PURE__ */ __name((t, e, r) => st[e] = r, "set") });
    function ws(t, e = 2) {
      let r = /* @__PURE__ */ new Set();
      return JSON.stringify(t, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (r.has(i)) return "[Circular *]";
          r.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
      }, e);
    }
    __name(ws, "ws");
    function Un() {
      Ft.length = 0;
    }
    __name(Un, "Un");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var Dr = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
    u();
    c();
    m();
    p();
    d();
    l();
    var Gs = Qn();
    var Ir = Gs.version;
    u();
    c();
    m();
    p();
    d();
    l();
    function Be(t) {
      let e = Ws();
      return e || (t?.config.engineType === "library" ? "library" : t?.config.engineType === "binary" ? "binary" : t?.config.engineType === "client" ? "client" : Ks(t));
    }
    __name(Be, "Be");
    function Ws() {
      let t = g.env.PRISMA_CLIENT_ENGINE_TYPE;
      return t === "library" ? "library" : t === "binary" ? "binary" : t === "client" ? "client" : void 0;
    }
    __name(Ws, "Ws");
    function Ks(t) {
      return t?.previewFeatures.includes("queryCompiler") ? "client" : "library";
    }
    __name(Ks, "Ks");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function Mr(t) {
      return t.name === "DriverAdapterError" && typeof t.cause == "object";
    }
    __name(Mr, "Mr");
    u();
    c();
    m();
    p();
    d();
    l();
    function Nt(t) {
      return { ok: true, value: t, map(e) {
        return Nt(e(t));
      }, flatMap(e) {
        return e(t);
      } };
    }
    __name(Nt, "Nt");
    function Ie(t) {
      return { ok: false, error: t, map() {
        return Ie(t);
      }, flatMap() {
        return Ie(t);
      } };
    }
    __name(Ie, "Ie");
    var Jn = G("driver-adapter-utils");
    var _r = class {
      static {
        __name(this, "_r");
      }
      registeredErrors = [];
      consumeError(e) {
        return this.registeredErrors[e];
      }
      registerNewError(e) {
        let r = 0;
        for (; this.registeredErrors[r] !== void 0; ) r++;
        return this.registeredErrors[r] = { error: e }, r;
      }
    };
    var qt = /* @__PURE__ */ __name((t, e = new _r()) => {
      let r = { adapterName: t.adapterName, errorRegistry: e, queryRaw: we(e, t.queryRaw.bind(t)), executeRaw: we(e, t.executeRaw.bind(t)), executeScript: we(e, t.executeScript.bind(t)), dispose: we(e, t.dispose.bind(t)), provider: t.provider, startTransaction: /* @__PURE__ */ __name(async (...n) => (await we(e, t.startTransaction.bind(t))(...n)).map((o) => Hs(e, o)), "startTransaction") };
      return t.getConnectionInfo && (r.getConnectionInfo = zs(e, t.getConnectionInfo.bind(t))), r;
    }, "qt");
    var Hs = /* @__PURE__ */ __name((t, e) => ({ adapterName: e.adapterName, provider: e.provider, options: e.options, queryRaw: we(t, e.queryRaw.bind(e)), executeRaw: we(t, e.executeRaw.bind(e)), commit: we(t, e.commit.bind(e)), rollback: we(t, e.rollback.bind(e)) }), "Hs");
    function we(t, e) {
      return async (...r) => {
        try {
          return Nt(await e(...r));
        } catch (n) {
          if (Jn("[error@wrapAsync]", n), Mr(n)) return Ie(n.cause);
          let i = t.registerNewError(n);
          return Ie({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(we, "we");
    function zs(t, e) {
      return (...r) => {
        try {
          return Nt(e(...r));
        } catch (n) {
          if (Jn("[error@wrapSync]", n), Mr(n)) return Ie(n.cause);
          let i = t.registerNewError(n);
          return Ie({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(zs, "zs");
    u();
    c();
    m();
    p();
    d();
    l();
    var Gn = "prisma+postgres";
    var Wn = `${Gn}:`;
    function Lr(t) {
      return t?.toString().startsWith(`${Wn}//`) ?? false;
    }
    __name(Lr, "Lr");
    var lt = {};
    nt(lt, { error: /* @__PURE__ */ __name(() => Zs, "error"), info: /* @__PURE__ */ __name(() => Xs, "info"), log: /* @__PURE__ */ __name(() => Ys, "log"), query: /* @__PURE__ */ __name(() => ea, "query"), should: /* @__PURE__ */ __name(() => zn, "should"), tags: /* @__PURE__ */ __name(() => at, "tags"), warn: /* @__PURE__ */ __name(() => Fr, "warn") });
    u();
    c();
    m();
    p();
    d();
    l();
    var at = { error: qe("prisma:error"), warn: Dn("prisma:warn"), info: Mn("prisma:info"), query: In("prisma:query") };
    var zn = { warn: /* @__PURE__ */ __name(() => !g.env.PRISMA_DISABLE_WARNINGS, "warn") };
    function Ys(...t) {
      console.log(...t);
    }
    __name(Ys, "Ys");
    function Fr(t, ...e) {
      zn.warn() && console.warn(`${at.warn} ${t}`, ...e);
    }
    __name(Fr, "Fr");
    function Xs(t, ...e) {
      console.info(`${at.info} ${t}`, ...e);
    }
    __name(Xs, "Xs");
    function Zs(t, ...e) {
      console.error(`${at.error} ${t}`, ...e);
    }
    __name(Zs, "Zs");
    function ea(t, ...e) {
      console.log(`${at.query} ${t}`, ...e);
    }
    __name(ea, "ea");
    u();
    c();
    m();
    p();
    d();
    l();
    function Bt(t, e) {
      if (!t) throw new Error(`${e}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
    }
    __name(Bt, "Bt");
    u();
    c();
    m();
    p();
    d();
    l();
    function Me(t, e) {
      throw new Error(e);
    }
    __name(Me, "Me");
    u();
    c();
    m();
    p();
    d();
    l();
    function Ur(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }
    __name(Ur, "Ur");
    u();
    c();
    m();
    p();
    d();
    l();
    function Vt(t, e) {
      let r = {};
      for (let n of Object.keys(t)) r[n] = e(t[n], n);
      return r;
    }
    __name(Vt, "Vt");
    u();
    c();
    m();
    p();
    d();
    l();
    function Nr(t, e) {
      if (t.length === 0) return;
      let r = t[0];
      for (let n = 1; n < t.length; n++) e(r, t[n]) < 0 && (r = t[n]);
      return r;
    }
    __name(Nr, "Nr");
    u();
    c();
    m();
    p();
    d();
    l();
    function re(t, e) {
      Object.defineProperty(t, "name", { value: e, configurable: true });
    }
    __name(re, "re");
    u();
    c();
    m();
    p();
    d();
    l();
    var ti = /* @__PURE__ */ new Set();
    var ut = /* @__PURE__ */ __name((t, e, ...r) => {
      ti.has(t) || (ti.add(t), Fr(e, ...r));
    }, "ut");
    var I = class t extends Error {
      static {
        __name(this, "t");
      }
      clientVersion;
      errorCode;
      retryable;
      constructor(e, r, n) {
        super(e), this.name = "PrismaClientInitializationError", this.clientVersion = r, this.errorCode = n, Error.captureStackTrace(t);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    };
    re(I, "PrismaClientInitializationError");
    u();
    c();
    m();
    p();
    d();
    l();
    var Z = class extends Error {
      static {
        __name(this, "Z");
      }
      code;
      meta;
      clientVersion;
      batchRequestIdx;
      constructor(e, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(e), this.name = "PrismaClientKnownRequestError", this.code = r, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    };
    re(Z, "PrismaClientKnownRequestError");
    u();
    c();
    m();
    p();
    d();
    l();
    var Ee = class extends Error {
      static {
        __name(this, "Ee");
      }
      clientVersion;
      constructor(e, r) {
        super(e), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    };
    re(Ee, "PrismaClientRustPanicError");
    u();
    c();
    m();
    p();
    d();
    l();
    var Q = class extends Error {
      static {
        __name(this, "Q");
      }
      clientVersion;
      batchRequestIdx;
      constructor(e, { clientVersion: r, batchRequestIdx: n }) {
        super(e), this.name = "PrismaClientUnknownRequestError", this.clientVersion = r, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    };
    re(Q, "PrismaClientUnknownRequestError");
    u();
    c();
    m();
    p();
    d();
    l();
    var K = class extends Error {
      static {
        __name(this, "K");
      }
      name = "PrismaClientValidationError";
      clientVersion;
      constructor(e, { clientVersion: r }) {
        super(e), this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    };
    re(K, "PrismaClientValidationError");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var me = class {
      static {
        __name(this, "me");
      }
      _map = /* @__PURE__ */ new Map();
      get(e) {
        return this._map.get(e)?.value;
      }
      set(e, r) {
        this._map.set(e, { value: r });
      }
      getOrCreate(e, r) {
        let n = this._map.get(e);
        if (n) return n.value;
        let i = r();
        return this.set(e, i), i;
      }
    };
    u();
    c();
    m();
    p();
    d();
    l();
    function ve(t) {
      return t.substring(0, 1).toLowerCase() + t.substring(1);
    }
    __name(ve, "ve");
    u();
    c();
    m();
    p();
    d();
    l();
    function ni(t, e) {
      let r = {};
      for (let n of t) {
        let i = n[e];
        r[i] = n;
      }
      return r;
    }
    __name(ni, "ni");
    u();
    c();
    m();
    p();
    d();
    l();
    function ct(t) {
      let e;
      return { get() {
        return e || (e = { value: t() }), e.value;
      } };
    }
    __name(ct, "ct");
    u();
    c();
    m();
    p();
    d();
    l();
    function ii(t) {
      return { models: qr(t.models), enums: qr(t.enums), types: qr(t.types) };
    }
    __name(ii, "ii");
    function qr(t) {
      let e = {};
      for (let { name: r, ...n } of t) e[r] = n;
      return e;
    }
    __name(qr, "qr");
    u();
    c();
    m();
    p();
    d();
    l();
    function Ve(t) {
      return t instanceof Date || Object.prototype.toString.call(t) === "[object Date]";
    }
    __name(Ve, "Ve");
    function jt(t) {
      return t.toString() !== "Invalid Date";
    }
    __name(jt, "jt");
    u();
    c();
    m();
    p();
    d();
    l();
    l();
    function je(t) {
      return v.isDecimal(t) ? true : t !== null && typeof t == "object" && typeof t.s == "number" && typeof t.e == "number" && typeof t.toFixed == "function" && Array.isArray(t.d);
    }
    __name(je, "je");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var pt = {};
    nt(pt, { ModelAction: /* @__PURE__ */ __name(() => mt, "ModelAction"), datamodelEnumToSchemaEnum: /* @__PURE__ */ __name(() => ra, "datamodelEnumToSchemaEnum") });
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function ra(t) {
      return { name: t.name, values: t.values.map((e) => e.name) };
    }
    __name(ra, "ra");
    u();
    c();
    m();
    p();
    d();
    l();
    var mt = ((F) => (F.findUnique = "findUnique", F.findUniqueOrThrow = "findUniqueOrThrow", F.findFirst = "findFirst", F.findFirstOrThrow = "findFirstOrThrow", F.findMany = "findMany", F.create = "create", F.createMany = "createMany", F.createManyAndReturn = "createManyAndReturn", F.update = "update", F.updateMany = "updateMany", F.updateManyAndReturn = "updateManyAndReturn", F.upsert = "upsert", F.delete = "delete", F.deleteMany = "deleteMany", F.groupBy = "groupBy", F.count = "count", F.aggregate = "aggregate", F.findRaw = "findRaw", F.aggregateRaw = "aggregateRaw", F))(mt || {});
    var na = it(Hn());
    var ia = { red: qe, gray: _n, dim: Lt, bold: _t, underline: On, highlightSource: /* @__PURE__ */ __name((t) => t.highlight(), "highlightSource") };
    var oa = { red: /* @__PURE__ */ __name((t) => t, "red"), gray: /* @__PURE__ */ __name((t) => t, "gray"), dim: /* @__PURE__ */ __name((t) => t, "dim"), bold: /* @__PURE__ */ __name((t) => t, "bold"), underline: /* @__PURE__ */ __name((t) => t, "underline"), highlightSource: /* @__PURE__ */ __name((t) => t, "highlightSource") };
    function sa({ message: t, originalMethod: e, isPanic: r, callArguments: n }) {
      return { functionName: `prisma.${e}()`, message: t, isPanic: r ?? false, callArguments: n };
    }
    __name(sa, "sa");
    function aa({ functionName: t, location: e, message: r, isPanic: n, contextLines: i, callArguments: o }, s) {
      let a = [""], f = e ? " in" : ":";
      if (n ? (a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a.push(s.red(`It occurred in the ${s.bold(`\`${t}\``)} invocation${f}`))) : a.push(s.red(`Invalid ${s.bold(`\`${t}\``)} invocation${f}`)), e && a.push(s.underline(la(e))), i) {
        a.push("");
        let h = [i.toString()];
        o && (h.push(o), h.push(s.dim(")"))), a.push(h.join("")), o && a.push("");
      } else a.push(""), o && a.push(o), a.push("");
      return a.push(r), a.join(`
`);
    }
    __name(aa, "aa");
    function la(t) {
      let e = [t.fileName];
      return t.lineNumber && e.push(String(t.lineNumber)), t.columnNumber && e.push(String(t.columnNumber)), e.join(":");
    }
    __name(la, "la");
    function $t(t) {
      let e = t.showColors ? ia : oa, r;
      return typeof $getTemplateParameters < "u" ? r = $getTemplateParameters(t, e) : r = sa(t), aa(r, e);
    }
    __name($t, "$t");
    u();
    c();
    m();
    p();
    d();
    l();
    var di = it(Br());
    u();
    c();
    m();
    p();
    d();
    l();
    function li(t, e, r) {
      let n = ui(t), i = ua(n), o = ma(i);
      o ? Qt(o, e, r) : e.addErrorMessage(() => "Unknown error");
    }
    __name(li, "li");
    function ui(t) {
      return t.errors.flatMap((e) => e.kind === "Union" ? ui(e) : [e]);
    }
    __name(ui, "ui");
    function ua(t) {
      let e = /* @__PURE__ */ new Map(), r = [];
      for (let n of t) {
        if (n.kind !== "InvalidArgumentType") {
          r.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = e.get(i);
        o ? e.set(i, { ...n, argument: { ...n.argument, typeNames: ca(o.argument.typeNames, n.argument.typeNames) } }) : e.set(i, n);
      }
      return r.push(...e.values()), r;
    }
    __name(ua, "ua");
    function ca(t, e) {
      return [...new Set(t.concat(e))];
    }
    __name(ca, "ca");
    function ma(t) {
      return Nr(t, (e, r) => {
        let n = si(e), i = si(r);
        return n !== i ? n - i : ai(e) - ai(r);
      });
    }
    __name(ma, "ma");
    function si(t) {
      let e = 0;
      return Array.isArray(t.selectionPath) && (e += t.selectionPath.length), Array.isArray(t.argumentPath) && (e += t.argumentPath.length), e;
    }
    __name(si, "si");
    function ai(t) {
      switch (t.kind) {
        case "InvalidArgumentValue":
        case "ValueTooLarge":
          return 20;
        case "InvalidArgumentType":
          return 10;
        case "RequiredArgumentMissing":
          return -10;
        default:
          return 0;
      }
    }
    __name(ai, "ai");
    u();
    c();
    m();
    p();
    d();
    l();
    var ne = class {
      static {
        __name(this, "ne");
      }
      constructor(e, r) {
        this.name = e;
        this.value = r;
      }
      isRequired = false;
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(e) {
        let { colors: { green: r } } = e.context;
        e.addMarginSymbol(r(this.isRequired ? "+" : "?")), e.write(r(this.name)), this.isRequired || e.write(r("?")), e.write(r(": ")), typeof this.value == "string" ? e.write(r(this.value)) : e.write(this.value);
      }
    };
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    mi();
    u();
    c();
    m();
    p();
    d();
    l();
    var $e = class {
      static {
        __name(this, "$e");
      }
      constructor(e = 0, r) {
        this.context = r;
        this.currentIndent = e;
      }
      lines = [];
      currentLine = "";
      currentIndent = 0;
      marginSymbol;
      afterNextNewLineCallback;
      write(e) {
        return typeof e == "string" ? this.currentLine += e : e.write(this), this;
      }
      writeJoined(e, r, n = (i, o) => o.write(i)) {
        let i = r.length - 1;
        for (let o = 0; o < r.length; o++) n(r[o], this), o !== i && this.write(e);
        return this;
      }
      writeLine(e) {
        return this.write(e).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let e = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, e?.(), this;
      }
      withIndent(e) {
        return this.indent(), e(this), this.unindent(), this;
      }
      afterNextNewline(e) {
        return this.afterNextNewLineCallback = e, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(e) {
        return this.marginSymbol = e, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let e = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + e.slice(1) : e;
      }
    };
    ci();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var Jt = class {
      static {
        __name(this, "Jt");
      }
      constructor(e) {
        this.value = e;
      }
      write(e) {
        e.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    };
    u();
    c();
    m();
    p();
    d();
    l();
    var Gt = /* @__PURE__ */ __name((t) => t, "Gt");
    var Wt = { bold: Gt, red: Gt, green: Gt, dim: Gt, enabled: false };
    var pi = { bold: _t, red: qe, green: kn, dim: Lt, enabled: true };
    var Qe = { write(t) {
      t.writeLine(",");
    } };
    u();
    c();
    m();
    p();
    d();
    l();
    var pe = class {
      static {
        __name(this, "pe");
      }
      constructor(e) {
        this.contents = e;
      }
      isUnderlined = false;
      color = /* @__PURE__ */ __name((e) => e, "color");
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(e) {
        return this.color = e, this;
      }
      write(e) {
        let r = e.getCurrentLineLength();
        e.write(this.color(this.contents)), this.isUnderlined && e.afterNextNewline(() => {
          e.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    };
    u();
    c();
    m();
    p();
    d();
    l();
    var Te = class {
      static {
        __name(this, "Te");
      }
      hasError = false;
      markAsError() {
        return this.hasError = true, this;
      }
    };
    var Je = class extends Te {
      static {
        __name(this, "Je");
      }
      items = [];
      addItem(e) {
        return this.items.push(new Jt(e)), this;
      }
      getField(e) {
        return this.items[e];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((r) => r.value.getPrintWidth())) + 2;
      }
      write(e) {
        if (this.items.length === 0) {
          this.writeEmpty(e);
          return;
        }
        this.writeWithItems(e);
      }
      writeEmpty(e) {
        let r = new pe("[]");
        this.hasError && r.setColor(e.context.colors.red).underline(), e.write(r);
      }
      writeWithItems(e) {
        let { colors: r } = e.context;
        e.writeLine("[").withIndent(() => e.writeJoined(Qe, this.items).newLine()).write("]"), this.hasError && e.afterNextNewline(() => {
          e.writeLine(r.red("~".repeat(this.getPrintWidth())));
        });
      }
      asObject() {
      }
    };
    var Ge = class t extends Te {
      static {
        __name(this, "t");
      }
      fields = {};
      suggestions = [];
      addField(e) {
        this.fields[e.name] = e;
      }
      addSuggestion(e) {
        this.suggestions.push(e);
      }
      getField(e) {
        return this.fields[e];
      }
      getDeepField(e) {
        let [r, ...n] = e, i = this.getField(r);
        if (!i) return;
        let o = i;
        for (let s of n) {
          let a;
          if (o.value instanceof t ? a = o.value.getField(s) : o.value instanceof Je && (a = o.value.getField(Number(s))), !a) return;
          o = a;
        }
        return o;
      }
      getDeepFieldValue(e) {
        return e.length === 0 ? this : this.getDeepField(e)?.value;
      }
      hasField(e) {
        return !!this.getField(e);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(e) {
        delete this.fields[e];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(e) {
        return this.getField(e)?.value;
      }
      getDeepSubSelectionValue(e) {
        let r = this;
        for (let n of e) {
          if (!(r instanceof t)) return;
          let i = r.getSubSelectionValue(n);
          if (!i) return;
          r = i;
        }
        return r;
      }
      getDeepSelectionParent(e) {
        let r = this.getSelectionParent();
        if (!r) return;
        let n = r;
        for (let i of e) {
          let o = n.value.getFieldValue(i);
          if (!o || !(o instanceof t)) return;
          let s = o.getSelectionParent();
          if (!s) return;
          n = s;
        }
        return n;
      }
      getSelectionParent() {
        let e = this.getField("select")?.value.asObject();
        if (e) return { kind: "select", value: e };
        let r = this.getField("include")?.value.asObject();
        if (r) return { kind: "include", value: r };
      }
      getSubSelectionValue(e) {
        return this.getSelectionParent()?.value.fields[e].value;
      }
      getPrintWidth() {
        let e = Object.values(this.fields);
        return e.length == 0 ? 2 : Math.max(...e.map((n) => n.getPrintWidth())) + 2;
      }
      write(e) {
        let r = Object.values(this.fields);
        if (r.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(e);
          return;
        }
        this.writeWithContents(e, r);
      }
      asObject() {
        return this;
      }
      writeEmpty(e) {
        let r = new pe("{}");
        this.hasError && r.setColor(e.context.colors.red).underline(), e.write(r);
      }
      writeWithContents(e, r) {
        e.writeLine("{").withIndent(() => {
          e.writeJoined(Qe, [...r, ...this.suggestions]).newLine();
        }), e.write("}"), this.hasError && e.afterNextNewline(() => {
          e.writeLine(e.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    u();
    c();
    m();
    p();
    d();
    l();
    var W = class extends Te {
      static {
        __name(this, "W");
      }
      constructor(r) {
        super();
        this.text = r;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(r) {
        let n = new pe(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
      }
      asObject() {
      }
    };
    u();
    c();
    m();
    p();
    d();
    l();
    var dt = class {
      static {
        __name(this, "dt");
      }
      fields = [];
      addField(e, r) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${e}: ${r}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(e) {
        let { colors: { green: r } } = e.context;
        e.writeLine(r("{")).withIndent(() => {
          e.writeJoined(Qe, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
      }
    };
    function Qt(t, e, r) {
      switch (t.kind) {
        case "MutuallyExclusiveFields":
          pa(t, e);
          break;
        case "IncludeOnScalar":
          da(t, e);
          break;
        case "EmptySelection":
          fa(t, e, r);
          break;
        case "UnknownSelectionField":
          ba(t, e);
          break;
        case "InvalidSelectionValue":
          wa(t, e);
          break;
        case "UnknownArgument":
          Ea(t, e);
          break;
        case "UnknownInputField":
          xa(t, e);
          break;
        case "RequiredArgumentMissing":
          Pa(t, e);
          break;
        case "InvalidArgumentType":
          va(t, e);
          break;
        case "InvalidArgumentValue":
          Ta(t, e);
          break;
        case "ValueTooLarge":
          Ca(t, e);
          break;
        case "SomeFieldsMissing":
          Aa(t, e);
          break;
        case "TooManyFieldsGiven":
          Ra(t, e);
          break;
        case "Union":
          li(t, e, r);
          break;
        default:
          throw new Error("not implemented: " + t.kind);
      }
    }
    __name(Qt, "Qt");
    function pa(t, e) {
      let r = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      r && (r.getField(t.firstField)?.markAsError(), r.getField(t.secondField)?.markAsError()), e.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${t.firstField}\``)} or ${n.green(`\`${t.secondField}\``)}, but ${n.red("not both")} at the same time.`);
    }
    __name(pa, "pa");
    function da(t, e) {
      let [r, n] = We(t.selectionPath), i = t.outputType, o = e.arguments.getDeepSelectionParent(r)?.value;
      if (o && (o.getField(n)?.markAsError(), i)) for (let s of i.fields) s.isRelation && o.addSuggestion(new ne(s.name, "true"));
      e.addErrorMessage((s) => {
        let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a += ` on model ${s.bold(i.name)}. ${ft(s)}` : a += ".", a += `
Note that ${s.bold("include")} statements only accept relation fields.`, a;
      });
    }
    __name(da, "da");
    function fa(t, e, r) {
      let n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
          ga(t, e, i);
          return;
        }
        if (n.hasField("select")) {
          ya(t, e);
          return;
        }
      }
      if (r?.[ve(t.outputType.name)]) {
        ha(t, e);
        return;
      }
      e.addErrorMessage(() => `Unknown field at "${t.selectionPath.join(".")} selection"`);
    }
    __name(fa, "fa");
    function ga(t, e, r) {
      r.removeAllFields();
      for (let n of t.outputType.fields) r.addSuggestion(new ne(n.name, "false"));
      e.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(t.outputType.name)}. At least one field must be included in the result`);
    }
    __name(ga, "ga");
    function ya(t, e) {
      let r = t.outputType, n = e.arguments.getDeepSelectionParent(t.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), yi(n, r)), e.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${ft(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    __name(ya, "ya");
    function ha(t, e) {
      let r = new dt();
      for (let i of t.outputType.fields) i.isRelation || r.addField(i.name, "false");
      let n = new ne("omit", r).makeRequired();
      if (t.selectionPath.length === 0) e.arguments.addSuggestion(n);
      else {
        let [i, o] = We(t.selectionPath), a = e.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a) {
          let f = a?.value.asObject() ?? new Ge();
          f.addSuggestion(n), a.value = f;
        }
      }
      e.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(t.outputType.name)}. At least one field must be included in the result`);
    }
    __name(ha, "ha");
    function ba(t, e) {
      let r = hi(t.selectionPath, e);
      if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch (r.parentKind) {
          case "select":
            yi(n, t.outputType);
            break;
          case "include":
            Sa(n, t.outputType);
            break;
          case "omit":
            Oa(n, t.outputType);
            break;
        }
      }
      e.addErrorMessage((n) => {
        let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${t.outputType.name}\``)}.`), i.push(ft(n)), i.join(" ");
      });
    }
    __name(ba, "ba");
    function wa(t, e) {
      let r = hi(t.selectionPath, e);
      r.parentKind !== "unknown" && r.field.value.markAsError(), e.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${t.underlyingError}`);
    }
    __name(wa, "wa");
    function Ea(t, e) {
      let r = t.argumentPath[0], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && (n.getField(r)?.markAsError(), ka(n, t.arguments)), e.addErrorMessage((i) => fi(i, r, t.arguments.map((o) => o.name)));
    }
    __name(Ea, "Ea");
    function xa(t, e) {
      let [r, n] = We(t.argumentPath), i = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (i) {
        i.getDeepField(t.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(r)?.asObject();
        o && bi(o, t.inputType);
      }
      e.addErrorMessage((o) => fi(o, n, t.inputType.fields.map((s) => s.name)));
    }
    __name(xa, "xa");
    function fi(t, e, r) {
      let n = [`Unknown argument \`${t.red(e)}\`.`], i = Ia(e, r);
      return i && n.push(`Did you mean \`${t.green(i)}\`?`), r.length > 0 && n.push(ft(t)), n.join(" ");
    }
    __name(fi, "fi");
    function Pa(t, e) {
      let r;
      e.addErrorMessage((f) => r?.value instanceof W && r.value.text === "null" ? `Argument \`${f.green(o)}\` must not be ${f.red("null")}.` : `Argument \`${f.green(o)}\` is missing.`);
      let n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (!n) return;
      let [i, o] = We(t.argumentPath), s = new dt(), a = n.getDeepFieldValue(i)?.asObject();
      if (a) {
        if (r = a.getField(o), r && a.removeField(o), t.inputTypes.length === 1 && t.inputTypes[0].kind === "object") {
          for (let f of t.inputTypes[0].fields) s.addField(f.name, f.typeNames.join(" | "));
          a.addSuggestion(new ne(o, s).makeRequired());
        } else {
          let f = t.inputTypes.map(gi).join(" | ");
          a.addSuggestion(new ne(o, f).makeRequired());
        }
        if (t.dependentArgumentPath) {
          n.getDeepField(t.dependentArgumentPath)?.markAsError();
          let [, f] = We(t.dependentArgumentPath);
          e.addErrorMessage((h) => `Argument \`${h.green(o)}\` is required because argument \`${h.green(f)}\` was provided.`);
        }
      }
    }
    __name(Pa, "Pa");
    function gi(t) {
      return t.kind === "list" ? `${gi(t.elementType)}[]` : t.name;
    }
    __name(gi, "gi");
    function va(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && n.getDeepFieldValue(t.argumentPath)?.markAsError(), e.addErrorMessage((i) => {
        let o = Kt("or", t.argument.typeNames.map((s) => i.green(s)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(t.inferredType)}.`;
      });
    }
    __name(va, "va");
    function Ta(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && n.getDeepFieldValue(t.argumentPath)?.markAsError(), e.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(r)}\``];
        if (t.underlyingError && o.push(`: ${t.underlyingError}`), o.push("."), t.argument.typeNames.length > 0) {
          let s = Kt("or", t.argument.typeNames.map((a) => i.green(a)));
          o.push(` Expected ${s}.`);
        }
        return o.join("");
      });
    }
    __name(Ta, "Ta");
    function Ca(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject(), i;
      if (n) {
        let s = n.getDeepField(t.argumentPath)?.value;
        s?.markAsError(), s instanceof W && (i = s.text);
      }
      e.addErrorMessage((o) => {
        let s = ["Unable to fit value"];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s.join(" ");
      });
    }
    __name(Ca, "Ca");
    function Aa(t, e) {
      let r = t.argumentPath[t.argumentPath.length - 1], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (n) {
        let i = n.getDeepFieldValue(t.argumentPath)?.asObject();
        i && bi(i, t.inputType);
      }
      e.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(t.inputType.name)} needs`];
        return t.constraints.minFieldCount === 1 ? t.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${Kt("or", t.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${t.constraints.minFieldCount}`)} arguments.`), o.push(ft(i)), o.join(" ");
      });
    }
    __name(Aa, "Aa");
    function Ra(t, e) {
      let r = t.argumentPath[t.argumentPath.length - 1], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject(), i = [];
      if (n) {
        let o = n.getDeepFieldValue(t.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      e.addErrorMessage((o) => {
        let s = [`Argument \`${o.bold(r)}\` of type ${o.bold(t.inputType.name)} needs`];
        return t.constraints.minFieldCount === 1 && t.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : t.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${t.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${Kt("and", i.map((a) => o.red(a)))}. Please choose`), t.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${t.constraints.maxFieldCount}.`), s.join(" ");
      });
    }
    __name(Ra, "Ra");
    function yi(t, e) {
      for (let r of e.fields) t.hasField(r.name) || t.addSuggestion(new ne(r.name, "true"));
    }
    __name(yi, "yi");
    function Sa(t, e) {
      for (let r of e.fields) r.isRelation && !t.hasField(r.name) && t.addSuggestion(new ne(r.name, "true"));
    }
    __name(Sa, "Sa");
    function Oa(t, e) {
      for (let r of e.fields) !t.hasField(r.name) && !r.isRelation && t.addSuggestion(new ne(r.name, "true"));
    }
    __name(Oa, "Oa");
    function ka(t, e) {
      for (let r of e) t.hasField(r.name) || t.addSuggestion(new ne(r.name, r.typeNames.join(" | ")));
    }
    __name(ka, "ka");
    function hi(t, e) {
      let [r, n] = We(t), i = e.arguments.getDeepSubSelectionValue(r)?.asObject();
      if (!i) return { parentKind: "unknown", fieldName: n };
      let o = i.getFieldValue("select")?.asObject(), s = i.getFieldValue("include")?.asObject(), a = i.getFieldValue("omit")?.asObject(), f = o?.getField(n);
      return o && f ? { parentKind: "select", parent: o, field: f, fieldName: n } : (f = s?.getField(n), s && f ? { parentKind: "include", field: f, parent: s, fieldName: n } : (f = a?.getField(n), a && f ? { parentKind: "omit", field: f, parent: a, fieldName: n } : { parentKind: "unknown", fieldName: n }));
    }
    __name(hi, "hi");
    function bi(t, e) {
      if (e.kind === "object") for (let r of e.fields) t.hasField(r.name) || t.addSuggestion(new ne(r.name, r.typeNames.join(" | ")));
    }
    __name(bi, "bi");
    function We(t) {
      let e = [...t], r = e.pop();
      if (!r) throw new Error("unexpected empty path");
      return [e, r];
    }
    __name(We, "We");
    function ft({ green: t, enabled: e }) {
      return "Available options are " + (e ? `listed in ${t("green")}` : "marked with ?") + ".";
    }
    __name(ft, "ft");
    function Kt(t, e) {
      if (e.length === 1) return e[0];
      let r = [...e], n = r.pop();
      return `${r.join(", ")} ${t} ${n}`;
    }
    __name(Kt, "Kt");
    var Da = 3;
    function Ia(t, e) {
      let r = 1 / 0, n;
      for (let i of e) {
        let o = (0, di.default)(t, i);
        o > Da || o < r && (r = o, n = i);
      }
      return n;
    }
    __name(Ia, "Ia");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var gt = class {
      static {
        __name(this, "gt");
      }
      modelName;
      name;
      typeName;
      isList;
      isEnum;
      constructor(e, r, n, i, o) {
        this.modelName = e, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let e = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${e}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    };
    function Ke(t) {
      return t instanceof gt;
    }
    __name(Ke, "Ke");
    u();
    c();
    m();
    p();
    d();
    l();
    var Ht = Symbol();
    var jr = /* @__PURE__ */ new WeakMap();
    var xe = class {
      static {
        __name(this, "xe");
      }
      constructor(e) {
        e === Ht ? jr.set(this, `Prisma.${this._getName()}`) : jr.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return jr.get(this);
      }
    };
    var yt = class extends xe {
      static {
        __name(this, "yt");
      }
      _getNamespace() {
        return "NullTypes";
      }
    };
    var ht = class extends yt {
      static {
        __name(this, "ht");
      }
      #e;
    };
    $r(ht, "DbNull");
    var bt = class extends yt {
      static {
        __name(this, "bt");
      }
      #e;
    };
    $r(bt, "JsonNull");
    var wt = class extends yt {
      static {
        __name(this, "wt");
      }
      #e;
    };
    $r(wt, "AnyNull");
    var zt = { classes: { DbNull: ht, JsonNull: bt, AnyNull: wt }, instances: { DbNull: new ht(Ht), JsonNull: new bt(Ht), AnyNull: new wt(Ht) } };
    function $r(t, e) {
      Object.defineProperty(t, "name", { value: e, configurable: true });
    }
    __name($r, "$r");
    u();
    c();
    m();
    p();
    d();
    l();
    var wi = ": ";
    var Yt = class {
      static {
        __name(this, "Yt");
      }
      constructor(e, r) {
        this.name = e;
        this.value = r;
      }
      hasError = false;
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + wi.length;
      }
      write(e) {
        let r = new pe(this.name);
        this.hasError && r.underline().setColor(e.context.colors.red), e.write(r).write(wi).write(this.value);
      }
    };
    var Qr = class {
      static {
        __name(this, "Qr");
      }
      arguments;
      errorMessages = [];
      constructor(e) {
        this.arguments = e;
      }
      write(e) {
        e.write(this.arguments);
      }
      addErrorMessage(e) {
        this.errorMessages.push(e);
      }
      renderAllMessages(e) {
        return this.errorMessages.map((r) => r(e)).join(`
`);
      }
    };
    function He(t) {
      return new Qr(Ei(t));
    }
    __name(He, "He");
    function Ei(t) {
      let e = new Ge();
      for (let [r, n] of Object.entries(t)) {
        let i = new Yt(r, xi(n));
        e.addField(i);
      }
      return e;
    }
    __name(Ei, "Ei");
    function xi(t) {
      if (typeof t == "string") return new W(JSON.stringify(t));
      if (typeof t == "number" || typeof t == "boolean") return new W(String(t));
      if (typeof t == "bigint") return new W(`${t}n`);
      if (t === null) return new W("null");
      if (t === void 0) return new W("undefined");
      if (je(t)) return new W(`new Prisma.Decimal("${t.toFixed()}")`);
      if (t instanceof Uint8Array) return b.isBuffer(t) ? new W(`Buffer.alloc(${t.byteLength})`) : new W(`new Uint8Array(${t.byteLength})`);
      if (t instanceof Date) {
        let e = jt(t) ? t.toISOString() : "Invalid Date";
        return new W(`new Date("${e}")`);
      }
      return t instanceof xe ? new W(`Prisma.${t._getName()}`) : Ke(t) ? new W(`prisma.${ve(t.modelName)}.$fields.${t.name}`) : Array.isArray(t) ? Ma(t) : typeof t == "object" ? Ei(t) : new W(Object.prototype.toString.call(t));
    }
    __name(xi, "xi");
    function Ma(t) {
      let e = new Je();
      for (let r of t) e.addItem(xi(r));
      return e;
    }
    __name(Ma, "Ma");
    function Xt(t, e) {
      let r = e === "pretty" ? pi : Wt, n = t.renderAllMessages(r), i = new $e(0, { colors: r }).write(t).toString();
      return { message: n, args: i };
    }
    __name(Xt, "Xt");
    function Zt({ args: t, errors: e, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
      let a = He(t);
      for (let A of e) Qt(A, a, s);
      let { message: f, args: h } = Xt(a, r), C = $t({ message: f, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: h });
      throw new K(C, { clientVersion: o });
    }
    __name(Zt, "Zt");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function de(t) {
      return t.replace(/^./, (e) => e.toLowerCase());
    }
    __name(de, "de");
    u();
    c();
    m();
    p();
    d();
    l();
    function vi(t, e, r) {
      let n = de(r);
      return !e.result || !(e.result.$allModels || e.result[n]) ? t : _a({ ...t, ...Pi(e.name, t, e.result.$allModels), ...Pi(e.name, t, e.result[n]) });
    }
    __name(vi, "vi");
    function _a(t) {
      let e = new me(), r = /* @__PURE__ */ __name((n, i) => e.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), t[n] ? t[n].needs.flatMap((o) => r(o, i)) : [n])), "r");
      return Vt(t, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
    }
    __name(_a, "_a");
    function Pi(t, e, r) {
      return r ? Vt(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: La(e, o, i) })) : {};
    }
    __name(Pi, "Pi");
    function La(t, e, r) {
      let n = t?.[e]?.compute;
      return n ? (i) => r({ ...i, [e]: n(i) }) : r;
    }
    __name(La, "La");
    function Ti(t, e) {
      if (!e) return t;
      let r = { ...t };
      for (let n of Object.values(e)) if (t[n.name]) for (let i of n.needs) r[i] = true;
      return r;
    }
    __name(Ti, "Ti");
    function Ci(t, e) {
      if (!e) return t;
      let r = { ...t };
      for (let n of Object.values(e)) if (!t[n.name]) for (let i of n.needs) delete r[i];
      return r;
    }
    __name(Ci, "Ci");
    var er = class {
      static {
        __name(this, "er");
      }
      constructor(e, r) {
        this.extension = e;
        this.previous = r;
      }
      computedFieldsCache = new me();
      modelExtensionsCache = new me();
      queryCallbacksCache = new me();
      clientExtensions = ct(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
      batchCallbacks = ct(() => {
        let e = this.previous?.getAllBatchQueryCallbacks() ?? [], r = this.extension.query?.$__internalBatch;
        return r ? e.concat(r) : e;
      });
      getAllComputedFields(e) {
        return this.computedFieldsCache.getOrCreate(e, () => vi(this.previous?.getAllComputedFields(e), this.extension, e));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(e) {
        return this.modelExtensionsCache.getOrCreate(e, () => {
          let r = de(e);
          return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(e) : { ...this.previous?.getAllModelExtensions(e), ...this.extension.model.$allModels, ...this.extension.model[r] };
        });
      }
      getAllQueryCallbacks(e, r) {
        return this.queryCallbacksCache.getOrCreate(`${e}:${r}`, () => {
          let n = this.previous?.getAllQueryCallbacks(e, r) ?? [], i = [], o = this.extension.query;
          return !o || !(o[e] || o.$allModels || o[r] || o.$allOperations) ? n : (o[e] !== void 0 && (o[e][r] !== void 0 && i.push(o[e][r]), o[e].$allOperations !== void 0 && i.push(o[e].$allOperations)), e !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    };
    var ze = class t {
      static {
        __name(this, "t");
      }
      constructor(e) {
        this.head = e;
      }
      static empty() {
        return new t();
      }
      static single(e) {
        return new t(new er(e));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(e) {
        return new t(new er(e, this.head));
      }
      getAllComputedFields(e) {
        return this.head?.getAllComputedFields(e);
      }
      getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
      }
      getAllModelExtensions(e) {
        return this.head?.getAllModelExtensions(e);
      }
      getAllQueryCallbacks(e, r) {
        return this.head?.getAllQueryCallbacks(e, r) ?? [];
      }
      getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
      }
    };
    u();
    c();
    m();
    p();
    d();
    l();
    var tr = class {
      static {
        __name(this, "tr");
      }
      constructor(e) {
        this.name = e;
      }
    };
    function Ai(t) {
      return t instanceof tr;
    }
    __name(Ai, "Ai");
    function Ri(t) {
      return new tr(t);
    }
    __name(Ri, "Ri");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var Si = Symbol();
    var Et = class {
      static {
        __name(this, "Et");
      }
      constructor(e) {
        if (e !== Si) throw new Error("Skip instance can not be constructed directly");
      }
      ifUndefined(e) {
        return e === void 0 ? rr : e;
      }
    };
    var rr = new Et(Si);
    function fe(t) {
      return t instanceof Et;
    }
    __name(fe, "fe");
    var Fa = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", updateManyAndReturn: "updateManyAndReturn", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    var Oi = "explicitly `undefined` values are not allowed";
    function nr({ modelName: t, action: e, args: r, runtimeDataModel: n, extensions: i = ze.empty(), callsite: o, clientMethod: s, errorFormat: a, clientVersion: f, previewFeatures: h, globalOmit: C }) {
      let A = new Jr({ runtimeDataModel: n, modelName: t, action: e, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a, clientVersion: f, previewFeatures: h, globalOmit: C });
      return { modelName: t, action: Fa[e], query: xt(r, A) };
    }
    __name(nr, "nr");
    function xt({ select: t, include: e, ...r } = {}, n) {
      let i = r.omit;
      return delete r.omit, { arguments: Di(r, n), selection: Ua(t, e, i, n) };
    }
    __name(xt, "xt");
    function Ua(t, e, r, n) {
      return t ? (e ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), Va(t, n)) : Na(n, e, r);
    }
    __name(Ua, "Ua");
    function Na(t, e, r) {
      let n = {};
      return t.modelOrType && !t.isRawAction() && (n.$composites = true, n.$scalars = true), e && qa(n, e, t), Ba(n, r, t), n;
    }
    __name(Na, "Na");
    function qa(t, e, r) {
      for (let [n, i] of Object.entries(e)) {
        if (fe(i)) continue;
        let o = r.nestSelection(n);
        if (Gr(i, o), i === false || i === void 0) {
          t[n] = false;
          continue;
        }
        let s = r.findField(n);
        if (s && s.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s) {
          t[n] = xt(i === true ? {} : i, o);
          continue;
        }
        if (i === true) {
          t[n] = true;
          continue;
        }
        t[n] = xt(i, o);
      }
    }
    __name(qa, "qa");
    function Ba(t, e, r) {
      let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...e }, o = Ci(i, n);
      for (let [s, a] of Object.entries(o)) {
        if (fe(a)) continue;
        Gr(a, r.nestSelection(s));
        let f = r.findField(s);
        n?.[s] && !f || (t[s] = !a);
      }
    }
    __name(Ba, "Ba");
    function Va(t, e) {
      let r = {}, n = e.getComputedFields(), i = Ti(t, n);
      for (let [o, s] of Object.entries(i)) {
        if (fe(s)) continue;
        let a = e.nestSelection(o);
        Gr(s, a);
        let f = e.findField(o);
        if (!(n?.[o] && !f)) {
          if (s === false || s === void 0 || fe(s)) {
            r[o] = false;
            continue;
          }
          if (s === true) {
            f?.kind === "object" ? r[o] = xt({}, a) : r[o] = true;
            continue;
          }
          r[o] = xt(s, a);
        }
      }
      return r;
    }
    __name(Va, "Va");
    function ki(t, e) {
      if (t === null) return null;
      if (typeof t == "string" || typeof t == "number" || typeof t == "boolean") return t;
      if (typeof t == "bigint") return { $type: "BigInt", value: String(t) };
      if (Ve(t)) {
        if (jt(t)) return { $type: "DateTime", value: t.toISOString() };
        e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: e.getSelectionPath(), argumentPath: e.getArgumentPath(), argument: { name: e.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (Ai(t)) return { $type: "Param", value: t.name };
      if (Ke(t)) return { $type: "FieldRef", value: { _ref: t.name, _container: t.modelName } };
      if (Array.isArray(t)) return ja(t, e);
      if (ArrayBuffer.isView(t)) {
        let { buffer: r, byteOffset: n, byteLength: i } = t;
        return { $type: "Bytes", value: b.from(r, n, i).toString("base64") };
      }
      if ($a(t)) return t.values;
      if (je(t)) return { $type: "Decimal", value: t.toFixed() };
      if (t instanceof xe) {
        if (t !== zt.instances[t._getName()]) throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: t._getName() };
      }
      if (Qa(t)) return t.toJSON();
      if (typeof t == "object") return Di(t, e);
      e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: e.getSelectionPath(), argumentPath: e.getArgumentPath(), argument: { name: e.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(t)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    __name(ki, "ki");
    function Di(t, e) {
      if (t.$type) return { $type: "Raw", value: t };
      let r = {};
      for (let n in t) {
        let i = t[n], o = e.nestArgument(n);
        fe(i) || (i !== void 0 ? r[n] = ki(i, o) : e.isPreviewFeatureOn("strictUndefinedChecks") && e.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: e.getSelectionPath(), argument: { name: e.getArgumentName(), typeNames: [] }, underlyingError: Oi }));
      }
      return r;
    }
    __name(Di, "Di");
    function ja(t, e) {
      let r = [];
      for (let n = 0; n < t.length; n++) {
        let i = e.nestArgument(String(n)), o = t[n];
        if (o === void 0 || fe(o)) {
          let s = o === void 0 ? "undefined" : "Prisma.skip";
          e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${e.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values` });
        }
        r.push(ki(o, i));
      }
      return r;
    }
    __name(ja, "ja");
    function $a(t) {
      return typeof t == "object" && t !== null && t.__prismaRawParameters__ === true;
    }
    __name($a, "$a");
    function Qa(t) {
      return typeof t == "object" && t !== null && typeof t.toJSON == "function";
    }
    __name(Qa, "Qa");
    function Gr(t, e) {
      t === void 0 && e.isPreviewFeatureOn("strictUndefinedChecks") && e.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: e.getSelectionPath(), underlyingError: Oi });
    }
    __name(Gr, "Gr");
    var Jr = class t {
      static {
        __name(this, "t");
      }
      constructor(e) {
        this.params = e;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
      }
      modelOrType;
      throwValidationError(e) {
        Zt({ errors: [e], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
      }
      getSelectionPath() {
        return this.params.selectionPath;
      }
      getArgumentPath() {
        return this.params.argumentPath;
      }
      getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
      }
      getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((e) => ({ name: e.name, typeName: "boolean", isRelation: e.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      isPreviewFeatureOn(e) {
        return this.params.previewFeatures.includes(e);
      }
      getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(e) {
        return this.modelOrType?.fields.find((r) => r.name === e);
      }
      nestSelection(e) {
        let r = this.findField(e), n = r?.kind === "object" ? r.type : void 0;
        return new t({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(e) });
      }
      getGlobalOmit() {
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[ve(this.params.modelName)] ?? {} : {};
      }
      shouldApplyGlobalOmit() {
        switch (this.params.action) {
          case "findFirst":
          case "findFirstOrThrow":
          case "findUniqueOrThrow":
          case "findMany":
          case "upsert":
          case "findUnique":
          case "createManyAndReturn":
          case "create":
          case "update":
          case "updateManyAndReturn":
          case "delete":
            return true;
          case "executeRaw":
          case "aggregateRaw":
          case "runCommandRaw":
          case "findRaw":
          case "createMany":
          case "deleteMany":
          case "groupBy":
          case "updateMany":
          case "count":
          case "aggregate":
          case "queryRaw":
            return false;
          default:
            Me(this.params.action, "Unknown action");
        }
      }
      nestArgument(e) {
        return new t({ ...this.params, argumentPath: this.params.argumentPath.concat(e) });
      }
    };
    u();
    c();
    m();
    p();
    d();
    l();
    function Ii(t) {
      if (!t._hasPreviewFlag("metrics")) throw new K("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: t._clientVersion });
    }
    __name(Ii, "Ii");
    var Ye = class {
      static {
        __name(this, "Ye");
      }
      _client;
      constructor(e) {
        this._client = e;
      }
      prometheus(e) {
        return Ii(this._client), this._client._engine.metrics({ format: "prometheus", ...e });
      }
      json(e) {
        return Ii(this._client), this._client._engine.metrics({ format: "json", ...e });
      }
    };
    u();
    c();
    m();
    p();
    d();
    l();
    function Mi(t, e) {
      let r = ct(() => Ja(e));
      Object.defineProperty(t, "dmmf", { get: /* @__PURE__ */ __name(() => r.get(), "get") });
    }
    __name(Mi, "Mi");
    function Ja(t) {
      throw new Error("Prisma.dmmf is not available when running in edge runtimes.");
    }
    __name(Ja, "Ja");
    u();
    c();
    m();
    p();
    d();
    l();
    var Kr = /* @__PURE__ */ new WeakMap();
    var ir = "$$PrismaTypedSql";
    var Pt = class {
      static {
        __name(this, "Pt");
      }
      constructor(e, r) {
        Kr.set(this, { sql: e, values: r }), Object.defineProperty(this, ir, { value: ir });
      }
      get sql() {
        return Kr.get(this).sql;
      }
      get values() {
        return Kr.get(this).values;
      }
    };
    function _i(t) {
      return (...e) => new Pt(t, e);
    }
    __name(_i, "_i");
    function or(t) {
      return t != null && t[ir] === ir;
    }
    __name(or, "or");
    u();
    c();
    m();
    p();
    d();
    l();
    var Wo = it(Li());
    u();
    c();
    m();
    p();
    d();
    l();
    Fi();
    qn();
    $n();
    u();
    c();
    m();
    p();
    d();
    l();
    var ee = class t {
      static {
        __name(this, "t");
      }
      constructor(e, r) {
        if (e.length - 1 !== r.length) throw e.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${e.length} strings to have ${e.length - 1} values`);
        let n = r.reduce((s, a) => s + (a instanceof t ? a.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = e[0];
        let i = 0, o = 0;
        for (; i < r.length; ) {
          let s = r[i++], a = e[i];
          if (s instanceof t) {
            this.strings[o] += s.strings[0];
            let f = 0;
            for (; f < s.values.length; ) this.values[o++] = s.values[f++], this.strings[o] = s.strings[f];
            this.strings[o] += a;
          } else this.values[o++] = s, this.strings[o] = a;
        }
      }
      get sql() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; ) n += `?${this.strings[r++]}`;
        return n;
      }
      get statement() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; ) n += `:${r}${this.strings[r++]}`;
        return n;
      }
      get text() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; ) n += `$${r}${this.strings[r++]}`;
        return n;
      }
      inspect() {
        return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
      }
    };
    function Ui(t, e = ",", r = "", n = "") {
      if (t.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new ee([r, ...Array(t.length - 1).fill(e), n], t);
    }
    __name(Ui, "Ui");
    function Hr(t) {
      return new ee([t], []);
    }
    __name(Hr, "Hr");
    var Ni = Hr("");
    function zr(t, ...e) {
      return new ee(t, e);
    }
    __name(zr, "zr");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function vt(t) {
      return { getKeys() {
        return Object.keys(t);
      }, getPropertyValue(e) {
        return t[e];
      } };
    }
    __name(vt, "vt");
    u();
    c();
    m();
    p();
    d();
    l();
    function H(t, e) {
      return { getKeys() {
        return [t];
      }, getPropertyValue() {
        return e();
      } };
    }
    __name(H, "H");
    u();
    c();
    m();
    p();
    d();
    l();
    function _e(t) {
      let e = new me();
      return { getKeys() {
        return t.getKeys();
      }, getPropertyValue(r) {
        return e.getOrCreate(r, () => t.getPropertyValue(r));
      }, getPropertyDescriptor(r) {
        return t.getPropertyDescriptor?.(r);
      } };
    }
    __name(_e, "_e");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var ar = { enumerable: true, configurable: true, writable: true };
    function lr(t) {
      let e = new Set(t);
      return { getPrototypeOf: /* @__PURE__ */ __name(() => Object.prototype, "getPrototypeOf"), getOwnPropertyDescriptor: /* @__PURE__ */ __name(() => ar, "getOwnPropertyDescriptor"), has: /* @__PURE__ */ __name((r, n) => e.has(n), "has"), set: /* @__PURE__ */ __name((r, n, i) => e.add(n) && Reflect.set(r, n, i), "set"), ownKeys: /* @__PURE__ */ __name(() => [...e], "ownKeys") };
    }
    __name(lr, "lr");
    var qi = Symbol.for("nodejs.util.inspect.custom");
    function ae(t, e) {
      let r = Wa(e), n = /* @__PURE__ */ new Set(), i = new Proxy(t, { get(o, s) {
        if (n.has(s)) return o[s];
        let a = r.get(s);
        return a ? a.getPropertyValue(s) : o[s];
      }, has(o, s) {
        if (n.has(s)) return true;
        let a = r.get(s);
        return a ? a.has?.(s) ?? true : Reflect.has(o, s);
      }, ownKeys(o) {
        let s = Bi(Reflect.ownKeys(o), r), a = Bi(Array.from(r.keys()), r);
        return [.../* @__PURE__ */ new Set([...s, ...a, ...n])];
      }, set(o, s, a) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === false ? false : (n.add(s), Reflect.set(o, s, a));
      }, getOwnPropertyDescriptor(o, s) {
        let a = Reflect.getOwnPropertyDescriptor(o, s);
        if (a && !a.configurable) return a;
        let f = r.get(s);
        return f ? f.getPropertyDescriptor ? { ...ar, ...f?.getPropertyDescriptor(s) } : ar : a;
      }, defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a);
      }, getPrototypeOf: /* @__PURE__ */ __name(() => Object.prototype, "getPrototypeOf") });
      return i[qi] = function() {
        let o = { ...this };
        return delete o[qi], o;
      }, i;
    }
    __name(ae, "ae");
    function Wa(t) {
      let e = /* @__PURE__ */ new Map();
      for (let r of t) {
        let n = r.getKeys();
        for (let i of n) e.set(i, r);
      }
      return e;
    }
    __name(Wa, "Wa");
    function Bi(t, e) {
      return t.filter((r) => e.get(r)?.has?.(r) ?? true);
    }
    __name(Bi, "Bi");
    u();
    c();
    m();
    p();
    d();
    l();
    function Xe(t) {
      return { getKeys() {
        return t;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    __name(Xe, "Xe");
    u();
    c();
    m();
    p();
    d();
    l();
    function ur(t, e) {
      return { batch: t, transaction: e?.kind === "batch" ? { isolationLevel: e.options.isolationLevel } : void 0 };
    }
    __name(ur, "ur");
    u();
    c();
    m();
    p();
    d();
    l();
    function Vi(t) {
      if (t === void 0) return "";
      let e = He(t);
      return new $e(0, { colors: Wt }).write(e).toString();
    }
    __name(Vi, "Vi");
    u();
    c();
    m();
    p();
    d();
    l();
    var Ka = "P2037";
    function cr({ error: t, user_facing_error: e }, r, n) {
      return e.error_code ? new Z(Ha(e, n), { code: e.error_code, clientVersion: r, meta: e.meta, batchRequestIdx: e.batch_request_idx }) : new Q(t, { clientVersion: r, batchRequestIdx: e.batch_request_idx });
    }
    __name(cr, "cr");
    function Ha(t, e) {
      let r = t.message;
      return (e === "postgresql" || e === "postgres" || e === "mysql") && t.error_code === Ka && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
    }
    __name(Ha, "Ha");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var Yr = class {
      static {
        __name(this, "Yr");
      }
      getLocation() {
        return null;
      }
    };
    function Ce(t) {
      return typeof $EnabledCallSite == "function" && t !== "minimal" ? new $EnabledCallSite() : new Yr();
    }
    __name(Ce, "Ce");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var ji = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function Ze(t = {}) {
      let e = Ya(t);
      return Object.entries(e).reduce((n, [i, o]) => (ji[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    __name(Ze, "Ze");
    function Ya(t = {}) {
      return typeof t._count == "boolean" ? { ...t, _count: { _all: t._count } } : t;
    }
    __name(Ya, "Ya");
    function mr(t = {}) {
      return (e) => (typeof t._count == "boolean" && (e._count = e._count._all), e);
    }
    __name(mr, "mr");
    function $i(t, e) {
      let r = mr(t);
      return e({ action: "aggregate", unpacker: r, argsMapper: Ze })(t);
    }
    __name($i, "$i");
    u();
    c();
    m();
    p();
    d();
    l();
    function Xa(t = {}) {
      let { select: e, ...r } = t;
      return typeof e == "object" ? Ze({ ...r, _count: e }) : Ze({ ...r, _count: { _all: true } });
    }
    __name(Xa, "Xa");
    function Za(t = {}) {
      return typeof t.select == "object" ? (e) => mr(t)(e)._count : (e) => mr(t)(e)._count._all;
    }
    __name(Za, "Za");
    function Qi(t, e) {
      return e({ action: "count", unpacker: Za(t), argsMapper: Xa })(t);
    }
    __name(Qi, "Qi");
    u();
    c();
    m();
    p();
    d();
    l();
    function el(t = {}) {
      let e = Ze(t);
      if (Array.isArray(e.by)) for (let r of e.by) typeof r == "string" && (e.select[r] = true);
      else typeof e.by == "string" && (e.select[e.by] = true);
      return e;
    }
    __name(el, "el");
    function tl(t = {}) {
      return (e) => (typeof t?._count == "boolean" && e.forEach((r) => {
        r._count = r._count._all;
      }), e);
    }
    __name(tl, "tl");
    function Ji(t, e) {
      return e({ action: "groupBy", unpacker: tl(t), argsMapper: el })(t);
    }
    __name(Ji, "Ji");
    function Gi(t, e, r) {
      if (e === "aggregate") return (n) => $i(n, r);
      if (e === "count") return (n) => Qi(n, r);
      if (e === "groupBy") return (n) => Ji(n, r);
    }
    __name(Gi, "Gi");
    u();
    c();
    m();
    p();
    d();
    l();
    function Wi(t, e) {
      let r = e.fields.filter((i) => !i.relationName), n = ni(r, "name");
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s = n[o];
        if (s) return new gt(t, o, s.type, s.isList, s.kind === "enum");
      }, ...lr(Object.keys(n)) });
    }
    __name(Wi, "Wi");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var Ki = /* @__PURE__ */ __name((t) => Array.isArray(t) ? t : t.split("."), "Ki");
    var Xr = /* @__PURE__ */ __name((t, e) => Ki(e).reduce((r, n) => r && r[n], t), "Xr");
    var Hi = /* @__PURE__ */ __name((t, e, r) => Ki(e).reduceRight((n, i, o, s) => Object.assign({}, Xr(t, s.slice(0, o)), { [i]: n }), r), "Hi");
    function rl(t, e) {
      return t === void 0 || e === void 0 ? [] : [...e, "select", t];
    }
    __name(rl, "rl");
    function nl(t, e, r) {
      return e === void 0 ? t ?? {} : Hi(e, r, t || true);
    }
    __name(nl, "nl");
    function Zr(t, e, r, n, i, o) {
      let a = t._runtimeDataModel.models[e].fields.reduce((f, h) => ({ ...f, [h.name]: h }), {});
      return (f) => {
        let h = Ce(t._errorFormat), C = rl(n, i), A = nl(f, o, C), k = r({ dataPath: C, callsite: h })(A), R = il(t, e);
        return new Proxy(k, { get(_, O) {
          if (!R.includes(O)) return _[O];
          let ye = [a[O].type, r, O], z = [C, A];
          return Zr(t, ...ye, ...z);
        }, ...lr([...R, ...Object.getOwnPropertyNames(k)]) });
      };
    }
    __name(Zr, "Zr");
    function il(t, e) {
      return t._runtimeDataModel.models[e].fields.filter((r) => r.kind === "object").map((r) => r.name);
    }
    __name(il, "il");
    var ol = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var sl = ["aggregate", "count", "groupBy"];
    function en(t, e) {
      let r = t._extensions.getAllModelExtensions(e) ?? {}, n = [al(t, e), ul(t, e), vt(r), H("name", () => e), H("$name", () => e), H("$parent", () => t._appliedParent)];
      return ae({}, n);
    }
    __name(en, "en");
    function al(t, e) {
      let r = de(e), n = Object.keys(mt).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s = /* @__PURE__ */ __name((a) => (f) => {
          let h = Ce(t._errorFormat);
          return t._createPrismaPromise((C) => {
            let A = { args: f, dataPath: [], action: o, model: e, clientMethod: `${r}.${i}`, jsModelName: r, transaction: C, callsite: h };
            return t._request({ ...A, ...a });
          }, { action: o, args: f, model: e });
        }, "s");
        return ol.includes(o) ? Zr(t, e, s) : ll(i) ? Gi(t, i, s) : s({});
      } };
    }
    __name(al, "al");
    function ll(t) {
      return sl.includes(t);
    }
    __name(ll, "ll");
    function ul(t, e) {
      return _e(H("fields", () => {
        let r = t._runtimeDataModel.models[e];
        return Wi(e, r);
      }));
    }
    __name(ul, "ul");
    u();
    c();
    m();
    p();
    d();
    l();
    function zi(t) {
      return t.replace(/^./, (e) => e.toUpperCase());
    }
    __name(zi, "zi");
    var tn = Symbol();
    function Tt(t) {
      let e = [cl(t), ml(t), H(tn, () => t), H("$parent", () => t._appliedParent)], r = t._extensions.getAllClientExtensions();
      return r && e.push(vt(r)), ae(t, e);
    }
    __name(Tt, "Tt");
    function cl(t) {
      let e = Object.getPrototypeOf(t._originalClient), r = [...new Set(Object.getOwnPropertyNames(e))];
      return { getKeys() {
        return r;
      }, getPropertyValue(n) {
        return t[n];
      } };
    }
    __name(cl, "cl");
    function ml(t) {
      let e = Object.keys(t._runtimeDataModel.models), r = e.map(de), n = [...new Set(e.concat(r))];
      return _e({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = zi(i);
        if (t._runtimeDataModel.models[o] !== void 0) return en(t, o);
        if (t._runtimeDataModel.models[i] !== void 0) return en(t, i);
      }, getPropertyDescriptor(i) {
        if (!r.includes(i)) return { enumerable: false };
      } });
    }
    __name(ml, "ml");
    function Yi(t) {
      return t[tn] ? t[tn] : t;
    }
    __name(Yi, "Yi");
    function Xi(t) {
      if (typeof t == "function") return t(this);
      if (t.client?.__AccelerateEngine) {
        let r = t.client.__AccelerateEngine;
        this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
      }
      let e = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(t) }, _appliedParent: { value: this, configurable: true }, $on: { value: void 0 } });
      return Tt(e);
    }
    __name(Xi, "Xi");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function Zi({ result: t, modelName: e, select: r, omit: n, extensions: i }) {
      let o = i.getAllComputedFields(e);
      if (!o) return t;
      let s = [], a = [];
      for (let f of Object.values(o)) {
        if (n) {
          if (n[f.name]) continue;
          let h = f.needs.filter((C) => n[C]);
          h.length > 0 && a.push(Xe(h));
        } else if (r) {
          if (!r[f.name]) continue;
          let h = f.needs.filter((C) => !r[C]);
          h.length > 0 && a.push(Xe(h));
        }
        pl(t, f.needs) && s.push(dl(f, ae(t, s)));
      }
      return s.length > 0 || a.length > 0 ? ae(t, [...s, ...a]) : t;
    }
    __name(Zi, "Zi");
    function pl(t, e) {
      return e.every((r) => Ur(t, r));
    }
    __name(pl, "pl");
    function dl(t, e) {
      return _e(H(t.name, () => t.compute(e)));
    }
    __name(dl, "dl");
    u();
    c();
    m();
    p();
    d();
    l();
    function pr({ visitor: t, result: e, args: r, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(e)) {
        for (let s = 0; s < e.length; s++) e[s] = pr({ result: e[s], args: r, modelName: i, runtimeDataModel: n, visitor: t });
        return e;
      }
      let o = t(e, i, r) ?? e;
      return r.include && eo({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: t }), r.select && eo({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: t }), o;
    }
    __name(pr, "pr");
    function eo({ includeOrSelect: t, result: e, parentModelName: r, runtimeDataModel: n, visitor: i }) {
      for (let [o, s] of Object.entries(t)) {
        if (!s || e[o] == null || fe(s)) continue;
        let f = n.models[r].fields.find((C) => C.name === o);
        if (!f || f.kind !== "object" || !f.relationName) continue;
        let h = typeof s == "object" ? s : {};
        e[o] = pr({ visitor: i, result: e[o], args: h, modelName: f.type, runtimeDataModel: n });
      }
    }
    __name(eo, "eo");
    function to({ result: t, modelName: e, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
      return n.isEmpty() || t == null || typeof t != "object" || !i.models[e] ? t : pr({ result: t, args: r ?? {}, modelName: e, runtimeDataModel: i, visitor: /* @__PURE__ */ __name((a, f, h) => {
        let C = de(f);
        return Zi({ result: a, modelName: C, select: h.select, omit: h.select ? void 0 : { ...o?.[C], ...h.omit }, extensions: n });
      }, "visitor") });
    }
    __name(to, "to");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var fl = ["$connect", "$disconnect", "$on", "$transaction", "$extends"];
    var ro = fl;
    function no(t) {
      if (t instanceof ee) return gl(t);
      if (or(t)) return yl(t);
      if (Array.isArray(t)) {
        let r = [t[0]];
        for (let n = 1; n < t.length; n++) r[n] = Ct(t[n]);
        return r;
      }
      let e = {};
      for (let r in t) e[r] = Ct(t[r]);
      return e;
    }
    __name(no, "no");
    function gl(t) {
      return new ee(t.strings, t.values);
    }
    __name(gl, "gl");
    function yl(t) {
      return new Pt(t.sql, t.values);
    }
    __name(yl, "yl");
    function Ct(t) {
      if (typeof t != "object" || t == null || t instanceof xe || Ke(t)) return t;
      if (je(t)) return new be(t.toFixed());
      if (Ve(t)) return /* @__PURE__ */ new Date(+t);
      if (ArrayBuffer.isView(t)) return t.slice(0);
      if (Array.isArray(t)) {
        let e = t.length, r;
        for (r = Array(e); e--; ) r[e] = Ct(t[e]);
        return r;
      }
      if (typeof t == "object") {
        let e = {};
        for (let r in t) r === "__proto__" ? Object.defineProperty(e, r, { value: Ct(t[r]), configurable: true, enumerable: true, writable: true }) : e[r] = Ct(t[r]);
        return e;
      }
      Me(t, "Unknown value");
    }
    __name(Ct, "Ct");
    function oo(t, e, r, n = 0) {
      return t._createPrismaPromise((i) => {
        let o = e.customDataProxyFetch;
        return "transaction" in e && i !== void 0 && (e.transaction?.kind === "batch" && e.transaction.lock.then(), e.transaction = i), n === r.length ? t._executeRequest(e) : r[n]({ model: e.model, operation: e.model ? e.action : e.clientMethod, args: no(e.args ?? {}), __internalParams: e, query: /* @__PURE__ */ __name((s, a = e) => {
          let f = a.customDataProxyFetch;
          return a.customDataProxyFetch = uo(o, f), a.args = s, oo(t, a, r, n + 1);
        }, "query") });
      });
    }
    __name(oo, "oo");
    function so(t, e) {
      let { jsModelName: r, action: n, clientMethod: i } = e, o = r ? n : i;
      if (t._extensions.isEmpty()) return t._executeRequest(e);
      let s = t._extensions.getAllQueryCallbacks(r ?? "$none", o);
      return oo(t, e, s);
    }
    __name(so, "so");
    function ao(t) {
      return (e) => {
        let r = { requests: e }, n = e[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? lo(r, n, 0, t) : t(r);
      };
    }
    __name(ao, "ao");
    function lo(t, e, r, n) {
      if (r === e.length) return n(t);
      let i = t.customDataProxyFetch, o = t.requests[0].transaction;
      return e[r]({ args: { queries: t.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: t, query(s, a = t) {
        let f = a.customDataProxyFetch;
        return a.customDataProxyFetch = uo(i, f), lo(a, e, r + 1, n);
      } });
    }
    __name(lo, "lo");
    var io = /* @__PURE__ */ __name((t) => t, "io");
    function uo(t = io, e = io) {
      return (r) => t(e(r));
    }
    __name(uo, "uo");
    u();
    c();
    m();
    p();
    d();
    l();
    var co = G("prisma:client");
    var mo = { Vercel: "vercel", "Netlify CI": "netlify" };
    function po({ postinstall: t, ciName: e, clientVersion: r }) {
      if (co("checkPlatformCaching:postinstall", t), co("checkPlatformCaching:ciName", e), t === true && e && e in mo) {
        let n = `Prisma has detected that this project was built on ${e}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${mo[e]}-build`;
        throw console.error(n), new I(n, r);
      }
    }
    __name(po, "po");
    u();
    c();
    m();
    p();
    d();
    l();
    function fo(t, e) {
      return t ? t.datasources ? t.datasources : t.datasourceUrl ? { [e[0]]: { url: t.datasourceUrl } } : {} : {};
    }
    __name(fo, "fo");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var hl = /* @__PURE__ */ __name(() => globalThis.process?.release?.name === "node", "hl");
    var bl = /* @__PURE__ */ __name(() => !!globalThis.Bun || !!globalThis.process?.versions?.bun, "bl");
    var wl = /* @__PURE__ */ __name(() => !!globalThis.Deno, "wl");
    var El = /* @__PURE__ */ __name(() => typeof globalThis.Netlify == "object", "El");
    var xl = /* @__PURE__ */ __name(() => typeof globalThis.EdgeRuntime == "object", "xl");
    var Pl = /* @__PURE__ */ __name(() => globalThis.navigator?.userAgent === "Cloudflare-Workers", "Pl");
    function vl() {
      return [[El, "netlify"], [xl, "edge-light"], [Pl, "workerd"], [wl, "deno"], [bl, "bun"], [hl, "node"]].flatMap((r) => r[0]() ? [r[1]] : []).at(0) ?? "";
    }
    __name(vl, "vl");
    var Tl = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function Ae() {
      let t = vl();
      return { id: t, prettyName: Tl[t] || t, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(t) };
    }
    __name(Ae, "Ae");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    l();
    function go(t, e) {
      throw new Error(e);
    }
    __name(go, "go");
    function Cl(t) {
      return t !== null && typeof t == "object" && typeof t.$type == "string";
    }
    __name(Cl, "Cl");
    function Al(t, e) {
      let r = {};
      for (let n of Object.keys(t)) r[n] = e(t[n], n);
      return r;
    }
    __name(Al, "Al");
    function et(t) {
      return t === null ? t : Array.isArray(t) ? t.map(et) : typeof t == "object" ? Cl(t) ? Rl(t) : t.constructor !== null && t.constructor.name !== "Object" ? t : Al(t, et) : t;
    }
    __name(et, "et");
    function Rl({ $type: t, value: e }) {
      switch (t) {
        case "BigInt":
          return BigInt(e);
        case "Bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = b.from(e, "base64");
          return new Uint8Array(r, n, i);
        }
        case "DateTime":
          return new Date(e);
        case "Decimal":
          return new v(e);
        case "Json":
          return JSON.parse(e);
        default:
          go(e, "Unknown tagged value");
      }
    }
    __name(Rl, "Rl");
    var yo = "6.15.0";
    u();
    c();
    m();
    p();
    d();
    l();
    function dr({ inlineDatasources: t, overrideDatasources: e, env: r, clientVersion: n }) {
      let i, o = Object.keys(t)[0], s = t[o]?.url, a = e[o]?.url;
      if (o === void 0 ? i = void 0 : a ? i = a : s?.value ? i = s.value : s?.fromEnvVar && (i = r[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0) throw Ae().id === "workerd" ? new I(`error: Environment variable not found: ${s.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`, n) : new I(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
      if (i === void 0) throw new I("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    __name(dr, "dr");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function ho(t) {
      if (t?.kind === "itx") return t.options.id;
    }
    __name(ho, "ho");
    u();
    c();
    m();
    p();
    d();
    l();
    var rn;
    var bo = { async loadLibrary(t) {
      let { clientVersion: e, adapter: r, engineWasm: n } = t;
      if (r === void 0) throw new I(`The \`adapter\` option for \`PrismaClient\` is required in this context (${Ae().prettyName})`, e);
      if (n === void 0) throw new I("WASM engine was unexpectedly `undefined`", e);
      rn === void 0 && (rn = (async () => {
        let o = await n.getRuntime(), s = await n.getQueryEngineWasmModule();
        if (s == null) throw new I("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", e);
        let a = { "./query_engine_bg.js": o }, f = new WebAssembly.Instance(s, a), h = f.exports.__wbindgen_start;
        return o.__wbg_set_wasm(f.exports), h(), o.QueryEngine;
      })());
      let i = await rn;
      return { debugPanic() {
        return Promise.reject("{}");
      }, dmmf() {
        return Promise.resolve("{}");
      }, version() {
        return { commit: "unknown", version: "unknown" };
      }, QueryEngine: i };
    } };
    var Ol = "P2036";
    var ge = G("prisma:client:libraryEngine");
    function kl(t) {
      return t.item_type === "query" && "query" in t;
    }
    __name(kl, "kl");
    function Dl(t) {
      return "level" in t ? t.level === "error" && t.message === "PANIC" : false;
    }
    __name(Dl, "Dl");
    var sO = [...Dr, "native"];
    var Il = 0xffffffffffffffffn;
    var nn = 1n;
    function Ml() {
      let t = nn++;
      return nn > Il && (nn = 1n), t;
    }
    __name(Ml, "Ml");
    var At = class {
      static {
        __name(this, "At");
      }
      name = "LibraryEngine";
      engine;
      libraryInstantiationPromise;
      libraryStartingPromise;
      libraryStoppingPromise;
      libraryStarted;
      executingQueryPromise;
      config;
      QueryEngineConstructor;
      libraryLoader;
      library;
      logEmitter;
      libQueryEnginePath;
      binaryTarget;
      datasourceOverrides;
      datamodel;
      logQueries;
      logLevel;
      lastQuery;
      loggerRustPanic;
      tracingHelper;
      adapterPromise;
      versionInfo;
      constructor(e, r) {
        this.libraryLoader = r ?? bo, this.config = e, this.libraryStarted = false, this.logQueries = e.logQueries ?? false, this.logLevel = e.logLevel ?? "error", this.logEmitter = e.logEmitter, this.datamodel = e.inlineSchema, this.tracingHelper = e.tracingHelper, e.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(e.overrideDatasources)[0], i = e.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary();
      }
      wrapEngine(e) {
        return { applyPendingMigrations: e.applyPendingMigrations?.bind(e), commitTransaction: this.withRequestId(e.commitTransaction.bind(e)), connect: this.withRequestId(e.connect.bind(e)), disconnect: this.withRequestId(e.disconnect.bind(e)), metrics: e.metrics?.bind(e), query: this.withRequestId(e.query.bind(e)), rollbackTransaction: this.withRequestId(e.rollbackTransaction.bind(e)), sdlSchema: e.sdlSchema?.bind(e), startTransaction: this.withRequestId(e.startTransaction.bind(e)), trace: e.trace.bind(e), free: e.free?.bind(e) };
      }
      withRequestId(e) {
        return async (...r) => {
          let n = Ml().toString();
          try {
            return await e(...r, n);
          } finally {
            if (this.tracingHelper.isEnabled()) {
              let i = await this.engine?.trace(n);
              if (i) {
                let o = JSON.parse(i);
                this.tracingHelper.dispatchEngineSpans(o.spans);
              }
            }
          }
        };
      }
      async applyPendingMigrations() {
        throw new Error("Cannot call this method from this type of engine instance");
      }
      async transaction(e, r, n) {
        await this.start();
        let i = await this.adapterPromise, o = JSON.stringify(r), s;
        if (e === "start") {
          let f = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
          s = await this.engine?.startTransaction(f, o);
        } else e === "commit" ? s = await this.engine?.commitTransaction(n.id, o) : e === "rollback" && (s = await this.engine?.rollbackTransaction(n.id, o));
        let a = this.parseEngineResponse(s);
        if (_l(a)) {
          let f = this.getExternalAdapterError(a, i?.errorRegistry);
          throw f ? f.error : new Z(a.message, { code: a.error_code, clientVersion: this.config.clientVersion, meta: a.meta });
        } else if (typeof a.message == "string") throw new Q(a.message, { clientVersion: this.config.clientVersion });
        return a;
      }
      async instantiateLibrary() {
        if (ge("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
        this.binaryTarget = await this.getCurrentBinaryTarget(), await this.tracingHelper.runInChildSpan("load_engine", () => this.loadEngine()), this.version();
      }
      async getCurrentBinaryTarget() {
      }
      parseEngineResponse(e) {
        if (!e) throw new Q("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
        try {
          return JSON.parse(e);
        } catch {
          throw new Q("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
        }
      }
      async loadEngine() {
        if (!this.engine) {
          this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
          try {
            let e = new w(this);
            this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(qt));
            let r = await this.adapterPromise;
            r && ge("Using driver adapter: %O", r), this.engine = this.wrapEngine(new this.QueryEngineConstructor({ datamodel: this.datamodel, env: g.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json", enableTracing: this.tracingHelper.isEnabled() }, (n) => {
              e.deref()?.logger(n);
            }, r));
          } catch (e) {
            let r = e, n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new I(n.message, this.config.clientVersion, n.error_code);
          }
        }
      }
      logger(e) {
        let r = this.parseEngineResponse(e);
        r && (r.level = r?.level.toLowerCase() ?? "unknown", kl(r) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: r.query, params: r.params, duration: Number(r.duration_ms), target: r.module_path }) : (Dl(r), this.logEmitter.emit(r.level, { timestamp: /* @__PURE__ */ new Date(), message: r.message, target: r.module_path })));
      }
      parseInitError(e) {
        try {
          return JSON.parse(e);
        } catch {
        }
        return e;
      }
      parseRequestError(e) {
        try {
          return JSON.parse(e);
        } catch {
        }
        return e;
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        if (this.libraryInstantiationPromise || (this.libraryInstantiationPromise = this.instantiateLibrary()), await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return ge(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted) return;
        let e = /* @__PURE__ */ __name(async () => {
          ge("library starting");
          try {
            let r = { traceparent: this.tracingHelper.getTraceParent() };
            await this.engine?.connect(JSON.stringify(r)), this.libraryStarted = true, this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(qt)), await this.adapterPromise, ge("library started");
          } catch (r) {
            let n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new I(n.message, this.config.clientVersion, n.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        }, "e");
        return this.libraryStartingPromise = this.tracingHelper.runInChildSpan("connect", e), this.libraryStartingPromise;
      }
      async stop() {
        if (await this.libraryInstantiationPromise, await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return ge("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted) {
          await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0;
          return;
        }
        let e = /* @__PURE__ */ __name(async () => {
          await new Promise((n) => setImmediate(n)), ge("library stopping");
          let r = { traceparent: this.tracingHelper.getTraceParent() };
          await this.engine?.disconnect(JSON.stringify(r)), this.engine?.free && this.engine.free(), this.engine = void 0, this.libraryStarted = false, this.libraryStoppingPromise = void 0, this.libraryInstantiationPromise = void 0, await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0, ge("library stopped");
        }, "e");
        return this.libraryStoppingPromise = this.tracingHelper.runInChildSpan("disconnect", e), this.libraryStoppingPromise;
      }
      version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
      }
      debugPanic(e) {
        return this.library?.debugPanic(e);
      }
      async request(e, { traceparent: r, interactiveTransaction: n }) {
        ge(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({ traceparent: r }), o = JSON.stringify(e);
        try {
          await this.start();
          let s = await this.adapterPromise;
          this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
          let a = this.parseEngineResponse(await this.executingQueryPromise);
          if (a.errors) throw a.errors.length === 1 ? this.buildQueryError(a.errors[0], s?.errorRegistry) : new Q(JSON.stringify(a.errors), { clientVersion: this.config.clientVersion });
          if (this.loggerRustPanic) throw this.loggerRustPanic;
          return { data: a };
        } catch (s) {
          if (s instanceof I) throw s;
          s.code === "GenericFailure" && s.message?.startsWith("PANIC:");
          let a = this.parseRequestError(s.message);
          throw typeof a == "string" ? s : new Q(`${a.message}
${a.backtrace}`, { clientVersion: this.config.clientVersion });
        }
      }
      async requestBatch(e, { transaction: r, traceparent: n }) {
        ge("requestBatch");
        let i = ur(e, r);
        await this.start();
        let o = await this.adapterPromise;
        this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine?.query(this.lastQuery, JSON.stringify({ traceparent: n }), ho(r));
        let s = await this.executingQueryPromise, a = this.parseEngineResponse(s);
        if (a.errors) throw a.errors.length === 1 ? this.buildQueryError(a.errors[0], o?.errorRegistry) : new Q(JSON.stringify(a.errors), { clientVersion: this.config.clientVersion });
        let { batchResult: f, errors: h } = a;
        if (Array.isArray(f)) return f.map((C) => C.errors && C.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(C.errors[0], o?.errorRegistry) : { data: C });
        throw h && h.length === 1 ? new Error(h[0].error) : new Error(JSON.stringify(a));
      }
      buildQueryError(e, r) {
        e.user_facing_error.is_panic;
        let n = this.getExternalAdapterError(e.user_facing_error, r);
        return n ? n.error : cr(e, this.config.clientVersion, this.config.activeProvider);
      }
      getExternalAdapterError(e, r) {
        if (e.error_code === Ol && r) {
          let n = e.meta?.id;
          Bt(typeof n == "number", "Malformed external JS error received from the engine");
          let i = r.consumeError(n);
          return Bt(i, "External error with reported id was not registered"), i;
        }
      }
      async metrics(e) {
        await this.start();
        let r = await this.engine.metrics(JSON.stringify(e));
        return e.format === "prometheus" ? r : this.parseEngineResponse(r);
      }
    };
    function _l(t) {
      return typeof t == "object" && t !== null && t.error_code !== void 0;
    }
    __name(_l, "_l");
    u();
    c();
    m();
    p();
    d();
    l();
    var Rt = "Accelerate has not been setup correctly. Make sure your client is using `.$extends(withAccelerate())`. See https://pris.ly/d/accelerate-getting-started";
    var fr = class {
      static {
        __name(this, "fr");
      }
      constructor(e) {
        this.config = e;
        this.resolveDatasourceUrl = this.config.accelerateUtils?.resolveDatasourceUrl, this.getBatchRequestPayload = this.config.accelerateUtils?.getBatchRequestPayload, this.prismaGraphQLToJSError = this.config.accelerateUtils?.prismaGraphQLToJSError, this.PrismaClientUnknownRequestError = this.config.accelerateUtils?.PrismaClientUnknownRequestError, this.PrismaClientInitializationError = this.config.accelerateUtils?.PrismaClientInitializationError, this.PrismaClientKnownRequestError = this.config.accelerateUtils?.PrismaClientKnownRequestError, this.debug = this.config.accelerateUtils?.debug, this.engineVersion = this.config.accelerateUtils?.engineVersion, this.clientVersion = this.config.accelerateUtils?.clientVersion;
      }
      name = "AccelerateEngine";
      resolveDatasourceUrl;
      getBatchRequestPayload;
      prismaGraphQLToJSError;
      PrismaClientUnknownRequestError;
      PrismaClientInitializationError;
      PrismaClientKnownRequestError;
      debug;
      engineVersion;
      clientVersion;
      onBeforeExit(e) {
      }
      async start() {
      }
      async stop() {
      }
      version(e) {
        return "unknown";
      }
      transaction(e, r, n) {
        throw new I(Rt, this.config.clientVersion);
      }
      metrics(e) {
        throw new I(Rt, this.config.clientVersion);
      }
      request(e, r) {
        throw new I(Rt, this.config.clientVersion);
      }
      requestBatch(e, r) {
        throw new I(Rt, this.config.clientVersion);
      }
      applyPendingMigrations() {
        throw new I(Rt, this.config.clientVersion);
      }
    };
    u();
    c();
    m();
    p();
    d();
    l();
    function wo({ url: t, adapter: e, copyEngine: r, targetBuildType: n }) {
      let i = [], o = [], s = /* @__PURE__ */ __name((O) => {
        i.push({ _tag: "warning", value: O });
      }, "s"), a = /* @__PURE__ */ __name((O) => {
        let D = O.join(`
`);
        o.push({ _tag: "error", value: D });
      }, "a"), f = !!t?.startsWith("prisma://"), h = Lr(t), C = !!e, A = f || h;
      !C && r && A && s(["recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)"]);
      let k = A || !r;
      C && (k || n === "edge") && (n === "edge" ? a(["Prisma Client was configured to use the `adapter` option but it was imported via its `/edge` endpoint.", "Please either remove the `/edge` endpoint or remove the `adapter` from the Prisma Client constructor."]) : r ? f && a(["Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.", "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor."]) : a(["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."]));
      let R = { accelerate: k, ppg: h, driverAdapters: C };
      function _(O) {
        return O.length > 0;
      }
      __name(_, "_");
      return _(o) ? { ok: false, diagnostics: { warnings: i, errors: o }, isUsing: R } : { ok: true, diagnostics: { warnings: i }, isUsing: R };
    }
    __name(wo, "wo");
    function Eo({ copyEngine: t = true }, e) {
      let r;
      try {
        r = dr({ inlineDatasources: e.inlineDatasources, overrideDatasources: e.overrideDatasources, env: { ...e.env, ...g.env }, clientVersion: e.clientVersion });
      } catch {
      }
      let { ok: n, isUsing: i, diagnostics: o } = wo({ url: r, adapter: e.adapter, copyEngine: t, targetBuildType: "wasm-engine-edge" });
      for (let A of o.warnings) ut(...A.value);
      if (!n) {
        let A = o.errors[0];
        throw new K(A.value, { clientVersion: e.clientVersion });
      }
      let s = Be(e.generator), a = s === "library", f = s === "binary", h = s === "client", C = (i.accelerate || i.ppg) && !i.driverAdapters;
      if (i.accelerate, i.driverAdapters) return new At(e);
      if (i.accelerate) return new fr(e);
      {
        let A = [`PrismaClient failed to initialize because it wasn't configured to run in this environment (${Ae().prettyName}).`, "In order to run Prisma Client in an edge runtime, you will need to configure one of the following options:", "- Enable Driver Adapters: https://pris.ly/d/driver-adapters", "- Enable Accelerate: https://pris.ly/d/accelerate"];
        throw new K(A.join(`
`), { clientVersion: e.clientVersion });
      }
      return "wasm-engine-edge";
    }
    __name(Eo, "Eo");
    u();
    c();
    m();
    p();
    d();
    l();
    function gr({ generator: t }) {
      return t?.previewFeatures ?? [];
    }
    __name(gr, "gr");
    u();
    c();
    m();
    p();
    d();
    l();
    var xo = /* @__PURE__ */ __name((t) => ({ command: t }), "xo");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var Po = /* @__PURE__ */ __name((t) => t.strings.reduce((e, r, n) => `${e}@P${n}${r}`), "Po");
    u();
    c();
    m();
    p();
    d();
    l();
    l();
    function tt(t) {
      try {
        return vo(t, "fast");
      } catch {
        return vo(t, "slow");
      }
    }
    __name(tt, "tt");
    function vo(t, e) {
      return JSON.stringify(t.map((r) => Co(r, e)));
    }
    __name(vo, "vo");
    function Co(t, e) {
      if (Array.isArray(t)) return t.map((r) => Co(r, e));
      if (typeof t == "bigint") return { prisma__type: "bigint", prisma__value: t.toString() };
      if (Ve(t)) return { prisma__type: "date", prisma__value: t.toJSON() };
      if (be.isDecimal(t)) return { prisma__type: "decimal", prisma__value: t.toJSON() };
      if (b.isBuffer(t)) return { prisma__type: "bytes", prisma__value: t.toString("base64") };
      if (Ll(t)) return { prisma__type: "bytes", prisma__value: b.from(t).toString("base64") };
      if (ArrayBuffer.isView(t)) {
        let { buffer: r, byteOffset: n, byteLength: i } = t;
        return { prisma__type: "bytes", prisma__value: b.from(r, n, i).toString("base64") };
      }
      return typeof t == "object" && e === "slow" ? Ao(t) : t;
    }
    __name(Co, "Co");
    function Ll(t) {
      return t instanceof ArrayBuffer || t instanceof SharedArrayBuffer ? true : typeof t == "object" && t !== null ? t[Symbol.toStringTag] === "ArrayBuffer" || t[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    __name(Ll, "Ll");
    function Ao(t) {
      if (typeof t != "object" || t === null) return t;
      if (typeof t.toJSON == "function") return t.toJSON();
      if (Array.isArray(t)) return t.map(To);
      let e = {};
      for (let r of Object.keys(t)) e[r] = To(t[r]);
      return e;
    }
    __name(Ao, "Ao");
    function To(t) {
      return typeof t == "bigint" ? t.toString() : Ao(t);
    }
    __name(To, "To");
    var Fl = /^(\s*alter\s)/i;
    var Ro = G("prisma:client");
    function on(t, e, r, n) {
      if (!(t !== "postgresql" && t !== "cockroachdb") && r.length > 0 && Fl.exec(e)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    __name(on, "on");
    var sn = /* @__PURE__ */ __name(({ clientMethod: t, activeProvider: e }) => (r) => {
      let n = "", i;
      if (or(r)) n = r.sql, i = { values: tt(r.values), __prismaRawParameters__: true };
      else if (Array.isArray(r)) {
        let [o, ...s] = r;
        n = o, i = { values: tt(s || []), __prismaRawParameters__: true };
      } else switch (e) {
        case "sqlite":
        case "mysql": {
          n = r.sql, i = { values: tt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = r.text, i = { values: tt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "sqlserver": {
          n = Po(r), i = { values: tt(r.values), __prismaRawParameters__: true };
          break;
        }
        default:
          throw new Error(`The ${e} provider does not support ${t}`);
      }
      return i?.values ? Ro(`prisma.${t}(${n}, ${i.values})`) : Ro(`prisma.${t}(${n})`), { query: n, parameters: i };
    }, "sn");
    var So = { requestArgsToMiddlewareArgs(t) {
      return [t.strings, ...t.values];
    }, middlewareArgsToRequestArgs(t) {
      let [e, ...r] = t;
      return new ee(e, r);
    } };
    var Oo = { requestArgsToMiddlewareArgs(t) {
      return [t];
    }, middlewareArgsToRequestArgs(t) {
      return t[0];
    } };
    u();
    c();
    m();
    p();
    d();
    l();
    function an(t) {
      return function(r, n) {
        let i, o = /* @__PURE__ */ __name((s = t) => {
          try {
            return s === void 0 || s?.kind === "itx" ? i ??= ko(r(s)) : ko(r(s));
          } catch (a) {
            return Promise.reject(a);
          }
        }, "o");
        return { get spec() {
          return n;
        }, then(s, a) {
          return o().then(s, a);
        }, catch(s) {
          return o().catch(s);
        }, finally(s) {
          return o().finally(s);
        }, requestTransaction(s) {
          let a = o(s);
          return a.requestTransaction ? a.requestTransaction(s) : a;
        }, [Symbol.toStringTag]: "PrismaPromise" };
      };
    }
    __name(an, "an");
    function ko(t) {
      return typeof t.then == "function" ? t : Promise.resolve(t);
    }
    __name(ko, "ko");
    u();
    c();
    m();
    p();
    d();
    l();
    var Ul = Ir.split(".")[0];
    var Nl = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, dispatchEngineSpans() {
    }, getActiveContext() {
    }, runInChildSpan(t, e) {
      return e();
    } };
    var ln = class {
      static {
        __name(this, "ln");
      }
      isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
      }
      getTraceParent(e) {
        return this.getGlobalTracingHelper().getTraceParent(e);
      }
      dispatchEngineSpans(e) {
        return this.getGlobalTracingHelper().dispatchEngineSpans(e);
      }
      getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
      }
      runInChildSpan(e, r) {
        return this.getGlobalTracingHelper().runInChildSpan(e, r);
      }
      getGlobalTracingHelper() {
        let e = globalThis[`V${Ul}_PRISMA_INSTRUMENTATION`], r = globalThis.PRISMA_INSTRUMENTATION;
        return e?.helper ?? r?.helper ?? Nl;
      }
    };
    function Do() {
      return new ln();
    }
    __name(Do, "Do");
    u();
    c();
    m();
    p();
    d();
    l();
    function Io(t, e = () => {
    }) {
      let r, n = new Promise((i) => r = i);
      return { then(i) {
        return --t === 0 && r(e()), i?.(n);
      } };
    }
    __name(Io, "Io");
    u();
    c();
    m();
    p();
    d();
    l();
    function Mo(t) {
      return typeof t == "string" ? t : t.reduce((e, r) => {
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? e : e && (r === "info" || e === "info") ? "info" : n;
      }, void 0);
    }
    __name(Mo, "Mo");
    u();
    c();
    m();
    p();
    d();
    l();
    var Lo = it(ei());
    u();
    c();
    m();
    p();
    d();
    l();
    function yr(t) {
      return typeof t.batchRequestIdx == "number";
    }
    __name(yr, "yr");
    u();
    c();
    m();
    p();
    d();
    l();
    function _o(t) {
      if (t.action !== "findUnique" && t.action !== "findUniqueOrThrow") return;
      let e = [];
      return t.modelName && e.push(t.modelName), t.query.arguments && e.push(un(t.query.arguments)), e.push(un(t.query.selection)), e.join("");
    }
    __name(_o, "_o");
    function un(t) {
      return `(${Object.keys(t).sort().map((r) => {
        let n = t[r];
        return typeof n == "object" && n !== null ? `(${r} ${un(n)})` : r;
      }).join(" ")})`;
    }
    __name(un, "un");
    u();
    c();
    m();
    p();
    d();
    l();
    var ql = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateManyAndReturn: true, updateOne: true, upsertOne: true };
    function cn(t) {
      return ql[t];
    }
    __name(cn, "cn");
    u();
    c();
    m();
    p();
    d();
    l();
    var hr = class {
      static {
        __name(this, "hr");
      }
      constructor(e) {
        this.options = e;
        this.batches = {};
      }
      batches;
      tickActive = false;
      request(e) {
        let r = this.options.batchBy(e);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, g.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[r].push({ request: e, resolve: n, reject: i });
        })) : this.options.singleLoader(e);
      }
      dispatchBatches() {
        for (let e in this.batches) {
          let r = this.batches[e];
          delete this.batches[e], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
            n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
          }).catch((n) => {
            r[0].reject(n);
          }) : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(r.map((n) => n.request)).then((n) => {
            if (n instanceof Error) for (let i = 0; i < r.length; i++) r[i].reject(n);
            else for (let i = 0; i < r.length; i++) {
              let o = n[i];
              o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
            }
          }).catch((n) => {
            for (let i = 0; i < r.length; i++) r[i].reject(n);
          }));
        }
      }
      get [Symbol.toStringTag]() {
        return "DataLoader";
      }
    };
    u();
    c();
    m();
    p();
    d();
    l();
    l();
    function Le(t, e) {
      if (e === null) return e;
      switch (t) {
        case "bigint":
          return BigInt(e);
        case "bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = b.from(e, "base64");
          return new Uint8Array(r, n, i);
        }
        case "decimal":
          return new be(e);
        case "datetime":
        case "date":
          return new Date(e);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${e}Z`);
        case "bigint-array":
          return e.map((r) => Le("bigint", r));
        case "bytes-array":
          return e.map((r) => Le("bytes", r));
        case "decimal-array":
          return e.map((r) => Le("decimal", r));
        case "datetime-array":
          return e.map((r) => Le("datetime", r));
        case "date-array":
          return e.map((r) => Le("date", r));
        case "time-array":
          return e.map((r) => Le("time", r));
        default:
          return e;
      }
    }
    __name(Le, "Le");
    function br(t) {
      let e = [], r = Bl(t);
      for (let n = 0; n < t.rows.length; n++) {
        let i = t.rows[n], o = { ...r };
        for (let s = 0; s < i.length; s++) o[t.columns[s]] = Le(t.types[s], i[s]);
        e.push(o);
      }
      return e;
    }
    __name(br, "br");
    function Bl(t) {
      let e = {};
      for (let r = 0; r < t.columns.length; r++) e[t.columns[r]] = null;
      return e;
    }
    __name(Bl, "Bl");
    var Vl = G("prisma:client:request_handler");
    var wr = class {
      static {
        __name(this, "wr");
      }
      client;
      dataloader;
      logEmitter;
      constructor(e, r) {
        this.logEmitter = r, this.client = e, this.dataloader = new hr({ batchLoader: ao(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s } = n[0], a = n.map((A) => A.protocolQuery), f = this.client._tracingHelper.getTraceParent(s), h = n.some((A) => cn(A.protocolQuery.action));
          return (await this.client._engine.requestBatch(a, { traceparent: f, transaction: jl(o), containsWrite: h, customDataProxyFetch: i })).map((A, k) => {
            if (A instanceof Error) return A;
            try {
              return this.mapQueryEngineResult(n[k], A);
            } catch (R) {
              return R;
            }
          });
        }), singleLoader: /* @__PURE__ */ __name(async (n) => {
          let i = n.transaction?.kind === "itx" ? Fo(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: cn(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, "singleLoader"), batchBy: /* @__PURE__ */ __name((n) => n.transaction?.id ? `transaction-${n.transaction.id}` : _o(n.protocolQuery), "batchBy"), batchOrder(n, i) {
          return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(e) {
        try {
          return await this.dataloader.request(e);
        } catch (r) {
          let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a } = e;
          this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o, args: s, modelName: a, globalOmit: e.globalOmit });
        }
      }
      mapQueryEngineResult({ dataPath: e, unpacker: r }, n) {
        let i = n?.data, o = this.unpack(i, e, r);
        return g.env.PRISMA_CLIENT_GET_TIME ? { data: o } : o;
      }
      handleAndLogRequestError(e) {
        try {
          this.handleRequestError(e);
        } catch (r) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: e.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
        }
      }
      handleRequestError({ error: e, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a }) {
        if (Vl(e), $l(e, i)) throw e;
        if (e instanceof Z && Ql(e)) {
          let h = Uo(e.meta);
          Zt({ args: o, errors: [h], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a });
        }
        let f = e.message;
        if (n && (f = $t({ callsite: n, originalMethod: r, isPanic: e.isPanic, showColors: this.client._errorFormat === "pretty", message: f })), f = this.sanitizeMessage(f), e.code) {
          let h = s ? { modelName: s, ...e.meta } : e.meta;
          throw new Z(f, { code: e.code, clientVersion: this.client._clientVersion, meta: h, batchRequestIdx: e.batchRequestIdx });
        } else {
          if (e.isPanic) throw new Ee(f, this.client._clientVersion);
          if (e instanceof Q) throw new Q(f, { clientVersion: this.client._clientVersion, batchRequestIdx: e.batchRequestIdx });
          if (e instanceof I) throw new I(f, this.client._clientVersion);
          if (e instanceof Ee) throw new Ee(f, this.client._clientVersion);
        }
        throw e.clientVersion = this.client._clientVersion, e;
      }
      sanitizeMessage(e) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? (0, Lo.default)(e) : e;
      }
      unpack(e, r, n) {
        if (!e || (e.data && (e = e.data), !e)) return e;
        let i = Object.keys(e)[0], o = Object.values(e)[0], s = r.filter((h) => h !== "select" && h !== "include"), a = Xr(o, s), f = i === "queryRaw" ? br(a) : et(a);
        return n ? n(f) : f;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    };
    function jl(t) {
      if (t) {
        if (t.kind === "batch") return { kind: "batch", options: { isolationLevel: t.isolationLevel } };
        if (t.kind === "itx") return { kind: "itx", options: Fo(t) };
        Me(t, "Unknown transaction kind");
      }
    }
    __name(jl, "jl");
    function Fo(t) {
      return { id: t.id, payload: t.payload };
    }
    __name(Fo, "Fo");
    function $l(t, e) {
      return yr(t) && e?.kind === "batch" && t.batchRequestIdx !== e.index;
    }
    __name($l, "$l");
    function Ql(t) {
      return t.code === "P2009" || t.code === "P2012";
    }
    __name(Ql, "Ql");
    function Uo(t) {
      if (t.kind === "Union") return { kind: "Union", errors: t.errors.map(Uo) };
      if (Array.isArray(t.selectionPath)) {
        let [, ...e] = t.selectionPath;
        return { ...t, selectionPath: e };
      }
      return t;
    }
    __name(Uo, "Uo");
    u();
    c();
    m();
    p();
    d();
    l();
    var No = yo;
    u();
    c();
    m();
    p();
    d();
    l();
    var $o = it(Br());
    u();
    c();
    m();
    p();
    d();
    l();
    var M = class extends Error {
      static {
        __name(this, "M");
      }
      constructor(e) {
        super(e + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    };
    re(M, "PrismaClientConstructorValidationError");
    var qo = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"];
    var Bo = ["pretty", "colorless", "minimal"];
    var Vo = ["info", "query", "warn", "error"];
    var Jl = { datasources: /* @__PURE__ */ __name((t, { datasourceNames: e }) => {
      if (t) {
        if (typeof t != "object" || Array.isArray(t)) throw new M(`Invalid value ${JSON.stringify(t)} for "datasources" provided to PrismaClient constructor`);
        for (let [r, n] of Object.entries(t)) {
          if (!e.includes(r)) {
            let i = rt(r, e) || ` Available datasources: ${e.join(", ")}`;
            throw new M(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n)) throw new M(`Invalid value ${JSON.stringify(t)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object") for (let [i, o] of Object.entries(n)) {
            if (i !== "url") throw new M(`Invalid value ${JSON.stringify(t)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (typeof o != "string") throw new M(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          }
        }
      }
    }, "datasources"), adapter: /* @__PURE__ */ __name((t, e) => {
      if (!t && Be(e.generator) === "client") throw new M('Using engine type "client" requires a driver adapter to be provided to PrismaClient constructor.');
      if (t === null) return;
      if (t === void 0) throw new M('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
      if (!gr(e).includes("driverAdapters")) throw new M('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');
      if (Be(e.generator) === "binary") throw new M('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
    }, "adapter"), datasourceUrl: /* @__PURE__ */ __name((t) => {
      if (typeof t < "u" && typeof t != "string") throw new M(`Invalid value ${JSON.stringify(t)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, "datasourceUrl"), errorFormat: /* @__PURE__ */ __name((t) => {
      if (t) {
        if (typeof t != "string") throw new M(`Invalid value ${JSON.stringify(t)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!Bo.includes(t)) {
          let e = rt(t, Bo);
          throw new M(`Invalid errorFormat ${t} provided to PrismaClient constructor.${e}`);
        }
      }
    }, "errorFormat"), log: /* @__PURE__ */ __name((t) => {
      if (!t) return;
      if (!Array.isArray(t)) throw new M(`Invalid value ${JSON.stringify(t)} for "log" provided to PrismaClient constructor.`);
      function e(r) {
        if (typeof r == "string" && !Vo.includes(r)) {
          let n = rt(r, Vo);
          throw new M(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
        }
      }
      __name(e, "e");
      for (let r of t) {
        e(r);
        let n = { level: e, emit: /* @__PURE__ */ __name((i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s = rt(i, o);
            throw new M(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
          }
        }, "emit") };
        if (r && typeof r == "object") for (let [i, o] of Object.entries(r)) if (n[i]) n[i](o);
        else throw new M(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, "log"), transactionOptions: /* @__PURE__ */ __name((t) => {
      if (!t) return;
      let e = t.maxWait;
      if (e != null && e <= 0) throw new M(`Invalid value ${e} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let r = t.timeout;
      if (r != null && r <= 0) throw new M(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, "transactionOptions"), omit: /* @__PURE__ */ __name((t, e) => {
      if (typeof t != "object") throw new M('"omit" option is expected to be an object.');
      if (t === null) throw new M('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(t)) {
        let o = Wl(n, e.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s, a] of Object.entries(i)) {
          let f = o.fields.find((h) => h.name === s);
          if (!f) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
            continue;
          }
          if (f.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
            continue;
          }
          typeof a != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
        }
      }
      if (r.length > 0) throw new M(Kl(t, r));
    }, "omit"), __internal: /* @__PURE__ */ __name((t) => {
      if (!t) return;
      let e = ["debug", "engine", "configOverride"];
      if (typeof t != "object") throw new M(`Invalid value ${JSON.stringify(t)} for "__internal" to PrismaClient constructor`);
      for (let [r] of Object.entries(t)) if (!e.includes(r)) {
        let n = rt(r, e);
        throw new M(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
      }
    }, "__internal") };
    function Qo(t, e) {
      for (let [r, n] of Object.entries(t)) {
        if (!qo.includes(r)) {
          let i = rt(r, qo);
          throw new M(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        Jl[r](n, e);
      }
      if (t.datasourceUrl && t.datasources) throw new M('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    __name(Qo, "Qo");
    function rt(t, e) {
      if (e.length === 0 || typeof t != "string") return "";
      let r = Gl(t, e);
      return r ? ` Did you mean "${r}"?` : "";
    }
    __name(rt, "rt");
    function Gl(t, e) {
      if (e.length === 0) return null;
      let r = e.map((i) => ({ value: i, distance: (0, $o.default)(t, i) }));
      r.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = r[0];
      return n.distance < 3 ? n.value : null;
    }
    __name(Gl, "Gl");
    function Wl(t, e) {
      return jo(e.models, t) ?? jo(e.types, t);
    }
    __name(Wl, "Wl");
    function jo(t, e) {
      let r = Object.keys(t).find((n) => ve(n) === e);
      if (r) return t[r];
    }
    __name(jo, "jo");
    function Kl(t, e) {
      let r = He(t);
      for (let o of e) switch (o.kind) {
        case "UnknownModel":
          r.arguments.getField(o.modelKey)?.markAsError(), r.addErrorMessage(() => `Unknown model name: ${o.modelKey}.`);
          break;
        case "UnknownField":
          r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => `Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);
          break;
        case "RelationInOmit":
          r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
          break;
        case "InvalidFieldValue":
          r.arguments.getDeepFieldValue([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => "Omit field option value must be a boolean.");
          break;
      }
      let { message: n, args: i } = Xt(r, "colorless");
      return `Error validating "omit" option:

${i}

${n}`;
    }
    __name(Kl, "Kl");
    u();
    c();
    m();
    p();
    d();
    l();
    function Jo(t) {
      return t.length === 0 ? Promise.resolve([]) : new Promise((e, r) => {
        let n = new Array(t.length), i = null, o = false, s = 0, a = /* @__PURE__ */ __name(() => {
          o || (s++, s === t.length && (o = true, i ? r(i) : e(n)));
        }, "a"), f = /* @__PURE__ */ __name((h) => {
          o || (o = true, r(h));
        }, "f");
        for (let h = 0; h < t.length; h++) t[h].then((C) => {
          n[h] = C, a();
        }, (C) => {
          if (!yr(C)) {
            f(C);
            return;
          }
          C.batchRequestIdx === h ? f(C) : (i || (i = C), a());
        });
      });
    }
    __name(Jo, "Jo");
    var Re = G("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var Hl = { requestArgsToMiddlewareArgs: /* @__PURE__ */ __name((t) => t, "requestArgsToMiddlewareArgs"), middlewareArgsToRequestArgs: /* @__PURE__ */ __name((t) => t, "middlewareArgsToRequestArgs") };
    var zl = Symbol.for("prisma.client.transaction.id");
    var Yl = { id: 0, nextId() {
      return ++this.id;
    } };
    function Ko(t) {
      class e {
        static {
          __name(this, "e");
        }
        _originalClient = this;
        _runtimeDataModel;
        _requestHandler;
        _connectionPromise;
        _disconnectionPromise;
        _engineConfig;
        _accelerateEngineConfig;
        _clientVersion;
        _errorFormat;
        _tracingHelper;
        _previewFeatures;
        _activeProvider;
        _globalOmit;
        _extensions;
        _engine;
        _appliedParent;
        _createPrismaPromise = an();
        constructor(n) {
          t = n?.__internal?.configOverride?.(t) ?? t, po(t), n && Qo(n, t);
          let i = new sr().on("error", () => {
          });
          this._extensions = ze.empty(), this._previewFeatures = gr(t), this._clientVersion = t.clientVersion ?? No, this._activeProvider = t.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = Do();
          let o = t.relativeEnvPaths && { rootEnvPath: t.relativeEnvPaths.rootEnvPath && Ut.resolve(t.dirname, t.relativeEnvPaths.rootEnvPath), schemaEnvPath: t.relativeEnvPaths.schemaEnvPath && Ut.resolve(t.dirname, t.relativeEnvPaths.schemaEnvPath) }, s;
          if (n?.adapter) {
            s = n.adapter;
            let f = t.activeProvider === "postgresql" || t.activeProvider === "cockroachdb" ? "postgres" : t.activeProvider;
            if (s.provider !== f) throw new I(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${f}\` specified in the Prisma schema.`, this._clientVersion);
            if (n.datasources || n.datasourceUrl !== void 0) throw new I("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
          }
          let a = t.injectableEdgeEnv?.();
          try {
            let f = n ?? {}, h = f.__internal ?? {}, C = h.debug === true;
            C && G.enable("prisma:client");
            let A = Ut.resolve(t.dirname, t.relativePath);
            Nn.existsSync(A) || (A = t.dirname), Re("dirname", t.dirname), Re("relativePath", t.relativePath), Re("cwd", A);
            let k = h.engine || {};
            if (f.errorFormat ? this._errorFormat = f.errorFormat : g.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : g.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = t.runtimeDataModel, this._engineConfig = { cwd: A, dirname: t.dirname, enableDebugLogs: C, allowTriggerPanic: k.allowTriggerPanic, prismaPath: k.binaryPath ?? void 0, engineEndpoint: k.endpoint, generator: t.generator, showColors: this._errorFormat === "pretty", logLevel: f.log && Mo(f.log), logQueries: f.log && !!(typeof f.log == "string" ? f.log === "query" : f.log.find((R) => typeof R == "string" ? R === "query" : R.level === "query")), env: a?.parsed ?? {}, flags: [], engineWasm: t.engineWasm, compilerWasm: t.compilerWasm, clientVersion: t.clientVersion, engineVersion: t.engineVersion, previewFeatures: this._previewFeatures, activeProvider: t.activeProvider, inlineSchema: t.inlineSchema, overrideDatasources: fo(f, t.datasourceNames), inlineDatasources: t.inlineDatasources, inlineSchemaHash: t.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: f.transactionOptions?.maxWait ?? 2e3, timeout: f.transactionOptions?.timeout ?? 5e3, isolationLevel: f.transactionOptions?.isolationLevel }, logEmitter: i, isBundled: t.isBundled, adapter: s }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: dr, getBatchRequestPayload: ur, prismaGraphQLToJSError: cr, PrismaClientUnknownRequestError: Q, PrismaClientInitializationError: I, PrismaClientKnownRequestError: Z, debug: G("prisma:client:accelerateEngine"), engineVersion: Wo.version, clientVersion: t.clientVersion } }, Re("clientVersion", t.clientVersion), this._engine = Eo(t, this._engineConfig), this._requestHandler = new wr(this, i), f.log) for (let R of f.log) {
              let _ = typeof R == "string" ? R : R.emit === "stdout" ? R.level : null;
              _ && this.$on(_, (O) => {
                lt.log(`${lt.tags[_] ?? ""}`, O.message || O.query);
              });
            }
          } catch (f) {
            throw f.clientVersion = this._clientVersion, f;
          }
          return this._appliedParent = Tt(this);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClient";
        }
        $on(n, i) {
          return n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i), this;
        }
        $connect() {
          try {
            return this._engine.start();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          }
        }
        async $disconnect() {
          try {
            await this._engine.stop();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          } finally {
            Un();
          }
        }
        $executeRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: sn({ clientMethod: i, activeProvider: a }), callsite: Ce(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s, a] = Go(n, i);
              return on(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a);
            }
            throw new K("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (on(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (t.activeProvider !== "mongodb") throw new K(`The ${t.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: xo, callsite: Ce(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: sn({ clientMethod: i, activeProvider: a }), callsite: Ce(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...Go(n, i));
            throw new K("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawTyped(n) {
          return this._createPrismaPromise((i) => {
            if (!this._hasPreviewFlag("typedSql")) throw new K("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
            return this.$queryRawInternal(i, "$queryRawTyped", n);
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = Yl.nextId(), s = Io(n.length), a = n.map((f, h) => {
            if (f?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let C = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, A = { kind: "batch", id: o, index: h, isolationLevel: C, lock: s };
            return f.requestTransaction?.(A) ?? f;
          });
          return Jo(a);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, a = await this._engine.transaction("start", o, s), f;
          try {
            let h = { kind: "itx", ...a };
            f = await n(this._createItxClient(h)), await this._engine.transaction("commit", o, a);
          } catch (h) {
            throw await this._engine.transaction("rollback", o, a).catch(() => {
            }), h;
          }
          return f;
        }
        _createItxClient(n) {
          return ae(Tt(ae(Yi(this), [H("_appliedParent", () => this._appliedParent._createItxClient(n)), H("_createPrismaPromise", () => an(n)), H(zl, () => n.id)])), [Xe(ro)]);
        }
        $transaction(n, i) {
          let o;
          typeof n == "function" ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? o = /* @__PURE__ */ __name(() => {
            throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
          }, "o") : o = /* @__PURE__ */ __name(() => this._transactionWithCallback({ callback: n, options: i }), "o") : o = /* @__PURE__ */ __name(() => this._transactionWithArray({ promises: n, options: i }), "o");
          let s = { name: "transaction", attributes: { method: "$transaction" } };
          return this._tracingHelper.runInChildSpan(s, o);
        }
        _request(n) {
          n.otelParentCtx = this._tracingHelper.getActiveContext();
          let i = n.middlewareArgsMapper ?? Hl, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a = /* @__PURE__ */ __name(async (f) => {
            let { runInTransaction: h, args: C, ...A } = f, k = { ...n, ...A };
            C && (k.args = i.middlewareArgsToRequestArgs(C)), n.transaction !== void 0 && h === false && delete k.transaction;
            let R = await so(this, k);
            return k.model ? to({ result: R, modelName: k.model, args: k.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : R;
          }, "a");
          return this._tracingHelper.runInChildSpan(s.operation, () => a(o));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a, model: f, argsMapper: h, transaction: C, unpacker: A, otelParentCtx: k, customDataProxyFetch: R }) {
          try {
            n = h ? h(n) : n;
            let _ = { name: "serialize" }, O = this._tracingHelper.runInChildSpan(_, () => nr({ modelName: f, runtimeDataModel: this._runtimeDataModel, action: a, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
            return G.enabled("prisma:client") && (Re("Prisma Client call:"), Re(`prisma.${i}(${Vi(n)})`), Re("Generated request:"), Re(JSON.stringify(O, null, 2) + `
`)), C?.kind === "batch" && await C.lock, this._requestHandler.request({ protocolQuery: O, modelName: f, action: a, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: C, unpacker: A, otelParentCtx: k, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: R });
          } catch (_) {
            throw _.clientVersion = this._clientVersion, _;
          }
        }
        $metrics = new Ye(this);
        _hasPreviewFlag(n) {
          return !!this._engineConfig.previewFeatures?.includes(n);
        }
        $applyPendingMigrations() {
          return this._engine.applyPendingMigrations();
        }
        $extends = Xi;
      }
      return e;
    }
    __name(Ko, "Ko");
    function Go(t, e) {
      return Xl(t) ? [new ee(t, e), So] : [t, Oo];
    }
    __name(Go, "Go");
    function Xl(t) {
      return Array.isArray(t) && Array.isArray(t.raw);
    }
    __name(Xl, "Xl");
    u();
    c();
    m();
    p();
    d();
    l();
    var Zl = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function Ho(t) {
      return new Proxy(t, { get(e, r) {
        if (r in e) return e[r];
        if (!Zl.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
      } });
    }
    __name(Ho, "Ho");
    u();
    c();
    m();
    p();
    d();
    l();
    l();
  }
});

// node_modules/.prisma/client/query_engine_bg.js
var require_query_engine_bg = __commonJS({
  "node_modules/.prisma/client/query_engine_bg.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var S = Object.defineProperty;
    var k = Object.getOwnPropertyDescriptor;
    var D = Object.getOwnPropertyNames;
    var R = Object.prototype.hasOwnProperty;
    var B = /* @__PURE__ */ __name((e, t) => {
      for (var n in t) S(e, n, { get: t[n], enumerable: true });
    }, "B");
    var U = /* @__PURE__ */ __name((e, t, n, o) => {
      if (t && typeof t == "object" || typeof t == "function") for (let _ of D(t)) !R.call(e, _) && _ !== n && S(e, _, { get: /* @__PURE__ */ __name(() => t[_], "get"), enumerable: !(o = k(t, _)) || o.enumerable });
      return e;
    }, "U");
    var L = /* @__PURE__ */ __name((e) => U(S({}, "__esModule", { value: true }), e), "L");
    var Et = {};
    B(Et, { QueryEngine: /* @__PURE__ */ __name(() => Q, "QueryEngine"), __wbg_String_8f0eb39a4a4c2f66: /* @__PURE__ */ __name(() => H, "__wbg_String_8f0eb39a4a4c2f66"), __wbg_buffer_609cc3eee51ed158: /* @__PURE__ */ __name(() => J, "__wbg_buffer_609cc3eee51ed158"), __wbg_call_672a4d21634d4a24: /* @__PURE__ */ __name(() => K, "__wbg_call_672a4d21634d4a24"), __wbg_call_7cccdd69e0791ae2: /* @__PURE__ */ __name(() => X, "__wbg_call_7cccdd69e0791ae2"), __wbg_crypto_805be4ce92f1e370: /* @__PURE__ */ __name(() => Y, "__wbg_crypto_805be4ce92f1e370"), __wbg_done_769e5ede4b31c67b: /* @__PURE__ */ __name(() => Z, "__wbg_done_769e5ede4b31c67b"), __wbg_entries_3265d4158b33e5dc: /* @__PURE__ */ __name(() => ee, "__wbg_entries_3265d4158b33e5dc"), __wbg_getRandomValues_f6a868620c8bab49: /* @__PURE__ */ __name(() => te, "__wbg_getRandomValues_f6a868620c8bab49"), __wbg_getTime_46267b1c24877e30: /* @__PURE__ */ __name(() => ne, "__wbg_getTime_46267b1c24877e30"), __wbg_get_67b2ba62fc30de12: /* @__PURE__ */ __name(() => re, "__wbg_get_67b2ba62fc30de12"), __wbg_get_b9b93047fe3cf45b: /* @__PURE__ */ __name(() => oe, "__wbg_get_b9b93047fe3cf45b"), __wbg_get_ece95cf6585650d9: /* @__PURE__ */ __name(() => _e, "__wbg_get_ece95cf6585650d9"), __wbg_getwithrefkey_1dc361bd10053bfe: /* @__PURE__ */ __name(() => ce, "__wbg_getwithrefkey_1dc361bd10053bfe"), __wbg_has_a5ea9117f258a0ec: /* @__PURE__ */ __name(() => ie, "__wbg_has_a5ea9117f258a0ec"), __wbg_instanceof_ArrayBuffer_e14585432e3737fc: /* @__PURE__ */ __name(() => ue, "__wbg_instanceof_ArrayBuffer_e14585432e3737fc"), __wbg_instanceof_Map_f3469ce2244d2430: /* @__PURE__ */ __name(() => se, "__wbg_instanceof_Map_f3469ce2244d2430"), __wbg_instanceof_Promise_935168b8f4b49db3: /* @__PURE__ */ __name(() => fe, "__wbg_instanceof_Promise_935168b8f4b49db3"), __wbg_instanceof_Uint8Array_17156bcf118086a9: /* @__PURE__ */ __name(() => ae, "__wbg_instanceof_Uint8Array_17156bcf118086a9"), __wbg_isArray_a1eab7e0d067391b: /* @__PURE__ */ __name(() => be, "__wbg_isArray_a1eab7e0d067391b"), __wbg_isSafeInteger_343e2beeeece1bb0: /* @__PURE__ */ __name(() => le, "__wbg_isSafeInteger_343e2beeeece1bb0"), __wbg_iterator_9a24c88df860dc65: /* @__PURE__ */ __name(() => ge, "__wbg_iterator_9a24c88df860dc65"), __wbg_keys_5c77a08ddc2fb8a6: /* @__PURE__ */ __name(() => de, "__wbg_keys_5c77a08ddc2fb8a6"), __wbg_length_a446193dc22c12f8: /* @__PURE__ */ __name(() => we, "__wbg_length_a446193dc22c12f8"), __wbg_length_e2d2a49132c1b256: /* @__PURE__ */ __name(() => pe, "__wbg_length_e2d2a49132c1b256"), __wbg_msCrypto_2ac4d17c4748234a: /* @__PURE__ */ __name(() => xe, "__wbg_msCrypto_2ac4d17c4748234a"), __wbg_new0_f788a2397c7ca929: /* @__PURE__ */ __name(() => ye, "__wbg_new0_f788a2397c7ca929"), __wbg_new_23a2665fac83c611: /* @__PURE__ */ __name(() => me, "__wbg_new_23a2665fac83c611"), __wbg_new_405e22f390576ce2: /* @__PURE__ */ __name(() => he, "__wbg_new_405e22f390576ce2"), __wbg_new_5e0be73521bc8c17: /* @__PURE__ */ __name(() => Te, "__wbg_new_5e0be73521bc8c17"), __wbg_new_78feb108b6472713: /* @__PURE__ */ __name(() => qe, "__wbg_new_78feb108b6472713"), __wbg_new_a12002a7f91c75be: /* @__PURE__ */ __name(() => Se, "__wbg_new_a12002a7f91c75be"), __wbg_newnoargs_105ed471475aaf50: /* @__PURE__ */ __name(() => Ae, "__wbg_newnoargs_105ed471475aaf50"), __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a: /* @__PURE__ */ __name(() => Ie, "__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a"), __wbg_newwithlength_a381634e90c276d4: /* @__PURE__ */ __name(() => Ee, "__wbg_newwithlength_a381634e90c276d4"), __wbg_next_25feadfc0913fea9: /* @__PURE__ */ __name(() => Oe, "__wbg_next_25feadfc0913fea9"), __wbg_next_6574e1a8a62d1055: /* @__PURE__ */ __name(() => Fe, "__wbg_next_6574e1a8a62d1055"), __wbg_node_ecc8306b9857f33d: /* @__PURE__ */ __name(() => Me, "__wbg_node_ecc8306b9857f33d"), __wbg_now_7fd00a794a07d388: /* @__PURE__ */ __name(() => je, "__wbg_now_7fd00a794a07d388"), __wbg_now_807e54c39636c349: /* @__PURE__ */ __name(() => ke, "__wbg_now_807e54c39636c349"), __wbg_now_b3f7572f6ef3d3a9: /* @__PURE__ */ __name(() => De, "__wbg_now_b3f7572f6ef3d3a9"), __wbg_process_5cff2739921be718: /* @__PURE__ */ __name(() => Re, "__wbg_process_5cff2739921be718"), __wbg_push_737cfc8c1432c2c6: /* @__PURE__ */ __name(() => Be, "__wbg_push_737cfc8c1432c2c6"), __wbg_queueMicrotask_5a8a9131f3f0b37b: /* @__PURE__ */ __name(() => Ue, "__wbg_queueMicrotask_5a8a9131f3f0b37b"), __wbg_queueMicrotask_6d79674585219521: /* @__PURE__ */ __name(() => Le, "__wbg_queueMicrotask_6d79674585219521"), __wbg_randomFillSync_d3c85af7e31cf1f8: /* @__PURE__ */ __name(() => ve, "__wbg_randomFillSync_d3c85af7e31cf1f8"), __wbg_require_0c566c6f2eef6c79: /* @__PURE__ */ __name(() => Ne, "__wbg_require_0c566c6f2eef6c79"), __wbg_resolve_4851785c9c5f573d: /* @__PURE__ */ __name(() => $e, "__wbg_resolve_4851785c9c5f573d"), __wbg_setTimeout_5d6a1d4fc51ea450: /* @__PURE__ */ __name(() => Ce, "__wbg_setTimeout_5d6a1d4fc51ea450"), __wbg_set_37837023f3d740e8: /* @__PURE__ */ __name(() => Ve, "__wbg_set_37837023f3d740e8"), __wbg_set_3f1d0b984ed272ed: /* @__PURE__ */ __name(() => ze, "__wbg_set_3f1d0b984ed272ed"), __wbg_set_65595bdd868b3009: /* @__PURE__ */ __name(() => We, "__wbg_set_65595bdd868b3009"), __wbg_set_8fc6bf8a5b1071d1: /* @__PURE__ */ __name(() => Pe, "__wbg_set_8fc6bf8a5b1071d1"), __wbg_set_bb8cecf6a62b9f46: /* @__PURE__ */ __name(() => Ge, "__wbg_set_bb8cecf6a62b9f46"), __wbg_set_wasm: /* @__PURE__ */ __name(() => v, "__wbg_set_wasm"), __wbg_static_accessor_GLOBAL_88a902d13a557d07: /* @__PURE__ */ __name(() => Qe, "__wbg_static_accessor_GLOBAL_88a902d13a557d07"), __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: /* @__PURE__ */ __name(() => He, "__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0"), __wbg_static_accessor_SELF_37c5d418e4bf5819: /* @__PURE__ */ __name(() => Je, "__wbg_static_accessor_SELF_37c5d418e4bf5819"), __wbg_static_accessor_WINDOW_5de37043a91a9c40: /* @__PURE__ */ __name(() => Ke, "__wbg_static_accessor_WINDOW_5de37043a91a9c40"), __wbg_subarray_aa9065fa9dc5df96: /* @__PURE__ */ __name(() => Xe, "__wbg_subarray_aa9065fa9dc5df96"), __wbg_then_44b73946d2fb3e7d: /* @__PURE__ */ __name(() => Ye, "__wbg_then_44b73946d2fb3e7d"), __wbg_then_48b406749878a531: /* @__PURE__ */ __name(() => Ze, "__wbg_then_48b406749878a531"), __wbg_valueOf_7392193dd78c6b97: /* @__PURE__ */ __name(() => et, "__wbg_valueOf_7392193dd78c6b97"), __wbg_value_cd1ffa7b1ab794f1: /* @__PURE__ */ __name(() => tt, "__wbg_value_cd1ffa7b1ab794f1"), __wbg_versions_a8e5a362e1f16442: /* @__PURE__ */ __name(() => nt, "__wbg_versions_a8e5a362e1f16442"), __wbindgen_as_number: /* @__PURE__ */ __name(() => rt, "__wbindgen_as_number"), __wbindgen_bigint_from_i64: /* @__PURE__ */ __name(() => ot, "__wbindgen_bigint_from_i64"), __wbindgen_bigint_from_u64: /* @__PURE__ */ __name(() => _t, "__wbindgen_bigint_from_u64"), __wbindgen_bigint_get_as_i64: /* @__PURE__ */ __name(() => ct, "__wbindgen_bigint_get_as_i64"), __wbindgen_boolean_get: /* @__PURE__ */ __name(() => it, "__wbindgen_boolean_get"), __wbindgen_cb_drop: /* @__PURE__ */ __name(() => ut, "__wbindgen_cb_drop"), __wbindgen_closure_wrapper7409: /* @__PURE__ */ __name(() => st, "__wbindgen_closure_wrapper7409"), __wbindgen_debug_string: /* @__PURE__ */ __name(() => ft, "__wbindgen_debug_string"), __wbindgen_error_new: /* @__PURE__ */ __name(() => at, "__wbindgen_error_new"), __wbindgen_in: /* @__PURE__ */ __name(() => bt, "__wbindgen_in"), __wbindgen_init_externref_table: /* @__PURE__ */ __name(() => lt, "__wbindgen_init_externref_table"), __wbindgen_is_bigint: /* @__PURE__ */ __name(() => gt, "__wbindgen_is_bigint"), __wbindgen_is_function: /* @__PURE__ */ __name(() => dt, "__wbindgen_is_function"), __wbindgen_is_object: /* @__PURE__ */ __name(() => wt, "__wbindgen_is_object"), __wbindgen_is_string: /* @__PURE__ */ __name(() => pt, "__wbindgen_is_string"), __wbindgen_is_undefined: /* @__PURE__ */ __name(() => xt, "__wbindgen_is_undefined"), __wbindgen_jsval_eq: /* @__PURE__ */ __name(() => yt, "__wbindgen_jsval_eq"), __wbindgen_jsval_loose_eq: /* @__PURE__ */ __name(() => mt, "__wbindgen_jsval_loose_eq"), __wbindgen_memory: /* @__PURE__ */ __name(() => ht, "__wbindgen_memory"), __wbindgen_number_get: /* @__PURE__ */ __name(() => Tt, "__wbindgen_number_get"), __wbindgen_number_new: /* @__PURE__ */ __name(() => qt, "__wbindgen_number_new"), __wbindgen_string_get: /* @__PURE__ */ __name(() => St, "__wbindgen_string_get"), __wbindgen_string_new: /* @__PURE__ */ __name(() => At, "__wbindgen_string_new"), __wbindgen_throw: /* @__PURE__ */ __name(() => It, "__wbindgen_throw"), debug_panic: /* @__PURE__ */ __name(() => W, "debug_panic"), getBuildTimeInfo: /* @__PURE__ */ __name(() => z, "getBuildTimeInfo") });
    module.exports = L(Et);
    var y = /* @__PURE__ */ __name(() => {
    }, "y");
    y.prototype = y;
    var r;
    function v(e) {
      r = e;
    }
    __name(v, "v");
    var s = 0;
    var m = null;
    function h() {
      return (m === null || m.byteLength === 0) && (m = new Uint8Array(r.memory.buffer)), m;
    }
    __name(h, "h");
    var N = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
    var T = new N("utf-8");
    var $3 = typeof T.encodeInto == "function" ? function(e, t) {
      return T.encodeInto(e, t);
    } : function(e, t) {
      const n = T.encode(e);
      return t.set(n), { read: e.length, written: n.length };
    };
    function f(e, t, n) {
      if (n === void 0) {
        const u = T.encode(e), a = t(u.length, 1) >>> 0;
        return h().subarray(a, a + u.length).set(u), s = u.length, a;
      }
      let o = e.length, _ = t(o, 1) >>> 0;
      const i = h();
      let c = 0;
      for (; c < o; c++) {
        const u = e.charCodeAt(c);
        if (u > 127) break;
        i[_ + c] = u;
      }
      if (c !== o) {
        c !== 0 && (e = e.slice(c)), _ = n(_, o, o = c + e.length * 3, 1) >>> 0;
        const u = h().subarray(_ + c, _ + o), a = $3(e, u);
        c += a.written, _ = n(_, o, c, 1) >>> 0;
      }
      return s = c, _;
    }
    __name(f, "f");
    var w = null;
    function g() {
      return (w === null || w.buffer.detached === true || w.buffer.detached === void 0 && w.buffer !== r.memory.buffer) && (w = new DataView(r.memory.buffer)), w;
    }
    __name(g, "g");
    function p(e) {
      const t = r.__externref_table_alloc();
      return r.__wbindgen_export_4.set(t, e), t;
    }
    __name(p, "p");
    function b(e, t) {
      try {
        return e.apply(this, t);
      } catch (n) {
        const o = p(n);
        r.__wbindgen_exn_store(o);
      }
    }
    __name(b, "b");
    var C = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
    var I = new C("utf-8", { ignoreBOM: true, fatal: true });
    I.decode();
    function q(e, t) {
      return e = e >>> 0, I.decode(h().subarray(e, e + t));
    }
    __name(q, "q");
    function l(e) {
      return e == null;
    }
    __name(l, "l");
    var E = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((e) => {
      r.__wbindgen_export_5.get(e.dtor)(e.a, e.b);
    });
    function V(e, t, n, o) {
      const _ = { a: e, b: t, cnt: 1, dtor: n }, i = /* @__PURE__ */ __name((...c) => {
        _.cnt++;
        const u = _.a;
        _.a = 0;
        try {
          return o(u, _.b, ...c);
        } finally {
          --_.cnt === 0 ? (r.__wbindgen_export_5.get(_.dtor)(u, _.b), E.unregister(_)) : _.a = u;
        }
      }, "i");
      return i.original = _, E.register(i, _, _), i;
    }
    __name(V, "V");
    function A(e) {
      const t = typeof e;
      if (t == "number" || t == "boolean" || e == null) return `${e}`;
      if (t == "string") return `"${e}"`;
      if (t == "symbol") {
        const _ = e.description;
        return _ == null ? "Symbol" : `Symbol(${_})`;
      }
      if (t == "function") {
        const _ = e.name;
        return typeof _ == "string" && _.length > 0 ? `Function(${_})` : "Function";
      }
      if (Array.isArray(e)) {
        const _ = e.length;
        let i = "[";
        _ > 0 && (i += A(e[0]));
        for (let c = 1; c < _; c++) i += ", " + A(e[c]);
        return i += "]", i;
      }
      const n = /\[object ([^\]]+)\]/.exec(toString.call(e));
      let o;
      if (n && n.length > 1) o = n[1];
      else return toString.call(e);
      if (o == "Object") try {
        return "Object(" + JSON.stringify(e) + ")";
      } catch {
        return "Object";
      }
      return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : o;
    }
    __name(A, "A");
    function O(e) {
      const t = r.__wbindgen_export_4.get(e);
      return r.__externref_table_dealloc(e), t;
    }
    __name(O, "O");
    function z() {
      return r.getBuildTimeInfo();
    }
    __name(z, "z");
    function W(e) {
      var t = l(e) ? 0 : f(e, r.__wbindgen_malloc, r.__wbindgen_realloc), n = s;
      const o = r.debug_panic(t, n);
      if (o[1]) throw O(o[0]);
    }
    __name(W, "W");
    function P(e, t, n) {
      r.closure577_externref_shim(e, t, n);
    }
    __name(P, "P");
    function G(e, t, n, o) {
      r.closure129_externref_shim(e, t, n, o);
    }
    __name(G, "G");
    var F = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((e) => r.__wbg_queryengine_free(e >>> 0, 1));
    var Q = class {
      static {
        __name(this, "Q");
      }
      __destroy_into_raw() {
        const t = this.__wbg_ptr;
        return this.__wbg_ptr = 0, F.unregister(this), t;
      }
      free() {
        const t = this.__destroy_into_raw();
        r.__wbg_queryengine_free(t, 0);
      }
      constructor(t, n, o) {
        const _ = r.queryengine_new(t, n, o);
        if (_[2]) throw O(_[1]);
        return this.__wbg_ptr = _[0] >>> 0, F.register(this, this.__wbg_ptr, this), this;
      }
      connect(t, n) {
        const o = f(t, r.__wbindgen_malloc, r.__wbindgen_realloc), _ = s, i = f(n, r.__wbindgen_malloc, r.__wbindgen_realloc), c = s;
        return r.queryengine_connect(this.__wbg_ptr, o, _, i, c);
      }
      disconnect(t, n) {
        const o = f(t, r.__wbindgen_malloc, r.__wbindgen_realloc), _ = s, i = f(n, r.__wbindgen_malloc, r.__wbindgen_realloc), c = s;
        return r.queryengine_disconnect(this.__wbg_ptr, o, _, i, c);
      }
      query(t, n, o, _) {
        const i = f(t, r.__wbindgen_malloc, r.__wbindgen_realloc), c = s, u = f(n, r.__wbindgen_malloc, r.__wbindgen_realloc), a = s;
        var d = l(o) ? 0 : f(o, r.__wbindgen_malloc, r.__wbindgen_realloc), x = s;
        const M = f(_, r.__wbindgen_malloc, r.__wbindgen_realloc), j = s;
        return r.queryengine_query(this.__wbg_ptr, i, c, u, a, d, x, M, j);
      }
      startTransaction(t, n, o) {
        const _ = f(t, r.__wbindgen_malloc, r.__wbindgen_realloc), i = s, c = f(n, r.__wbindgen_malloc, r.__wbindgen_realloc), u = s, a = f(o, r.__wbindgen_malloc, r.__wbindgen_realloc), d = s;
        return r.queryengine_startTransaction(this.__wbg_ptr, _, i, c, u, a, d);
      }
      commitTransaction(t, n, o) {
        const _ = f(t, r.__wbindgen_malloc, r.__wbindgen_realloc), i = s, c = f(n, r.__wbindgen_malloc, r.__wbindgen_realloc), u = s, a = f(o, r.__wbindgen_malloc, r.__wbindgen_realloc), d = s;
        return r.queryengine_commitTransaction(this.__wbg_ptr, _, i, c, u, a, d);
      }
      rollbackTransaction(t, n, o) {
        const _ = f(t, r.__wbindgen_malloc, r.__wbindgen_realloc), i = s, c = f(n, r.__wbindgen_malloc, r.__wbindgen_realloc), u = s, a = f(o, r.__wbindgen_malloc, r.__wbindgen_realloc), d = s;
        return r.queryengine_rollbackTransaction(this.__wbg_ptr, _, i, c, u, a, d);
      }
      metrics(t) {
        const n = f(t, r.__wbindgen_malloc, r.__wbindgen_realloc), o = s;
        return r.queryengine_metrics(this.__wbg_ptr, n, o);
      }
      trace(t) {
        const n = f(t, r.__wbindgen_malloc, r.__wbindgen_realloc), o = s;
        return r.queryengine_trace(this.__wbg_ptr, n, o);
      }
    };
    function H(e, t) {
      const n = String(t), o = f(n, r.__wbindgen_malloc, r.__wbindgen_realloc), _ = s;
      g().setInt32(e + 4 * 1, _, true), g().setInt32(e + 4 * 0, o, true);
    }
    __name(H, "H");
    function J(e) {
      return e.buffer;
    }
    __name(J, "J");
    function K() {
      return b(function(e, t) {
        return e.call(t);
      }, arguments);
    }
    __name(K, "K");
    function X() {
      return b(function(e, t, n) {
        return e.call(t, n);
      }, arguments);
    }
    __name(X, "X");
    function Y(e) {
      return e.crypto;
    }
    __name(Y, "Y");
    function Z(e) {
      return e.done;
    }
    __name(Z, "Z");
    function ee(e) {
      return Object.entries(e);
    }
    __name(ee, "ee");
    function te() {
      return b(function(e, t) {
        e.getRandomValues(t);
      }, arguments);
    }
    __name(te, "te");
    function ne(e) {
      return e.getTime();
    }
    __name(ne, "ne");
    function re() {
      return b(function(e, t) {
        return Reflect.get(e, t);
      }, arguments);
    }
    __name(re, "re");
    function oe(e, t) {
      return e[t >>> 0];
    }
    __name(oe, "oe");
    function _e() {
      return b(function(e, t) {
        return e[t];
      }, arguments);
    }
    __name(_e, "_e");
    function ce(e, t) {
      return e[t];
    }
    __name(ce, "ce");
    function ie() {
      return b(function(e, t) {
        return Reflect.has(e, t);
      }, arguments);
    }
    __name(ie, "ie");
    function ue(e) {
      let t;
      try {
        t = e instanceof ArrayBuffer;
      } catch {
        t = false;
      }
      return t;
    }
    __name(ue, "ue");
    function se(e) {
      let t;
      try {
        t = e instanceof Map;
      } catch {
        t = false;
      }
      return t;
    }
    __name(se, "se");
    function fe(e) {
      let t;
      try {
        t = e instanceof Promise;
      } catch {
        t = false;
      }
      return t;
    }
    __name(fe, "fe");
    function ae(e) {
      let t;
      try {
        t = e instanceof Uint8Array;
      } catch {
        t = false;
      }
      return t;
    }
    __name(ae, "ae");
    function be(e) {
      return Array.isArray(e);
    }
    __name(be, "be");
    function le(e) {
      return Number.isSafeInteger(e);
    }
    __name(le, "le");
    function ge() {
      return Symbol.iterator;
    }
    __name(ge, "ge");
    function de(e) {
      return Object.keys(e);
    }
    __name(de, "de");
    function we(e) {
      return e.length;
    }
    __name(we, "we");
    function pe(e) {
      return e.length;
    }
    __name(pe, "pe");
    function xe(e) {
      return e.msCrypto;
    }
    __name(xe, "xe");
    function ye() {
      return /* @__PURE__ */ new Date();
    }
    __name(ye, "ye");
    function me(e, t) {
      try {
        var n = { a: e, b: t }, o = /* @__PURE__ */ __name((i, c) => {
          const u = n.a;
          n.a = 0;
          try {
            return G(u, n.b, i, c);
          } finally {
            n.a = u;
          }
        }, "o");
        return new Promise(o);
      } finally {
        n.a = n.b = 0;
      }
    }
    __name(me, "me");
    function he() {
      return new Object();
    }
    __name(he, "he");
    function Te() {
      return /* @__PURE__ */ new Map();
    }
    __name(Te, "Te");
    function qe() {
      return new Array();
    }
    __name(qe, "qe");
    function Se(e) {
      return new Uint8Array(e);
    }
    __name(Se, "Se");
    function Ae(e, t) {
      return new y(q(e, t));
    }
    __name(Ae, "Ae");
    function Ie(e, t, n) {
      return new Uint8Array(e, t >>> 0, n >>> 0);
    }
    __name(Ie, "Ie");
    function Ee(e) {
      return new Uint8Array(e >>> 0);
    }
    __name(Ee, "Ee");
    function Oe(e) {
      return e.next;
    }
    __name(Oe, "Oe");
    function Fe() {
      return b(function(e) {
        return e.next();
      }, arguments);
    }
    __name(Fe, "Fe");
    function Me(e) {
      return e.node;
    }
    __name(Me, "Me");
    function je(e) {
      return e.now();
    }
    __name(je, "je");
    function ke() {
      return Date.now();
    }
    __name(ke, "ke");
    function De() {
      return b(function() {
        return Date.now();
      }, arguments);
    }
    __name(De, "De");
    function Re(e) {
      return e.process;
    }
    __name(Re, "Re");
    function Be(e, t) {
      return e.push(t);
    }
    __name(Be, "Be");
    function Ue(e) {
      return e.queueMicrotask;
    }
    __name(Ue, "Ue");
    function Le(e) {
      queueMicrotask(e);
    }
    __name(Le, "Le");
    function ve() {
      return b(function(e, t) {
        e.randomFillSync(t);
      }, arguments);
    }
    __name(ve, "ve");
    function Ne() {
      return b(function() {
        return module.require;
      }, arguments);
    }
    __name(Ne, "Ne");
    function $e(e) {
      return Promise.resolve(e);
    }
    __name($e, "$e");
    function Ce(e, t) {
      return setTimeout(e, t >>> 0);
    }
    __name(Ce, "Ce");
    function Ve(e, t, n) {
      e[t >>> 0] = n;
    }
    __name(Ve, "Ve");
    function ze(e, t, n) {
      e[t] = n;
    }
    __name(ze, "ze");
    function We(e, t, n) {
      e.set(t, n >>> 0);
    }
    __name(We, "We");
    function Pe(e, t, n) {
      return e.set(t, n);
    }
    __name(Pe, "Pe");
    function Ge() {
      return b(function(e, t, n) {
        return Reflect.set(e, t, n);
      }, arguments);
    }
    __name(Ge, "Ge");
    function Qe() {
      const e = typeof global > "u" ? null : global;
      return l(e) ? 0 : p(e);
    }
    __name(Qe, "Qe");
    function He() {
      const e = typeof globalThis > "u" ? null : globalThis;
      return l(e) ? 0 : p(e);
    }
    __name(He, "He");
    function Je() {
      const e = typeof self > "u" ? null : self;
      return l(e) ? 0 : p(e);
    }
    __name(Je, "Je");
    function Ke() {
      const e = typeof window > "u" ? null : window;
      return l(e) ? 0 : p(e);
    }
    __name(Ke, "Ke");
    function Xe(e, t, n) {
      return e.subarray(t >>> 0, n >>> 0);
    }
    __name(Xe, "Xe");
    function Ye(e, t) {
      return e.then(t);
    }
    __name(Ye, "Ye");
    function Ze(e, t, n) {
      return e.then(t, n);
    }
    __name(Ze, "Ze");
    function et(e) {
      return e.valueOf();
    }
    __name(et, "et");
    function tt(e) {
      return e.value;
    }
    __name(tt, "tt");
    function nt(e) {
      return e.versions;
    }
    __name(nt, "nt");
    function rt(e) {
      return +e;
    }
    __name(rt, "rt");
    function ot(e) {
      return e;
    }
    __name(ot, "ot");
    function _t(e) {
      return BigInt.asUintN(64, e);
    }
    __name(_t, "_t");
    function ct(e, t) {
      const n = t, o = typeof n == "bigint" ? n : void 0;
      g().setBigInt64(e + 8 * 1, l(o) ? BigInt(0) : o, true), g().setInt32(e + 4 * 0, !l(o), true);
    }
    __name(ct, "ct");
    function it(e) {
      const t = e;
      return typeof t == "boolean" ? t ? 1 : 0 : 2;
    }
    __name(it, "it");
    function ut(e) {
      const t = e.original;
      return t.cnt-- == 1 ? (t.a = 0, true) : false;
    }
    __name(ut, "ut");
    function st(e, t, n) {
      return V(e, t, 578, P);
    }
    __name(st, "st");
    function ft(e, t) {
      const n = A(t), o = f(n, r.__wbindgen_malloc, r.__wbindgen_realloc), _ = s;
      g().setInt32(e + 4 * 1, _, true), g().setInt32(e + 4 * 0, o, true);
    }
    __name(ft, "ft");
    function at(e, t) {
      return new Error(q(e, t));
    }
    __name(at, "at");
    function bt(e, t) {
      return e in t;
    }
    __name(bt, "bt");
    function lt() {
      const e = r.__wbindgen_export_4, t = e.grow(4);
      e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
    }
    __name(lt, "lt");
    function gt(e) {
      return typeof e == "bigint";
    }
    __name(gt, "gt");
    function dt(e) {
      return typeof e == "function";
    }
    __name(dt, "dt");
    function wt(e) {
      const t = e;
      return typeof t == "object" && t !== null;
    }
    __name(wt, "wt");
    function pt(e) {
      return typeof e == "string";
    }
    __name(pt, "pt");
    function xt(e) {
      return e === void 0;
    }
    __name(xt, "xt");
    function yt(e, t) {
      return e === t;
    }
    __name(yt, "yt");
    function mt(e, t) {
      return e == t;
    }
    __name(mt, "mt");
    function ht() {
      return r.memory;
    }
    __name(ht, "ht");
    function Tt(e, t) {
      const n = t, o = typeof n == "number" ? n : void 0;
      g().setFloat64(e + 8 * 1, l(o) ? 0 : o, true), g().setInt32(e + 4 * 0, !l(o), true);
    }
    __name(Tt, "Tt");
    function qt(e) {
      return e;
    }
    __name(qt, "qt");
    function St(e, t) {
      const n = t, o = typeof n == "string" ? n : void 0;
      var _ = l(o) ? 0 : f(o, r.__wbindgen_malloc, r.__wbindgen_realloc), i = s;
      g().setInt32(e + 4 * 1, i, true), g().setInt32(e + 4 * 0, _, true);
    }
    __name(St, "St");
    function At(e, t) {
      return q(e, t);
    }
    __name(At, "At");
    function It(e, t) {
      throw new Error(q(e, t));
    }
    __name(It, "It");
  }
});

// node_modules/.prisma/client/wasm-worker-loader.mjs
var wasm_worker_loader_exports = {};
__export(wasm_worker_loader_exports, {
  default: () => wasm_worker_loader_default
});
var wasm_worker_loader_default;
var init_wasm_worker_loader = __esm({
  "node_modules/.prisma/client/wasm-worker-loader.mjs"() {
    init_modules_watch_stub();
    wasm_worker_loader_default = import("./900e24a01030ab472aede8d04e6eace02eea5149-query_engine_bg.wasm");
  }
});

// node_modules/.prisma/client/wasm.js
var require_wasm = __commonJS({
  "node_modules/.prisma/client/wasm.js"(exports) {
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var {
      PrismaClientKnownRequestError: PrismaClientKnownRequestError2,
      PrismaClientUnknownRequestError: PrismaClientUnknownRequestError2,
      PrismaClientRustPanicError: PrismaClientRustPanicError2,
      PrismaClientInitializationError: PrismaClientInitializationError2,
      PrismaClientValidationError: PrismaClientValidationError2,
      getPrismaClient: getPrismaClient3,
      sqltag: sqltag2,
      empty: empty2,
      join: join2,
      raw: raw2,
      skip: skip2,
      Decimal: Decimal2,
      Debug: Debug3,
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Extensions: Extensions2,
      warnOnce: warnOnce2,
      defineDmmfProperty: defineDmmfProperty2,
      Public: Public2,
      getRuntime: getRuntime2,
      createParam: createParam2
    } = require_wasm_engine_edge();
    var Prisma = {};
    exports.Prisma = Prisma;
    exports.$Enums = {};
    Prisma.prismaVersion = {
      client: "6.15.0",
      engine: "85179d7826409ee107a6ba334b5e305ae3fba9fb"
    };
    Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError2;
    Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError2;
    Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError2;
    Prisma.PrismaClientInitializationError = PrismaClientInitializationError2;
    Prisma.PrismaClientValidationError = PrismaClientValidationError2;
    Prisma.Decimal = Decimal2;
    Prisma.sql = sqltag2;
    Prisma.empty = empty2;
    Prisma.join = join2;
    Prisma.raw = raw2;
    Prisma.validator = Public2.validator;
    Prisma.getExtensionContext = Extensions2.getExtensionContext;
    Prisma.defineExtension = Extensions2.defineExtension;
    Prisma.DbNull = objectEnumValues2.instances.DbNull;
    Prisma.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
    exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      Serializable: "Serializable"
    });
    exports.Prisma.UserScalarFieldEnum = {
      id: "id",
      email: "email",
      name: "name",
      image: "image",
      emailVerified: "emailVerified",
      credits: "credits",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.AccountScalarFieldEnum = {
      id: "id",
      userId: "userId",
      type: "type",
      provider: "provider",
      providerAccountId: "providerAccountId",
      refresh_token: "refresh_token",
      access_token: "access_token",
      expires_at: "expires_at",
      token_type: "token_type",
      scope: "scope",
      id_token: "id_token",
      session_state: "session_state"
    };
    exports.Prisma.SessionScalarFieldEnum = {
      id: "id",
      sessionToken: "sessionToken",
      userId: "userId",
      expires: "expires"
    };
    exports.Prisma.CopyJobScalarFieldEnum = {
      id: "id",
      userId: "userId",
      sourceFolderId: "sourceFolderId",
      sourceFolderName: "sourceFolderName",
      destFolderId: "destFolderId",
      destFolderName: "destFolderName",
      status: "status",
      totalItems: "totalItems",
      completedItems: "completedItems",
      failedItems: "failedItems",
      totalBytes: "totalBytes",
      copiedBytes: "copiedBytes",
      creditsUsed: "creditsUsed",
      creditsReserved: "creditsReserved",
      errorMessage: "errorMessage",
      startedAt: "startedAt",
      completedAt: "completedAt",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.CopyItemScalarFieldEnum = {
      id: "id",
      jobId: "jobId",
      sourceId: "sourceId",
      sourceName: "sourceName",
      sourcePath: "sourcePath",
      mimeType: "mimeType",
      size: "size",
      newId: "newId",
      status: "status",
      error: "error",
      retryCount: "retryCount",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.CreditPurchaseScalarFieldEnum = {
      id: "id",
      userId: "userId",
      credits: "credits",
      amount: "amount",
      currency: "currency",
      stripePaymentIntentId: "stripePaymentIntentId",
      stripeSessionId: "stripeSessionId",
      status: "status",
      createdAt: "createdAt"
    };
    exports.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports.Prisma.ModelName = {
      User: "User",
      Account: "Account",
      Session: "Session",
      CopyJob: "CopyJob",
      CopyItem: "CopyItem",
      CreditPurchase: "CreditPurchase"
    };
    var config = {
      "generator": {
        "name": "client",
        "provider": {
          "fromEnvVar": null,
          "value": "prisma-client-js"
        },
        "output": {
          "value": "/Users/imekinox/Proyectos/academiadeia/test_clone_gdrive/gdrive-copier/node_modules/@prisma/client",
          "fromEnvVar": null
        },
        "config": {
          "engineType": "library"
        },
        "binaryTargets": [
          {
            "fromEnvVar": null,
            "value": "darwin-arm64",
            "native": true
          }
        ],
        "previewFeatures": [
          "driverAdapters"
        ],
        "sourceFilePath": "/Users/imekinox/Proyectos/academiadeia/test_clone_gdrive/gdrive-copier/prisma/schema.prisma"
      },
      "relativeEnvPaths": {
        "rootEnvPath": null,
        "schemaEnvPath": "../../../.env"
      },
      "relativePath": "../../../prisma",
      "clientVersion": "6.15.0",
      "engineVersion": "85179d7826409ee107a6ba334b5e305ae3fba9fb",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "sqlite",
      "postinstall": false,
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": "DATABASE_URL",
            "value": null
          }
        }
      },
      "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider        = "prisma-client-js"\n  previewFeatures = ["driverAdapters"]\n}\n\ndatasource db {\n  provider = "sqlite"\n  url      = env("DATABASE_URL")\n}\n\n// User model for authentication\nmodel User {\n  id            String    @id @default(cuid())\n  email         String    @unique\n  name          String?\n  image         String?\n  emailVerified DateTime?\n  credits       Int       @default(100) // Free credits on signup (100 GB)\n\n  accounts Account[]\n  sessions Session[]\n  copyJobs CopyJob[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\n// Account model for OAuth providers\nmodel Account {\n  id                String  @id @default(cuid())\n  userId            String\n  type              String\n  provider          String\n  providerAccountId String\n  refresh_token     String?\n  access_token      String?\n  expires_at        Int?\n  token_type        String?\n  scope             String?\n  id_token          String?\n  session_state     String?\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([provider, providerAccountId])\n}\n\n// Session model for Auth.js\nmodel Session {\n  id           String   @id @default(cuid())\n  sessionToken String   @unique\n  userId       String\n  expires      DateTime\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n\n// Copy job tracking\nmodel CopyJob {\n  id     String @id @default(cuid())\n  userId String\n\n  sourceFolderId   String\n  sourceFolderName String\n  destFolderId     String\n  destFolderName   String\n\n  status String @default("queued") // queued, scanning, copying, completed, failed, cancelled\n\n  totalItems     Int?\n  completedItems Int  @default(0)\n  failedItems    Int  @default(0)\n\n  totalBytes  String? @default("0") // Using String for BigInt compatibility\n  copiedBytes String  @default("0") // Using String for BigInt compatibility\n\n  creditsUsed     Int @default(0)\n  creditsReserved Int @default(0) // Reserved credits at job start\n\n  errorMessage String?\n\n  startedAt   DateTime?\n  completedAt DateTime?\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n\n  user  User       @relation(fields: [userId], references: [id], onDelete: Cascade)\n  items CopyItem[]\n\n  @@index([userId, status])\n  @@index([status])\n}\n\n// Individual items in a copy job\nmodel CopyItem {\n  id    String @id @default(cuid())\n  jobId String\n\n  sourceId   String\n  sourceName String\n  sourcePath String // Full path for display\n  mimeType   String\n  size       String? // Using String for BigInt compatibility\n\n  newId  String? // ID in destination after copy\n  status String  @default("pending") // pending, copying, completed, failed, skipped\n  error  String?\n\n  retryCount Int @default(0)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  job CopyJob @relation(fields: [jobId], references: [id], onDelete: Cascade)\n\n  @@index([jobId, status])\n  @@index([jobId])\n}\n\n// Credit purchases for future payments\nmodel CreditPurchase {\n  id     String @id @default(cuid())\n  userId String\n\n  credits  Int // Number of credits (GB)\n  amount   Float // Amount in USD\n  currency String @default("usd")\n\n  stripePaymentIntentId String?\n  stripeSessionId       String?\n\n  status String // pending, completed, failed\n\n  createdAt DateTime @default(now())\n\n  @@index([userId])\n}\n',
      "inlineSchemaHash": "2fe2b104d455d8deced5f825cf58d42b9fbc4b0f7e14b67296f139308a2cdf67",
      "copyEngine": true
    };
    config.dirname = "/";
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"DateTime"},{"name":"credits","kind":"scalar","type":"Int"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"copyJobs","kind":"object","type":"CopyJob","relationName":"CopyJobToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"type","kind":"scalar","type":"String"},{"name":"provider","kind":"scalar","type":"String"},{"name":"providerAccountId","kind":"scalar","type":"String"},{"name":"refresh_token","kind":"scalar","type":"String"},{"name":"access_token","kind":"scalar","type":"String"},{"name":"expires_at","kind":"scalar","type":"Int"},{"name":"token_type","kind":"scalar","type":"String"},{"name":"scope","kind":"scalar","type":"String"},{"name":"id_token","kind":"scalar","type":"String"},{"name":"session_state","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"sessionToken","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"expires","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":null},"CopyJob":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"sourceFolderId","kind":"scalar","type":"String"},{"name":"sourceFolderName","kind":"scalar","type":"String"},{"name":"destFolderId","kind":"scalar","type":"String"},{"name":"destFolderName","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"totalItems","kind":"scalar","type":"Int"},{"name":"completedItems","kind":"scalar","type":"Int"},{"name":"failedItems","kind":"scalar","type":"Int"},{"name":"totalBytes","kind":"scalar","type":"String"},{"name":"copiedBytes","kind":"scalar","type":"String"},{"name":"creditsUsed","kind":"scalar","type":"Int"},{"name":"creditsReserved","kind":"scalar","type":"Int"},{"name":"errorMessage","kind":"scalar","type":"String"},{"name":"startedAt","kind":"scalar","type":"DateTime"},{"name":"completedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"CopyJobToUser"},{"name":"items","kind":"object","type":"CopyItem","relationName":"CopyItemToCopyJob"}],"dbName":null},"CopyItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"jobId","kind":"scalar","type":"String"},{"name":"sourceId","kind":"scalar","type":"String"},{"name":"sourceName","kind":"scalar","type":"String"},{"name":"sourcePath","kind":"scalar","type":"String"},{"name":"mimeType","kind":"scalar","type":"String"},{"name":"size","kind":"scalar","type":"String"},{"name":"newId","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"error","kind":"scalar","type":"String"},{"name":"retryCount","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"job","kind":"object","type":"CopyJob","relationName":"CopyItemToCopyJob"}],"dbName":null},"CreditPurchase":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"credits","kind":"scalar","type":"Int"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"currency","kind":"scalar","type":"String"},{"name":"stripePaymentIntentId","kind":"scalar","type":"String"},{"name":"stripeSessionId","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
    defineDmmfProperty2(exports.Prisma, config.runtimeDataModel);
    config.engineWasm = {
      getRuntime: /* @__PURE__ */ __name(async () => require_query_engine_bg(), "getRuntime"),
      getQueryEngineWasmModule: /* @__PURE__ */ __name(async () => {
        const loader = (await Promise.resolve().then(() => (init_wasm_worker_loader(), wasm_worker_loader_exports))).default;
        const engine = (await loader).default;
        return engine;
      }, "getQueryEngineWasmModule")
    };
    config.compilerWasm = void 0;
    config.injectableEdgeEnv = () => ({
      parsed: {
        DATABASE_URL: typeof globalThis !== "undefined" && globalThis["DATABASE_URL"] || typeof process !== "undefined" && process.env && process.env.DATABASE_URL || void 0
      }
    });
    if (typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0) {
      Debug3.enable(typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0);
    }
    var PrismaClient2 = getPrismaClient3(config);
    exports.PrismaClient = PrismaClient2;
    Object.assign(exports, Prisma);
  }
});

// node_modules/.prisma/client/default.js
var require_default = __commonJS({
  "node_modules/.prisma/client/default.js"(exports, module) {
    init_modules_watch_stub();
    module.exports = { ...require_wasm() };
  }
});

// node_modules/@prisma/client/default.js
var require_default2 = __commonJS({
  "node_modules/@prisma/client/default.js"(exports, module) {
    init_modules_watch_stub();
    module.exports = {
      ...require_default()
    };
  }
});

// .wrangler/tmp/bundle-w9DYVP/middleware-loader.entry.ts
init_modules_watch_stub();

// .wrangler/tmp/bundle-w9DYVP/middleware-insertion-facade.js
init_modules_watch_stub();

// workers/test-d1.ts
init_modules_watch_stub();

// lib/prisma-edge.ts
init_modules_watch_stub();
var import_client = __toESM(require_default2());

// node_modules/@prisma/adapter-d1/dist/index.mjs
init_modules_watch_stub();

// node_modules/@prisma/driver-adapter-utils/dist/index.mjs
init_modules_watch_stub();

// node_modules/@prisma/debug/dist/index.mjs
init_modules_watch_stub();
var __defProp2 = Object.defineProperty;
var __export2 = /* @__PURE__ */ __name((target, all) => {
  for (var name2 in all)
    __defProp2(target, name2, { get: all[name2], enumerable: true });
}, "__export");
var colors_exports = {};
__export2(colors_exports, {
  $: /* @__PURE__ */ __name(() => $, "$"),
  bgBlack: /* @__PURE__ */ __name(() => bgBlack, "bgBlack"),
  bgBlue: /* @__PURE__ */ __name(() => bgBlue, "bgBlue"),
  bgCyan: /* @__PURE__ */ __name(() => bgCyan, "bgCyan"),
  bgGreen: /* @__PURE__ */ __name(() => bgGreen, "bgGreen"),
  bgMagenta: /* @__PURE__ */ __name(() => bgMagenta, "bgMagenta"),
  bgRed: /* @__PURE__ */ __name(() => bgRed, "bgRed"),
  bgWhite: /* @__PURE__ */ __name(() => bgWhite, "bgWhite"),
  bgYellow: /* @__PURE__ */ __name(() => bgYellow, "bgYellow"),
  black: /* @__PURE__ */ __name(() => black, "black"),
  blue: /* @__PURE__ */ __name(() => blue, "blue"),
  bold: /* @__PURE__ */ __name(() => bold, "bold"),
  cyan: /* @__PURE__ */ __name(() => cyan, "cyan"),
  dim: /* @__PURE__ */ __name(() => dim, "dim"),
  gray: /* @__PURE__ */ __name(() => gray, "gray"),
  green: /* @__PURE__ */ __name(() => green, "green"),
  grey: /* @__PURE__ */ __name(() => grey, "grey"),
  hidden: /* @__PURE__ */ __name(() => hidden, "hidden"),
  inverse: /* @__PURE__ */ __name(() => inverse, "inverse"),
  italic: /* @__PURE__ */ __name(() => italic, "italic"),
  magenta: /* @__PURE__ */ __name(() => magenta, "magenta"),
  red: /* @__PURE__ */ __name(() => red, "red"),
  reset: /* @__PURE__ */ __name(() => reset, "reset"),
  strikethrough: /* @__PURE__ */ __name(() => strikethrough, "strikethrough"),
  underline: /* @__PURE__ */ __name(() => underline, "underline"),
  white: /* @__PURE__ */ __name(() => white, "white"),
  yellow: /* @__PURE__ */ __name(() => yellow, "yellow")
});
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
  return function(txt) {
    if (!$.enabled || txt == null) return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
__name(init, "init");
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);
var MAX_ARGS_HISTORY = 100;
var COLORS = ["green", "yellow", "blue", "magenta", "cyan", "red"];
var argsHistory = [];
var lastTimestamp = Date.now();
var lastColor = 0;
var processEnv = typeof process !== "undefined" ? process.env : {};
globalThis.DEBUG ??= processEnv.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
var topProps = {
  enable(namespace) {
    if (typeof namespace === "string") {
      globalThis.DEBUG = namespace;
    }
  },
  disable() {
    const prev = globalThis.DEBUG;
    globalThis.DEBUG = "";
    return prev;
  },
  // this is the core logic to check if logging should happen or not
  enabled(namespace) {
    const listenedNamespaces = globalThis.DEBUG.split(",").map((s) => {
      return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    });
    const isListened = listenedNamespaces.some((listenedNamespace) => {
      if (listenedNamespace === "" || listenedNamespace[0] === "-") return false;
      return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
    });
    const isExcluded = listenedNamespaces.some((listenedNamespace) => {
      if (listenedNamespace === "" || listenedNamespace[0] !== "-") return false;
      return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
    });
    return isListened && !isExcluded;
  },
  log: /* @__PURE__ */ __name((...args) => {
    const [namespace, format, ...rest] = args;
    const logWithFormatting = console.warn ?? console.log;
    logWithFormatting(`${namespace} ${format}`, ...rest);
  }, "log"),
  formatters: {}
  // not implemented
};
function debugCreate(namespace) {
  const instanceProps = {
    color: COLORS[lastColor++ % COLORS.length],
    enabled: topProps.enabled(namespace),
    namespace,
    log: topProps.log,
    extend: /* @__PURE__ */ __name(() => {
    }, "extend")
    // not implemented
  };
  const debugCall = /* @__PURE__ */ __name((...args) => {
    const { enabled, namespace: namespace2, color, log } = instanceProps;
    if (args.length !== 0) {
      argsHistory.push([namespace2, ...args]);
    }
    if (argsHistory.length > MAX_ARGS_HISTORY) {
      argsHistory.shift();
    }
    if (topProps.enabled(namespace2) || enabled) {
      const stringArgs = args.map((arg) => {
        if (typeof arg === "string") {
          return arg;
        }
        return safeStringify(arg);
      });
      const ms = `+${Date.now() - lastTimestamp}ms`;
      lastTimestamp = Date.now();
      if (globalThis.DEBUG_COLORS) {
        log(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms));
      } else {
        log(namespace2, ...stringArgs, ms);
      }
    }
  }, "debugCall");
  return new Proxy(debugCall, {
    get: /* @__PURE__ */ __name((_, prop) => instanceProps[prop], "get"),
    set: /* @__PURE__ */ __name((_, prop, value) => instanceProps[prop] = value, "set")
  });
}
__name(debugCreate, "debugCreate");
var Debug2 = new Proxy(debugCreate, {
  get: /* @__PURE__ */ __name((_, prop) => topProps[prop], "get"),
  set: /* @__PURE__ */ __name((_, prop, value) => topProps[prop] = value, "set")
});
function safeStringify(value, indent = 2) {
  const cache = /* @__PURE__ */ new Set();
  return JSON.stringify(
    value,
    (key, value2) => {
      if (typeof value2 === "object" && value2 !== null) {
        if (cache.has(value2)) {
          return `[Circular *]`;
        }
        cache.add(value2);
      } else if (typeof value2 === "bigint") {
        return value2.toString();
      }
      return value2;
    },
    indent
  );
}
__name(safeStringify, "safeStringify");

// node_modules/@prisma/driver-adapter-utils/dist/index.mjs
var DriverAdapterError = class extends Error {
  static {
    __name(this, "DriverAdapterError");
  }
  name = "DriverAdapterError";
  cause;
  constructor(payload) {
    super(typeof payload["message"] === "string" ? payload["message"] : payload.kind);
    this.cause = payload;
  }
};
var debug = Debug2("driver-adapter-utils");
var ColumnTypeEnum = {
  // Scalars
  Int32: 0,
  Int64: 1,
  Float: 2,
  Double: 3,
  Numeric: 4,
  Boolean: 5,
  Character: 6,
  Text: 7,
  Date: 8,
  Time: 9,
  DateTime: 10,
  Json: 11,
  Enum: 12,
  Bytes: 13,
  Set: 14,
  Uuid: 15,
  // Arrays
  Int32Array: 64,
  Int64Array: 65,
  FloatArray: 66,
  DoubleArray: 67,
  NumericArray: 68,
  BooleanArray: 69,
  CharacterArray: 70,
  TextArray: 71,
  DateArray: 72,
  TimeArray: 73,
  DateTimeArray: 74,
  JsonArray: 75,
  EnumArray: 76,
  BytesArray: 77,
  UuidArray: 78,
  // Custom
  UnknownNumber: 128
};
var mockAdapterErrors = {
  queryRaw: new Error("Not implemented: queryRaw"),
  executeRaw: new Error("Not implemented: executeRaw"),
  startTransaction: new Error("Not implemented: startTransaction"),
  executeScript: new Error("Not implemented: executeScript"),
  dispose: new Error("Not implemented: dispose")
};

// node_modules/ky/distribution/index.js
init_modules_watch_stub();

// node_modules/ky/distribution/core/Ky.js
init_modules_watch_stub();

// node_modules/ky/distribution/errors/HTTPError.js
init_modules_watch_stub();
var HTTPError = class extends Error {
  static {
    __name(this, "HTTPError");
  }
  response;
  request;
  options;
  constructor(response, request, options) {
    const code = response.status || response.status === 0 ? response.status : "";
    const title = response.statusText || "";
    const status = `${code} ${title}`.trim();
    const reason = status ? `status code ${status}` : "an unknown error";
    super(`Request failed with ${reason}: ${request.method} ${request.url}`);
    this.name = "HTTPError";
    this.response = response;
    this.request = request;
    this.options = options;
  }
};

// node_modules/ky/distribution/errors/TimeoutError.js
init_modules_watch_stub();
var TimeoutError = class extends Error {
  static {
    __name(this, "TimeoutError");
  }
  request;
  constructor(request) {
    super(`Request timed out: ${request.method} ${request.url}`);
    this.name = "TimeoutError";
    this.request = request;
  }
};

// node_modules/ky/distribution/utils/merge.js
init_modules_watch_stub();

// node_modules/ky/distribution/utils/is.js
init_modules_watch_stub();
var isObject = /* @__PURE__ */ __name((value) => value !== null && typeof value === "object", "isObject");

// node_modules/ky/distribution/utils/merge.js
var validateAndMerge = /* @__PURE__ */ __name((...sources) => {
  for (const source of sources) {
    if ((!isObject(source) || Array.isArray(source)) && source !== void 0) {
      throw new TypeError("The `options` argument must be an object");
    }
  }
  return deepMerge({}, ...sources);
}, "validateAndMerge");
var mergeHeaders = /* @__PURE__ */ __name((source1 = {}, source2 = {}) => {
  const result = new globalThis.Headers(source1);
  const isHeadersInstance = source2 instanceof globalThis.Headers;
  const source = new globalThis.Headers(source2);
  for (const [key, value] of source.entries()) {
    if (isHeadersInstance && value === "undefined" || value === void 0) {
      result.delete(key);
    } else {
      result.set(key, value);
    }
  }
  return result;
}, "mergeHeaders");
function newHookValue(original, incoming, property) {
  return Object.hasOwn(incoming, property) && incoming[property] === void 0 ? [] : deepMerge(original[property] ?? [], incoming[property] ?? []);
}
__name(newHookValue, "newHookValue");
var mergeHooks = /* @__PURE__ */ __name((original = {}, incoming = {}) => ({
  beforeRequest: newHookValue(original, incoming, "beforeRequest"),
  beforeRetry: newHookValue(original, incoming, "beforeRetry"),
  afterResponse: newHookValue(original, incoming, "afterResponse"),
  beforeError: newHookValue(original, incoming, "beforeError")
}), "mergeHooks");
var deepMerge = /* @__PURE__ */ __name((...sources) => {
  let returnValue = {};
  let headers = {};
  let hooks = {};
  for (const source of sources) {
    if (Array.isArray(source)) {
      if (!Array.isArray(returnValue)) {
        returnValue = [];
      }
      returnValue = [...returnValue, ...source];
    } else if (isObject(source)) {
      for (let [key, value] of Object.entries(source)) {
        if (isObject(value) && key in returnValue) {
          value = deepMerge(returnValue[key], value);
        }
        returnValue = { ...returnValue, [key]: value };
      }
      if (isObject(source.hooks)) {
        hooks = mergeHooks(hooks, source.hooks);
        returnValue.hooks = hooks;
      }
      if (isObject(source.headers)) {
        headers = mergeHeaders(headers, source.headers);
        returnValue.headers = headers;
      }
    }
  }
  return returnValue;
}, "deepMerge");

// node_modules/ky/distribution/utils/normalize.js
init_modules_watch_stub();

// node_modules/ky/distribution/core/constants.js
init_modules_watch_stub();
var supportsRequestStreams = (() => {
  let duplexAccessed = false;
  let hasContentType = false;
  const supportsReadableStream = typeof globalThis.ReadableStream === "function";
  const supportsRequest = typeof globalThis.Request === "function";
  if (supportsReadableStream && supportsRequest) {
    try {
      hasContentType = new globalThis.Request("https://empty.invalid", {
        body: new globalThis.ReadableStream(),
        method: "POST",
        // @ts-expect-error - Types are outdated.
        get duplex() {
          duplexAccessed = true;
          return "half";
        }
      }).headers.has("Content-Type");
    } catch (error) {
      if (error instanceof Error && error.message === "unsupported BodyInit type") {
        return false;
      }
      throw error;
    }
  }
  return duplexAccessed && !hasContentType;
})();
var supportsAbortController = typeof globalThis.AbortController === "function";
var supportsResponseStreams = typeof globalThis.ReadableStream === "function";
var supportsFormData = typeof globalThis.FormData === "function";
var requestMethods = ["get", "post", "put", "patch", "head", "delete"];
var validate = /* @__PURE__ */ __name(() => void 0, "validate");
validate();
var responseTypes = {
  json: "application/json",
  text: "text/*",
  formData: "multipart/form-data",
  arrayBuffer: "*/*",
  blob: "*/*"
};
var maxSafeTimeout = 2147483647;
var stop = Symbol("stop");
var kyOptionKeys = {
  json: true,
  parseJson: true,
  stringifyJson: true,
  searchParams: true,
  prefixUrl: true,
  retry: true,
  timeout: true,
  hooks: true,
  throwHttpErrors: true,
  onDownloadProgress: true,
  fetch: true
};
var requestOptionsRegistry = {
  method: true,
  headers: true,
  body: true,
  mode: true,
  credentials: true,
  cache: true,
  redirect: true,
  referrer: true,
  referrerPolicy: true,
  integrity: true,
  keepalive: true,
  signal: true,
  window: true,
  dispatcher: true,
  duplex: true,
  priority: true
};

// node_modules/ky/distribution/utils/normalize.js
var normalizeRequestMethod = /* @__PURE__ */ __name((input) => requestMethods.includes(input) ? input.toUpperCase() : input, "normalizeRequestMethod");
var retryMethods = ["get", "put", "head", "delete", "options", "trace"];
var retryStatusCodes = [408, 413, 429, 500, 502, 503, 504];
var retryAfterStatusCodes = [413, 429, 503];
var defaultRetryOptions = {
  limit: 2,
  methods: retryMethods,
  statusCodes: retryStatusCodes,
  afterStatusCodes: retryAfterStatusCodes,
  maxRetryAfter: Number.POSITIVE_INFINITY,
  backoffLimit: Number.POSITIVE_INFINITY,
  delay: /* @__PURE__ */ __name((attemptCount) => 0.3 * 2 ** (attemptCount - 1) * 1e3, "delay")
};
var normalizeRetryOptions = /* @__PURE__ */ __name((retry = {}) => {
  if (typeof retry === "number") {
    return {
      ...defaultRetryOptions,
      limit: retry
    };
  }
  if (retry.methods && !Array.isArray(retry.methods)) {
    throw new Error("retry.methods must be an array");
  }
  if (retry.statusCodes && !Array.isArray(retry.statusCodes)) {
    throw new Error("retry.statusCodes must be an array");
  }
  return {
    ...defaultRetryOptions,
    ...retry
  };
}, "normalizeRetryOptions");

// node_modules/ky/distribution/utils/timeout.js
init_modules_watch_stub();
async function timeout(request, init3, abortController, options) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (abortController) {
        abortController.abort();
      }
      reject(new TimeoutError(request));
    }, options.timeout);
    void options.fetch(request, init3).then(resolve).catch(reject).then(() => {
      clearTimeout(timeoutId);
    });
  });
}
__name(timeout, "timeout");

// node_modules/ky/distribution/utils/delay.js
init_modules_watch_stub();
async function delay(ms, { signal }) {
  return new Promise((resolve, reject) => {
    if (signal) {
      signal.throwIfAborted();
      signal.addEventListener("abort", abortHandler, { once: true });
    }
    function abortHandler() {
      clearTimeout(timeoutId);
      reject(signal.reason);
    }
    __name(abortHandler, "abortHandler");
    const timeoutId = setTimeout(() => {
      signal?.removeEventListener("abort", abortHandler);
      resolve();
    }, ms);
  });
}
__name(delay, "delay");

// node_modules/ky/distribution/utils/options.js
init_modules_watch_stub();
var findUnknownOptions = /* @__PURE__ */ __name((request, options) => {
  const unknownOptions = {};
  for (const key in options) {
    if (!(key in requestOptionsRegistry) && !(key in kyOptionKeys) && !(key in request)) {
      unknownOptions[key] = options[key];
    }
  }
  return unknownOptions;
}, "findUnknownOptions");

// node_modules/ky/distribution/core/Ky.js
var Ky = class _Ky {
  static {
    __name(this, "Ky");
  }
  static create(input, options) {
    const ky2 = new _Ky(input, options);
    const function_ = /* @__PURE__ */ __name(async () => {
      if (typeof ky2._options.timeout === "number" && ky2._options.timeout > maxSafeTimeout) {
        throw new RangeError(`The \`timeout\` option cannot be greater than ${maxSafeTimeout}`);
      }
      await Promise.resolve();
      let response = await ky2._fetch();
      for (const hook of ky2._options.hooks.afterResponse) {
        const modifiedResponse = await hook(ky2.request, ky2._options, ky2._decorateResponse(response.clone()));
        if (modifiedResponse instanceof globalThis.Response) {
          response = modifiedResponse;
        }
      }
      ky2._decorateResponse(response);
      if (!response.ok && ky2._options.throwHttpErrors) {
        let error = new HTTPError(response, ky2.request, ky2._options);
        for (const hook of ky2._options.hooks.beforeError) {
          error = await hook(error);
        }
        throw error;
      }
      if (ky2._options.onDownloadProgress) {
        if (typeof ky2._options.onDownloadProgress !== "function") {
          throw new TypeError("The `onDownloadProgress` option must be a function");
        }
        if (!supportsResponseStreams) {
          throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");
        }
        return ky2._stream(response.clone(), ky2._options.onDownloadProgress);
      }
      return response;
    }, "function_");
    const isRetriableMethod = ky2._options.retry.methods.includes(ky2.request.method.toLowerCase());
    const result = isRetriableMethod ? ky2._retry(function_) : function_();
    for (const [type, mimeType] of Object.entries(responseTypes)) {
      result[type] = async () => {
        ky2.request.headers.set("accept", ky2.request.headers.get("accept") || mimeType);
        const response = await result;
        if (type === "json") {
          if (response.status === 204) {
            return "";
          }
          const arrayBuffer = await response.clone().arrayBuffer();
          const responseSize = arrayBuffer.byteLength;
          if (responseSize === 0) {
            return "";
          }
          if (options.parseJson) {
            return options.parseJson(await response.text());
          }
        }
        return response[type]();
      };
    }
    return result;
  }
  request;
  abortController;
  _retryCount = 0;
  _input;
  _options;
  // eslint-disable-next-line complexity
  constructor(input, options = {}) {
    this._input = input;
    this._options = {
      ...options,
      headers: mergeHeaders(this._input.headers, options.headers),
      hooks: mergeHooks({
        beforeRequest: [],
        beforeRetry: [],
        beforeError: [],
        afterResponse: []
      }, options.hooks),
      method: normalizeRequestMethod(options.method ?? this._input.method ?? "GET"),
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      prefixUrl: String(options.prefixUrl || ""),
      retry: normalizeRetryOptions(options.retry),
      throwHttpErrors: options.throwHttpErrors !== false,
      timeout: options.timeout ?? 1e4,
      fetch: options.fetch ?? globalThis.fetch.bind(globalThis)
    };
    if (typeof this._input !== "string" && !(this._input instanceof URL || this._input instanceof globalThis.Request)) {
      throw new TypeError("`input` must be a string, URL, or Request");
    }
    if (this._options.prefixUrl && typeof this._input === "string") {
      if (this._input.startsWith("/")) {
        throw new Error("`input` must not begin with a slash when using `prefixUrl`");
      }
      if (!this._options.prefixUrl.endsWith("/")) {
        this._options.prefixUrl += "/";
      }
      this._input = this._options.prefixUrl + this._input;
    }
    if (supportsAbortController) {
      this.abortController = new globalThis.AbortController();
      const originalSignal = this._options.signal ?? this._input.signal;
      if (originalSignal?.aborted) {
        this.abortController.abort(originalSignal?.reason);
      }
      originalSignal?.addEventListener("abort", () => {
        this.abortController.abort(originalSignal.reason);
      });
      this._options.signal = this.abortController.signal;
    }
    if (supportsRequestStreams) {
      this._options.duplex = "half";
    }
    if (this._options.json !== void 0) {
      this._options.body = this._options.stringifyJson?.(this._options.json) ?? JSON.stringify(this._options.json);
      this._options.headers.set("content-type", this._options.headers.get("content-type") ?? "application/json");
    }
    this.request = new globalThis.Request(this._input, this._options);
    if (this._options.searchParams) {
      const textSearchParams = typeof this._options.searchParams === "string" ? this._options.searchParams.replace(/^\?/, "") : new URLSearchParams(this._options.searchParams).toString();
      const searchParams = "?" + textSearchParams;
      const url = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, searchParams);
      if ((supportsFormData && this._options.body instanceof globalThis.FormData || this._options.body instanceof URLSearchParams) && !(this._options.headers && this._options.headers["content-type"])) {
        this.request.headers.delete("content-type");
      }
      this.request = new globalThis.Request(new globalThis.Request(url, { ...this.request }), this._options);
    }
  }
  _calculateRetryDelay(error) {
    this._retryCount++;
    if (this._retryCount > this._options.retry.limit || error instanceof TimeoutError) {
      throw error;
    }
    if (error instanceof HTTPError) {
      if (!this._options.retry.statusCodes.includes(error.response.status)) {
        throw error;
      }
      const retryAfter = error.response.headers.get("Retry-After") ?? error.response.headers.get("RateLimit-Reset") ?? error.response.headers.get("X-RateLimit-Reset") ?? error.response.headers.get("X-Rate-Limit-Reset");
      if (retryAfter && this._options.retry.afterStatusCodes.includes(error.response.status)) {
        let after = Number(retryAfter) * 1e3;
        if (Number.isNaN(after)) {
          after = Date.parse(retryAfter) - Date.now();
        } else if (after >= Date.parse("2024-01-01")) {
          after -= Date.now();
        }
        const max = this._options.retry.maxRetryAfter ?? after;
        return after < max ? after : max;
      }
      if (error.response.status === 413) {
        throw error;
      }
    }
    const retryDelay = this._options.retry.delay(this._retryCount);
    return Math.min(this._options.retry.backoffLimit, retryDelay);
  }
  _decorateResponse(response) {
    if (this._options.parseJson) {
      response.json = async () => this._options.parseJson(await response.text());
    }
    return response;
  }
  async _retry(function_) {
    try {
      return await function_();
    } catch (error) {
      const ms = Math.min(this._calculateRetryDelay(error), maxSafeTimeout);
      if (this._retryCount < 1) {
        throw error;
      }
      await delay(ms, { signal: this._options.signal });
      for (const hook of this._options.hooks.beforeRetry) {
        const hookResult = await hook({
          request: this.request,
          options: this._options,
          error,
          retryCount: this._retryCount
        });
        if (hookResult === stop) {
          return;
        }
      }
      return this._retry(function_);
    }
  }
  async _fetch() {
    for (const hook of this._options.hooks.beforeRequest) {
      const result = await hook(this.request, this._options);
      if (result instanceof Request) {
        this.request = result;
        break;
      }
      if (result instanceof Response) {
        return result;
      }
    }
    const nonRequestOptions = findUnknownOptions(this.request, this._options);
    const mainRequest = this.request;
    this.request = mainRequest.clone();
    if (this._options.timeout === false) {
      return this._options.fetch(mainRequest, nonRequestOptions);
    }
    return timeout(mainRequest, nonRequestOptions, this.abortController, this._options);
  }
  /* istanbul ignore next */
  _stream(response, onDownloadProgress) {
    const totalBytes = Number(response.headers.get("content-length")) || 0;
    let transferredBytes = 0;
    if (response.status === 204) {
      if (onDownloadProgress) {
        onDownloadProgress({ percent: 1, totalBytes, transferredBytes }, new Uint8Array());
      }
      return new globalThis.Response(null, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
    }
    return new globalThis.Response(new globalThis.ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();
        if (onDownloadProgress) {
          onDownloadProgress({ percent: 0, transferredBytes: 0, totalBytes }, new Uint8Array());
        }
        async function read() {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            return;
          }
          if (onDownloadProgress) {
            transferredBytes += value.byteLength;
            const percent = totalBytes === 0 ? 0 : transferredBytes / totalBytes;
            onDownloadProgress({ percent, transferredBytes, totalBytes }, value);
          }
          controller.enqueue(value);
          await read();
        }
        __name(read, "read");
        await read();
      }
    }), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  }
};

// node_modules/ky/distribution/index.js
var createInstance = /* @__PURE__ */ __name((defaults) => {
  const ky2 = /* @__PURE__ */ __name((input, options) => Ky.create(input, validateAndMerge(defaults, options)), "ky");
  for (const method of requestMethods) {
    ky2[method] = (input, options) => Ky.create(input, validateAndMerge(defaults, options, { method }));
  }
  ky2.create = (newDefaults) => createInstance(validateAndMerge(newDefaults));
  ky2.extend = (newDefaults) => {
    if (typeof newDefaults === "function") {
      newDefaults = newDefaults(defaults ?? {});
    }
    return createInstance(validateAndMerge(defaults, newDefaults));
  };
  ky2.stop = stop;
  return ky2;
}, "createInstance");
var ky = createInstance();
var distribution_default = ky;

// node_modules/@prisma/adapter-d1/dist/index.mjs
var name = "@prisma/adapter-d1";
var FORCE_COLOR2;
var NODE_DISABLE_COLORS2;
var NO_COLOR2;
var TERM2;
var isTTY2 = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR: FORCE_COLOR2, NODE_DISABLE_COLORS: NODE_DISABLE_COLORS2, NO_COLOR: NO_COLOR2, TERM: TERM2 } = process.env || {});
  isTTY2 = process.stdout && process.stdout.isTTY;
}
var $2 = {
  enabled: !NODE_DISABLE_COLORS2 && NO_COLOR2 == null && TERM2 !== "dumb" && (FORCE_COLOR2 != null && FORCE_COLOR2 !== "0" || isTTY2)
};
function init2(x, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
  return function(txt) {
    if (!$2.enabled || txt == null) return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
__name(init2, "init");
var reset2 = init2(0, 0);
var bold2 = init2(1, 22);
var dim2 = init2(2, 22);
var italic2 = init2(3, 23);
var underline2 = init2(4, 24);
var inverse2 = init2(7, 27);
var hidden2 = init2(8, 28);
var strikethrough2 = init2(9, 29);
var black2 = init2(30, 39);
var red2 = init2(31, 39);
var green2 = init2(32, 39);
var yellow2 = init2(33, 39);
var blue2 = init2(34, 39);
var magenta2 = init2(35, 39);
var cyan2 = init2(36, 39);
var white2 = init2(37, 39);
var gray2 = init2(90, 39);
var grey2 = init2(90, 39);
var bgBlack2 = init2(40, 49);
var bgRed2 = init2(41, 49);
var bgGreen2 = init2(42, 49);
var bgYellow2 = init2(43, 49);
var bgBlue2 = init2(44, 49);
var bgMagenta2 = init2(45, 49);
var bgCyan2 = init2(46, 49);
var bgWhite2 = init2(47, 49);
var MAX_BIND_VALUES = 98;
var GENERIC_SQLITE_ERROR = 1;
function getColumnTypes(columnNames, rows) {
  const columnTypes = [];
  columnLoop: for (let columnIndex = 0; columnIndex < columnNames.length; columnIndex++) {
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const candidateValue = rows[rowIndex][columnIndex];
      if (candidateValue !== null) {
        const inferred = inferColumnType(candidateValue);
        if (columnTypes[columnIndex] === void 0 || inferred === ColumnTypeEnum.Text) {
          columnTypes[columnIndex] = inferred;
        }
        if (inferred !== ColumnTypeEnum.UnknownNumber) {
          continue columnLoop;
        }
      }
    }
    if (columnTypes[columnIndex] === void 0) {
      columnTypes[columnIndex] = ColumnTypeEnum.Int32;
    }
  }
  return columnTypes;
}
__name(getColumnTypes, "getColumnTypes");
function inferColumnType(value) {
  switch (typeof value) {
    case "string":
      return inferStringType(value);
    case "number":
      return inferNumberType(value);
    case "object":
      return inferObjectType(value);
    default:
      throw new UnexpectedTypeError(value);
  }
}
__name(inferColumnType, "inferColumnType");
var isoDateRegex = new RegExp(
  /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))$|^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$|^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/
);
var sqliteDateRegex = /^\d{4}-[0-1]\d-[0-3]\d [0-2]\d:[0-5]\d:[0-5]\d$/;
function isISODate(str) {
  return isoDateRegex.test(str) || sqliteDateRegex.test(str);
}
__name(isISODate, "isISODate");
function inferStringType(value) {
  if (isISODate(value)) {
    return ColumnTypeEnum.DateTime;
  }
  return ColumnTypeEnum.Text;
}
__name(inferStringType, "inferStringType");
function inferNumberType(_) {
  return ColumnTypeEnum.UnknownNumber;
}
__name(inferNumberType, "inferNumberType");
function inferObjectType(value) {
  if (value instanceof Array) {
    return ColumnTypeEnum.Bytes;
  }
  throw new UnexpectedTypeError(value);
}
__name(inferObjectType, "inferObjectType");
var UnexpectedTypeError = class extends Error {
  static {
    __name(this, "UnexpectedTypeError");
  }
  name = "UnexpectedTypeError";
  constructor(value) {
    const type = typeof value;
    const repr = type === "object" ? JSON.stringify(value) : String(value);
    super(`unexpected value of type ${type}: ${repr}`);
  }
};
function mapRow(result, columnTypes) {
  for (let i = 0; i < result.length; i++) {
    const value = result[i];
    if (value instanceof ArrayBuffer) {
      result[i] = Array.from(new Uint8Array(value));
      continue;
    }
    if (typeof value === "number" && (columnTypes[i] === ColumnTypeEnum.Int32 || columnTypes[i] === ColumnTypeEnum.Int64) && !Number.isInteger(value)) {
      result[i] = Math.trunc(value);
      continue;
    }
    if (typeof value === "number" && columnTypes[i] === ColumnTypeEnum.Text) {
      result[i] = value.toString();
      continue;
    }
    if (typeof value === "bigint") {
      result[i] = value.toString();
      continue;
    }
    if (columnTypes[i] === ColumnTypeEnum.Boolean) {
      result[i] = JSON.parse(value);
    }
  }
  return result;
}
__name(mapRow, "mapRow");
function mapArg(arg, argType) {
  if (arg === null) {
    return null;
  }
  if (typeof arg === "bigint" || argType.scalarType === "bigint") {
    const asInt56 = Number.parseInt(`${arg}`);
    if (!Number.isSafeInteger(asInt56)) {
      throw new Error(`Invalid Int64-encoded value received: ${arg}`);
    }
    return asInt56;
  }
  if (typeof arg === "string" && argType.scalarType === "int") {
    return Number.parseInt(arg);
  }
  if (typeof arg === "string" && argType.scalarType === "float") {
    return Number.parseFloat(arg);
  }
  if (typeof arg === "string" && argType.scalarType === "decimal") {
    return Number.parseFloat(arg);
  }
  if (arg === true) {
    return 1;
  }
  if (arg === false) {
    return 0;
  }
  if (typeof arg === "string" && argType.scalarType === "datetime") {
    arg = new Date(arg);
  }
  if (arg instanceof Date) {
    return arg.toISOString().replace("Z", "+00:00");
  }
  if (typeof arg === "string" && argType.scalarType === "bytes") {
    return Array.from(Buffer.from(arg, "base64"));
  }
  if (arg instanceof Uint8Array) {
    return Array.from(arg);
  }
  return arg;
}
__name(mapArg, "mapArg");
function convertDriverError(error) {
  if (isDriverError(error)) {
    return {
      originalMessage: error.message,
      ...mapDriverError(error)
    };
  }
  throw error;
}
__name(convertDriverError, "convertDriverError");
function mapDriverError(error) {
  let stripped = error.message.split("D1_ERROR: ").at(1) ?? error.message;
  stripped = stripped.split("SqliteError: ").at(1) ?? stripped;
  if (stripped.startsWith("UNIQUE constraint failed") || stripped.startsWith("PRIMARY KEY constraint failed")) {
    const fields = stripped.split(": ").at(1)?.split(", ").map((field) => field.split(".").pop());
    return {
      kind: "UniqueConstraintViolation",
      constraint: fields !== void 0 ? { fields } : void 0
    };
  } else if (stripped.startsWith("NOT NULL constraint failed")) {
    const fields = stripped.split(": ").at(1)?.split(", ").map((field) => field.split(".").pop());
    return {
      kind: "NullConstraintViolation",
      constraint: fields !== void 0 ? { fields } : void 0
    };
  } else if (stripped.startsWith("FOREIGN KEY constraint failed") || stripped.startsWith("CHECK constraint failed")) {
    return {
      kind: "ForeignKeyConstraintViolation",
      constraint: { foreignKey: {} }
    };
  } else if (stripped.startsWith("no such table")) {
    return {
      kind: "TableDoesNotExist",
      table: stripped.split(": ").at(1)
    };
  } else if (stripped.startsWith("no such column")) {
    return {
      kind: "ColumnNotFound",
      column: stripped.split(": ").at(1)
    };
  } else if (stripped.includes("has no column named ")) {
    return {
      kind: "ColumnNotFound",
      column: stripped.split("has no column named ").at(1)
    };
  }
  return {
    kind: "sqlite",
    extendedCode: error["code"] ?? error["cause"]?.["code"] ?? 1,
    message: error.message
  };
}
__name(mapDriverError, "mapDriverError");
function isDriverError(error) {
  return typeof error["message"] === "string";
}
__name(isDriverError, "isDriverError");
var debug2 = Debug2("prisma:driver-adapter:d1-http");
function onUnsuccessfulD1HTTPResponse({ errors }) {
  debug2("D1 HTTP Errors: %O", errors);
  const error = errors.at(0) ?? { message: "Unknown error", code: GENERIC_SQLITE_ERROR };
  throw new DriverAdapterError(convertDriverError(error));
}
__name(onUnsuccessfulD1HTTPResponse, "onUnsuccessfulD1HTTPResponse");
function onGenericD1HTTPError(error) {
  debug2("HTTP Error: %O", error);
  throw new DriverAdapterError(convertDriverError(error));
}
__name(onGenericD1HTTPError, "onGenericD1HTTPError");
function onError(error) {
  console.error("Error in performIO: %O", error);
  throw new DriverAdapterError(convertDriverError(error));
}
__name(onError, "onError");
async function performRawQuery(client, options) {
  try {
    const response = await client.post("raw", options).json();
    const tag = "[js::performRawQuery]";
    debug2(`${tag} %O`, {
      success: response.success,
      errors: response.errors,
      messages: response.messages,
      result: response.result
    });
    if (!response.success) {
      onUnsuccessfulD1HTTPResponse(response);
    }
    return response.result;
  } catch (e) {
    onGenericD1HTTPError(e);
  }
}
__name(performRawQuery, "performRawQuery");
function isD1HTTPParams(params) {
  return typeof params === "object" && params !== null && "CLOUDFLARE_D1_TOKEN" in params && "CLOUDFLARE_ACCOUNT_ID" in params && "CLOUDFLARE_DATABASE_ID" in params;
}
__name(isD1HTTPParams, "isD1HTTPParams");
var D1HTTPQueryable = class {
  static {
    __name(this, "D1HTTPQueryable");
  }
  constructor(client) {
    this.client = client;
  }
  provider = "sqlite";
  adapterName = `${name}-http`;
  /**
   * Execute a query given as SQL, interpolating the given parameters.
   */
  async queryRaw(query) {
    const tag = "[js::query_raw]";
    debug2(`${tag} %O`, query);
    const data = await this.performIO(query);
    const convertedData = this.convertData(data);
    return convertedData;
  }
  convertData({ columnNames, rows: results }) {
    if (results.length === 0) {
      return {
        columnNames: [],
        columnTypes: [],
        rows: []
      };
    }
    const columnTypes = getColumnTypes(columnNames, results);
    const rows = results.map((value) => mapRow(value, columnTypes));
    return {
      columnNames,
      columnTypes,
      rows
    };
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */
  async executeRaw(query) {
    const tag = "[js::execute_raw]";
    debug2(`${tag} %O`, query);
    const result = await this.performIO(query);
    return result.affectedRows ?? 0;
  }
  async performIO(query) {
    try {
      const body = {
        json: {
          sql: query.sql,
          params: query.args.map((arg, i) => mapArg(arg, query.argTypes[i]))
        }
      };
      const tag = "[js::perform_io]";
      debug2(`${tag} %O`, body);
      const results = await performRawQuery(this.client, body);
      if (results.length !== 1) {
        throw new Error("Expected exactly one result");
      }
      const result = results[0];
      const { columns: columnNames = [], rows = [] } = result.results ?? {};
      const affectedRows = result.meta?.changes;
      return { rows, columnNames, affectedRows };
    } catch (e) {
      onError(e);
    }
  }
};
var D1HTTPTransaction = class extends D1HTTPQueryable {
  static {
    __name(this, "D1HTTPTransaction");
  }
  constructor(client, options) {
    super(client);
    this.options = options;
  }
  async commit() {
    debug2(`[js::commit]`);
  }
  async rollback() {
    debug2(`[js::rollback]`);
  }
};
var PrismaD1HTTPAdapter = class extends D1HTTPQueryable {
  static {
    __name(this, "PrismaD1HTTPAdapter");
  }
  constructor(params, release) {
    const D1_API_BASE_URL = `https://api.cloudflare.com/client/v4/accounts/${params.CLOUDFLARE_ACCOUNT_ID}/d1/database/${params.CLOUDFLARE_DATABASE_ID}`;
    const client = distribution_default.create({
      prefixUrl: D1_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${params.CLOUDFLARE_D1_TOKEN}`
      },
      // Don't automatically throw on non-2xx status codes
      throwHttpErrors: false
    });
    super(client);
    this.release = release;
  }
  tags = {
    error: red2("prisma:error"),
    warn: yellow2("prisma:warn"),
    info: cyan2("prisma:info"),
    query: blue2("prisma:query")
  };
  alreadyWarned = /* @__PURE__ */ new Set();
  /**
   * This will warn once per transaction
   * e.g. the following two explicit transactions
   * will only trigger _two_ warnings
   *
   * ```ts
   * await prisma.$transaction([ ...queries ])
   * await prisma.$transaction([ ...moreQueries ])
   * ```
   */
  warnOnce = /* @__PURE__ */ __name((key, message, ...args) => {
    if (!this.alreadyWarned.has(key)) {
      this.alreadyWarned.add(key);
      console.info(`${this.tags.warn} ${message}`, ...args);
    }
  }, "warnOnce");
  async executeScript(script) {
    try {
      await performRawQuery(this.client, {
        json: {
          sql: script
        }
      });
    } catch (error) {
      onError(error);
    }
  }
  getConnectionInfo() {
    return {
      maxBindValues: MAX_BIND_VALUES,
      supportsRelationJoins: false
    };
  }
  async startTransaction(isolationLevel) {
    if (isolationLevel && isolationLevel !== "SERIALIZABLE") {
      throw new DriverAdapterError({
        kind: "InvalidIsolationLevel",
        level: isolationLevel
      });
    }
    this.warnOnce(
      "D1 Transaction",
      "Cloudflare D1 does not support transactions yet. When using Prisma's D1 adapter, implicit & explicit transactions will be ignored and run as individual queries, which breaks the guarantees of the ACID properties of transactions. For more details see https://pris.ly/d/d1-transactions"
    );
    const options = {
      usePhantomQuery: true
    };
    const tag = "[js::startTransaction]";
    debug2("%s options: %O", tag, options);
    return new D1HTTPTransaction(this.client, options);
  }
  async dispose() {
    await this.release?.();
  }
};
var PrismaD1HTTPAdapterFactory = class {
  static {
    __name(this, "PrismaD1HTTPAdapterFactory");
  }
  constructor(params) {
    this.params = params;
  }
  provider = "sqlite";
  adapterName = `${name}-http`;
  async connect() {
    return new PrismaD1HTTPAdapter(this.params, async () => {
    });
  }
  async connectToShadowDb() {
    const D1_API_BASE_URL = `https://api.cloudflare.com/client/v4/accounts/${this.params.CLOUDFLARE_ACCOUNT_ID}/d1/database`;
    const client = distribution_default.create({
      headers: {
        Authorization: `Bearer ${this.params.CLOUDFLARE_D1_TOKEN}`
      },
      // Don't throw on non-2xx status codes
      throwHttpErrors: false
    });
    const createShadowDatabase = /* @__PURE__ */ __name(async () => {
      const tag = "[js::connectToShadowDb::createShadowDatabase]";
      const SHADOW_DATABASE_PREFIX = "_prisma_shadow_";
      const CLOUDFLARE_SHADOW_DATABASE_NAME = `${SHADOW_DATABASE_PREFIX}${globalThis.crypto.randomUUID()}`;
      debug2(`${tag} creating database %s`, CLOUDFLARE_SHADOW_DATABASE_NAME);
      try {
        const response = await client.post(D1_API_BASE_URL, {
          json: {
            name: CLOUDFLARE_SHADOW_DATABASE_NAME
          }
        }).json();
        debug2(`${tag} %O`, response);
        if (!response.success) {
          onUnsuccessfulD1HTTPResponse(response);
        }
        const { uuid: CLOUDFLARE_SHADOW_DATABASE_ID2 } = response.result;
        debug2(`${tag} created database %s with ID %s`, CLOUDFLARE_SHADOW_DATABASE_NAME, CLOUDFLARE_SHADOW_DATABASE_ID2);
        return CLOUDFLARE_SHADOW_DATABASE_ID2;
      } catch (e) {
        onGenericD1HTTPError(e);
      }
    }, "createShadowDatabase");
    const CLOUDFLARE_SHADOW_DATABASE_ID = this.params.CLOUDFLARE_SHADOW_DATABASE_ID ?? await createShadowDatabase();
    const dispose = /* @__PURE__ */ __name(async () => {
      const tag = "[js::connectToShadowDb::dispose]";
      try {
        debug2(`${tag} deleting database %s`, CLOUDFLARE_SHADOW_DATABASE_ID);
        const response = await client.delete(`${D1_API_BASE_URL}/${CLOUDFLARE_SHADOW_DATABASE_ID}`).json();
        debug2(`${tag} %O`, response);
        if (!response.success) {
          onUnsuccessfulD1HTTPResponse(response);
        }
      } catch (e) {
        onGenericD1HTTPError(e);
      }
    }, "dispose");
    return new PrismaD1HTTPAdapter(this.params, dispose);
  }
};
var debug22 = Debug2("prisma:driver-adapter:d1");
var D1WorkerQueryable = class {
  static {
    __name(this, "D1WorkerQueryable");
  }
  constructor(client) {
    this.client = client;
  }
  provider = "sqlite";
  adapterName = name;
  /**
   * Execute a query given as SQL, interpolating the given parameters.
   */
  async queryRaw(query) {
    const tag = "[js::query_raw]";
    debug22(`${tag} %O`, query);
    const data = await this.performIO(query);
    const convertedData = this.convertData(data);
    return convertedData;
  }
  convertData(ioResult) {
    const columnNames = ioResult[0];
    const results = ioResult[1];
    if (results.length === 0) {
      return {
        columnNames: [],
        columnTypes: [],
        rows: []
      };
    }
    const columnTypes = Object.values(getColumnTypes(columnNames, results));
    const rows = results.map((value) => mapRow(value, columnTypes));
    return {
      columnNames,
      // * Note: without Object.values the array looks like
      // * columnTypes: [ id: 128 ],
      // * and errors with:
      // * ✘ [ERROR] A hanging Promise was canceled. This happens when the worker runtime is waiting for a Promise from JavaScript to resolve, but has detected that the Promise cannot possibly ever resolve because all code and events related to the Promise's I/O context have already finished.
      columnTypes,
      rows
    };
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */
  async executeRaw(query) {
    const tag = "[js::execute_raw]";
    debug22(`${tag} %O`, query);
    const result = await this.performIO(query, true);
    return result.meta.changes ?? 0;
  }
  async performIO(query, executeRaw = false) {
    try {
      const args = query.args.map((arg, i) => mapArg(arg, query.argTypes[i]));
      const stmt = this.client.prepare(query.sql).bind(...args);
      if (executeRaw) {
        return await stmt.run();
      } else {
        const [columnNames, ...rows] = await stmt.raw({ columnNames: true });
        return [columnNames, rows];
      }
    } catch (e) {
      onError2(e);
    }
  }
};
var D1WorkerTransaction = class extends D1WorkerQueryable {
  static {
    __name(this, "D1WorkerTransaction");
  }
  constructor(client, options) {
    super(client);
    this.options = options;
  }
  async commit() {
    debug22(`[js::commit]`);
  }
  async rollback() {
    debug22(`[js::rollback]`);
  }
};
var PrismaD1WorkerAdapter = class extends D1WorkerQueryable {
  static {
    __name(this, "PrismaD1WorkerAdapter");
  }
  constructor(client, release) {
    super(client);
    this.release = release;
  }
  tags = {
    error: red2("prisma:error"),
    warn: yellow2("prisma:warn"),
    info: cyan2("prisma:info"),
    query: blue2("prisma:query")
  };
  alreadyWarned = /* @__PURE__ */ new Set();
  /**
   * This will warn once per transaction
   * e.g. the following two explicit transactions
   * will only trigger _two_ warnings
   *
   * ```ts
   * await prisma.$transaction([ ...queries ])
   * await prisma.$transaction([ ...moreQueries ])
   * ```
   */
  warnOnce = /* @__PURE__ */ __name((key, message, ...args) => {
    if (!this.alreadyWarned.has(key)) {
      this.alreadyWarned.add(key);
      console.info(`${this.tags.warn} ${message}`, ...args);
    }
  }, "warnOnce");
  async executeScript(script) {
    try {
      await this.client.exec(script);
    } catch (error) {
      onError2(error);
    }
  }
  getConnectionInfo() {
    return {
      maxBindValues: MAX_BIND_VALUES,
      supportsRelationJoins: false
    };
  }
  async startTransaction(isolationLevel) {
    if (isolationLevel && isolationLevel !== "SERIALIZABLE") {
      throw new DriverAdapterError({
        kind: "InvalidIsolationLevel",
        level: isolationLevel
      });
    }
    this.warnOnce(
      "D1 Transaction",
      "Cloudflare D1 does not support transactions yet. When using Prisma's D1 adapter, implicit & explicit transactions will be ignored and run as individual queries, which breaks the guarantees of the ACID properties of transactions. For more details see https://pris.ly/d/d1-transactions"
    );
    const options = {
      usePhantomQuery: true
    };
    const tag = "[js::startTransaction]";
    debug22("%s options: %O", tag, options);
    return new D1WorkerTransaction(this.client, options);
  }
  async dispose() {
    await this.release?.();
  }
};
var PrismaD1WorkerAdapterFactory = class {
  static {
    __name(this, "PrismaD1WorkerAdapterFactory");
  }
  constructor(client) {
    this.client = client;
  }
  provider = "sqlite";
  adapterName = name;
  async connect() {
    return new PrismaD1WorkerAdapter(this.client, async () => {
    });
  }
};
function onError2(error) {
  console.error("Error in performIO: %O", error);
  throw new DriverAdapterError(convertDriverError(error));
}
__name(onError2, "onError2");
var PrismaD1 = class {
  static {
    __name(this, "PrismaD1");
  }
  provider = "sqlite";
  adapterName = name;
  connect;
  connectToShadowDb;
  constructor(params) {
    if (isD1HTTPParams(params)) {
      const factory = new PrismaD1HTTPAdapterFactory(params);
      const self2 = this;
      self2.connect = factory.connect.bind(factory);
      self2.connectToShadowDb = factory.connectToShadowDb.bind(factory);
    } else {
      const factory = new PrismaD1WorkerAdapterFactory(params);
      const self2 = this;
      self2.connect = factory.connect.bind(factory);
    }
  }
};

// lib/prisma-edge.ts
function getPrismaClient2(d1Database) {
  const adapter = new PrismaD1(d1Database);
  const prisma = new import_client.PrismaClient({
    adapter,
    log: false ? ["query", "error", "warn"] : ["error"]
  });
  return prisma;
}
__name(getPrismaClient2, "getPrismaClient");

// workers/test-d1.ts
var test_d1_default = {
  async fetch(request, env) {
    const prisma = getPrismaClient2(env.DB);
    try {
      const userCount = await prisma.user.count();
      const jobCount = await prisma.copyJob.count();
      return new Response(JSON.stringify({
        success: true,
        stats: {
          users: userCount,
          jobs: jobCount
        }
      }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-w9DYVP/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = test_d1_default;

// node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-w9DYVP/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init3) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init3.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init3) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init3.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

ky/distribution/index.js:
  (*! MIT License © Sindre Sorhus *)
*/
//# sourceMappingURL=test-d1.js.map
