webpackJsonp([50, 55], {
	464: function (e, t, i) {
		"use strict";
		function n(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var a = i(39),
		o = n(a);
		t.default = {
			data: function () {
				return {
					gameNav: [{
							name: "cq9电子",
							icon: "static/img/cq9.png",
							code: "cq9"
						}, {
							name: "MG电子",
							icon: "static/img/mg.png",
							code: "mg"
						}, {
							name: "PT电子",
							icon: "static/img/pt.png",
							code: "pt"
						}, {
							name: "JDB电子",
							icon: "static/img/jdb.png",
							code: "jdb"
						}, {
							name: "HB电子",
							icon: "static/img/hb.png",
							code: "hb"
						}, {
							name: "PG电子",
							icon: "static/img/pg.png",
							code: "pg"
						}, {
							name: "AG电子",
							icon: "static/img/ag.png",
							code: "ag"
						}, {
							name: "BBIN电子",
							icon: "static/img/bbin.png",
							code: "bbin"
						}, {
							name: "PT电子",
							icon: "static/img/pt.png",
							code: "pt"
						}, {
							name: "GG电子",
							icon: "static/img/gg.png",
							code: "gg"
						}
					],
					sliderHtml: ""
				}
			},
			methods: {
				enterGameDelite: function (e, t) {
					this.$router.push({
						path: "/eleDelite/" + e
					})
				}
			},
			mounted: function () {
				var e = this;
				this.$http.get("/views/wap_index_slider.html").then(function (t) {
					e.sliderHtml = t.body,
					e.$nextTick(function () {
						var e = (0, o.default)(".mui-slider");
						e.slider({
							interval: 3e3
						})
					})
				})
			}
		}
	},
	613: function (e, t, i) {
		t = e.exports = i(3)(),
		t.push([e.id, ".ele-scroll-wrapper[data-v-043ef64b]{background-color:#fff;margin-top:46px}.ele-box-flex[data-v-043ef64b]{width:100%;height:auto;overflow:hidden}.ele-box-flex li[data-v-043ef64b]{float:left;width:23%;margin:10px 1%;text-align:center;position:relative}.ele-box-flex li span[data-v-043ef64b]{display:inline-block;position:absolute;top:46%;right:0;height:40%;width:1px;background-color:#edebeb}.ele-box-flex li img[data-v-043ef64b]{width:60%;display:inline-block}.ele-box-flex li div[data-v-043ef64b]{text-align:center}", ""])
	},
	752: function (e, t, i) {
		var n = i(613);
		"string" == typeof n && (n = [[e.id, n, ""]]);
		i(4)(n, {});
		n.locals && (e.exports = n.locals)
	},
	1005: function (e, t) {
		e.exports = {
			render: function () {
				var e = this,
				t = e.$createElement,
				i = e._self._c || t;
				return i("div", {
					staticClass: "mui-scroll-wrapper ele-scroll-wrapper padding_tabbar"
				}, [i("div", {
							staticClass: "mui-scroll"
						}, [i("div", {
									staticClass: "header-lay"
								}, [i("div", {
											staticClass: "mui-slider"
										}, [i("div", {
													staticClass: "mui-slider-group mui-slider-loop",
													domProps: {
														innerHTML: e._s(e.sliderHtml)
													}
												})])]), e._v(" "), i("ul", {
									staticClass: "ele-box-flex"
								}, e._l(e.gameNav, function (t, n) {
										return i("li", {
											on: {
												click: function (i) {
													e.enterGameDelite(t.code, t.name)
												}
											}
										}, [i("img", {
													attrs: {
														src: t.icon
													}
												}), i("div", [e._v(" " + e._s(t.name) + " ")]), (n + 1) % 4 !== 0 ? i("span") : e._e()])
									}))])])
			},
			staticRenderFns: []
		}
	},
	1200: function (e, t, i) {
		i(752);
		var n = i(2)(i(464), i(1005), "data-v-043ef64b", null);
		e.exports = n.exports
	}
});
