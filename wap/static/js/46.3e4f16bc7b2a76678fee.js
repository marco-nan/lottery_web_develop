webpackJsonp([46, 55], {
	240: function (t, e) {
		"use strict";
		Object.defineProperty(e, "__esModule", {
			value: !0
		}),
		e.default = {
			props: {
				defaultSrc: {
					type: String
				},
				src: {
					type: String
				}
			},
			data: function () {
				return {
					imagePath: ""
				}
			},
			watch: {
				src: function (t) {
					this.imagePath = this.defaultSrc,
					this.loadImage()
				}
			},
			mounted: function () {
				this.imagePath = this.defaultSrc,
				this.loadImage()
			},
			methods: {
				loadImage: function () {
					var t = this,
					e = this;
					e.isLoading = !0;
					var i = new window.Image;
					i.onload = function () {
						e.imagePath = t.src,
						e.isLoading = !1
					},
					i.onerror = function () {
						e.imagePath = t.defaultSrc,
						e.isLoading = !1
					},
					this.src ? i.src = this.src : (e.imagePath = this.defaultSrc, e.isLoading = !1)
				}
			}
		}
	},
	281: function (t, e, i) {
		t.exports = i.p + "static/img/404.9065ace.png"
	},
	301: function (t, e) {
		t.exports = {
			render: function () {
				var t = this,
				e = t.$createElement,
				i = t._self._c || e;
				return i("img", {
					attrs: {
						src: t.imagePath
					}
				})
			},
			staticRenderFns: []
		}
	},
	307: function (t, e, i) {
		var s = i(2)(i(240), i(301), null, null);
		t.exports = s.exports
	},
	462: function (t, e, i) {
		"use strict";
		function s(t) {
			return t && t.__esModule ? t : {
			default:
				t
			}
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var a = i(39),
		n = s(a),
		r = i(307),
		o = s(r);
		e.default = {
			components: {
				ZImg: o.default
			},
			data: function () {
				return {
					sliderHtml: "",
					chessNav: []
				}
			},
			methods: {
				enterGame: function (t) {
					this.$router.push({
						path: "/eleDelite/" + t
					})
				}
			},
			mounted: function () {
				var t = this;
				this.$http.get("/views/wap_index_slider.html").then(function (e) {
					t.sliderHtml = e.body,
					t.$nextTick(function () {
						var t = (0, n.default)(".mui-slider");
						t.slider({
							interval: 3e3
						})
					})
				}),
				this.$http.get("/api/live/allLiveGames").then(function (e) {
					e.body.forEach(function (e) {
						"ky" !== e.code && "jb" !== e.code && "qly" !== e.code && "jdb" !== e.code || (e.icon = "static/img/" + e.code + ".png", t.chessNav.push(e))
					})
				})
			}
		}
	},
	665: function (t, e, i) {
		e = t.exports = i(3)(),
		e.push([t.id, ".chess-scroll-wrapper[data-v-4ae29136]{background-color:#fff;margin-top:46px}.chess-box[data-v-4ae29136]{width:100%;height:auto;overflow:hidden}.chess-box li[data-v-4ae29136]{width:25%;float:left;padding:18px 0;text-align:center;font-size:14px}.chess-box li img[data-v-4ae29136]{width:60%;display:inline-block}", ""])
	},
	807: function (t, e, i) {
		var s = i(665);
		"string" == typeof s && (s = [[t.id, s, ""]]);
		i(4)(s, {});
		s.locals && (t.exports = s.locals)
	},
	1055: function (t, e, i) {
		t.exports = {
			render: function () {
				var t = this,
				e = t.$createElement,
				s = t._self._c || e;
				return s("div", {
					staticClass: "mui-scroll-wrapper chess-scroll-wrapper"
				}, [s("div", {
							staticClass: "mui-scroll"
						}, [s("div", {
									staticClass: "header-lay"
								}, [s("div", {
											staticClass: "mui-slider"
										}, [s("div", {
													staticClass: "mui-slider-group mui-slider-loop",
													domProps: {
														innerHTML: t._s(t.sliderHtml)
													}
												})])]), t._v(" "), s("ul", {
									staticClass: "chess-box"
								}, t._l(t.chessNav, function (e) {
										return s("li", {
											on: {
												click: function (i) {
													t.enterGame(e.code)
												}
											}
										}, [s("div", [s("z-img", {
															attrs: {
																"default-src": i(281),
																src: e.icon
															}
														})], 1), t._v(" "), s("div", [t._v(t._s(e.name == "JDB" ? e.name + "棋牌" : e.name))])])
									}))])])
			},
			staticRenderFns: []
		}
	},
	1198: function (t, e, i) {
		i(807);
		var s = i(2)(i(462), i(1055), "data-v-4ae29136", null);
		t.exports = s.exports
	}
});
