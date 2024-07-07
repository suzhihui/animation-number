import { openBlock as c, createElementBlock as d, toDisplayString as p } from "vue";
let u = 0;
const h = "webkit moz ms o".split(" ");
let s, l;
const m = typeof window > "u";
if (m)
  s = function() {
  }, l = function() {
  };
else {
  s = window.requestAnimationFrame, l = window.cancelAnimationFrame;
  let t;
  for (let i = 0; i < h.length && !(s && l); i++)
    t = h[i], s = s || window[t + "RequestAnimationFrame"], l = l || window[t + "CancelAnimationFrame"] || window[t + "CancelRequestAnimationFrame"];
  (!s || !l) && (s = function(i) {
    const e = (/* @__PURE__ */ new Date()).getTime(), a = Math.max(0, 16 - (e - u)), r = window.setTimeout(() => {
      i(e + a);
    }, a);
    return u = e + a, r;
  }, l = function(i) {
    window.clearTimeout(i);
  });
}
const f = (t, i) => {
  const e = t.__vccOpts || t;
  for (const [a, r] of i)
    e[a] = r;
  return e;
}, V = {
  props: {
    startVal: {
      type: Number,
      required: !1,
      default: 0
    },
    endVal: {
      type: Number,
      required: !1,
      default: 2017
    },
    duration: {
      type: Number,
      required: !1,
      default: 3e3
    },
    autoplay: {
      type: Boolean,
      required: !1,
      default: !0
    },
    decimals: {
      type: Number,
      required: !1,
      default: 0,
      validator(t) {
        return t >= 0;
      }
    },
    decimal: {
      type: String,
      required: !1,
      default: "."
    },
    separator: {
      type: String,
      required: !1,
      default: ","
    },
    prefix: {
      type: String,
      required: !1,
      default: ""
    },
    suffix: {
      type: String,
      required: !1,
      default: ""
    },
    useEasing: {
      type: Boolean,
      required: !1,
      default: !0
    },
    easingFn: {
      type: Function,
      default(t, i, e, a) {
        return e * (-Math.pow(2, -10 * t / a) + 1) * 1024 / 1023 + i;
      }
    }
  },
  data() {
    return {
      localStartVal: this.startVal,
      displayValue: this.formatNumber(this.startVal),
      printVal: null,
      paused: !1,
      localDuration: this.duration,
      startTime: null,
      timestamp: null,
      remaining: null,
      rAF: null
    };
  },
  computed: {
    countDown() {
      return this.startVal > this.endVal;
    }
  },
  watch: {
    startVal() {
      this.autoplay && this.start();
    },
    endVal() {
      this.autoplay && this.start();
    }
  },
  mounted() {
    this.autoplay && this.start(), this.$emit("mountedCallback");
  },
  methods: {
    start() {
      this.localStartVal = this.startVal, this.startTime = null, this.localDuration = this.duration, this.paused = !1, this.rAF = s(this.count);
    },
    pauseResume() {
      this.paused ? (this.resume(), this.paused = !1) : (this.pause(), this.paused = !0);
    },
    pause() {
      l(this.rAF);
    },
    resume() {
      this.startTime = null, this.localDuration = +this.remaining, this.localStartVal = +this.printVal, s(this.count);
    },
    reset() {
      this.startTime = null, l(this.rAF), this.displayValue = this.formatNumber(this.startVal);
    },
    count(t) {
      this.startTime || (this.startTime = t), this.timestamp = t;
      const i = t - this.startTime;
      this.remaining = this.localDuration - i, this.useEasing ? this.countDown ? this.printVal = this.localStartVal - this.easingFn(i, 0, this.localStartVal - this.endVal, this.localDuration) : this.printVal = this.easingFn(i, this.localStartVal, this.endVal - this.localStartVal, this.localDuration) : this.countDown ? this.printVal = this.localStartVal - (this.localStartVal - this.endVal) * (i / this.localDuration) : this.printVal = this.localStartVal + (this.endVal - this.localStartVal) * (i / this.localDuration), this.countDown ? this.printVal = this.printVal < this.endVal ? this.endVal : this.printVal : this.printVal = this.printVal > this.endVal ? this.endVal : this.printVal, this.displayValue = this.formatNumber(this.printVal), i < this.localDuration ? this.rAF = s(this.count) : this.$emit("callback");
    },
    isNumber(t) {
      return !isNaN(parseFloat(t));
    },
    formatNumber(t) {
      t = t.toFixed(this.decimals), t += "";
      const i = t.split(".");
      let e = i[0];
      const a = i.length > 1 ? this.decimal + i[1] : "", r = /(\d+)(\d{3})/;
      if (this.separator && !this.isNumber(this.separator))
        for (; r.test(e); )
          e = e.replace(r, "$1" + this.separator + "$2");
      return this.prefix + e + a + this.suffix;
    }
  },
  destroyed() {
    l(this.rAF);
  }
};
function w(t, i, e, a, r, g) {
  return c(), d("span", null, p(r.displayValue), 1);
}
const n = /* @__PURE__ */ f(V, [["render", w]]);
n.install = (t) => {
  t.component(n.name, n);
};
const y = [
  n
], o = (t) => {
  o.installed || y.map((i) => {
    t.component(i.name, i);
  });
};
typeof window < "u" && window.Vue && o(window.Vue);
const S = {
  install: o,
  animationNumber: n
};
export {
  S as default
};
