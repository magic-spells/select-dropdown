(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SelectDropdown = {}));
})(this, (function (exports) { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "/* select dropdown color variables */\n:root {\n\t--select-color-text: #333;\n\t--select-color-background: #fff;\n\t--select-color-border: #ddd;\n\t--select-color-border-hover: #aaa;\n\t--select-color-border-dark: #666;\n\t--select-color-primary: #4299e1;\n\t--select-color-hover: #f0f0f0;\n\t--select-color-focus: #e6f7ff;\n\t--select-color-selected: #e6f7ff;\n\t--select-color-label: #999;\n}\n\nbody:has(select-dropdown[visible]) {\n\toverflow: hidden;\n}\n\n/* dropdown component styles */\nselect-dropdown {\n\tposition: relative;\n\twidth: 300px;\n\tmargin-bottom: 1rem;\n\tdisplay: block;\n\tfont-family:\n\t\t-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',\n\t\t'Helvetica Neue', sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5;\n\tcolor: var(--select-color-text);\n\tbox-sizing: border-box;\n}\n\nselect-dropdown * {\n\tbox-sizing: border-box;\n}\n\n/* trigger button styles */\nselect-trigger {\n\tdisplay: flex;\n\tjustify-content: space-between;\n\talign-items: center;\n\twidth: 100%;\n\tpadding: 0.75rem 1rem;\n\tbackground-color: var(--select-color-background);\n\tborder: 1px solid var(--select-color-border);\n\tborder-radius: 0.25rem;\n\tcursor: pointer;\n\ttransition:\n\t\tborder-color 0.2s,\n\t\tbox-shadow 0.2s;\n}\n\nselect-trigger:hover {\n\tborder-color: var(--select-color-border-hover);\n}\n\nselect-trigger:focus-visible {\n\toutline: 2px solid var(--select-color-primary);\n\toutline-offset: 2px;\n}\n\n/* caret icon */\n.select-icon {\n\tborder-style: solid;\n\tborder-width: 0.25rem 0.25rem 0;\n\tborder-color: var(--select-color-border-dark) transparent transparent;\n\tmargin-left: 0.75rem;\n\ttransition: transform 0.2s;\n}\n\n/* Flipped caret when expanded */\nselect-trigger[aria-expanded='true'] .select-icon {\n\ttransform: rotate(180deg);\n}\n\n/* options container — resting-hidden with visibility (the morph engine drives\n   the reveal; never stylesheet opacity/transform on a morph target) */\nselect-panel {\n\tposition: absolute;\n\tleft: 0;\n\twidth: 100%;\n\toverflow-y: auto;\n\tbackground-color: var(--select-color-background);\n\tborder: 1px solid var(--select-color-border);\n\tborder-radius: 0.25rem;\n\tbox-shadow:\n\t\t0 4px 12px rgba(0, 0, 0, 0.12),\n\t\t0 0 4px rgba(0, 0, 0, 0.08);\n\tz-index: 10;\n\tvisibility: hidden;\n}\n\n/* option items */\nselect-option {\n\tpadding: 0.75rem 1rem;\n\tcursor: pointer;\n\ttransition: background-color 0.2s;\n\tdisplay: block;\n}\n\nselect-option:hover {\n\tbackground-color: var(--select-color-hover);\n}\n\nselect-option:focus {\n\toutline: none;\n\tbackground-color: var(--select-color-focus);\n}\n\nselect-option[aria-selected='true'] {\n\tbackground-color: var(--select-color-selected);\n\tfont-weight: 500;\n}\n\n/* hidden input */\nselect-dropdown > input {\n\tdisplay: none;\n}\n\n/* divider between option groups */\nselect-divider {\n\tdisplay: block;\n\theight: 1px;\n\tmargin: 0.25rem 0;\n\tbackground-color: var(--select-color-border);\n}\n\n/* label for option groups */\nselect-label {\n\tdisplay: block;\n\tpadding: 0.25rem 1rem;\n\tfont-size: 0.75rem;\n\tfont-weight: 600;\n\ttext-transform: uppercase;\n\tletter-spacing: 0.05em;\n\tcolor: var(--select-color-label);\n\tcursor: default;\n\tuser-select: none;\n}\n";
  styleInject(css_248z);

  class f {
    #t;
    constructor() {
      this.#t = /* @__PURE__ */ new Map();
    }
    /**
     * Binds a listener to an event.
     * @param {string} event - The event to bind the listener to.
     * @param {Function} listener - The listener function to bind.
     * @returns {EventEmitter} The current instance for chaining.
     * @throws {TypeError} If the listener is not a function.
     */
    on(t, i) {
      if (typeof i != "function")
        throw new TypeError("Listener must be a function");
      const s = this.#t.get(t) || [];
      return s.includes(i) || s.push(i), this.#t.set(t, s), this;
    }
    /**
     * Unbinds a listener from an event.
     * @param {string} event - The event to unbind the listener from.
     * @param {Function} listener - The listener function to unbind.
     * @returns {EventEmitter} The current instance for chaining.
     */
    off(t, i) {
      const s = this.#t.get(t);
      if (!s) return this;
      const e = s.indexOf(i);
      return e !== -1 && (s.splice(e, 1), s.length === 0 ? this.#t.delete(t) : this.#t.set(t, s)), this;
    }
    /**
     * Triggers an event and calls all bound listeners.
     * @param {string} event - The event to trigger.
     * @param {...*} args - Arguments to pass to the listener functions.
     * @returns {boolean} True if the event had listeners, false otherwise.
     */
    emit(t, ...i) {
      const s = this.#t.get(t);
      if (!s || s.length === 0) return !1;
      const e = s.slice();
      for (let n = 0, r = e.length; n < r; ++n)
        try {
          e[n].apply(this, i);
        } catch (h) {
          console.error(`Error in listener for event '${t}':`, h);
        }
      return !0;
    }
    /**
     * Removes all listeners for a specific event or all events.
     * @param {string} [event] - The event to remove listeners from. If not provided, removes all listeners.
     * @returns {EventEmitter} The current instance for chaining.
     */
    removeAllListeners(t) {
      return t ? this.#t.delete(t) : this.#t.clear(), this;
    }
  }
  class b extends f {
    #t;
    #u;
    #o;
    #e;
    #s;
    #n;
    #r;
    #h;
    #i;
    /**
     * Creates an instance of PhysicsEngine.
     * @param {number} [attraction=0.026] - The attraction value for physics-based animation (0 < attraction < 1).
     * @param {number} [friction=0.28] - The friction value for physics-based animation (0 < friction < 1).
     */
    constructor({ attraction: t = 0.026, friction: i = 0.28 } = {}) {
      if (super(), !Number.isFinite(t) || t <= 0 || t >= 1)
        throw new Error("Attraction must be a number between 0 and 1 (exclusive).");
      if (!Number.isFinite(i) || i <= 0 || i >= 1)
        throw new Error("Friction must be a number between 0 and 1 (exclusive).");
      this.#t = t, this.#u = i, this.#o = 1 - i, this.#e = 0, this.#s = 0, this.#n = 0, this.isAnimating = !1, this.#r = null, this.#h = 0, this.#i = null;
    }
    /**
     * Animates from a start value to an end value.
     * @param {number} startValue - The starting value.
     * @param {number} endValue - The target value.
     * @param {number} [velocity=0] - Initial velocity.
     * @returns {Promise} Resolves when animation completes or is stopped.
     */
    animateTo(t, i, s = 0) {
      if (!Number.isFinite(t))
        throw new Error("startValue must be a finite number.");
      if (!Number.isFinite(i))
        throw new Error("endValue must be a finite number.");
      if (!Number.isFinite(s))
        throw new Error("velocity must be a finite number.");
      if (this.isAnimating && this.#m(), t === i && s === 0)
        return this.emit("change", { position: i, progress: 1 }), this.emit("complete", { position: i, progress: 1 }), Promise.resolve();
      this.#s = t, this.#n = i, this.#e = s, this.isAnimating = !0, this.#r = null;
      const e = ++this.#h;
      return new Promise((n) => {
        this.#i = n;
        const r = (h) => {
          if (e !== this.#h || !this.isAnimating) return;
          if (this.#r === null) {
            this.#r = h, requestAnimationFrame(r);
            return;
          }
          const o = Math.min(h - this.#r, 64) / 16.66;
          this.#r = h;
          const a = (this.#n - this.#s) * this.#t;
          this.#e += a * o, this.#e *= Math.pow(this.#o, o), this.#s += this.#e * o;
          const u = this.#n - t;
          let m = 0;
          if (u !== 0 && (m = (this.#s - t) / u), this.emit("change", { position: this.#s, progress: m }), Math.abs(this.#s - this.#n) < 0.01 && Math.abs(this.#e) < 0.01) {
            this.isAnimating = !1;
            const c = this.#i;
            this.#i = null, this.emit("change", { position: this.#n, progress: 1 }), this.emit("complete", { position: this.#n, progress: 1 }), c();
            return;
          }
          requestAnimationFrame(r);
        };
        requestAnimationFrame(r);
      });
    }
    /**
     * Internal stop — resolves Promise without emitting 'stop'.
     * Used when a new animateTo supersedes the current one.
     */
    #m() {
      this.isAnimating = !1, this.#i && (this.#i(), this.#i = null);
    }
    /**
     * Stops the ongoing animation.
     * Emits 'stop' event and resolves the pending Promise.
     */
    stop() {
      if (!this.isAnimating) return;
      this.isAnimating = !1, this.#h++;
      const t = this.#i;
      this.#i = null, this.emit("stop", { position: this.#s }), t && t();
    }
    /**
     * Gets the current velocity, in units per 16.66ms frame.
     * Same units animateTo() accepts, so it can be handed straight back in
     * to retarget an animation without losing momentum.
     * @returns {number} The current velocity.
     */
    getVelocity() {
      return this.#e;
    }
    /**
     * Sets the attraction value
     * @param {number} attraction - The attraction value for physics-based animation (0 < attraction < 1).
     */
    setAttraction(t) {
      if (!Number.isFinite(t) || t <= 0 || t >= 1)
        throw new Error("Attraction must be a number between 0 and 1 (exclusive).");
      this.#t = t;
    }
    /**
     * Sets the friction value
     * @param {number} friction - The friction value for physics-based animation (0 < friction < 1).
     */
    setFriction(t) {
      if (!Number.isFinite(t) || t <= 0 || t >= 1)
        throw new Error("Friction must be a number between 0 and 1 (exclusive).");
      this.#u = t, this.#o = 1 - t;
    }
  }

  //#region src/frame-engine.js
  var e = /* @__PURE__ */ new Set(/* @__PURE__ */ "display.position.float.clear.visibility.overflow.overflow-x.overflow-y.flex-direction.flex-wrap.justify-content.align-items.align-content.order.grid-template-columns.grid-template-rows.grid-template-areas.grid-auto-flow.z-index.table-layout.empty-cells.caption-side.list-style-type.list-style-position.pointer-events.user-select.box-sizing.resize.text-align.text-transform.white-space.word-break.word-wrap.font-style.font-variant.background-repeat.background-attachment.border-style.border-collapse.content.page-break-before.page-break-after.page-break-inside".split(".")), t = /* @__PURE__ */ new Set([
  	"transform",
  	"filter",
  	"backdrop-filter"
  ]), n = {
  	translateX: [{
  		value: 0,
  		unit: "px"
  	}],
  	translateY: [{
  		value: 0,
  		unit: "px"
  	}],
  	translateZ: [{
  		value: 0,
  		unit: "px"
  	}],
  	translate: [{
  		value: 0,
  		unit: "px"
  	}, {
  		value: 0,
  		unit: "px"
  	}],
  	translate3d: [
  		{
  			value: 0,
  			unit: "px"
  		},
  		{
  			value: 0,
  			unit: "px"
  		},
  		{
  			value: 0,
  			unit: "px"
  		}
  	],
  	scale: [{
  		value: 1,
  		unit: ""
  	}],
  	scaleX: [{
  		value: 1,
  		unit: ""
  	}],
  	scaleY: [{
  		value: 1,
  		unit: ""
  	}],
  	scaleZ: [{
  		value: 1,
  		unit: ""
  	}],
  	scale3d: [
  		{
  			value: 1,
  			unit: ""
  		},
  		{
  			value: 1,
  			unit: ""
  		},
  		{
  			value: 1,
  			unit: ""
  		}
  	],
  	rotate: [{
  		value: 0,
  		unit: "deg"
  	}],
  	rotateX: [{
  		value: 0,
  		unit: "deg"
  	}],
  	rotateY: [{
  		value: 0,
  		unit: "deg"
  	}],
  	rotateZ: [{
  		value: 0,
  		unit: "deg"
  	}],
  	rotate3d: [
  		{
  			value: 0,
  			unit: ""
  		},
  		{
  			value: 0,
  			unit: ""
  		},
  		{
  			value: 1,
  			unit: ""
  		},
  		{
  			value: 0,
  			unit: "deg"
  		}
  	],
  	skew: [{
  		value: 0,
  		unit: "deg"
  	}, {
  		value: 0,
  		unit: "deg"
  	}],
  	skewX: [{
  		value: 0,
  		unit: "deg"
  	}],
  	skewY: [{
  		value: 0,
  		unit: "deg"
  	}],
  	perspective: [{
  		value: 0,
  		unit: "px"
  	}],
  	blur: [{
  		value: 0,
  		unit: "px"
  	}],
  	brightness: [{
  		value: 1,
  		unit: ""
  	}],
  	contrast: [{
  		value: 1,
  		unit: ""
  	}],
  	grayscale: [{
  		value: 0,
  		unit: ""
  	}],
  	"hue-rotate": [{
  		value: 0,
  		unit: "deg"
  	}],
  	invert: [{
  		value: 0,
  		unit: ""
  	}],
  	opacity: [{
  		value: 1,
  		unit: ""
  	}],
  	saturate: [{
  		value: 1,
  		unit: ""
  	}],
  	sepia: [{
  		value: 0,
  		unit: ""
  	}],
  	"drop-shadow-1": [
  		{
  			value: 0,
  			unit: "px"
  		},
  		{
  			value: 0,
  			unit: "px"
  		},
  		{
  			value: 0,
  			unit: "px"
  		}
  	],
  	"drop-shadow-2": [
  		{
  			value: 0,
  			unit: "px"
  		},
  		{
  			value: 0,
  			unit: "px"
  		},
  		{
  			value: 0,
  			unit: "px"
  		}
  	]
  }, r = {
  	opacity: [0, 1],
  	blur: [0, Infinity],
  	brightness: [0, Infinity],
  	contrast: [0, Infinity],
  	grayscale: [0, 1],
  	invert: [0, 1],
  	sepia: [0, 1],
  	saturate: [0, Infinity]
  }, i = {
  	red: 0,
  	green: 0,
  	blue: 0,
  	alpha: 0
  }, a = !1;
  function o(e, t, n) {
  	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
  }
  var s = {
  	aliceblue: [
  		240,
  		248,
  		255,
  		1
  	],
  	antiquewhite: [
  		250,
  		235,
  		215,
  		1
  	],
  	aqua: [
  		0,
  		255,
  		255,
  		1
  	],
  	aquamarine: [
  		127,
  		255,
  		212,
  		1
  	],
  	azure: [
  		240,
  		255,
  		255,
  		1
  	],
  	beige: [
  		245,
  		245,
  		220,
  		1
  	],
  	bisque: [
  		255,
  		228,
  		196,
  		1
  	],
  	black: [
  		0,
  		0,
  		0,
  		1
  	],
  	blanchedalmond: [
  		255,
  		235,
  		205,
  		1
  	],
  	blue: [
  		0,
  		0,
  		255,
  		1
  	],
  	blueviolet: [
  		138,
  		43,
  		226,
  		1
  	],
  	brown: [
  		165,
  		42,
  		42,
  		1
  	],
  	burlywood: [
  		222,
  		184,
  		135,
  		1
  	],
  	cadetblue: [
  		95,
  		158,
  		160,
  		1
  	],
  	chartreuse: [
  		127,
  		255,
  		0,
  		1
  	],
  	chocolate: [
  		210,
  		105,
  		30,
  		1
  	],
  	coral: [
  		255,
  		127,
  		80,
  		1
  	],
  	cornflowerblue: [
  		100,
  		149,
  		237,
  		1
  	],
  	cornsilk: [
  		255,
  		248,
  		220,
  		1
  	],
  	crimson: [
  		220,
  		20,
  		60,
  		1
  	],
  	cyan: [
  		0,
  		255,
  		255,
  		1
  	],
  	darkblue: [
  		0,
  		0,
  		139,
  		1
  	],
  	darkcyan: [
  		0,
  		139,
  		139,
  		1
  	],
  	darkgoldenrod: [
  		184,
  		134,
  		11,
  		1
  	],
  	darkgray: [
  		169,
  		169,
  		169,
  		1
  	],
  	darkgreen: [
  		0,
  		100,
  		0,
  		1
  	],
  	darkgrey: [
  		169,
  		169,
  		169,
  		1
  	],
  	darkkhaki: [
  		189,
  		183,
  		107,
  		1
  	],
  	darkmagenta: [
  		139,
  		0,
  		139,
  		1
  	],
  	darkolivegreen: [
  		85,
  		107,
  		47,
  		1
  	],
  	darkorange: [
  		255,
  		140,
  		0,
  		1
  	],
  	darkorchid: [
  		153,
  		50,
  		204,
  		1
  	],
  	darkred: [
  		139,
  		0,
  		0,
  		1
  	],
  	darksalmon: [
  		233,
  		150,
  		122,
  		1
  	],
  	darkseagreen: [
  		143,
  		188,
  		143,
  		1
  	],
  	darkslateblue: [
  		72,
  		61,
  		139,
  		1
  	],
  	darkslategray: [
  		47,
  		79,
  		79,
  		1
  	],
  	darkslategrey: [
  		47,
  		79,
  		79,
  		1
  	],
  	darkturquoise: [
  		0,
  		206,
  		209,
  		1
  	],
  	darkviolet: [
  		148,
  		0,
  		211,
  		1
  	],
  	deeppink: [
  		255,
  		20,
  		147,
  		1
  	],
  	deepskyblue: [
  		0,
  		191,
  		255,
  		1
  	],
  	dimgray: [
  		105,
  		105,
  		105,
  		1
  	],
  	dimgrey: [
  		105,
  		105,
  		105,
  		1
  	],
  	dodgerblue: [
  		30,
  		144,
  		255,
  		1
  	],
  	firebrick: [
  		178,
  		34,
  		34,
  		1
  	],
  	floralwhite: [
  		255,
  		250,
  		240,
  		1
  	],
  	forestgreen: [
  		34,
  		139,
  		34,
  		1
  	],
  	fuchsia: [
  		255,
  		0,
  		255,
  		1
  	],
  	gainsboro: [
  		220,
  		220,
  		220,
  		1
  	],
  	ghostwhite: [
  		248,
  		248,
  		255,
  		1
  	],
  	gold: [
  		255,
  		215,
  		0,
  		1
  	],
  	goldenrod: [
  		218,
  		165,
  		32,
  		1
  	],
  	gray: [
  		128,
  		128,
  		128,
  		1
  	],
  	green: [
  		0,
  		128,
  		0,
  		1
  	],
  	greenyellow: [
  		173,
  		255,
  		47,
  		1
  	],
  	grey: [
  		128,
  		128,
  		128,
  		1
  	],
  	honeydew: [
  		240,
  		255,
  		240,
  		1
  	],
  	hotpink: [
  		255,
  		105,
  		180,
  		1
  	],
  	indianred: [
  		205,
  		92,
  		92,
  		1
  	],
  	indigo: [
  		75,
  		0,
  		130,
  		1
  	],
  	ivory: [
  		255,
  		255,
  		240,
  		1
  	],
  	khaki: [
  		240,
  		230,
  		140,
  		1
  	],
  	lavender: [
  		230,
  		230,
  		250,
  		1
  	],
  	lavenderblush: [
  		255,
  		240,
  		245,
  		1
  	],
  	lawngreen: [
  		124,
  		252,
  		0,
  		1
  	],
  	lemonchiffon: [
  		255,
  		250,
  		205,
  		1
  	],
  	lightblue: [
  		173,
  		216,
  		230,
  		1
  	],
  	lightcoral: [
  		240,
  		128,
  		128,
  		1
  	],
  	lightcyan: [
  		224,
  		255,
  		255,
  		1
  	],
  	lightgoldenrodyellow: [
  		250,
  		250,
  		210,
  		1
  	],
  	lightgray: [
  		211,
  		211,
  		211,
  		1
  	],
  	lightgreen: [
  		144,
  		238,
  		144,
  		1
  	],
  	lightgrey: [
  		211,
  		211,
  		211,
  		1
  	],
  	lightpink: [
  		255,
  		182,
  		193,
  		1
  	],
  	lightsalmon: [
  		255,
  		160,
  		122,
  		1
  	],
  	lightseagreen: [
  		32,
  		178,
  		170,
  		1
  	],
  	lightskyblue: [
  		135,
  		206,
  		250,
  		1
  	],
  	lightslategray: [
  		119,
  		136,
  		153,
  		1
  	],
  	lightslategrey: [
  		119,
  		136,
  		153,
  		1
  	],
  	lightsteelblue: [
  		176,
  		196,
  		222,
  		1
  	],
  	lightyellow: [
  		255,
  		255,
  		224,
  		1
  	],
  	lime: [
  		0,
  		255,
  		0,
  		1
  	],
  	limegreen: [
  		50,
  		205,
  		50,
  		1
  	],
  	linen: [
  		250,
  		240,
  		230,
  		1
  	],
  	magenta: [
  		255,
  		0,
  		255,
  		1
  	],
  	maroon: [
  		128,
  		0,
  		0,
  		1
  	],
  	mediumaquamarine: [
  		102,
  		205,
  		170,
  		1
  	],
  	mediumblue: [
  		0,
  		0,
  		205,
  		1
  	],
  	mediumorchid: [
  		186,
  		85,
  		211,
  		1
  	],
  	mediumpurple: [
  		147,
  		112,
  		219,
  		1
  	],
  	mediumseagreen: [
  		60,
  		179,
  		113,
  		1
  	],
  	mediumslateblue: [
  		123,
  		104,
  		238,
  		1
  	],
  	mediumspringgreen: [
  		0,
  		250,
  		154,
  		1
  	],
  	mediumturquoise: [
  		72,
  		209,
  		204,
  		1
  	],
  	mediumvioletred: [
  		199,
  		21,
  		133,
  		1
  	],
  	midnightblue: [
  		25,
  		25,
  		112,
  		1
  	],
  	mintcream: [
  		245,
  		255,
  		250,
  		1
  	],
  	mistyrose: [
  		255,
  		228,
  		225,
  		1
  	],
  	moccasin: [
  		255,
  		228,
  		181,
  		1
  	],
  	navajowhite: [
  		255,
  		222,
  		173,
  		1
  	],
  	navy: [
  		0,
  		0,
  		128,
  		1
  	],
  	oldlace: [
  		253,
  		245,
  		230,
  		1
  	],
  	olive: [
  		128,
  		128,
  		0,
  		1
  	],
  	olivedrab: [
  		107,
  		142,
  		35,
  		1
  	],
  	orange: [
  		255,
  		165,
  		0,
  		1
  	],
  	orangered: [
  		255,
  		69,
  		0,
  		1
  	],
  	orchid: [
  		218,
  		112,
  		214,
  		1
  	],
  	palegoldenrod: [
  		238,
  		232,
  		170,
  		1
  	],
  	palegreen: [
  		152,
  		251,
  		152,
  		1
  	],
  	paleturquoise: [
  		175,
  		238,
  		238,
  		1
  	],
  	palevioletred: [
  		219,
  		112,
  		147,
  		1
  	],
  	papayawhip: [
  		255,
  		239,
  		213,
  		1
  	],
  	peachpuff: [
  		255,
  		218,
  		185,
  		1
  	],
  	peru: [
  		205,
  		133,
  		63,
  		1
  	],
  	pink: [
  		255,
  		192,
  		203,
  		1
  	],
  	plum: [
  		221,
  		160,
  		221,
  		1
  	],
  	powderblue: [
  		176,
  		224,
  		230,
  		1
  	],
  	purple: [
  		128,
  		0,
  		128,
  		1
  	],
  	rebeccapurple: [
  		102,
  		51,
  		153,
  		1
  	],
  	red: [
  		255,
  		0,
  		0,
  		1
  	],
  	rosybrown: [
  		188,
  		143,
  		143,
  		1
  	],
  	royalblue: [
  		65,
  		105,
  		225,
  		1
  	],
  	saddlebrown: [
  		139,
  		69,
  		19,
  		1
  	],
  	salmon: [
  		250,
  		128,
  		114,
  		1
  	],
  	sandybrown: [
  		244,
  		164,
  		96,
  		1
  	],
  	seagreen: [
  		46,
  		139,
  		87,
  		1
  	],
  	seashell: [
  		255,
  		245,
  		238,
  		1
  	],
  	sienna: [
  		160,
  		82,
  		45,
  		1
  	],
  	silver: [
  		192,
  		192,
  		192,
  		1
  	],
  	skyblue: [
  		135,
  		206,
  		235,
  		1
  	],
  	slateblue: [
  		106,
  		90,
  		205,
  		1
  	],
  	slategray: [
  		112,
  		128,
  		144,
  		1
  	],
  	slategrey: [
  		112,
  		128,
  		144,
  		1
  	],
  	snow: [
  		255,
  		250,
  		250,
  		1
  	],
  	springgreen: [
  		0,
  		255,
  		127,
  		1
  	],
  	steelblue: [
  		70,
  		130,
  		180,
  		1
  	],
  	tan: [
  		210,
  		180,
  		140,
  		1
  	],
  	teal: [
  		0,
  		128,
  		128,
  		1
  	],
  	thistle: [
  		216,
  		191,
  		216,
  		1
  	],
  	tomato: [
  		255,
  		99,
  		71,
  		1
  	],
  	turquoise: [
  		64,
  		224,
  		208,
  		1
  	],
  	violet: [
  		238,
  		130,
  		238,
  		1
  	],
  	wheat: [
  		245,
  		222,
  		179,
  		1
  	],
  	white: [
  		255,
  		255,
  		255,
  		1
  	],
  	whitesmoke: [
  		245,
  		245,
  		245,
  		1
  	],
  	yellow: [
  		255,
  		255,
  		0,
  		1
  	],
  	yellowgreen: [
  		154,
  		205,
  		50,
  		1
  	],
  	transparent: [
  		0,
  		0,
  		0,
  		0
  	]
  }, c = class {
  	constructor(e) {
  		this.setKeyframes(e);
  	}
  	setKeyframes(e) {
  		this.keyframes = Object.keys(e).map(Number).sort((e, t) => e - t).map((t) => ({
  			percent: t,
  			values: this.flatten(e[t])
  		}));
  		let r = {};
  		for (let e of t) r[e] = /* @__PURE__ */ new Set();
  		for (let e of this.keyframes) for (let n in e.values) {
  			let e = n.indexOf(":");
  			if (e === -1) continue;
  			let i = n.substring(0, e), a = n.substring(e + 1);
  			a !== "__order" && t.has(i) && r[i].add(a);
  		}
  		for (let e of t) {
  			if (r[e].size === 0) continue;
  			let t = `${e}:__order`;
  			for (let a of this.keyframes) {
  				if (!(t in a.values)) {
  					a.values[t] = {
  						discrete: !0,
  						value: [...r[e]]
  					};
  					for (let t of r[e]) {
  						let r = `${e}:${t}`, o = n[t] || [{
  							value: 0,
  							unit: ""
  						}];
  						a.values[r] = { args: o.map((e) => ({ ...e })) }, t.startsWith("drop-shadow-") && (a.values[r].color = { ...i });
  					}
  					continue;
  				}
  				for (let o of r[e]) {
  					let r = `${e}:${o}`;
  					if (!(r in a.values)) {
  						let e = n[o] || [{
  							value: 0,
  							unit: ""
  						}];
  						a.values[r] = { args: e.map((e) => ({ ...e })) }, o.startsWith("drop-shadow-") && (a.values[r].color = { ...i }), a.values[t].value.includes(o) || a.values[t].value.push(o);
  					}
  				}
  			}
  		}
  		this._allKeys = /* @__PURE__ */ new Set();
  		for (let e of this.keyframes) for (let t in e.values) t.endsWith(":__order") || this._allKeys.add(t);
  		this._keyFrames = {};
  		for (let e of this._allKeys) this._keyFrames[e] = this.keyframes.filter((t) => e in t.values);
  		this._orders = {};
  		for (let e of t) {
  			let t = `${e}:__order`, n = this.keyframes.filter((e) => t in e.values);
  			if (n.length === 0) continue;
  			let r = /* @__PURE__ */ new Set(), i = [];
  			for (let e of n) for (let n of e.values[t].value) r.has(n) || (r.add(n), i.push(n));
  			this._orders[e] = i;
  		}
  	}
  	flatten(n) {
  		let r = {};
  		for (let i in n) t.has(i) ? Object.assign(r, this.flattenFunctions(i, n[i])) : this.isColor(n[i]) ? r[i] = this.parseColor(n[i]) || {
  			discrete: !0,
  			value: n[i]
  		} : e.has(i) ? r[i] = {
  			discrete: !0,
  			value: n[i]
  		} : r[i] = this.parseValue(n[i]) || {
  			discrete: !0,
  			value: n[i]
  		};
  		return r;
  	}
  	flattenFunctions(e, t) {
  		let n = {}, r = [], i = {};
  		for (let { name: o, args: s, color: c } of this.parseFunctions(t)) {
  			let t = o;
  			if (o === "drop-shadow") {
  				if (i[o] = (i[o] || 0) + 1, i[o] > 2) {
  					a || (a = !0, console.warn("FrameEngine: Only the first 2 drop-shadow functions per keyframe are interpolated. Additional drop-shadows are ignored."));
  					continue;
  				}
  				t = `${o}-${i[o]}`;
  			}
  			let l = { args: s };
  			c && (l.color = c), n[`${e}:${t}`] = l, r.push(t);
  		}
  		return n[`${e}:__order`] = {
  			discrete: !0,
  			value: r
  		}, n;
  	}
  	parseFunctions(e) {
  		let t = [], n = 0, r = e.length;
  		for (; n < r;) {
  			for (; n < r && /\s/.test(e[n]);) n++;
  			if (n >= r) break;
  			let i = "";
  			for (; n < r && /[\w-]/.test(e[n]);) i += e[n], n++;
  			if (!i || n >= r || e[n] !== "(") continue;
  			n++;
  			let a = 1, o = "";
  			for (; n < r && a > 0;) {
  				if (e[n] === "(") a++;
  				else if (e[n] === ")" && (a--, a === 0)) {
  					n++;
  					break;
  				}
  				o += e[n], n++;
  			}
  			if (i === "drop-shadow") {
  				let e = this.splitArgs(o), n = [], r = null;
  				for (let t of e) if (this.isColor(t)) {
  					let e = this.parseColor(t);
  					e && (r = e);
  				} else {
  					let e = t.match(/^(-?\d*\.?\d+)(\D*)$/);
  					n.push(e ? {
  						value: parseFloat(e[1]),
  						unit: e[2]
  					} : {
  						value: 0,
  						unit: ""
  					});
  				}
  				t.push({
  					name: i,
  					args: n,
  					color: r
  				});
  			} else {
  				let e = o.split(/\s*,\s*|\s+/).map((e) => {
  					let t = e.match(/^(-?\d*\.?\d+)(\D*)$/);
  					return t ? {
  						value: parseFloat(t[1]),
  						unit: t[2]
  					} : {
  						value: 0,
  						unit: ""
  					};
  				});
  				t.push({
  					name: i,
  					args: e
  				});
  			}
  		}
  		return t;
  	}
  	splitArgs(e) {
  		let t = [], n = "", r = 0;
  		for (let i = 0; i < e.length; i++) {
  			let a = e[i];
  			a === "(" ? r++ : a === ")" && r--, r === 0 && (a === " " || a === ",") ? (n.trim() && t.push(n.trim()), n = "") : n += a;
  		}
  		return n.trim() && t.push(n.trim()), t;
  	}
  	parseValue(e) {
  		if (typeof e == "number") return {
  			value: e,
  			unit: ""
  		};
  		let t = String(e).match(/^(-?\d*\.?\d+)(\D*)$/);
  		return t ? {
  			value: parseFloat(t[1]),
  			unit: t[2]
  		} : null;
  	}
  	parseColor(e) {
  		let t = this.colorToRGBA(e);
  		if (!t) return null;
  		let [n, r, i, a] = t;
  		return {
  			red: n,
  			green: r,
  			blue: i,
  			alpha: a
  		};
  	}
  	colorToRGBA(e) {
  		if (typeof e != "string") return null;
  		let t = s[e.toLowerCase()];
  		if (t) return t;
  		let n = e.match(/^color\(\s*srgb\s+([+-]?(?:\d*\.?\d+)(?:e[+-]?\d+)?)\s+([+-]?(?:\d*\.?\d+)(?:e[+-]?\d+)?)\s+([+-]?(?:\d*\.?\d+)(?:e[+-]?\d+)?)(?:\s*\/\s*([+-]?(?:\d*\.?\d+)(?:e[+-]?\d+)?)(%)?)?\s*\)$/i);
  		if (n) {
  			let e = n[4] === void 0 ? 1 : parseFloat(n[4]) / (n[5] ? 100 : 1);
  			return [
  				parseFloat(n[1]) * 255,
  				parseFloat(n[2]) * 255,
  				parseFloat(n[3]) * 255,
  				e
  			];
  		}
  		if (/^#[0-9A-Fa-f]{3}$/.test(e)) return [
  			parseInt(e[1] + e[1], 16),
  			parseInt(e[2] + e[2], 16),
  			parseInt(e[3] + e[3], 16),
  			1
  		];
  		if (/^#[0-9A-Fa-f]{4}$/.test(e)) return [
  			parseInt(e[1] + e[1], 16),
  			parseInt(e[2] + e[2], 16),
  			parseInt(e[3] + e[3], 16),
  			parseInt(e[4] + e[4], 16) / 255
  		];
  		if (/^#[0-9A-Fa-f]{6}$/.test(e)) return [
  			parseInt(e.slice(1, 3), 16),
  			parseInt(e.slice(3, 5), 16),
  			parseInt(e.slice(5, 7), 16),
  			1
  		];
  		if (/^#[0-9A-Fa-f]{8}$/.test(e)) return [
  			parseInt(e.slice(1, 3), 16),
  			parseInt(e.slice(3, 5), 16),
  			parseInt(e.slice(5, 7), 16),
  			parseInt(e.slice(7, 9), 16) / 255
  		];
  		let r = e.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
  		if (r) return [
  			parseInt(r[1], 10),
  			parseInt(r[2], 10),
  			parseInt(r[3], 10),
  			r[4] === void 0 ? 1 : parseFloat(r[4])
  		];
  		let i = e.match(/^rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)\s*(?:\/\s*([\d.]+)\s*)?\)$/);
  		if (i) return [
  			parseInt(i[1], 10),
  			parseInt(i[2], 10),
  			parseInt(i[3], 10),
  			i[4] === void 0 ? 1 : parseFloat(i[4])
  		];
  		let a = e.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)$/);
  		if (a) return this._hslToRgba(parseFloat(a[1]), parseFloat(a[2]), parseFloat(a[3]), a[4] === void 0 ? 1 : parseFloat(a[4]));
  		let o = e.match(/^hsla?\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*(?:\/\s*([\d.]+)\s*)?\)$/);
  		return o ? this._hslToRgba(parseFloat(o[1]), parseFloat(o[2]), parseFloat(o[3]), o[4] === void 0 ? 1 : parseFloat(o[4])) : null;
  	}
  	_hslToRgba(e, t, n, r) {
  		let i = e / 360, a = t / 100, s = n / 100;
  		if (a === 0) {
  			let e = Math.round(s * 255);
  			return [
  				e,
  				e,
  				e,
  				r
  			];
  		}
  		let c = s < .5 ? s * (1 + a) : s + a - s * a, l = 2 * s - c;
  		return [
  			Math.round(o(l, c, i + 1 / 3) * 255),
  			Math.round(o(l, c, i) * 255),
  			Math.round(o(l, c, i - 1 / 3) * 255),
  			r
  		];
  	}
  	isColor(e) {
  		return typeof e == "string" ? /^(#[0-9A-Fa-f]{3}$|#[0-9A-Fa-f]{4}$|#[0-9A-Fa-f]{6}$|#[0-9A-Fa-f]{8}$|rgba?\s*\(|hsla?\s*\()/.test(e) || /^color\(\s*srgb\s/i.test(e) ? !0 : e.toLowerCase() in s : !1;
  	}
  	lerp(e, t, n) {
  		return e + (t - e) * n;
  	}
  	lerpColor(e, t, n) {
  		let r = (e, t, n) => Math.min(n, Math.max(t, e));
  		return {
  			red: Math.round(r(this.lerp(e.red, t.red, n), 0, 255)),
  			green: Math.round(r(this.lerp(e.green, t.green, n), 0, 255)),
  			blue: Math.round(r(this.lerp(e.blue, t.blue, n), 0, 255)),
  			alpha: parseFloat(r(this.lerp(e.alpha, t.alpha, n), 0, 1).toFixed(4))
  		};
  	}
  	format(e) {
  		return parseFloat(e.toFixed(4)).toString();
  	}
  	findFramesAndFactor(e, t) {
  		if (e.length === 0) return null;
  		if (e.length === 1) return {
  			from: e[0],
  			to: e[0],
  			factor: 0
  		};
  		let n = e[0], r = e[e.length - 1];
  		if (t <= n.percent) {
  			let r = e[1].percent - n.percent;
  			return {
  				from: n,
  				to: e[1],
  				factor: r === 0 ? 1 : (t - n.percent) / r
  			};
  		}
  		if (t >= r.percent) {
  			let n = e[e.length - 2], i = r.percent - n.percent;
  			return {
  				from: n,
  				to: r,
  				factor: i === 0 ? 1 : (t - n.percent) / i
  			};
  		}
  		for (let n = 0; n < e.length - 1; n++) if (t >= e[n].percent && t <= e[n + 1].percent) {
  			let r = e[n + 1].percent - e[n].percent;
  			return {
  				from: e[n],
  				to: e[n + 1],
  				factor: r === 0 ? 1 : (t - e[n].percent) / r
  			};
  		}
  		return {
  			from: r,
  			to: r,
  			factor: 0
  		};
  	}
  	getDiscrete(e, t) {
  		let n = this._keyFrames[e] || this.keyframes.filter((t) => e in t.values);
  		if (n.length === 0) return null;
  		let r = n[0];
  		for (let e of n) if (e.percent <= t) r = e;
  		else break;
  		return r.values[e].value;
  	}
  	getDefault(e) {
  		let t = e.split(":")[1];
  		return t && n[t] ? n[t] : [{
  			value: 0,
  			unit: ""
  		}];
  	}
  	getFrame(e) {
  		let t = e * 100, n = this._allKeys, a = {};
  		for (let e of n) {
  			let n = this._keyFrames[e];
  			if (!n || n.length === 0) continue;
  			let o = n[0].values[e];
  			if (o && o.discrete) {
  				a[e] = this.getDiscrete(e, t);
  				continue;
  			}
  			let { from: s, to: c, factor: l } = this.findFramesAndFactor(n, t), u = s.values[e], d = c.values[e];
  			if (u && "red" in u) {
  				a[e] = this.lerpColor(u, d, l);
  				continue;
  			}
  			if (u && u.args) {
  				let t = d.args || this.getDefault(e), n = this.getDefault(e), o = Math.max(u.args.length, t.length), s = [];
  				for (let e = 0; e < o; e++) {
  					let r = u.args[e] || n[e] || {
  						value: 0,
  						unit: ""
  					}, i = t[e] || n[e] || {
  						value: 0,
  						unit: ""
  					};
  					s.push({
  						value: this.lerp(r.value, i.value, l),
  						unit: r.unit || i.unit
  					});
  				}
  				let c = r[e.includes(":") ? e.substring(e.indexOf(":") + 1) : e];
  				if (c) for (let e of s) e.value = Math.min(c[1], Math.max(c[0], e.value));
  				let f = { args: s };
  				(u.color || d.color) && (f.color = this.lerpColor(u.color || i, d.color || i, l)), a[e] = f;
  				continue;
  			}
  			if (u && "value" in u) {
  				let t = d || this.getDefault(e)[0], n = this.lerp(u.value, t.value, l), i = r[e];
  				i && (n = Math.min(i[1], Math.max(i[0], n))), a[e] = {
  					value: n,
  					unit: u.unit
  				};
  			}
  		}
  		return this.toStyles(a);
  	}
  	toStyles(e) {
  		let n = {}, r = {};
  		for (let i in e) {
  			let a = e[i], o = i.indexOf(":");
  			if (o !== -1) {
  				let e = i.substring(0, o), n = i.substring(o + 1);
  				if (t.has(e)) {
  					if (r[e] || (r[e] = {}), a.args) if (n.startsWith("drop-shadow-")) {
  						let t = n.replace(/-\d+$/, ""), i = a.args.map((e) => `${this.format(e.value)}${e.unit}`).join(" ");
  						if (a.color) {
  							let o = a.color, s = o.alpha < 1 ? `rgba(${o.red},${o.green},${o.blue},${o.alpha})` : `rgb(${o.red},${o.green},${o.blue})`;
  							r[e][n] = `${t}(${i} ${s})`;
  						} else r[e][n] = `${t}(${i})`;
  					} else r[e][n] = `${n}(${a.args.map((e) => `${this.format(e.value)}${e.unit}`).join(", ")})`;
  					else r[e][n] = `${n}(${this.format(a.value)}${a.unit})`;
  					continue;
  				}
  			}
  			if (typeof a == "string" || typeof a == "number") {
  				n[i] = a;
  				continue;
  			}
  			if (a && "red" in a) {
  				n[i] = a.alpha < 1 ? `rgba(${a.red},${a.green},${a.blue},${a.alpha})` : `rgb(${a.red},${a.green},${a.blue})`;
  				continue;
  			}
  			if (a && "value" in a) {
  				n[i] = `${this.format(a.value)}${a.unit}`;
  				continue;
  			}
  			n[i] = a;
  		}
  		for (let e in r) {
  			let t = r[e], i = (this._orders[e] || Object.keys(t)).filter((e) => t[e]).map((e) => t[e]);
  			i.length > 0 && (n[e] = i.join(" "));
  		}
  		return n;
  	}
  };

  class EventEmitter {
  	#events;

  	constructor() {
  		this.#events = new Map();
  	}

  	/**
  	 * Binds a listener to an event.
  	 * @param {string} event - The event to bind the listener to.
  	 * @param {Function} listener - The listener function to bind.
  	 * @returns {EventEmitter} The current instance for chaining.
  	 * @throws {TypeError} If the listener is not a function.
  	 */
  	on(event, listener) {
  		if (typeof listener !== 'function') {
  			throw new TypeError('Listener must be a function');
  		}

  		const listeners = this.#events.get(event) || [];
  		if (!listeners.includes(listener)) {
  			listeners.push(listener);
  		}
  		this.#events.set(event, listeners);

  		return this;
  	}

  	/**
  	 * Unbinds a listener from an event.
  	 * @param {string} event - The event to unbind the listener from.
  	 * @param {Function} listener - The listener function to unbind.
  	 * @returns {EventEmitter} The current instance for chaining.
  	 */
  	off(event, listener) {
  		const listeners = this.#events.get(event);
  		if (!listeners) return this;

  		const index = listeners.indexOf(listener);
  		if (index !== -1) {
  			listeners.splice(index, 1);
  			if (listeners.length === 0) {
  				this.#events.delete(event);
  			} else {
  				this.#events.set(event, listeners);
  			}
  		}

  		return this;
  	}

  	/**
  	 * Triggers an event and calls all bound listeners.
  	 * @param {string} event - The event to trigger.
  	 * @param {...*} args - Arguments to pass to the listener functions.
  	 * @returns {boolean} True if the event had listeners, false otherwise.
  	 */
  	emit(event, ...args) {
  		const listeners = this.#events.get(event);
  		if (!listeners || listeners.length === 0) return false;

  		const snapshot = listeners.slice();
  		for (let i = 0, n = snapshot.length; i < n; ++i) {
  			try {
  				snapshot[i].apply(this, args);
  			} catch (error) {
  				console.error(`Error in listener for event '${event}':`, error);
  			}
  		}

  		return true;
  	}

  	/**
  	 * Removes all listeners for a specific event or all events.
  	 * @param {string} [event] - The event to remove listeners from. If not provided, removes all listeners.
  	 * @returns {EventEmitter} The current instance for chaining.
  	 */
  	removeAllListeners(event) {
  		if (event) {
  			this.#events.delete(event);
  		} else {
  			this.#events.clear();
  		}
  		return this;
  	}
  }

  var EventEmitter$1 = EventEmitter;

  // Spring travel distance recommended by physics-engine. All choreography is driven
  // off p = position / TRAVEL — never the change event's own `progress` field, which
  // is relative to each animateTo()'s endpoints and resets on a mid-flight retarget.
  const TRAVEL = 1000;

  // Finalize a morph once motion is sub-pixel for two consecutive frames instead of
  // waiting for physics-engine's own 'complete' (|pos−end| < 1e-2 AND |vel| < 1e-2),
  // which trails ~0.5s of visually dead settle. Units are TRAVEL (1000): a position
  // within 1 of the end is sub-pixel for realistic on-screen travels, and a per-frame
  // delta under 0.5 means the spring is no longer visibly moving.
  const SETTLE_POSITION_EPSILON = 1;
  const SETTLE_DELTA_EPSILON = 0.5;

  // Longhands only — frame-engine snaps multi-value shorthands (border, borderRadius,
  // boxShadow) discretely instead of interpolating them.
  const DEFAULT_STYLE_PROPERTIES = [
  	'backgroundColor',
  	'borderTopLeftRadius',
  	'borderTopRightRadius',
  	'borderBottomRightRadius',
  	'borderBottomLeftRadius',
  	'borderTopWidth',
  	'borderRightWidth',
  	'borderBottomWidth',
  	'borderLeftWidth',
  	'borderTopColor',
  	'borderRightColor',
  	'borderBottomColor',
  	'borderLeftColor',
  ];

  const BORDER_SIDES = ['Top', 'Right', 'Bottom', 'Left'];

  // frame-engine extrapolates past the end keyframes during spring overshoot and has
  // no clamp for these — a negative value is invalid CSS and would stall a frame.
  const CLAMP_POSITIVE = [
  	'width',
  	'height',
  	'borderTopLeftRadius',
  	'borderTopRightRadius',
  	'borderBottomRightRadius',
  	'borderBottomLeftRadius',
  	'borderTopWidth',
  	'borderRightWidth',
  	'borderBottomWidth',
  	'borderLeftWidth',
  ];

  // Every inline style the engine may write on the real elements — captured once per
  // show → hide lifecycle and restored when the morph fully unwinds.
  const MANAGED_PROPERTIES = [
  	'visibility',
  	'display',
  	'opacity',
  	'transform',
  	'transformOrigin',
  	'willChange',
  	'transition',
  ];

  let scrollLockCount = 0;
  let savedBodyOverflow = '';

  /** Acquires one share of the module-level body scroll lock. */
  function acquireScrollLock() {
  	if (scrollLockCount++ === 0) {
  		savedBodyOverflow = document.body.style.overflow;
  		document.body.style.overflow = 'hidden';
  	}
  }

  /** Releases one share of the module-level body scroll lock. */
  function releaseScrollLock() {
  	if (scrollLockCount === 0) return;
  	if (--scrollLockCount === 0) {
  		document.body.style.overflow = savedBodyOverflow;
  		savedBodyOverflow = '';
  	}
  }

  const CLONE_FIT_VALUES = ['freeze', 'scale', 'reflow'];
  const HANDOFF_VALUES = ['fade', 'hard'];

  // A hard handoff's switch point is pinned strictly inside (0, 1): its two sparse
  // opacity keys are switch*100 and switch*100 + 0.01, and both must stay clear of
  // the 0 and 100 geometry keyframes.
  const HARD_SWITCH_MIN = 0.0001;
  const HARD_SWITCH_MAX = 0.9998;

  // A reflow clone latches to the destination layout once both blob sides are within this
  // fraction of the destination's, so fixed-size content can't pop at the switch.
  const REFLOW_LATCH_ENTER = 0.02;
  // Hysteresis — it only unlatches back to per-frame layout past this, so it can't flap.
  const REFLOW_LATCH_EXIT = 0.04;

  /**
   * Falls back to a default for an unrecognized enum value, warning once per run so
   * a typo surfaces instead of silently animating with the default choreography.
   * @param {string} key - Option name, for the warning
   * @param {*} value - Resolved value
   * @param {string[]} allowed - Accepted values
   * @param {string} fallback - Value used when `value` is not accepted
   * @returns {string} `value` when accepted, else `fallback`
   */
  function coerceEnum(key, value, allowed, fallback) {
  	if (allowed.includes(value)) return value;
  	const quoted = allowed.map((v) => `"${v}"`);
  	const expected =
  		quoted.length > 1
  			? `${quoted.slice(0, -1).join(', ')} or ${quoted[quoted.length - 1]}`
  			: quoted[0];
  	console.warn(
  		`MorphEngine: unknown ${key} "${value}" — falling back to "${fallback}" (expected ${expected}).`
  	);
  	return fallback;
  }

  /** Total border widths from a computed or per-frame styles object; a missing side counts as 0. */
  function borderInsets(styles) {
  	return {
  		x: (parseFloat(styles.borderLeftWidth) || 0) + (parseFloat(styles.borderRightWidth) || 0),
  		y: (parseFloat(styles.borderTopWidth) || 0) + (parseFloat(styles.borderBottomWidth) || 0),
  	};
  }

  function clamp(value, min, max) {
  	return Math.min(max, Math.max(min, value));
  }

  function round(value) {
  	return Math.round(value * 100) / 100;
  }

  const COLOR_PATTERN = /rgba?\([^)]*\)/;

  /**
   * Parses a computed rgb()/rgba() color string into channels.
   * Computed styles always serialize sRGB colors this way.
   * @param {string} colorString
   * @returns {{red: number, green: number, blue: number, alpha: number}}
   */
  function parseColor(colorString) {
  	const match = colorString.match(/rgba?\(([^)]*)\)/);
  	if (!match) return { red: 0, green: 0, blue: 0, alpha: 1 };
  	const parts = match[1].split(',').map((part) => parseFloat(part));
  	return {
  		red: parts[0] || 0,
  		green: parts[1] || 0,
  		blue: parts[2] || 0,
  		alpha: parts.length > 3 ? parts[3] : 1,
  	};
  }

  /**
   * Parses a computed box-shadow into its first shadow's parts.
   * Handles both serialization orders (color-first and color-last).
   * @param {string} computedShadow - Value from getComputedStyle().boxShadow
   * @returns {{x: number, y: number, blur: number, spread: number, color: Object}|null}
   */
  function parseShadow(computedShadow) {
  	if (!computedShadow || computedShadow === 'none') return null;

  	// first shadow only — split on the first comma outside parens
  	let first = computedShadow;
  	let depth = 0;
  	for (let i = 0; i < computedShadow.length; i++) {
  		const character = computedShadow[i];
  		if (character === '(') depth++;
  		else if (character === ')') depth--;
  		else if (character === ',' && depth === 0) {
  			first = computedShadow.slice(0, i);
  			break;
  		}
  	}

  	const colorMatch = first.match(COLOR_PATTERN);
  	const color = parseColor(colorMatch ? colorMatch[0] : 'rgba(0, 0, 0, 1)');
  	const lengths = first
  		.replace(COLOR_PATTERN, '')
  		.trim()
  		.split(/\s+/)
  		.filter((token) => token !== 'inset' && token !== '')
  		.map(parseFloat);
  	const [x = 0, y = 0, blur = 0, spread = 0] = lengths;

  	return { x, y, blur, spread, color };
  }

  /**
   * Interpolates two parsed shadows at raw p (extrapolates during overshoot,
   * so the shadow bounces with the geometry). A missing end fades through the
   * other end's color at alpha 0 to avoid a hue lurch through transparent black.
   * @param {Object|null} fromShadow
   * @param {Object|null} toShadow
   * @param {number} p
   * @returns {string} A CSS box-shadow value
   */
  function lerpShadow(fromShadow, toShadow, p) {
  	if (!fromShadow && !toShadow) return 'none';

  	const zeroed = (other) => ({
  		x: 0,
  		y: 0,
  		blur: 0,
  		spread: 0,
  		color: { ...other.color, alpha: 0 },
  	});
  	const start = fromShadow || zeroed(toShadow);
  	const end = toShadow || zeroed(fromShadow);
  	const lerp = (a, b) => a + (b - a) * p;

  	const x = round(lerp(start.x, end.x));
  	const y = round(lerp(start.y, end.y));
  	const blur = round(Math.max(0, lerp(start.blur, end.blur)));
  	const spread = round(lerp(start.spread, end.spread));
  	const red = Math.round(clamp(lerp(start.color.red, end.color.red), 0, 255));
  	const green = Math.round(clamp(lerp(start.color.green, end.color.green), 0, 255));
  	const blue = Math.round(clamp(lerp(start.color.blue, end.color.blue), 0, 255));
  	const alpha = round(clamp(lerp(start.color.alpha, end.color.alpha), 0, 1));

  	return `${x}px ${y}px ${blur}px ${spread}px rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  /**
   * Shared-element morph engine. A fixed-position blob springs from a source
   * element's rect and styles to a target element's, dissolving the source's
   * content on the way out and revealing the target — mirrored to the blob's
   * geometry so it inherits the spring's settle bounce — on the way in.
   *
   * show() morphs source → target; hide() morphs back. Calling either mid-flight
   * reverses the spring in place. Emits: show, hide, change, shown, hidden, stop,
   * complete.
   */
  class MorphEngine extends EventEmitter$1 {
  	#spring;
  	#attraction;
  	#friction;
  	#frames = null;
  	#blob = null;
  	#cloneWrapper = null;

  	#styleProperties;

  	#state = 'idle';
  	#p = 0;
  	#resolveRun = null;
  	#pendingComplete = null;

  	// logical pair for the current show → hide lifecycle
  	#sourceElement = null;
  	#targetElement = null;
  	// a source stop() was asked to leave hidden — see restoreSource()
  	#heldSource = null;
  	#displayOverride = null;
  	#savedInline = new Map();
  	#holdsScrollLock = false;

  	// current keyframe mapping (roles swap between show and hide)
  	#fromMeasure = null;
  	#toMeasure = null;
  	#toElement = null;
  	#shownPosition = TRAVEL; // spring position where the target is fully shown
  	#revealed = false;
  	#revealStart = 0.75; // p where the target fade-in begins
  	#revealFull = 0.875; // p where the target is fully opaque and the blob starts fading
  	#sourceRevealed = false;
  	#sourceRevealUntil = 0.25; // p where the source reveal window ends (mirrors revealStart at p→0)
  	#cloneFadeUntil = 0.25; // per-flight snapshot of the source-content clone fade window
  	#cloneFit = 'freeze'; // per-flight snapshot: 'freeze' | 'scale' | 'reflow' clone sizing
  	#cloneReflowSettled = false; // reflow: the clone has been laid out once at the destination size
  	#handoff = 'fade'; // per-flight snapshot: 'fade' | 'hard' target/blob swap

  	// early-settle detector — reset at every animateTo (see #armSettle)
  	#springTarget = TRAVEL; // spring position this run is heading toward
  	#lastPosition = 0; // spring position at the previous change event
  	#settleCount = 0; // consecutive sub-pixel change events

  	/**
  	 * @param {Object} [options]
  	 * @param {number} [options.attraction=0.1] - Spring attraction (0, 1) exclusive
  	 * @param {number} [options.friction=0.32] - Spring friction (0, 1) exclusive
  	 * @param {string[]} [options.styleProperties] - Computed styles captured and morphed
  	 *   (camelCase longhands — shorthands snap instead of interpolating)
  	 * @param {number} [options.revealAt=0.75] - Progress where the target reveal window begins
  	 * @param {number} [options.sourceRevealUntil=0.25] - Progress where the source reveal window
  	 *   ends (mirrors revealAt at the p→0 end so reversals crossfade instead of hard-swapping)
  	 * @param {number} [options.cloneFadeUntil=0.25] - Progress where the source-content clone
  	 *   finishes dissolving
  	 * @param {boolean} [options.cloneContents=true] - Clone the source's content into the blob
  	 * @param {'freeze'|'scale'|'reflow'} [options.cloneFit='freeze'] - How the frozen clone is
  	 *   sized as the blob resizes. 'freeze' keeps it at the source's pixel size (text never
  	 *   rewraps); 'scale' scales it with the blob's border box, for photo-style continuous
  	 *   morphs; 'reflow' lays it out at the blob's size every frame — fluid children follow
  	 *   the box, fixed-size children (text, padding) keep their size — until the blob is
  	 *   within a couple percent of the destination box, then lays it out once at the
  	 *   destination size and rides the settle on a near-1 scale
  	 * @param {'fade'|'hard'} [options.handoff='fade'] - How the blob hands off to the target.
  	 *   'fade' ramps the target in and then fades the blob out; 'hard' swaps both in one
  	 *   instant at revealAt (the switch point is clamped strictly inside (0, 1))
  	 * @param {Object} [options.hide] - Sparse overrides for the hide leg
  	 * @param {number} [options.hide.attraction] - Hide spring attraction
  	 * @param {number} [options.hide.friction] - Hide spring friction
  	 * @param {number} [options.hide.revealAt] - Hide target reveal start
  	 * @param {number} [options.hide.sourceRevealUntil] - Hide source reveal end
  	 * @param {number} [options.hide.cloneFadeUntil] - Hide clone fade end
  	 * @param {boolean} [options.hide.cloneContents] - Hide clone-content setting
  	 * @param {'freeze'|'scale'|'reflow'} [options.hide.cloneFit] - Hide clone sizing mode
  	 * @param {'fade'|'hard'} [options.hide.handoff] - Hide handoff mode
  	 * @param {boolean} [options.lockScroll=true] - Lock body scroll from show until fully
  	 *   hidden — a scroll mid-morph would strand the fixed-position blob
  	 * @param {number} [options.zIndex=9999] - Blob z-index
  	 */
  	constructor({
  		attraction = 0.1,
  		friction = 0.32,
  		styleProperties = DEFAULT_STYLE_PROPERTIES,
  		revealAt = 0.75,
  		sourceRevealUntil = 0.25,
  		cloneFadeUntil = 0.25,
  		cloneContents = true,
  		cloneFit = 'freeze',
  		handoff = 'fade',
  		hide = {},
  		lockScroll = true,
  		zIndex = 9999,
  	} = {}) {
  		super();

  		this.#attraction = attraction;
  		this.#friction = friction;
  		this.#spring = new b({ attraction, friction });
  		this.#styleProperties = styleProperties;

  		this.revealAt = revealAt;
  		this.sourceRevealUntil = sourceRevealUntil;
  		this.cloneFadeUntil = cloneFadeUntil;
  		this.cloneContents = cloneContents;
  		this.cloneFit = cloneFit;
  		this.handoff = handoff;
  		this.hideConfig = hide;
  		this.lockScroll = lockScroll;
  		this.zIndex = zIndex;

  		this.#spring.on('change', ({ position }) => {
  			if (this.#state !== 'showing' && this.#state !== 'hiding') return;
  			const p = position / TRAVEL;
  			this.#p = p;
  			this.#applyFrame(p);
  			this.emit('change', { progress: p, phase: this.#state });

  			// Early finalize: physics-engine only fires 'complete' once the spring is
  			// within 1e-2 of its end — ~0.5s past the point motion is visually done. Snap
  			// to the exact end frame and settle as soon as we're sub-pixel from the target
  			// for two consecutive frames. The per-frame-delta guard is load-bearing: the
  			// first overshoot crossing of the target has a large delta and must NOT qualify,
  			// so the settle bounce is preserved.
  			if (
  				Math.abs(position - this.#springTarget) < SETTLE_POSITION_EPSILON &&
  				Math.abs(position - this.#lastPosition) < SETTLE_DELTA_EPSILON
  			) {
  				if (++this.#settleCount >= 2) {
  					this.#applyFrame(this.#springTarget / TRAVEL);
  					this.#spring.stop();
  					this.#settle();
  					return;
  				}
  			} else {
  				this.#settleCount = 0;
  			}
  			this.#lastPosition = position;
  		});
  		this.#spring.on('complete', () => this.#settle());
  	}

  	/** @returns {string} 'idle' | 'showing' | 'shown' | 'hiding' */
  	get state() {
  		return this.#state;
  	}

  	/** @returns {number} Last-known morph progress (overshoots past 1 while settling) */
  	get progress() {
  		return this.#p;
  	}

  	/**
  	 * Morphs from the source element to the target element. Called while hiding,
  	 * it reverses the in-flight morph instead (arguments are ignored).
  	 * @param {Object} options
  	 * @param {HTMLElement} options.from - Source element (stays hidden while shown)
  	 * @param {HTMLElement} options.to - Target element (revealed as the blob arrives)
  	 * @param {string} [options.display] - display value applied to a display:none target
  	 * @param {boolean} [options.oneWay=false] - Complete and hand ownership to the target on settle
  	 * @param {number} [options.attraction] - One-off spring attraction
  	 * @param {number} [options.friction] - One-off spring friction
  	 * @param {number} [options.revealAt] - One-off target reveal start
  	 * @param {number} [options.sourceRevealUntil] - One-off source reveal end
  	 * @param {number} [options.cloneFadeUntil] - One-off clone fade end
  	 * @param {boolean} [options.cloneContents] - One-off clone-content setting
  	 * @param {'freeze'|'scale'|'reflow'} [options.cloneFit] - One-off clone sizing mode
  	 * @param {'fade'|'hard'} [options.handoff] - One-off handoff mode
  	 * @returns {Promise<boolean>} true when settled, false if superseded or rejected
  	 */
  	show({
  		from,
  		to,
  		display = null,
  		oneWay = false,
  		attraction,
  		friction,
  		revealAt,
  		sourceRevealUntil,
  		cloneFadeUntil,
  		cloneContents,
  		cloneFit,
  		handoff,
  	} = {}) {
  		const overrides = {
  			attraction,
  			friction,
  			revealAt,
  			sourceRevealUntil,
  			cloneFadeUntil,
  			cloneContents,
  			cloneFit,
  			handoff,
  		};
  		if (this.#state === 'showing' || this.#state === 'shown') {
  			console.warn(`MorphEngine: show() ignored — already ${this.#state}`);
  			return Promise.resolve(false);
  		}
  		if (this.#state === 'hiding') {
  			const promise = this.#reverse('showing', overrides);
  			if (oneWay) this.#pendingComplete = { restoreSource: false };
  			return promise;
  		}

  		if (!from || !to) throw new Error('MorphEngine: show() requires { from, to } elements.');

  		this.#sourceElement = from;
  		this.#targetElement = to;
  		this.#displayOverride = display;
  		// A source held by stop({ restoreSource: false }) belongs to the previous
  		// flight, and its inline styles are the morph's own. Releasing it here is
  		// what stops #saveInline from snapshotting those hidden styles as though
  		// they were the page's — which would make them permanent.
  		this.restoreSource();
  		this.#saveInline(from);
  		this.#saveInline(to);

  		if (this.lockScroll && !this.#holdsScrollLock) {
  			this.#holdsScrollLock = true;
  			acquireScrollLock();
  		}

  		const promise = this.#morph(from, to, 'showing', overrides);
  		if (oneWay) this.#pendingComplete = { restoreSource: false };
  		return promise;
  	}

  	/**
  	 * Morphs back from the target to the source. Called while showing, it
  	 * reverses the in-flight morph.
  	 * @param {Object} [options]
  	 * @param {number} [options.attraction] - One-off spring attraction
  	 * @param {number} [options.friction] - One-off spring friction
  	 * @param {number} [options.revealAt] - One-off target reveal start
  	 * @param {number} [options.sourceRevealUntil] - One-off source reveal end
  	 * @param {number} [options.cloneFadeUntil] - One-off clone fade end
  	 * @param {boolean} [options.cloneContents] - One-off clone-content setting
  	 * @param {'freeze'|'scale'|'reflow'} [options.cloneFit] - One-off clone sizing mode
  	 * @param {'fade'|'hard'} [options.handoff] - One-off handoff mode
  	 * @returns {Promise<boolean>} true when settled, false if superseded or rejected
  	 */
  	hide({
  		attraction,
  		friction,
  		revealAt,
  		sourceRevealUntil,
  		cloneFadeUntil,
  		cloneContents,
  		cloneFit,
  		handoff,
  	} = {}) {
  		const overrides = {
  			attraction,
  			friction,
  			revealAt,
  			sourceRevealUntil,
  			cloneFadeUntil,
  			cloneContents,
  			cloneFit,
  			handoff,
  		};
  		if (this.#state === 'idle' || this.#state === 'hiding') {
  			console.warn(`MorphEngine: hide() ignored — ${this.#state}`);
  			return Promise.resolve(false);
  		}
  		if (this.#state === 'showing') return this.#reverse('hiding', overrides);

  		// fresh re-measure of both — the page may have scrolled or resized while shown
  		return this.#morph(this.#targetElement, this.#sourceElement, 'hiding', overrides);
  	}

  	/**
  	 * Hands a shown or showing one-way morph to the target without emitting stop.
  	 * @param {Object} [options]
  	 * @param {boolean} [options.restoreSource=false] - Fully restore the source on handoff
  	 * @returns {boolean} True when completed immediately or armed for settle.
  	 */
  	complete({ restoreSource = false } = {}) {
  		if (this.#state === 'shown') {
  			this.#finalizeComplete(restoreSource);
  			return true;
  		}
  		if (this.#state === 'showing') {
  			this.#pendingComplete = { restoreSource };
  			return true;
  		}

  		console.warn(`MorphEngine: complete() ignored — ${this.#state}`);
  		return false;
  	}

  	/**
  	 * Aborts any morph and restores both elements to their pre-show resting state.
  	 *
  	 * `restoreSource: false` makes this a transport HANDOFF rather than an abort:
  	 * the blob goes, the target is restored and scroll unlocks, but the source
  	 * stays hidden and keeps its `morphing` mark, because a morph does still own
  	 * it. The caller is taking the flight over and calls `restoreSource()` when it
  	 * is genuinely finished. Without the option a caller that only wants the blob
  	 * gone has to re-hide the source itself in the same synchronous task, or the
  	 * source flashes at full opacity for a frame — a timing invariant nothing can
  	 * enforce from the outside.
  	 * @param {Object} [options]
  	 * @param {boolean} [options.restoreSource=true] - Restore the source now.
  	 */
  	stop({ restoreSource = true } = {}) {
  		this.#pendingComplete = null;
  		if (this.#state === 'idle') return;

  		this.#supersede();
  		this.#spring.stop();
  		this.#removeBlob();

  		const source = this.#sourceElement;
  		const target = this.#targetElement;
  		if (source) {
  			if (restoreSource) {
  				this.#restoreInline(source);
  				source.removeAttribute('morphing');
  			} else {
  				this.#heldSource = source;
  			}
  		}
  		if (target) {
  			this.#restoreInline(target);
  			target.removeAttribute('morphing');
  			target.removeAttribute('morph-shown');
  		}
  		this.#unlockScroll();

  		const progress = this.#p;
  		this.#state = 'idle';
  		this.#p = 0;
  		this.emit('stop', { progress });
  	}

  	/**
  	 * Restores a source element held back by `stop({ restoreSource: false })`.
  	 *
  	 * Idempotent, and harmless on a detached element. `show()` and `destroy()`
  	 * call it so a held source can never leak into the next flight — one engine
  	 * is routinely reused run after run.
  	 * @returns {boolean} True when a held source was restored.
  	 */
  	restoreSource() {
  		const source = this.#heldSource;
  		if (!source) return false;
  		this.#heldSource = null;
  		this.#restoreInline(source);
  		source.removeAttribute('morphing');
  		return true;
  	}

  	/**
  	 * Stops and removes all listeners. The engine is unusable afterwards.
  	 */
  	destroy() {
  		this.stop();
  		// stop() early-returns when the engine is already idle, which is exactly
  		// the state a held source lives in.
  		this.restoreSource();
  		this.#spring.removeAllListeners();
  		this.removeAllListeners();
  	}

  	/** @param {number} attraction - Show/default attraction, applied live to the spring */
  	setAttraction(attraction) {
  		this.#attraction = attraction;
  		this.#spring.setAttraction(attraction);
  	}

  	/** @param {number} friction - Show/default friction, applied live to the spring */
  	setFriction(friction) {
  		this.#friction = friction;
  		this.#spring.setFriction(friction);
  	}

  	// -- Morph lifecycle --

  	/**
  	 * The single morph routine — show and hide are the same mechanics with the
  	 * roles swapped. The blob starts pixel-identical to fromElement (its content
  	 * cloned and frozen on top), springs to toElement's rect and styles, and
  	 * reveals toElement across the final stretch.
  	 */
  	#morph(fromElement, toElement, phase, overrides = {}) {
  		this.#pendingComplete = null;
  		this.#supersede();
  		const config = this.#resolveConfig(phase, overrides);
  		this.#spring.setAttraction(config.attraction);
  		this.#spring.setFriction(config.friction);

  		const fromMeasure = this.#measure(fromElement);
  		const toMeasure = this.#measure(toElement);

  		this.#fromMeasure = fromMeasure;
  		this.#toMeasure = toMeasure;
  		this.#toElement = toElement;
  		this.#shownPosition = phase === 'showing' ? TRAVEL : 0;
  		this.#state = phase;
  		this.#revealed = false;
  		this.#sourceRevealed = false;

  		// target fades in across [revealStart, revealFull]; blob fades out across
  		// [revealFull, 1] — staggered so the surface never dips translucent mid-swap
  		this.#revealStart = config.revealAt;
  		this.#revealFull = config.revealAt + (1 - config.revealAt) / 2;
  		this.#sourceRevealUntil = config.sourceRevealUntil;
  		this.#cloneFadeUntil = config.cloneFadeUntil;
  		this.#cloneFit = config.cloneFit;
  		this.#handoff = config.handoff;
  		// A hard handoff collapses both ramps into one instant at revealAt. The switch
  		// point is clamped strictly inside (0, 1) so both of its sparse opacity keys land
  		// inside (0, 100) and can never collide with the 0/100 geometry keyframes — at
  		// revealAt 0 the step would otherwise land on key 0, and at 1 on key 100.
  		if (config.handoff === 'hard') {
  			this.#revealFull = clamp(config.revealAt, HARD_SWITCH_MIN, HARD_SWITCH_MAX);
  		}

  		this.#reconcileBorderColors(fromMeasure, toMeasure);
  		this.#frames = new c(this.#buildKeyframes(fromMeasure, toMeasure));

  		this.#removeBlob();
  		this.#createBlob(fromMeasure, toMeasure, config.cloneContents);
  		this.#markElements(phase);

  		// transitions on the real elements would fight the per-frame writes
  		fromElement.style.transition = 'none';
  		toElement.style.transition = 'none';

  		// the blob now covers fromElement pixel-for-pixel — swap the real one out
  		fromElement.style.visibility = 'hidden';
  		toElement.style.visibility = 'hidden';
  		toElement.style.opacity = '0';

  		this.#applyFrame(0);
  		this.emit(phase === 'showing' ? 'show' : 'hide', {
  			from: this.#sourceElement,
  			to: this.#targetElement,
  		});

  		const promise = new Promise((resolve) => {
  			this.#resolveRun = resolve;
  		});
  		this.#armSettle(0, TRAVEL);
  		this.#spring.animateTo(0, TRAVEL);
  		return promise;
  	}

  	/**
  	 * Reverses the in-flight morph. The keyframe mapping, blob, and clone are all
  	 * pure functions of p, so travelling back unwinds everything automatically —
  	 * the reveal window un-reveals, the clone fades back in, and the blob lands
  	 * exactly where it started.
  	 */
  	#reverse(newPhase, overrides = {}) {
  		this.#pendingComplete = null;
  		this.#supersede();
  		const config = this.#resolveConfig(newPhase, overrides);
  		this.#spring.setAttraction(config.attraction);
  		this.#spring.setFriction(config.friction);
  		this.#state = newPhase;
  		this.#markElements(newPhase);

  		const targetPosition =
  			newPhase === 'showing' ? this.#shownPosition : TRAVEL - this.#shownPosition;

  		this.emit(newPhase === 'showing' ? 'show' : 'hide', {
  			from: this.#sourceElement,
  			to: this.#targetElement,
  		});

  		const promise = new Promise((resolve) => {
  			this.#resolveRun = resolve;
  		});
  		this.#armSettle(this.#p * TRAVEL, targetPosition);
  		this.#spring.animateTo(this.#p * TRAVEL, targetPosition);
  		return promise;
  	}

  	/**
  	 * Arms the early-settle detector for a fresh run. Called at every animateTo so
  	 * a reversal never inherits stale proximity state from the run it interrupts.
  	 * @param {number} startPosition - Spring position the run begins from
  	 * @param {number} target - Spring position the run is heading toward
  	 */
  	#armSettle(startPosition, target) {
  		this.#springTarget = target;
  		this.#lastPosition = startPosition;
  		this.#settleCount = 0;
  	}

  	/**
  	 * Spring settled — finalize whichever logical state we were heading toward.
  	 * The spring's final change event already applied the exact end frame.
  	 */
  	#settle() {
  		if (this.#state !== 'showing' && this.#state !== 'hiding') return;

  		const resolve = this.#resolveRun;
  		this.#resolveRun = null;

  		if (this.#state === 'showing') this.#finalizeShown();
  		else this.#finalizeHidden();

  		if (this.#state === 'shown' && this.#pendingComplete) {
  			const { restoreSource } = this.#pendingComplete;
  			this.#pendingComplete = null;
  			this.#finalizeComplete(restoreSource);
  		}

  		if (resolve) resolve(true);
  	}

  	#finalizeShown() {
  		this.#removeBlob();

  		const source = this.#sourceElement;
  		const target = this.#targetElement;

  		// the target rests naturally — clear the mirror transform, keep it visible
  		this.#restoreProperties(target, [
  			'opacity',
  			'transform',
  			'transformOrigin',
  			'willChange',
  			'transition',
  		]);
  		target.style.visibility = 'visible';

  		// clear any mirror residue off the source: from the source-reveal window at the
  		// start of this show, or from the target machinery if we got here by reversing a
  		// hide (then #toElement === source). Always runs — a fresh show leaves transform/
  		// willChange on the source that #ensureSourceUnrevealed does not touch.
  		this.#restoreProperties(source, ['opacity', 'transform', 'transformOrigin', 'willChange']);
  		// the source stays hidden while shown — it "became" the target
  		source.style.visibility = 'hidden';

  		source.removeAttribute('morphing');
  		target.removeAttribute('morphing');
  		target.setAttribute('morph-shown', '');

  		this.#state = 'shown';
  		this.emit('shown', { from: source, to: target });
  	}

  	#finalizeHidden() {
  		this.#removeBlob();

  		const source = this.#sourceElement;
  		const target = this.#targetElement;

  		this.#restoreInline(source);
  		this.#restoreInline(target);
  		source.removeAttribute('morphing');
  		target.removeAttribute('morphing');
  		target.removeAttribute('morph-shown');
  		this.#unlockScroll();

  		this.#state = 'idle';
  		this.#p = 0;
  		this.emit('hidden', { from: source, to: target });
  	}

  	/**
  	 * Releases a shown morph to app ownership while preserving the target's state.
  	 * @param {boolean} restoreSource - Whether to fully restore the source element
  	 */
  	#finalizeComplete(restoreSource) {
  		const source = this.#sourceElement;
  		const target = this.#targetElement;

  		this.#savedInline.delete(target);
  		target.removeAttribute('morph-shown');

  		if (restoreSource) this.#restoreInline(source);
  		else {
  			this.#restoreProperties(source, ['transition']);
  			this.#savedInline.delete(source);
  		}

  		this.#unlockScroll();
  		this.#sourceElement = null;
  		this.#targetElement = null;
  		this.#displayOverride = null;
  		this.#state = 'idle';
  		this.#p = 0;
  		this.emit('complete', { from: source, to: target });
  	}

  	/** Releases this engine's share of the module-level body scroll lock. */
  	#unlockScroll() {
  		if (!this.#holdsScrollLock) return;
  		this.#holdsScrollLock = false;
  		releaseScrollLock();
  	}

  	/**
  	 * Resolves sparse public, hide-leg, and per-call settings for a run.
  	 * @param {string} phase - 'showing' or 'hiding'
  	 * @param {Object} overrides - Sparse per-call overrides
  	 * @returns {Object} Resolved spring and choreography settings
  	 */
  	#resolveConfig(phase, overrides = {}) {
  		const config = {
  			attraction: this.#attraction,
  			friction: this.#friction,
  			revealAt: this.revealAt,
  			sourceRevealUntil: this.sourceRevealUntil,
  			cloneFadeUntil: this.cloneFadeUntil,
  			cloneContents: this.cloneContents,
  			cloneFit: this.cloneFit,
  			handoff: this.handoff,
  		};
  		const keys = Object.keys(config);
  		if (phase === 'hiding') {
  			for (const key of keys) {
  				if (this.hideConfig[key] !== undefined) config[key] = this.hideConfig[key];
  			}
  		}
  		for (const key of keys) {
  			if (overrides[key] !== undefined) config[key] = overrides[key];
  		}
  		config.cloneFit = coerceEnum('cloneFit', config.cloneFit, CLONE_FIT_VALUES, 'freeze');
  		config.handoff = coerceEnum('handoff', config.handoff, HANDOFF_VALUES, 'fade');
  		return config;
  	}

  	/** Resolves a superseded run's promise with false. */
  	#supersede() {
  		if (this.#resolveRun) {
  			this.#resolveRun(false);
  			this.#resolveRun = null;
  		}
  	}

  	// -- Per-frame pipeline --

  	/**
  	 * The whole visual state as a pure function of p. Reveal handling is an
  	 * idempotent check rather than a one-shot flag so a reversed spring that
  	 * swings p back down automatically un-reveals the target.
  	 */
  	#applyFrame(p) {
  		const styles = this.#frames.getFrame(p);

  		for (const property of CLAMP_POSITIVE) {
  			if (property in styles && parseFloat(styles[property]) < 0) styles[property] = '0px';
  		}

  		Object.assign(this.#blob.style, styles);
  		this.#blob.style.boxShadow = lerpShadow(this.#fromMeasure.shadow, this.#toMeasure.shadow, p);

  		if (this.#cloneWrapper) {
  			const fade =
  				this.#cloneFadeUntil > 0 ? clamp(1 - p / this.#cloneFadeUntil, 0, 1) : p <= 0 ? 1 : 0;
  			this.#cloneWrapper.style.opacity = String(fade);

  			// 'reflow' lays the clone out at the blob's size each frame, so what is
  			// fluid inside it follows the box and what is fixed (text, padding) keeps
  			// its size — the same layout the destination will have. Once the blob is
  			// within a couple percent of the destination box it latches: laid out once
  			// at the destination size and only transformed from there, so the settle
  			// (overshoot included) never triggers layout and nothing fixed-size pops at
  			// the switch. It unlatches back to per-frame layout only past the wider exit
  			// tolerance, so a reversal returns cleanly without flapping at the boundary.
  			// Skipped entirely while the clone is invisible; re-entry rewrites the box.
  			if (this.#cloneFit === 'reflow' && fade > 0) {
  				const wrapper = this.#cloneWrapper;
  				// the wrapper sits in the blob's padding box, so both boxes are border
  				// box minus border widths
  				const frameInsets = borderInsets(styles);
  				const blobWidth = Math.max(0, parseFloat(styles.width) - frameInsets.x);
  				const blobHeight = Math.max(0, parseFloat(styles.height) - frameInsets.y);
  				const toInsets = this.#toMeasure.borderInsets;
  				const toWidth = this.#toMeasure.rect.width - toInsets.x;
  				const toHeight = this.#toMeasure.rect.height - toInsets.y;

  				let latched = false;
  				if (toWidth > 0 && toHeight > 0) {
  					const offWidth = Math.abs(blobWidth / toWidth - 1);
  					const offHeight = Math.abs(blobHeight / toHeight - 1);
  					const tolerance = this.#cloneReflowSettled ? REFLOW_LATCH_EXIT : REFLOW_LATCH_ENTER;
  					latched = offWidth < tolerance && offHeight < tolerance;
  				}

  				if (latched) {
  					if (!this.#cloneReflowSettled) {
  						this.#cloneReflowSettled = true;
  						wrapper.style.width = `${toWidth}px`;
  						wrapper.style.height = `${toHeight}px`;
  					}
  					wrapper.style.transform = `scale(${blobWidth / toWidth}, ${blobHeight / toHeight})`;
  				} else {
  					if (this.#cloneReflowSettled) {
  						this.#cloneReflowSettled = false;
  						wrapper.style.transform = '';
  					}
  					wrapper.style.width = `${blobWidth}px`;
  					wrapper.style.height = `${blobHeight}px`;
  				}
  			}

  			// 'scale' rides the blob's border box instead of staying frozen at the
  			// source's pixel size — a photo keeps growing instead of dissolving
  			else if (this.#cloneFit === 'scale') {
  				const fromRect = this.#fromMeasure.rect;
  				if (fromRect.width > 0 && fromRect.height > 0) {
  					const scaleX = parseFloat(styles.width) / fromRect.width;
  					const scaleY = parseFloat(styles.height) / fromRect.height;
  					this.#cloneWrapper.style.transform = `scale(${scaleX}, ${scaleY})`;
  				}
  			}
  		}

  		if (p >= this.#revealStart) {
  			this.#ensureRevealed();

  			const target = this.#toElement;
  			const naturalRect = this.#toMeasure.rect;
  			const blobRect = {
  				top: parseFloat(styles.top),
  				left: parseFloat(styles.left),
  				width: parseFloat(styles.width),
  				height: parseFloat(styles.height),
  			};

  			// mirror the blob's geometry so the target moves in lockstep and inherits
  			// the spring's overshoot bounce once the blob has faded away
  			// a hard handoff has a zero-width ramp (revealFull === revealStart)
  			const rampWidth = this.#revealFull - this.#revealStart;
  			const fadeProgress = rampWidth > 0 ? clamp((p - this.#revealStart) / rampWidth, 0, 1) : 1;
  			target.style.opacity = String(fadeProgress);
  			target.style.transformOrigin = '0 0';
  			target.style.transform =
  				`translate(${round(blobRect.left - naturalRect.left)}px, ` +
  				`${round(blobRect.top - naturalRect.top)}px) ` +
  				`scale(${blobRect.width / naturalRect.width}, ${blobRect.height / naturalRect.height})`;
  		} else {
  			this.#ensureUnrevealed();
  		}

  		// Mirror of the target reveal at the p→0 end. The real from-element fades in
  		// under the blob over [0, sourceRevealUntil] while the blob fades to nothing, so a
  		// morph reversed back to closed crossfades to the live source instead of hard-
  		// swapping a stale full-opacity replica. Runs at morph start too — there the blob
  		// simply fades in over the pixel-identical source. Direction-agnostic by design.
  		if (p <= this.#sourceRevealUntil) {
  			this.#ensureSourceRevealed();

  			const source = this.#fromMeasure.element;
  			const naturalRect = this.#fromMeasure.rect;
  			const blobRect = {
  				top: parseFloat(styles.top),
  				left: parseFloat(styles.left),
  				width: parseFloat(styles.width),
  				height: parseFloat(styles.height),
  			};

  			// source fades in over the outer half of the window (descending p) so the
  			// composite is opaque before the blob vanishes; mirror the blob's geometry so
  			// the source rides its overshoot bounce, exactly like the target
  			const half = this.#sourceRevealUntil / 2;
  			const sourceOpacity = clamp((this.#sourceRevealUntil - p) / half, 0, 1);
  			source.style.opacity = String(sourceOpacity);
  			source.style.transformOrigin = '0 0';
  			source.style.transform =
  				`translate(${round(blobRect.left - naturalRect.left)}px, ` +
  				`${round(blobRect.top - naturalRect.top)}px) ` +
  				`scale(${blobRect.width / naturalRect.width}, ${blobRect.height / naturalRect.height})`;

  			// blob fades out over [w/2, w/4] and is gone below w/4 — clearing before the
  			// spring's slow tail so it never sits as a translucent slab muting the live
  			// source's content (the source is fully opaque from w/2 down, so the composite
  			// never dips). Post-multiply after the keyframe opacity above.
  			const quarter = half / 2;
  			const blobFactor = clamp((p - quarter) / quarter, 0, 1);
  			this.#blob.style.opacity = String(parseFloat(styles.opacity ?? '1') * blobFactor);
  		} else {
  			this.#ensureSourceUnrevealed();
  		}
  	}

  	#ensureRevealed() {
  		if (this.#revealed) return;
  		this.#revealed = true;

  		const target = this.#toElement;
  		if (this.#toMeasure.wasDisplayNone) target.style.display = this.#displayOverride || 'block';
  		target.style.visibility = 'visible';
  		target.style.willChange = 'transform, opacity';

  		// the run's destination just started painting — still at opacity 0, which
  		// makes this the seam-free moment for consumers to do layer promotion
  		// (e.g. dialog.showModal(): promoting at settle repaints a visible surface)
  		this.emit('reveal', { from: this.#fromMeasure.element, to: target });
  	}

  	#ensureUnrevealed() {
  		if (!this.#revealed) return;
  		this.#revealed = false;

  		const target = this.#toElement;
  		target.style.visibility = 'hidden';
  		target.style.opacity = '0';

  		this.emit('unreveal', { from: this.#fromMeasure.element, to: target });
  	}

  	/**
  	 * Source mirror of #ensureRevealed — makes the real from-element paintable so it
  	 * can crossfade in under the blob at the p→0 end. Idempotent.
  	 */
  	#ensureSourceRevealed() {
  		if (this.#sourceRevealed) return;
  		this.#sourceRevealed = true;

  		const source = this.#fromMeasure.element;
  		if (this.#fromMeasure.wasDisplayNone) source.style.display = this.#displayOverride || 'block';
  		source.style.visibility = 'visible';
  		source.style.willChange = 'transform, opacity';
  	}

  	/**
  	 * Source mirror of #ensureUnrevealed — re-hides the from-element once p leaves the
  	 * source window. Transform/willChange residue is cleared at finalize. Idempotent.
  	 */
  	#ensureSourceUnrevealed() {
  		if (!this.#sourceRevealed) return;
  		this.#sourceRevealed = false;

  		const source = this.#fromMeasure.element;
  		source.style.visibility = 'hidden';
  		source.style.opacity = '0';
  	}

  	// -- Measurement & DOM --

  	/**
  	 * Measures an element's viewport rect and captured computed styles. A
  	 * display:none element is flipped on invisibly for one synchronous read.
  	 * (visibility:hidden elements keep their layout and measure normally.)
  	 */
  	#measure(element) {
  		let restore = null;
  		if (element.getClientRects().length === 0) {
  			const style = element.style;
  			restore = {
  				display: style.display,
  				visibility: style.visibility,
  				transition: style.transition,
  			};
  			style.transition = 'none';
  			style.visibility = 'hidden';
  			style.display = this.#displayOverride || 'block';
  		}

  		const rect = element.getBoundingClientRect();
  		const computed = getComputedStyle(element);
  		const styles = {};
  		for (const property of this.#styleProperties) {
  			styles[property] = computed[property];
  		}
  		const measure = {
  			element,
  			rect,
  			styles,
  			shadow: parseShadow(computed.boxShadow),
  			borderStyle: computed.borderTopStyle,
  			// read here rather than from styles, which only has them when styleProperties does
  			borderInsets: borderInsets(computed),
  			// applied statically to the blob (see #createBlob) — never added to
  			// styleProperties, as a blur radius or image URL has no meaningful midpoint
  			backdropFilter: computed.backdropFilter || computed.webkitBackdropFilter,
  			backgroundImage: computed.backgroundImage,
  			backgroundSize: computed.backgroundSize,
  			backgroundRepeat: computed.backgroundRepeat,
  			backgroundPosition: computed.backgroundPosition,
  			wasDisplayNone: restore !== null,
  		};

  		if (restore) Object.assign(element.style, restore);
  		return measure;
  	}

  	/**
  	 * A borderless element's computed border-color falls back to currentColor (its
  	 * text color), and `transparent` computes to rgba(0,0,0,0) — lerping toward
  	 * either drags the visible end's border through an unrelated hue while the
  	 * width or alpha collapses. Rewrite the degenerate end's color so only
  	 * width/alpha animate: an absent border holds the visible end's color
  	 * verbatim, a fully transparent one holds its hue at alpha 0.
  	 */
  	#reconcileBorderColors(fromMeasure, toMeasure) {
  		const absent = (measure) =>
  			measure.borderStyle === 'none' ||
  			BORDER_SIDES.every((side) => parseFloat(measure.styles[`border${side}Width`]) === 0);

  		const fromAbsent = absent(fromMeasure);
  		const toAbsent = absent(toMeasure);
  		if (fromAbsent && toAbsent) return;

  		for (const side of BORDER_SIDES) {
  			const key = `border${side}Color`;
  			const fromColor = fromMeasure.styles[key];
  			const toColor = toMeasure.styles[key];
  			if (!fromColor || !toColor) continue;

  			const fromDegenerate = fromAbsent || parseColor(fromColor).alpha === 0;
  			const toDegenerate = toAbsent || parseColor(toColor).alpha === 0;
  			if (fromDegenerate === toDegenerate) continue;

  			const visibleColor = fromDegenerate ? toColor : fromColor;
  			const { red, green, blue } = parseColor(visibleColor);
  			const replacement = (fromDegenerate ? fromAbsent : toAbsent)
  				? visibleColor
  				: `rgba(${red}, ${green}, ${blue}, 0)`;
  			(fromDegenerate ? fromMeasure : toMeasure).styles[key] = replacement;
  		}
  	}

  	#buildKeyframes(fromMeasure, toMeasure) {
  		const rectStyles = (rect) => ({
  			top: `${rect.top}px`,
  			left: `${rect.left}px`,
  			width: `${rect.width}px`,
  			height: `${rect.height}px`,
  		});

  		// blob opacity clears at the midpoint between revealFull and 1, not at 1 —
  		// past revealFull the target is fully opaque and mirrored to the blob's rect,
  		// so the blob is a featureless slab muting the target's content; fading it on
  		// the spring's slow tail makes content contrast "pop in" at the very end.
  		// The fade still never starts before the target is fully revealed.
  		// A hard handoff replaces that fade with a 0.01%-wide step at revealFull, so the
  		// blob is opaque right up to the switch and gone immediately after. Both shapes
  		// rely on frame-engine's per-property extrapolation beyond the pair, and on its
  		// [0, 1] opacity clamp holding the ends flat (including during overshoot).
  		const blobClear =
  			this.#handoff === 'hard'
  				? this.#revealFull + 0.0001
  				: this.#revealFull + (1 - this.#revealFull) / 2;

  		// Merge the sparse opacity keys in rather than listing them between the 0/100
  		// literals: a key that coincides with an end keyframe (revealAt at the very edge
  		// of a fade-mode window) must gain opacity, never replace that end's geometry.
  		const frames = {
  			0: { ...rectStyles(fromMeasure.rect), ...fromMeasure.styles },
  			100: { ...rectStyles(toMeasure.rect), ...toMeasure.styles },
  		};
  		const setOpacity = (percent, value) => {
  			frames[percent] = { ...frames[percent], opacity: value };
  		};
  		setOpacity(this.#revealFull * 100, '1');
  		setOpacity(blobClear * 100, '0');
  		return frames;
  	}

  	#createBlob(fromMeasure, toMeasure, cloneContents) {
  		const blob = document.createElement('morph-blob');
  		const borderStyle =
  			toMeasure.borderStyle !== 'none'
  				? toMeasure.borderStyle
  				: fromMeasure.borderStyle !== 'none'
  					? fromMeasure.borderStyle
  					: 'solid';

  		Object.assign(blob.style, {
  			position: 'fixed',
  			top: '0',
  			left: '0',
  			margin: '0',
  			boxSizing: 'border-box',
  			pointerEvents: 'none',
  			overflow: 'hidden',
  			display: 'block',
  			zIndex: String(this.zIndex),
  			borderStyle,
  			willChange: 'top, left, width, height, opacity',
  		});

  		// Glass/texture surfaces (backdrop blur, gradient/image fills) have no
  		// meaningful midpoint, so they ride statically through the flight rather than
  		// interpolating — target's value wins when set, else source's, else omitted.
  		const backdropFilter =
  			toMeasure.backdropFilter !== 'none'
  				? toMeasure.backdropFilter
  				: fromMeasure.backdropFilter !== 'none'
  					? fromMeasure.backdropFilter
  					: null;
  		if (backdropFilter) {
  			blob.style.backdropFilter = backdropFilter;
  			blob.style.webkitBackdropFilter = backdropFilter; // Safari
  		}

  		// size/repeat/position must come from the same measure as the image itself
  		const backgroundMeasure =
  			toMeasure.backgroundImage !== 'none'
  				? toMeasure
  				: fromMeasure.backgroundImage !== 'none'
  					? fromMeasure
  					: null;
  		if (backgroundMeasure) {
  			blob.style.backgroundImage = backgroundMeasure.backgroundImage;
  			blob.style.backgroundSize = backgroundMeasure.backgroundSize;
  			blob.style.backgroundRepeat = backgroundMeasure.backgroundRepeat;
  			blob.style.backgroundPosition = backgroundMeasure.backgroundPosition;
  		}

  		if (cloneContents) this.#createClone(blob, fromMeasure);

  		document.body.appendChild(blob);
  		this.#blob = blob;
  	}

  	/**
  	 * Freezes a visual copy of the source's content inside the blob. The wrapper
  	 * keeps the source's original dimensions so text never rewraps as the blob
  	 * resizes; the blob's overflow:hidden clips it. The clone's own surface
  	 * (background, border, shadow) is stripped — the blob renders the surface.
  	 * With cloneFit: 'scale' the wrapper keeps those dimensions but is scaled to
  	 * the blob's border box every frame from its top-left origin instead. With
  	 * cloneFit: 'reflow' the wrapper is resized to the blob's padding box every
  	 * frame (see #applyFrame), so the clone lays itself out at each size.
  	 */
  	#createClone(blob, fromMeasure) {
  		const clone = fromMeasure.element.cloneNode(true);
  		clone.removeAttribute('id');
  		clone.removeAttribute('morphing');
  		Object.assign(clone.style, {
  			position: 'static',
  			margin: '0',
  			width: '100%',
  			height: '100%',
  			transform: 'none',
  			transition: 'none',
  			visibility: 'visible',
  			opacity: '1',
  			boxShadow: 'none',
  			background: 'transparent',
  			borderColor: 'transparent',
  		});

  		const transforms = this.#cloneFit === 'scale' || this.#cloneFit === 'reflow';
  		const wrapper = document.createElement('div');
  		Object.assign(wrapper.style, {
  			position: 'absolute',
  			top: '0',
  			left: '0',
  			width: `${fromMeasure.rect.width}px`,
  			height: `${fromMeasure.rect.height}px`,
  			pointerEvents: 'none',
  			transformOrigin: '0 0',
  			...(transforms ? { willChange: 'transform' } : null),
  		});

  		wrapper.appendChild(clone);
  		blob.appendChild(wrapper);
  		this.#cloneWrapper = wrapper;
  		this.#cloneReflowSettled = false;
  	}

  	#removeBlob() {
  		if (!this.#blob) return;
  		this.#blob.remove();
  		this.#blob = null;
  		this.#cloneWrapper = null;
  		this.#cloneReflowSettled = false;
  	}

  	/** Marks both elements for CSS hooks — which one the blob is flying away from. */
  	#markElements(phase) {
  		const showing = phase === 'showing';
  		this.#sourceElement.setAttribute('morphing', showing ? 'source' : 'target');
  		this.#targetElement.setAttribute('morphing', showing ? 'target' : 'source');
  	}

  	// -- Inline style bookkeeping --

  	#saveInline(element) {
  		const saved = {};
  		for (const property of MANAGED_PROPERTIES) {
  			saved[property] = element.style[property];
  		}
  		this.#savedInline.set(element, saved);
  	}

  	#restoreProperties(element, properties) {
  		const saved = this.#savedInline.get(element) || {};
  		const hasTransition = properties.includes('transition');
  		for (const property of properties) {
  			if (property === 'transition') continue;
  			element.style[property] = saved[property] ?? '';
  		}
  		if (hasTransition) {
  			// commit the restored values while the inline `transition: none` from
  			// #morph still wins — restoring everything in one recalc would let a
  			// stylesheet `transition: all` animate the visibility flip (and leave
  			// it frozen mid-transition in a hidden tab)
  			void element.offsetWidth;
  			element.style.transition = saved.transition ?? '';
  		}
  	}

  	#restoreInline(element) {
  		this.#restoreProperties(element, MANAGED_PROPERTIES);
  		this.#savedInline.delete(element);
  	}
  }

  // import engines

  /**
   * select-dropdown component that handles the functionality of a custom dropdown
   * @class SelectDropdown
   * @extends HTMLElement
   */
  class SelectDropdown extends HTMLElement {
  	static #instanceCount = 0;

  	// private fields for elements
  	#instanceId;
  	#trigger;
  	#input;
  	#optionsContainer;
  	#label;
  	#currentFocusIndex = -1;
  	#typeaheadBuffer = '';
  	#typeaheadTimer = null;
  	#defaultValue = null;
  	#defaultValueCaptured = false;
  	#originalLabelText = '';

  	// morph engine drives the trigger↔panel container transform
  	#morphEngine = null;
  	#pendingFocusRestore = false;

  	/**
  	 * Live getter for option elements — supports dynamically added/removed options
  	 * @returns {NodeList}
  	 * @private
  	 */
  	get #options() {
  		return this.querySelectorAll('select-option');
  	}

  	constructor() {
  		super();
  		const _ = this;
  		_.#instanceId = ++SelectDropdown.#instanceCount;
  		_.handlers = {};
  	}

  	get value() {
  		const selectedOption = this.#getSelectedOption();
  		if (selectedOption) return this.#getOptionValue(selectedOption);
  		return this.#input?.value || '';
  	}

  	get selectedText() {
  		const selectedOption = this.#getSelectedOption();
  		if (selectedOption) return this.#getOptionText(selectedOption);
  		return '';
  	}

  	set value(nextValue) {
  		if (nextValue === null || nextValue === undefined) return;

  		const option = this.#findOptionByValue(String(nextValue));
  		if (!option) return;

  		this.#applySelection(option);
  	}

  	/**
  	 * when element is connected to the dom
  	 */
  	connectedCallback() {
  		const _ = this;

  		_.queryDOM();
  		_.setAttribute('tabindex', '-1');
  		_.setupAriaAttributes();
  		_.#createMorphEngine();
  		_.attachListeners();
  		_.initializeSelectedOption();
  		_.hide();
  	}

  	/**
  	 * Creates the morph engine that animates the trigger↔panel container
  	 * transform and wires up its shown/hidden lifecycle handlers. Options aren't
  	 * focusable until the morph reveals the panel, and the trigger is
  	 * visibility:hidden while shown, so focus moves are deferred to these events.
  	 * @private
  	 */
  	#createMorphEngine() {
  		const _ = this;

  		_.#morphEngine = new MorphEngine({ revealAt: 0.7, lockScroll: false });

  		// panel fully revealed — move focus into it. Prefer the option the user
  		// may have arrow-navigated to mid-flight, then the selected option, then
  		// the first option.
  		_.handlers.shown = () => {
  			if (!_.hasAttribute('visible')) return;

  			const options = Array.from(_.#options);
  			let index = _.#currentFocusIndex;
  			if (index < 0) {
  				index = options.findIndex((opt) => opt.getAttribute('aria-selected') === 'true');
  			}
  			if (index < 0) index = 0;

  			_.focusOption(index);
  		};

  		// panel fully morphed back into the trigger — restore focus to the trigger
  		// now that it's visible again (focusing it earlier, while hidden, fails)
  		_.handlers.hidden = () => {
  			if (_.#pendingFocusRestore) {
  				_.#pendingFocusRestore = false;
  				_.#trigger?.focus();
  			}
  		};

  		_.#morphEngine.on('shown', _.handlers.shown);
  		_.#morphEngine.on('hidden', _.handlers.hidden);
  	}

  	/**
  	 * Queries and caches all DOM elements needed for the component
  	 * @private
  	 */
  	queryDOM() {
  		const _ = this;

  		_.#trigger = _.querySelector('select-trigger');
  		_.#input = _.querySelector('input');
  		_.#optionsContainer = _.querySelector('select-panel');
  		_.#label = _.#trigger?.querySelector('.select-label-text');
  	}

  	/**
  	 * clean up event listeners and the morph engine when element is removed
  	 */
  	disconnectedCallback() {
  		this.detachListeners();

  		// destroy() restores all inline styles and removes the blob; recreated
  		// per connectedCallback
  		this.#morphEngine?.destroy();
  		this.#morphEngine = null;
  	}

  	/**
  	 * Gets the value from an option element
  	 * @param {HTMLElement} option - The option element
  	 * @returns {string} The option value
  	 * @private
  	 */
  	#getOptionValue(option) {
  		if (option.hasAttribute('value')) return option.getAttribute('value');
  		return option.textContent.trim();
  	}

  	/**
  	 * Gets the label text from an option element
  	 * @param {HTMLElement} option - The option element
  	 * @returns {string} The option label
  	 * @private
  	 */
  	#getOptionText(option) {
  		return option.textContent.trim();
  	}

  	/**
  	 * Finds the currently selected option
  	 * @returns {HTMLElement | undefined}
  	 * @private
  	 */
  	#getSelectedOption() {
  		return Array.from(this.#options).find(
  			(option) => option.getAttribute('aria-selected') === 'true'
  		);
  	}

  	/**
  	 * Finds an option matching the provided value
  	 * @param {string} value - The option value to match
  	 * @returns {HTMLElement | undefined}
  	 * @private
  	 */
  	#findOptionByValue(value) {
  		return Array.from(this.#options).find((option) => this.#getOptionValue(option) === value);
  	}

  	/**
  	 * Applies selection state across the control
  	 * @param {HTMLElement | null} option - The option to select
  	 * @private
  	 */
  	#applySelection(option) {
  		this.#options.forEach((opt) => {
  			opt.removeAttribute('selected');
  			opt.setAttribute('aria-selected', 'false');
  		});

  		if (!option) {
  			if (this.#input) {
  				this.#input.value = '';
  			}

  			if (this.#label) {
  				this.#label.textContent = this.#originalLabelText;
  			}

  			this.#currentFocusIndex = -1;
  			return;
  		}

  		option.setAttribute('aria-selected', 'true');
  		option.setAttribute('selected', '');

  		if (this.#input) {
  			this.#input.value = this.#getOptionValue(option);
  		}

  		if (this.#label) {
  			this.#label.textContent = this.#getOptionText(option);
  		}

  		this.#currentFocusIndex = Array.from(this.#options).indexOf(option);
  	}

  	/**
  	 * Initializes any pre-selected options based on 'selected' attribute
  	 * @private
  	 */
  	initializeSelectedOption() {
  		const _ = this;

  		const selectedOption = Array.from(_.#options).find((opt) => opt.hasAttribute('selected'));

  		// Capture the default value and label on the first call
  		if (!_.#defaultValueCaptured) {
  			_.#defaultValue = selectedOption ? _.#getOptionValue(selectedOption) : null;
  			_.#originalLabelText = _.#label ? _.#label.textContent : '';
  			_.#defaultValueCaptured = true;
  		}

  		_.#applySelection(selectedOption || null);
  	}

  	/**
  	 * Resets the component to its original default selection
  	 * @private
  	 */
  	#resetToDefault() {
  		const _ = this;
  		const defaultOption =
  			_.#defaultValue === null ? null : _.#findOptionByValue(_.#defaultValue) || null;

  		_.#applySelection(defaultOption);
  	}

  	/**
  	 * sets up aria attributes for accessibility
  	 */
  	setupAriaAttributes() {
  		const _ = this;
  		const listbox = _.#optionsContainer;
  		const trigger = _.#trigger;

  		if (!trigger || !listbox) return;

  		// setup trigger button
  		trigger.setAttribute('aria-haspopup', 'listbox');
  		trigger.setAttribute('aria-expanded', 'false');
  		trigger.setAttribute('role', 'button');

  		if (!trigger.id) {
  			trigger.id = `select-trigger-${_.#instanceId}`;
  		}

  		// assign an ID to the listbox panel and link via aria-controls
  		if (!listbox.id) {
  			listbox.id = `select-panel-${_.#instanceId}`;
  		}
  		trigger.setAttribute('aria-controls', listbox.id);

  		// setup listbox
  		listbox.setAttribute('role', 'listbox');
  		listbox.setAttribute('aria-labelledby', trigger.id);

  		// setup options
  		_.#options.forEach((option, index) => {
  			option.setAttribute('role', 'option');
  			option.setAttribute('aria-selected', 'false');
  			option.setAttribute('tabindex', '-1');
  			option.id = `${trigger.id}-option-${index}`;
  		});
  	}

  	/**
  	 * Attaches event listeners to the component
  	 */
  	attachListeners() {
  		const _ = this;

  		// bind event handlers
  		_.handlers.documentClick = _.handleOutsideClick.bind(_);
  		_.handlers.keyDown = _.handleKeyboardNavigation.bind(_);

  		// listen for form reset to restore the original default selection
  		const form = _.closest('form');
  		if (form) {
  			_.handlers.formReset = () => {
  				requestAnimationFrame(() => {
  					_.#resetToDefault();
  				});
  			};
  			form.addEventListener('reset', _.handlers.formReset);
  		}
  	}

  	/**
  	 * Detaches event listeners from the component
  	 */
  	detachListeners() {
  		document.removeEventListener('click', this.handlers.documentClick);
  		document.removeEventListener('keydown', this.handlers.keyDown);

  		// remove form reset listener
  		if (this.handlers.formReset) {
  			const form = this.closest('form');
  			form?.removeEventListener('reset', this.handlers.formReset);
  		}
  	}

  	/**
  	 * handles click events outside of the dropdown to hide it
  	 * @param {Event} e - the click event
  	 */
  	handleOutsideClick(e) {
  		// if click is outside of the dropdown, hide it
  		if (!this.contains(e.target)) {
  			this.hide({ restoreFocus: false });
  		}
  	}

  	/**
  	 * handles keyboard navigation in the dropdown
  	 * @param {KeyboardEvent} e - the keyboard event
  	 */
  	handleKeyboardNavigation(e) {
  		const _ = this;
  		const options = Array.from(_.#options);

  		switch (e.key) {
  			case 'Escape':
  				e.preventDefault();
  				_.hide();
  				break;

  			case 'ArrowDown':
  				e.preventDefault();

  				// if focus is on trigger, start from selected option
  				if (document.activeElement === _.#trigger) {
  					const selectedIndex = options.findIndex(
  						(opt) => opt.getAttribute('aria-selected') === 'true'
  					);
  					_.#currentFocusIndex = selectedIndex >= 0 ? selectedIndex : -1;
  				}

  				// move to next option
  				if (_.#currentFocusIndex < options.length - 1) {
  					_.focusOption(_.#currentFocusIndex + 1);
  				}
  				break;

  			case 'ArrowUp':
  				e.preventDefault();

  				// if focus is on trigger, start from selected option
  				if (document.activeElement === _.#trigger) {
  					const selectedIndex = options.findIndex(
  						(opt) => opt.getAttribute('aria-selected') === 'true'
  					);
  					if (selectedIndex >= 0) {
  						_.focusOption(selectedIndex);
  						break;
  					}
  				}

  				// move to previous option
  				if (_.#currentFocusIndex > 0) {
  					_.focusOption(_.#currentFocusIndex - 1);
  				} else if (_.#currentFocusIndex === 0) {
  					// if on first option, move focus back to trigger
  					_.#trigger.focus();
  					_.#currentFocusIndex = -1;
  				}
  				break;

  			case 'Home':
  				e.preventDefault();
  				_.focusOption(0);
  				break;

  			case 'End':
  				e.preventDefault();
  				_.focusOption(options.length - 1);
  				break;

  			case 'Enter':
  			case ' ':
  				e.preventDefault();

  				// if dropdown is hidden and trigger is focused, show it
  				if (!_.hasAttribute('visible') && document.activeElement === _.#trigger) {
  					_.show();
  					return;
  				}

  				// if focus is on an option, select it
  				if (_.#currentFocusIndex >= 0) {
  					_.selectOption({ target: options[_.#currentFocusIndex] });
  				} else if (document.activeElement === _.#trigger) {
  					_.show();
  				}
  				break;

  			case 'Tab':
  				// Close without preventing default — let focus move naturally
  				_.hide({ restoreFocus: false });
  				break;

  			default:
  				// handle typeahead - accumulate keystrokes for multi-char matching
  				const key = e.key.toLowerCase();

  				if (key.length === 1) {
  					_.#typeaheadBuffer += key;
  					clearTimeout(_.#typeaheadTimer);
  					_.#typeaheadTimer = setTimeout(() => {
  						_.#typeaheadBuffer = '';
  					}, 500);

  					const allSameChar = _.#typeaheadBuffer.split('').every((c) => c === key);

  					if (allSameChar) {
  						// cycle through options starting with this letter
  						const startIndex = _.#currentFocusIndex + 1;
  						const len = options.length;
  						for (let i = 0; i < len; i++) {
  							const idx = (startIndex + i) % len;
  							if (options[idx].textContent.trim().toLowerCase().startsWith(key)) {
  								_.focusOption(idx);
  								break;
  							}
  						}
  					} else {
  						// multi-char prefix search from the beginning
  						const match = options.findIndex((opt) =>
  							opt.textContent.trim().toLowerCase().startsWith(_.#typeaheadBuffer)
  						);
  						if (match >= 0) {
  							_.focusOption(match);
  						}
  					}
  				}
  				break;
  		}
  	}

  	/**
  	 * focuses a specific option by index
  	 * @param {number} index - the index of the option to focus
  	 */
  	focusOption(index) {
  		const _ = this;
  		const options = Array.from(_.#options);

  		// reset tabindex on all options
  		options.forEach((opt) => {
  			opt.setAttribute('tabindex', '-1');
  		});

  		// set tabindex on target option and focus it
  		if (options[index]) {
  			options[index].setAttribute('tabindex', '0');
  			options[index].focus();
  			_.#currentFocusIndex = index;

  			// Ensure the option is visible in the dropdown
  			options[index].scrollIntoView({
  				block: 'nearest',
  				behavior: 'instant',
  			});
  		}
  	}

  	/**
  	 * selects an option from the dropdown
  	 * @param {Event} e - the click event
  	 */
  	selectOption(e) {
  		const _ = this;
  		const option = e.target.closest('select-option');
  		if (!option) return;

  		// skip if already selected (match native <select> behavior)
  		const isAlreadySelected = option.getAttribute('aria-selected') === 'true';

  		if (!isAlreadySelected) {
  			_.#applySelection(option);
  			_.dispatchEvent(new Event('change', { bubbles: true }));
  		}

  		// hide the dropdown
  		_.hide();
  	}

  	/**
  	 * Positions the panel so the target option overlays the trigger
  	 * @param {HTMLElement} targetOption - the option to align over the trigger
  	 * @private
  	 */
  	#positionPanel(targetOption) {
  		const _ = this;
  		const panel = _.#optionsContainer;
  		if (!panel) return;

  		const viewportMargin = 8;

  		// Clear previous positioning (the engine owns transform/transformOrigin)
  		panel.style.top = '';
  		panel.style.maxHeight = '';
  		panel.scrollTop = 0;

  		// Measure geometry
  		const hostRect = _.getBoundingClientRect();
  		const triggerRect = _.#trigger.getBoundingClientRect();
  		const triggerOffset = triggerRect.top - hostRect.top;

  		let idealTop = triggerOffset;

  		if (targetOption) {
  			// Shift panel up so target option aligns over the trigger
  			idealTop = triggerOffset - targetOption.offsetTop;
  		}

  		// Max-height: from panel's top edge down to viewport bottom
  		const panelScreenTop = hostRect.top + idealTop;
  		const availableHeight = window.innerHeight - panelScreenTop - viewportMargin;

  		// If panel would start above viewport, clamp top and scroll internally
  		if (panelScreenTop < viewportMargin) {
  			idealTop += viewportMargin - panelScreenTop;
  			panel.style.maxHeight = `${window.innerHeight - viewportMargin * 2}px`;

  			// Scroll so the target option aligns with the trigger's screen position
  			if (targetOption) {
  				const triggerScreenY = triggerRect.top - viewportMargin;
  				panel.scrollTop = Math.max(0, targetOption.offsetTop - triggerScreenY);
  			}
  		} else {
  			panel.style.maxHeight = `${Math.max(availableHeight, 120)}px`;
  		}

  		panel.style.top = `${idealTop}px`;
  	}

  	/**
  	 * shows the dropdown options
  	 *
  	 * The panel morphs out of the trigger via the morph engine. State (`visible`
  	 * attr, aria, document listeners, event) is set synchronously so the scroll
  	 * lock and trigger caret stay coherent; option focus is deferred to the
  	 * engine's `shown` event because the options aren't revealed — and therefore
  	 * not focusable — until the morph lands.
  	 */
  	show() {
  		const _ = this;

  		// bail if already shown
  		if (_.hasAttribute('visible')) return;

  		// set attributes for shown state — `visible` flips synchronously so the
  		// scroll lock stays coherent (aria-expanded is set after engine.show)
  		_.setAttribute('visible', '');
  		_.#optionsContainer.setAttribute('aria-hidden', 'false');

  		// reset typeahead buffer
  		_.#typeaheadBuffer = '';

  		// a reversed mid-hide show supersedes the engine's `hidden` event, so any
  		// pending focus restore from that hide would go stale — clear it
  		_.#pendingFocusRestore = false;

  		// find selected option or default to first
  		const options = Array.from(_.#options);
  		const selectedOption = options.find((opt) => opt.getAttribute('aria-selected') === 'true');
  		const targetOption = selectedOption || options[0];

  		// position the panel before the engine measures it — but only from a
  		// resting state. On a mid-hide reversal the engine keeps its stale
  		// keyframes by design, so repositioning would desync the morph.
  		if (_.#morphEngine.state === 'idle') {
  			_.#positionPanel(targetOption);
  		}

  		// morph the trigger into the panel
  		_.#morphEngine.show({ from: _.#trigger, to: _.#optionsContainer });

  		// rotate the caret only after the engine has frozen the trigger clone, so
  		// the blob keeps the unrotated caret while the morph plays
  		_.#trigger.setAttribute('aria-expanded', 'true');

  		// the engine hides the trigger synchronously, dropping focus to <body>;
  		// anchor focus on the root (tabindex="-1") so document keydown navigation
  		// works mid-flight
  		_.focus({ preventScroll: true });

  		// add global event listeners
  		document.addEventListener('click', _.handlers.documentClick);
  		document.addEventListener('keydown', _.handlers.keyDown);

  		// dispatch show event
  		_.dispatchEvent(new CustomEvent('select-dropdown:show', { bubbles: true }));
  	}

  	/**
  	 * hides the dropdown options
  	 *
  	 * State (attr, aria, document listeners) is torn down synchronously so the
  	 * scroll lock and trigger caret stay coherent; the panel morphs back into the
  	 * trigger and focus is restored to the trigger from the engine's `hidden`
  	 * event (the trigger is visibility:hidden until the morph lands).
  	 * @param {Object} [options] - hide options
  	 * @param {boolean} [options.restoreFocus=true] - whether to return focus to the trigger
  	 */
  	hide({ restoreFocus = true } = {}) {
  		const _ = this;
  		const wasOpen = _.hasAttribute('visible');

  		// reset typeahead buffer
  		_.#typeaheadBuffer = '';
  		clearTimeout(_.#typeaheadTimer);

  		// set attributes for hidden state — `visible` flips synchronously so the
  		// scroll lock and trigger caret stay coherent with the morph
  		_.removeAttribute('visible');
  		_.#optionsContainer?.setAttribute('aria-hidden', 'true');
  		_.#trigger?.setAttribute('aria-expanded', 'false');

  		// reset the current focus index
  		_.#currentFocusIndex = -1;

  		// remove global event listeners
  		document.removeEventListener('click', _.handlers.documentClick);
  		document.removeEventListener('keydown', _.handlers.keyDown);

  		// nothing was open (e.g. the initial hide from connectedCallback) — bail
  		// before touching the engine
  		if (!wasOpen) return;

  		// the trigger is visibility:hidden until the morph lands, so defer its
  		// focus to the `hidden` handler; park focus on the root in the meantime so
  		// document keydown navigation keeps working while the panel morphs away
  		if (_.contains(document.activeElement)) {
  			_.focus({ preventScroll: true });
  		}
  		_.#pendingFocusRestore = restoreFocus;

  		// morph the panel back into the trigger — only while a morph is live
  		if (_.#morphEngine.state === 'shown' || _.#morphEngine.state === 'showing') {
  			_.#morphEngine.hide();
  		}

  		// dispatch hide event
  		_.dispatchEvent(new CustomEvent('select-dropdown:hide', { bubbles: true }));
  	}
  }

  /**
   * select-trigger component
   * @class SelectTrigger
   * @extends HTMLElement
   */
  class SelectTrigger extends HTMLElement {
  	constructor() {
  		super();
  		const _ = this;

  		// Make the trigger focusable
  		_.setAttribute('tabindex', '0');
  		_.handlers = {};
  		_.handlers.keyDown = _.#onKeyDown.bind(_);
  		_.handlers.click = _.#onClick.bind(_);
  	}

  	connectedCallback() {
  		const _ = this;

  		// Add icon if not present
  		if (!_.querySelector('.select-icon')) {
  			const caret = document.createElement('span');
  			caret.className = 'select-icon';
  			_.appendChild(caret);
  		}

  		_.attachListeners();
  	}

  	disconnectedCallback() {
  		this.detachListeners();
  	}

  	/**
  	 * Attaches event listeners to the trigger
  	 */
  	attachListeners() {
  		const _ = this;
  		_.addEventListener('keydown', _.handlers.keyDown);
  		_.addEventListener('click', _.handlers.click);
  	}

  	/**
  	 * Detaches event listeners from the trigger
  	 */
  	detachListeners() {
  		const _ = this;
  		_.removeEventListener('keydown', _.handlers.keyDown);
  		_.removeEventListener('click', _.handlers.click);
  	}

  	/**
  	 * Handle keydown events on the trigger
  	 * @param {KeyboardEvent} e - The keyboard event
  	 * @private
  	 */
  	#onKeyDown(e) {
  		if (e.key === 'Enter' || e.key === ' ') {
  			e.preventDefault();
  			e.stopPropagation();
  			this.#toggleDropdown();
  			return;
  		}

  		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
  			e.preventDefault();
  			const dropdown = this.closest('select-dropdown');
  			if (dropdown && !dropdown.hasAttribute('visible')) {
  				e.stopPropagation();
  				this.#toggleDropdown();
  			}
  		}
  	}

  	/**
  	 * Handle click events on the trigger
  	 * @param {MouseEvent} e - The mouse event
  	 * @private
  	 */
  	#onClick(e) {
  		this.#toggleDropdown();
  	}

  	/**
  	 * Toggle the parent dropdown
  	 * @private
  	 */
  	#toggleDropdown() {
  		const dropdown = this.closest('select-dropdown');
  		if (!dropdown) return;
  		if (dropdown.hasAttribute('visible')) {
  			dropdown.hide();
  		} else {
  			dropdown.show();
  		}
  	}
  }

  /**
   * select-panel component
   * @class SelectPanel
   * @extends HTMLElement
   */
  class SelectPanel extends HTMLElement {
  	constructor() {
  		super();
  	}
  }

  /**
   * select-option component
   * @class SelectOption
   * @extends HTMLElement
   */
  class SelectOption extends HTMLElement {
  	constructor() {
  		super();
  		const _ = this;
  		_.handlers = {};
  		_.handlers.click = _.#onClick.bind(_);
  	}

  	connectedCallback() {
  		this.attachListeners();
  	}

  	disconnectedCallback() {
  		this.detachListeners();
  	}

  	/**
  	 * Attaches event listeners to the option
  	 */
  	attachListeners() {
  		this.addEventListener('click', this.handlers.click);
  	}

  	/**
  	 * Detaches event listeners from the option
  	 */
  	detachListeners() {
  		this.removeEventListener('click', this.handlers.click);
  	}

  	/**
  	 * Handle click events on the option
  	 * @param {MouseEvent} e - The mouse event
  	 * @private
  	 */
  	#onClick(e) {
  		e.preventDefault();
  		this.#notifySelection();
  	}

  	/**
  	 * Notify the parent dropdown that this option was selected
  	 * @private
  	 */
  	#notifySelection() {
  		const dropdown = this.closest('select-dropdown');
  		if (dropdown && typeof dropdown.selectOption === 'function') {
  			dropdown.selectOption({ target: this });
  		}
  	}
  }

  /**
   * select-divider component - visual separator between option groups
   * @class SelectDivider
   * @extends HTMLElement
   */
  class SelectDivider extends HTMLElement {
  	constructor() {
  		super();
  		this.setAttribute('role', 'separator');
  	}
  }

  /**
   * select-label component - non-interactive group heading within a select panel
   * @class SelectLabel
   * @extends HTMLElement
   */
  class SelectLabel extends HTMLElement {
  	constructor() {
  		super();
  		this.setAttribute('role', 'presentation');
  	}
  }

  /**
   * @file Main entry point for select-dropdown web component
   * @author Cory Schulz
   * @version 0.1.0
   */


  // define custom elements if not already defined
  if (!customElements.get('select-dropdown')) {
  	customElements.define('select-dropdown', SelectDropdown);
  }

  if (!customElements.get('select-trigger')) {
  	customElements.define('select-trigger', SelectTrigger);
  }

  if (!customElements.get('select-panel')) {
  	customElements.define('select-panel', SelectPanel);
  }

  if (!customElements.get('select-option')) {
  	customElements.define('select-option', SelectOption);
  }

  if (!customElements.get('select-divider')) {
  	customElements.define('select-divider', SelectDivider);
  }

  if (!customElements.get('select-label')) {
  	customElements.define('select-label', SelectLabel);
  }

  exports.SelectDivider = SelectDivider;
  exports.SelectDropdown = SelectDropdown;
  exports.SelectLabel = SelectLabel;
  exports.SelectOption = SelectOption;
  exports.SelectPanel = SelectPanel;
  exports.SelectTrigger = SelectTrigger;

}));
