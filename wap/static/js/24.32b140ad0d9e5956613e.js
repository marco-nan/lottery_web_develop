webpackJsonp([24, 55], {
	1: function (t, e, n) {
		var i;
		i = function (t, e, n) {
			"use strict";
			function i() {}
			function o(t, e) {
				var n;
				return Object.create ? n = Object.create(t) : (i.prototype = t, n = new i),
				n.constructor = e,
				n
			}
			function r(t, e) {
				if (t) {
					if (t.nodeType)
						return [t];
					var e = e && e.nodeType ? e : document;
					return t && "string" == typeof t ? e.querySelectorAll(t) : void 0
				}
			}
			for (var s = /\\?\{([^{}]+)\}/g, a = "", l = /^[\s\xa0]+|[\s\xa0]+$/g, c = String.prototype.trim, u = c ? function (t) {
				return null == t ? a : c.call(t)
			}
				 : function (t) {
				return null == t ? a : (t + "").replace(l, a)
			}, f = 0, d = function (t) {
				var e = t.offsetTop;
				return null != t.offsetParent && (e += d(t.offsetParent)),
				e
			}, p = function (t) {
				var e = t.offsetLeft;
				return null != t.offsetParent && (e += p(t.offsetParent)),
				e
			}, h = ({
					isObject: function (t) {
						return t === Object(t)
					},
					isArray: Array.isArray || function (t) {
						return "[object Array]" == toString.call(t)
					},
					isEmpty: function (t) {
						if (null == t)
							return !0;
						if (this.isArray(t) || this.isString(t))
							return 0 === t.length;
						for (var e in t)
							if (this.has(t, e))
								return !1;
						return !0
					},
					mix: function (t, e, n) {
						for (var i in e)
							t[i] = e[i];
						return t
					},
					extend: function (t, e, n, i) {
						if (!e || !t)
							return t;
						var r,
						s = e.prototype;
						return r = o(s, t),
						t.prototype = this.mix(r, t.prototype),
						t.superclass = o(s, e),
						n && this.mix(r, n),
						i && this.mix(t, i),
						t
					},
					startsWith: function (t, e) {
						return 0 === t.lastIndexOf(e, 0)
					},
					endsWith: function (t, e) {
						var n = t.length - e.length;
						return n >= 0 && t.indexOf(e, n) === n
					},
					trim: u,
					substitute: function (t, e, n) {
						return "string" == typeof t && e ? t.replace(n || s, function (t, n) {
							return "\\" === t.charAt(0) ? t.slice(1) : void 0 === e[n] ? a : e[n]
						}) : t
					},
					vendor: function () {
						for (var t, e = document.createElement("div").style, n = ["t", "webkitT", "MozT", "msT", "OT"], i = 0, o = n.length; i < o; i++)
							if (t = n[i] + "ransform", t in e)
								return n[i].substr(0, n[i].length - 1);
							return !1
						}
						(),
						prefixStyle: function (t) {
							return this.vendor !== !1 && ("" === this.vendor ? t : this.vendor + t.charAt(0).toUpperCase() + t.substr(1))
						},
						hasClass: function (t, e) {
							return t && t.className && e && t.className.indexOf(e) != -1
						},
						addClass: function (t, e) {
							t && e && !this.hasClass(t, e) && (t.className += " " + e)
						},
						removeClass: function (t, e) {
							t && t.className && e && (t.className = t.className.replace(e, ""))
						},
						remove: function (t) {
							t && t.parentNode && t.parentNode.removeChild(t)
						},
						getOffsetTop: d,
						getOffsetLeft: p,
						findParentEl: function (t, e, n) {
							var i = null,
							o = null,
							r = /^#/.test(e) ? "id" : /^\./.test(e) ? "class" : "tag",
							s = e.replace(/\.|#/g, "");
							if (n && "string" == typeof n && (n = document.querySelector(n)), n = n || document.body, t && e) {
								if ("class" == r && t.className && t.className.match(s))
									return t;
								if ("id" == r && t.id && u(t.id) == s)
									return t;
								if ("tag" == r && t.tagName.toLowerCase() == s)
									return t;
								for (; !i && o != n && (o = t.parentNode); ) {
									if ("class" == r && o.className && o.className.match(s) || "id" == r && o.id && u(o.id) == s || "tag" == r && o.tagName && o.tagName.toLowerCase() == s)
										return i = o;
									t = o
								}
								return null
							}
						},
						guid: function (t) {
							var e = ++f + "";
							return t ? t + e : e
						},
						isAndroid: function () {
							return /Android /.test(window.navigator.appVersion)
						},
						isBadAndroid: function () {
							return /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion)
						},
						px2Num: function (t) {
							return Number(t.replace(/px/, ""))
						},
						getNodes: r,
						getNode: function (t, e) {
							var n = r(t, e);
							return n && n[0]
						},
						stringifyStyle: function (t) {
							var e = "";
							for (var n in t)
								e += [n, ":", t[n], ";"].join("");
							return e
						}
					}), g = ["Arguments", "Function", "String", "Number", "Date", "RegExp"], v = 0; v < g.length; v++)h["is" + g[v]] = function (t) {
					return toString.call(t) == "[object " + g[v] + "]"
				};
			return "object" == typeof n && n.exports ? void(n.exports = h) : h
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	5: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			var o = n(1),
			r = n(61),
			s = function () {};
			return o.mix(s.prototype, r),
			o.mix(s.prototype, {
				plug: function (t) {
					var e = this;
					if (t && t.pluginId) {
						e.__plugins || (e.__plugins = []);
						var n = e.getPlugin(t.pluginId);
						return n && e.unplug(t.pluginId),
						t.pluginInitializer(e),
						e.__plugins.push(t),
						e
					}
				},
				unplug: function (t) {
					var e = this;
					if (t && e.__plugins) {
						var n = "string" == typeof t ? e.getPlugin(t) : t;
						n.pluginDestructor(e);
						for (var i = 0, o = e.__plugins.length; i < o; i++)
							if (e.__plugins[i] == n)
								return e.__plugins.splice(i, 1)
					}
				},
				getPlugin: function (t) {
					var e = this,
					n = [];
					if (e.__plugins) {
						for (var i = 0, o = e.__plugins.length; i < o; i++)
							e.__plugins[i] && e.__plugins[i].pluginId == t && n.push(e.__plugins[i]);
						return n.length > 1 ? n : n[0] || null
					}
				}
			}),
			"object" == typeof i && i.exports ? void(i.exports = s) : s
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	7: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			function o(t) {
				return Math.round(1e5 * parseFloat(t)) / 1e5
			}
			function r() {
				return {
					translateX: 0,
					translateY: 0,
					rotate: 0,
					skewX: 0,
					skewY: 0,
					scaleX: 1,
					scaleY: 1
				}
			}
			function s(t) {
				return t = t.split(/,/),
				t = Array.prototype.map.call(t, function (t) {
						return o(t)
					})
			}
			function a(t) {
				t = s(t);
				var e,
				n,
				i,
				r = t[0],
				a = t[1],
				l = t[2],
				c = t[3];
				return r * c - a * l ? (e = Math.sqrt(r * r + a * a), i = (r * l + a * c) / (r * c - l * a), n = (r * c - a * l) / e, r * c < a * l && (i = -i, e = -e)) : e = n = i = 0, {
					translateX: o(t[4]),
					translateY: o(t[5]),
					rotate: o(180 * Math.atan2(a, r) / Math.PI),
					skewX: o(180 * Math.atan(i) / Math.PI),
					skewY: 0,
					scaleX: o(e),
					scaleY: o(n)
				}
			}
			function l(t) {
				t = t.split(")");
				for (var e, n, i, s = p.trim, l = -1, c = t.length - 1, u = r(); ++l < c; )
					switch (e = t[l].split("("), n = s(e[0]), i = e[1], n) {
					case "translateX":
					case "translateY":
					case "scaleX":
					case "scaleY":
						u[n] = o(i);
						break;
					case "translate":
					case "translate3d":
						i = i.split(","),
						u.translateX = o(i[0]),
						u.translateY = o(i[1] || 0);
						break;
					case "scale":
						i = i.split(","),
						u.scaleX = o(i[0]),
						u.scaleY = o(i[1] || i[0]);
						break;
					case "matrix":
						return a(i)
					}
				return u
			}
			function c(t, e) {
				if (t && e && e.css) {
					var n = this;
					n.cfg = e,
					n.el = t;
					var i = e.duration || 0,
					o = e.easing || "ease";
					e.delay || 0;
					return e.run && (n.timer = n.timer || new h({
								duration: Math.round(i),
								easing: o
							}), n.timer.on("run", e.run)),
					n._bindEvt(),
					n
				}
			}
			function u(t, e) {
				var n = l(t),
				i = l(e),
				o = {};
				for (var r in i)
					o[r] = {
						prevVal: n[r],
						newVal: i[r]
					};
				return o
			}
			function f(t, e, n, i, o) {
				n = isNaN(Number(n)) ? 0 : Number(n);
				var r = (i - n) * o + n;
				d(t, e, r)
			}
			function d(t, e, n) {
				switch (e) {
				case "scrollTop":
				case "scrollLeft":
					t[e] = n;
					break;
				case "transform":
					t.style[m] = n;
				case "opacity":
					t.style[e] = n
				}
			}
			var p = n(1),
			h = n(13),
			g = n(12),
			v = n(5),
			m = p.prefixStyle("transform"),
			y = p.prefixStyle("transition"),
			x = (p.prefixStyle("transitionDuration"), p.prefixStyle("transformOrigin"), p.vendor ? p.prefixStyle("transitionEnd") : "transitionend"),
			b = (p.vendor ? ["-", p.vendor, "-transform"].join("") : "transform", "translateX({translateX}px) translateY({translateY}px) translateZ(0)"),
			_ = {
				transform: !0,
				opacity: !0,
				scrollTop: !0,
				scrollLeft: !0
			};
			return p.extend(c, v, {
				run: function () {
					var t = this,
					e = t.cfg,
					n = t.el,
					i = e.duration || 0,
					o = e.easing || "ease",
					r = e.delay || 0;
					if (t.__isTransitionEnd = !1, clearTimeout(t.__itv), t.timer && t.timer.run(), i <= h.MIN_DURATION) {
						for (var s in e.css)
							d(n, s, e.css[s]);
						return t.stop(),
						void t.__handlers.stop.call(t)
					}
					if (p.isBadAndroid() && (e.useTransition = !1), e.useTransition) {
						n.style[y] = p.substitute("all {duration}ms {easing} {delay}ms", {
								duration: Math.round(i),
								easing: g.format(o),
								delay: r
							});
						for (var s in e.css)
							d(n, s, e.css[s]);
						t.__itv = setTimeout(function () {
								t.__isTransitionEnd || (t.__isTransitionEnd = !0, t.trigger("transitionend"))
							}, Number(i) + 60)
					} else if (t.computeStyle = t.computeStyle || window.getComputedStyle(n), e.css.transform && t.timer) {
						t.transmap = u(t.computeStyle[m], e.css.transform);
						t.timer.off("run", t.__handlers.transRun),
						t.timer.on("run", t.__handlers.transRun, t),
						t.timer.off("end", t.__handlers.transRun),
						t.timer.on("end", t.__handlers.transRun, t)
					}
					return t
				},
				_transitionEndHandler: function (t) {
					var e = this;
					e.stop(),
					e.__handlers.stop.call(e)
				},
				__handlers: {
					transRun: function (t) {
						var e = this,
						n = e.transmap,
						i = e.el,
						o = {};
						for (var r in n)
							o[r] = (n[r].newVal - n[r].prevVal) * t.percent + n[r].prevVal;
						var s = p.substitute(b + " scale({scaleX},{scaleY})", o);
						i.style[m] = s
					},
					stop: function (t) {
						var e = this,
						n = e.cfg;
						n.end && n.end({
							percent: 1
						})
					}
				},
				_bindEvt: function () {
					var t = this,
					e = t.cfg,
					n = t.el;
					t.el.addEventListener(x, function (e) {
						t.__isTransitionEnd = !0,
						e.target === e.currentTarget && t.trigger("transitionend", e)
					}),
					t.on("transitionend", t._transitionEndHandler, t);
					var i = function (i) {
						t.computeStyle = t.computeStyle || window.getComputedStyle(n);
						for (var o in e.css)
							 / transform / .test(o) || f(t.el, o, t.computeStyle[o], e.css[o], i.percent)
					};
					t.timer && t.timer.on("run", i),
					t.timer && t.timer.on("stop", t.__handlers.stop, t)
				},
				stop: function () {
					var t = this;
					if (t.cfg.useTransition && t.cfg.duration > h.MIN_DURATION) {
						var e = window.getComputedStyle(this.el);
						for (var n in t.cfg.css)
							if (_[n]) {
								var i = /transform/.test(n) ? e[m] : e[n];
								d(t.el, n, p.substitute(b + " scale({scaleX},{scaleY})", l(i)))
							}
						t.el.style[y] = "none"
					}
					return t.timer && t.timer.stop() && t.timer.reset(),
					t.computeStyle = null,
					t
				},
				reset: function (t) {
					var e = this;
					return e.computeStyle = null,
					p.mix(e.cfg, t),
					this.timer && e.timer.reset({
						duration: Math.round(e.cfg.duration),
						easing: e.cfg.easing
					}),
					e
				}
			}),
			"object" == typeof i && i.exports ? void(i.exports = c) : c
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	9: function (t, e, n) {
		var i;
		i = function (t, e, n) {
			/*! Hammer.JS - v2.0.4 - 2014-09-28
			 * http://hammerjs.github.io/
			 *
			 * Copyright (c) 2014 Jorik Tangelder;
			 * Licensed under the MIT license */
			"use strict";
			function i(t, e, n) {
				return setTimeout(c(t, n), e)
			}
			function o(t, e, n) {
				return !!Array.isArray(t) && (r(t, n[e], n), !0)
			}
			function r(t, e, n) {
				var i;
				if (t)
					if (t.forEach)
						t.forEach(e, n);
					else if (void 0 !== t.length)
						for (i = 0; i < t.length; )
							e.call(n, t[i], i, t), i++;
					else
						for (i in t)
							t.hasOwnProperty(i) && e.call(n, t[i], i, t)
			}
			function s(t, e, n) {
				for (var i = Object.keys(e), o = 0; o < i.length; )
					(!n || n && void 0 === t[i[o]]) && (t[i[o]] = e[i[o]]), o++;
				return t
			}
			function a(t, e) {
				return s(t, e, !0)
			}
			function l(t, e, n) {
				var i,
				o = e.prototype;
				i = t.prototype = Object.create(o),
				i.constructor = t,
				i._super = o,
				n && s(i, n)
			}
			function c(t, e) {
				return function () {
					return t.apply(e, arguments)
				}
			}
			function u(t, e) {
				return typeof t == ct ? t.apply(e ? e[0] || void 0 : void 0, e) : t
			}
			function f(t, e) {
				return void 0 === t ? e : t
			}
			function d(t, e, n) {
				r(v(e), function (e) {
					t.addEventListener(e, n, !1)
				})
			}
			function p(t, e, n) {
				r(v(e), function (e) {
					t.removeEventListener(e, n, !1)
				})
			}
			function h(t, e) {
				for (; t; ) {
					if (t == e)
						return !0;
					t = t.parentNode
				}
				return !1
			}
			function g(t, e) {
				return t.indexOf(e) > -1
			}
			function v(t) {
				return t.trim().split(/\s+/g)
			}
			function m(t, e, n) {
				if (t.indexOf && !n)
					return t.indexOf(e);
				for (var i = 0; i < t.length; ) {
					if (n && t[i][n] == e || !n && t[i] === e)
						return i;
					i++
				}
				return -1
			}
			function y(t) {
				return Array.prototype.slice.call(t, 0)
			}
			function x(t, e, n) {
				for (var i = [], o = [], r = 0; r < t.length; ) {
					var s = e ? t[r][e] : t[r];
					m(o, s) < 0 && i.push(t[r]),
					o[r] = s,
					r++
				}
				return n && (i = e ? i.sort(function (t, n) {
							return t[e] > n[e]
						}) : i.sort()),
				i
			}
			function b(t, e) {
				for (var n, i, o = e[0].toUpperCase() + e.slice(1), r = 0; r < at.length; ) {
					if (n = at[r], i = n ? n + o : e, i in t)
						return i;
					r++
				}
			}
			function _() {
				return pt++
			}
			function w(t) {
				var e = t.ownerDocument;
				return e.defaultView || e.parentWindow
			}
			function C(t, e) {
				var n = this;
				this.manager = t,
				this.callback = e,
				this.element = t.element,
				this.target = t.options.inputTarget,
				this.domHandler = function (e) {
					u(t.options.enable, [t]) && n.handler(e)
				},
				this.init()
			}
			function T(t) {
				var e,
				n = t.options.inputClass;
				return new(e = n ? n : vt ? X : mt ? F : gt ? j : P)(t, k)
			}
			function k(t, e, n) {
				var i = n.pointers.length,
				o = n.changedPointers.length,
				r = e & Ct && i - o === 0,
				s = e & (kt | St) && i - o === 0;
				n.isFirst = !!r,
				n.isFinal = !!s,
				r && (t.session = {}),
				n.eventType = e,
				S(t, n),
				t.emit("hammer.input", n),
				t.recognize(n),
				t.session.prevInput = n
			}
			function S(t, e) {
				var n = t.session,
				i = e.pointers,
				o = i.length;
				n.firstInput || (n.firstInput = L(e)),
				o > 1 && !n.firstMultiple ? n.firstMultiple = L(e) : 1 === o && (n.firstMultiple = !1);
				var r = n.firstInput,
				s = n.firstMultiple,
				a = s ? s.center : r.center,
				l = e.center = N(i);
				e.timeStamp = dt(),
				e.deltaTime = e.timeStamp - r.timeStamp,
				e.angle = Y(a, l),
				e.distance = A(a, l),
				E(n, e),
				e.offsetDirection = I(e.deltaX, e.deltaY),
				e.scale = s ? M(s.pointers, i) : 1,
				e.rotation = s ? B(s.pointers, i) : 0,
				O(n, e);
				var c = t.element;
				h(e.srcEvent.target, c) && (c = e.srcEvent.target),
				e.target = c
			}
			function E(t, e) {
				var n = e.center,
				i = t.offsetDelta || {},
				o = t.prevDelta || {},
				r = t.prevInput || {};
				e.eventType !== Ct && r.eventType !== kt || (o = t.prevDelta = {
						x: r.deltaX || 0,
						y: r.deltaY || 0
					}, i = t.offsetDelta = {
						x: n.x,
						y: n.y
					}),
				e.deltaX = o.x + (n.x - i.x),
				e.deltaY = o.y + (n.y - i.y)
			}
			function O(t, e) {
				var n,
				i,
				o,
				r,
				s = t.lastInterval || e,
				a = e.timeStamp - s.timeStamp;
				if (e.eventType != St && (a > wt || void 0 === s.velocity)) {
					var l = s.deltaX - e.deltaX,
					c = s.deltaY - e.deltaY,
					u = R(a, l, c);
					i = u.x,
					o = u.y,
					n = ft(u.x) > ft(u.y) ? u.x : u.y,
					r = I(l, c),
					t.lastInterval = e
				} else
					n = s.velocity, i = s.velocityX, o = s.velocityY, r = s.direction;
				e.velocity = n,
				e.velocityX = i,
				e.velocityY = o,
				e.direction = r
			}
			function L(t) {
				for (var e = [], n = 0; n < t.pointers.length; )
					e[n] = {
						clientX: ut(t.pointers[n].clientX),
						clientY: ut(t.pointers[n].clientY)
					},
				n++;
				return {
					timeStamp: dt(),
					pointers: e,
					center: N(e),
					deltaX: t.deltaX,
					deltaY: t.deltaY
				}
			}
			function N(t) {
				var e = t.length;
				if (1 === e)
					return {
						x: ut(t[0].clientX),
						y: ut(t[0].clientY)
					};
				for (var n = 0, i = 0, o = 0; o < e; )
					n += t[o].clientX, i += t[o].clientY, o++;
				return {
					x: ut(n / e),
					y: ut(i / e)
				}
			}
			function R(t, e, n) {
				return {
					x: e / t || 0,
					y: n / t || 0
				}
			}
			function I(t, e) {
				return t === e ? Et : ft(t) >= ft(e) ? t > 0 ? Ot : Lt : e > 0 ? Nt : Rt
			}
			function A(t, e, n) {
				n || (n = Bt);
				var i = e[n[0]] - t[n[0]],
				o = e[n[1]] - t[n[1]];
				return Math.sqrt(i * i + o * o)
			}
			function Y(t, e, n) {
				n || (n = Bt);
				var i = e[n[0]] - t[n[0]],
				o = e[n[1]] - t[n[1]];
				return 180 * Math.atan2(o, i) / Math.PI
			}
			function B(t, e) {
				return Y(e[1], e[0], Mt) - Y(t[1], t[0], Mt)
			}
			function M(t, e) {
				return A(e[0], e[1], Mt) / A(t[0], t[1], Mt)
			}
			function P() {
				this.evEl = Xt,
				this.evWin = Dt,
				this.allow = !0,
				this.pressed = !1,
				C.apply(this, arguments)
			}
			function X() {
				this.evEl = zt,
				this.evWin = jt,
				C.apply(this, arguments),
				this.store = this.manager.session.pointerEvents = []
			}
			function D() {
				this.evTarget = Ut,
				this.evWin = qt,
				this.started = !1,
				C.apply(this, arguments)
			}
			function H(t, e) {
				var n = y(t.touches),
				i = y(t.changedTouches);
				return e & (kt | St) && (n = x(n.concat(i), "identifier", !0)),
				[n, i]
			}
			function F() {
				this.evTarget = Vt,
				this.targetIds = {},
				C.apply(this, arguments)
			}
			function z(t, e) {
				var n = y(t.touches),
				i = this.targetIds;
				if (e & (Ct | Tt) && 1 === n.length)
					return i[n[0].identifier] = !0, [n, n];
				var o,
				r,
				s = y(t.changedTouches),
				a = [],
				l = this.target;
				if (r = n.filter(function (t) {
							return h(t.target, l)
						}), e === Ct)
					for (o = 0; o < r.length; )
						i[r[o].identifier] = !0, o++;
				for (o = 0; o < s.length; )
					i[s[o].identifier] && a.push(s[o]), e & (kt | St) && delete i[s[o].identifier], o++;
				return a.length ? [x(r.concat(a), "identifier", !0), a] : void 0
			}
			function j() {
				C.apply(this, arguments);
				var t = c(this.handler, this);
				this.touch = new F(this.manager, t),
				this.mouse = new P(this.manager, t)
			}
			function G(t, e) {
				this.manager = t,
				this.set(e)
			}
			function U(t) {
				if (g(t, te))
					return te;
				var e = g(t, ee),
				n = g(t, ne);
				return e && n ? ee + " " + ne : e || n ? e ? ee : ne : g(t, Qt) ? Qt : Jt
			}
			function q(t) {
				this.id = _(),
				this.manager = null,
				this.options = a(t || {}, this.defaults),
				this.options.enable = f(this.options.enable, !0),
				this.state = ie,
				this.simultaneous = {},
				this.requireFail = []
			}
			function W(t) {
				return t & le ? "cancel" : t & se ? "end" : t & re ? "move" : t & oe ? "start" : ""
			}
			function V(t) {
				return t == Rt ? "down" : t == Nt ? "up" : t == Ot ? "left" : t == Lt ? "right" : ""
			}
			function $(t, e) {
				var n = e.manager;
				return n ? n.get(t) : t
			}
			function Z() {
				q.apply(this, arguments)
			}
			function K() {
				Z.apply(this, arguments),
				this.pX = null,
				this.pY = null
			}
			function J() {
				Z.apply(this, arguments)
			}
			function Q() {
				q.apply(this, arguments),
				this._timer = null,
				this._input = null
			}
			function tt() {
				Z.apply(this, arguments)
			}
			function et() {
				Z.apply(this, arguments)
			}
			function nt() {
				q.apply(this, arguments),
				this.pTime = !1,
				this.pCenter = !1,
				this._timer = null,
				this._input = null,
				this.count = 0
			}
			function it(t, e) {
				return e = e || {},
				e.recognizers = f(e.recognizers, it.defaults.preset),
				new ot(t, e)
			}
			function ot(t, e) {
				e = e || {},
				this.options = a(e, it.defaults),
				this.options.inputTarget = this.options.inputTarget || t,
				this.handlers = {},
				this.session = {},
				this.recognizers = [],
				this.element = t,
				this.input = T(this),
				this.touchAction = new G(this, this.options.touchAction),
				rt(this, !0),
				r(e.recognizers, function (t) {
					var e = this.add(new t[0](t[1]));
					t[2] && e.recognizeWith(t[2]),
					t[3] && e.requireFailure(t[3])
				}, this)
			}
			function rt(t, e) {
				var n = t.element;
				r(t.options.cssProps, function (t, i) {
					n.style[b(n.style, i)] = e ? t : ""
				})
			}
			function st(t, e) {
				var n = document.createEvent("Event");
				n.initEvent(t, !0, !0),
				n.gesture = e,
				e.target.dispatchEvent(n)
			}
			var at = ["", "webkit", "moz", "MS", "ms", "o"],
			lt = document.createElement("div"),
			ct = "function",
			ut = Math.round,
			ft = Math.abs,
			dt = Date.now,
			pt = 1,
			ht = /mobile|tablet|ip(ad|hone|od)|android/i,
			gt = "ontouchstart" in window,
			vt = void 0 !== b(window, "PointerEvent"),
			mt = gt && ht.test(navigator.userAgent),
			yt = "touch",
			xt = "pen",
			bt = "mouse",
			_t = "kinect",
			wt = 25,
			Ct = 1,
			Tt = 2,
			kt = 4,
			St = 8,
			Et = 1,
			Ot = 2,
			Lt = 4,
			Nt = 8,
			Rt = 16,
			It = Ot | Lt,
			At = Nt | Rt,
			Yt = It | At,
			Bt = ["x", "y"],
			Mt = ["clientX", "clientY"];
			C.prototype = {
				handler: function () {},
				init: function () {
					this.evEl && d(this.element, this.evEl, this.domHandler),
					this.evTarget && d(this.target, this.evTarget, this.domHandler),
					this.evWin && d(w(this.element), this.evWin, this.domHandler)
				},
				destroy: function () {
					this.evEl && p(this.element, this.evEl, this.domHandler),
					this.evTarget && p(this.target, this.evTarget, this.domHandler),
					this.evWin && p(w(this.element), this.evWin, this.domHandler)
				}
			};
			var Pt = {
				mousedown: Ct,
				mousemove: Tt,
				mouseup: kt
			},
			Xt = "mousedown",
			Dt = "mousemove mouseup";
			l(P, C, {
				handler: function (t) {
					var e = Pt[t.type];
					e & Ct && 0 === t.button && (this.pressed = !0),
					e & Tt && 1 !== t.which && (e = kt),
					this.pressed && this.allow && (e & kt && (this.pressed = !1), this.callback(this.manager, e, {
							pointers: [t],
							changedPointers: [t],
							pointerType: bt,
							srcEvent: t
						}))
				}
			});
			var Ht = {
				pointerdown: Ct,
				pointermove: Tt,
				pointerup: kt,
				pointercancel: St,
				pointerout: St
			},
			Ft = {
				2: yt,
				3: xt,
				4: bt,
				5: _t
			},
			zt = "pointerdown",
			jt = "pointermove pointerup pointercancel";
			window.MSPointerEvent && (zt = "MSPointerDown", jt = "MSPointerMove MSPointerUp MSPointerCancel"),
			l(X, C, {
				handler: function (t) {
					var e = this.store,
					n = !1,
					i = t.type.toLowerCase().replace("ms", ""),
					o = Ht[i],
					r = Ft[t.pointerType] || t.pointerType,
					s = r == yt,
					a = m(e, t.pointerId, "pointerId");
					o & Ct && (0 === t.button || s) ? a < 0 && (e.push(t), a = e.length - 1) : o & (kt | St) && (n = !0),
					a < 0 || (e[a] = t, this.callback(this.manager, o, {
							pointers: e,
							changedPointers: [t],
							pointerType: r,
							srcEvent: t
						}), n && e.splice(a, 1))
				}
			});
			var Gt = {
				touchstart: Ct,
				touchmove: Tt,
				touchend: kt,
				touchcancel: St
			},
			Ut = "touchstart",
			qt = "touchstart touchmove touchend touchcancel";
			l(D, C, {
				handler: function (t) {
					var e = Gt[t.type];
					if (e === Ct && (this.started = !0), this.started) {
						var n = H.call(this, t, e);
						e & (kt | St) && n[0].length - n[1].length === 0 && (this.started = !1),
						this.callback(this.manager, e, {
							pointers: n[0],
							changedPointers: n[1],
							pointerType: yt,
							srcEvent: t
						})
					}
				}
			});
			var Wt = {
				touchstart: Ct,
				touchmove: Tt,
				touchend: kt,
				touchcancel: St
			},
			Vt = "touchstart touchmove touchend touchcancel";
			l(F, C, {
				handler: function (t) {
					var e = Wt[t.type],
					n = z.call(this, t, e);
					n && this.callback(this.manager, e, {
						pointers: n[0],
						changedPointers: n[1],
						pointerType: yt,
						srcEvent: t
					})
				}
			}),
			l(j, C, {
				handler: function (t, e, n) {
					var i = n.pointerType == yt,
					o = n.pointerType == bt;
					if (i)
						this.mouse.allow = !1;
					else if (o && !this.mouse.allow)
						return;
					e & (kt | St) && (this.mouse.allow = !0),
					this.callback(t, e, n)
				},
				destroy: function () {
					this.touch.destroy(),
					this.mouse.destroy()
				}
			});
			var $t = b(lt.style, "touchAction"),
			Zt = void 0 !== $t,
			Kt = "compute",
			Jt = "auto",
			Qt = "manipulation",
			te = "none",
			ee = "pan-x",
			ne = "pan-y";
			G.prototype = {
				set: function (t) {
					t == Kt && (t = this.compute()),
					Zt && (this.manager.element.style[$t] = t),
					this.actions = t.toLowerCase().trim()
				},
				update: function () {
					this.set(this.manager.options.touchAction)
				},
				compute: function () {
					var t = [];
					return r(this.manager.recognizers, function (e) {
						u(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
					}),
					U(t.join(" "))
				},
				preventDefaults: function (t) {
					if (!Zt) {
						var e = t.srcEvent,
						n = t.offsetDirection;
						if (this.manager.session.prevented)
							return void e.preventDefault();
						var i = this.actions,
						o = g(i, te),
						r = g(i, ne),
						s = g(i, ee);
						return o || r && n & It || s && n & At ? this.preventSrc(e) : void 0
					}
				},
				preventSrc: function (t) {
					this.manager.session.prevented = !0,
					t.preventDefault()
				}
			};
			var ie = 1,
			oe = 2,
			re = 4,
			se = 8,
			ae = se,
			le = 16,
			ce = 32;
			q.prototype = {
				defaults: {},
				set: function (t) {
					return s(this.options, t),
					this.manager && this.manager.touchAction.update(),
					this
				},
				recognizeWith: function (t) {
					if (o(t, "recognizeWith", this))
						return this;
					var e = this.simultaneous;
					return t = $(t, this),
					e[t.id] || (e[t.id] = t, t.recognizeWith(this)),
					this
				},
				dropRecognizeWith: function (t) {
					return o(t, "dropRecognizeWith", this) ? this : (t = $(t, this), delete this.simultaneous[t.id], this)
				},
				requireFailure: function (t) {
					if (o(t, "requireFailure", this))
						return this;
					var e = this.requireFail;
					return t = $(t, this),
					m(e, t) === -1 && (e.push(t), t.requireFailure(this)),
					this
				},
				dropRequireFailure: function (t) {
					if (o(t, "dropRequireFailure", this))
						return this;
					t = $(t, this);
					var e = m(this.requireFail, t);
					return e > -1 && this.requireFail.splice(e, 1),
					this
				},
				hasRequireFailures: function () {
					return this.requireFail.length > 0
				},
				canRecognizeWith: function (t) {
					return !!this.simultaneous[t.id]
				},
				emit: function (t) {
					function e(e) {
						n.manager.emit(n.options.event + (e ? W(i) : ""), t)
					}
					var n = this,
					i = this.state;
					i < se && e(!0),
					e(),
					i >= se && e(!0)
				},
				tryEmit: function (t) {
					return this.canEmit() ? this.emit(t) : void(this.state = ce)
				},
				canEmit: function () {
					for (var t = 0; t < this.requireFail.length; ) {
						if (!(this.requireFail[t].state & (ce | ie)))
							return !1;
						t++
					}
					return !0
				},
				recognize: function (t) {
					var e = s({}, t);
					return u(this.options.enable, [this, e]) ? (this.state & (ae | le | ce) && (this.state = ie), this.state = this.process(e), void(this.state & (oe | re | se | le) && this.tryEmit(e))) : (this.reset(), void(this.state = ce))
				},
				process: function (t) {},
				getTouchAction: function () {},
				reset: function () {}
			},
			l(Z, q, {
				defaults: {
					pointers: 1
				},
				attrTest: function (t) {
					var e = this.options.pointers;
					return 0 === e || t.pointers.length === e
				},
				process: function (t) {
					var e = this.state,
					n = t.eventType,
					i = e & (oe | re),
					o = this.attrTest(t);
					return i && (n & St || !o) ? e | le : i || o ? n & kt ? e | se : e & oe ? e | re : oe : ce
				}
			}),
			l(K, Z, {
				defaults: {
					event: "pan",
					threshold: 10,
					pointers: 1,
					direction: Yt
				},
				getTouchAction: function () {
					var t = this.options.direction,
					e = [];
					return t & It && e.push(ne),
					t & At && e.push(ee),
					e
				},
				directionTest: function (t) {
					var e = this.options,
					n = !0,
					i = t.distance,
					o = t.direction,
					r = t.deltaX,
					s = t.deltaY;
					return o & e.direction || (e.direction & It ? (o = 0 === r ? Et : r < 0 ? Ot : Lt, n = r != this.pX, i = Math.abs(t.deltaX)) : (o = 0 === s ? Et : s < 0 ? Nt : Rt, n = s != this.pY, i = Math.abs(t.deltaY))),
					t.direction = o,
					n && i > e.threshold && o & e.direction
				},
				attrTest: function (t) {
					return Z.prototype.attrTest.call(this, t) && (this.state & oe || !(this.state & oe) && this.directionTest(t))
				},
				emit: function (t) {
					this.pX = t.deltaX,
					this.pY = t.deltaY;
					var e = V(t.direction);
					e && this.manager.emit(this.options.event + e, t),
					this._super.emit.call(this, t)
				},
				reset: function () {}
			}),
			l(J, Z, {
				defaults: {
					event: "pinch",
					threshold: 0,
					pointers: 2
				},
				getTouchAction: function () {
					return [te]
				},
				attrTest: function (t) {
					return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & oe)
				},
				emit: function (t) {
					if (this._super.emit.call(this, t), 1 !== t.scale) {
						var e = t.scale < 1 ? "in" : "out";
						this.manager.emit(this.options.event + e, t)
					}
				}
			}),
			l(Q, q, {
				defaults: {
					event: "press",
					pointers: 1,
					time: 500,
					threshold: 5
				},
				getTouchAction: function () {
					return [Jt]
				},
				process: function (t) {
					var e = this.options,
					n = t.pointers.length === e.pointers,
					o = t.distance < e.threshold,
					r = t.deltaTime > e.time;
					if (this._input = t, !o || !n || t.eventType & (kt | St) && !r)
						this.reset();
					else if (t.eventType & Ct)
						this.reset(), this._timer = i(function () {
								this.state = ae,
								this.tryEmit()
							}, e.time, this);
					else if (t.eventType & kt)
						return ae;
					return ce
				},
				reset: function () {
					clearTimeout(this._timer)
				},
				emit: function (t) {
					this.state === ae && (t && t.eventType & kt ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = dt(), this.manager.emit(this.options.event, this._input)))
				}
			}),
			l(tt, Z, {
				defaults: {
					event: "rotate",
					threshold: 0,
					pointers: 2
				},
				getTouchAction: function () {
					return [te]
				},
				attrTest: function (t) {
					return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & oe)
				}
			}),
			l(et, Z, {
				defaults: {
					event: "swipe",
					threshold: 10,
					velocity: .65,
					direction: It | At,
					pointers: 1
				},
				getTouchAction: function () {
					return K.prototype.getTouchAction.call(this)
				},
				attrTest: function (t) {
					var e,
					n = this.options.direction;
					return n & (It | At) ? e = t.velocity : n & It ? e = t.velocityX : n & At && (e = t.velocityY),
					this._super.attrTest.call(this, t) && n & t.direction && t.distance > this.options.threshold && ft(e) > this.options.velocity && t.eventType & kt
				},
				emit: function (t) {
					var e = V(t.direction);
					e && this.manager.emit(this.options.event + e, t),
					this.manager.emit(this.options.event, t)
				}
			}),
			l(nt, q, {
				defaults: {
					event: "tap",
					pointers: 1,
					taps: 1,
					interval: 300,
					time: 250,
					threshold: 10,
					posThreshold: 10
				},
				getTouchAction: function () {
					return [Qt]
				},
				process: function (t) {
					var e = this.options,
					n = t.pointers.length === e.pointers,
					o = t.distance < e.threshold,
					r = t.deltaTime < e.time;
					if (this.reset(), t.eventType & Ct && 0 === this.count)
						return this.failTimeout();
					if (o && r && n) {
						if (t.eventType != kt)
							return this.failTimeout();
						var s = !this.pTime || t.timeStamp - this.pTime < e.interval,
						a = !this.pCenter || A(this.pCenter, t.center) < e.posThreshold;
						this.pTime = t.timeStamp,
						this.pCenter = t.center,
						a && s ? this.count += 1 : this.count = 1,
						this._input = t;
						var l = this.count % e.taps;
						if (0 === l)
							return this.hasRequireFailures() ? (this._timer = i(function () {
										this.state = ae,
										this.tryEmit()
									}, e.interval, this), oe) : ae
					}
					return ce
				},
				failTimeout: function () {
					return this._timer = i(function () {
							this.state = ce
						}, this.options.interval, this),
					ce
				},
				reset: function () {
					clearTimeout(this._timer)
				},
				emit: function () {
					this.state == ae && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
				}
			}),
			it.VERSION = "2.0.4",
			it.defaults = {
				domEvents: !1,
				touchAction: Kt,
				enable: !0,
				inputTarget: null,
				inputClass: null,
				preset: [[tt, {
							enable: !1
						}
					], [J, {
							enable: !1
						}, ["rotate"]], [et, {
							direction: It
						}
					], [K, {
							direction: It
						}, ["swipe"]], [nt], [nt, {
							event: "doubletap",
							taps: 2
						}, ["tap"]], [Q]],
				cssProps: {
					userSelect: "none",
					touchSelect: "none",
					touchCallout: "none",
					contentZooming: "none",
					userDrag: "none",
					tapHighlightColor: "rgba(0,0,0,0)"
				}
			};
			var ue = 1,
			fe = 2;
			return ot.prototype = {
				set: function (t) {
					return s(this.options, t),
					t.touchAction && this.touchAction.update(),
					t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()),
					this
				},
				stop: function (t) {
					this.session.stopped = t ? fe : ue
				},
				recognize: function (t) {
					var e = this.session;
					if (!e.stopped) {
						this.touchAction.preventDefaults(t);
						var n,
						i = this.recognizers,
						o = e.curRecognizer;
						(!o || o && o.state & ae) && (o = e.curRecognizer = null);
						for (var r = 0; r < i.length; )
							n = i[r], e.stopped === fe || o && n != o && !n.canRecognizeWith(o) ? n.reset() : n.recognize(t), !o && n.state & (oe | re | se) && (o = e.curRecognizer = n), r++
					}
				},
				get: function (t) {
					if (t instanceof q)
						return t;
					for (var e = this.recognizers, n = 0; n < e.length; n++)
						if (e[n].options.event == t)
							return e[n];
					return null
				},
				add: function (t) {
					if (o(t, "add", this))
						return this;
					var e = this.get(t.options.event);
					return e && this.remove(e),
					this.recognizers.push(t),
					t.manager = this,
					this.touchAction.update(),
					t
				},
				remove: function (t) {
					if (o(t, "remove", this))
						return this;
					var e = this.recognizers;
					return t = this.get(t),
					e.splice(m(e, t), 1),
					this.touchAction.update(),
					this
				},
				on: function (t, e) {
					var n = this.handlers;
					return r(v(t), function (t) {
						n[t] = n[t] || [],
						n[t].push(e)
					}),
					this
				},
				off: function (t, e) {
					var n = this.handlers;
					return r(v(t), function (t) {
						e ? n[t].splice(m(n[t], e), 1) : delete n[t]
					}),
					this
				},
				emit: function (t, e) {
					this.options.domEvents && st(t, e);
					var n = this.handlers[t] && this.handlers[t].slice();
					if (n && n.length) {
						e.type = t,
						e.preventDefault = function () {
							e.srcEvent.preventDefault()
						};
						for (var i = 0; i < n.length; )
							n[i](e), i++
					}
				},
				destroy: function () {
					this.element && rt(this, !1),
					this.handlers = {},
					this.session = {},
					this.input.destroy(),
					this.element = null
				}
			},
			s(it, {
				INPUT_START: Ct,
				INPUT_MOVE: Tt,
				INPUT_END: kt,
				INPUT_CANCEL: St,
				STATE_POSSIBLE: ie,
				STATE_BEGAN: oe,
				STATE_CHANGED: re,
				STATE_ENDED: se,
				STATE_RECOGNIZED: ae,
				STATE_CANCELLED: le,
				STATE_FAILED: ce,
				DIRECTION_NONE: Et,
				DIRECTION_LEFT: Ot,
				DIRECTION_RIGHT: Lt,
				DIRECTION_UP: Nt,
				DIRECTION_DOWN: Rt,
				DIRECTION_HORIZONTAL: It,
				DIRECTION_VERTICAL: At,
				DIRECTION_ALL: Yt,
				Manager: ot,
				Input: C,
				TouchAction: G,
				TouchInput: F,
				MouseInput: P,
				PointerEventInput: X,
				TouchMouseInput: j,
				SingleTouchInput: D,
				Recognizer: q,
				AttrRecognizer: Z,
				Tap: nt,
				Pan: K,
				Swipe: et,
				Pinch: J,
				Rotate: tt,
				Press: Q,
				on: d,
				off: p,
				each: r,
				merge: a,
				extend: s,
				inherit: l,
				bindFn: c,
				prefixed: b
			}),
			"object" == typeof n && n.exports ? void(n.exports = it) : it
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	11: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			function o(t) {
				o.superclass.constructor.call(this),
				this.userConfig = t,
				this.init()
			}
			var r = n(1),
			s = n(5),
			a = (n(7), n(56)),
			l = n(9),
			c = n(60),
			u = n(58),
			f = 500,
			d = "ease",
			p = .1;
			return r.extend(o, s, {
				version: "3.0.13",
				init: function () {
					var t = this,
					e = {
						preventDefault: !0,
						bounce: !0,
						boundryCheck: !0,
						useTransition: !0,
						gpuAcceleration: !0,
						BOUNDRY_CHECK_EASING: d,
						BOUNDRY_CHECK_DURATION: f,
						BOUNDRY_CHECK_ACCELERATION: p,
						useOriginScroll: !1,
						zoomType: "y",
						indicatorInsets: {
							top: 3,
							bottom: 3,
							left: 3,
							right: 3,
							width: 3,
							spacing: 5
						},
						container: ".xs-container",
						content: ".xs-content",
						stickyElements: ".xs-sticky",
						fixedElements: ".xs-fixed",
						touchAction: "auto"
					};
					t.guid = r.guid(),
					t.renderTo = r.getNode(t.userConfig.renderTo),
					t.__timers = {};
					var n = JSON.parse(t.renderTo.getAttribute("xs-cfg")),
					i = t.userConfig = r.mix(r.mix(e, n), t.userConfig);
					return t.container = r.getNode(i.container, t.renderTo),
					t.content = r.getNode(i.content, t.renderTo),
					t.boundry = new a,
					t.boundry.refresh(),
					t
				},
				destroy: function () {
					var t = this;
					t.mc && t.mc.destroy(),
					t.sticky && t.sticky.destroy(),
					t.fixed && t.fixed.destroy()
				},
				_initContainer: function () {},
				enableGPUAcceleration: function () {
					return this.userConfig.gpuAcceleration = !0,
					this
				},
				disableGPUAcceleration: function () {
					return this.userConfig.gpuAcceleration = !1,
					this
				},
				getScrollPos: function () {
					var t = this;
					return {
						scrollLeft: t.getScrollLeft(),
						scrollTop: t.getScrollTop()
					}
				},
				getScrollTop: function () {},
				getScrollLeft: function () {},
				scrollTo: function (t, e, n, i, o) {
					var r = this,
					t = void 0 === t || isNaN(t) ? -r.getScrollLeft() : t,
					e = void 0 === e || isNaN(e) ? -r.getScrollTop() : e;
					r.scrollLeft(t, n, i, o),
					r.scrollTop(e, n, i, o)
				},
				scrollBy: function (t, e, n, i, o) {
					this.scrollByX(t, n, i, o),
					this.scrollByY(e, n, i, o)
				},
				scrollLeftBy: function (t, e, n, i) {
					this.scrollLeft(Number(t) + Number(this.getScrollLeft()), e, n, i)
				},
				scrollTopBy: function (t, e, n, i) {
					this.scrollTop(Number(t) + Number(this.getScrollTop()), e, n, i)
				},
				scrollLeft: function (t, e, n, i) {},
				scrollTop: function (t, e, n, i) {},
				resetSize: function () {
					var t = this;
					if (t.container && t.content) {
						var e = t.userConfig,
						n = getComputedStyle(t.renderTo),
						i = (t.width = (e.width || t.renderTo.offsetWidth) - r.px2Num(n["padding-left"]) - r.px2Num(n["padding-right"]), t.height = (e.height || t.renderTo.offsetHeight) - r.px2Num(n["padding-top"]) - r.px2Num(n["padding-bottom"]), e.containerWidth || t.content.offsetWidth),
						o = e.containerHeight || t.content.offsetHeight;
						return t.containerWidth = i < t.width ? t.width : i,
						t.containerHeight = o < t.height ? t.height : o,
						t.boundry.refresh({
							width: t.width,
							height: t.height
						}),
						t
					}
				},
				render: function () {
					var t = this;
					return t.resetSize(),
					t.initSticky(),
					t.initFixed(),
					t.trigger("afterrender", {
						type: "afterrender"
					}),
					t._bindEvt(),
					t.initTouchAction(),
					t
				},
				initTouchAction: function () {
					var t = this;
					return t.mc.set({
						touchAction: t.userConfig.touchAction
					}),
					t
				},
				initFixed: function () {
					var t = this,
					e = t.userConfig;
					return t.fixed = t.fixed || new u({
							fixedElements: e.fixedElements,
							xscroll: t,
							fixedRenderTo: e.fixedRenderTo
						}),
					t.fixed.render(),
					t.resetSize(),
					t
				},
				initSticky: function () {
					var t = this,
					e = t.userConfig,
					n = t.sticky = t.sticky || new c({
							xscroll: t,
							zoomType: e.zoomType,
							stickyRenderTo: e.stickyRenderTo
						});
					n.render()
				},
				boundryCheck: function () {
					return this
				},
				boundryCheckX: function () {
					return this
				},
				boundryCheckY: function () {
					return this
				},
				_bindEvt: function () {
					var t = this;
					if (!t.___isEvtBind) {
						t.___isEvtBind = !0;
						var e = t.mc = new l.Manager(t.renderTo),
						n = new l.Tap,
						i = new l.Pan;
						new l.Pinch;
						e.add([n, i]),
						t.mc.on("panstart pan panend pancancel pinchstart pinchmove pinchend pinchcancel pinchin pinchout", function (e) {
							t.trigger(e.type, e)
						});
						for (var o = ["touchstart", "touchmove", "touchend", "touchcancel", "mousedown"], r = 0, s = o.length; r < s; r++)
							t.renderTo.addEventListener(o[r], function (e) {
								t.trigger(e.type, e)
							});
						return t.mc.on("tap", function (e) {
							1 == e.tapCount ? (e.type = "tap", t.trigger(e.type, e)) : 2 == e.tapCount && (e.type = "doubletap", t.trigger("doubletap", e))
						}),
						t
					}
				},
				_resetLockConfig: function () {},
				stop: function () {}
			}),
			"object" == typeof i && i.exports ? void(i.exports = o) : o
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	12: function (t, e, n) {
		var i;
		i = function (t, e, n) {
			"use strict";
			var i = {
				linear: [0, 0, 1, 1],
				ease: [.25, .1, .25, 1],
				"ease-in": [.42, 0, 1, 1],
				"ease-out": [0, 0, .58, 1],
				"ease-in-out": [.42, 0, .58, 1],
				quadratic: [.33, .66, .66, 1],
				circular: [.1, .57, .1, 1],
				bounce: [.71, 1.35, .47, 1.41],
				format: function (t) {
					if (t)
						return "string" == typeof t && this[t] ? this[t]instanceof Array ? [" cubic-bezier(", this[t], ") "].join("") : this[t] : t instanceof Array ? [" cubic-bezier(", t, ") "].join("") : t
				}
			};
			return "object" == typeof n && n.exports ? void(n.exports = i) : i
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	13: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			function o(t, e, n, i, o) {
				var r = function (e) {
					var i = 1 - e;
					return 3 * i * i * e * t + 3 * i * e * e * n + e * e * e
				},
				s = function (t) {
					var n = 1 - t;
					return 3 * n * n * t * e + 3 * n * t * t * i + t * t * t
				},
				a = function (e) {
					var i = 1 - e;
					return 3 * (2 * (e - 1) * e + i * i) * t + 3 * (-e * e * e + 2 * i * e) * n
				};
				return function (t) {
					var e,
					n,
					i,
					l,
					c,
					u,
					f = t;
					for (i = f, u = 0; u < 8; u++) {
						if (l = r(i) - f, Math.abs(l) < o)
							return s(i);
						if (c = a(i), Math.abs(c) < 1e-6)
							break;
						i -= l / c
					}
					if (e = 0, n = 1, i = f, i < e)
						return s(e);
					if (i > n)
						return s(n);
					for (; e < n; ) {
						if (l = r(i), Math.abs(l - f) < o)
							return s(i);
						f > l ? e = i : n = i,
						i = .5 * (n - e) + e
					}
					return s(i)
				}
			}
			function r(t) {
				var e = this;
				e.cfg = s.mix({
						easing: "linear"
					}, t)
			}
			var s = n(1),
			a = n(5),
			l = n(12),
			c = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
				window.setTimeout(t, 1e3 / 60)
			},
			u = ["webkit", "moz", "ms", "o"],
			f = window.cancelAnimationFrame;
			if (!f)
				for (var d = 0; d < u.length; d++)
					(window[u[d] + "CancelAnimationFrame"] || window[u[d] + "CancelRequestAnimationFrame"]) && (f = window[u[d] + "CancelAnimationFrame"] || window[u[d] + "CancelRequestAnimationFrame"]);
			return f = f || window.clearTimeout,
			r.MIN_DURATION = 1,
			s.extend(r, a, {
				reset: function (t) {
					var e = this;
					s.mix(e.cfg, t),
					e.isfinished = !1,
					e.percent = 0,
					e._stop = null
				},
				run: function () {
					var t = this,
					e = t.cfg.duration;
					if (e <= r.MIN_DURATION && (t.isfinished = !0, t.trigger("run", {
								percent: 1
							}), t.trigger("end", {
								percent: 1
							})), !t.isfinished) {
						t._hasFinishedPercent = t._stop && t._stop.percent || 0,
						t._stop = null,
						t.start = Date.now(),
						t.percent = 0;
						var n = 1e3 / 60 / e / 4,
						i = l[t.cfg.easing];
						t.easingFn = o(i[0], i[1], i[2], i[3], n),
						t._run()
					}
				},
				_run: function () {
					var t = this;
					f(t._raf),
					t._raf = c(function () {
							if (t.now = Date.now(), t.duration = t.now - t.start >= t.cfg.duration ? t.cfg.duration : t.now - t.start, t.progress = t.easingFn(t.duration / t.cfg.duration), t.percent = t.duration / t.cfg.duration + t._hasFinishedPercent, t.percent >= 1 || t._stop) {
								t.percent = t._stop && t._stop.percent ? t._stop.percent : 1,
								t.duration = t._stop && t._stop.duration ? t._stop.duration : t.duration;
								var e = {
									percent: t.percent
								};
								return t.trigger("stop", e),
								void(t.percent >= 1 && (t.isfinished = !0, t.trigger("end", {
											percent: 1
										})))
							}
							t.trigger("run", {
								percent: t.progress,
								originPercent: t.percent
							}),
							t._run()
						})
				},
				stop: function () {
					var t = this;
					t._stop = {
						percent: t.percent,
						now: t.now
					},
					f(t._raf)
				}
			}),
			"object" == typeof i && i.exports ? void(i.exports = r) : r
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	18: function (t, e, n) {
		n(52);
		var i = n(2)(n(50), n(54), null, null);
		t.exports = i.exports
	},
	33: function (t, e, n) {
		n(46);
		var i = n(2)(n(42), n(47), null, null);
		t.exports = i.exports
	},
	35: function (t, e, n) {
		t.exports = {
		default:
			n(48),
			__esModule: !0
		}
	},
	40: function (t, e) {
		/*
		object-assign
		(c) Sindre Sorhus
		@license MIT
		 */
		"use strict";
		function n(t) {
			if (null === t || void 0 === t)
				throw new TypeError("Object.assign cannot be called with null or undefined");
			return Object(t)
		}
		function i() {
			try {
				if (!Object.assign)
					return !1;
				var t = new String("abc");
				if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0])
					return !1;
				for (var e = {}, n = 0; n < 10; n++)
					e["_" + String.fromCharCode(n)] = n;
				var i = Object.getOwnPropertyNames(e).map(function (t) {
						return e[t]
					});
				if ("0123456789" !== i.join(""))
					return !1;
				var o = {};
				return "abcdefghijklmnopqrst".split("").forEach(function (t) {
					o[t] = t
				}),
				"abcdefghijklmnopqrst" === Object.keys(Object.assign({}, o)).join("")
			} catch (t) {
				return !1
			}
		}
		var o = Object.getOwnPropertySymbols,
		r = Object.prototype.hasOwnProperty,
		s = Object.prototype.propertyIsEnumerable;
		t.exports = i() ? Object.assign : function (t, e) {
			for (var i, a, l = n(t), c = 1; c < arguments.length; c++) {
				i = Object(arguments[c]);
				for (var u in i)
					r.call(i, u) && (l[u] = i[u]);
				if (o) {
					a = o(i);
					for (var f = 0; f < a.length; f++)
						s.call(i, a[f]) && (l[a[f]] = i[a[f]])
				}
			}
			return l
		}
	},
	42: function (t, e, n) {
		"use strict";
		function i(t) {
			return t && t.__esModule ? t : {
			default:
				t
			}
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var o = n(44),
		r = i(o),
		s = ["android", "ios", "ios-small", "bubbles", "circles", "crescent", "dots", "lines", "ripple", "spiral"];
		e.default = {
			mounted: function () {
				var t = this;
				this.$nextTick(function () {
					(0, r.default)(t.$el, t.type)
				})
			},
			props: {
				type: {
					type: String,
				default:
					"ios"
				}
			},
			computed: {
				className: function () {
					for (var t = {}, e = 0; e < s.length; e++)
						t["vux-spinner-" + s[e]] = this.type === s[e];
					return t
				}
			}
		}
	},
	43: function (t, e) {
		"use strict";
		for (var n = 0, i = ["webkit", "moz"], o = 0; o < i.length && !window.requestAnimationFrame; ++o)
			window.requestAnimationFrame = window[i[o] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i[o] + "CancelAnimationFrame"] || window[i[o] + "CancelRequestAnimationFrame"];
		window.requestAnimationFrame || (window.requestAnimationFrame = function (t, e) {
			var i = (new Date).getTime(),
			o = Math.max(0, 16 - (i - n)),
			r = window.setTimeout(function () {
					t(i + o)
				}, o);
			return n = i + o,
			r
		}),
		window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
			clearTimeout(t)
		})
	},
	44: function (t, e, n) {
		"use strict";
		function i(t, e, n, r) {
			var s,
			a,
			l,
			c = document.createElement(p[t] || t);
			for (s in e)
				if ("[object Array]" === Object.prototype.toString.call(e[s]))
					for (a = 0; a < e[s].length; a++)
						if (e[s][a].fn)
							for (l = 0; l < e[s][a].t; l++)
								i(s, e[s][a].fn(l, r), c, r);
						else
							i(s, e[s][a], c, r);
				else
					o(c, s, e[s]);
			n.appendChild(c)
		}
		function o(t, e, n) {
			t.setAttribute(p[e] || e, n)
		}
		function r(t, e) {
			var n = t.split(";"),
			i = n.slice(e),
			o = n.slice(0, n.length - i.length);
			return n = i.concat(o).reverse(),
			n.join(";") + ";" + n[0]
		}
		function s(t, e) {
			return t /= e / 2,
			t < 1 ? .5 * t * t * t : (t -= 2, .5 * (t * t * t + 2))
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		}),
		e.default = function (t, e) {
			function n() {
				m[o] && (r = m[o](t)())
			}
			var o,
			r;
			o = e;
			var s = document.createElement("div");
			return i("svg", {
				viewBox: "0 0 64 64",
				g: [v[o]]
			}, s, o),
			t.innerHTML = s.innerHTML,
			n(),
			t
		},
		n(43);
		var a = "translate(32,32)",
		l = "stroke-opacity",
		c = "round",
		u = "indefinite",
		f = "750ms",
		d = "none",
		p = {
			a: "animate",
			an: "attributeName",
			at: "animateTransform",
			c: "circle",
			da: "stroke-dasharray",
			os: "stroke-dashoffset",
			f: "fill",
			lc: "stroke-linecap",
			rc: "repeatCount",
			sw: "stroke-width",
			t: "transform",
			v: "values"
		},
		h = {
			v: "0,32,32;360,32,32",
			an: "transform",
			type: "rotate",
			rc: u,
			dur: f
		},
		g = {
			sw: 4,
			lc: c,
			line: [{
					fn: function (t, e) {
						return {
							y1: "ios" === e ? 17 : 12,
							y2: "ios" === e ? 29 : 20,
							t: a + " rotate(" + (30 * t + (t < 6 ? 180 : -180)) + ")",
							a: [{
									fn: function () {
										return {
											an: l,
											dur: f,
											v: r("0;.1;.15;.25;.35;.45;.55;.65;.7;.85;1", t),
											rc: u
										}
									},
									t: 1
								}
							]
						}
					},
					t: 12
				}
			]
		},
		v = {
			android: {
				c: [{
						sw: 6,
						da: 128,
						os: 82,
						r: 26,
						cx: 32,
						cy: 32,
						f: d
					}
				]
			},
			ios: g,
			"ios-small": g,
			bubbles: {
				sw: 0,
				c: [{
						fn: function (t) {
							return {
								cx: 24 * Math.cos(2 * Math.PI * t / 8),
								cy: 24 * Math.sin(2 * Math.PI * t / 8),
								t: a,
								a: [{
										fn: function () {
											return {
												an: "r",
												dur: f,
												v: r("1;2;3;4;5;6;7;8", t),
												rc: u
											}
										},
										t: 1
									}
								]
							}
						},
						t: 8
					}
				]
			},
			circles: {
				c: [{
						fn: function (t) {
							return {
								r: 5,
								cx: 24 * Math.cos(2 * Math.PI * t / 8),
								cy: 24 * Math.sin(2 * Math.PI * t / 8),
								t: a,
								sw: 0,
								a: [{
										fn: function () {
											return {
												an: "fill-opacity",
												dur: f,
												v: r(".3;.3;.3;.4;.7;.85;.9;1", t),
												rc: u
											}
										},
										t: 1
									}
								]
							}
						},
						t: 8
					}
				]
			},
			crescent: {
				c: [{
						sw: 4,
						da: 128,
						os: 82,
						r: 26,
						cx: 32,
						cy: 32,
						f: d,
						at: [h]
					}
				]
			},
			dots: {
				c: [{
						fn: function (t) {
							return {
								cx: 16 + 16 * t,
								cy: 32,
								sw: 0,
								a: [{
										fn: function () {
											return {
												an: "fill-opacity",
												dur: f,
												v: r(".5;.6;.8;1;.8;.6;.5", t),
												rc: u
											}
										},
										t: 1
									}, {
										fn: function () {
											return {
												an: "r",
												dur: f,
												v: r("4;5;6;5;4;3;3", t),
												rc: u
											}
										},
										t: 1
									}
								]
							}
						},
						t: 3
					}
				]
			},
			lines: {
				sw: 7,
				lc: c,
				line: [{
						fn: function (t) {
							return {
								x1: 10 + 14 * t,
								x2: 10 + 14 * t,
								a: [{
										fn: function () {
											return {
												an: "y1",
												dur: f,
												v: r("16;18;28;18;16", t),
												rc: u
											}
										},
										t: 1
									}, {
										fn: function () {
											return {
												an: "y2",
												dur: f,
												v: r("48;44;36;46;48", t),
												rc: u
											}
										},
										t: 1
									}, {
										fn: function () {
											return {
												an: l,
												dur: f,
												v: r("1;.8;.5;.4;1", t),
												rc: u
											}
										},
										t: 1
									}
								]
							}
						},
						t: 4
					}
				]
			},
			ripple: {
				f: d,
				"fill-rule": "evenodd",
				sw: 3,
				circle: [{
						fn: function (t) {
							return {
								cx: 32,
								cy: 32,
								a: [{
										fn: function () {
											return {
												an: "r",
												begin: t * -1 + "s",
												dur: "2s",
												v: "0;24",
												keyTimes: "0;1",
												keySplines: "0.1,0.2,0.3,1",
												calcMode: "spline",
												rc: u
											}
										},
										t: 1
									}, {
										fn: function () {
											return {
												an: l,
												begin: t * -1 + "s",
												dur: "2s",
												v: ".2;1;.2;0",
												rc: u
											}
										},
										t: 1
									}
								]
							}
						},
						t: 2
					}
				]
			},
			spiral: {
				defs: [{
						linearGradient: [{
								id: "sGD",
								gradientUnits: "userSpaceOnUse",
								x1: 55,
								y1: 46,
								x2: 2,
								y2: 46,
								stop: [{
										offset: .1,
										class: "stop1"
									}, {
										offset: 1,
										class: "stop2"
									}
								]
							}
						]
					}
				],
				g: [{
						sw: 4,
						lc: c,
						f: d,
						path: [{
								stroke: "url(#sGD)",
								d: "M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"
							}, {
								d: "M60,32 C60,16,47.464,4,32,4S4,16,4,32"
							}
						],
						at: [h]
					}
				]
			}
		},
		m = {
			android: function (t) {
				function e() {
					if (!n.stop) {
						var t = s(Date.now() - i, 650),
						u = 1,
						f = 0,
						d = 188 - 58 * t,
						p = 182 - 182 * t;
						r % 2 && (u = -1, f = -64, d = 128 - -58 * t, p = 182 * t);
						var h = [0, -101, -90, -11, -180, 79, -270, -191][r];
						o(c, "da", Math.max(Math.min(d, 188), 128)),
						o(c, "os", Math.max(Math.min(p, 182), 0)),
						o(c, "t", "scale(" + u + ",1) translate(" + f + ",0) rotate(" + h + ",32,32)"),
						a += 4.1,
						a > 359 && (a = 0),
						o(l, "t", "rotate(" + a + ",32,32)"),
						t >= 1 && (r++, r > 7 && (r = 0), i = Date.now()),
						window.requestAnimationFrame(e)
					}
				}
				var n = this;
				this.stop = !1;
				var i,
				r = 0,
				a = 0,
				l = t.querySelector("g"),
				c = t.querySelector("circle");
				return function () {
					return i = Date.now(),
					e(),
					n
				}
			}
		}
	},
	45: function (t, e, n) {
		e = t.exports = n(3)(),
		e.push([t.id, ".vux-spinner{stroke:#444;fill:#444;vertical-align:middle;display:inline-block}.vux-spinner,.vux-spinner svg{width:28px;height:28px}.vux-spinner.vux-spinner-inverse{stroke:#fff;fill:#fff}.vux-spinner-android{stroke:#4b8bf4}.vux-spinner-ios,.vux-spinner-ios-small{stroke:#69717d}.vux-spinner-spiral .stop1{stop-color:#fff;stop-opacity:0}.vux-spinner-spiral.vux-spinner-inverse .stop1{stop-color:#000}.vux-spinner-spiral.vux-spinner-inverse .stop2{stop-color:#fff}", ""])
	},
	46: function (t, e, n) {
		var i = n(45);
		"string" == typeof i && (i = [[t.id, i, ""]]);
		n(4)(i, {});
		i.locals && (t.exports = i.locals)
	},
	47: function (t, e) {
		t.exports = {
			render: function () {
				var t = this,
				e = t.$createElement,
				n = t._self._c || e;
				return n("span", {
					staticClass: "vux-spinner",
					class: t.className
				})
			},
			staticRenderFns: []
		}
	},
	48: function (t, e, n) {
		var i = n(79),
		o = i.JSON || (i.JSON = {
					stringify: JSON.stringify
				});
		t.exports = function (t) {
			return o.stringify.apply(o, arguments)
		}
	},
	50: function (t, e, n) {
		"use strict";
		function i(t) {
			return t && t.__esModule ? t : {
			default:
				t
			}
		}
		function o(t) {
			return JSON.parse((0, s.default)(t))
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var r = n(35),
		s = i(r),
		a = n(40),
		l = i(a),
		c = n(66),
		u = i(c),
		f = n(63),
		d = i(f),
		p = n(64),
		h = i(p),
		g = function () {
			return {
				content: "Pull Down To Refresh",
				height: 60,
				autoRefresh: !1,
				downContent: "Pull Down To Refresh",
				upContent: "Release To Refresh",
				loadingContent: "Loading...",
				clsPrefix: "xs-plugin-pulldown-"
			}
		},
		v = function () {
			return {
				content: "Pull Up To Refresh",
				pullUpHeight: 60,
				height: 40,
				autoRefresh: !1,
				downContent: "Release To Refresh",
				upContent: "Pull Up To Refresh",
				loadingContent: "Loading...",
				clsPrefix: "xs-plugin-pullup-"
			}
		};
		e.default = {
			props: {
				value: {
					type: Object,
				default:
					function () {
						return {
							pulldownStatus: "",
							pullupStatus: ""
						}
					}
				},
				height: String,
				lockX: Boolean,
				lockY: Boolean,
				scrollbarX: Boolean,
				scrollbarY: Boolean,
				bounce: {
					type: Boolean,
				default:
					!0
				},
				useOriginScroll: {
					type: Boolean,
				default:
					!1
				},
				useTransition: {
					type: Boolean,
				default:
					!0
				},
				preventDefault: {
					type: Boolean,
				default:
					!0
				},
				stopPropagation: Boolean,
				boundryCheck: {
					type: Boolean,
				default:
					!0
				},
				gpuAcceleration: {
					type: Boolean,
				default:
					!0
				},
				usePulldown: {
					type: Boolean,
				default:
					!1
				},
				usePullup: {
					type: Boolean,
				default:
					!1
				},
				pulldownConfig: {
					type: Object,
				default:
					function () {
						return {}
					}
				},
				pullupConfig: {
					type: Object,
				default:
					function () {
						return {}
					}
				},
				enableHorizontalSwiping: {
					type: Boolean,
				default:
					!1
				}
			},
			methods: {
				reset: function (t) {
					t && ("undefined" != typeof t.left && this._xscroll.scrollLeft(t.left), "undefined" != typeof t.top && this._xscroll.scrollTop(t.top)),
					this._xscroll && this._xscroll.resetSize()
				},
				donePulldown: function () {
					var t = this;
					this.pulldown.reset(function () {
						t.reset()
					}),
					this.currentValue.pulldownStatus = "default"
				},
				disablePullup: function () {
					this.pullup.stop(),
					this.currentValue.pullupStatus = "disabled"
				},
				enablePullup: function () {
					this.currentValue.pullupStatus = "default",
					this.pullup.restart()
				},
				donePullup: function () {
					this.pullup.complete(),
					this.reset(),
					this.currentValue.pullupStatus = "default"
				},
				getStyles: function () {
					var t = this.height;
					!this.height && this.$el && !this.$el.style.height && this.lockX && (t = document.documentElement.clientHeight + "px", this.reset()),
					this.height && 0 === this.height.indexOf("-") && (t = document.documentElement.clientHeight + parseInt(this.height) + "px"),
					this.styles = {
						height: "" + t
					}
				}
			},
			created: function () {
				var t = this;
				this.value ? this.currentValue = this.value : this.currentValue = {
					pulldownStatus: "",
					pullupStatus: ""
				},
				this.handleOrientationchange = function () {
					setTimeout(function () {
						t.reset()
					}, 100)
				}
			},
			data: function () {
				return {
					currentValue: {},
					styles: {}
				}
			},
			watch: {
				currentValue: {
					handler: function (t) {
						this.$emit("input", o(t))
					},
					deep: !0
				},
				height: function () {
					this.getStyles()
				},
				value: {
					handler: function (t) {
						"default" === t.pullupStatus && "default" !== this.currentValue.pullupStatus && this.donePullup(),
						"default" === t.pulldownStatus && "default" !== this.currentValue.pulldownStatus && this.donePulldown(),
						"disabled" === t.pullupStatus && "disabled" !== this.currentValue.pullupStatus && this.disablePullup(),
						"enabled" === t.pullupStatus && "disabled" === this.currentValue.pullupStatus && this.enablePullup()
					},
					deep: !0
				}
			},
			mounted: function () {
				var t = this;
				this.uuid = Math.random().toString(36).substring(3, 8),
				this.$nextTick(function () {
					t.$el.setAttribute("id", "vux-scroller-" + t.uuid);
					var e = null;
					if (t.$slots.default && (e = t.$slots.default[0].elm), !e)
						throw new Error("no content is found");
					if (t._xscroll = new u.default({
								renderTo: "#vux-scroller-" + t.uuid,
								lockX: t.lockX,
								lockY: t.lockY,
								scrollbarX: t.scrollbarX,
								scrollbarY: t.scrollbarY,
								content: e,
								bounce: t.bounce,
								useOriginScroll: t.useOriginScroll,
								useTransition: t.useTransition,
								preventDefault: t.preventDefault,
								boundryCheck: t.boundryCheck,
								gpuAcceleration: t.gpuAcceleration,
								stopPropagation: t.stopPropagation
							}), t._xscroll.on("scroll", function () {
							t.$emit("on-scroll", {
								top: t._xscroll.getScrollTop(),
								left: t._xscroll.getScrollLeft()
							})
						}), t.usePulldown) {
						var n = t.$slots.pulldown,
						i = (0, l.default)(g(), t.pulldownConfig);
						n && (i.container = n[0].elm),
						t.pulldown = new d.default(i),
						t._xscroll.plug(t.pulldown),
						t.pulldown.on("loading", function (e) {
							t.$emit("on-pulldown-loading", t.uuid)
						}),
						t.pulldown.on("statuschange", function (e) {
							t.currentValue.pulldownStatus = e.newVal
						})
					}
					if (t.usePullup) {
						var o = t.$slots.pullup,
						r = (0, l.default)(v(), t.pullupConfig);
						o && (r.container = o[0].elm),
						t.pullup = new h.default(r),
						t._xscroll.plug(t.pullup),
						t.pullup.on("loading", function (e) {
							t.$emit("on-pullup-loading", t.uuid)
						}),
						t.pullup.on("statuschange", function (e) {
							t.currentValue.pullupStatus = e.newVal
						})
					}
					t.enableHorizontalSwiping && (t._xscroll.on("panstart", function (e) {
							2 !== e.direction && 4 !== e.direction || (e.preventDefault(), t.scrollbarY && (t._xscroll.userConfig.scrollbarY = !1), t._xscroll.userConfig.lockY = !0)
						}), t._xscroll.on("panend", function () {
							t.scrollbarY && (t._xscroll.userConfig.scrollbarY = !0),
							t._xscroll.userConfig.lockY = !1
						})),
					t._xscroll.render(),
					window.addEventListener("orientationchange", t.handleOrientationchange, !1)
				}),
				this.getStyles()
			},
			beforeDestroy: function () {
				this.pullup && (this._xscroll.unplug(this.pullup), this.pullup.pluginDestructor()),
				this.pulldown && (this._xscroll.unplug(this.pulldown), this.pulldown.pluginDestructor()),
				window.removeEventListener("orientationchange", this.handleOrientationchange, !1),
				this._xscroll.destroy(),
				this._xscroll = null
			}
		}
	},
	51: function (t, e, n) {
		e = t.exports = n(3)(),
		e.push([t.id, ".xs-plugin-pullup-container{text-align:center}", ""])
	},
	52: function (t, e, n) {
		var i = n(51);
		"string" == typeof i && (i = [[t.id, i, ""]]);
		n(4)(i, {});
		i.locals && (t.exports = i.locals)
	},
	54: function (t, e) {
		t.exports = {
			render: function () {
				var t = this,
				e = t.$createElement,
				n = t._self._c || e;
				return n("div", {
					style: t.styles
				}, [n("div", {
							staticClass: "xs-container"
						}, [t._t("default"), t._v(" "), t._t("pulldown"), t._v(" "), t._t("pullup")], 2)])
			},
			staticRenderFns: []
		}
	},
	56: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			function o(t) {
				this.cfg = r.mix({
						width: 0,
						height: 0
					}, t),
				this.init()
			}
			var r = n(1);
			return r.mix(o.prototype, {
				init: function () {
					var t = this;
					t._xtop = 0,
					t._xright = 0,
					t._xleft = 0,
					t._xbottom = 0,
					t.refresh({
						width: t.cfg.width,
						height: t.cfg.height
					})
				},
				reset: function () {
					return this.resetTop(),
					this.resetLeft(),
					this.resetBottom(),
					this.resetRight(),
					this
				},
				resetTop: function () {
					return this._xtop = 0,
					this.refresh(),
					this
				},
				resetLeft: function () {
					return this._xleft = 0,
					this.refresh(),
					this
				},
				resetBottom: function () {
					return this._xbottom = 0,
					this.refresh(),
					this
				},
				resetRight: function () {
					return this._xright = 0,
					this.refresh(),
					this
				},
				expandTop: function (t) {
					return this._xtop = t,
					this.refresh(),
					this
				},
				expandLeft: function (t) {
					return this._xleft = t,
					this.refresh(),
					this
				},
				expandRight: function (t) {
					return this._xright = t,
					this.refresh(),
					this
				},
				expandBottom: function (t) {
					return this._xbottom = t,
					this.refresh(),
					this
				},
				refresh: function (t) {
					return r.mix(this.cfg, t),
					this.top = this._xtop,
					this.left = this._xleft,
					this.bottom = (t && t.height || this.cfg.height || 0) - this._xbottom,
					this.right = (t && t.width || this.cfg.width || 0) - this._xright,
					this.width = this.right - this.left > 0 ? this.right - this.left : 0,
					this.height = this.bottom - this.top > 0 ? this.bottom - this.top : 0,
					this
				}
			}),
			"object" == typeof i && i.exports ? void(i.exports = o) : o
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	57: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			var o = n(1),
			r = n(5),
			s = function (t) {
				s.superclass.constructor.call(this, t),
				this.userConfig = o.mix({}, t),
				this.init()
			};
			return o.extend(s, r, {
				init: function () {
					var t = this;
					t.xscroll = t.userConfig.xscroll
				},
				add: function (t, e) {
					var n = this;
					if (e = o.extend({
								captureBounce: !1,
								stopPropagation: !0
							}, e), n.__scrolls || (n.__scrolls = {}), t.guid && !n.__scrolls[t.guid])
						return t.parentscroll = n.xscroll, n._bind(t), n.__scrolls[t.guid] = t
				},
				remove: function (t) {
					var e = this;
					if (t && t.guid) {
						var n = e.__scrolls[t.guid];
						n && (n.parentscroll = null, e._unbind(t), n = null)
					}
				},
				get: function (t) {
					return t ? this.__scrolls[t] : this.__scrolls
				},
				_unbind: function (t) {},
				_bind: function (t) {
					var e = this,
					n = e.xscroll;
					n.renderTo.addEventListener("touchstart", function () {
						n._resetLockConfig()
					}),
					t.renderTo.addEventListener("touchstart", function () {
						t._resetLockConfig()
					}),
					n.on("panend", n._resetLockConfig),
					t.on("panend", t._resetLockConfig),
					t.on("panstart", function (e) {
						if (!t.userConfig.lockY && !n.userConfig.lockY) {
							if (t.isBoundryOut())
								return void(n.userConfig.lockY = !0);
							16 == e.direction && t.getBoundryOutTop() >= 0 ? t.userConfig.lockY = !0 : 8 == e.direction && t.getBoundryOutTop() >= 0 && t.getBoundryOutBottom() < 0 && (n.userConfig.lockY = !0),
							8 == e.direction && t.getBoundryOutBottom() >= 0 ? t.userConfig.lockY = !0 : 16 == e.direction && t.getBoundryOutBottom() >= 0 && t.getBoundryOutTop() < 0 && (n.userConfig.lockY = !0),
							t.getBoundryOutTop() < 0 && t.getBoundryOutBottom() < 0 && (n.userConfig.lockY = !0)
						}
						if (!t.userConfig.lockX && !n.userConfig.lockX) {
							if (t.isBoundryOut())
								return void(n.userConfig.lockX = !0);
							4 == e.direction && t.getBoundryOutLeft() >= 0 ? t.userConfig.lockX = !0 : 2 == e.direction && t.getBoundryOutLeft() >= 0 && t.getBoundryOutRight() < 0 && (n.userConfig.lockX = !0),
							2 == e.direction && t.getBoundryOutRight() >= 0 ? t.userConfig.lockX = !0 : 4 == e.direction && t.getBoundryOutRight() >= 0 && t.getBoundryOutLeft() < 0 && (n.userConfig.lockX = !0),
							t.getBoundryOutLeft() < 0 && t.getBoundryOutRight() < 0 && (n.userConfig.lockX = !0)
						}
						!t.userConfig.lockX && n.userConfig.lockX && (2 == e.direction || 4 == e.direction ? n.userConfig.lockY = !0 : t.userConfig.lockX = !0),
						!t.userConfig.lockY && n.userConfig.lockY && (8 == e.direction || 16 == e.direction ? n.userConfig.lockX = !0 : t.userConfig.lockY = !0)
					})
				}
			}),
			"object" == typeof i && i.exports ? void(i.exports = s) : s
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	58: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			var o = n(1),
			r = n(5),
			s = (o.prefixStyle("transform"), function (t) {
				s.superclass.constructor.call(this, t),
				this.userConfig = o.mix({
						fixedRenderTo: void 0,
						fixedElements: ".xs-fixed",
						prefix: "xs-fixed-container",
						zoomType: "y"
					}, t),
				this.init()
			});
			return o.extend(s, r, {
				fixedElements: [],
				init: function () {
					var t = this,
					e = t.userConfig,
					n = t.xscroll = e.xscroll;
					t.xscrollConfig = n.userConfig;
					return t.isY = !("y" != e.zoomType),
					t._ = t.isY ? {
						top: "top",
						height: "height",
						width: "width",
						offsetTop: "offsetTop"
					}
					 : {
						top: "left",
						height: "width",
						width: "height",
						offsetTop: "offsetLeft"
					},
					t.fixedRenderTo = o.getNode(e.fixedRenderTo),
					t
				},
				render: function () {
					var t = this,
					e = t.xscroll;
					t.infinite = e.getPlugin("infinite"),
					t.fixedRenderTo || (t.fixedRenderTo = document.createElement("div"), e.renderTo.appendChild(t.fixedRenderTo)),
					o.addClass(t.fixedRenderTo, t.userConfig.prefix);
					for (var n = t.originalFixedElements = t.getFixedElements(), i = 0, r = n.length; i < r; i++)
						t.renderFixedElement(n[i], i, t.fixedRenderTo);
					return t
				},
				getFixedElements: function () {
					var t = this,
					e = t.infinite,
					n = t.userConfig;
					if (e) {
						var i = [];
						for (var r in e.__serializedData) {
							var s = e.__serializedData[r];
							s && s.style && "fixed" == s.style.position && i.push(s)
						}
						return i
					}
					return o.getNodes(n.fixedElements, t.xscroll.content)
				},
				renderFixedElement: function (t, e, n) {
					var i = this,
					r = !0,
					s = i._,
					a = i.xscroll,
					l = (i.userConfig, i.xscrollConfig),
					c = l.useOriginScroll,
					u = i.infinite,
					f = i.fixedElements[e];
					i.fixedElements[e] || (r = !1, c && !u ? (t.style.position = "fixed", t.style.display = "block") : (f = document.createElement("div"), u ? (f.setAttribute("style", o.stringifyStyle(o.mix(t.style, {
											display: "block",
											width: "100%"
										}))), f.style[s.top] = (t.style[s.top] >= 0 ? t.style[s.top] : t._top) + "px", t.style[s.height] && (f.style[s.height] = t.style[s.height] + "px"), u.userConfig.renderHook.call(i, f, t)) : (f.style.display = "block", f.style.position = "absolute", f.style[s.width] = "100%", f.innerHTML = t.innerHTML, f.className = t.className, f.setAttribute("style", t.getAttribute("style")), f.style[s.top] = t[s.offsetTop] + "px", t.style.display = "none"), n.appendChild(f), i.fixedElements.push(f))),
					a.trigger("fixedchange", {
						fixedIndex: e,
						fixedElement: c ? t : f,
						originalFixedElement: t,
						isRender: r
					})
				},
				destroy: function () {
					var t = this;
					t.fixedElements = void 0
				}
			}),
			"object" == typeof i && i.exports ? void(i.exports = s) : s
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	59: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			var o = n(1),
			r = n(7),
			s = 40,
			a = 10,
			l = 50,
			c = o.prefixStyle("transform"),
			u = o.vendor ? ["-", o.vendor, "-transform"].join("") : "transform",
			f = o.prefixStyle("transition"),
			d = (o.prefixStyle("borderRadius"), o.prefixStyle("transitionDuration"), function (t) {
				this.userConfig = o.mix({
						MIN_BAR_SCROLLED_SIZE: a,
						MIN_BAR_SIZE: l,
						MAX_BOUNCE_DISTANCE: s,
						spacing: 5
					}, t),
				this.init(t.xscroll)
			});
			return o.mix(d.prototype, {
				init: function (t) {
					var e = this;
					e.xscroll = t,
					e.type = e.userConfig.type,
					e.isY = "y" == e.type,
					e.scrollTopOrLeft = e.isY ? "scrollTop" : "scrollLeft"
				},
				destroy: function () {
					var t = this;
					o.remove(t.scrollbar),
					t.xscroll.off("scroll", t._scrollHandler, t),
					t.xscroll.off("scrollend", t._scrollEndHandler, t)
				},
				render: function () {
					var t = this,
					e = t.xscroll,
					n = (e.boundry, t.xscroll.userConfig.indicatorInsets),
					i = e.userConfig.gpuAcceleration ? " translateZ(0) " : "",
					r = i ? u + ":" + i + ";" : "",
					s = "opacity:0;position:absolute;z-index:999;overflow:hidden;-webkit-border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;" + r;
					n._xright = n.right + n.spacing,
					n._xbottom = n.bottom + n.spacing;
					var a = t.isY ? o.substitute("width:{width}px;bottom:{_xbottom}px;top:{top}px;right:{right}px;", n) + s : o.substitute("height:{width}px;left:{left}px;right:{_xright}px;bottom:{bottom}px;", n) + s;
					t.scrollbar || (t.scrollbar = document.createElement("div"), t.indicate = document.createElement("div"), e.renderTo.appendChild(t.scrollbar), t.scrollbar.appendChild(t.indicate)),
					t.scrollbar.style.cssText = a;
					var l = t.isY ? "width:100%;" : "height:100%;";
					t.indicate.style.cssText = l + "position:absolute;background:rgba(0,0,0,0.3);-webkit-border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;",
					t._update(),
					t.hide(0),
					t._bindEvt()
				},
				_update: function (t, e, n, i) {
					var o = this,
					t = void 0 === t ? o.isY ? o.xscroll.getScrollTop() : o.xscroll.getScrollLeft() : t,
					r = o.computeScrollBar(t),
					s = o.isY ? "height" : "width";
					o.indicate.style[s] = Math.round(r.size) + "px",
					e && n ? o.scrollTo(r.pos, e, n, i) : o.moveTo(r.pos)
				},
				computeScrollBar: function (t) {
					var e = this,
					n = (e.isY ? "y" : "x", e.userConfig.spacing),
					i = e.xscroll,
					o = i.boundry,
					r = e.userConfig,
					t = e.isY ? Math.round(t) + o._xtop : Math.round(t) + o._xleft,
					s = r.MIN_BAR_SCROLLED_SIZE,
					a = r.MIN_BAR_SIZE,
					l = r.MAX_BOUNCE_DISTANCE;
					e.containerSize = e.isY ? i.containerHeight + o._xtop + o._xbottom : e.xscroll.containerWidth + o._xright + o._xleft,
					e.size = e.isY ? o.cfg.height : o.cfg.width,
					e.indicateSize = e.isY ? o.cfg.height - 2 * n : o.cfg.width - 2 * n;
					var c = e.indicateSize,
					u = e.containerSize,
					f = c * t / u,
					d = Math.round(c * e.size / u),
					p = e.isY ? i.getBoundryOutTop() : i.getBoundryOutLeft(),
					h = e.isY ? i.getBoundryOutBottom() : i.getBoundryOutRight(),
					g = a - d > 0 ? a - d : 0;
					if (d = d < a ? a : d, f = (c - g) * t / u, p >= 0) {
						var v = p / l;
						v = v > 1 ? 1 : v,
						f = -v * (d - s)
					}
					if (h >= 0) {
						var v = h / l;
						v = v > 1 ? 1 : v,
						f = v * (d - s) + c - d
					}
					return e.barPos = Math.round(f), {
						size: Math.round(d),
						pos: e.barPos
					}
				},
				scrollTo: function (t, e, n, i) {
					var o = this;
					o.show();
					var s = o.xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "",
					a = {
						css: {
							transform: o.isY ? "translateY(" + t + "px)" + s : "translateX(" + t + "px)" + s
						},
						duration: e,
						easing: n,
						useTransition: o.xscroll.userConfig.useTransition,
						end: i
					};
					o.__timer = o.__timer || new r(o.indicate, a),
					o.__timer.stop(),
					o.__timer.reset(a),
					o.__timer.run()
				},
				moveTo: function (t) {
					var e = this;
					e.show();
					var n = e.xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
					e.isY ? e.indicate.style[c] = "translateY(" + t + "px) " + n : e.indicate.style[c] = "translateX(" + t + "px) " + n,
					e.indicate.style[f] = ""
				},
				_scrollHandler: function (t) {
					var e = this;
					return e._update(t[e.scrollTopOrLeft]),
					e
				},
				isBoundryOut: function () {
					var t = this;
					return t.isY ? t.xscroll.isBoundryOutTop() || t.xscroll.isBoundryOutBottom() : t.xscroll.isBoundryOutLeft() || t.xscroll.isBoundryOutRight()
				},
				_scrollEndHandler: function (t) {
					var e = this;
					return e.isBoundryOut() || (e._update(t[e.scrollTopOrLeft]), e.hide()),
					e
				},
				_bindEvt: function () {
					var t = this;
					t.__isEvtBind || (t.__isEvtBind = !0, t.xscroll.on("scroll", t._scrollHandler, t), t.xscroll.on("scrollend", t._scrollEndHandler, t))
				},
				reset: function () {
					var t = this;
					t.pos = 0,
					t._update()
				},
				hide: function (t, e, n) {
					var i = this,
					t = t >= 0 ? t : 300,
					n = n >= 0 ? n : 100;
					i.scrollbar.style.opacity = 0,
					i.scrollbar.style[f] = ["opacity ", t, "ms ", " ease-out ", n, "ms"].join("")
				},
				show: function () {
					var t = this;
					t.scrollbar.style.opacity = 1,
					t.scrollbar.style[f] = ""
				}
			}),
			"object" == typeof i && i.exports ? void(i.exports = d) : d
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	60: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			var o = n(1),
			r = n(5),
			s = o.prefixStyle("transform"),
			a = function (t) {
				var e = t.stickyElement,
				n = t.curStickyElement,
				i = t.xscroll,
				r = t._,
				s = i.getPlugin("infinite");
				if (s) {
					s.userConfig.renderHook.call(self, e, n),
					e.setAttribute("xs-guid", n.guid),
					o.addClass(e, n.className);
					for (var a in n.style)
						"display" != a && "position" != a && (e.style[a] = a == r.height ? n.style[a] + "px" : n.style[a])
				} else {
					var l = n.getAttribute("style");
					e.innerHTML = n.innerHTML,
					e.className = n.className,
					l && e.setAttribute("style", l)
				}
			},
			l = function (t) {
				l.superclass.constructor.call(this, t),
				this.userConfig = o.mix({
						stickyRenderTo: void 0,
						forceSticky: !0,
						prefix: "xs-sticky-container",
						stickyRenderFunc: a,
						zoomType: "y"
					}, t),
				this.init()
			};
			return o.extend(l, r, {
				init: function () {
					var t = this,
					e = t.userConfig;
					t.xscroll = e.xscroll,
					t.isY = !("y" != e.zoomType);
					return t._ = {
						top: t.isY ? "top" : "left",
						left: t.isY ? "left" : "bottom",
						right: t.isY ? "right" : "top",
						height: t.isY ? "height" : "width",
						width: t.isY ? "width" : "height"
					},
					t.stickyRenderTo = o.getNode(e.stickyRenderTo),
					t._handlers = [],
					t
				},
				getStickiesPos: function () {
					for (var t = this, e = (t.xscroll, t.isInfinite), n = t.isY, i = t._, r = [], s = function (r) {
						var s = {};
						return e ? (s[i.top] = n ? r._top : r._left, s[i.height] = n ? r._height : r._width) : (s[i.top] = t.isY ? o.getOffsetTop(r) : o.getOffsetLeft(r), s[i.height] = t.isY ? r.offsetHeight : r.offsetWidth),
						s
					}, a = 0; a < t.stickiesNum; a++) {
						var l = s(t.stickyElements[a]);
						t._handlers[a] = t._handlers[a] || t.createStickyEl(),
						l.el = t._handlers[a],
						l.isRender = !1,
						r.push(l)
					}
					return r
				},
				getStickyElements: function () {
					var t = this,
					e = t.xscroll,
					n = (t.userConfig, t.isInfinite, e.getPlugin("infinite"));
					if (n) {
						var i = [],
						r = n.__serializedData;
						for (var s in r) {
							var a = r[s];
							a && a.style && "sticky" == a.style.position && i.push(a)
						}
						return i
					}
					return o.getNodes(e.userConfig.stickyElements, e.content)
				},
				render: function (t) {
					var e = this,
					n = e.userConfig,
					i = e.xscroll;
					e.isInfinite = !!i.getPlugin("infinite");
					var r = e._;
					if (e.stickyElements = e.getStickyElements(), e.stickiesNum = e.stickyElements && e.stickyElements.length, e.stickiesNum) {
						e.stickyRenderTo || (e.stickyRenderTo = document.createElement("div"), i.renderTo.appendChild(e.stickyRenderTo)),
						e.stickiesPos = e.getStickiesPos();
						var s = e.stickyRenderTo;
						s.style[r.top] = 0,
						s.style[r.left] = 0,
						s.style[r.right] = 0,
						s.style.position = i.userConfig.useOriginScroll ? "fixed" : "absolute",
						o.addClass(e.stickyRenderTo, n.prefix),
						e.stickyHandler(t),
						e._bindEvt()
					}
				},
				createStickyEl: function () {
					var t = this,
					e = document.createElement("div");
					return e.style.display = "none",
					o.addClass(e, "xs-sticky-handler"),
					t.stickyRenderTo.appendChild(e),
					e
				},
				_bindEvt: function () {
					var t = this,
					e = t.xscroll;
					e.on("scroll", t.stickyHandler, t)
				},
				stickyHandler: function (t) {
					for (var e = this, n = e.xscroll, i = (e.userConfig, e.isY ? n.getScrollTop() : n.getScrollLeft()), o = e.stickiesPos, r = e._, a = [], l = 0, c = o.length; l < c; l++) {
						var u = o[l][r.top];
						i > u && a.push(l)
					}
					if (!a.length)
						return e.stickyElement && (e.stickyElement.style.display = "none"), void(e.curStickyIndex = void 0);
					var f = Math.max.apply(null, a);
					if (e.curStickyIndex != f || t) {
						var d = e.curStickyIndex;
						e.curStickyIndex = f,
						e.curStickyElement = e.stickyElements[f],
						e.curStickyPos = o[f],
						e.stickyElement = e.curStickyPos.el;
						for (var l = 0, c = o.length; l < c; l++)
							o[l].el.style.display = "none";
						var p = {
							stickyElement: e.stickyElement,
							curStickyIndex: e.curStickyIndex,
							prevStickyIndex: d,
							curStickyPos: e.curStickyPos,
							isRender: e.curStickyPos.isRender
						};
						n.trigger("beforestickychange", p),
						e._stickyRenderFunc(e),
						n.trigger("stickychange", p)
					}
					var h = 0;
					if (e.stickiesPos[e.curStickyIndex + 1]) {
						var g = e.stickiesPos[e.curStickyIndex],
						v = e.stickiesPos[e.curStickyIndex + 1];
						h = i + g[r.height] > v[r.top] && i + g[r.height] < v[r.top] + g[r.height] ? g[r.height] + i - v[r.top] : 0
					}
					e.stickyElement.style[s] = e.isY ? "translateY(-" + h + "px) translateZ(0)" : "translateX(-" + h + "px) translateZ(0)"
				},
				_stickyRenderFunc: function (t) {
					var e = this,
					n = e._,
					i = e.userConfig.stickyRenderFunc,
					o = e.curStickyPos.el;
					e.curStickyPos.isRender || (o.style[n.left] = 0, o.style[n.right] = 0, i && i.call(e, t)),
					o.style.display = "block",
					e.curStickyPos.isRender = !0
				},
				destroy: function () {
					var t = this;
					t.stickyElements = void 0,
					t.stickiesNum = void 0,
					t.stickiesPos = void 0,
					o.remove(t.stickyElement),
					t.stickyElement = void 0
				}
			}),
			"object" == typeof i && i.exports ? void(i.exports = l) : l
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	61: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			var o = n(1),
			r = function (t) {
				var e,
				n = !1;
				return function () {
					return n ? e : (n = !0, e = t.apply(this, arguments), t = null, e)
				}
			},
			s = {
				on: function (t, e, n) {
					if (!l(this, "on", t, [e, n]) || !e)
						return this;
					this._events || (this._events = {});
					var i = this._events[t] || (this._events[t] = []);
					return i.push({
						callback: e,
						context: n,
						ctx: n || this
					}),
					this
				},
				once: function (t, e, n) {
					if (!l(this, "once", t, [e, n]) || !e)
						return this;
					var i = this,
					o = r(function () {
							i.off(t, o),
							e.apply(this, arguments)
						});
					return o._callback = e,
					this.on(t, o, n)
				},
				off: function (t, e, n) {
					if (!this._events || !l(this, "off", t, [e, n]))
						return this;
					if (!t && !e && !n)
						return this._events = void 0, this;
					for (var i = t ? [t] : Object.keys(this._events), o = 0, r = i.length; o < r; o++) {
						t = i[o];
						var s = this._events[t];
						if (s)
							if (e || n) {
								for (var a = [], c = 0, u = s.length; c < u; c++) {
									var f = s[c];
									(e && e !== f.callback && e !== f.callback._callback || n && n !== f.context) && a.push(f)
								}
								a.length ? this._events[t] = a : delete this._events[t]
							} else
								delete this._events[t]
					}
					return this
				},
				trigger: function (t) {
					if (!this._events)
						return this;
					var e = Array.prototype.slice.call(arguments, 1);
					if (!l(this, "trigger", t, e))
						return this;
					var n = this._events[t],
					i = this._events.all;
					return n && c(n, e),
					i && c(i, arguments),
					this
				},
				listenTo: function (t, e, n) {
					var i = this._listeningTo || (this._listeningTo = {}),
					r = t._listenId || (t._listenId = o.guid("l"));
					return i[r] = t,
					n || "object" != typeof e || (n = this),
					t.on(e, n, this),
					this
				},
				listenToOnce: function (t, e, n) {
					if ("object" == typeof e) {
						for (var i in e)
							this.listenToOnce(t, i, e[i]);
						return this
					}
					var o = r(function () {
							this.stopListening(t, e, o),
							n.apply(this, arguments)
						});
					return o._callback = n,
					this.listenTo(t, e, o)
				},
				stopListening: function (t, e, n) {
					var i = this._listeningTo;
					if (!i)
						return this;
					var r = !e && !n;
					n || "object" != typeof e || (n = this),
					t && ((i = {})[t._listenId] = t);
					for (var s in i)
						t = i[s], t.off(e, n, this), (r || o.isEmpty(t._events)) && delete this._listeningTo[s];
					return this
				}
			},
			a = /\s+/,
			l = function (t, e, n, i) {
				if (!n)
					return !0;
				if ("object" == typeof n) {
					for (var o in n)
						t[e].apply(t, [o, n[o]].concat(i));
					return !1
				}
				if (a.test(n)) {
					for (var r = n.split(a), s = 0, l = r.length; s < l; s++)
						t[e].apply(t, [r[s]].concat(i));
					return !1
				}
				return !0
			},
			c = function (t, e) {
				var n,
				i = -1,
				o = t.length,
				r = e[0],
				s = e[1],
				a = e[2];
				switch (e.length) {
				case 0:
					for (; ++i < o; )
						(n = t[i]).callback.call(n.ctx);
					return;
				case 1:
					for (; ++i < o; )
						(n = t[i]).callback.call(n.ctx, r);
					return;
				case 2:
					for (; ++i < o; )
						(n = t[i]).callback.call(n.ctx, r, s);
					return;
				case 3:
					for (; ++i < o; )
						(n = t[i]).callback.call(n.ctx, r, s, a);
					return;
				default:
					for (; ++i < o; )
						(n = t[i]).callback.apply(n.ctx, e);
					return
				}
			};
			return s.bind = s.on,
			s.unbind = s.off,
			"object" == typeof i && i.exports ? void(i.exports = s) : s
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	62: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			function o(t) {
				o.superclass.constructor.call(this, t)
			}
			var r = n(1),
			s = (n(5), n(11)),
			a = n(7);
			r.prefixStyle("transformOrigin");
			return r.extend(o, s, {
				init: function () {
					var t = this;
					o.superclass.init.call(this),
					t.resetSize()
				},
				getScrollTop: function () {
					return this.renderTo.scrollTop
				},
				getScrollLeft: function () {
					return this.renderTo.scrollLeft
				},
				scrollTop: function (t, e, n, i) {
					var o = this,
					t = Math.round(t);
					if (!o.userConfig.lockY) {
						var e = e || 0,
						n = n || "quadratic",
						r = {
							css: {
								scrollTop: t
							},
							duration: e,
							easing: n,
							run: function (t) {
								o.trigger("scroll", {
									scrollTop: o.getScrollTop(),
									scrollLeft: o.getScrollLeft()
								})
							},
							useTransition: !1,
							end: i
						};
						o.__timers.y = o.__timers.y || new a(o.renderTo, r),
						o.__timers.y.stop(),
						o.__timers.y.reset(r),
						o.__timers.y.run()
					}
				},
				scrollLeft: function (t, e, n, i) {
					var o = this,
					t = Math.round(t);
					if (!o.userConfig.lockX) {
						var e = e || 0,
						n = n || "quadratic",
						r = {
							css: {
								scrollLeft: t
							},
							duration: e,
							easing: n,
							run: function (t) {
								o.trigger("scroll", {
									scrollTop: o.getScrollTop(),
									scrollLeft: o.getScrollLeft()
								})
							},
							useTransition: !1,
							end: i
						};
						o.__timers.x = o.__timers.x || new a(o.renderTo, r),
						o.__timers.x.stop(),
						o.__timers.x.reset(r),
						o.__timers.x.run()
					}
				},
				_bindEvt: function () {
					o.superclass._bindEvt.call(this);
					var t = this;
					t.__isEvtBind || (t.__isEvtBind = !0, t.renderTo.addEventListener("scroll", function (e) {
							t.trigger("scroll", {
								type: "scroll",
								scrollTop: t.getScrollTop(),
								scrollLeft: t.getScrollLeft()
							})
						}, !1))
				}
			}),
			"object" == typeof i && i.exports ? void(i.exports = o) : o
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	63: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			var o,
			r = n(1),
			s = n(5),
			a = "Pull Down To Refresh",
			l = "Loading...",
			c = function (t) {
				c.superclass.constructor.call(this, t),
				this.userConfig = r.mix({
						content: a,
						height: 60,
						autoRefresh: !0,
						downContent: "Pull Down To Refresh",
						upContent: "Release To Refresh",
						loadingContent: l,
						clsPrefix: "xs-plugin-pulldown-"
					}, t)
			};
			if (r.extend(c, s, {
					pluginId: "pulldown",
					pluginInitializer: function (t) {
						var e = this;
						return e.xscroll = t.render(),
						o = e.userConfig.clsPrefix,
						e.render(),
						e
					},
					pluginDestructor: function () {
						var t = this;
						r.remove(t.pulldown),
						t.xscroll.off("panstart", t._panStartHandler, t),
						t.xscroll.off("pan", t._panHandler, t),
						t.xscroll.off("panend", t._panEndHandler, t),
						t.__isRender = !1,
						t._evtBinded = !1
					},
					render: function () {
						var t = this;
						if (!t.__isRender) {
							if (t.__isRender = !0, t.userConfig.container)
								t.pulldown = t.userConfig.container;
							else {
								var e = o + "container",
								n = t.userConfig.height || 60,
								i = t.pulldown = document.createElement("div");
								i.className = e,
								i.style.position = "absolute",
								i.style.width = "100%",
								i.style.height = n + "px",
								i.style.lineHeight = n + "px",
								i.style.top = -n + "px",
								i.style.textAlign = "center",
								t.xscroll.container.appendChild(i),
								t.status = "up",
								r.addClass(i, o + t.status),
								i.innerHTML = t.userConfig[t.status + "Content"] || t.userConfig.content
							}
							return t._bindEvt(),
							t
						}
					},
					_bindEvt: function () {
						var t = this;
						if (!t._evtBinded) {
							t._evtBinded = !0;
							var e = (t.pulldown, t.xscroll);
							e.on("pan", t._panHandler, t),
							e.on("panstart", t._panStartHandler, t),
							e.on("panend", t._panEndHandler, t)
						}
					},
					_changeStatus: function (t) {
						var e = this.status;
						this.status = t,
						this.userConfig.container || (r.removeClass(this.pulldown, o + e),
							r.addClass(this.pulldown, o + t), this.userConfig[t + "Content"] && (this.pulldown.innerHTML = this.userConfig[t + "Content"])),
						e != t && (this.trigger("statuschange", {
								prevVal: e,
								newVal: t
							}), "loading" == t && this.trigger("loading"))
					},
					reset: function (t) {
						return this.xscroll.boundry.resetTop(),
						this.xscroll.boundryCheckY(t),
						this._expanded = !1,
						this
					},
					_panStartHandler: function (t) {
						clearTimeout(this.loadingItv)
					},
					_panHandler: function (t) {
						var e = this,
						n = e.xscroll.getScrollTop();
						n > 0 || e._changeStatus(Math.abs(n) < e.userConfig.height ? "down" : "up")
					},
					_panEndHandler: function (t) {
						var e = this,
						n = e.xscroll,
						i = e.userConfig.height || 60,
						o = n.getScrollTop();
						o < -i && (t.preventDefault(), n.boundry.resetTop(), e._changeStatus("loading"), n.boundry.expandTop(i), n.boundryCheckY(function () {}), e.userConfig.autoRefresh && (clearTimeout(e.loadingItv), e.loadingItv = setTimeout(function () {
										n.boundry.resetTop(),
										n.boundryCheckY(function () {
											window.location.reload()
										})
									}, 800)))
					}
				}), "object" == typeof i && i.exports)
				i.exports = c;
			else if (window.XScroll && window.XScroll.Plugins)
				return XScroll.Plugins.PullDown = c
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	64: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			var o,
			r = n(1),
			s = n(5),
			a = "Loading...",
			l = "Pull Up To Refresh",
			c = "Release To Refresh",
			u = 60,
			f = 40,
			d = function (t) {
				d.superclass.constructor.call(this),
				this.userConfig = r.mix({
						upContent: l,
						downContent: c,
						pullUpHeight: u,
						height: f,
						loadingContent: a,
						bufferHeight: 0,
						clsPrefix: "xs-plugin-pullup-"
					}, t)
			};
			if (r.extend(d, s, {
					pluginId: "pullup",
					pluginInitializer: function (t) {
						var e = this;
						return e.xscroll = t.render(),
						o = e.userConfig.clsPrefix,
						e.render(),
						e
					},
					pluginDestructor: function () {
						var t = this;
						r.remove(t.pullup),
						t.xscroll.off("scrollend", t._scrollEndHandler, t),
						t.xscroll.off("scroll", t._scrollHandler, t),
						t.xscroll.off("pan", t._panHandler, t),
						t.xscroll.boundry.resetBottom(),
						t.__isRender = !1,
						t._evtBinded = !1
					},
					pluginDisable: function () {
						var t = this;
						t.userConfig.container || r.remove(t.pullup),
						t.xscroll.off("scrollend", t._scrollEndHandler, t),
						t.xscroll.off("scroll", t._scrollHandler, t),
						t.xscroll.off("pan", t._panHandler, t),
						t.xscroll.boundry.resetBottom(),
						t.__isRender = !1,
						t._evtBinded = !1
					},
					render: function () {
						var t = this;
						if (!t.__isRender) {
							if (t.__isRender = !0, t.userConfig.container)
								t.pullup = t.userConfig.container;
							else {
								var e = o + "container",
								n = t.userConfig.height,
								i = t.pullup = document.createElement("div");
								i.className = e,
								i.style.position = "absolute",
								i.style.width = "100%",
								i.style.height = n + "px",
								i.style.bottom = -n + "px",
								i.style.textAlign = "center",
								t.xscroll.container.appendChild(i),
								r.addClass(i, o + t.status),
								i.innerHTML = t.userConfig[t.status + "Content"] || t.userConfig.content
							}
							return t.xscroll.boundry.expandBottom(t.userConfig.height),
							t.status = "up",
							t._bindEvt(),
							t
						}
					},
					_bindEvt: function () {
						var t = this;
						if (!t._evtBinded) {
							t._evtBinded = !0;
							var e = (t.pullup, t.xscroll);
							return e.on("pan", t._panHandler, t),
							t.userConfig.bufferHeight > 0 && e.on("scroll", t._scrollHandler, t),
							e.on("scrollend", t._scrollEndHandler, t),
							t
						}
					},
					_scrollEndHandler: function (t) {
						var e = this,
						n = e.xscroll,
						i = n.getScrollTop();
						return i == n.containerHeight - n.height + e.userConfig.height && e._changeStatus("loading"),
						e
					},
					_scrollHandler: function (t) {
						var e = this,
						n = e.xscroll;
						return !e.isLoading && Math.abs(t.scrollTop) + n.height + e.userConfig.height + e.userConfig.bufferHeight >= n.containerHeight + n.boundry._xtop + n.boundry._xbottom && e._changeStatus("loading"),
						e
					},
					_panHandler: function (t) {
						var e = this,
						n = e.xscroll,
						i = -n.getScrollTop();
						return i < n.height - n.containerHeight - e.userConfig.pullUpHeight ? e._changeStatus("down") : e._changeStatus("up"),
						e
					},
					_changeStatus: function (t) {
						if ("loading" == t || !this.isLoading) {
							var e = this.status;
							return this.status = t,
							this.userConfig.container || (r.removeClass(this.pullup, o + e), r.addClass(this.pullup, o + t), this.pullup.innerHTML = this.userConfig[t + "Content"]),
							e != t && (this.trigger("statuschange", {
									prevVal: e,
									newVal: t
								}), "loading" == t && (this.isLoading = !0, this.trigger("loading"))),
							this
						}
					},
					complete: function () {
						var t = this;
						t.xscroll;
						return t.isLoading = !1,
						t._changeStatus("up"),
						t
					},
					stop: function () {
						this.xscroll;
						return this.isLoading = !1,
						this._changeStatus("stop"),
						this.pluginDisable(),
						this
					},
					restart: function () {
						this.xscroll;
						return this.isLoading = !1,
						this._changeStatus("default"),
						this.render(),
						this
					}
				}), "object" == typeof i && i.exports)
				i.exports = d;
			else if (window.XScroll && window.XScroll.Plugins)
				return XScroll.Plugins.PullUp = d
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	65: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			function o(t) {
				o.superclass.constructor.call(this, t)
			}
			var r = n(1),
			s = (n(5), n(11)),
			a = n(7),
			l = n(9),
			c = n(59),
			u = n(57),
			f = .382,
			d = 5e-4,
			p = .03,
			h = r.prefixStyle("transformOrigin"),
			g = r.prefixStyle("transform");
			return r.extend(o, s, {
				init: function () {
					var t = this,
					e = {
						preventDefault: !0,
						preventTouchMove: !0
					};
					return o.superclass.init.call(this),
					t.userConfig = r.mix(e, t.userConfig),
					t.SCROLL_ACCELERATION = t.userConfig.SCROLL_ACCELERATION || d,
					t.BOUNDRY_ACCELERATION = t.userConfig.BOUNDRY_ACCELERATION || p,
					t._initContainer(),
					t.resetSize(),
					t._setOverflowBehavior(),
					t.defaltConfig = {
						lockY: t.userConfig.lockY,
						lockX: t.userConfig.lockX
					},
					t
				},
				destroy: function () {
					var t = this;
					o.superclass.destroy.call(this),
					t.renderTo.style.overflow = "",
					t.renderTo.style.touchAction = "",
					t.container.style.transform = "",
					t.container.style.transformOrigin = "",
					t.content.style.transform = "",
					t.content.style.transformOrigin = "",
					t.off("touchstart mousedown", t._ontouchstart),
					t.off("touchmove", t._ontouchmove),
					window.removeEventListener("resize", t.resizeHandler, t),
					t.destroyScrollBars()
				},
				_setOverflowBehavior: function () {
					var t = this,
					e = t.renderTo,
					n = getComputedStyle(e);
					return t.userConfig.lockX = void 0 === t.userConfig.lockX ? "hidden" == n["overflow-x"] || t.width == t.containerWidth : t.userConfig.lockX,
					t.userConfig.lockY = void 0 === t.userConfig.lockY ? "hidden" == n["overflow-y"] || t.height == t.containerHeight : t.userConfig.lockY,
					t.userConfig.scrollbarX = void 0 === t.userConfig.scrollbarX ? !t.userConfig.lockX : t.userConfig.scrollbarX,
					t.userConfig.scrollbarY = void 0 === t.userConfig.scrollbarY ? !t.userConfig.lockY : t.userConfig.scrollbarY,
					t
				},
				_resetLockConfig: function () {
					var t = this;
					return t.userConfig.lockX = t.defaltConfig.lockX,
					t.userConfig.lockY = t.defaltConfig.lockY,
					t
				},
				_initContainer: function () {
					var t = this;
					if (o.superclass._initContainer.call(t), !t.__isContainerInited && t.container && t.content)
						return t.container.style[h] = "0 0", t.content.style[h] = "0 0", t.translate(0, 0), t.__isContainerInited = !0, t
				},
				getScrollTop: function () {
					var t = window.getComputedStyle(this.container)[g].match(/[-\d\.*\d*]+/g);
					return t ? 0 === Math.round(t[5]) ? 0 : -Math.round(t[5]) : 0
				},
				getScrollLeft: function () {
					var t = window.getComputedStyle(this.content)[g].match(/[-\d\.*\d*]+/g);
					return t ? 0 === Math.round(t[4]) ? 0 : -Math.round(t[4]) : 0
				},
				scrollLeft: function (t, e, n, i) {
					if (!this.userConfig.lockX) {
						var o = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
						return this.x = void 0 === t || isNaN(t) || 0 === t ? 0 : -Math.round(t),
						this._animate("x", "translateX(" + this.x + "px) scale(" + this.scale + ")" + o, e, n, i),
						this
					}
				},
				scrollTop: function (t, e, n, i) {
					if (!this.userConfig.lockY) {
						var o = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
						return this.y = void 0 === t || isNaN(t) || 0 === t ? 0 : -Math.round(t),
						this._animate("y", "translateY(" + this.y + "px) " + o, e, n, i),
						this
					}
				},
				translate: function (t, e, n) {
					var i = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
					return this.x = t || this.x || 0,
					this.y = e || this.y || 0,
					this.scale = n || this.scale || 1,
					this.content.style[g] = "translate(" + this.x + "px,0px) scale(" + this.scale + ") " + i,
					this.container.style[g] = "translate(0px," + this.y + "px) " + i,
					this
				},
				_animate: function (t, e, n, i, o) {
					var r = this,
					n = n || 0,
					i = i || "quadratic",
					s = "y" == t ? r.container : r.content,
					l = {
						css: {
							transform: e
						},
						duration: n,
						easing: i,
						run: function (t) {
							r.trigger("scroll", {
								scrollTop: r.getScrollTop(),
								scrollLeft: r.getScrollLeft(),
								type: "scroll"
							})
						},
						useTransition: r.userConfig.useTransition,
						end: function (e) {
							o && o(),
							0 !== r["_bounce" + t] && void 0 !== r["_bounce" + t] || "linear" == i || (r["isScrolling" + t.toUpperCase()] = !1, r["isRealScrolling" + t.toUpperCase()] = !1, r.trigger("scrollend", {
									type: "scrollend",
									scrollTop: r.getScrollTop(),
									scrollLeft: r.getScrollLeft(),
									zoomType: t,
									duration: n,
									easing: i
								}))
						}
					},
					c = r.__timers[t] = r.__timers[t] || new a(s, l);
					return c.stop(),
					c.reset(l),
					c.run(),
					r.trigger("scrollanimate", {
						type: "scrollanimate",
						scrollTop: -r.y,
						scrollLeft: -r.x,
						duration: n,
						easing: i,
						zoomType: t
					}),
					this
				},
				_ontap: function (t) {
					var e = this;
					e.boundryCheck(),
					!e.isRealScrollingX && !e.isRealScrollingY,
					e.isRealScrollingY = !1,
					e.isRealScrollingY = !1
				},
				_bindEvt: function () {
					o.superclass._bindEvt.call(this);
					var t = this;
					if (!t.__isEvtBind) {
						t.__isEvtBind = !0;
						var e = new l.Pinch;
						return t.mc.add(e),
						t.on("touchstart mousedown", t._ontouchstart, t),
						t.on("touchmove", t._ontouchmove, t),
						t.on("tap", t._ontap, t),
						t.on("panstart", t._onpanstart, t),
						t.on("pan", t._onpan, t),
						t.on("panend", t._onpanend, t),
						t.resizeHandler = function (e) {
							setTimeout(function () {
								t.resetSize(),
								t.boundryCheck(0),
								t.render()
							}, 100)
						},
						window.addEventListener("resize", t.resizeHandler, t),
						this
					}
				},
				_ontouchstart: function (t) {
					var e = this;
					!/(SELECT|INPUT|TEXTAREA)/i.test(t.target.tagName) && e.userConfig.preventDefault && t.preventDefault(),
					e.stop()
				},
				_ontouchmove: function (t) {
					this.userConfig.preventTouchMove && t.preventDefault()
				},
				_onpanstart: function (t) {
					this.userConfig.preventTouchMove && t.preventDefault();
					var e = this,
					n = e.getScrollLeft(),
					i = e.getScrollTop();
					e.stop(),
					e.translate(-n, -i);
					var o = e.mc.get("pan").options.threshold;
					return e.thresholdY = "8" == t.direction ? o : "16" == t.direction ? -o : 0,
					e.thresholdX = "2" == t.direction ? o : "4" == t.direction ? -o : 0,
					e
				},
				_onpan: function (t) {
					this.userConfig.preventTouchMove && t.preventDefault();
					var e = this,
					n = e.boundry,
					i = e.userConfig,
					o = i.boundryCheck,
					r = i.bounce,
					s = e.__topstart || (e.__topstart = -e.getScrollTop()),
					a = e.__leftstart || (e.__leftstart = -e.getScrollLeft()),
					l = i.lockY ? Number(s) : Number(s) + (t.deltaY + e.thresholdY),
					c = i.lockX ? Number(a) : Number(a) + (t.deltaX + e.thresholdX),
					u = e.containerWidth,
					d = e.containerHeight;
					return o && (l = l > n.top ? r ? (l - n.top) * f + n.top : n.top : l, l = l < n.bottom - d ? r ? l + (n.bottom - d - l) * f : n.bottom - d : l, c = c > n.left ? r ? (c - n.left) * f + n.left : n.left : c, c = c < n.right - u ? r ? c + (n.right - u - c) * f : n.right - u : c),
					e.translate(c, l),
					e.directionX = "panleft" == t.type ? "right" : "panright" == t.type ? "left" : "",
					e.directionY = "panup" == t.type ? "down" : "pandown" == t.type ? "up" : "",
					e.trigger("scroll", {
						scrollTop: -l,
						scrollLeft: -c,
						triggerType: "pan",
						type: "scroll"
					}),
					e
				},
				_onpanend: function (t) {
					var e,
					n = this,
					i = (n.userConfig, n.computeScroll("x", t.velocityX)),
					o = n.computeScroll("y", t.velocityY),
					r = i ? i.pos : 0,
					s = o ? o.pos : 0;
					return i && o && "inside" == i.status && "inside" == o.status && i.duration && o.duration && (e = Math.max(i.duration, o.duration)),
					i && n.scrollLeft(r, e || i.duration, i.easing, function (t) {
						n.boundryCheckX()
					}),
					o && n.scrollTop(s, e || o.duration, o.easing, function (t) {
						n.boundryCheckY()
					}),
					n.directionX = t.velocityX < 0 ? "left" : "right",
					n.directionY = t.velocityY < 0 ? "up" : "down",
					n.__topstart = null,
					n.__leftstart = null,
					n
				},
				isBoundryOut: function () {
					return this.isBoundryOutLeft() || this.isBoundryOutRight() || this.isBoundryOutTop() || this.isBoundryOutBottom()
				},
				isBoundryOutLeft: function () {
					return this.getBoundryOutLeft() > 0
				},
				isBoundryOutRight: function () {
					return this.getBoundryOutRight() > 0
				},
				isBoundryOutTop: function () {
					return this.getBoundryOutTop() > 0
				},
				isBoundryOutBottom: function () {
					return this.getBoundryOutBottom() > 0
				},
				getBoundryOutTop: function () {
					return -this.boundry.top - this.getScrollTop()
				},
				getBoundryOutLeft: function () {
					return -this.boundry.left - this.getScrollLeft()
				},
				getBoundryOutBottom: function () {
					return this.boundry.bottom - this.containerHeight + this.getScrollTop()
				},
				getBoundryOutRight: function () {
					return this.boundry.right - this.containerWidth + this.getScrollLeft()
				},
				computeScroll: function (t, e) {
					var n = this,
					i = n.userConfig,
					o = n.boundry,
					r = "x" == t ? n.getScrollLeft() : n.getScrollTop(),
					s = "x" == t ? o.left : o.top,
					a = "x" == t ? o.right : o.bottom,
					l = "x" == t ? n.containerWidth : n.containerHeight,
					c = i.maxSpeed || 2,
					u = i.boundryCheck,
					f = i.bounce,
					d = {},
					p = "inside";
					if (u) {
						if ("x" == t && (n.isBoundryOutLeft() || n.isBoundryOutRight()))
							return void n.boundryCheckX();
						if ("y" == t && (n.isBoundryOutTop() || n.isBoundryOutBottom()))
							return void n.boundryCheckY()
					}
					if (!("x" == t && n.userConfig.lockX || "y" == t && n.userConfig.lockY)) {
						e = e > c ? c : e < -c ? -c : e;
						var h = n.SCROLL_ACCELERATION * (e / (Math.abs(e) || 1)),
						g = n.BOUNDRY_ACCELERATION,
						v = isNaN(e / h) ? 0 : e / h,
						m = Number(r) + v * e / 2;
						if (m < -s && u) {
							var y = -s - r,
							x = (Math.sqrt(-2 * h * y + e * e) + e) / h,
							b = e - h * x,
							_ = Math.abs(b / g),
							w = b / 2 * _;
							v = x + _,
							m = f ? -s + w : -s,
							p = "outside"
						} else if (m > l - a && u) {
							var y = a - l + r,
							x = (Math.sqrt(-2 * h * y + e * e) - e) / h,
							b = e - h * x,
							_ = Math.abs(b / g),
							w = b / 2 * _;
							v = x + _,
							m = f ? l - a + w : l - a,
							p = "outside"
						}
						if (!isNaN(m) && !isNaN(v)) {
							d.pos = m,
							d.duration = v,
							d.easing = Math.abs(e) > 2 ? "circular" : "quadratic",
							d.status = p;
							var C = t.toUpperCase();
							return n["isScrolling" + C] = !0,
							n["isRealScrolling" + C] = !0,
							d
						}
					}
				},
				boundryCheckX: function (t, e, n) {
					var i = this;
					if (i.userConfig.boundryCheck && ("function" == typeof arguments[0] ? (n = arguments[0], t = i.userConfig.BOUNDRY_CHECK_DURATION, e = i.userConfig.BOUNDRY_CHECK_EASING) : (t = 0 === t ? 0 : i.userConfig.BOUNDRY_CHECK_DURATION, e = e || i.userConfig.BOUNDRY_CHECK_EASING), i.userConfig.bounce && !i.userConfig.lockX)) {
						var o = i.boundry;
						return i.isBoundryOutLeft() ? i.scrollLeft(-o.left, t, e, n) : i.isBoundryOutRight() && i.scrollLeft(i.containerWidth - o.right, t, e, n),
						i
					}
				},
				boundryCheckY: function (t, e, n) {
					var i = this;
					if (i.userConfig.boundryCheck && ("function" == typeof arguments[0] ? (n = arguments[0], t = i.userConfig.BOUNDRY_CHECK_DURATION, e = i.userConfig.BOUNDRY_CHECK_EASING) : (t = 0 === t ? 0 : i.userConfig.BOUNDRY_CHECK_DURATION, e = e || i.userConfig.BOUNDRY_CHECK_EASING), i.userConfig.boundryCheck && !i.userConfig.lockY)) {
						var o = i.boundry;
						return i.isBoundryOutTop() ? i.scrollTop(-o.top, t, e, n) : i.isBoundryOutBottom() && i.scrollTop(i.containerHeight - o.bottom, t, e, n),
						i
					}
				},
				boundryCheck: function (t, e, n) {
					return this.boundryCheckX(t, e, n),
					this.boundryCheckY(t, e, n),
					this
				},
				stop: function () {
					var t = this;
					if (t.__timers.x && t.__timers.x.stop(), t.__timers.y && t.__timers.y.stop(), t.isScrollingX || t.isScrollingY) {
						var e = t.getScrollTop(),
						n = t.getScrollLeft();
						t.trigger("scrollend", {
							scrollTop: e,
							scrollLeft: n
						}),
						t.trigger("stop", {
							scrollTop: e,
							scrollLeft: n
						}),
						t.isScrollingX = !1,
						t.isScrollingY = !1
					}
					return t
				},
				render: function () {
					var t = this;
					return o.superclass.render.call(this),
					"static" == getComputedStyle(t.renderTo).position && (t.renderTo.style.position = "relative"),
					t.renderTo.style.overflow = "hidden",
					t.initScrollBars(),
					t.initController(),
					t
				},
				initScrollBars: function () {
					var t = this;
					if (t.userConfig.boundryCheck) {
						var e = t.userConfig.indicatorInsets;
						return t.userConfig.scrollbarX && (t.scrollbarX = t.scrollbarX || new c({
									xscroll: t,
									type: "x",
									spacing: e.spacing
								}), t.scrollbarX.render(), t.scrollbarX._update(), t.scrollbarX.hide()),
						t.userConfig.scrollbarY && (t.scrollbarY = t.scrollbarY || new c({
									xscroll: t,
									type: "y",
									spacing: e.spacing
								}), t.scrollbarY.render(), t.scrollbarY._update(), t.scrollbarY.hide()),
						t
					}
				},
				destroyScrollBars: function () {
					return this.scrollbarX && this.scrollbarX.destroy(),
					this.scrollbarY && this.scrollbarY.destroy(),
					this
				},
				initController: function () {
					var t = this;
					return t.controller = t.controller || new u({
							xscroll: t
						}),
					t
				},
				_unPreventHref: function (t) {
					var e = r.findParentEl(t.target, "a", this.renderTo);
					if (e && "a" == e.tagName.toLowerCase()) {
						var n = e.getAttribute("data-xs-href");
						n && e.setAttribute("href", n)
					}
				},
				_preventHref: function (t) {
					var e = r.findParentEl(t.target, "a", this.renderTo);
					if (e && "a" == e.tagName.toLowerCase()) {
						var n = e.getAttribute("href");
						n && e.setAttribute("href", "javascript:void(0)"),
						n && e.setAttribute("data-xs-href", n)
					}
				},
				_triggerClick: function (t) {
					var e = t.target;
					if (!/(SELECT|INPUT|TEXTAREA)/i.test(e.tagName)) {
						var n = document.createEvent("MouseEvents");
						n.initMouseEvent("click", !0, !0, t.view, 1, e.screenX, e.screenY, e.clientX, e.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null),
						e.dispatchEvent(n)
					}
				}
			}),
			"object" == typeof i && i.exports ? void(i.exports = o) : o
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	66: function (t, e, n) {
		var i;
		i = function (t, e, i) {
			"use strict";
			var o = n(1),
			r = n(5),
			s = n(13),
			a = n(7),
			l = n(9),
			c = n(65),
			u = n(62),
			f = function (t) {
				var e = t && t.useOriginScroll ? u : c;
				return new e(t)
			};
			return f.Util = o,
			f.Base = r,
			f.Timer = s,
			f.Animate = a,
			f.Hammer = l,
			f.Plugins = {},
			"object" == typeof i && i.exports ? void(i.exports = f) : window.XScroll = f
		}
		.call(e, n, e, t),
		!(void 0 !== i && (t.exports = i))
	},
	230: function (t, e, n) {
		t.exports = n.p + "static/img/floating_button.bb96a97.png"
	},
	239: function (t, e, n) {
		"use strict";
		function i(t) {
			return t && t.__esModule ? t : {
			default:
				t
			}
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var o = n(16),
		r = i(o),
		s = 60,
		a = 60,
		l = 100;
		e.default = {
			props: {
				scrollId: {
					type: String,
					require: !0
				},
				menuList: {
					type: Array,
					require: !0
				}
			},
			data: function () {
				return {
					isFloatingMenuOpen: !1,
					isScrolling: !1,
					isMenuOpenLeft: !1,
					windowWidth: 0,
					windowHeight: 0,
					isDragging: !1,
					position: {
						x: 0,
						y: 0
					}
				}
			},
			methods: {
				savePosition: r.default.debounce(function () {
					window.localStorage.setItem("floating_position", this.position.x + "," + this.position.y)
				})
			},
			created: function () {
				this.windowWidth = window.screen.availWidth,
				this.windowHeight = window.screen.availHeight;
				var t = window.localStorage.getItem("floating_position");
				if (t) {
					var e = t.split(",");
					this.position.x = parseFloat(e[0]),
					this.position.y = parseFloat(e[1])
				} else
					this.position.x = .8 * this.windowWidth, this.position.y = .3 * this.windowHeight
			},
			mounted: function () {
				var t = this,
				e = this;
				this.$nextTick(function () {
					window.document.querySelector(t.scrollId).addEventListener("scrollstart", function (t) {
						e.scrollingAni = !0,
						e.isScrolling = !0
					}),
					window.document.querySelector(t.scrollId).addEventListener("scrollend", function (t) {
						e.isScrolling = !1
					}),
					t.$refs.floatingButton.addEventListener("touchstart", function (t) {
						e.isDragging = !0
					}),
					t.$refs.floatingButton.addEventListener("touchmove", function (t) {
						if (!e.isFloatingMenuOpen) {
							var n = t.targetTouches[0];
							e.position.x = Math.min(e.windowWidth - s, Math.max(0, n.pageX - s / 2)),
							e.position.y = Math.min(e.windowHeight - a, Math.max(0, n.pageY - a / 2))
						}
					}),
					t.$refs.floatingButton.addEventListener("touchend", function (t) {
						e.isDragging = !1,
						e.isMenuOpenLeft = e.position.x > e.windowWidth / 2,
						e.position.x = e.position.x > e.windowWidth / 2 ? e.windowWidth - s : 0,
						e.position.y = Math.min(e.windowHeight - a - l, Math.max(l, e.position.y)),
						e.savePosition()
					}),
					t.$refs.floatingButton.addEventListener("touchcancel", function (t) {})
				})
			}
		}
	},
	266: function (t, e, n) {
		e = t.exports = n(3)(),
		e.push([t.id, ".float-button-container[data-v-31cb503f]{position:fixed;z-index:10;transform:scale(1)}.float-button-container.animation[data-v-31cb503f]{transition:all .3s}.float-button-container.scrolling[data-v-31cb503f]{transform:scale(.6)}.floating-mask[data-v-31cb503f]{position:fixed;background:rgba(0,0,0,.2);z-index:9}.float-button-container .floating-button[data-v-31cb503f]{background:url(" + n(230) + ") no-repeat;background-size:68px;display:block;width:68px;height:68px;text-align:center;z-index:3}.float-button-container .floating-button .fa[data-v-31cb503f]{color:#fff;font-size:22px;display:block;position:absolute;left:23px;top:17px;font-weight:300;transition:all .3s;transform:rotate(0deg)}.float-button-container .floating-button.show .fa[data-v-31cb503f]{transform:rotate(225deg)}.float-button-container .floating-sub-button[data-v-31cb503f]{position:absolute;left:36px;top:36px;z-index:-1}.float-button-container .floating-sub-button a[data-v-31cb503f]{position:absolute;display:block;width:46px;height:46px;border-radius:50%;background-color:#ff3857;color:#fff;font-size:12px;text-align:center;left:-17px;top:-17px;transition:all .3s;padding:8px 0 0;transform:scale(0) rotate(1turn)}.float-button-container .floating-sub-button a .fa[data-v-31cb503f]{font-size:21px;margin:0 auto;display:block;text-align:center}.float-button-container .floating-sub-button a span[data-v-31cb503f]{display:block;text-align:center;line-height:18px}.float-button-container .floating-sub-button.show a[data-v-31cb503f]{display:block;transform:scale(1) rotate(0deg)}.float-button-container .floating-sub-button.show a[data-v-31cb503f]:first-child{left:-33.5px;top:-104.5px}.float-button-container .floating-sub-button.show a[data-v-31cb503f]:nth-child(2){left:24.5px;top:-89.5px}.float-button-container .floating-sub-button.show a[data-v-31cb503f]:nth-child(3){left:46.5px;top:-33.5px}.float-button-container .floating-sub-button.show a[data-v-31cb503f]:nth-child(4){left:24.5px;top:22.5px}.float-button-container .floating-sub-button.show a[data-v-31cb503f]:nth-child(5){left:-33.5px;top:44px}.float-button-container.left .floating-sub-button.show a[data-v-31cb503f]:first-child{left:-25px;top:-108px}.float-button-container.left .floating-sub-button.show a[data-v-31cb503f]:nth-child(2){left:-83px;top:-86px}.float-button-container.left .floating-sub-button.show a[data-v-31cb503f]:nth-child(3){left:-105px;top:-30px}.float-button-container.left .floating-sub-button.show a[data-v-31cb503f]:nth-child(4){left:-83px;top:26px}.float-button-container.left .floating-sub-button.show a[data-v-31cb503f]:nth-child(5){left:-25px;top:48px}", ""])
	},
	276: function (t, e, n) {
		var i = n(266);
		"string" == typeof i && (i = [[t.id, i, ""]]);
		n(4)(i, {});
		i.locals && (t.exports = i.locals)
	},
	298: function (t, e) {
		t.exports = {
			render: function () {
				var t = this,
				e = t.$createElement,
				n = t._self._c || e;
				return n("div", [n("div", {
							ref: "floatingContainer",
							staticClass: "float-button-container",
							class: {
								scrolling: t.isScrolling,
								animation: !t.isDragging,
								left: t.isMenuOpenLeft
							},
							style: {
								left: t.position.x + "px",
								top: t.position.y + "px"
							}
						}, [n("a", {
									ref: "floatingButton",
									staticClass: "floating-button",
									class: {
										show: t.isFloatingMenuOpen
									},
									on: {
										click: function (e) {
											t.isFloatingMenuOpen = !t.isFloatingMenuOpen
										}
									}
								}, [n("i", {
											staticClass: "fa fa-plus"
										})]), t._v(" "), n("div", {
									staticClass: "floating-sub-button",
									class: {
										show: t.isFloatingMenuOpen
									}
								}, t._l(t.menuList, function (e) {
										return n("a", {
											on: {
												click: function (n) {
													t.isFloatingMenuOpen = !1,
													e.action()
												}
											}
										}, [n("i", {
													staticClass: "fa",
													class: [e.icon]
												}), t._v(" "), n("span", [t._v(t._s(e.name))])])
									}))]), t._v(" "), n("transition", {
							attrs: {
								name: "fade"
							}
						}, [n("div", {
									directives: [{
											name: "show",
											rawName: "v-show",
											value: t.isFloatingMenuOpen,
											expression: "isFloatingMenuOpen"
										}
									],
									staticClass: "floating-mask",
									style: {
										width: t.windowWidth + "px",
										height: t.windowHeight + "px"
									},
									on: {
										click: function (e) {
											t.isFloatingMenuOpen = !1
										}
									}
								})])], 1)
			},
			staticRenderFns: []
		}
	},
	306: function (t, e, n) {
		n(276);
		var i = n(2)(n(239), n(298), "data-v-31cb503f", null);
		t.exports = i.exports
	},
	456: function (t, e, n) {
		"use strict";
		function i(t) {
			return t && t.__esModule ? t : {
			default:
				t
			}
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var o = n(33),
		r = i(o),
		s = n(18),
		a = i(s),
		l = n(306),
		c = i(l),
		u = n(39),
		f = i(u),
		d = n(49),
		p = i(d),
		h = [22, 26, 70, 71, 45];
		e.default = {
			components: {
				Spinner: r.default,
				Scroller: a.default,
				FloatingMenu: c.default
			},
			data: function () {
				return {
					isScrolling: !1,
					viewType: "game",
					AppStatus: p.default,
					initLoading: !0,
					isShowCustomGameId: !1,
					isFloatingMenuOpen: !1,
					gameIds: [],
					isGameIdsDirty: !1,
					userFavoriteGameList: [],
					unFavoriteGameList: [],
					gameLmclList: [],
					rankLmcl: [],
					windowWidth: 0,
					windowHeight: 0,
					floatingMenu: []
				}
			},
			methods: {
				showCustomGameDialog: function () {
					var t = this;
					this.isShowCustomGameId = !0,
					this.isFloatingMenuOpen = !1,
					this.$nextTick(function () {
						t.$refs.popupContentScroller.reset()
					})
				},
				unselectGame: function (t) {
					var e = this.gameIds.findIndex(function (e) {
							return e === t.id
						});
					this.gameIds.splice(e, 1),
					this.unFavoriteGameList.push(t);
					var n = this.userFavoriteGameList.findIndex(function (e) {
							return e.id === t.id
						});
					this.userFavoriteGameList.splice(n, 1),
					this.isGameIdsDirty = !0
				},
				selectGame: function (t) {
					var e = this.unFavoriteGameList.findIndex(function (e) {
							return e.id === t.id
						});
					e > -1 && (this.gameIds.push(t.id), this.userFavoriteGameList.push(t), this.unFavoriteGameList.splice(e, 1), this.isGameIdsDirty = !0)
				},
				closeCustomGamePopup: function () {
					var t = this;
					this.isShowCustomGameId = !1,
					this.isGameIdsDirty && (p.default.userType ? this.$http.post("/api/user/saveFavoriteLmclGameIds", {
							gameIds: this.gameIds.join(",")
						}, {
							emulateJSON: !0
						}).then(function (e) {
							t.loadGameLmcl()
						}) : this.loadGameLmcl())
				},
				bet: function (t) {
					this.$router.push({
						path: "/game/" + t.gameId + "/credit/" + t.code
					})
				},
				toggleItem: function (t) {
					t.isOpen = !t.isOpen
				},
				loadUserFavoriteLmclGmaeIds: function (t) {
					var e = this;
					p.default.userType ? this.$http.get("/api/user/getUserFavoriteLmclGameIds").then(function (n) {
						if (n.body.length > 0) {
							e.gameIds = n.body;
							for (var i = e.gameIds.length - 1; i >= 0; i--)
								e.gameIds[i] = parseInt(e.gameIds[i])
						} else
							e.gameIds = h;
						t()
					}, function (n) {
						e.gameIds = h,
						t()
					}) : (this.gameIds = h, t())
				},
				loadGameRank: function () {
					var t = this;
					this.initLoading = !0,
					this.rankLmcl = [],
					this.$http.get("/v/lottery/lmcl_rank").then(function (e) {
						t.rankLmcl = e.body,
						t.initLoading = !1,
						(0, f.default)(".tulongbang-scroll-wrapper").scroll().refresh()
					})
				},
				loadGameLmcl: function () {
					var t = this;
					this.initLoading = !0,
					this.gameLmclList = [],
					this.$http.get("/v/lottery/game_lmcl", {
						params: {
							gameIds: this.gameIds.join(",")
						}
					}).then(function (e) {
						e.body.forEach(function (t) {
							t.isOpen = !0
						}),
						t.gameLmclList = e.body,
						t.initLoading = !1,
						(0, f.default)(".tulongbang-scroll-wrapper").scroll().refresh()
					})
				}
			},
			mounted: function () {
				var t = this;
				this.windowWidth = window.screen.availWidth,
				this.windowHeight = window.screen.availHeight,
				(0, f.default)(".tulongbang-scroll-wrapper").scroll({
					scrollY: !0,
					scrollX: !1,
					indicators: !0,
					bounce: !0
				});
				var e = this;
				this.floatingMenu = [{
						name: "混排",
						icon: "fa-sort-amount-desc",
						action: function () {
							e.viewType = "rank",
							e.loadGameRank()
						}
					}, {
						name: "排行",
						icon: "fa-cubes",
						action: function () {
							e.viewType = "game",
							e.loadGameLmcl()
						}
					}, {
						name: "自定义",
						icon: "fa-cog",
						action: function () {
							e.showCustomGameDialog()
						}
					}
				],
				this.loadUserFavoriteLmclGmaeIds(function () {
					p.default.gameList.forEach(function (e) {
						t.gameIds.indexOf(e.id) > -1 ? t.userFavoriteGameList.push(e) : t.unFavoriteGameList.push(e)
					}),
					t.loadGameLmcl()
				})
			}
		}
	},
	728: function (t, e, n) {
		e = t.exports = n(3)(),
		e.push([t.id, ".choose-game-popup[data-v-ce27ba36]{background-color:#fff;border-radius:5px;width:96%;position:fixed;bottom:10px;top:56px;left:2%;z-index:101;padding:10px}.choose-game-popup .popup-title[data-v-ce27ba36]{color:#fff}.choose-game-popup .popup-title .close-btn[data-v-ce27ba36]{display:block;width:40px;color:#d4d4d4;font-weight:100;font-size:20px;line-height:40px;text-align:center}.choose-game-popup .popup-content[data-v-ce27ba36]{padding:5px 0}.choose-game-popup .popup-content .title[data-v-ce27ba36]{position:relative;font-size:16px;color:red;line-height:40px}.choose-game-popup .popup-content .content[data-v-ce27ba36]{position:relative;overflow:hidden}.choose-game-popup .popup-content a[data-v-ce27ba36]{float:left;width:30.3%;line-height:30px;text-align:center;margin:0 3% 5px 0;font-size:14px;border-radius:5px;background-color:#fef1f1;color:#333;white-space:nowrap;text-overflow:ellipsis}.choose-game-popup .popup-content .favorite-list a[data-v-ce27ba36]{background-color:#f8f8f8}.no-data[data-v-ce27ba36]{margin-top:20%;color:#aaa;text-align:center}.float-button-container[data-v-ce27ba36]{position:fixed;z-index:10;right:90px;bottom:80px;transition:all .3s;transform:scale(1)}.float-button-container.scrolling[data-v-ce27ba36]{transform:scale(.6)}.floating-mask[data-v-ce27ba36]{position:fixed;background:rgba(0,0,0,.2);z-index:9}.float-button-container .floating-button[data-v-ce27ba36]{background:url(" + n(230) + ") no-repeat;background-size:60px;display:block;width:60px;height:60px;text-align:center}.float-button-container .floating-button .fa[data-v-ce27ba36]{color:#fff;font-size:22px;display:block;position:absolute;left:19px;top:15px;font-weight:300;transition:all .3s;transform:rotate(0deg)}.float-button-container .floating-button.show .fa[data-v-ce27ba36]{transform:rotate(225deg)}.float-button-container .floating-sub-button[data-v-ce27ba36]{position:absolute;background-color:red;left:20px;top:20px}.float-button-container .floating-sub-button a[data-v-ce27ba36]{position:absolute;display:block;width:40px;height:40px;line-height:40px;border-radius:50%;background-color:#ff3857;color:#fff;font-size:12px;text-align:center;left:-17px;top:-17px;transition:all .3s;transform:scale(0) rotate(1turn)}.float-button-container .floating-sub-button.show a[data-v-ce27ba36]{display:block;transform:scale(1) rotate(0deg)}.float-button-container .floating-sub-button.show a[data-v-ce27ba36]:first-child{left:8px;top:-97px}.float-button-container .floating-sub-button.show a[data-v-ce27ba36]:nth-child(2){left:-71px;top:-78px}.float-button-container .floating-sub-button.show a[data-v-ce27ba36]:nth-child(3){left:-104px;top:-9px}.lmcl-item[data-v-ce27ba36]{background-color:#fff;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;padding:10px;color:#444}.lmcl-item span[data-v-ce27ba36]{display:block;width:50px;font-size:16px;text-align:center}.lmcl-item .bet-button[data-v-ce27ba36]{display:block;margin:0 10px;background-color:#fdebeb;padding:7px 15px;color:#444;border-radius:5px}.lmcl-item .lmcl-name[data-v-ce27ba36]{display:block;width:100px;text-align:left}.lmcl-item .lmcl-name span[data-v-ce27ba36]{display:inline-block;width:auto}.lmcl-item[data-v-ce27ba36]:nth-child(2n){background-color:#f8f8f8}.tulongbang-scroll-wrapper[data-v-ce27ba36]{margin-top:46px}.play-grid-content[data-v-ce27ba36]{background-color:#fff}.play-cate-title[data-v-ce27ba36]{border:1px solid #fad0d0;background-color:#fef1f1;color:#e71516;position:relative;padding:16px;margin:0 -1px;border-left-style:none;border-right-style:none;display:block}.play-cate-title i[data-v-ce27ba36]{margin-right:6px}.tip-text[data-v-ce27ba36]{padding:10px 5px;color:#888;font-size:14px}.item-accordion[data-v-ce27ba36]{position:relative}", ""])
	},
	883: function (t, e, n) {
		var i = n(728);
		"string" == typeof i && (i = [[t.id, i, ""]]);
		n(4)(i, {});
		i.locals && (t.exports = i.locals)
	},
	1125: function (t, e) {
		t.exports = {
			render: function () {
				var t = this,
				e = t.$createElement,
				n = t._self._c || e;
				return n("div", [n("div", {
							staticClass: "mui-scroll-wrapper tulongbang-scroll-wrapper"
						}, [n("div", {
									staticClass: "mui-scroll"
								}, [n("div", [n("p", {
													staticClass: "tip-text"
												}, [t._v("★友情提醒:点击右下角图标可自定义显示彩种")]), t._v(" "), n("div", {
													directives: [{
															name: "show",
															rawName: "v-show",
															value: "game" === t.viewType,
															expression: "viewType === 'game'"
														}
													]
												}, t._l(t.gameLmclList, function (e) {
														return n("div", [n("a", {
																	staticClass: "play-cate-title",
																	on: {
																		click: function (n) {
																			t.toggleItem(e)
																		}
																	}
																}, [n("i", {
																			staticClass: "fa",
																			class: {
																				"fa-minus-square": e.isOpen,
																				"fa-plus-square": !e.isOpen
																			},
																			attrs: {
																				"aria-hidden": "true"
																			}
																		}), t._v(t._s(e.gameName) + "\n            ")]), t._v(" "), n("div", {
																	directives: [{
																			name: "show",
																			rawName: "v-show",
																			value: e.isOpen,
																			expression: "gameLmcl.isOpen"
																		}
																	],
																	staticClass: "item-accordion"
																}, t._l(e.lmcl, function (e) {
																		return n("div", {
																			staticClass: "lmcl-item"
																		}, [n("span", {
																					staticClass: "lmcl-name"
																				}, [t._v(t._s(e.name))]), t._v(" "), n("span", [t._v(t._s(e.openValue))]), t._v(" "), n("span", [t._v(t._s(e.repeatCount))]), t._v(" "), n("a", {
																					staticClass: "bet-button",
																					on: {
																						click: function (n) {
																							t.bet(e)
																						}
																					}
																				}, [t._v("投注")])])
																	}))])
													})), t._v(" "), n("div", {
													directives: [{
															name: "show",
															rawName: "v-show",
															value: "rank" === t.viewType,
															expression: "viewType === 'rank'"
														}
													]
												}, t._l(t.rankLmcl, function (e) {
														return n("div", {
															staticClass: "lmcl-item"
														}, [n("span", {
																	staticClass: "lmcl-name"
																}, [n("span", [t._v(t._s(e.gameName))]), t._v(" "), n("span", [t._v(t._s(e.name))])]), t._v(" "), n("span", [t._v(t._s(e.openValue))]), t._v(" "), n("span", [t._v(t._s(e.repeatCount))]), t._v(" "), n("a", {
																	staticClass: "bet-button",
																	on: {
																		click: function (n) {
																			t.bet(e)
																		}
																	}
																}, [t._v("投注")])])
													}))])])]), t._v(" "), n("FloatingMenu", {
							attrs: {
								scrollId: ".tulongbang-scroll-wrapper",
								menuList: t.floatingMenu
							}
						}), t._v(" "), n("div", {
							directives: [{
									name: "show",
									rawName: "v-show",
									value: t.initLoading,
									expression: "initLoading"
								}
							],
							staticClass: "no-data"
						}, [n("span", [n("spinner", {
											attrs: {
												type: "ios"
											}
										})], 1)]), t._v(" "), n("transition", {
							attrs: {
								name: "bounceUp"
							}
						}, [n("div", {
									directives: [{
											name: "show",
											rawName: "v-show",
											value: t.isShowCustomGameId,
											expression: "isShowCustomGameId"
										}
									],
									staticClass: "choose-game-popup"
								}, [n("div", {
											staticClass: "popup-title"
										}, [n("a", {
													staticClass: "close-btn",
													attrs: {
														href: ""
													},
													on: {
														click: t.closeCustomGamePopup
													}
												}, [n("i", {
															staticClass: "fa fa-close",
															attrs: {
																"aria-hidden": "true"
															}
														})])]), t._v(" "), n("scroller", {
											ref: "popupContentScroller",
											attrs: {
												"lock-x": "",
												height: t.windowHeight - 126 + "px"
											}
										}, [n("div", {
													staticClass: "popup-content"
												}, [n("div", {
															staticClass: "favorite-list"
														}, [n("div", {
																	staticClass: "title"
																}, [t._v("我的彩种")]), t._v(" "), n("div", {
																	staticClass: "content"
																}, t._l(t.userFavoriteGameList, function (e) {
																		return n("a", {
																			on: {
																				click: function (n) {
																					t.unselectGame(e)
																				}
																			}
																		}, [t._v(t._s(e.name))])
																	}))]), t._v(" "), n("div", {
															staticClass: "unfavoirte-list"
														}, [n("div", {
																	staticClass: "title"
																}, [t._v("推荐彩种")]), t._v(" "), n("div", {
																	staticClass: "content"
																}, t._l(t.unFavoriteGameList, function (e) {
																		return n("a", {
																			on: {
																				click: function (n) {
																					t.selectGame(e)
																				}
																			}
																		}, [t._v(t._s(e.name))])
																	}))])])])], 1)])], 1)
			},
			staticRenderFns: []
		}
	},
	1192: function (t, e, n) {
		n(883);
		var i = n(2)(n(456), n(1125), "data-v-ce27ba36", null);
		t.exports = i.exports
	}
});
