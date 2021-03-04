var INTERACTIVE_PLUGIN = function (exports) {
	"use strict";

	function getUID() {
		function t(t) {
			var e,
			n = 1,
			i = 0;
			if (t)
				for (n = 0, e = t.length - 1; e >= 0; e--)
					n = 0 != (i = 266338304 & (n = (n << 6 & 268435455) + (i = t.charCodeAt(e)) + (i << 14))) ? n ^ i >> 21 : n;
			return n
		}
		return ("" + t(document.referrer) + (new Date).getTime() + t(document.cookie)).substr(0, 32)
	}
	Date.now || (Date.now = function () {
		return +new Date
	}),
	Function.prototype.bind || (Function.prototype.bind = function (t) {
		if ("function" != typeof this)
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		var e = Array.prototype.slice.call(arguments, 1),
		n = this,
		i = function () {},
		o = function () {
			return n.apply(this instanceof i ? this : t, e.concat(Array.prototype.slice.call(arguments)))
		};
		return this.prototype && (i.prototype = this.prototype),
		o.prototype = new i,
		o
	});
	var namesapce = "QIHOO__INTERACTIVE_PLUGIN",

	bucketPublic = {
		UID: getUID(),
		displayShowId: [],
		ids: []
	},
	bucketPrivate = {
		scheme: "https:" == document.location.protocol ? "https" : "http",
		sendMessage: function (t) {
			try {
				$R[t.containerID].iframe.contentWindow.postMessage(t, "*")
			} catch (e) {
				console.log(e)
			}
		}
	},
	store = bucketPublic,
	$R = bucketPrivate,
	is_IE = function (t) {
		var e = document.createElement("b");
		return e.innerHTML = "\x3c!--[if IE " + t + "]><i></i><![endif]--\x3e",
		1 === e.getElementsByTagName("i").length
	},
	get_browser = function () {
		var t,
		e = navigator.userAgent,
		n = e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		return /trident/i.test(n[1]) ? {
			name: "IE",
			version: (t = /\brv[ :]+(\d+)/g.exec(e) || [])[1] || ""
		}
		 : "Chrome" === n[1] && null != (t = e.match(/\bOPR|Edge\/(\d+)/)) ? {
			name: "Opera",
			version: t[1]
		}
		 : (n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (t = e.match(/version\/(\d+)/i)) && n.splice(1, 1, t[1]), {
			name: n[0],
			version: n[1]
		})
	},
	getQueryString = function (t) {
		var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
		n = window.location.search.substr(1).match(e);
		return null != n ? unescape(n[2]) : null
	},
	setTimeoutFunc = setTimeout;
	function noop() {}
	function bind(t, e) {
		return function () {
			t.apply(e, arguments)
		}
	}
	function Promise(t) {
		if (!(this instanceof Promise))
			throw new TypeError("Promises must be constructed via new");
		if ("function" != typeof t)
			throw new TypeError("not a function");
		this._state = 0,
		this._handled = !1,
		this._value = undefined,
		this._deferreds = [],
		doResolve(t, this)
	}
	function handle(t, e) {
		for (; 3 === t._state; )
			t = t._value;
		0 !== t._state ? (t._handled = !0, Promise._immediateFn(function () {
				var n = 1 === t._state ? e.onFulfilled : e.onRejected;
				if (null !== n) {
					var i;
					try {
						i = n(t._value)
					} catch (o) {
						return void reject(e.promise, o)
					}
					resolve(e.promise, i)
				} else (1 === t._state ? resolve : reject)(e.promise, t._value)
			})) : t._deferreds.push(e)
	}
	function resolve(t, e) {
		try {
			if (e === t)
				throw new TypeError("A promise cannot be resolved with itself.");
			if (e && ("object" == typeof e || "function" == typeof e)) {
				var n = e.then;
				if (e instanceof Promise)
					return t._state = 3, t._value = e, void finale(t);
				if ("function" == typeof n)
					return void doResolve(bind(n, e), t)
			}
			t._state = 1,
			t._value = e,
			finale(t)
		} catch (i) {
			reject(t, i)
		}
	}
	function reject(t, e) {
		t._state = 2,
		t._value = e,
		finale(t)
	}
	function finale(t) {
		2 === t._state && 0 === t._deferreds.length && Promise._immediateFn(function () {
			t._handled || Promise._unhandledRejectionFn(t._value)
		});
		for (var e = 0, n = t._deferreds.length; e < n; e++)
			handle(t, t._deferreds[e]);
		t._deferreds = null
	}
	function Handler(t, e, n) {
		this.onFulfilled = "function" == typeof t ? t : null,
		this.onRejected = "function" == typeof e ? e : null,
		this.promise = n
	}
	function doResolve(t, e) {
		var n = !1;
		try {
			t(function (t) {
				n || (n = !0, resolve(e, t))
			}, function (t) {
				n || (n = !0, reject(e, t))
			})
		} catch (i) {
			if (n)
				return;
			n = !0,
			reject(e, i)
		}
	}
	Promise.prototype["catch"] = function (t) {
		return this.then(null, t)
	},
	Promise.prototype.then = function (t, e) {
		var n = new this.constructor(noop);
		return handle(this, new Handler(t, e, n)),
		n
	},
	Promise.prototype["finally"] = function (t) {
		var e = this.constructor;
		return this.then(function (n) {
			return e.resolve(t()).then(function () {
				return n
			})
		}, function (n) {
			return e.resolve(t()).then(function () {
				return e.reject(n)
			})
		})
	},
	Promise.all = function (t) {
		return new Promise(function (e, n) {
			if (!t || "undefined" == typeof t.length)
				throw new TypeError("Promise.all accepts an array");
			var i = Array.prototype.slice.call(t);
			if (0 === i.length)
				return e([]);
			var o = i.length;

			function r(t, a) {
				try {
					if (a && ("object" == typeof a || "function" == typeof a)) {
						var s = a.then;
						if ("function" == typeof s)
							return void s.call(a, function (e) {
								r(t, e)
							}, n)
					}
					i[t] = a,
					0 == --o && e(i)
				} catch (p) {
					n(p)
				}
			}
			for (var a = 0; a < i.length; a++)
				r(a, i[a])
		})
	},
	Promise.resolve = function (t) {
		return t && "object" == typeof t && t.constructor === Promise ? t : new Promise(function (e) {
			e(t)
		})
	},
	Promise.reject = function (t) {
		return new Promise(function (e, n) {
			n(t)
		})
	},
	Promise.race = function (t) {
		return new Promise(function (e, n) {
			for (var i = 0, o = t.length; i < o; i++)
				t[i].then(e, n)
		})
	},
	Promise._immediateFn = "function" == typeof setImmediate &&
	function (t) {
		setImmediate(t)
	}
	 ||
	function (t) {
		setTimeoutFunc(t, 0)
	},
	Promise._unhandledRejectionFn = function (t) {
		"undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
	};
	var commonjsGlobal = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

	function createCommonjsModule(t, e) {
		return t(e = {
				exports: {}
			}, e.exports),
		e.exports
	}
	var s = 1e3,
	m = 60 * s,
	h = 60 * m,
	d = 24 * h,
	y = 365.25 * d,
	ms = function (t, e) {
		e = e || {};
		var n = typeof t;
		if ("string" === n && t.length > 0)
			return parse(t);
		if ("number" === n && !1 === isNaN(t))
			return e.long ? fmtLong(t) : fmtShort(t);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t))
	};

	var ms$1 = {
		"default": ms,
		__moduleExports: ms
	},
	require$$0 = ms$1 && ms || ms$1,
	debug = createCommonjsModule(function (t, e) {
			var n;

			function i(t) {
				function i() {
					if (i.enabled) {
						var t = i,
						o = +new Date,
						r = o - (n || o);
						t.diff = r,
						t.prev = n,
						t.curr = o,
						n = o;
						for (var a = new Array(arguments.length), s = 0; s < a.length; s++)
							a[s] = arguments[s];
						a[0] = e.coerce(a[0]),
						"string" != typeof a[0] && a.unshift("%O");
						var p = 0;
						a[0] = a[0].replace(/%([a-zA-Z%])/g, function (n, i) {
								if ("%%" === n)
									return n;
								p++;
								var o = e.formatters[i];
								if ("function" == typeof o) {
									var r = a[p];
									n = o.call(t, r),
									a.splice(p, 1),
									p--
								}
								return n
							}),
						e.formatArgs.call(t, a),
						(i.log || e.log || console.log.bind(console)).apply(t, a)
					}
				}
				return i.namespace = t,
				i.enabled = e.enabled(t),
				i.useColors = e.useColors(),
				i.color = function (t) {
					var n,
					i = 0;
					for (n in t)
						i = (i << 5) - i + t.charCodeAt(n), i |= 0;
					return e.colors[Math.abs(i) % e.colors.length]
				}
				(t),
				"function" == typeof e.init && e.init(i),
				i
			}
			(e = t.exports = i.debug = i["default"] = i).coerce = function (t) {
				return t instanceof Error ? t.stack || t.message : t
			},
			e.disable = function () {
				e.enable("")
			},
			e.enable = function (t) {
				e.save(t),
				e.names = [],
				e.skips = [];
				for (var n = ("string" == typeof t ? t : "").split(/[\s,]+/), i = n.length, o = 0; o < i; o++)
					n[o] && ("-" === (t = n[o].replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")))
			},
			e.enabled = function (t) {
				var n,
				i;
				for (n = 0, i = e.skips.length; n < i; n++)
					if (e.skips[n].test(t))
						return !1;
				for (n = 0, i = e.names.length; n < i; n++)
					if (e.names[n].test(t))
						return !0;
				return !1
			},
			e.humanize = require$$0,
			e.names = [],
			e.skips = [],
			e.formatters = {}
		}),
	debug_1 = debug.coerce,
	debug_2 = debug.disable,
	debug_3 = debug.enable,
	debug_4 = debug.enabled,
	debug_5 = debug.humanize,
	debug_6 = debug.names,
	debug_7 = debug.skips,
	debug_8 = debug.formatters,
	debug$1 = {
		"default": debug,
		__moduleExports: debug,
		coerce: debug_1,
		disable: debug_2,
		enable: debug_3,
		enabled: debug_4,
		humanize: debug_5,
		names: debug_6,
		skips: debug_7,
		formatters: debug_8
	},
	require$$0$1 = debug$1 && debug || debug$1,
	browser = createCommonjsModule(function (t, e) {
			function n() {
				var t;
				try {
					t = e.storage.debug
				} catch (n) {}
				return !t && "undefined" != typeof process && "env" in process && (t = process.env.DEBUG),
				t
			}
			(e = t.exports = require$$0$1).log = function () {
				return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
			},
			e.formatArgs = function (t) {
				var n = this.useColors;
				if (t[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + t[0] + (n ? "%c " : " ") + "+" + e.humanize(this.diff), !n)
					return;
				var i = "color: " + this.color;
				t.splice(1, 0, i, "color: inherit");
				var o = 0,
				r = 0;
				t[0].replace(/%[a-zA-Z%]/g, function (t) {
					"%%" !== t && "%c" === t && (r = ++o)
				}),
				t.splice(r, 0, i)
			},
			e.save = function (t) {
				try {
					null == t ? e.storage.removeItem("debug") : e.storage.debug = t
				} catch (n) {}
			},
			e.load = n,
			e.useColors = function () {
				if ("undefined" != typeof window && window.process && "renderer" === window.process.type)
					return !0;
				return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
			},
			e.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : function () {
				try {
					return window.localStorage
				} catch (t) {}
			}
			(),
			e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"],
			e.formatters.j = function (t) {
				try {
					return JSON.stringify(t)
				} catch (e) {
					return "[UnexpectedJSONParseError]: " + e.message
				}
			},
			e.enable(n())
		}),
	browser_1 = browser.log,
	browser_2 = browser.formatArgs,
	browser_3 = browser.save,
	browser_4 = browser.load,
	browser_5 = browser.useColors,
	browser_6 = browser.storage,
	browser_7 = browser.colors,
	browser$1 = {
		"default": browser,
		__moduleExports: browser,
		log: browser_1,
		formatArgs: browser_2,
		save: browser_3,
		load: browser_4,
		useColors: browser_5,
		storage: browser_6,
		colors: browser_7
	},
	require$$0$2 = browser$1 && browser || browser$1,
	debug$2 = require$$0$2("jsonp"),
	jsonp_1 = jsonp,
	count = 0;

	function noop$1() {}
	function jsonp(t, e, n) {
		"function" == typeof e && (n = e, e = {}),
		e || (e = {});
		var i,
		o,
		r = e.prefix || "__jp",
		a = e.name || r + count++,
		s = e.param || "callback",
		p = null != e.timeout ? e.timeout : 6e4,
		l = encodeURIComponent,
		c = document.getElementsByTagName("script")[0] || document.head;

		function d() {
			i.parentNode && i.parentNode.removeChild(i),
			window[a] = noop$1,
			o && clearTimeout(o)
		}
		return p && (o = setTimeout(function () {
					d(),
					n && n(new Error("Timeout"))
				}, p)),
		window[a] = function (t) {
			debug$2("jsonp got", t),
			d(),
			n && n(null, t)
		},
		t = (t += (~t.indexOf("?") ? "&" : "?") + s + "=" + l(a)).replace("?&", "?"),
		debug$2('jsonp req "%s"', t),
		(i = document.createElement("script")).src = t,
		c.parentNode.insertBefore(i, c),
		function () {
			window[a] && d()
		}
	}
	function stringify(t) {
		var e = [];
		for (var n in t)
			Object.prototype.hasOwnProperty.call(t, n) && e.push(n + "=" + encodeURIComponent(t[n]));
		return e.join("&")
	}
	function isArray(t) {
		return "[object Array]" === Object.prototype.toString.call(t)
	}
	function isObject(t) {
		return "[object Object]" === Object.prototype.toString.call(t)
	}
	function isString(t) {
		return "[object String]" === Object.prototype.toString.call(t)
	}
	function isEmpty(t) {
		if (isArray(t))
			return 0 === t.length;
		if (isString(t))
			return "" === t;
		if (isObject(t)) {
			var e = 0;
			for (var n in t)
				if (Object.prototype.hasOwnProperty.call(t, n)) {
					e++;
					break
				}
			return 0 === e
		}
		return !1
	}
	function isNil(t) {
		return null === t || t === undefined
	}
	function PluginRequest() {}
	PluginRequest.prototype.next = function (t, e) {
		var n = $R[e].options.addSource ? getQueryString("djsource") : $R[e].options.showid,
		i = $R[e].options.showid,
		o = {
			type: 1,
			of: 4,
			newf: 1,
			uid: store.UID,
			impct: t,
			r: 20,
			showid: i,
			scheme: $R.scheme
		};
		if ($R[e].options.isIframe && (o.isifr = 1), n && (o.djsource = n), $R[e].options.game)
			"scoop" == $R[e].options.game ? o.game = "6,8" : o.game = $R[e].idStore[$R[e].options.game];
		else
			try {
				var r = window.localStorage.getItem("interactPluginGame"),
				a = window.localStorage.getItem("interactPluginOverTime"),
				s = "" + (new Date).getFullYear() + ((new Date).getMonth() + 1) + (new Date).getDate();
				r && (a != s ? window.localStorage.removeItem("interactPluginGame") : o.game = r)
			} catch (l) {}
		var p = "";
		return p = "https" === o.scheme ? "https://xdssp.mediav.com/s?" + stringify(o) : "http://xdssp.mediav.com/s?" + stringify(o),
		new Promise(function (t, n) {
			jsonp_1(decodeURIComponent(p), {
				param: "jsonp",
				timeout: 5e3,
				prefix: e + "_plugin"
			}, function (e, n) {
				e && t({
					errno: 1
				}),
				t(n)
			})
		})
	};
	var PluginReq = new PluginRequest,
	T = function (t, e, n) {
		return n = n || /\{([^\{\}]*)\}/g,
		t.replace(n, function (t, n) {
			var i = n.split("."),
			o = e;
			try {
				for (var r in i)
					i.hasOwnProperty(r) && (o = o[i[r]])
			} catch (a) {
				o = t
			}
			return "string" == typeof o || "number" == typeof o ? o : t
		})
	},

	tplLowIe = ''
	function addEventListener(t, e, n) {
		var i = this;
		if (window.addEventListener)
			return t.addEventListener(e, function (t) {
				n.call(i, t)
			}, !1);
		t.attachEvent("on" + e, function () {
			var t = window.event;
			t.target = t.srcElement,
			n.call(i, t)
		})
	}
	function map(t, e) {
		if (isArray(t))
			for (var n = 0; n < t.length; n++)
				e.call(null, t[n]);
		else {
			if (!isObject(t))
				return;
			for (var i in t)
				Object.prototype.hasOwnProperty.call(t, i) && e.call(null, t[i])
		}
	}
	function sendLog(t) {
		if ("NaN" == t || !t)
			return !1;
		var e = new Image;
		e.onload = e.onerror = function () {
			e = null
		},
		e.src = t
	}
	function initCustTag(t) {
		t.createElement("info-div")
	}
	function Dialog(t) {
		this.title = t.title,
		this.ticket = t.ticket,
		this.content = t.content,
		this.btntext = t.btntext,
		this.awardlink = t.awardlink,
		this.prefix = t.prefix,
		this.browserName = t.browserName || !1,
		this.dialogType = "",
		this.overUrl = "",
		this.isclick = !0,
		this.clicked = !1,
		this.callback = t.callback,
		this.type = t.type || "none",
		this.st = null,
		this.ct = null,
		this.ut = null,
		this.item = t.item,
		this.gotoText = t.browserName ? "明天再来！" : "查看我的奖品",
		this.dialog_init()
	}
	function investigate(t) {
		var e = "https://track.mediav.com/t?type=23&cus=289706_2344700_22610775_" + t;
		if ("NaN" == e || !e)
			return !1;
		var n = new Image;
		n.onload = n.onerror = function () {
			n = null
		},
		n.src = e
	}
	function Lottery() {}
	Lottery.prototype.next = function (t) {
		var e = {
			type: 17,
			r: 20,
			uid: store.UID,
			showid: $R[t].options.showid,
			scheme: $R.scheme
		},
		n = "";
		return n = "https" === e.scheme ? "https://is132ss.prod.mediav.com/s?" + stringify(e) : "http://is132ss.prod.mediav.com/s?" + stringify(e),
		new Promise(function (e, i) {
			jsonp_1(n, {
				param: "jsonp",
				timeout: 5e3,
				prefix: t
			}, function (t, n) {
				t && e({
					errno: 1
				}),
				e(n)
			})
		})
	};
	var lottery = new Lottery,
	// awardRules = function(t) {
	// 	var e = document.body,
	// 		n = document.createElement("info-div");
	// 	n.setAttribute("class", t + " popShowPrize rule-wrap"), n.setAttribute("id", t + "showRules");
	// 	n.innerHTML = '<info-div  class="card-sunshine"></info-div><info-div class="rule-wrap"><info-div class="smallScroll"><info-div class="smallRule"><info-div class="closeRules" id="' + t + '-closeRule"></info-div><info-div class="rule-tips-top"></info-div><info-div class="rule-content">活动说明: <br/>参与活动即有机会获得幸运奖，每天8次免费抽奖机会，此活动为概率中奖，奖品数量有限，祝好运！<br/>惊喜一：100元现金红包 <br/>惊喜二：88元现金红包 <br/>惊喜三：8元现金红包 <br/>惊喜四：小额现金红包 <br/>惊喜五：幸运福袋 <br/> <br/>重要说明 <br/>1、 红包、实物奖品均需即刻领取（30分钟未领取，链接即失效），过期无效。 <br/>2、 优惠券类奖品的奖品使用规则详见每个优惠券的介绍页 <br/>3、 通过非法途径获得奖品的，主办方有权不提供奖品 <br/> <br/>更多概率说明： <br/>100元现金红包，中奖概率0.01% <br/>88元现金红包，中奖概率0.01% <br/>8元现金红包，中奖概率0.1% <br/>小额现金红包，中奖概率1%</info-div></info-div></info-div></info-div>', e.appendChild(n), document.getElementById(t + "showRules").style.display = "block", addEventListener(document.getElementById(t + "-closeRule"), "click", function(n) {
	// 		e.removeChild(document.getElementById(t + "showRules"))
	// 	})
	// },
	iframeMessageListener = function (t) {
		window.addEventListener("message", function (e) {
			if (e.data.containerID != t)
				return !1;
			if ("askADData" == e.data.action) {
				var n = getQueryString("fire") || "";
				$R[t].options.skin && ($R[t].pluginData.ads[0].dj_interaction = $R[t].options.skin),
				$R.sendMessage({
					action: "ADDataReady",
					data: $R[t].adData || [],
					clickPlugin: $R[t].clickPlugin,
					pluginData: $R[t].pluginData.ads[0],
					containerID: t,
					backupData: [{
							type: "none",
							isFire: n
						}
					],
					si: $R[t].showid
				})
			}
			if ("sendLog" == e.data.action && sendLog(e.data.url), "openDialog" == e.data.action && (e.data.data.item || "none" !== e.data.data.type || investigate(1), new Dialog({
						type: e.data.data.type,
						prefix: t,
						item: e.data.data,
						callback: function () {}
					})), "openMyAward" == e.data.action && new Dialog({
					type: "award",
					prefix: t,
					item: e.data.list,
					callback: function () {}
				}), "syncRemains" == e.data.action && (store[t].remainTimes = e.data.times, 0 == store[t].remainTimes))
				try {
					var i = "",
					o = "" + (new Date).getFullYear() + ((new Date).getMonth() + 1) + (new Date).getDate(),
					r = "-" + $R[t].gameId,
					a = window.localStorage.getItem("interactPluginGame");
					if (a) {
						var s = a.split(",");
						i = a,
						s.forEach(function (t) {
							t != r && (i = a + "," + r)
						})
					} else
						i = r;
					window.localStorage.setItem("interactPluginGame", i),
					window.localStorage.setItem("interactPluginOverTime", o)
				} catch (e) {}
			if ("drawLottery" == e.data.action && lottery.next(t).then(function (e) {
					200 == e.dj_rprespcode && e.dj_rpamount && $R.sendMessage({
						action: "lotteryCallback",
						data: e,
						curl: "",
						desc: "",
						dj_btntext: "",
						// img: "https://p3.ssl.qhimg.com/t01e73da281fa379981.jpg",
						containerID: t
					})
				}), "clickGame" == e.data.action) {
				var p = $R[t].options.onGameClick;
				isNil(p) || "function" != typeof p || p.call(null)
			}
			"openRule" == e.data.action && awardRules(e.data.containerID)
		})
	};

	function addStyle(t) {
		var e = document.head || document.getElementsByTagName("head")[0],
		n = document.createElement("style");
		n.type = "text/css",
		n.styleSheet ? n.styleSheet.cssText = t : n.appendChild(document.createTextNode(t)),
		e.appendChild(n)
	}
	function getElementsByClassName(t) {
		for (var e = [], n = document.getElementsByTagName("*"), i = 0; i < n.length; i++)
			for (var o = n[i].className.split(" "), r = 0; r < o.length; r++)
				o[r] == t && e.push(n[i]);
		return e
	}
	function MediaV() {}
	MediaV.prototype.next = function (t, e) {
		var n = $R[e].options.addSource ? getQueryString("djsource") : $R[e].options.showid;
		n = null == n ? $R[e].options.showid : n;
		var i = {
			type: 1,
			of: 4,
			newf: 1,
			uid: store.UID,
			impct: t,
			showid: "KNx4d8",
			djtransp: $R[e].pluginData.ads[0].djtransp,
			djsource: n,
			scheme: $R.scheme
		},
		o = "";
		return o = "https" === i.scheme ? "https://show-3.mediav.com/s?" + stringify(i) : "http://show.3.mediav.com/s?" + stringify(i),
		new Promise(function (t, n) {
			jsonp_1(o, {
				param: "jsonp",
				timeout: 5e3,
				prefix: e
			}, function (e, n) {
				e && t({
					errno: 1
				}),
				t(n)
			})
		})
	};
	var mediav = new MediaV;

	function isObject$1(t) {
		var e = typeof t;
		return null != t && ("object" == e || "function" == e)
	}
	var isObject_1 = isObject$1,
	isObject$2 = {
		"default": isObject_1,
		__moduleExports: isObject_1
	},
	freeGlobal = "object" == typeof commonjsGlobal && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal,
	_freeGlobal = freeGlobal,
	_freeGlobal$1 = {
		"default": _freeGlobal,
		__moduleExports: _freeGlobal
	},
	freeGlobal$1 = _freeGlobal$1 && _freeGlobal || _freeGlobal$1,
	freeSelf = "object" == typeof self && self && self.Object === Object && self,
	root = freeGlobal$1 || freeSelf || Function("return this")(),
	_root = root,
	_root$1 = {
		"default": _root,
		__moduleExports: _root
	},
	root$1 = _root$1 && _root || _root$1,
	now = function () {
		return root$1.Date.now()
	},
	now_1 = now,
	now$1 = {
		"default": now_1,
		__moduleExports: now_1
	},
	Symbol = root$1.Symbol,
	_Symbol = Symbol,
	_Symbol$1 = {
		"default": _Symbol,
		__moduleExports: _Symbol
	},
	Symbol$1 = _Symbol$1 && _Symbol || _Symbol$1,
	objectProto = Object.prototype,
	hasOwnProperty = objectProto.hasOwnProperty,
	nativeObjectToString = objectProto.toString,
	symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

	function getRawTag(t) {
		var e = hasOwnProperty.call(t, symToStringTag),
		n = t[symToStringTag];
		try {
			t[symToStringTag] = undefined
		} catch (o) {}
		var i = nativeObjectToString.call(t);
		return e ? t[symToStringTag] = n : delete t[symToStringTag],
		i
	}
	var _getRawTag = getRawTag,
	_getRawTag$1 = {
		"default": _getRawTag,
		__moduleExports: _getRawTag
	},
	objectProto$1 = Object.prototype,
	nativeObjectToString$1 = objectProto$1.toString;

	function objectToString(t) {
		return nativeObjectToString$1.call(t)
	}
	var _objectToString = objectToString,
	_objectToString$1 = {
		"default": _objectToString,
		__moduleExports: _objectToString
	},
	getRawTag$1 = _getRawTag$1 && _getRawTag || _getRawTag$1,
	objectToString$1 = _objectToString$1 && _objectToString || _objectToString$1,
	nullTag = "[object Null]",
	undefinedTag = "[object Undefined]",
	symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

	function baseGetTag(t) {
		return null == t ? t === undefined ? undefinedTag : nullTag : symToStringTag$1 && symToStringTag$1 in Object(t) ? getRawTag$1(t) : objectToString$1(t)
	}
	var _baseGetTag = baseGetTag,
	_baseGetTag$1 = {
		"default": _baseGetTag,
		__moduleExports: _baseGetTag
	};

	function isObjectLike(t) {
		return null != t && "object" == typeof t
	}
	var isObjectLike_1 = isObjectLike,
	isObjectLike$1 = {
		"default": isObjectLike_1,
		__moduleExports: isObjectLike_1
	},
	baseGetTag$1 = _baseGetTag$1 && _baseGetTag || _baseGetTag$1,
	isObjectLike$2 = isObjectLike$1 && isObjectLike_1 || isObjectLike$1,
	symbolTag = "[object Symbol]";

	function isSymbol(t) {
		return "symbol" == typeof t || isObjectLike$2(t) && baseGetTag$1(t) == symbolTag
	}
	var isSymbol_1 = isSymbol,
	isSymbol$1 = {
		"default": isSymbol_1,
		__moduleExports: isSymbol_1
	},
	isObject$3 = isObject$2 && isObject_1 || isObject$2,
	isSymbol$2 = isSymbol$1 && isSymbol_1 || isSymbol$1,
	NAN = NaN,
	reTrim = /^\s+|\s+$/g,
	reIsBadHex = /^[-+]0x[0-9a-f]+$/i,
	reIsBinary = /^0b[01]+$/i,
	reIsOctal = /^0o[0-7]+$/i,
	freeParseInt = parseInt;

	function toNumber(t) {
		if ("number" == typeof t)
			return t;
		if (isSymbol$2(t))
			return NAN;
		if (isObject$3(t)) {
			var e = "function" == typeof t.valueOf ? t.valueOf() : t;
			t = isObject$3(e) ? e + "" : e
		}
		if ("string" != typeof t)
			return 0 === t ? t : +t;
		t = t.replace(reTrim, "");
		var n = reIsBinary.test(t);
		return n || reIsOctal.test(t) ? freeParseInt(t.slice(2), n ? 2 : 8) : reIsBadHex.test(t) ? NAN : +t
	}
	var toNumber_1 = toNumber,
	toNumber$1 = {
		"default": toNumber_1,
		__moduleExports: toNumber_1
	},
	now$2 = now$1 && now_1 || now$1,
	toNumber$2 = toNumber$1 && toNumber_1 || toNumber$1,
	FUNC_ERROR_TEXT = "Expected a function",
	nativeMax = Math.max,
	nativeMin = Math.min;

	function debounce(t, e, n) {
		var i,
		o,
		r,
		a,
		s,
		p,
		l = 0,
		c = !1,
		d = !1,
		m = !0;
		if ("function" != typeof t)
			throw new TypeError(FUNC_ERROR_TEXT);

		function f(e) {
			var n = i,
			r = o;
			return i = o = undefined,
			l = e,
			a = t.apply(r, n)
		}
		function g(t) {
			var n = t - p;
			return p === undefined || n >= e || n < 0 || d && t - l >= r
		}
		function h() {
			var t = now$2();
			if (g(t))
				return u(t);
			s = setTimeout(h, function (t) {
					var n = e - (t - p);
					return d ? nativeMin(n, r - (t - l)) : n
				}
					(t))
		}
		function u(t) {
			return s = undefined,
			m && i ? f(t) : (i = o = undefined, a)
		}
		function b() {
			var t = now$2(),
			n = g(t);
			if (i = arguments, o = this, p = t, n) {
				if (s === undefined)
					return function (t) {
						return l = t,
						s = setTimeout(h, e),
						c ? f(t) : a
					}
				(p);
				if (d)
					return s = setTimeout(h, e), f(p)
			}
			return s === undefined && (s = setTimeout(h, e)),
			a
		}
		return e = toNumber$2(e) || 0,
		isObject$3(n) && (c = !!n.leading, r = (d = "maxWait" in n) ? nativeMax(toNumber$2(n.maxWait) || 0, e) : r, m = "trailing" in n ? !!n.trailing : m),
		b.cancel = function () {
			s !== undefined && clearTimeout(s),
			l = 0,
			i = p = o = s = undefined
		},
		b.flush = function () {
			return s === undefined ? a : u(now$2())
		},
		b
	}
	var debounce_1 = debounce;

	function innerHeight() {
		return window.innerHeight || document.documentElement.clientHeight
	}
	function track(t) {
		var e = t.getBoundingClientRect().top,
		n = e + t.clientHeight,
		i = e >= 0 && e < innerHeight(),
		o = n >= 0 && n < innerHeight(),
		r = e < 0 && n > 0,
		a = i ? Math.min(t.clientHeight, innerHeight() - e) : n;
		if (a = Math.min(a, innerHeight()), i || o || r) {
			var s = t.getAttribute("data-pv");
			if (!isNil(s) && !isEmpty(s))
				map(s.split(","), sendLog), t.removeAttribute("data-pv")
		}
	}
	function viewTrack(t, e) {
		var n = document.getElementById(t),
		i = document.getElementById(e);
		if (t.indexOf(".") >= 0 || t.indexOf("#") >= 0)
			try {
				n = document.querySelector(t)
			} catch (o) {
				n = getElementsByClassName(t.split(".")[1])[0]
			}
		track(n, i),
		addEventListener(window, "scroll", debounce_1(track.bind(this, n, i), 10))
	}
	var inlay = {
		initDOM: function (t) {
			this.update(t)
		},
		initHoverDom: function (t, e) {
			var n = this;
			mediav.next(8, t).then(function (i) {
				$R[t].adData = i,
				"function" == typeof e ? (n.trackIconLowIE(t), e(i)) : n.trackIcon(t)
			})["catch"](function (t) {
				"function" == typeof e && e({
					error: !0
				})
			})
		},
		update: function (t) {
			var e = this;
			mediav.next(8, t).then(function (n) {
				$R[t].adData = n,
				e.sendIframe(t)
			})["catch"](function (t) {})
		},
		sendIframe: function (t) {
			try {
				var e = $R[t].pluginData,
				n = e.ads[0].imptk;
				$R[t].clickPlugin = e.ads[0].clktk.join(","),
				e.impurl && n.push(e.impurl + e.ads[0].imparg),
				$R[t].iframe.setAttribute("data-pv", n)
			} catch (i) {}
			viewTrack(t + "-iframe")
		},
		trackIcon: function (t) {
			var e,
			n = $R.scheme + "://xdssp.mediav.com/s?type=14&of=4&newf=1&showid=" + $R[t].options.showid + "&uid=" + store.UID + "&r=20";
			try {
				e = document.querySelector("." + t + "-thumbnail")
			} catch (i) {
				e = getElementsByClassName(t + "-thumbnail")[0]
			}
			e && (e.setAttribute("data-pv", n), viewTrack("." + t + "-thumbnail"))
		},
		trackIconLowIE: function (t) {
			var e = getElementsByClassName(t + "-thumbnail")[0];
			if (e) {
				var n = $R[t].pluginData,
				i = n.ads[0].imptk;
				n.impurl && i.push(n.impurl + n.ads[0].imparg),
				e.setAttribute("data-pv", i.join(",")),
				viewTrack("." + t + "-thumbnail")
			}
		}
	},
	domready = function (t) {
		var e,
		n = [],
		i = document,
		o = i.documentElement,
		r = o.doScroll,
		a = (r ? /^loaded|^c/ : /^loaded|c/).test(i.readyState);

		function s(t) {
			for (a = 1; t = n.shift(); )
				t()
		}
		return i.addEventListener && i.addEventListener("DOMContentLoaded", e = function () {
			i.removeEventListener("DOMContentLoaded", e, !1),
			s()
		}, !1),
		r && i.attachEvent("onreadystatechange", e = function () {
			/^c/.test(i.readyState) && (i.detachEvent("onreadystatechange", e), s())
		}),
		t = r ?
		function (e) {
			self != top ? a ? e() : n.push(e) : function () {
				try {
					o.doScroll("left")
				} catch (n) {
					return setTimeout(function () {
						t(e)
					}, 50)
				}
				e()
			}
			()
		}
		 : function (t) {
			a ? t() : n.push(t)
		}
	},
	domready$1 = domready(),
	dialogStyle = ".{prefix} info-div, .{prefix}info-div{\n   display: block;\n}\n.{prefix}-gameClose{\n\t\t\t  display: inline-block;\n\t\t\t  position: absolute;\n\t\t\t  cursor: pointer;\n\t\t\t  width: 25px;\n\t\t\t  height: 25px;\n\t\t\tright: 0;\n\t          top: 0;\n\t\t }\n.{prefix}.autowrap{\n\tdisplay: flex;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flex;\n\tdisplay: -o-flex;\n\tdisplay: -moz-flex;\n\tposition: relative;\n}\n.{prefix}.autowrap iframe{\n    display:block;\n    margin: auto;\n}\n.{prefix}.popShowPrize{\n\tposition: fixed;\n\tz-index: 10000;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tpadding: 0 10px;\n\tbox-sizing: border-box;\n\toverflow: hidden;\n\tbackground-color: rgba(0, 0, 0, .65);\n\tdisplay: none;\n}\n.{prefix}.popShowPrize .card-sunshine {\n\twidth: 500px;\n\theight: 500px;\n\t\n\tposition: absolute;\n\ttop: 30%;\n\tleft: 50%;\n\tmargin-top: -250px;\n\tmargin-left: -250px;\n\tanimation: circle 10s linear infinite;\n\t-webkit-animation: circle 10s linear infinite;\n}\n.{prefix}.popShowPrize .m-box {\n\twidth: 500px;\n\theight: 500px;\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\tmargin-top: -250px;\n\tmargin-left: -250px;\n}\n\t\t /*中奖规则弹窗*/\n.{prefix}.popShowPrize .rule-wrap {\n             height: 469px;\n\t\t\t width: 410px;\n\t\t\t background: #ff4b3d;\n\t\t\t position: absolute;\n\t\t\t left: 50%;\n\t\t\t transform: translateX(-50%);\n\t\t\t border-radius: 10px;\n\t\t\t top: 200px;\n\t\t }\n.{prefix}.popShowPrize .rule-tips-top {\n\t\t\t top: -28px;\n\t\t\t height: 93px;\n\t\t\t width: 100%;\n\t\t\t position: absolute;\n\t\t }\n.{prefix}.popShowPrize .rule-content {\n\t\t\t color: #fff;\n\t\t\t padding: 60px 20px 15px;\n\t\t\t font-size: 14px;\n\t\t }\n.{prefix}.popShowPrize  .closeRules{\n             display: block;\n             width: 30px;\n             height: 30px;\n             position: absolute;\n             background-size: 100% 100%;\n\n             right: -30px;\n             top: -42px;\n         }\n\n\n@-webkit-keyframes skip {\n\tfrom {\n\t\t-webkit-transform: scale(0.88);\n\t\ttransform: scale(0.88)\n\t}\n\t100% {\n\t\t-webkit-transform: scale(1.07);\n\t\ttransform: scale(1.07)\n\t}\n}\n\n@-moz-keyframes skip {\n\tfrom {\n\t\t-moz-transform: scale(0.88);\n\t\ttransform: scale(0.88)\n\t}\n\t100% {\n\t\t-moz-transform: scale(1.07);\n\t\ttransform: scale(1.07)\n\t}\n}\n\n@keyframes skip {\n\tfrom {\n\t\t-webkit-transform: scale(0.88);\n\t\t-moz-transform: scale(0.88);\n\t\ttransform: scale(0.88)\n\t}\n\t100% {\n\t\t-webkit-transform: scale(1.07);\n\t\t-moz-transform: scale(1.07);\n\t\ttransform: scale(1.07)\n\t}\n}\n@keyframes circle {\n\tfrom {\n\t\ttransform: rotate(0);\n\t}\n\tto {\n\t\ttransform: rotate(360deg);\n\t}\n}\n\n@-webkit-keyframes circle {\n\tfrom {\n\t\t-webkit-transform: rotate(0);\n\t}\n\tto {\n\t\t-webkit-transform: rotate(360deg);\n\t}\n}\n.{prefix}.popShowPrize .closetc {\n\tdisplay: block;\n\twidth: 30px;\n\theight: 30px;\n\ttext-align: center;\n\tposition: absolute;\n\tline-height: 30px;\n\t}\n\n.{prefix}.popShowPrize .prizeWrap{\n\twidth:700px;\n\theight: 700px;\n\tposition: absolute;\n    left: 50%;\n    margin-left: -350px;;\n\n}\n\n.{prefix}.popShowPrize .showPrize-dialog {\n    width: 500px;\n    height: 450px;\n\tpadding-top: 10px;\n\tposition: absolute;\n\ttop: 30%;\n\tleft: 50%;\n\tz-index: 2;\n\toverflow: visible;\n\tmargin-left: -250px;\n\tmargin-top: -225px;\n\t-webkit-animation: showModal .5s ease-in-out;\n\tanimation: showModal .5s ease-in-out;\n}\n\n.{prefix}.popShowPrize .showPrize-dialog .card-bg {\n\twidth: 450px;\n\theight: 370px;*/\n\tbackground-size: 100% 85%;\n\tbackground-position: center top;\n\tbackground-repeat: no-repeat;\n\toverflow: hidden;\n\tmargin: auto;\n\tpadding-top: 0;\n\ttransform: translate(0, 100px);\n\t-webkit-transform: translate(0, 100px);\n\tanimation: move 0.5s linear 0.4s forwards;\n\t-webkit-animation: move 0.5s linear 0.4s forwards;\n}\n\n.{prefix}.popShowPrize .showPrize-dialog .card-bg .imgAD {\n\twidth: 346px;\n\theight: 173px;\n\tdisplay: block;\n\tmargin: 128px auto 0;\n\tbackground-repeat: no-repeat;\n\tbackground-size: 100% auto;\n\t\t\t text-align: center;\n\t\t\t line-height: 121px;\n\t\t\t font-size: 37px;\n\t\t\t color: #E47B01;\n\t\t\t font-weight: 700;\n}\n\n/*.{prefix}.popShowPrize .showPrize-dialog .red-bg {*/\n\t/*width: 384px;*/\n\t/*height: 195px;*/\n\t/*background-position: center;*/\n\t/*background-repeat: no-repeat;*/\n\t/*position: relative;*/\n\t/*margin: -3.89rem auto 0;*/\n\t/*z-index: -1;*/\n\t/*animation: scale 0.2s linear forwards ;*/\n\t/*-webkit-animation: scale 0.2s linear forwards;*/\n/*}*/\n\n.{prefix}.popShowPrize .showPrize-dialog .detail {\n\t/*width: 384px;*/\n\twidth: 450px;\n\theight: 190px;\n\tposition: relative;\n\tmargin: -56px auto 0;\n\tanimation: scale 0.2s linear forwards;\n\t-webkit-animation: scale 0.2s linear forwards;\n}\n\n.{prefix}.popShowPrize .showPrize-dialog .detail .infoTopic {\n\t/*width: 350px;*/\n\twidth: 420px;\n\theight: 40px;\n\tborder-radius: 4px;\n\ttext-align: center;\n\tposition: absolute;\n\ttop: 15px;\n\tcolor: #fff;\n\tfont-size: 22px;\n\tfont-weight: 500;\n\tline-height: 40px;\n\ttext-overflow: ellipsis;\n    white-space: nowrap;\n\toverflow: hidden;\n\tmargin: 0 15px\n}\n\n.{prefix}.popShowPrize .showPrize-dialog .detail .goto {\n\twidth: 320px;\n\theight: 50px;\n\tposition: absolute;\n\tleft: 50%;\n\tmargin-left: -160px;\n\tbottom: 20px;\n\ttext-align: center;\n\tline-height: 48px;\n    color: #9a0000;\n\tfont-size: 18px;\n\tfont-weight: 500;\n\ttext-shadow: 1px 1px 2px #fff;\n\t-webkit-text-shadow: 1px 1px 2px #fff;\n\tcursor: pointer;\n}\n\n.{prefix}.popShowPrize .showPrize-dialog .detail .goto:after {\n\tcontent: '';\n\twidth: 20px;\n\theight: 50px;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n}\n\n.{prefix}.popShowPrize .once-again {\n\twidth: 4.45rem;\n\theight: 1.325rem;\n\tline-height: 1.325rem;\n\ttext-align: center;\n\tbackground: transparent;\n\tborder: 1px solid #FFF;\n\tposition: absolute;\n\ttop: 19.0rem;\n\tleft: 50%;\n\tmargin-left: -2.275rem;\n\tborder-radius: 2px;\n\tcolor: #FFF;\n\tfont-weight: normal;\n\tfont-size: 14px;\n}\n\n.{prefix}.popShowPrize .close-btn {\n\tdisplay: block;\n\ttext-align: center;\n\tposition: absolute;\n\ttop: 80px;\n\tright: -18px;\n\tfont-size: 16px;\n\tz-index: 1000;\n\tcursor: pointer;\n}\n\n.{prefix}.popShowPrize .close-btn>img {\n\twidth: 100%;\n\theight: 100%;\n}\n.{prefix}.popShowPrize .goto,\n.{prefix}.popShowPrize .again {\n\twidth: 12.2rem;\n\theight: 2rem;\n\tmargin: 0 auto;\n\tline-height: 2rem;\n\ttext-align: center;\n\tcolor: #FFFFFF;\n\tfont-size: 0.8rem;\n\tborder-radius: 8px;\n\tmargin-bottom: 0.5rem;\n\t-webkit-animation: skip .8s linear infinite alternate;\n\t-moz-animation: skip .8s linear infinite alternate;\n\tanimation: skip .8s linear infinite alternate;\n\tposition: relative;\n}\n\n.{prefix}.popShowPrize .goto {\n\tline-height: 1.8rem;\n\tbackground-size: 100% 100%;\n\tfont-weight: 700;\n}\n.{prefix}.popShowPrize .ownPrize{\n\t/*width: 350px;*/\n\twidth: 420px;\n\ttext-align: center;\n\tposition: absolute;\n\ttop: 62px;\n\tcolor: #fff;\n\tfont-size: 16px;\n\tline-height: 25px;\n\tmargin: 0 15px;\n\tfont-weight: 700;\n\ttext-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n}\n\n@-webkit-keyframes showModal {\n\tfrom {\n\t\t-webkit-transform: scale(.1);\n\t\ttransform: scale(.1)\n\t}\n\tto {\n\t\t-webkit-transform: scale(1);\n\t\ttransform: scale(1)\n\t}\n}\n\n@keyframes showModal {\n\tfrom {\n\t\t-webkit-transform: scale(.1);\n\t\ttransform: scale(.1)\n\t}\n\tto {\n\t\t-webkit-transform: scale(1);\n\t\ttransform: scale(1)\n\t}\n}\n\n@keyframes scale {\n\tfrom {\n\t\ttransform: scale(0);\n\t\t-webkit-transform: scale(0);\n\t}\n\tto {\n\t\ttransform: scale(1);\n\t}\n}\n\n@-webkit-keyframes scale {\n\tfrom {\n\t\t-webkit-transform: scale(0);\n\t\ttransform: scale(0);\n\t}\n\tto {\n\t\t-webkit-transform: scale(1);\n\t\ttransform: scale(1);\n\t}\n}\n\n@keyframes move {\n\tfrom {\n\t\t-webkit-transform: translate(0, 100px);\n\t\ttransform: translate(0, 100px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, 0);\n\t\ttransform: translate(0, 0);\n\t}\n}\n\n@-webkit-keyframes move {\n\tfrom {\n\t\t-webkit-transform: translate(0, 100px);\n\t\ttransform: translate(0, 100px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, 0);\n\t\ttransform: translate(0, 0);\n\t}\n}\n\n.{prefix}.popShowPrize .ribbon {\n\tdisplay: block;\n\twidth: 8px;\n\theight: 14px;\n\tposition: absolute;\n\ttop: 0;\n\tanimation: ribbon 4s linear 1s infinite;\n\t-webkit-animation: ribbon 4s linear 1s infinite;\n}\n\n@keyframes ribbon {\n\t0% {\n\t\topacity: 1;\n\t\ttransform: translate(0, 0);\n\t\t-webkit-transform: translate(0, 0);\n\t}\n\t100% {\n\t\topacity: 0;\n\t\ttransform: translate(-50px, 280px);\n\t\t-webkit-transform: translate(-50px, 280px);\n\t}\n}\n\n@-webkit-keyframes ribbon {\n\t0% {\n\t\topacity: 1;\n\t\ttransform: translate(0, 0);\n\t\t-webkit-transform: translate(0, 0);\n\t}\n\t100% {\n\t\topacity: 0;\n\t\ttransform: translate(-50px, 280px);\n\t\t-webkit-transform: translate(-50px, 280px);\n\t}\n}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(1) {\n\ttop: 22%;\n\tleft: 140px;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(2) {\n\ttop: 29%;\n\tleft: 110px;\n\t}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(3) {\n\ttop: 30%;\n\tleft: 200px;\n\t}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(4) {\n\ttop: 40%;\n\tleft: -1rem;\n\tbackground-size: 100% 100%;\n}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(5) {\n\ttop: 50%;\n\tleft: 1.4rem;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(6) {\n\ttop: 60%;\n\tleft: 0rem;\n\t}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(7) {\n\ttop: 70%;\n\tright: 1.5rem;\n\t}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(8) {\n\ttop: 80%;\n\tleft: 1.4rem;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(9) {\n\ttop: 30%;\n\tright: 2.5rem;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(10) {\n\ttop: 40%;\n\tright: -0.75rem;\n\t}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(11) {\n\ttop: 60%;\n\tright: 4.7rem;\n\t}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(12) {\n\ttop: 70%;\n\tright: 0.3rem;\n\t}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(13) {\n\ttop: 80%;\n\tright: -1rem;\n\t}\n.{prefix}.popShowPrize .showADMark {\n\tdisplay: block!important;\n}\n\n",
	dialogStyleSmall = ".{prefix} info-div, .{prefix}info-div{\n   display: block;\n}\n.{prefix}-gameClose{\n\t\t\t  display: inline-block;\n\t\t\t  position: absolute;\n\t\t\t  cursor: pointer;\n\t\t\t  width: 25px;\n\t\t\t  height: 25px;\n\t\t\t right: 0;\n\t          top: 0;\n\t\t }\n\n.{prefix}.autowrap{\n\tdisplay: flex;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flex;\n\tdisplay: -o-flex;\n\tdisplay: -moz-flex;\n\tposition: relative;\n}\n.{prefix}.autowrap iframe{\n    display:block;\n    margin: auto;\n}\n.{prefix}.popShowPrize{\n\tposition: fixed;\n\tz-index: 10000;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tpadding: 0 10px;\n\tbox-sizing: border-box;\n\toverflow: hidden;\n\tbackground-color: rgba(0, 0, 0, .65);\n\tdisplay: none;\n}\n.{prefix}.popShowPrize .card-sunshine {\n\twidth: 300px;\n\theight: 300px;\n\t\n\tbackground-size: 100% 100%;\n\tposition: absolute;\n\tanimation: circle 10s linear infinite;\n\t-webkit-animation: circle 10s linear infinite;\n}\n\t\t /*中奖规则说明*/\n.{prefix}-showRules {\n\t\t\t display: block;\n\t\t\t height: 25px;\n\t\t\t width: 23px;\n\t\t\t background: red;\n\t\t\t position: absolute;\n\t\t\t top: 0;\n\t\t\t left: 0;\n\t\t }\n.{prefix}.popShowPrize .rule-wrap {\n\t\t\t height: 260px;\n\t\t\t width: 260px;\n\t\t\t background: #ff4b3d;\n\t\t\t position: absolute;\n\t\t\t left: 50%;\n\t\t\t transform: translateX(-50%);\n\t\t\t border-radius: 10px;\n\t\t\t top: 18px;\n             padding-bottom: 15px;\n             box-sizing: border-box;\n\t\t }\n.{prefix}.popShowPrize .rule-tips-top {\n\t\t\t top: -24px;\n\t\t\t height: 67px;\n\t\t\t width: 100%;\n\t\t\t position: absolute;}\n.{prefix}.popShowPrize .rule-content {\n\t\t\t color: #fff;\n\t\t\t padding: 30px 10px 20px;\n\t\t\t font-size: 12px;\n\t\t }\n.{prefix}.popShowPrize  .closeRules{\n\t\t\t display: block;\n\t\t\t width: 30px;\n\t\t\t height: 30px;\n\t\t\t position: absolute;\n\t\t\t background-size: 100% 100%;\n\t\t\t right: 0;\n\t\t\t top: 0;\n             z-index: 100;\n\t\t }\n.{prefix}.popShowPrize .smallScroll {\n             width: 100%;\n             height: 100%;\n             overflow: hidden;\n         }\n.{prefix}.popShowPrize .smallRule {\n             height: 260px;\n             width: 280px;\n             overflow-y: auto;\n         }\n\n.{prefix}.popShowPrize .m-box {\n\twidth: 300px;\n\theight: 300px;\n\tposition: absolute;\n}\n\n@-webkit-keyframes skip {\n\tfrom {\n\t\t-webkit-transform: scale(0.88);\n\t\ttransform: scale(0.88)\n\t}\n\t100% {\n\t\t-webkit-transform: scale(1.07);\n\t\ttransform: scale(1.07)\n\t}\n}\n\n@-moz-keyframes skip {\n\tfrom {\n\t\t-moz-transform: scale(0.88);\n\t\ttransform: scale(0.88)\n\t}\n\t100% {\n\t\t-moz-transform: scale(1.07);\n\t\ttransform: scale(1.07)\n\t}\n}\n\n@keyframes skip {\n\tfrom {\n\t\t-webkit-transform: scale(0.88);\n\t\t-moz-transform: scale(0.88);\n\t\ttransform: scale(0.88)\n\t}\n\t100% {\n\t\t-webkit-transform: scale(1.07);\n\t\t-moz-transform: scale(1.07);\n\t\ttransform: scale(1.07)\n\t}\n}\n@keyframes circle {\n\tfrom {\n\t\ttransform: rotate(0);\n\t}\n\tto {\n\t\ttransform: rotate(360deg);\n\t}\n}\n\n@-webkit-keyframes circle {\n\tfrom {\n\t\t-webkit-transform: rotate(0);\n\t}\n\tto {\n\t\t-webkit-transform: rotate(360deg);\n\t}\n}\n.{prefix}.popShowPrize .closetc {\n\tdisplay: block;\n\twidth: 2.5rem;\n\theight: 2.5rem;\n\ttext-align: center;\n\tline-height: 2.5rem;\n\tfont-size: 2.5rem;\n\tposition: absolute;\n\ttop: 20px;\n\tright: 20px;\n\t\n\tbackground-size: 100% 100%;\n}\n.{prefix}.popShowPrize .prizeWrap{\n\twidth:300px;\n\theight: 300px;\n\tposition: absolute;\n    left: 50%;\n    margin-left: -150px;;\n\n}\n\n.{prefix}.popShowPrize .showPrize-dialog {\n    width: 250px;\n    height: 240px;\n\tpadding-top: 10px;\n\tposition: absolute;\n\tleft: 50%;\n\tz-index: 2;\n\toverflow: visible;\n\tmargin-left: -125px;\n\t-webkit-animation: showModal .5s ease-in-out;\n\tanimation: showModal .5s ease-in-out;\n}\n\n.{prefix}.popShowPrize .showPrize-dialog .card-bg {\n\twidth: 250px;\n\theight: 200px;\n\t\n\toverflow: hidden;\n\tmargin: auto;\n\tpadding-top: 0;\n\ttransform: translate(0, 100px);\n\t-webkit-transform: translate(0, 100px);\n\tanimation: move 0.5s linear 0.4s forwards;\n\t-webkit-animation: move 0.5s linear 0.4s forwards;\n}\n\n.{prefix}.popShowPrize .showPrize-dialog .card-bg .imgAD {\n\twidth: 190px;\n\theight: 100px;\n\tdisplay: block;\n\tmargin: 70px auto 0;\n\tbackground-repeat: no-repeat;\n\tbackground-size: 100% auto;\n\n}\n\n.{prefix}.popShowPrize .showPrize-dialog .red-bg {\n\twidth: 300px;\n\theight: 125px;\n\tbackground-position: center;\n\tbackground-repeat: no-repeat;\n\tposition: relative;\n\tmargin: -7.08rem auto 0;\n\tz-index: -1;\n\tanimation: scale 0.2s linear forwards ;\n\t-webkit-animation: scale 0.2s linear forwards;\n}\n\n.{prefix}.popShowPrize .showPrize-dialog .detail {\n\twidth: 250px;\n\theight: 125px;\n\tposition: relative;\n\tmargin: -5.8rem auto 0;\n\tanimation: scale 0.2s linear forwards;\n\t-webkit-animation: scale 0.2s linear forwards;\n}\n\n.{prefix}.popShowPrize .showPrize-dialog .detail .infoTopic {\n\twidth: 220px;\n\theight: 40px;\n\tborder-radius: 4px;\n\ttext-align: center;\n\tposition: absolute;\n\ttop: 0px;\n\tcolor: #fff;\n\tfont-size: 15px;\n\tfont-weight: 500;\n\tline-height: 40px;\n\ttext-overflow: ellipsis;\n    white-space: nowrap;\n\toverflow: hidden;\n\tmargin: 0 15px\n}\n\n.{prefix}.popShowPrize .showPrize-dialog .detail .goto {\n\twidth: 120px;\n\theight: 25px;\n\tposition: absolute;\n\tleft: 50%;\n\tmargin-left: -60px;\n\tbottom: 20px;\n\ttext-align: center;\n\tline-height: 26px;\n    color: #9a0000;\n\tfont-size: 15px;\n\tfont-weight: 500;\n\ttext-shadow: 1px 1px 2px #fff;\n\t-webkit-text-shadow: 1px 1px 2px #fff;\n\tcursor: pointer;\n}\n\n.{prefix}.popShowPrize .showPrize-dialog .detail .goto:after {\n\tcontent: '';\n\twidth: 20px;\n\theight: 50px;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n}\n\n.{prefix}.popShowPrize .once-again {\n\twidth: 4.45rem;\n\theight: 1.325rem;\n\tline-height: 1.325rem;\n\ttext-align: center;\n\tbackground: transparent;\n\tborder: 1px solid #FFF;\n\tposition: absolute;\n\ttop: 19.0rem;\n\tleft: 50%;\n\tmargin-left: -2.275rem;\n\tborder-radius: 2px;\n\tcolor: #FFF;\n\tfont-weight: normal;\n\tfont-size: 14px;\n}\n\n.{prefix}.popShowPrize .close-btn {\n\tdisplay: block;\n\ttext-align: center;\n\tposition: absolute;\n\ttop: 9px;\n\tright: -18px;\n\tfont-size: 16px;\n\tz-index: 1000;\n\tcursor: pointer;\n}\n\n.{prefix}.popShowPrize .close-btn>img {\n\twidth: 100%;\n\theight: 100%;\n}\n.{prefix}.popShowPrize .goto,\n.{prefix}.popShowPrize .again {\n\twidth: 12.2rem;\n\theight: 2rem;\n\tmargin: 0 auto;\n\tline-height: 2rem;\n\ttext-align: center;\n\tcolor: #FFFFFF;\n\tfont-size: 0.8rem;\n\tborder-radius: 8px;\n\tmargin-bottom: 0.5rem;\n\t-webkit-animation: skip .8s linear infinite alternate;\n\t-moz-animation: skip .8s linear infinite alternate;\n\tanimation: skip .8s linear infinite alternate;\n\tposition: relative;\n}\n\n.{prefix}.popShowPrize .goto {\n\tline-height: 1.8rem;\n\tbackground-size: 100% 100%;\n\tfont-weight: 700;\n}\n.{prefix}.popShowPrize .ownPrize{\n\twidth: 220px;\n\ttext-align: center;\n\tposition: absolute;\n\ttop: 2.84rem;\n\tcolor: #fff;\n\tfont-size: 13px;\n\tline-height: 25px;\n\tmargin: 0 15px;\n\tfont-weight: 700;\n\ttext-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n}\n\n@-webkit-keyframes showModal {\n\tfrom {\n\t\t-webkit-transform: scale(.1);\n\t\ttransform: scale(.1)\n\t}\n\tto {\n\t\t-webkit-transform: scale(1);\n\t\ttransform: scale(1)\n\t}\n}\n\n@keyframes showModal {\n\tfrom {\n\t\t-webkit-transform: scale(.1);\n\t\ttransform: scale(.1)\n\t}\n\tto {\n\t\t-webkit-transform: scale(1);\n\t\ttransform: scale(1)\n\t}\n}\n\n@keyframes scale {\n\tfrom {\n\t\ttransform: scale(0);\n\t\t-webkit-transform: scale(0);\n\t}\n\tto {\n\t\ttransform: scale(1);\n\t}\n}\n\n@-webkit-keyframes scale {\n\tfrom {\n\t\t-webkit-transform: scale(0);\n\t\ttransform: scale(0);\n\t}\n\tto {\n\t\t-webkit-transform: scale(1);\n\t\ttransform: scale(1);\n\t}\n}\n\n@keyframes move {\n\tfrom {\n\t\t-webkit-transform: translate(0, 100px);\n\t\ttransform: translate(0, 100px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, 0);\n\t\ttransform: translate(0, 0);\n\t}\n}\n\n@-webkit-keyframes move {\n\tfrom {\n\t\t-webkit-transform: translate(0, 100px);\n\t\ttransform: translate(0, 100px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, 0);\n\t\ttransform: translate(0, 0);\n\t}\n}\n\n.{prefix}.popShowPrize .ribbon {\n\tdisplay: block;\n\twidth: 8px;\n\theight: 14px;\n\tposition: absolute;\n\ttop: 0;\n\tanimation: ribbon 4s linear 1s infinite;\n\t-webkit-animation: ribbon 4s linear 1s infinite;\n}\n\n@keyframes ribbon {\n\t0% {\n\t\topacity: 1;\n\t\ttransform: translate(0, 0);\n\t\t-webkit-transform: translate(0, 0);\n\t}\n\t100% {\n\t\topacity: 0;\n\t\ttransform: translate(-50px, 280px);\n\t\t-webkit-transform: translate(-50px, 280px);\n\t}\n}\n\n@-webkit-keyframes ribbon {\n\t0% {\n\t\topacity: 1;\n\t\ttransform: translate(0, 0);\n\t\t-webkit-transform: translate(0, 0);\n\t}\n\t100% {\n\t\topacity: 0;\n\t\ttransform: translate(-50px, 280px);\n\t\t-webkit-transform: translate(-50px, 280px);\n\t}\n}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(1) {\n\ttop: 22%;\n\tleft: 140px;\n\t}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(2) {\n\ttop: 29%;\n\tleft: 110px;\n\t}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(3) {\n\ttop: 30%;\n\tleft: 200px;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(4) {\n\ttop: 40%;\n\tleft: -1rem;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(5) {\n\ttop: 50%;\n\tleft: 1.4rem;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(6) {\n\ttop: 60%;\n\tleft: 0rem;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(7) {\n\ttop: 70%;\n\tright: 1.5rem;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(8) {\n\ttop: 80%;\n\tleft: 1.4rem;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(9) {\n\ttop: 30%;\n\tright: 2.5rem;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(10) {\n\ttop: 40%;\n\tright: -0.75rem;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(11) {\n\ttop: 60%;\n\tright: 4.7rem;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(12) {\n\ttop: 70%;\n\tright: 0.3rem;}\n\n.{prefix}.popShowPrize .ribbon:nth-of-type(13) {\n\ttop: 80%;\n\tright: -1rem;}\n.{prefix}.popShowPrize .showADMark {\n\tdisplay: block!important;\n}\n\n",
	dialogSmall = ". {prefix}.popShowPrize .card-sunshine {\n    height: 400px;\n}\n.{prefix}.popShowPrize .m-box{\n    height: 400px;\n    margin-top: -200px;\n}\n.{prefix}.popShowPrize .showPrize-dialog{\n    height: 350px;\n    margin-top: -135px;\n    top: 26%;\n}\n.{prefix}.popShowPrize .showPrize-dialog .card-bg{\n    width: 340px;\n    height: 300px;\n    transform: translate(0, 80px);\n\t-webkit-transform: translate(0, 80px);\n}\n.{prefix}.popShowPrize .showPrize-dialog .red-bg{\n    height: 170px;\n    margin: -65px auto 0;\n}\n.{prefix}.popShowPrize .showPrize-dialog .card-bg .imgAD{\n    width: 255px;\n    height: 127px;\n    margin: 111px auto 0;\n}\n.{prefix}.popShowPrize .showPrize-dialog .detail{\n    width: 340px;\n    height: 170px;\n    margin: -151px auto 0;\n}\n.{prefix}.popShowPrize .showPrize-dialog .detail .goto{\n    width: 250px;\n    margin-left: -125px;\n    bottom: 8px;\n}\n.{prefix}.popShowPrize .ownPrize{\n    width: 310px;\n    top: 57px;\n    line-height: 20px;\n}\n.{prefix}.popShowPrize .showPrize-dialog .detail .infoTopic{\n    width: 310px;\n    margin: 0 8px;\n    height: 30px;\n    line-height: 30px;\n}\n.{prefix}.popShowPrize .rule-wrap{\n    top: 100px;\n         }\n@keyframes move {\n\tfrom {\n\t\t-webkit-transform: translate(0, 80px);\n\t\ttransform: translate(0, 80px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, 0);\n\t\ttransform: translate(0, 0);\n\t}\n}\n\n@-webkit-keyframes move {\n\tfrom {\n\t\t-webkit-transform: translate(0, 80px);\n\t\ttransform: translate(0, 80px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, 0);\n\t\ttransform: translate(0, 0);\n\t}\n}\n",
	prizeStyle = "/*我的奖品*/\n\n.{prefix} info-div, .{prefix}info-div{\n                                 display: block;\n                             }\n.{prefix}.autowrap{\n             display: flex;\n             display: -webkit-flex;\n             display: -ms-flex;\n             display: -o-flex;\n             display: -moz-flex;\n         }\n.{prefix}.autowrap iframe{\n             display:block;\n             margin: auto;\n         }\n.{prefix}.prizeList{\n             position: fixed;\n             z-index: 10000;\n             top: 0;\n             right: 0;\n             bottom: 0;\n             left: 0;\n             width: 100%;\n             height: 100%;\n             padding: 0 10px;\n             box-sizing: border-box;\n             overflow: hidden;\n             background-color: rgba(0, 0, 0, .65);\n             display: none;\n         }\n.{prefix}.prizeList .prize-content{\n   display: flex;\n         }\n.{prefix}.prizeList .prize-content{\n         margin: auto;\n         }\n.{prefix}.prizeList .card-sunshine {\n             width: 500px;\n             height: 500px;\n \n             background-size: 100%;\n             position: absolute;\n             top: 50%;\n             left: 50%;\n             margin-top: -250px;\n             margin-left: -250px;\n             animation: circle 10s linear infinite;\n             -webkit-animation: circle 10s linear infinite;\n         }\n.{prefix}.prizeList .m-box {\n             width: 500px;\n             /*height: 500px;*/\n             position: absolute;\n             top: 50%;\n             left: 50%;\n             overflow: visible;\n             margin-top: -250px;\n             margin-left: -250px;\n             display: flex;\n             flex-direction: column;\n             animation: zoomIn 1s both ;\n         }\n.{prefix}.prizeList .prize-top{\n             vertical-align: middle;\n             margin: auto;\n             width: 438px;\n             height: 150px;\n \n         }\n.{prefix}.prizeList .prize_none_wrap {\n            display: flex;\n            display: -ms-flex;\n            display: -moz-flex;\n            display: -webkit-flex;\n            width: 100%;\n            height: 100%;\n            cursor: pointer;\n\n         }\n .{prefix}.prizeList .prize_none {\n              margin: auto;\n\n\ncolor: #fff;\n              font-size: 14px;\n          }\n.{prefix}.prizeList .none-tips {\n           padding-top: 108px;\n         }\n.{prefix}.prizeList .m-listWrap {\n             height: 360px;\n             background: #ff631e;\n             width: 438px;\n             margin: auto;\n             padding: 0 10px 10px;\n             box-sizing: border-box;\n             border-bottom-left-radius: 10px;\n             border-bottom-right-radius: 10px;\n\n         }\n.{prefix}.prizeList .m-list{\n             background: #ea1226;\n             box-sizing: border-box;\n             width: 100%;\n             height: 100%;\n             border-radius: 10px;\n             padding: 10px;\n             overflow-y: auto;\n             overflow-x: hidden;\n         }\n.{prefix}.prizeList .m-list::-webkit-scrollbar{\n             width:5px;\n         }\n.{prefix}.prizeList .m-list::-webkit-scrollbar-thumb {\n             border-radius:4px;\n             background:#ffab50;\n}\n\n.{prefix}.prizeList .list-detail{\n             height: 62px;\n             width: 100%;\n             display: flex;\n             margin-bottom: 10px;\n             cursor: pointer;\n         }\n.{prefix}.prizeList .d-left{\n             width: 115px;\n             background-repeat: no-repeat;\n             background-size: 108px 54px;\n             background-position: center center;\n             background-color: #fff;\n             border-top-left-radius: 5px;\n             border-bottom-left-radius: 5px;\n         }\n.{prefix}.prizeList .d-right {\n             background: #fff;\n             width: 273px;\n             border-top-right-radius: 5px;\n             border-bottom-right-radius: 5px;\n             padding-right: 5px;\n             box-sizing: border-box;\n         }\n.{prefix}.prizeList .m-img{\n             vertical-align: middle;\n             width: 8px;\n             height: 62px;\n           \n         }\n.{prefix}.prizeList .prize-title {\n             text-overflow: ellipsis;\n             white-space: nowrap;\n             overflow: hidden;\n             font-size: 14px;\n             line-height: 30px;\n         }\n.{prefix}.prizeList .prizeMsg {\n             font-size: 14px;\n             line-height: 24px;\n             display: flex;\n             justify-content: space-between;\n\n         }\n.{prefix}.prizeList .p-time {\n             line-height: 24px;\n             white-space: nowrap;\n         }\n.{prefix}.prizeList .p-get {\n             background: #ff5b29;\n             color: #fff;\n             height: 25px;\n             border-radius: 13px;\n             padding: 0 6px;\n             white-space: nowrap;\n         }\n.{prefix}.prizeList .close-btn {\n             display: block;\n             text-align: center;\n             position: absolute;\n             top: 80px;\n             right: -18px;\n             font-size: 16px;\n             z-index: 1000;\n             cursor: pointer;\n         }\n.{prefix}.prizeList .closetc {\n             display: block;\n             width: 30px;\n             height: 30px;\n             text-align: center;\n             line-height: 30px;\n             position: absolute;\n             top: 0rem;\n             right: -20px;}\n.{prefix}.prizeList .close-btn>img {\n             width: 100%;\n             height: 100%;\n         }\n@-webkit-keyframes zoomIn {\n    from {\n        opacity: 0;\n        -webkit-transform: scale3d(0.3, 0.3, 0.3);\n        transform: scale3d(0.3, 0.3, 0.3);\n    }\n\n    50% {\n        opacity: 1;\n    }\n}\n\n@keyframes zoomIn {\n    from {\n        opacity: 0;\n        -webkit-transform: scale3d(0.3, 0.3, 0.3);\n        transform: scale3d(0.3, 0.3, 0.3);\n    }\n\n    50% {\n        opacity: 1;\n    }\n}\n\n@keyframes circle {\n    from {\n        transform: rotate(0);\n    }\n    to {\n        transform: rotate(360deg);\n    }\n}\n\n@-webkit-keyframes circle {\n    from {\n        -webkit-transform: rotate(0);\n    }\n    to {\n        -webkit-transform: rotate(360deg);\n    }\n}\n/*弹窗响应尺寸*/\n@media screen and (min-width: 332px) and (max-width: 750px) {\n    .{prefix}.prizeList .m-listWrap {\n                 height: 270px;\n             }\n    .{prefix}.prizeList  .m-box{\n                 top: 37%;\n                 margin-top: -150px;\n\n             }\n    .{prefix}.prizeList .card-sunshine{\n                 top: 30%;\n             }\n\n\n}\n/*弹窗响应尺寸*/\n@media screen and (max-width: 331px) {\n\n    .{prefix}.prizeList .m-list{\n                 padding: 5px;\n             }\n    .{prefix}.prizeList .m-listWrap {\n                 height: 128px;\n             }\n    .{prefix}.prizeList .prize-top {\n                 width: 284px;}\n    .{prefix}.prizeList .m-listWrap {\n                 width: 284px;\n             }\n    .{prefix}.prizeList  .m-box{\n                 height: 255px;\n                 top: 48%;\n                 margin-top: -150px;\n\n             }\n    .{prefix}.prizeList .card-sunshine{\n                 top: 30%;\n             }\n    .{prefix}.prizeList .d-right {\n                 width: 138px;\n             }\n    .{prefix}.prizeList .d-left {\n                 width: 105px;\n                 background-size: 99px 54px;\n    }\n    .{prefix}.prizeList  .t_jb{\n                 position: absolute;\n                 height: 49px;\n                 width: 43px;\n                 top: 30px;\n                 left: 122px;}\n    .{prefix}.prizeList .closetc{\n                width: 2rem;\n                height: 2rem;\n                line-height: 2rem;\n                font-size: 2rem;\n                top: 10px;\n                right: 98px;\n            }\n    .{prefix}.prizeList .prize_none {\n                 background-size: 47px 43px;\n             }\n    .{prefix}.prizeList .none-tips {\n                 padding-top: 52px;\n             }\n\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
	hoverThumbnail = "#{prefix}-gameBg {\n\t\tbackground-repeat: no-repeat;\n\t\tbackground-size: 100%;\n\t\t }\n#{prefix}-popupIframe {\n\tdisplay: block;\n\tmargin: {gameBackground.gameTop}px auto 0;\n}\n.{prefix}-thumbnail{\n\t\t\t display: block;\n\t\t\t cursor: pointer;\n\t\t\twidth: {width}px;\n\t\t\theight: {height}px;\n\t\t\tbackground: url({scheme}:{thumbnail}) no-repeat center;\n\t\t\tbackground-size: 100% 100%;\n\t\t\t-webkit-animation: tada 5s  linear infinite backwards;\n\t\t\t-moz-animation: tada 5s linear  infinite backwards;\n\t\t\tanimation: tada 5s linear  infinite backwards;\n}\n.{prefix}-close{\n\t\t\t display: inline-block;\n\t\t\t position: absolute;\n\t\t\t cursor: pointer;\n\t\t\t width: 35px;\n\t\t\t height: 35px;\n\t top: {gameBackground.closeTop}px;\n\t\t\t right: {gameBackground.closeRight}px;\n\t\t }\n@-webkit-keyframes tada {\n\t5% {\n\t\t-webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -10deg);\n\t\ttransform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -10deg);\n\t}\n\t6%,\n\t8%,\n\t10%,\n\t12% {\n\t\t-webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 10deg);\n\t\ttransform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 10deg);\n\t}\n\n\t7%,\n\t9%,\n\t11% {\n\t\t-webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -10deg);\n\t\ttransform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -10deg);\n\t}\n\n\t13% {\n\t\t-webkit-transform: scale3d(1, 1, 1);\n\t\ttransform: scale3d(1, 1, 1);\n\t}\n}\n\n@keyframes tada {\n\t5% {\n\t\t-webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -10deg);\n\t\ttransform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -10deg);\n\t}\n\t6%,\n\t8%,\n\t10%,\n\t12% {\n\t\t-webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 10deg);\n\t\ttransform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 10deg);\n\t}\n\n\t7%,\n\t9%,\n\t11% {\n\t\t-webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -10deg);\n\t\ttransform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -10deg);\n\t}\n\n\t13% {\n\t\t-webkit-transform: scale3d(1, 1, 1);\n\t\ttransform: scale3d(1, 1, 1);\n\t}\n\n}\n\n";

	function fireworks(t) {
		var e = document.querySelector("body"),
		n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function (t) {
			window.setTimeout(t, 1e3 / 60)
		},
		i = {
			particleCount: 50,
			angle: 90,
			spread: 100,
			startVelocity: 25,
			decay: .9,
			ticks: 500,
			zIndex: 1000,
			colors: ["#5BC0EB", "#2176AE", "#FDE74C", "#9BC53D", "#E55934", "#FA7921", "#FF4242"]
		},
		o = void 0;

		function r(t) {
			// console.log(t)
			return parseInt(t, 16)
		}
		function a(t, e, n) {
			return function (t, e) {
				return e ? e(t) : t
			}
			(t &&
				function (t) {
				return !(null === t || void 0 === t)
			}
				(t[e]) ? t[e] : i[e], n)
		}
		function s(t) {
			var e = t.getContext("2d"),
			n = (window.devicePixelRatio || 1) / (e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1);
			t.width = document.documentElement.clientWidth * n,
			t.height = document.documentElement.clientHeight * n,
			t.style.width = document.documentElement.clientWidth + "px",
			t.style.height = document.documentElement.clientHeight + "px"
		}
		function p(t) {
			var e = t.angle * (Math.PI / 180),
			n = t.spread * (Math.PI / 180);
			return {
				x: t.x,
				y: t.y,
				depth: .5 * Math.random() + .6,
				wobble: 10 * Math.random(),
				velocity: .5 * t.startVelocity + Math.random() * t.startVelocity,
				angle2D: -e + (.5 * n - Math.random() * n),
				tiltAngle: Math.random() * Math.PI,
				color: function (t) {
					var e = (t + "").replace(/[^0-9a-f]/gi, "");
					return e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), {
						r: r(e.substring(0, 2)),
						g: r(e.substring(2, 4)),
						b: r(e.substring(4, 6))
					}
				}
				(t.color),
				tick: 0,
				totalTicks: t.ticks,
				decay: t.decay,
				random: Math.random() + 5,
				tiltSin: 0,
				tiltCos: 0,
				wobbleX: 0,
				wobbleY: 0
			}
		}
		e &&
		function (t, e) {
			console.log(2)
			for (var i = a(e, "particleCount", Math.floor), r = a(e, "angle", Number), l = a(e, "spread", Number), c = a(e, "startVelocity", Number), d = a(e, "decay", Number), m = a(e, "colors"), f = a(e, "ticks", Number), g = a(e, "zIndex", Number), h = function (t) {
				var e = a(t, "origin", Object);
				return e.x = a(e, "x", Number),
				e.y = a(e, "y", Number),
				e
			}
				(e), u = i, b = [], x = o ? o.canvas : function (t) {
				var e = document.createElement("canvas");
				return s(e),
				e.style.position = "fixed",
				e.style.top = "0px",
				e.style.left = "0px",
				e.style.pointerEvents = "none",
				e.style.zIndex = t,
				e
			}
				(g), w = h.x, y = h.y; u--; )
				b.push(p({
						x: w,
						y: y,
						angle: r,
						spread: l,
						startVelocity: c,
						color: m[u % m.length],
						ticks: f,
						decay: d
					}));
			o ? o.addFettis(b) : (t.appendChild(x), (o = function (t, e, i) {
					console.log(3)
					function o() {
						p = l = null
					}
					var r = e.slice(),
					a = t.getContext("2d"),
					p = parseInt(t.style.width, 10),
					l = parseInt(t.style.height, 10);
					a.save(),
					a.scale(t.width / p, t.height / l);
					var c = new Promise(function (e) {
							n(function c() {
								p || l || (s(t), p = parseInt(t.style.width, 10), l = parseInt(t.style.height, 10), a.restore(), a.scale(t.width / p, t.height / l)),
								a.clearRect(0, 0, p, l),
								(r = r.filter(function (t) {
											return function (t, e) {
												e.x += Math.cos(e.angle2D) * e.velocity,
												e.y += Math.sin(e.angle2D) * e.velocity + 5 * e.depth,
												e.wobble += .1,
												e.velocity *= e.decay,
												e.tiltAngle += .02 * Math.random() + .12,
												e.tiltSin = Math.sin(e.tiltAngle),
												e.tiltCos = Math.cos(e.tiltAngle),
												e.random = Math.random() + 4,
												e.wobbleX = e.x + 10 * Math.cos(e.wobble) * e.depth,
												e.wobbleY = e.y + 10 * Math.sin(e.wobble) * e.depth;
												var n = e.tick++/e.totalTicks,i=e.x+e.random*e.tiltCos,o=e.y+e.random*e.tiltSin,r=e.wobbleX+e.random*e.tiltCos,a=e.wobbleY+e.random*e.tiltSin;return t.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-n)+")",t.beginPath(),e.depth,t.moveTo(Math.floor(e.x),Math.floor(e.y)),t.lineTo(Math.floor(e.wobbleX),Math.floor(o)),t.lineTo(Math.floor(r),Math.floor(a)),t.lineTo(Math.floor(i),Math.floor(e.wobbleY)),t.closePath(),t.fill(),e.tick<e.totalTicks}(a,t)})).length?n(c):(window.removeEventListener("resize",o),i(),e())})});return window.addEventListener("resize",o,!1),{addFettis:function(t){return r=r.concat(t),c},canvas:t,promise:c}}(x,b,function(){o=null,t.removeChild(x)})).promise)}(e,{particleCount:150,startVelocity:45,origin:t})}function hoverIframe(t){var e=$R[t].options,n={};try{n=JSON.parse($R[t].pluginData.ads[0].dj_interaction)}catch(v){}var i=$R[t].pluginData.ads[0].dj_imgw,o=$R[t].pluginData.ads[0].dj_imgh,r=n.scene.name,a=i/o,
												s = 430;
												"grasp" === r && (s = 250);
												var p = {
													grasp: {
														url: "",
														iframeHeight: s / .66,
														iframeWidth: s,
														closeTop: 0,
														closeRight: -30
													},
													wheel: {
														gameTop: 70,
														iframeHeight: s / 1.19,
														iframeWidth: s / 1.19,
														closeTop: 100,
														closeRight: 42
													},
													slot: {
														gameTop: 116,
														iframeHeight: s / 1.34,
														iframeWidth: s / 1.34,
														closeTop: 100,
														closeRight: 42
													},
													eggs: {
														gameTop: 116,
														iframeHeight: s / 1.34,
														iframeWidth: s / 1.34,
														closeTop: 100,
														closeRight: 42
													},
													card: {
														url: "",
														gameTop: 70,
														iframeHeight: s / 1.34,
														iframeWidth: s / 1.34,
														closeTop: 50,
														closeRight: 30
													},
													nineGrid: {
														gameTop: 90,
														iframeHeight: s / 1.34,
														iframeWidth: s / 1.34,
														closeTop: 50,
														closeRight: 30
													}
												};
												$R.gameBackground = p[r];
												var l,
												c = s / a;
												l = e.game ? $R[t].urls[e.game] : n.scene.url,
												addStyle(T(hoverThumbnail, {
														prefix: t,
														width: e.w,
														height: e.h,
														thumbnail: n.skin.thumbnail,
														scheme: $R.scheme,
														gameBackground: $R.gameBackground
													}));
												var d = document.getElementById(t);
												if (e.hoverDefine.target && (d = document.querySelectorAll(e.hoverDefine.target)), !$R[t].gameBg) {
													$R[t].gameBg = document.createElement("info-div"),
													$R[t].gameBg.setAttribute("id", t + "-gameBg"),
													$R[t].iframe = document.createElement("iframe"),
													$R[t].iframe.setAttribute("id", t + "-popupIframe"),
													$R[t].gameBg.style.width = s + "px",
													$R[t].gameBg.style.height = c + "px",
													$R[t].iframe.setAttribute("frameborder", "no"),
													$R[t].iframe.setAttribute("scrolling", "no"),
													$R[t].iframe.height = $R.gameBackground.iframeHeight,
													$R[t].iframe.width = $R.gameBackground.iframeWidth,
													$R[t].iframe.setAttribute("allowtransparency", !0),
													$R[t].iframe.setAttribute("src", l + "?&si=" + e.showid + "&containerID=" + t + "&t=" + (new Date).getTime()),
													$R[t].iframe.setAttribute("data-type", e.type),
													$R[t].iframe.setAttribute("data-id", t),
													$R[t].gameBg.style.visibility = "hidden",
													$R[t].gameBg.style.position = "fixed",
													$R[t].gameBg.style.opacity = "0";
													try {
														var m = $R[t].pluginData,
														f = m.ads[0].imptk;
														$R[t].clickPlugin = m.ads[0].clktk.join(","),
														m.impurl && f.push(m.impurl + m.ads[0].imparg),
														$R[t].iframe.setAttribute("data-pv", f)
													} catch (v) {}
													document.body.appendChild($R[t].gameBg),
													document.getElementById(t + "-gameBg").appendChild($R[t].iframe)
												}
												function g(n) {
													// 截取
													var i = n.getBoundingClientRect(),
													o = window.innerHeight,
													r = window.innerWidth,
													a = i.top,
													p = i.left,
													l = 0,
													d = 0;
													e.hoverDefine.target ? (l = o - a - i.height, d = r - p - i.width) : (l = o - a - e.h, d = r - p - e.w);
													var m = [{
															key: "left",
															value: p
														}, {
															key: "top",
															value: a
														}, {
															key: "right",
															value: d
														}, {
															key: "bottom",
															value: l
														}
													];
													m.sort(function (t, e) {
														return t.value - e.value
													});
													var f = m[m.length - 1],
													g = m[m.length - 2];

													function h() {
														var t = {};
														return "left" === f.key && (t.left = f.value - s),
														"left" === g.key && (t.left = g.value - s),
														"right" === f.key && (t.left = i.right),
														"right" === g.key && (t.left = i.right),
														"bottom" === f.key && (t.top = i.top),
														"bottom" === g.key && (t.top = i.top),
														"top" === f.key && (t.top = i.top - (c - e.h)),
														"top" === g.key && (t.top = i.top - (c - e.h)),
														("left" === f.key && "right" === g.key || "right" === f.key && "left" === g.key) && (t.top = i.top),
														("top" === f.key && "bottom" === g.key || "bottom" === f.key && "top" === g.key) && (t.left = i.right),
														t
													}
													if ($R[t].closeIcon) {
														var u = h();
														("left" === f.key && f.value >= s || "right" === f.key && f.value >= s) && ($R[t].gameBg.style.left = u.left + "px"),
														("left" === g.key && g.value >= s || "right" === g.key && g.value >= s) && ($R[t].gameBg.style.left = u.left + "px"),
														("top" === f.key && f.value >= c || "bottom" === f.key && f.value >= c) && ($R[t].gameBg.style.top = u.top + "px"),
														("top" === g.key && g.value >= c || "bottom" === g.key && g.value >= c) && ($R[t].gameBg.style.top = u.top + "px"),
														("left" === f.key && f.value < s || "right" === f.key && f.value < s) && ($R[t].gameBg.style.left = i.left + "px", $R[t].gameBg.style.top = i.top + i.height + "px", u.top = i.top + i.height, u.left = i.left),
														("left" === g.key && g.value < s || "right" === g.key && g.value < s) && ($R[t].gameBg.style.left = i.left + "px", $R[t].gameBg.style.top = i.top + i.height + "px", u.top = i.top + i.height, u.left = i.left),
														"" == $R[t].gameBg.style.top && ($R[t].gameBg.style.top = u.top + "px"),
														$R[t].gameBg.style.visibility = "visible",
														$R[t].gameBg.style.opacity = "1"
													} else {
														$R[t].gameBg.style.visibility = "visible",
														$R[t].gameBg.style.opacity = "1",
														e.hoverDefine.position ? $R[t].gameBg.style.position = e.hoverDefine.position : $R[t].gameBg.style.position = "fixed",
														e.hoverDefine.zIndex && ($R[t].gameBg.style.zIndex = e.hoverDefine.zIndex),
														$R[t].closeIcon = document.createElement("close-icon");
														var b = h();
														("left" === f.key && f.value >= s || "right" === f.key && f.value >= s) && ($R[t].gameBg.style.left = b.left + "px"),
														("left" === g.key && g.value >= s || "right" === g.key && g.value >= s) && ($R[t].gameBg.style.left = b.left + "px"),
														("top" === f.key && f.value >= c || "bottom" === f.key && f.value >= c) && ($R[t].gameBg.style.top = b.top + "px"),
														("top" === g.key && g.value >= c || "bottom" === g.key && g.value >= c) && ($R[t].gameBg.style.top = b.top + "px"),
														("left" === f.key && f.value < s || "right" === f.key && f.value < s) && ($R[t].gameBg.style.left = i.left + "px", $R[t].gameBg.style.top = i.top + i.height + "px", b.top = i.top + i.height, b.left = i.left),
														("left" === g.key && g.value < s || "right" === g.key && g.value < s) && ($R[t].gameBg.style.left = i.left + "px", $R[t].gameBg.style.top = i.top + i.height + "px", b.top = i.top + i.height, b.left = i.left),
														"" == $R[t].gameBg.style.top && ($R[t].gameBg.style.top = b.top + "px", $R[t].gameBg.style.left = b.left + "px"),
														$R[t].closeIcon = document.createElement("close-icon"),
														$R[t].closeIcon.setAttribute("class", t + "-close"),
														document.getElementById(t + "-gameBg").appendChild($R[t].closeIcon),
														viewTrack(t + "-popupIframe"),
														addEventListener($R[t].closeIcon, "click", function (e) {
															e.stopPropagation(),
															$R[t].gameBg.style.visibility = "hidden",
															$R[t].gameBg.style.opacity = "0",
															$R[t].isGameBgShow = !1
														})
													}
													var x = parseInt($R[t].gameBg.style.top),
													w = document.documentElement.clientHeight;
													(x < 0 || w < c) && ($R[t].gameBg.style.top = 0),
													e.hoverDefine.top && ($R[t].gameBg.style.top = e.hoverDefine.top),
													e.hoverDefine.left && ($R[t].gameBg.style.left = e.hoverDefine.left),
													e.hoverDefine.marginLeft && ($R[t].gameBg.style.marginLeft = e.hoverDefine.marginLeft),
													e.hoverDefine.marginTop && ($R[t].gameBg.style.marginTop = e.hoverDefine.marginTop);
													for (var y = document.querySelectorAll("iframe"), v = 0; v < y.length; v++) {
														var k = y[v].getAttribute("data-type"),
														z = y[v].getAttribute("data-id");
														"hover" !== k && "click" !== k || z === t || (document.querySelector("#" + z + "-gameBg").style.visibility = "hidden", document.querySelector("#" + z + "-gameBg").style.opacity = "0", $R[z].isGameBgShow = !1)
													}
												}
												var h = function () {
													// 截取
													if (!$R[t].isGameBgShow) {
														$R[t].isGameBgShow = !0;
														var e = $R[t].gameBg.getBoundingClientRect(),
														n = $R[t].gameBg.offsetTop,
														i = get_browser();
														// if ("MSIE" === i.name && "10" === i.version) return;
														n = 10
															fireworks({
																x: e.left + e.width / 2,
																y: n + e.height / 2
															})
													}
												};
												h()
												// debugger
												if (e.hoverDefine.target)
													if (e.hoverDefine.delegate)
														for (var u = document.querySelectorAll(e.hoverDefine.delegate), b = 0; b < u.length; b++)
															"hover" === e.type ?
															addEventListener(u[b], "mouseover", function (t) {
																var n = e.hoverDefine.target.split(".")[1];
																t.target && t.target.className.indexOf(n) >= 0 && (g(t.target), h())
															}) : "click" === e.type && addEventListener(u[b], "click", function (t) {
																var n = e.hoverDefine.target.split(".")[1];
																t.target && t.target.className.indexOf(n) >= 0 && (t.stopPropagation(), g(t.target), h())
															});
													else
														for (var x = function (t) {
															"hover" === e.type ? addEventListener(d[t], "mouseenter", function () {
																g(d[t]),
																h()
															}) : "click" === e.type && addEventListener(d[t], "click", function (e) {
																e.stopPropagation(),
																g(d[t]),
																h()
															})
														}, w = 0; w < d.length; w++)
															x(w);
												else {
													var y = function () {
														g(d),
														h()
													};
													"hover" === e.type ? addEventListener(d, "mouseenter", function () {
														y()
													}) : "click" === e.type && addEventListener(d, "click", function (t) {
														t.stopPropagation(),
														y()
													})
												}
												addEventListener(document, "click", function (n) {
													var i = n.target;
													if (i.getAttribute("class") === t + "-thumbnail")
														return !1;
													if ("info-div" === i.tagName.toLowerCase())
														return !1;
													if ("iframe" === i.tagName.toLowerCase())
														return !1;
													if (e.hoverDefine.target) {
														var o = e.hoverDefine.target.split(".")[1];
														if (i.getAttribute("class") && i.getAttribute("class").indexOf(o) >= 0)
															return !1
													}
													$R[t].iframe && ($R[t].gameBg.style.visibility = "hidden", $R[t].gameBg.style.opacity = "0", $R[t].isIframeShow = !1)
												})
											}
											var gameClose = function (t) {
												$R[t].closeBtn = document.createElement("close-btn"),
												$R[t].closeBtn.setAttribute("class", t + "-gameClose"),
												document.getElementById(t + "-autoWrap").appendChild($R[t].closeBtn),
												addEventListener($R[t].closeBtn, "click", function (e) {
													e.stopPropagation();
													var n = new Date,
													i = n.getTime(),
													o = 864e5 - (1e3 * n.getHours() * 60 * 60 + 60 * n.getMinutes() * 1e3 + 1e3 * n.getSeconds()),
													r = {};
													r.timeStamp = i,
													r.minMsec = o;
													try {
														window.localStorage.setItem("interactPlugin" + $R[t].showid, JSON.stringify(r))
													} catch (a) {}
													document.getElementById(t + "-autoWrap").style.display = "none"
												})
											},
											timeJudge = function (t) {
												var e,
												n = (new Date).getTime();
												try {
													e = JSON.parse(window.localStorage.getItem("interactPlugin" + $R[t].showid))
												} catch (r) {
													e = null
												}
												if (null == e)
													return !1;
												var i = e.timeStamp,
												o = e.minMsec;
												return !(parseInt(n) - parseInt(i) >= o) || (window.localStorage.removeItem("interactPlugin" + $R[t].showid), !1)
											};

											function initDom(t) {
												var e = [],
												n = $R[t].options,
												i = $R[t].urls,
												o = {};
												try {
													o = JSON.parse($R[t].pluginData.ads[0].dj_interaction) || {},
													$R[t].gameId = o.scene.id
												} catch (d) {}
												var r,
												a = $R[t].pluginData.ads[0].dj_imgw,
												s = $R[t].pluginData.ads[0].dj_imgh;

												function p(t) {
													isEmpty(n.placeholderId) || isNil(n.placeholderId) || domready$1(function () {
														try {
															document.getElementById(n.placeholderId).innerHTML = t
														} catch (d) {}
													})
												}
												"scoop" !== n.game && "cardMini" !== n.game && "hang" != n.game || (a = n.w, s = n.h),
												$R[t].iframe = null,
												r = n.game ? "scoop" == n.game ? o.scene.url : i[n.game] : o.scene.url;
												var l = window.innerHeight;
												(addStyle(T(prizeStyle, {
															prefix: t,
															scheme: $R.scheme
														})), l <= 330) ? addStyle(T(dialogStyleSmall, {
														prefix: t,
														scheme: $R.scheme
													})) : (addStyle(T(dialogStyle, {
															prefix: t,
															scheme: $R.scheme
														})), l <= 750 && l > 330 && addStyle(T(dialogSmall, {
															prefix: t,
															scheme: $R.scheme
														})));
												if ("hover" === n.type || "click" === n.type) {
													e.push('<info-div style="width:{width}px;height:{height}px" id="{id}" class="{id}-thumbnail"></info-div>');
													var c = T(e.join(""), {
															id: t,
															width: n.w || 50,
															height: n.h || 50,
															gameW: a,
															gameH: s,
															showID: n.showid,
															url: r,
															containerID: t,
															timestamp: (new Date).getTime()
														});
													n.hoverDefine.target || p(c),
													domready$1(function () {
														inlay.initHoverDom(t),
														hoverIframe(t)
													})
												} else {
													e.push('<info-div style="width:{width}px;height:{height}px;" class="{id} autowrap" id="{id}-autoWrap"><iframe data-id="{id}" id="{id}-iframe" width="{gameW}" height="{gameH}" src="{url}?&si={showID}&containerID={containerID}&t={timestamp}" frameborder="no" scrolling="no" allowtransparency=”true”></iframe></info-div>'),
													p(T(e.join(""), {
															id: t,
															width: n.w || 500,
															height: n.h || 500,
															gameW: a,
															gameH: s,
															showID: n.showid,
															url: r,
															containerID: t,
															timestamp: (new Date).getTime()
														})),
													$R[t].options.showClose && gameClose(t),
													domready$1(function () {
														// $R[t].iframe = document.getElementById(t + "-iframe"), inlay.initDOM(t)
													})
												}
											}
											var dialogIe = ".{prefix} info-div, .{prefix}info-div{\n           display: block;\n    }\n.{prefix}.autowrap{\n            position: relative;\n     }\n.{prefix}.popShowPrize{\n             position: fixed;\n             z-index: 10000;\n             top: 0;\n             right: 0;\n             bottom: 0;\n             left: 0;\n             width: 100%;\n             height: 100%;\n             padding: 0 10px;\n             box-sizing: border-box;\n             overflow: hidden;\n             filter:progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7F000000,endcolorstr=#7F000000);\n             display: none;\n         }\n .{prefix}-bg {\n            display: block;\n            vertical-align: middle;\n            width: 100%;\n            position: absolute;\n            z-index: 100;\n          }\n.{prefix}-image {\n             display: block;\n             vertical-align: middle;\n             width: 100%;\n         }\n.{prefix}.popShowPrize .card-sunshine {\n             width: 500px;\n             height: 500px;\n             position: absolute;\n             top: 30%;\n             left: 50%;\n             margin-top: -198px;\n             margin-left: -250px;\n         }\n.{prefix}.popShowPrize .card-sunshine img {\n            display: block;\n            width: 100%;\n         }\n.{prefix}.popShowPrize .showPrize-dialog {\n             width: 500px;\n             height: 450px;\n             padding-top: 10px;\n             position: relative;\n             top: 30%;\n             left: 50%;\n             z-index: 2;\n             overflow: visible;\n             margin-left: -250px;\n             margin-top: -225px;\n         }\n.{prefix}-close {\n             display: block;\n             height: 43px;\n             width: 43px;\n             position: absolute;\n             background: black;\n             opacity:0;filter:alpha(opacity=0);\n             top: 58px;\n             *top: 48px;\n             right: 28px;\n             z-index: 1000;\n             cursor: pointer;\n         }\n.{prefix}-imgAD {\n             width: 400px;\n             height: 200px;\n            position: absolute;\n            z-index: 101;\n            top: 156px;\n            *top: 144px;\n            left: 51px;\n\n         }\n.{prefix}-ownPrize{\n             width: 370px;\n             text-align: center;\n             position: absolute;\n             left: 65px;\n             z-index: 101;\n             bottom: -22px;\n             *bottom: -13px;\n             color: #fff;\n             font-size: 16px;\n             line-height: 25px;\n             font-weight: bold;\n             text-overflow: ellipsis;\n             white-space: nowrap;\n             overflow: hidden;\n         }\n.{prefix}-infoTopic {\n             width: 100%;\n             height: 40px;\n             text-align: center;\n             position: absolute;\n              z-index: 101;\n             bottom: 34px;\n             color: #fff;\n             font-size: 22px;\n             font-weight: bold;\n             line-height: 40px;\n             text-overflow: ellipsis;\n             white-space: nowrap;\n             overflow: hidden;\n         }\n.{prefix}-goto {\n             width: 100%;\n             color: #9a0000;\n             bottom: -100px;\n             *bottom: -91px;\n             text-align: center;\n             position: absolute;\n             z-index: 101;\n             height: 40px;\n             line-height: 40px;\n             font-size: 22px;\n             font-weight: bold;\n             cursor: pointer;\n         }\n\n\n",
											dialogIe750 = ".{prefix}.popShowPrize .showPrize-dialog{\n             width: 405px!important;\n             height: 330px!important;\n             margin-top: -150px!important;\n         }\n.{prefix}.popShowPrize .card-sunshine {\n             margin-top: -150px;\n             margin-left: -250px;\n         }\n.{prefix}-imgAD {\n    width: 320px!important;\n    height: 160px;\n    left: 42px!important;\n    top: 128px;\n    *top: 118px!important;\n         }\n.{prefix}-ownPrize{\n    width: 300px!important;\n    left: 52px;\n    bottom: -54px;\n    *left: 52px!important;\n    *bottom: -44px!important;\n         }\n.{prefix}-goto{\n    bottom: -120px;\n    *bottom: -109px!important;\n         }\n.{prefix}-infoTopic{\n    bottom: -13px;\n    *bottom: -3px!important;\n         }\n.{prefix}-close{\n    height: 34px;\n    width: 34px;\n    right: 23px;\n    top:49px;\n    *top: 39px;\n         }",
											dialogIe330 = ".{prefix}.popShowPrize .showPrize-dialog{\n             width: 245px!important;\n             height: 300px!important;\n             margin-top: -87px!important;\n             padding-top: 0;\n         }\n.{prefix}.popShowPrize .card-sunshine {\n             width: 245px;\n             height: 300px;\n             position: absolute;\n             top: 30%;\n             left: 50%;\n             margin-top: -49px;\n             margin-left: -150px;\n         }\n.{prefix}-imgAD {\n             width: 190px!important;\n             height: 95px;\n             left: 28px!important;\n             top: 72px;\n         }\n.{prefix}-ownPrize{\n             font-size: 15px;\n             width: 180px!important;\n             left: 32px;\n             bottom: 64px;\n         }\n.{prefix}-goto{\n             font-size: 14px;\n             bottom: 19px;\n         }\n.{prefix}-infoTopic{\n             bottom: 84px;\n             font-size: 16px;\n         }\n.{prefix}-close{\n             height: 20px;\n             width: 20px;\n             right: 13px;\n             top: 22px;\n         }",
											ie = ".{prefix}_img{\n padding: 0!important;\n margin: 0!important;\n border: 0!important;\n}\n#{prefix}-gif-icon {\n    width: {width}px!important;\n    height: {height}px!important;\n    cursor: pointer;\n}\n.{prefix}-thumbnail {\n    display: block;\n    position: relative;\n}\n#{prefix}_award_times{\n    display: block;\n     position: absolute;\n     top: 4px;\n     right: -4px;\n     z-index: 20;\n    color: white;\n}\n.{prefix}_award_circle{\n    width: 25px;\n    height: 25px;\n    position: absolute;\n    top: 0;\n    right: -12px;\n    z-index: 10;\n}\n";

											function lowIE(containerID) {
												initCustTag(document),
												$R[containerID].options.game = "hang",
												PluginReq.next(1, containerID).then(function (res) {
													if (1 != res.dj_outifr && 1 != res.errno && res.ads && 0 != res.ads.length) {
														$R[containerID].pluginData = res;
														var template = [],
														options = $R[containerID].options,
														gameJson = {};
														try {
															gameJson = JSON.parse($R[containerID].pluginData.ads[0].dj_interaction) || {}
														} catch (e) {
															gameJson = eval("(" + $R[containerID].pluginData.ads[0].dj_interaction + ")") || {}
														}
														var gameW = $R[containerID].pluginData.ads[0].dj_imgw,
														gameH = $R[containerID].pluginData.ads[0].dj_imgh,
														boxHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
														insertStyleDialog = T(dialogIe, {
																prefix: containerID,
																scheme: $R.scheme
															});
														if (addStyle(insertStyleDialog), boxHeight <= 750 && boxHeight > 330) {
															var insertStyle2 = T(dialogIe750, {
																	prefix: containerID,
																	scheme: $R.scheme
																});
															addStyle(insertStyle2)
														} else if (boxHeight <= 330) {
															var insertStyle3 = T(dialogIe330, {
																	prefix: containerID,
																	scheme: $R.scheme
																});
															addStyle(insertStyle3)
														}
														var ieIconStyle = T(ie, {
																width: options.w || 100,
																height: options.h || 100,
																prefix: containerID,
																scheme: $R.scheme
															});
														// addStyle(ieIconStyle), template.push('<info-div style="width:{width}px;height:{height}px;" id="{id}" class="{id}-thumbnail">'), template.push('    <img id="{id}-gif-icon" width="{width}" height="{height}" src="{gif}" class="{id}_img" />'), template.push('    <info-div id="{id}_award_times"></info-div>'), template.push("</info-div>");
														var container = T(template.join(""), {
																id: containerID,
																width: options.w || 100,
																height: options.h || 100,
																showID: options.showid,
																containerID: containerID,
																gif: $R.scheme + ":" + gameJson.skin.thumbnail,
																timestamp: (new Date).getTime()
															});
														renderHTML(container),
														domready$1(function () {
															inlay.initHoverDom(containerID, function (t) {
																var n = document.getElementById(containerID + "_award_times");
																addEventListener(document.getElementById(containerID), "click", function () {
																	var t;
																	try {
																		t = $R[containerID].adData.ads.shift()
																	} catch (e) {
																		t = !1
																	}
																	if (t) {
																		map($R[containerID].pluginData.ads[0].clktk, function (t) {
																			sendLog(t.replace("__ACT_NUM__", $R[containerID].adData.ads.length || 0))
																		});
																		var i = {
																			item: t,
																			title: t.desc,
																			ticket: t.img,
																			btntext: "立即领取",
																			awardlink: t.curl,
																			type: "bingo"
																		};
																		$R[containerID].adData.impurl && i.item.imptk.push($R[containerID].adData.impurl + i.item.imparg),
																		new Dialog({
																			type: "bingo",
																			prefix: containerID,
																			item: i,
																			browserName: "IELow",
																			callback: function () {}
																		}),
																		n.innerText = $R[containerID].adData.ads.length || 0
																	} else
																		new Dialog({
																			type: "over",
																			prefix: containerID,
																			item: {
																				item: {}
																			},
																			browserName: "IELow",
																			callback: function () {}
																		})
																}),
																t.error ? n.innerText = 0 : n.innerText = $R[containerID].adData.ads.length || 0
															})
														})
													}
													function renderHTML(t) {
														isEmpty(options.placeholderId) || isNil(options.placeholderId) || domready$1(function () {
															try {
																document.getElementById(options.placeholderId).innerHTML = t
															} catch (e) {}
														})
													}
												})
											}
											function main(t) {
												if (window != window.parent && (t.isIframe = !0), t.showid) {
													console.log(store, 'test1')
													store.displayShowId.join(",").indexOf(t.showid) > -1 || store.displayShowId.push(t.showid),
													t.hoverDefine = t.hoverDefine ? t.hoverDefine : {};
													var e = namesapce + (new Date).getTime();
													console.log(e, 'test_e')
													if (store[e] = {}, $R[e] = {}, $R[e].showid = t.showid, $R[e].options = t, !timeJudge(e)) {
														if (isArray(t.game))
															t.game;
														$R[e].urls = {},
														$R[e].idStore = {
															wheel: "1",
															wheel_browser: "1",
															grasp: "2",
															slot: "3",
															eggs: "4",
															eggs_browser: "4",
															card: "5",
															scoop: "6",
															nineGrid: "7",
															cardMini: "8",
															hang: "9"
														},
														store.ids.push(e),
														is_IE(5) || is_IE(6) || is_IE(7) || is_IE(8) || is_IE(9) ? !(is_IE(7) || is_IE(8) || is_IE(9)) || "hover" !== t.type && "click" !== t.type || lowIE(e) : (PluginReq.next(1, e).then(function (t) {
																1 != t.dj_outifr && 1 != t.errno && t.ads && 0 != t.ads.length && ($R[e].pluginData = t, initDom(e))
															}), iframeMessageListener(e))
													}
												}
											}
											var version = "1.1.1000";
											return exports.render = main,
											exports.store = store,
											exports.version = version,
											exports
										}
											({});
