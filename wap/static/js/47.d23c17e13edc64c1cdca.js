webpackJsonp([47, 55], {
	530: function (t, e, i) {
		"use strict";
		function n(t) {
			return t && t.__esModule ? t : {
			default:
				t
			}
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var a = i(49),
		r = n(a);
		e.default = {
			data: function () {
				return {
					height: 0,
					width: 0,
					src: ""
				}
			},
			mounted: function () {
				this.height = ((webim || webim == "true") ? document.documentElement.clientHeight  : (window.screen.availHeight - 46)) ;
				this.width = ((webim || webim == "true") ? document.body.clientWidth  : window.screen.availWidth);
				this.src = r.default.yhhdPath + "?_=" + (new Date).getTime();
			}
		}
	},
	737: function (t, e, i) {
		e = t.exports = i(3)(),
		e.push([t.id, ".iframe-wrapper[data-v-d94ad380]{position:absolute;top:"+((webim || webim == "true") ? 0 : 46)+"px;left:0;overflow:hidden}iframe[data-v-d94ad380]{width:100%;max-width:100%}", ""])
	},
	892: function (t, e, i) {
		var n = i(737);
		"string" == typeof n && (n = [[t.id, n, ""]]);
		i(4)(n, {});
		n.locals && (t.exports = n.locals)
	},
	1135: function (t, e) {
		t.exports = {
			render: function () {
				var t = this,
				e = t.$createElement,
				i = t._self._c || e;
				return i("div", {
					staticClass: "iframe-wrapper",
					style: {
						height: t.height + "px",
						width: t.width + "px"
					}
				}, [i("iframe", {
							ref: "content",
							style: {
								"min-height": t.height + "px"
							},
							attrs: {
								src: t.src,
								scrolling: "no"
							}
						})])
			},
			staticRenderFns: []
		}
	},
	1255: function (t, e, i) {
		i(892);
		var n = i(2)(i(530), i(1135), "data-v-d94ad380", null);
		t.exports = n.exports
	}
});
