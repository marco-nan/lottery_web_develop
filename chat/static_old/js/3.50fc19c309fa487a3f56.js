webpackJsonp([3], {
	"/xZh": function (a, t, s) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var e = s("MFjx"),
		n = s("EJrz"),
		c = s("puzX"),
		i = s.n(c),
		r = (e.a, {
			components: {
				ZImg: e.a
			},
			data: function () {
				return {
					redpackMessage: null,
					AppStatus: n.a,
					defaultAvatar: i.a,
					myPackInfo: null,
					packList: null,
					packInfo: null
				}
			},
			created: function () {
				if ("string" != typeof this.$route.query.info) {
					this.redpackMessage = this.$route.query.info.message,
					this.packInfo = this.$route.query.info.activityChatRedpacket,
					this.packList = this.$route.query.info.details;
					var a = n.a.userInfo.userId + "",
					t = this.packList.findIndex(function (t) {
							return t.userId === a
						});
					this.myPackInfo = this.packList[t]
				} else
					this.$router.replace({
						path: "/"
					})
			}
		}),
		o = {
			render: function () {
				var a = this,
				t = a.$createElement,
				s = a._self._c || t;
				return s("div", {
					staticClass: "redpack-box"
				}, [s("div", {
							staticClass: "redpack-info-wrapper"
						}, [s("span", [s("z-img", {
											staticClass: "redpack-avatar",
											attrs: {
												src: a.AppStatus.userInfo.avatar,
												defaultSrc: a.defaultAvatar
											}
										})], 1), a._v(" "), s("span", {
									staticClass: "nickName"
								}, [a._v(a._s(a.redpackMessage.nickName) + "的红包")]), a._v(" "), s("span", {
									staticClass: "redpack-name"
								}, [a._v(a._s(a.redpackMessage.content.name))]), a._v(" "), s("span", {
									staticClass: "money"
								}, [a.myPackInfo ? [a._v("\n        " + a._s(a.myPackInfo.money)), s("b", [a._v("元")])] : a._e()], 2), a._v(" "), s("span", {
									staticClass: "tip"
								}, [a._v(a._s(a.myPackInfo ? "已存入余额，可直接使用" : " "))])]), a._v(" "), s("div", {
							staticClass: "redpack-list"
						}, [s("div", {
									staticClass: "info"
								}, [a._v("已领取" + a._s(a.packInfo.consumeCount) + "/" + a._s(a.packInfo.count) + "个，共" + a._s(a._f("moneyFormat")(a.packInfo.consumeMoney)) + "/" + a._s(a._f("moneyFormat")(a.packInfo.totalMoney)) + "元")]), a._v(" "), a._l(a.packList, function (t) {
									return s("div", {
										key: t.userId,
										staticClass: "cell"
									}, [s("z-img", {
												staticClass: "avatar",
												attrs: {
													src: t.avatar,
													defaultSrc: a.defaultAvatar
												}
											}), a._v(" "), s("span", {
												staticClass: "money"
											}, [a._v(a._s(a._f("moneyFormat")(t.money)) + "元")]), a._v(" "), s("div", {
												staticClass: "content"
											}, [s("span", {
														staticClass: "nickName"
													}, [a._v(a._s(t.nickName))]), a._v(" "), s("span", {
														staticClass: "time"
													}, [a._v(a._s(t.createDatetime))])])], 1)
								})], 2)])
			},
			staticRenderFns: []
		};
		var u = s("VU/8")(r, o, !1, function (a) {
				s("JcYY")
			}, "data-v-1e4f2de2", null);
		t.default = u.exports
	},
	JcYY: function (a, t) {}
});
