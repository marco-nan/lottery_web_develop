webpackJsonp([19, 55], {
	8: function (e, t) {
		"use strict";
		function i(e) {
			if ("string" != typeof e)
				throw new TypeError("This library (validator.js) validates strings only")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.default = i,
		e.exports = t.default
	},
	14: function (e, t, i) {
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
		var r = i(19),
		o = n(r);
		t.default = {
			mixins: [o.default],
			props: {
				required: {
					type: Boolean,
				default:
					!1
				}
			},
			created: function () {
				this.handleChangeEvent = !1
			},
			computed: {
				dirty: function () {
					return !this.prisine
				},
				invalid: function () {
					return !this.valid
				}
			},
			methods: {
				setTouched: function () {
					this.touched = !0
				}
			},
			watch: {
				value: function (e) {
					this.prisine === !0 && (this.prisine = !1),
					this.handleChangeEvent || (this.$emit("on-change", e), this.$emit("input", e))
				}
			},
			data: function () {
				return {
					errors: {},
					prisine: !0,
					touched: !1
				}
			}
		}
	},
	15: function (e, t, i) {
		i(37);
		var n = i(2)(i(34), i(38), null, null);
		e.exports = n.exports
	},
	17: function (e, t) {
		"use strict";
		function i() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			t = arguments[1];
			for (var i in t)
				"undefined" == typeof e[i] && (e[i] = t[i]);
			return e
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.default = i,
		e.exports = t.default
	},
	19: function (e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.default = {
			created: function () {
				this.uuid = Math.random().toString(36).substring(3, 8)
			}
		}
	},
	34: function (e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.default = {
			props: {
				type: String
			},
			computed: {
				className: function () {
					return "weui_icon weui_icon_" + this.type
				}
			}
		}
	},
	36: function (e, t, i) {
		t = e.exports = i(3)(),
		t.push([e.id, '@font-face{font-weight:400;font-style:normal;font-family:weui;src:url("data:application/octet-stream;base64,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") format("truetype")}[class*=" weui_icon_"]:before,[class^=weui_icon_]:before{font-family:weui;font-style:normal;font-weight:400;speak:none;display:inline-block;vertical-align:middle;text-decoration:inherit;width:1em;margin-right:.2em;text-align:center;font-variant:normal;text-transform:none;line-height:1em;margin-left:.2em}.weui_icon_circle:before{content:"\\EA01"}.weui_icon_download:before{content:"\\EA02"}.weui_icon_info:before{content:"\\EA03"}.weui_icon_safe_success:before{content:"\\EA04"}.weui_icon_safe_warn:before{content:"\\EA05"}.weui_icon_success:before{content:"\\EA06"}.weui_icon_success_circle:before{content:"\\EA07"}.weui_icon_success_no_circle:before{content:"\\EA08"}.weui_icon_waiting:before{content:"\\EA09"}.weui_icon_waiting_circle:before{content:"\\EA0A"}.weui_icon_warn:before{content:"\\EA0B"}.weui_icon_info_circle:before{content:"\\EA0C"}.weui_icon_cancel:before{content:"\\EA0D"}.weui_icon_search:before{content:"\\EA0E"}.weui_icon_clear:before{content:"\\EA0F"}[class*=" weui_icon_"]:before,[class^=weui_icon_]:before{margin:0}.weui_icon_success:before{font-size:23px;color:#09bb07}.weui_icon_waiting:before{font-size:23px;color:#10aeff}.weui_icon_warn:before{font-size:23px;color:#f43530}.weui_icon_info:before{font-size:23px;color:#10aeff}.weui_icon_success_circle:before,.weui_icon_success_no_circle:before{font-size:23px;color:#09bb07}.weui_icon_waiting_circle:before{font-size:23px;color:#10aeff}.weui_icon_circle:before{font-size:23px;color:#c9c9c9}.weui_icon_download:before,.weui_icon_info_circle:before{font-size:23px;color:#09bb07}.weui_icon_safe_success:before{color:#09bb07}.weui_icon_safe_warn:before{color:#ffbe00}.weui_icon_cancel:before{color:#f43530;font-size:22px}.weui_icon_clear:before,.weui_icon_search:before{color:#b2b2b2;font-size:14px}.weui_icon_msg:before{font-size:104px}.weui_icon_warn.weui_icon_msg:before{color:#f76260}.icon_big:before,.weui_icon_safe:before{font-size:104px}.icon_small:before{font-size:12px}', ""])
	},
	37: function (e, t, i) {
		var n = i(36);
		"string" == typeof n && (n = [[e.id, n, ""]]);
		i(4)(n, {});
		n.locals && (e.exports = n.locals)
	},
	38: function (e, t) {
		e.exports = {
			render: function () {
				var e = this,
				t = e.$createElement,
				i = e._self._c || t;
				return i("i", {
					class: e.className
				})
			},
			staticRenderFns: []
		}
	},
	55: function (e, t, i) {
		i(69);
		var n = i(2)(i(67), i(74), null, null);
		e.exports = n.exports
	},
	67: function (e, t, i) {
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
		var r = i(76),
		o = n(r),
		a = i(14),
		l = n(a),
		s = i(15),
		c = n(s),
		u = i(32),
		A = n(u),
		d = i(71),
		f = n(d),
		p = i(73),
		h = n(p),
		_ = i(77),
		g = n(_),
		m = {
			email: {
				fn: f.default,
				msg: "邮箱格式"
			},
			"china-mobile": {
				fn: function (e) {
					return (0, h.default)(e, "zh-CN")
				},
				msg: "手机号码"
			},
			"china-name": {
				fn: function (e) {
					return e.length >= 2 && e.length <= 6
				},
				msg: "中文姓名"
			}
		};
		t.default = {
			created: function () {
				var e = this;
				this.currentValue = this.value || "",
				!this.title && !this.placeholder && !this.currentValue,
				this.required && !this.currentValue && (this.valid = !1),
				this.handleChangeEvent = !0,
				this.debounce && (this._debounce = (0, g.default)(function () {
						e.$emit("on-change", e.currentValue)
					}, this.debounce))
			},
			mounted: function () {
				this.$slots && this.$slots["restricted-label"] && (this.hasRestrictedLabel = !0)
			},
			beforeDestroy: function () {
				this._debounce && this._debounce.cancel()
			},
			mixins: [l.default],
			components: {
				Icon: c.default,
				InlineDesc: A.default
			},
			props: {
				required: {
					type: Boolean,
				default:
					!1
				},
				title: {
					type: String,
				default:
					""
				},
				type: {
					type: String,
				default:
					"text"
				},
				placeholder: String,
				value: [String, Number],
				name: String,
				readonly: Boolean,
				disabled: Boolean,
				keyboard: String,
				inlineDesc: String,
				isType: [String, Function],
				min: Number,
				max: Number,
				showClear: {
					type: Boolean,
				default:
					!0
				},
				equalWith: String,
				textAlign: String,
				autocomplete: {
					type: String,
				default:
					"off"
				},
				autocapitalize: {
					type: String,
				default:
					"off"
				},
				autocorrect: {
					type: String,
				default:
					"off"
				},
				spellcheck: {
					type: String,
				default:
					"false"
				},
				novalidate: {
					type: Boolean,
				default:
					!1
				},
				iconType: String,
				debounce: Number
			},
			computed: {
				labelStyles: function () {
					return {
						width: this.$parent.labelWidth || this.labelWidth + "em",
						textAlign: this.$parent.labelAlign,
						marginRight: this.$parent.labelMarginRight
					}
				},
				pattern: function () {
					if ("number" === this.keyboard || "china-mobile" === this.isType)
						return "[0-9]*"
				},
				labelWidth: function () {
					return this.title.replace(/[^x00-xff]/g, "00").length / 2 + 1
				},
				hasErrors: function () {
					return (0, o.default)(this.errors).length > 0
				},
				inputStyle: function () {
					if (this.textAlign)
						return {
							textAlign: this.textAlign
						}
				}
			},
			methods: {
				clear: function () {
					this.currentValue = "",
					this.$refs.input.focus()
				},
				focus: function () {
					this.$refs.input.focus()
				},
				focusHandler: function () {
					this.$emit("on-focus", this.currentValue)
				},
				blur: function () {
					this.setTouched(),
					this.validate(),
					this.$emit("on-blur", this.currentValue)
				},
				getError: function () {
					var e = (0, o.default)(this.errors)[0];
					this.firstError = this.errors[e]
				},
				validate: function () {
					if ("undefined" != typeof this.equalWith)
						return void this.validateEqual();
					if (this.errors = {}, !this.currentValue && !this.required)
						return void(this.valid = !0);
					if (!this.currentValue && this.required)
						return this.valid = !1, this.errors.required = "必填哦", void this.getError();
					if ("string" == typeof this.isType) {
						var e = m[this.isType];
						if (e) {
							if (this.valid = e.fn(this.currentValue), !this.valid)
								return void(this.errors.format = e.msg + "格式不对哦~");
							delete this.errors.format
						}
					}
					if ("function" == typeof this.isType) {
						var t = this.isType(this.currentValue);
						if (this.valid = t.valid, !this.valid)
							return this.errors.format = t.msg, this.forceShowError = !0, void(this.firstError || this.getError());
						delete this.errors.format
					}
					if (this.min) {
						if (this.currentValue.length < this.min)
							return this.errors.min = "最少应该输入" + this.min + "个字符哦", this.valid = !1, void(this.firstError || this.getError());
						delete this.errors.min
					}
					if (this.max) {
						if (this.currentValue.length > this.max)
							return this.errors.max = "最多可以输入" + this.max + "个字符哦", this.valid = !1, void(this.forceShowError = !0);
						this.forceShowError = !1,
						delete this.errors.max
					}
					this.valid = !0
				},
				validateEqual: function () {
					if (!this.equalWith && this.currentValue)
						return this.valid = !1, void(this.errors.equal = "输入不一致");
					var e = this.dirty || this.currentValue.length >= this.equalWith.length;
					return e && this.currentValue !== this.equalWith ? (this.valid = !1, void(this.errors.equal = "输入不一致")) : void(!this.currentValue && this.required ? this.valid = !1 : (this.valid = !0, delete this.errors.equal))
				}
			},
			data: function e() {
				var e = {
					hasRestrictedLabel: !1,
					firstError: "",
					forceShowError: !1,
					hasLengthEqual: !1,
					valid: !0,
					currentValue: ""
				};
				return e
			},
			watch: {
				valid: function () {
					this.getError()
				},
				value: function (e) {
					this.currentValue = e
				},
				equalWith: function (e) {
					e && this.equalWith ? (e.length === this.equalWith.length && (this.hasLengthEqual = !0), this.validateEqual()) : this.validate()
				},
				currentValue: function (e) {
					!this.equalWith && e && this.validateEqual(),
					e && this.equalWith ? (e.length === this.equalWith.length && (this.hasLengthEqual = !0), this.validateEqual()) : this.validate(),
					this.$emit("input", e),
					this._debounce ? this._debounce() : this.$emit("on-change", e)
				}
			}
		}
	},
	68: function (e, t, i) {
		t = e.exports = i(3)(),
		t.push([e.id, '.weui_cells_access .weui_cell:not(.no_access){-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui_cells_access .weui_cell:not(.no_access):active{background-color:#ececec}.weui_cells_access a.weui_cell{color:inherit}.weui_cells_access .weui_cell_ft:after{content:" ";display:inline-block;transform:rotate(45deg);height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;position:relative;top:-2px;top:-1px;margin-left:.3em}.weui_cell:before{content:" ";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #d9d9d9;color:#d9d9d9;transform-origin:0 0;transform:scaleY(.5);left:15px}.weui_cell:first-child:before{display:none}.weui_cells{margin-top:1.17647059em;background-color:#fff;line-height:1.41176471;font-size:17px;overflow:hidden;position:relative}.weui_cells:before{top:0;border-top:1px solid #d9d9d9;transform-origin:0 0;transform:scaleY(.5)}.weui_cells:after,.weui_cells:before{content:" ";position:absolute;left:0;width:100%;height:1px;color:#d9d9d9}.weui_cells:after{bottom:0;border-bottom:1px solid #d9d9d9;transform-origin:0 100%;transform:scaleY(.5)}.weui_cells_title{margin-top:.77em;margin-bottom:.3em;padding-left:15px;padding-right:15px;color:#888;font-size:14px}.weui_cells_title+.weui_cells{margin-top:0}.weui_cells_tips{margin-top:.3em;color:#888;padding-left:15px;padding-right:15px;font-size:14px}.weui_cell{padding:10px 15px;position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.weui_cell_ft{text-align:right;color:#888}.weui_cell_primary{-ms-flex:1;flex:1}.weui_label{color:#000;display:block;width:105px;word-wrap:break-word;word-break:break-all}.weui_input{width:100%;border:0;outline:0;-webkit-appearance:none;background-color:transparent;font-size:inherit;color:inherit;height:1.41176471em;line-height:1.41176471}.weui_input::-webkit-inner-spin-button,.weui_input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.weui_textarea{display:block;border:0;resize:none;width:100%;color:inherit;font-size:1em;line-height:inherit;outline:0}.weui_textarea_counter{color:#b2b2b2;text-align:right}.weui_cell_warn .weui_textarea_counter{color:#e64340}.weui_toptips{display:none;position:fixed;-webkit-transform:translateZ(0);width:100%;top:0;line-height:2.3;font-size:14px;text-align:center;color:#fff;z-index:50000}.weui_toptips.weui_warn{background-color:#e64340}.weui_cells_form .weui_cell_warn{color:#e64340}.weui_cells_form .weui_cell_warn .weui_icon_warn{display:inline-block}.weui_cells_form .weui_cell_ft{font-size:0}.weui_cells_form .weui_icon_warn{display:none}.weui_cells_form input,.weui_cells_form label[for],.weui_cells_form textarea{-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui_vcode{padding-top:0!important;padding-right:0!important;padding-bottom:0!important}.weui_vcode .weui_cell_ft img{margin-left:5px;height:44px;vertical-align:middle}.weui_vcode .weui_btn{margin-left:5px;width:auto;display:inline-block;height:44px}.vux-input-icon.weui_icon_success:before,.vux-input-icon.weui_icon_warn:before{font-size:21px}.vux-x-input .weui_icon{padding-left:5px}', ""])
	},
	69: function (e, t, i) {
		var n = i(68);
		"string" == typeof n && (n = [[e.id, n, ""]]);
		i(4)(n, {});
		n.locals && (e.exports = n.locals)
	},
	70: function (e, t, i) {
		"use strict";
		function n(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		function r(e, t) {
			(0, l.default)(e);
			var i = void 0,
			n = void 0;
			"object" === ("undefined" == typeof t ? "undefined" : o(t)) ? (i = t.min || 0, n = t.max) : (i = arguments[1], n = arguments[2]);
			var r = encodeURI(e).split(/%..|./).length - 1;
			return r >= i && ("undefined" == typeof n || r <= n)
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
			return typeof e
		}
		 : function (e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
		};
		t.default = r;
		var a = i(8),
		l = n(a);
		e.exports = t.default
	},
	71: function (e, t, i) {
		"use strict";
		function n(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		function r(e, t) {
			if ((0, a.default)(e), t = (0, s.default)(t, f), t.require_display_name || t.allow_display_name) {
				var i = e.match(p);
				if (i)
					e = i[1];
				else if (t.require_display_name)
					return !1
			}
			var n = e.split("@"),
			r = n.pop(),
			o = n.join("@"),
			l = r.toLowerCase();
			if ("gmail.com" !== l && "googlemail.com" !== l || (o = o.replace(/\./g, "").toLowerCase()), !(0, u.default)(o, {
					max: 64
				}) || !(0, u.default)(r, {
					max: 256
				}))
				return !1;
			if (!(0, d.default)(r, {
					require_tld: t.require_tld
				}))
				return !1;
			if ('"' === o[0])
				return o = o.slice(1, o.length - 1), t.allow_utf8_local_part ? m.test(o) : _.test(o);
			for (var c = t.allow_utf8_local_part ? g : h, A = o.split("."), v = 0; v < A.length; v++)
				if (!c.test(A[v]))
					return !1;
			return !0
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.default = r;
		var o = i(8),
		a = n(o),
		l = i(17),
		s = n(l),
		c = i(70),
		u = n(c),
		A = i(72),
		d = n(A),
		f = {
			allow_display_name: !1,
			require_display_name: !1,
			allow_utf8_local_part: !0,
			require_tld: !0
		},
		p = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i,
		h = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i,
		_ = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i,
		g = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i,
		m = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
		e.exports = t.default
	},
	72: function (e, t, i) {
		"use strict";
		function n(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		function r(e, t) {
			(0, a.default)(e),
			t = (0, s.default)(t, c),
			t.allow_trailing_dot && "." === e[e.length - 1] && (e = e.substring(0, e.length - 1));
			var i = e.split(".");
			if (t.require_tld) {
				var n = i.pop();
				if (!i.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(n))
					return !1
			}
			for (var r, o = 0; o < i.length; o++) {
				if (r = i[o], t.allow_underscores && (r = r.replace(/_/g, "")), !/^[a-z\u00a1-\uffff0-9-]+$/i.test(r))
					return !1;
				if (/[\uff01-\uff5e]/.test(r))
					return !1;
				if ("-" === r[0] || "-" === r[r.length - 1])
					return !1
			}
			return !0
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.default = r;
		var o = i(8),
		a = n(o),
		l = i(17),
		s = n(l),
		c = {
			require_tld: !0,
			allow_underscores: !1,
			allow_trailing_dot: !1
		};
		e.exports = t.default
	},
	73: function (e, t, i) {
		"use strict";
		function n(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		function r(e, t) {
			return (0, a.default)(e),
			t in l && l[t].test(e)
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.default = r;
		var o = i(8),
		a = n(o),
		l = {
			"ar-DZ": /^(\+?213|0)(5|6|7)\d{8}$/,
			"ar-SY": /^(!?(\+?963)|0)?9\d{8}$/,
			"ar-SA": /^(!?(\+?966)|0)?5\d{8}$/,
			"en-US": /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
			"cs-CZ": /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
			"de-DE": /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
			"da-DK": /^(\+?45)?(\d{8})$/,
			"el-GR": /^(\+?30)?(69\d{8})$/,
			"en-AU": /^(\+?61|0)4\d{8}$/,
			"en-GB": /^(\+?44|0)7\d{9}$/,
			"en-HK": /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
			"en-IN": /^(\+?91|0)?[789]\d{9}$/,
			"en-NG": /^(\+?234|0)?[789]\d{9}$/,
			"en-NZ": /^(\+?64|0)2\d{7,9}$/,
			"en-ZA": /^(\+?27|0)\d{9}$/,
			"en-ZM": /^(\+?26)?09[567]\d{7}$/,
			"es-ES": /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
			"fi-FI": /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
			"fr-FR": /^(\+?33|0)[67]\d{8}$/,
			"he-IL": /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
			"hu-HU": /^(\+?36)(20|30|70)\d{7}$/,
			"it-IT": /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
			"ja-JP": /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
			"ms-MY": /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
			"nb-NO": /^(\+?47)?[49]\d{7}$/,
			"nl-BE": /^(\+?32|0)4?\d{8}$/,
			"nn-NO": /^(\+?47)?[49]\d{7}$/,
			"pl-PL": /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
			"pt-BR": /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
			"pt-PT": /^(\+?351)?9[1236]\d{7}$/,
			"ro-RO": /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
			"en-PK": /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
			"ru-RU": /^(\+?7|8)?9\d{9}$/,
			"sr-RS": /^(\+3816|06)[- \d]{5,9}$/,
			"tr-TR": /^(\+?90|0)?5\d{9}$/,
			"vi-VN": /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
			"zh-CN": /^(\+?0?86\-?)?1[345789]\d{9}$/,
			"zh-TW": /^(\+?886\-?|0)?9\d{8}$/
		};
		l["en-CA"] = l["en-US"],
		l["fr-BE"] = l["nl-BE"],
		l["zh-HK"] = l["en-HK"],
		e.exports = t.default
	},
	74: function (e, t) {
		e.exports = {
			render: function () {
				var e = this,
				t = e.$createElement,
				i = e._self._c || t;
				return i("div", {
					staticClass: "vux-x-input weui_cell",
					class: {
						weui_cell_warn: !e.valid
					}
				}, [i("div", {
							staticClass: "weui_cell_hd"
						}, [e.hasRestrictedLabel ? i("div", {
									style: e.labelStyles
								}, [e._t("restricted-label")], 2) : e._e(), e._v(" "), e.hasRestrictedLabel ? e._e() : e._t("label", [e.title ? i("label", {
											staticClass: "weui_label",
											style: e.labelStyles,
											domProps: {
												innerHTML: e._s(e.title)
											}
										}) : e._e(), e._v(" "), e.inlineDesc ? i("inline-desc", [e._v(e._s(e.inlineDesc))]) : e._e()])], 2), e._v(" "), i("div", {
							staticClass: "weui_cell_bd weui_cell_primary"
						}, [e.type && "text" !== e.type ? e._e() : i("input", {
									directives: [{
											name: "model",
											rawName: "v-model",
											value: e.currentValue,
											expression: "currentValue"
										}
									],
									ref: "input",
									staticClass: "weui_input",
									style: e.inputStyle,
									attrs: {
										maxlength: e.max,
										autocomplete: e.autocomplete,
										autocapitalize: e.autocapitalize,
										autocorrect: e.autocorrect,
										spellcheck: e.spellcheck,
										type: "text",
										name: e.name,
										pattern: e.pattern,
										placeholder: e.placeholder,
										readonly: e.readonly,
										disabled: e.disabled
									},
									domProps: {
										value: e.currentValue
									},
									on: {
										focus: e.focusHandler,
										blur: e.blur,
										input: function (t) {
											t.target.composing || (e.currentValue = t.target.value)
										}
									}
								}), e._v(" "), "number" === e.type ? i("input", {
									directives: [{
											name: "model",
											rawName: "v-model",
											value: e.currentValue,
											expression: "currentValue"
										}
									],
									ref: "input",
									staticClass: "weui_input",
									style: e.inputStyle,
									attrs: {
										maxlength: e.max,
										autocomplete: e.autocomplete,
										autocapitalize: e.autocapitalize,
										autocorrect: e.autocorrect,
										spellcheck: e.spellcheck,
										type: "number",
										name: e.name,
										pattern: e.pattern,
										placeholder: e.placeholder,
										readonly: e.readonly,
										disabled: e.disabled
									},
									domProps: {
										value: e.currentValue
									},
									on: {
										focus: e.focusHandler,
										blur: e.blur,
										input: function (t) {
											t.target.composing || (e.currentValue = t.target.value)
										}
									}
								}) : e._e(), e._v(" "), "email" === e.type ? i("input", {
									directives: [{
											name: "model",
											rawName: "v-model",
											value: e.currentValue,
											expression: "currentValue"
										}
									],
									ref: "input",
									staticClass: "weui_input",
									style: e.inputStyle,
									attrs: {
										maxlength: e.max,
										autocomplete: e.autocomplete,
										autocapitalize: e.autocapitalize,
										autocorrect: e.autocorrect,
										spellcheck: e.spellcheck,
										type: "email",
										name: e.name,
										pattern: e.pattern,
										placeholder: e.placeholder,
										readonly: e.readonly,
										disabled: e.disabled
									},
									domProps: {
										value: e.currentValue
									},
									on: {
										focus: e.focusHandler,
										blur: e.blur,
										input: function (t) {
											t.target.composing || (e.currentValue = t.target.value)
										}
									}
								}) : e._e(), e._v(" "), "password" === e.type ? i("input", {
									directives: [{
											name: "model",
											rawName: "v-model",
											value: e.currentValue,
											expression: "currentValue"
										}
									],
									ref: "input",
									staticClass: "weui_input",
									style: e.inputStyle,
									attrs: {
										maxlength: e.max,
										autocomplete: e.autocomplete,
										autocapitalize: e.autocapitalize,
										autocorrect: e.autocorrect,
										spellcheck: e.spellcheck,
										type: "password",
										name: e.name,
										pattern: e.pattern,
										placeholder: e.placeholder,
										readonly: e.readonly,
										disabled: e.disabled
									},
									domProps: {
										value: e.currentValue
									},
									on: {
										focus: e.focusHandler,
										blur: e.blur,
										input: function (t) {
											t.target.composing || (e.currentValue = t.target.value)
										}
									}
								}) : e._e(), e._v(" "), "tel" === e.type ? i("input", {
									directives: [{
											name: "model",
											rawName: "v-model",
											value: e.currentValue,
											expression: "currentValue"
										}
									],
									ref: "input",
									staticClass: "weui-input",
									style: e.inputStyle,
									attrs: {
										maxlength: e.max,
										autocomplete: e.autocomplete,
										autocapitalize: e.autocapitalize,
										autocorrect: e.autocorrect,
										spellcheck: e.spellcheck,
										type: "tel",
										name: e.name,
										pattern: e.pattern,
										placeholder: e.placeholder,
										readonly: e.readonly,
										disabled: e.disabled
									},
									domProps: {
										value: e.currentValue
									},
									on: {
										focus: e.focusHandler,
										blur: e.blur,
										input: function (t) {
											t.target.composing || (e.currentValue = t.target.value)
										}
									}
								}) : e._e()]), e._v(" "), i("div", {
							staticClass: "weui_cell_ft"
						}, [i("icon", {
									directives: [{
											name: "show",
											rawName: "v-show",
											value: !e.equalWith && e.showClear && e.currentValue && !e.readonly && !e.disabled,
											expression: "!equalWith && showClear && currentValue && !readonly && !disabled"
										}
									],
									attrs: {
										type: "clear"
									},
									nativeOn: {
										click: function (t) {
											return e.clear(t)
										}
									}
								}), e._v(" "), i("icon", {
									directives: [{
											name: "show",
											rawName: "v-show",
											value: !e.novalidate && !e.equalWith && (e.touched && !e.valid && e.firstError || e.forceShowError && !e.valid && e.firstError),
											expression: "!novalidate && !equalWith && ((touched && !valid && firstError) || (forceShowError && !valid && firstError))"
										}
									],
									staticClass: "vux-input-icon",
									attrs: {
										type: "warn",
										title: e.valid ? "" : e.firstError
									}
								}), e._v(" "), !e.novalidate && e.hasLengthEqual && e.dirty && e.equalWith && !e.valid ? i("icon", {
									staticClass: "vux-input-icon",
									attrs: {
										type: "warn"
									}
								}) : e._e(), e._v(" "), i("icon", {
									directives: [{
											name: "show",
											rawName: "v-show",
											value: !e.novalidate && e.equalWith && e.equalWith === e.currentValue && e.valid,
											expression: "!novalidate && equalWith && equalWith === currentValue && valid"
										}
									],
									attrs: {
										type: "success"
									}
								}), e._v(" "), i("icon", {
									directives: [{
											name: "show",
											rawName: "v-show",
											value: e.novalidate && "success" === e.iconType,
											expression: "novalidate && iconType === 'success'"
										}
									],
									staticClass: "vux-input-icon",
									attrs: {
										type: "success"
									}
								}), e._v(" "), i("icon", {
									directives: [{
											name: "show",
											rawName: "v-show",
											value: e.novalidate && "error" === e.iconType,
											expression: "novalidate && iconType === 'error'"
										}
									],
									staticClass: "vux-input-icon",
									attrs: {
										type: "warn"
									}
								}), e._v(" "), e._t("right")], 2)])
			},
			staticRenderFns: []
		}
	},
	80: function (e, t, i) {
		"use strict";
		var n = '\n<div class="scroller-component" data-role="component">\n  <div class="scroller-mask" data-role="mask"></div>\n  <div class="scroller-indicator" data-role="indicator"></div>\n  <div class="scroller-content" data-role="content"></div>\n</div>\n',
		r = i(81),
		o = i(82),
		a = o.getElement,
		l = o.getComputedStyle,
		s = o.easeOutCubic,
		c = o.easeInOutCubic,
		u = function (e, t) {
			var i = this;
			t = t || {},
			i.options = {
				itemClass: "scroller-item",
				onSelect: function () {},
				defaultValue: 0,
				data: []
			};
			for (var r in t)
				void 0 !== t[r] && (i.options[r] = t[r]);
			i.__container = a(e);
			var o = document.createElement("div");
			o.innerHTML = t.template || n;
			var s = i.__component = o.querySelector("[data-role=component]"),
			c = i.__content = s.querySelector("[data-role=content]"),
			u = s.querySelector("[data-role=indicator]"),
			A = i.options.data,
			d = "";
			A.length && A[0].constructor === Object ? A.forEach(function (e) {
				d += '<div class="' + i.options.itemClass + '" data-value="' + e.value + '">' + e.name + "</div>"
			}) : A.forEach(function (e) {
				d += '<div class="' + i.options.itemClass + '" data-value="' + e + '">' + e + "</div>"
			}),
			c.innerHTML = d,
			i.__container.appendChild(s),
			i.__itemHeight = parseInt(l(u, "height"), 10),
			i.__callback = t.callback || function (e) {
				c.style.webkitTransform = "translate3d(0, " + -e + "px, 0)"
			};
			var f = s.getBoundingClientRect();
			i.__clientTop = f.top + s.clientTop || 0,
			i.__setDimensions(s.clientHeight, c.offsetHeight),
			0 === s.clientHeight && i.__setDimensions(parseInt(l(s, "height"), 10), 204),
			i.select(i.options.defaultValue, !1),
			s.addEventListener("touchstart", function (e) {
				e.target.tagName.match(/input|textarea|select/i) || (e.preventDefault(), i.__doTouchStart(e.touches, e.timeStamp))
			}, !1),
			s.addEventListener("touchmove", function (e) {
				i.__doTouchMove(e.touches, e.timeStamp)
			}, !1),
			s.addEventListener("touchend", function (e) {
				i.__doTouchEnd(e.timeStamp)
			}, !1)
		},
		A = {
			value: null,
			__prevValue: null,
			__isSingleTouch: !1,
			__isTracking: !1,
			__didDecelerationComplete: !1,
			__isGesturing: !1,
			__isDragging: !1,
			__isDecelerating: !1,
			__isAnimating: !1,
			__clientTop: 0,
			__clientHeight: 0,
			__contentHeight: 0,
			__itemHeight: 0,
			__scrollTop: 0,
			__minScrollTop: 0,
			__maxScrollTop: 0,
			__scheduledTop: 0,
			__lastTouchTop: null,
			__lastTouchMove: null,
			__positions: null,
			__minDecelerationScrollTop: null,
			__maxDecelerationScrollTop: null,
			__decelerationVelocityY: null,
			__setDimensions: function (e, t) {
				var i = this;
				i.__clientHeight = e,
				i.__contentHeight = t;
				var n = i.options.data.length,
				r = Math.round(i.__clientHeight / i.__itemHeight);
				i.__minScrollTop = -i.__itemHeight * (r / 2),
				i.__maxScrollTop = i.__minScrollTop + n * i.__itemHeight - .1
			},
			selectByIndex: function (e, t) {
				var i = this;
				e < 0 || e > i.__content.childElementCount - 1 || (i.__scrollTop = i.__minScrollTop + e * i.__itemHeight, i.scrollTo(i.__scrollTop, t), i.__selectItem(i.__content.children[e]))
			},
			select: function (e, t) {
				for (var i = this, n = i.__content.children, r = 0, o = n.length; r < o; r++)
					if (n[r].dataset.value === e)
						return void i.selectByIndex(r, t);
				i.selectByIndex(0, t)
			},
			getValue: function () {
				return this.value
			},
			scrollTo: function (e, t) {
				var i = this;
				return t = void 0 === t || t,
				i.__isDecelerating && (r.stop(i.__isDecelerating), i.__isDecelerating = !1),
				e = Math.round(e / i.__itemHeight) * i.__itemHeight,
				e = Math.max(Math.min(i.__maxScrollTop, e), i.__minScrollTop),
				e !== i.__scrollTop && t ? void i.__publish(e, 250) : (i.__publish(e), void i.__scrollingComplete())
			},
			destroy: function () {
				this.__component.parentNode && this.__component.parentNode.removeChild(this.__component)
			},
			__selectItem: function (e) {
				var t = this,
				i = t.options.itemClass + "-selected",
				n = t.__content.querySelector("." + i);
				n && n.classList.remove(i),
				e.classList.add(i),
				null !== t.value && (t.__prevValue = t.value),
				t.value = e.dataset.value
			},
			__scrollingComplete: function () {
				var e = this,
				t = Math.round((e.__scrollTop - e.__minScrollTop - e.__itemHeight / 2) / e.__itemHeight);
				e.__selectItem(e.__content.children[t]),
				null !== e.__prevValue && e.__prevValue !== e.value && e.options.onSelect(e.value)
			},
			__doTouchStart: function (e, t) {
				var i = this;
				if (null == e.length)
					throw new Error("Invalid touch list: " + e);
				if (t instanceof Date && (t = t.valueOf()), "number" != typeof t)
					throw new Error("Invalid timestamp value: " + t);
				i.__interruptedAnimation = !0,
				i.__isDecelerating && (r.stop(i.__isDecelerating), i.__isDecelerating = !1, i.__interruptedAnimation = !0),
				i.__isAnimating && (r.stop(i.__isAnimating), i.__isAnimating = !1, i.__interruptedAnimation = !0);
				var n,
				o = 1 === e.length;
				n = o ? e[0].pageY : Math.abs(e[0].pageY + e[1].pageY) / 2,
				i.__initialTouchTop = n,
				i.__lastTouchTop = n,
				i.__lastTouchMove = t,
				i.__lastScale = 1,
				i.__enableScrollY = !o,
				i.__isTracking = !0,
				i.__didDecelerationComplete = !1,
				i.__isDragging = !o,
				i.__isSingleTouch = o,
				i.__positions = []
			},
			__doTouchMove: function (e, t, i) {
				var n = this;
				if (null == e.length)
					throw new Error("Invalid touch list: " + e);
				if (t instanceof Date && (t = t.valueOf()), "number" != typeof t)
					throw new Error("Invalid timestamp value: " + t);
				if (n.__isTracking) {
					var r;
					r = 2 === e.length ? Math.abs(e[0].pageY + e[1].pageY) / 2 : e[0].pageY;
					var o = n.__positions;
					if (n.__isDragging) {
						var a = r - n.__lastTouchTop,
						l = n.__scrollTop;
						if (n.__enableScrollY) {
							l -= a;
							var s = n.__minScrollTop,
							c = n.__maxScrollTop;
							(l > c || l < s) && (l = l > c ? c : s)
						}
						o.length > 40 && o.splice(0, 20),
						o.push(l, t),
						n.__publish(l)
					} else {
						var u = 0,
						A = 5,
						d = Math.abs(r - n.__initialTouchTop);
						n.__enableScrollY = d >= u,
						o.push(n.__scrollTop, t),
						n.__isDragging = n.__enableScrollY && d >= A,
						n.__isDragging && (n.__interruptedAnimation = !1)
					}
					n.__lastTouchTop = r,
					n.__lastTouchMove = t,
					n.__lastScale = i
				}
			},
			__doTouchEnd: function (e) {
				var t = this;
				if (e instanceof Date && (e = e.valueOf()), "number" != typeof e)
					throw new Error("Invalid timestamp value: " + e);
				if (t.__isTracking) {
					if (t.__isTracking = !1, t.__isDragging && (t.__isDragging = !1, t.__isSingleTouch && e - t.__lastTouchMove <= 100)) {
						for (var i = t.__positions, n = i.length - 1, r = n, o = n; o > 0 && i[o] > t.__lastTouchMove - 100; o -= 2)
							r = o;
						if (r !== n) {
							var a = i[n] - i[r],
							l = t.__scrollTop - i[r - 1];
							t.__decelerationVelocityY = l / a * (1e3 / 60);
							var s = 4;
							Math.abs(t.__decelerationVelocityY) > s && t.__startDeceleration(e)
						}
					}
					t.__isDecelerating || t.scrollTo(t.__scrollTop),
					t.__positions.length = 0
				}
			},
			__publish: function (e, t) {
				var i = this,
				n = i.__isAnimating;
				if (n && (r.stop(n), i.__isAnimating = !1), t) {
					i.__scheduledTop = e;
					var o = i.__scrollTop,
					a = e - o,
					l = function (e, t, n) {
						i.__scrollTop = o + a * e,
						i.__callback && i.__callback(i.__scrollTop)
					},
					u = function (e) {
						return i.__isAnimating === e
					},
					A = function (e, t, n) {
						t === i.__isAnimating && (i.__isAnimating = !1),
						(i.__didDecelerationComplete || n) && i.__scrollingComplete()
					};
					i.__isAnimating = r.start(l, u, A, t, n ? s : c)
				} else
					i.__scheduledTop = i.__scrollTop = e, i.__callback && i.__callback(e)
			},
			__startDeceleration: function (e) {
				var t = this;
				t.__minDecelerationScrollTop = t.__minScrollTop,
				t.__maxDecelerationScrollTop = t.__maxScrollTop;
				var i = function (e, i, n) {
					t.__stepThroughDeceleration(n)
				},
				n = .5,
				o = function () {
					var e = Math.abs(t.__decelerationVelocityY) >= n;
					return e || (t.__didDecelerationComplete = !0),
					e
				},
				a = function (e, i, n) {
					return t.__isDecelerating = !1,
					t.__scrollTop <= t.__minScrollTop || t.__scrollTop >= t.__maxScrollTop ? void t.scrollTo(t.__scrollTop) : void(t.__didDecelerationComplete && t.__scrollingComplete())
				};
				t.__isDecelerating = r.start(i, o, a)
			},
			__stepThroughDeceleration: function (e) {
				var t = this,
				i = t.__scrollTop + t.__decelerationVelocityY,
				n = Math.max(Math.min(t.__maxDecelerationScrollTop, i), t.__minDecelerationScrollTop);
				n !== i && (i = n, t.__decelerationVelocityY = 0),
				Math.abs(t.__decelerationVelocityY) <= 1 ? Math.abs(i % t.__itemHeight) < 1 && (t.__decelerationVelocityY = 0) : t.__decelerationVelocityY *= .95,
				t.__publish(i)
			}
		};
		for (var d in A)
			u.prototype[d] = A[d];
		e.exports = u
	},
	81: function (e, t) {
		"use strict";
		var i = Date.now || function () {
			return +new Date
		},
		n = {},
		r = 1,
		o = 60,
		a = 1e3;
		!function () {
			for (var e = 0, t = ["ms", "moz", "webkit", "o"], i = 0; i < t.length && !window.requestAnimationFrame; ++i)
				window.requestAnimationFrame = window[t[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[i] + "CancelAnimationFrame"] || window[t[i] + "CancelRequestAnimationFrame"];
			window.requestAnimationFrame || (window.requestAnimationFrame = function (t, i) {
				var n = (new Date).getTime(),
				r = Math.max(0, 16 - (n - e)),
				o = window.setTimeout(function () {
						t(n + r)
					}, r);
				return e = n + r,
				o
			}),
			window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
				clearTimeout(e)
			})
		}
		(),
		e.exports = {
			requestAnimationFrame: function () {
				var e = window.requestAnimationFrame;
				return function (t, i) {
					e(t, i)
				}
			}
			(),
			stop: function (e) {
				var t = null != n[e];
				return t && (n[e] = null),
				t
			},
			isRunning: function (e) {
				return null != n[e]
			},
			start: function e(t, l, s, c, u, A) {
				var d = this,
				e = i(),
				f = e,
				p = 0,
				h = 0,
				_ = r++;
				if (A || (A = document.body), _ % 20 === 0) {
					var g = {};
					for (var m in n)
						g[m] = !0;
					n = g
				}
				var v = function r(g) {
					var m = g !== !0,
					v = i();
					if (!n[_] || l && !l(_))
						return n[_] = null, void(s && s(o - h / ((v - e) / a), _, !1));
					if (m)
						for (var w = Math.round((v - f) / (a / o)) - 1, b = 0; b < Math.min(w, 4); b++)
							r(!0), h++;
					c && (p = (v - e) / c, p > 1 && (p = 1));
					var x = u ? u(p) : p;
					t(x, v, m) !== !1 && 1 !== p || !m ? m && (f = v, d.requestAnimationFrame(r, A)) : (n[_] = null, s && s(o - h / ((v - e) / a), _, 1 === p || null == c))
				};
				return n[_] = !0,
				d.requestAnimationFrame(v, A),
				_
			}
		}
	},
	82: function (e, t) {
		"use strict";
		function i(e) {
			return "string" == typeof e ? document.querySelector(e) : e
		}
		function n(e, t) {
			var i = window.getComputedStyle(e);
			return i[t] || ""
		}
		function r(e) {
			return Math.pow(e - 1, 3) + 1
		}
		function o(e) {
			return (e /= .5) < 1 ? .5 * Math.pow(e, 3) : .5 * (Math.pow(e - 2, 3) + 2)
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.getElement = i,
		t.getComputedStyle = n,
		t.easeOutCubic = r,
		t.easeInOutCubic = o
	},
	83: function (e, t, i) {
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
		var r = i(76),
		o = n(r),
		a = i(15),
		l = n(a),
		s = i(84),
		c = n(s),
		u = i(41),
		A = n(u),
		d = i(32),
		f = n(d),
		p = i(14),
		h = n(p);
		t.default = {
			mixins: [h.default],
			components: {
				Group: A.default,
				InlineDesc: f.default,
				Icon: l.default
			},
			props: {
				format: {
					type: String,
				default:
					"YYYY-MM-DD"
				},
				title: {
					type: String,
					required: !0
				},
				value: {
					type: String,
				default:
					""
				},
				inlineDesc: String,
				placeholder: String,
				minYear: Number,
				maxYear: Number,
				confirmText: {
					type: String,
				default:
					"ok"
				},
				cancelText: {
					type: String,
				default:
					"cancel"
				},
				clearText: String,
				yearRow: {
					type: String,
				default:
					"{value}"
				},
				monthRow: {
					type: String,
				default:
					"{value}"
				},
				dayRow: {
					type: String,
				default:
					"{value}"
				},
				hourRow: {
					type: String,
				default:
					"{value}"
				},
				minuteRow: {
					type: String,
				default:
					"{value}"
				},
				required: {
					type: Boolean,
				default:
					!1
				},
				minHour: {
					type: Number,
				default:
					0
				},
				maxHour: {
					type: Number,
				default:
					23
				},
				startDate: String,
				endDate: String
			},
			created: function () {
				this.currentValue = this.value,
				this.handleChangeEvent = !0
			},
			data: function () {
				return {
					currentValue: null,
					valid: !0,
					errors: {}
				}
			},
			mounted: function () {
				var e = this,
				t = this.uuid;
				this.$nextTick(function () {
					e.$el.setAttribute("id", "vux-datetime-" + t),
					e.render()
				})
			},
			computed: {
				pickerOptions: function () {
					var e = this,
					t = {
						trigger: "#vux-datetime-" + this.uuid,
						format: this.format,
						value: this.currentValue,
						output: ".vux-datetime-value",
						confirmText: this.confirmText,
						cancelText: e.cancelText,
						clearText: e.clearText,
						yearRow: this.yearRow,
						monthRow: this.monthRow,
						dayRow: this.dayRow,
						hourRow: this.hourRow,
						minuteRow: this.minuteRow,
						minHour: this.minHour,
						maxHour: this.maxHour,
						startDate: this.startDate,
						endDate: this.endDate,
						onConfirm: function (t) {
							e.currentValue = t
						},
						onClear: function (t) {
							e.$emit("on-clear", t)
						},
						onHide: function () {
							e.validate()
						}
					};
					return this.minYear && (t.minYear = this.minYear),
					this.maxYear && (t.maxYear = this.maxYear),
					t
				},
				firstError: function () {
					var e = (0, o.default)(this.errors)[0];
					return this.errors[e]
				}
			},
			methods: {
				render: function () {
					this.picker && this.picker.destroy(),
					this.picker = new c.default(this.pickerOptions)
				},
				validate: function () {
					return !this.currentValue && this.required ? (this.valid = !1, void(this.errors.required = "必填")) : (this.valid = !0, void(this.errors = {}))
				}
			},
			watch: {
				currentValue: function (e) {
					this.$emit("on-change", e),
					this.$emit("input", e),
					this.validate()
				},
				startDate: function () {
					this.render()
				},
				endDate: function () {
					this.render()
				},
				value: function (e) {
					this.currentValue !== e && (this.currentValue = e, this.picker.destroy(), this.render())
				}
			},
			beforeDestroy: function () {
				this.picker.destroy()
			}
		}
	},
	84: function (e, t, i) {
		"use strict";
		function n(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		function r(e, t, i, n) {
			var r = new u.default(e, {
					data: t,
					defaultValue: i,
					onSelect: n
				});
			return r
		}
		function o() {
			m || (m = (0, A.toElement)(f), document.body.appendChild(m), m.addEventListener("click", function () {
					s && s.hide()
				}, !1)),
			m.style.display = "block",
			setTimeout(function () {
				m && (m.style.opacity = .5)
			}, 0)
		}
		function a() {
			m && (m.style.opacity = 0, setTimeout(function () {
					m && (m.style.display = "none")
				}, h))
		}
		function l(e) {
			var t = this;
			t.config = {},
			t.value = e.value || "",
			(0, A.each)(w, function (i, n) {
				t.config[i] = e[i] || n
			}),
			"string" == typeof this.config.startDate && (this.config.startDate = new Date(this.config.startDate.replace(/-/g, "/"))),
			"string" == typeof this.config.endDate && (this.config.endDate = new Date(this.config.endDate.replace(/-/g, "/"))),
			this.config.startDate && !this.config.endDate && (this.config.endDate = new Date("2030-12-31")),
			this.reMakeData = !!this.config.startDate && !!this.config.endDate;
			var i = t.config.trigger;
			this.triggerHandler = function (e) {
				e.preventDefault(),
				t.show(t.value)
			},
			i && (i = t.trigger = (0, A.getElement)(i), this.trigger = i, this.trigger.addEventListener("click", this.triggerHandler, !1))
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var s,
		c = i(80),
		u = n(c),
		A = i(87),
		d = i(86),
		f = '<div class="dp-mask"></div>',
		p = '<div class="dp-container">\n  <div class="dp-header">\n    <div class="dp-item dp-left" data-role="cancel">cancel</div>\n    <div class="dp-item dp-center" data-role="clear"></div>\n    <div class="dp-item dp-right" data-role="confirm">ok</div>\n  </div>\n  <div class="dp-content">\n    <div class="dp-item" data-role="year"></div>\n    <div class="dp-item" data-role="month"></div>\n    <div class="dp-item" data-role="day"></div>\n    <div class="dp-item" data-role="hour"></div>\n    <div class="dp-item" data-role="minute"></div>\n  </div>\n</div>',
		h = 100,
		_ = 300,
		g = {
			year: ["YYYY"],
			month: ["MM", "M"],
			day: ["DD", "D"],
			hour: ["HH", "H"],
			minute: ["mm", "m"]
		},
		m = null,
		v = new Date,
		w = {
			template: p,
			trigger: null,
			output: null,
			currentYear: v.getFullYear(),
			currentMonth: v.getMonth() + 1,
			minYear: 2e3,
			maxYear: 2030,
			minHour: 0,
			maxHour: 23,
			startDate: null,
			endDate: null,
			yearRow: "{value}",
			monthRow: "{value}",
			dayRow: "{value}",
			hourRow: "{value}",
			minuteRow: "{value}",
			format: "YYYY-MM-DD",
			value: v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + v.getDate(),
			onSelect: function () {},
			onConfirm: function () {},
			onClear: function () {},
			onShow: function () {},
			onHide: function () {},
			confirmText: "ok",
			clearText: "",
			cancelText: "cancel"
		};
		l.prototype = {
			_show: function (e) {
				var t = this;
				t.container.style.display = "block",
				(0, A.each)(g, function (i) {
					t[i + "Scroller"] && t[i + "Scroller"].select((0, A.trimZero)(e[i]), !1)
				}),
				setTimeout(function () {
					t.container.style["-webkit-transform"] = "translateY(0)",
					t.container.style.transform = "translateY(0)"
				}, 0)
			},
			show: function (e) {
				var t = this,
				i = t.config;
				s = t;
				var n = t.valueMap = (0, A.parseDate)(i.format, e || i.value),
				a = {};
				if ((0, A.each)(g, function (e, t) {
						a[e] = 1 === t.length ? n[t[0]] : n[t[0]] || n[t[1]]
					}), t.container)
					t._show(a);
				else {
					var l = t.container = (0, A.toElement)(i.template);
					document.body.appendChild(l),
					t.container.style.display = "block",
					l.addEventListener("touchstart", function (e) {}, !1),
					(0, A.each)(g, function (e) {
						var n = t.find("[data-role=" + e + "]");
						if (void 0 === a[e])
							return void(0, A.removeElement)(n);
						var o;
						o = "day" === e ? t._makeData(e, (0, A.trimZero)(a.year), (0, A.trimZero)(a.month)) : t._makeData(e),
						t[e + "Scroller"] = r(n, o, (0, A.trimZero)(a[e]), function (n) {
								i.onSelect.call(t, e, n);
								var r;
								if (t.dayScroller)
									if ("year" === e) {
										var o = t.monthScroller ? t.monthScroller.value : i.currentMonth;
										r = t.dayScroller.value,
										t._setMonthScroller(n, o),
										t._setDayScroller(n, o, r)
									} else if ("month" === e) {
										var a = t.yearScroller ? t.yearScroller.value : i.currentYear;
										r = t.dayScroller.value,
										t._setDayScroller(a, n, r)
									}
							})
					}),
					t.renderText || (t.config.confirmText && (t.find("[data-role=confirm]").innerText = t.config.confirmText), t.config.cancelText && (t.find("[data-role=cancel]").innerText = t.config.cancelText), t.config.clearText && (t.find("[data-role=clear]").innerText = t.config.clearText), t.renderText = !0),
					this._show(a),
					t.find("[data-role=cancel]").addEventListener("click", function (e) {
						e.preventDefault(),
						t.hide()
					}, !1),
					t.find("[data-role=confirm]").addEventListener("click", function (e) {
						e.preventDefault(),
						t.confirm()
					}, !1),
					t.config.clearText && t.find("[data-role=clear]").addEventListener("click", function (e) {
						e.preventDefault(),
						t.clear()
					}, !1)
				}
				o(),
				i.onShow.call(t)
			},
			_makeData: function (e, t, i) {
				var n,
				r,
				o = this.config,
				a = this.valueMap,
				l = g[e],
				s = [];
				if ("year" === e) {
					if (n = o.minYear, r = o.maxYear, this.reMakeData) {
						var c = (0, d.getYears)(this.config.startDate, this.config.endDate),
						u = c.minYear,
						f = c.maxYear;
						n = Math.max(n, u),
						r = Math.min(r, f)
					}
				} else if ("month" === e) {
					if (n = 1, r = 12, this.reMakeData) {
						var p = (0, d.getMonths)(this.config.startDate, this.config.endDate, 1 * this.yearScroller.value),
						h = p.minMonth,
						_ = p.maxMonth;
						n = Math.max(n, h),
						r = Math.min(r, _)
					}
				} else if ("day" === e) {
					if (n = 1, r = (0, A.getMaxDay)(t, i), this.reMakeData) {
						var m = (0, d.getDays)(this.config.startDate, this.config.endDate, 1 * this.yearScroller.value, 1 * this.monthScroller.value),
						v = m.minDay,
						w = m.maxDay;
						n = Math.max(n, v),
						r = Math.min(r, w)
					}
				} else
					"hour" === e ? (n = this.config.minHour, r = this.config.maxHour) : "minute" === e && (n = 0, r = 59);
				for (var b = n; b <= r; b++) {
					var x;
					if ("year" === e)
						x = (0, A.parseRow)(o.yearRow, b);
					else {
						var y = a[l[0]] ? (0, A.addZero)(b) : b;
						x = (0, A.parseRow)(o[e + "Row"], y)
					}
					s.push({
						name: x,
						value: b
					})
				}
				return s
			},
			_setMonthScroller: function (e, t) {
				var i = this;
				this.monthScroller.destroy();
				var n = i.find("[data-role=month]");
				i.monthScroller = r(n, i._makeData("month"), t, function (e) {
						i.config.onSelect.call(i, "month", e);
						var t = i.yearScroller ? i.yearScroller.value : i.config.currentYear,
						n = i.dayScroller.value;
						i._setDayScroller(t, e, n)
					})
			},
			_setDayScroller: function (e, t, i) {
				var n = this,
				o = (0, A.getMaxDay)(e, t);
				i > o && (i = o),
				n.dayScroller.destroy();
				var a = n.find("[data-role=day]");
				n.dayScroller = r(a, n._makeData("day", e, t), i, function (e) {
						n.config.onSelect.call(n, "day", e)
					})
			},
			find: function (e) {
				return this.container.querySelector(e)
			},
			hide: function () {
				var e = this;
				e.container.style.removeProperty("transform"),
				e.container.style.removeProperty("-webkit-transform"),
				setTimeout(function () {
					e.container && (e.container.style.display = "none")
				}, _),
				a(),
				e.config.onHide.call(e)
			},
			select: function (e, t) {
				this[e + "Scroller"].select(t, !1)
			},
			destroy: function () {
				var e = this;
				this.trigger.removeEventListener("click", this.triggerHandler, !1),
				(0, A.removeElement)(m),
				(0, A.removeElement)(e.container),
				m = null,
				e.container = null
			},
			getValue: function () {
				function e(e, t, i) {
					if (e) {
						var r = e.value;
						t && (n = n.replace(new RegExp(t, "g"), (0, A.addZero)(r))),
						i && (n = n.replace(new RegExp(i, "g"), (0, A.trimZero)(r)))
					}
				}
				var t = this,
				i = t.config,
				n = i.format;
				return (0, A.each)(g, function (i, n) {
					e(t[i + "Scroller"], n[0], n[1])
				}),
				n
			},
			confirm: function () {
				var e = this,
				t = e.getValue();
				this.value = t,
				e.config.onConfirm.call(e, t) !== !1 && e.hide()
			},
			clear: function () {
				var e = this,
				t = e.getValue();
				e.config.onClear.call(e, t) !== !1 && e.hide()
			}
		},
		t.default = l
	},
	85: function (e, t) {
		"use strict";
		e.exports = function (e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "YYYY-MM-DD HH:mm:ss",
			i = {
				"M+": e.getMonth() + 1,
				"D+": e.getDate(),
				"h+": e.getHours() % 12 === 0 ? 12 : e.getHours() % 12,
				"H+": e.getHours(),
				"m+": e.getMinutes(),
				"s+": e.getSeconds(),
				"q+": Math.floor((e.getMonth() + 3) / 3),
				S: e.getMilliseconds()
			},
			n = {
				0: "日",
				1: "一",
				2: "二",
				3: "三",
				4: "四",
				5: "五",
				6: "六"
			};
			/(Y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))),
			/(E+)/.test(t) && (t = t.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" : "周" : "") + n[e.getDay() + ""]));
			for (var r in i)
				new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? i[r] : ("00" + i[r]).substr(("" + i[r]).length)));
			return t
		}
	},
	86: function (e, t) {
		"use strict";
		function i(e) {
			return e % 100 !== 0 && e % 4 === 0 || e % 400 === 0
		}
		function n(e, t) {
			return e = parseFloat(e),
			t = parseFloat(t),
			2 === t ? i(e) ? 29 : 28 : [4, 6, 9, 11].indexOf(t) >= 0 ? 30 : 31
		}
		function r(e, t) {
			for (var i = e.getFullYear(), n = t.getFullYear(), r = []; i <= n; )
				r.push(i), i++;
			return {
				minYear: r[0],
				maxYear: r[r.length - 1]
			}
		}
		function o(e, t, i) {
			var n = e.getFullYear(),
			r = t.getFullYear(),
			o = e.getMonth() + 1,
			a = t.getMonth() + 1,
			l = 1,
			s = 12;
			return i === n && (l = o),
			i === r && (s = a), {
				minMonth: l,
				maxMonth: s
			}
		}
		function a(e, t, i, r) {
			var o = e.getFullYear(),
			a = t.getFullYear(),
			l = e.getMonth() + 1,
			s = t.getMonth() + 1,
			c = e.getDate(),
			u = t.getDate(),
			A = 1,
			d = n(i, r);
			return i === o && r === l && (A = c),
			i === a && r === s && (d = u), {
				minDay: A,
				maxDay: d
			}
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.getYears = r,
		t.getMonths = o,
		t.getDays = a
	},
	87: function (e, t, i) {
		"use strict";
		function n(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		function r(e, t) {
			for (var i in e)
				if (e.hasOwnProperty(i) && t.call(e[i], i, e[i]) === !1)
					break
		}
		function o(e) {
			return e = String(e),
			e = e ? parseFloat(e.replace(/^0+/g, "")) : "",
			e = e || 0,
			e += ""
		}
		function a(e) {
			return e = String(e),
			e.length < 2 ? "0" + e : e
		}
		function l(e) {
			return e % 100 !== 0 && e % 4 === 0 || e % 400 === 0
		}
		function s(e, t) {
			return e = parseFloat(e),
			t = parseFloat(t),
			2 === t ? l(e) ? 29 : 28 : [4, 6, 9, 11].indexOf(t) >= 0 ? 30 : 31
		}
		function c(e, t) {
			return e.replace(/\{value\}/g, t)
		}
		function u(e, t) {
			var i = e.split(/[^A-Za-z]+/),
			n = t.split(/\D+/);
			if (i.length !== n.length) {
				var r = (0, h.default)(new Date, e);
				n = r.split(/\D+/)
			}
			for (var o = {}, a = 0; a < i.length; a++)
				i[a] && (o[i[a]] = n[a]);
			return o
		}
		function A(e) {
			return "string" == typeof e ? document.querySelector(e) : e
		}
		function d(e) {
			var t = document.createElement("div");
			return t.innerHTML = e,
			t.firstElementChild
		}
		function f(e) {
			e && e.parentNode.removeChild(e)
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.each = r,
		t.trimZero = o,
		t.addZero = a,
		t.isLeapYear = l,
		t.getMaxDay = s,
		t.parseRow = c,
		t.parseDate = u,
		t.getElement = A,
		t.toElement = d,
		t.removeElement = f;
		var p = i(85),
		h = n(p)
	},
	88: function (e, t, i) {
		t = e.exports = i(3)(),
		t.push([e.id, '.weui_cell_ft.with_arrow:after{content:" ";display:inline-block;transform:rotate(45deg);height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;position:relative;top:-1px;margin-left:.3em}.scroller-component{display:block;position:relative;height:238px;overflow:hidden;width:100%}.scroller-content{z-index:-1}.scroller-content,.scroller-mask{position:absolute;left:0;top:0;width:100%}.scroller-mask{height:100%;margin:0 auto;z-index:3;background-image:linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));background-position:top,bottom;background-size:100% 102px;background-repeat:no-repeat}.scroller-item{text-align:center;font-size:16px;height:34px;line-height:34px;color:#000}.scroller-indicator{width:100%;height:34px;position:absolute;left:0;top:102px;z-index:3;background-image:linear-gradient(180deg,#d0d0d0,#d0d0d0,transparent,transparent),linear-gradient(0deg,#d0d0d0,#d0d0d0,transparent,transparent);background-position:top,bottom;background-size:100% 1px;background-repeat:no-repeat}.dp-container{bottom:0;z-index:10000;background-color:#fff;display:none;transition:transform .3s ease;transform:translateY(100%)}.dp-container,.dp-mask{position:fixed;width:100%;left:0}.dp-mask{z-index:998;height:100%;top:0;opacity:0;transition:opacity .1s ease;background-color:#000;z-index:9999}.dp-header{display:-ms-flexbox;display:flex;width:100%;box-align:center;-ms-flex-align:center;align-items:center;background-image:linear-gradient(180deg,#e7e7e7,#e7e7e7,transparent,transparent);background-position:bottom;background-size:100% 1px;background-repeat:no-repeat}.dp-header .dp-item{color:#04be02;font-size:18px;height:44px;line-height:44px;cursor:pointer}.dp-header .dp-item.dp-left,.dp-header .dp-item.dp-right{color:#04be02}.dp-content{display:-ms-flexbox;display:flex;width:100%;box-align:center;-ms-flex-align:center;align-items:center;padding:10px 0}.dp-content .dp-item,.dp-header .dp-item{box-sizing:border-box;-ms-flex:1;flex:1;text-align:center}', ""])
	},
	89: function (e, t, i) {
		var n = i(88);
		"string" == typeof n && (n = [[e.id, n, ""]]);
		i(4)(n, {});
		n.locals && (e.exports = n.locals)
	},
	90: function (e, t) {
		e.exports = {
			render: function () {
				var e = this,
				t = e.$createElement,
				i = e._self._c || t;
				return i("a", {
					staticClass: "weui_cell",
					attrs: {
						href: "javascript:"
					}
				}, [e._t("default", [i("div", {
									staticClass: "weui_cell_bd weui_cell_primary"
								}, [i("p", [e._v(e._s(e.title))]), e._v(" "), e.inlineDesc ? i("inline-desc", [e._v(e._s(e.inlineDesc))]) : e._e()], 1), e._v(" "), i("div", {
									staticClass: "weui_cell_ft with_arrow vux-datetime-value"
								}, [e._v("\n      " + e._s(e.currentValue || e.placeholder) + "\n      "), i("icon", {
											directives: [{
													name: "show",
													rawName: "v-show",
													value: !e.valid,
													expression: "!valid"
												}
											],
											staticClass: "vux-input-icon",
											attrs: {
												type: "warn",
												title: e.firstError
											}
										})], 1)])], 2)
			},
			staticRenderFns: []
		}
	},
	91: function (e, t, i) {
		i(89);
		var n = i(2)(i(83), i(90), null, null);
		e.exports = n.exports
	},
	110: function (e, t, i) {
		i(115);
		var n = i(2)(i(111), i(117), null, null);
		e.exports = n.exports
	},
	111: function (e, t, i) {
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
		var r = i(32),
		o = n(r);
		t.default = {
			components: {
				InlineDesc: o.default
			},
			computed: {
				labelStyle: function () {
					var e = /<\/?[^>]*>/.test(this.title),
					t = Math.min(e ? 5 : this.title.length + 1, 14) + "em";
					return {
						width: t
					}
				}
			},
			props: {
				title: {
					type: String,
					required: !0
				},
				disabled: Boolean,
				value: {
					type: Boolean,
				default:
					!1
				},
				inlineDesc: [String, Boolean, Number]
			},
			data: function () {
				return {
					currentValue: this.value
				}
			},
			watch: {
				currentValue: function (e) {
					this.$emit("input", e),
					this.$emit("on-change", e)
				},
				value: function (e) {
					this.currentValue = e
				}
			}
		}
	},
	114: function (e, t, i) {
		t = e.exports = i(3)(),
		t.push([e.id, '.weui_label{color:#000;display:block;width:105px;word-wrap:break-word;word-break:break-all}.weui_input{width:100%;border:0;outline:0;-webkit-appearance:none;background-color:transparent;font-size:inherit;color:inherit;height:1.41176471em;line-height:1.41176471}.weui_input::-webkit-inner-spin-button,.weui_input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.weui_textarea{display:block;border:0;resize:none;width:100%;color:inherit;font-size:1em;line-height:inherit;outline:0}.weui_textarea_counter{color:#b2b2b2;text-align:right}.weui_cell_warn .weui_textarea_counter{color:#e64340}.weui_toptips{display:none;position:fixed;-webkit-transform:translateZ(0);width:100%;top:0;line-height:2.3;font-size:14px;text-align:center;color:#fff;z-index:50000}.weui_toptips.weui_warn{background-color:#e64340}.weui_cells_form .weui_cell_warn{color:#e64340}.weui_cells_form .weui_cell_warn .weui_icon_warn{display:inline-block}.weui_cells_form .weui_cell_ft{font-size:0}.weui_cells_form .weui_icon_warn{display:none}.weui_cells_form input,.weui_cells_form label[for],.weui_cells_form textarea{-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui_cell.weui_cell_switch{padding-top:6px;padding-bottom:6px}.weui_switch{-webkit-appearance:none;-moz-appearance:none;appearance:none;position:relative;width:52px;height:32px;border:1px solid #dfdfdf;outline:0;border-radius:16px;box-sizing:border-box;background:#dfdfdf}.weui_switch:before{width:50px;background-color:#fdfdfd}.weui_switch:after,.weui_switch:before{content:" ";position:absolute;top:0;left:0;height:30px;border-radius:15px;transition:transform .3s}.weui_switch:after{width:30px;background-color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.4)}.weui_switch:checked{border-color:#04be02;background-color:#04be02}.weui_switch:checked:before{transform:scale(0)}.weui_switch:checked:after{transform:translateX(20px)}.weui_cell_switch .weui_cell_ft{font-size:0}input.weui_switch[disabled]{opacity:.6}', ""])
	},
	115: function (e, t, i) {
		var n = i(114);
		"string" == typeof n && (n = [[e.id, n, ""]]);
		i(4)(n, {});
		n.locals && (e.exports = n.locals)
	},
	117: function (e, t) {
		e.exports = {
			render: function () {
				var e = this,
				t = e.$createElement,
				i = e._self._c || t;
				return i("div", {
					staticClass: "weui_cell weui_cell_switch"
				}, [i("div", {
							staticClass: "weui_cell_hd weui_cell_primary"
						}, [i("label", {
									staticClass: "weui_label",
									style: e.labelStyle,
									domProps: {
										innerHTML: e._s(e.title)
									}
								}), e._v(" "), e.inlineDesc ? i("inline-desc", [e._v(e._s(e.inlineDesc))]) : e._e()], 1), e._v(" "), i("div", {
							staticClass: "weui_cell_ft"
						}, [i("input", {
									directives: [{
											name: "model",
											rawName: "v-model",
											value: e.currentValue,
											expression: "currentValue"
										}
									],
									staticClass: "weui_switch",
									attrs: {
										type: "checkbox",
										disabled: e.disabled
									},
									domProps: {
										checked: Array.isArray(e.currentValue) ? e._i(e.currentValue, null) > -1 : e.currentValue
									},
									on: {
										change: function (t) {
											var i = e.currentValue,
											n = t.target,
											r = !!n.checked;
											if (Array.isArray(i)) {
												var o = null,
												a = e._i(i, o);
												n.checked ? a < 0 && (e.currentValue = i.concat([o])) : a > -1 && (e.currentValue = i.slice(0, a).concat(i.slice(a + 1)))
											} else
												e.currentValue = r
										}
									}
								})])])
			},
			staticRenderFns: []
		}
	},
	133: function (e, t) {
		"use strict";
		function i(e) {
			return {
				valid: /^https*:\/\/([a-zA-Z0-9]+\.)*[a-zA-Z0-9-]{1,61}\.[a-zA-z]{2,6}$/.test(e),
				msg: "格式错误"
			}
		}
		function n(e) {
			return {
				valid: /^[\u4E00-\u9FA5]{2,6}$/.test(e),
				msg: "为中文格式"
			}
		}
		function r(e) {
			return {
				valid: /^[a-zA-Z0-9]{4,12}$/.test(e),
				msg: "为4-12位字母和数字"
			}
		}
		function o() {
			for (var e = arguments.length, t = Array(e), i = 0; i < e; i++)
				t[i] = arguments[i];
			for (var n = t.length, r = 0; r < n; r++)
				if (t[r] && (!t[r].valid || !t[r].value)) {
					if (t[r].focus(), t[r].errors)
						for (var o in t[r].errors)
							throw new Error(t[r].title + t[r].errors[o]);
					if (!t[r].dirty)
						throw new Error(t[r].title + "必填哦");
					throw new Error(t[r].title + "输入有误")
				}
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.domainValid = i,
		t.chinaNameValid = n,
		t.accountValid = r,
		t.checkForm = o
	},
	137: function (e, t, i) {
		i(145);
		var n = i(2)(i(138), i(147), null, null);
		e.exports = n.exports
	},
	138: function (e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.default = {
			props: {
				type: {
				default:
					"default"
				},
				disabled: Boolean,
				mini: Boolean,
				plain: Boolean,
				text: String,
				actionType: String
			},
			computed: {
				classes: function () {
					return [{
							weui_btn_disabled: this.disabled,
							weui_btn_mini: this.mini
						}, "weui_btn_" + this.type, this.plain ? "weui_btn_plain_" + this.type : ""]
				}
			}
		}
	},
	143: function (e, t, i) {
		t = e.exports = i(3)(),
		t.push([e.id, '.weui_btn.weui_btn_mini{line-height:1.9;font-size:14px;padding:0 .75em;display:inline-block}button.weui_btn,input.weui_btn{width:100%;border-width:0;outline:0;-webkit-appearance:none}button.weui_btn:focus,input.weui_btn:focus{outline:0}button.weui_btn_inline,button.weui_btn_mini,input.weui_btn_inline,input.weui_btn_mini{width:auto}.weui_btn+.weui_btn{margin-top:15px}.weui_btn.weui_btn_inline+.weui_btn.weui_btn_inline{margin-top:auto;margin-left:15px}.weui_btn_area{margin:1.17647059em 15px .3em}.weui_btn_area.weui_btn_area_inline{display:-ms-flexbox;display:flex}.weui_btn_area.weui_btn_area_inline .weui_btn{margin-top:auto;margin-right:15px;width:100%;-ms-flex:1;flex:1}.weui_btn_area.weui_btn_area_inline .weui_btn:last-child{margin-right:0}.weui_btn{position:relative;display:block;margin-left:auto;margin-right:auto;padding-left:14px;padding-right:14px;box-sizing:border-box;font-size:18px;text-align:center;text-decoration:none;color:#fff;line-height:2.33333333;border-radius:5px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden}.weui_btn:after{content:" ";width:200%;height:200%;position:absolute;top:0;left:0;border:1px solid rgba(0,0,0,.2);transform:scale(.5);transform-origin:0 0;box-sizing:border-box;border-radius:10px}.weui_btn.weui_btn_inline{display:inline-block}.weui_btn_default{background-color:#f7f7f7;color:#454545}.weui_btn_default:not(.weui_btn_disabled):visited{color:#454545}.weui_btn_default:not(.weui_btn_disabled):active{color:#a1a1a1;background-color:#dedede}.weui_btn_primary{background-color:#04be02}.weui_btn_primary:not(.weui_btn_disabled):visited{color:#fff}.weui_btn_primary:not(.weui_btn_disabled):active{color:hsla(0,0%,100%,.4);background-color:#039702}.weui_btn_warn{background-color:#ef4f4f}.weui_btn_warn:not(.weui_btn_disabled):visited{color:#fff}.weui_btn_warn:not(.weui_btn_disabled):active{color:hsla(0,0%,100%,.4);background-color:#c13e3e}.weui_btn_disabled{color:hsla(0,0%,100%,.6)}.weui_btn_disabled.weui_btn_default{color:#c9c9c9}.weui_btn_plain_primary{color:#04be02;border:1px solid #04be02}button.weui_btn_plain_primary,input.weui_btn_plain_primary{border-width:1px;background-color:transparent}.weui_btn_plain_primary:active{border-color:#039702}.weui_btn_plain_primary:after{border-width:0}.weui_btn_plain_default{color:#5a5a5a;border:1px solid #5a5a5a}button.weui_btn_plain_default,input.weui_btn_plain_default{border-width:1px;background-color:transparent}.weui_btn_plain_default:after{border-width:0}', ""])
	},
	145: function (e, t, i) {
		var n = i(143);
		"string" == typeof n && (n = [[e.id, n, ""]]);
		i(4)(n, {});
		n.locals && (e.exports = n.locals)
	},
	147: function (e, t) {
		e.exports = {
			render: function () {
				var e = this,
				t = e.$createElement,
				i = e._self._c || t;
				return i("button", {
					staticClass: "weui_btn",
					class: e.classes,
					attrs: {
						disabled: e.disabled,
						type: e.actionType
					}
				}, [e._v("\n  " + e._s(e.text)), e._t("default")], 2)
			},
			staticRenderFns: []
		}
	},
	155: function (e, t) {
		var i = {
			utf8: {
				stringToBytes: function (e) {
					return i.bin.stringToBytes(unescape(encodeURIComponent(e)))
				},
				bytesToString: function (e) {
					return decodeURIComponent(escape(i.bin.bytesToString(e)))
				}
			},
			bin: {
				stringToBytes: function (e) {
					for (var t = [], i = 0; i < e.length; i++)
						t.push(255 & e.charCodeAt(i));
					return t
				},
				bytesToString: function (e) {
					for (var t = [], i = 0; i < e.length; i++)
						t.push(String.fromCharCode(e[i]));
					return t.join("")
				}
			}
		};
		e.exports = i
	},
	166: function (e, t) {
		e.exports = "data:image/jpeg;base64,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";
	},
	171: function (e, t, i) {
		i(211);
		var n = i(2)(i(194), i(218), "data-v-eb5790f4", null);
		e.exports = n.exports
	},
	177: function (e, t) {
		!function () {
			var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
			i = {
				rotl: function (e, t) {
					return e << t | e >>> 32 - t
				},
				rotr: function (e, t) {
					return e << 32 - t | e >>> t
				},
				endian: function (e) {
					if (e.constructor == Number)
						return 16711935 & i.rotl(e, 8) | 4278255360 & i.rotl(e, 24);
					for (var t = 0; t < e.length; t++)
						e[t] = i.endian(e[t]);
					return e
				},
				randomBytes: function (e) {
					for (var t = []; e > 0; e--)
						t.push(Math.floor(256 * Math.random()));
					return t
				},
				bytesToWords: function (e) {
					for (var t = [], i = 0, n = 0; i < e.length; i++, n += 8)
						t[n >>> 5] |= e[i] << 24 - n % 32;
					return t
				},
				wordsToBytes: function (e) {
					for (var t = [], i = 0; i < 32 * e.length; i += 8)
						t.push(e[i >>> 5] >>> 24 - i % 32 & 255);
					return t
				},
				bytesToHex: function (e) {
					for (var t = [], i = 0; i < e.length; i++)
						t.push((e[i] >>> 4).toString(16)), t.push((15 & e[i]).toString(16));
					return t.join("")
				},
				hexToBytes: function (e) {
					for (var t = [], i = 0; i < e.length; i += 2)
						t.push(parseInt(e.substr(i, 2), 16));
					return t
				},
				bytesToBase64: function (e) {
					for (var i = [], n = 0; n < e.length; n += 3)
						for (var r = e[n] << 16 | e[n + 1] << 8 | e[n + 2], o = 0; o < 4; o++)
							8 * n + 6 * o <= 8 * e.length ? i.push(t.charAt(r >>> 6 * (3 - o) & 63)) : i.push("=");
					return i.join("")
				},
				base64ToBytes: function (e) {
					e = e.replace(/[^A-Z0-9+\/]/gi, "");
					for (var i = [], n = 0, r = 0; n < e.length; r = ++n % 4)
						0 != r && i.push((t.indexOf(e.charAt(n - 1)) & Math.pow(2, -2 * r + 8) - 1) << 2 * r | t.indexOf(e.charAt(n)) >>> 6 - 2 * r);
					return i
				}
			};
			e.exports = i
		}
		()
	},
	180: function (e, t) {
		function i(e) {
			return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
		}
		function n(e) {
			return "function" == typeof e.readFloatLE && "function" == typeof e.slice && i(e.slice(0, 0))
		}
		/*!
		 * Determine if an object is a Buffer
		 *
		 * @author   Feross Aboukhadijeh <https://feross.org>
		 * @license  MIT
		 */
		e.exports = function (e) {
			return null != e && (i(e) || n(e) || !!e._isBuffer)
		}
	},
	181: function (e, t, i) {
		!function () {
			var t = i(177),
			n = i(155).utf8,
			r = i(180),
			o = i(155).bin,
			a = function (e, i) {
				e.constructor == String ? e = i && "binary" === i.encoding ? o.stringToBytes(e) : n.stringToBytes(e) : r(e) ? e = Array.prototype.slice.call(e, 0) : Array.isArray(e) || (e = e.toString());
				for (var l = t.bytesToWords(e), s = 8 * e.length, c = 1732584193, u = -271733879, A = -1732584194, d = 271733878, f = 0; f < l.length; f++)
					l[f] = 16711935 & (l[f] << 8 | l[f] >>> 24) | 4278255360 & (l[f] << 24 | l[f] >>> 8);
				l[s >>> 5] |= 128 << s % 32,
				l[(s + 64 >>> 9 << 4) + 14] = s;
				for (var p = a._ff, h = a._gg, _ = a._hh, g = a._ii, f = 0; f < l.length; f += 16) {
					var m = c,
					v = u,
					w = A,
					b = d;
					c = p(c, u, A, d, l[f + 0], 7, -680876936),
					d = p(d, c, u, A, l[f + 1], 12, -389564586),
					A = p(A, d, c, u, l[f + 2], 17, 606105819),
					u = p(u, A, d, c, l[f + 3], 22, -1044525330),
					c = p(c, u, A, d, l[f + 4], 7, -176418897),
					d = p(d, c, u, A, l[f + 5], 12, 1200080426),
					A = p(A, d, c, u, l[f + 6], 17, -1473231341),
					u = p(u, A, d, c, l[f + 7], 22, -45705983),
					c = p(c, u, A, d, l[f + 8], 7, 1770035416),
					d = p(d, c, u, A, l[f + 9], 12, -1958414417),
					A = p(A, d, c, u, l[f + 10], 17, -42063),
					u = p(u, A, d, c, l[f + 11], 22, -1990404162),
					c = p(c, u, A, d, l[f + 12], 7, 1804603682),
					d = p(d, c, u, A, l[f + 13], 12, -40341101),
					A = p(A, d, c, u, l[f + 14], 17, -1502002290),
					u = p(u, A, d, c, l[f + 15], 22, 1236535329),
					c = h(c, u, A, d, l[f + 1], 5, -165796510),
					d = h(d, c, u, A, l[f + 6], 9, -1069501632),
					A = h(A, d, c, u, l[f + 11], 14, 643717713),
					u = h(u, A, d, c, l[f + 0], 20, -373897302),
					c = h(c, u, A, d, l[f + 5], 5, -701558691),
					d = h(d, c, u, A, l[f + 10], 9, 38016083),
					A = h(A, d, c, u, l[f + 15], 14, -660478335),
					u = h(u, A, d, c, l[f + 4], 20, -405537848),
					c = h(c, u, A, d, l[f + 9], 5, 568446438),
					d = h(d, c, u, A, l[f + 14], 9, -1019803690),
					A = h(A, d, c, u, l[f + 3], 14, -187363961),
					u = h(u, A, d, c, l[f + 8], 20, 1163531501),
					c = h(c, u, A, d, l[f + 13], 5, -1444681467),
					d = h(d, c, u, A, l[f + 2], 9, -51403784),
					A = h(A, d, c, u, l[f + 7], 14, 1735328473),
					u = h(u, A, d, c, l[f + 12], 20, -1926607734),
					c = _(c, u, A, d, l[f + 5], 4, -378558),
					d = _(d, c, u, A, l[f + 8], 11, -2022574463),
					A = _(A, d, c, u, l[f + 11], 16, 1839030562),
					u = _(u, A, d, c, l[f + 14], 23, -35309556),
					c = _(c, u, A, d, l[f + 1], 4, -1530992060),
					d = _(d, c, u, A, l[f + 4], 11, 1272893353),
					A = _(A, d, c, u, l[f + 7], 16, -155497632),
					u = _(u, A, d, c, l[f + 10], 23, -1094730640),
					c = _(c, u, A, d, l[f + 13], 4, 681279174),
					d = _(d, c, u, A, l[f + 0], 11, -358537222),
					A = _(A, d, c, u, l[f + 3], 16, -722521979),
					u = _(u, A, d, c, l[f + 6], 23, 76029189),
					c = _(c, u, A, d, l[f + 9], 4, -640364487),
					d = _(d, c, u, A, l[f + 12], 11, -421815835),
					A = _(A, d, c, u, l[f + 15], 16, 530742520),
					u = _(u, A, d, c, l[f + 2], 23, -995338651),
					c = g(c, u, A, d, l[f + 0], 6, -198630844),
					d = g(d, c, u, A, l[f + 7], 10, 1126891415),
					A = g(A, d, c, u, l[f + 14], 15, -1416354905),
					u = g(u, A, d, c, l[f + 5], 21, -57434055),
					c = g(c, u, A, d, l[f + 12], 6, 1700485571),
					d = g(d, c, u, A, l[f + 3], 10, -1894986606),
					A = g(A, d, c, u, l[f + 10], 15, -1051523),
					u = g(u, A, d, c, l[f + 1], 21, -2054922799),
					c = g(c, u, A, d, l[f + 8], 6, 1873313359),
					d = g(d, c, u, A, l[f + 15], 10, -30611744),
					A = g(A, d, c, u, l[f + 6], 15, -1560198380),
					u = g(u, A, d, c, l[f + 13], 21, 1309151649),
					c = g(c, u, A, d, l[f + 4], 6, -145523070),
					d = g(d, c, u, A, l[f + 11], 10, -1120210379),
					A = g(A, d, c, u, l[f + 2], 15, 718787259),
					u = g(u, A, d, c, l[f + 9], 21, -343485551),
					c = c + m >>> 0,
					u = u + v >>> 0,
					A = A + w >>> 0,
					d = d + b >>> 0
				}
				return t.endian([c, u, A, d])
			};
			a._ff = function (e, t, i, n, r, o, a) {
				var l = e + (t & i | ~t & n) + (r >>> 0) + a;
				return (l << o | l >>> 32 - o) + t
			},
			a._gg = function (e, t, i, n, r, o, a) {
				var l = e + (t & n | i & ~n) + (r >>> 0) + a;
				return (l << o | l >>> 32 - o) + t
			},
			a._hh = function (e, t, i, n, r, o, a) {
				var l = e + (t ^ i ^ n) + (r >>> 0) + a;
				return (l << o | l >>> 32 - o) + t
			},
			a._ii = function (e, t, i, n, r, o, a) {
				var l = e + (i ^ (t | ~n)) + (r >>> 0) + a;
				return (l << o | l >>> 32 - o) + t
			},
			a._blocksize = 16,
			a._digestsize = 16,
			e.exports = function (e, i) {
				if (void 0 === e || null === e)
					throw new Error("Illegal argument " + e);
				var n = t.wordsToBytes(a(e, i));
				return i && i.asBytes ? n : i && i.asString ? o.bytesToString(n) : t.bytesToHex(n)
			}
		}
		()
	},
	194: function (e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}),
		t.default = {
			name: "MCheckBox",
			props: {
				value: {
					type: Boolean,
					require: !1,
				default:
					!1
				}
			},
			data: function () {
				return {
					currentValue: this.value
				}
			},
			methods: {
				onClick: function () {
					this.currentValue = !this.currentValue
				}
			},
			watch: {
				currentValue: function (e) {
					this.$emit("input", e)
				},
				value: function (e) {
					this.currentValue = e
				}
			}
		}
	},
	208: function (e, t, i) {
		t = e.exports = i(3)(),
		t.push([e.id, "a[data-v-eb5790f4]{position:relative;padding-left:.4rem;font-size:.25rem;line-height:.25rem;color:#333}a i.fa[data-v-eb5790f4]{display:block;width:.4rem;height:.25rem;position:absolute;line-height:100%;height:100%;top:0;left:0;text-align:center;vertical-align:middle;font-size:.3rem}a i[data-v-eb5790f4]:first-child{display:none}a i[data-v-eb5790f4]:last-child{display:block}a.on i[data-v-eb5790f4]:first-child{display:block;color:#b62929}a.on i[data-v-eb5790f4]:last-child{display:none}", ""])
	},
	211: function (e, t, i) {
		var n = i(208);
		"string" == typeof n && (n = [[e.id, n, ""]]);
		i(4)(n, {});
		n.locals && (e.exports = n.locals)
	},
	218: function (e, t) {
		e.exports = {
			render: function () {
				var e = this,
				t = e.$createElement,
				i = e._self._c || t;
				return i("a", {
					class: {
						on: this.currentValue
					},
					attrs: {
						href: ""
					},
					on: {
						click: e.onClick
					}
				}, [i("i", {
							staticClass: "fa fa-check-square",
							attrs: {
								"aria-hidden": "true"
							}
						}), e._v(" "), i("i", {
							staticClass: "fa fa-square-o",
							attrs: {
								"aria-hidden": "true"
							}
						}), e._v(" "), e._t("default")], 2)
			},
			staticRenderFns: []
		}
	},
	241: function (e, t, i) {
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
		var r = i(78),
		o = n(r),
		a = i(41),
		l = n(a),
		s = i(109),
		c = n(s),
		u = i(39),
		A = n(u);
		t.default = {
			components: {
				Popup: o.default,
				Group: l.default,
				Cell: c.default
			},
			props: {
				value: {
					type: Boolean,
					required: !0
				},
				title: {
					type: String,
					required: !0
				}
			},
			methods: {
				closePopup: function () {
					this.$emit("close-popup")
				}
			},
			mounted: function () {
				(0, A.default)(".simple-choose-scroll-wrapper").scroll({
					scrollY: !0,
					scrollX: !1,
					indicators: !0,
					bounce: !0
				})
			}
		}
	},
	264: function (e, t, i) {
		t = e.exports = i(3)(),
		t.push([e.id, ".item-content[data-v-145edfb6]{position:relative;padding:16px 20px;border-bottom:1px solid #ddd}.item-content p[data-v-145edfb6]{margin:0}.simple-choose-scroll-wrapper[data-v-145edfb6]{background-color:#fff;margin-top:44px}.choice-header[data-v-145edfb6]{background-color:#fff;height:44px;border:none;background-image:linear-gradient(0deg,#ddd,#ddd 50%,transparent 0);background-position:bottom;background-size:100% 1px;background-repeat:no-repeat;line-height:44px;font-size:18px;color:#444}.choice-header a[data-v-145edfb6]{color:#b2b2b2;padding:10px}.mui-scroll li[data-v-145edfb6],p[data-v-145edfb6]{padding-left:10px;font-size:12px;list-style-type:square}.mui-scroll p[data-v-145edfb6]{margin-bottom:40px}", ""])
	},
	274: function (e, t, i) {
		var n = i(264);
		"string" == typeof n && (n = [[e.id, n, ""]]);
		i(4)(n, {});
		n.locals && (e.exports = n.locals)
	},
	296: function (e, t) {
		e.exports = {
			render: function () {
				var e = this,
				t = e.$createElement,
				i = e._self._c || t;
				return i("popup", {
					attrs: {
						height: "100%"
					},
					model: {
						value: e.value,
						callback: function (t) {
							e.value = t
						},
						expression: "value"
					}
				}, [i("div", {
							staticClass: "choice-header"
						}, [i("a", {
									attrs: {
										href: "#"
									},
									on: {
										click: e.closePopup
									}
								}, [i("i", {
											staticClass: "fa fa-chevron-left",
											attrs: {
												"aria-hidden": "true"
											}
										})]), e._v(" "), i("span", {
									staticClass: "title"
								}, [e._v(e._s(e.title))])]), e._v(" "), i("div", {
							staticClass: "mui-scroll-wrapper simple-choose-scroll-wrapper"
						}, [i("div", {
									staticClass: "mui-scroll"
								}, [i("li", [e._v("為避免於本網站投注時之爭議，請會員務必於進入網站前詳閱本娛樂场所定之各項規則，客戶一經「我同意」進入本網站進行投注時，即被為已接受本娛樂场的所有協議與規則。")]), e._v(" "), i("li", [e._v("會員有責任確保自己的帳戶以及登入資料的保密性，以會員帳號及密碼進行的任何網上投注，將被視為有效。敬請不定時做密碼變更之動作。若帳號密碼被盜用，進行的投注，本公司一概不負賠償責任。")]), e._v(" "), i("li", [e._v("本公司保留不定時更改本協定或遊戲規則或保密條例，更改之條款將從更改發生後指定之日起生效，並保留一切有爭議事項及最後的決策權。")]), e._v(" "), i("li", [e._v("用戶須達到居住地國家法律規定之合法年齡方可使用線上娛樂場或網站。")]), e._v(" "), i("li", [e._v("網上投注如未能成功提交，投注將被視為無效。")]), e._v(" "), i("li", [e._v("凡玩家於出牌途中且尚無結果前自動或強制斷線時，並不影響比賽之結果。")]), e._v(" "), i("li", [e._v("如遇發生不可抗拒之災害，駭客入侵，網絡問題造成數據丟失的情況，以本公司公告為最終方案。")]), e._v(" "), i("li", [e._v("特此聲明，本公司將會對所有的電子交易進行記錄，如有任何爭議，本公司將會以注單記錄為準。")]), e._v(" "), i("li", [e._v("本公司保留更改、修改現有條款或增加任何適當條款的權利！")]), e._v(" "), i("li", [e._v("無論在任何情況下，本公司具有最終的解釋權。")]), e._v(" "), i("li", [e._v("无风险投注：为了更好的完善长久合作关系，公司将严厉禁止个人/团体无风险投注. (1)例如同时投注单双或是同时投注位数超过2/3以上的号码,禁止会员存在同一项游戏同局购买同一个位数【单，小】，【双，大】\n        【庄，闲】【红，黑】对冲或对打投注，该买法也将视为无风险投注,敬请注意下级会员是否存在洗码套取公司相关代理与会员优惠 一经发现将永久取消代理与会员的会员资格没收所有资金.\n        (2)例如，轮盘游戏中轮盘下注不可超过二分之一，换成号码数不得超过一半哦，超过规定视为无风险投注，谢谢！\n      ")]), e._v(" "), i("li", [e._v("敬请注意下级会员是否存在洗码套取公司相关代理与会员优惠 一经发现将永久取消代理与会员的会员资格")]), e._v(" "), i("li", [e._v("若經本公司發現會員以不正當手法\n        '利用外掛程式'進行投注或以任何非正常方式進行的個人、團體投注有損公司利益之投注情事發生，本公司保留權利取消該類注單以及注單產生之紅利，並停用該會員帳號。\n      ")]), e._v(" "), i("li", [e._v("若本公司發現會員有重複申請帳號行為時，保留取消、收回會員所有優惠紅利，以及優惠紅利所產生的盈利之權利。每位玩家、每一住址、每一電子郵箱、每一電話號碼、相同支付卡/信用卡號碼，以及共享電腦環境\n        (例如:網吧、其他公共用電腦等)只能夠擁有一個會員帳號，各項優惠只適用於每位客戶在本公司唯一的帳戶。若本公司发现会员有重复申请帐号行为时，保留取消、收回会员所有优惠红利，以及优惠红利所产生的盈利之权利。\n      ")]), e._v(" "), i("p", {
											staticClass: "red"
										}, [e._v("本公司若发现您在同系统的娱乐城上开设多个会员账户，并进行套利下注；本公司有权取消您的会员账号并将所有下注营利取消！")])])])])
			},
			staticRenderFns: []
		}
	},
	308: function (e, t, i) {
		i(274);
		var n = i(2)(i(241), i(296), "data-v-145edfb6", null);
		e.exports = n.exports
	},
	452: function (e, t, i) {
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
		var r = i(78),
		o = n(r),
		a = i(41),
		l = n(a),
		s = i(110),
		c = n(s),
		u = i(55),
		A = n(u),
		d = i(109),
		f = n(d),
		p = i(91),
		h = n(p),
		_ = i(137),
		g = n(_),
		m = i(554),
		v = n(m),
		w = i(39),
		b = n(w),
		x = i(181),
		y = n(x),
		B = i(133),
		E = i(49),
		D = n(E),
		k = i(171),
		C = n(k),
		S = i(16),
		M = n(S),
		F = i(308),
		Q = n(F);
		t.default = {
			components: {
				Popup: o.default,
				Group: l.default,
				XSwitch: c.default,
				XInput: A.default,
				Cell: f.default,
				Datetime: h.default,
				XButton: g.default,
				AgreeMentPopup: Q.default,
				MXCheckBox: C.default
			},
			data: function () {
				return {
					showAgreement: !1,
					agree: !0,
					vCode: "",
					vo: {
						account: null,
						password: null,
						confirmPassword: null
					},
					readOnlySpreadCode: !1,
					limit: {},
					valid: {
						account: "error"
					},
					conPass: "",
					AppStatus: D.default,
					src: i(166),
					registerLimitType: 0,
					onlyfullName: 1,
					onlyfullPhone: 1,
					isRequest: !1,
					isRequestFinish: !0
				}
			},
			methods: {
				href2: function (e) {
					this.$router.push({
						path: e
					})
				},
				checkForm: B.checkForm,
				chinaNameValid: B.chinaNameValid,
				accountValid: B.accountValid,
				agreement: function () {
					this.showAgreement = !0
				},
				refreshVcode: function () {
					this.src = "/v/vCode?t=" + Math.random() + (new Date).getTime()
				},
				toLogin: function () {
					this.$router.push({
						path: "/login"
					})
				},
				registTest: function () {
					this.$parent.freeTrial(),
					this.$router.push({
						path: "/"
					})
				},
				reg: M.default.debounce(function () {
					this.isRequest = !0;
					try {
						var e = [];
						for (var t in this.$refs)
							this.$refs[t] && this.$refs[t].required && e.push(this.$refs[t]);
						B.checkForm.apply(this, e)
					} catch (e) {
						return this.showError(e.message),
						void(this.isRequest = !1)
					}
					if (this.vo.fundPwd && 2 !== this.limit.fundPwd && this.vo.fundPwd.replace(/^\s+|\s+$/g, "").length > 0 && !/^[0-9]{4}$/.test(this.vo.fundPwd))
						return this.showError("取款密码错误"), void(this.isRequest = !1);
					var i = M.default.copyObject({}, this.vo);
					D.default.md5Password ? (i.password = (0, y.default)(this.vo.password), i.confirmPassword = (0, y.default)(this.vo.confirmPassword)) : (i.password = this.vo.password, i.confirmPassword = this.vo.confirmPassword),
					this.isRequestFinish && (this.isRequestFinish = !1, this.$http.post("/v/user/reg", i, {
							emulateJSON: !0
						}).then(function (e) {
							this.isRequestFinish = !0,
							this.$cookie.set("account", this.vo.account),
							this.$store.dispatch("updateLogState", !0),
							window.location.href = "#/",
							D.default.App.showLoginNotice()
						}, function (e) {
							this.isRequest = !1,
							this.isRequestFinish = !0;
							var t = e.body;
							t instanceof Object || (t = JSON.parse(e.body)),
							this.$vux.alert.show({
								title: "注册失败！",
								content: t.msg
							})
						}))
				}),
				checkAccount: function () {
					this.isRequest || this.vo.account && this.$http.get("/v/user/checkUnique?type=0&val=" + this.vo.account).then(function (e) {
						e.body && this.$vux.alert.show({
							title: "提示",
							content: "账号已被注册"
						})
					}, function (e) {
						var t = e.body;
						t instanceof Object || (t = JSON.parse(e.body)),
						this.$vux.toast.show({
							type: "warn",
							text: t.msg
						})
					})
				},
				resetScroller: function () {
					var e = this;
					this.$nextTick(function () {
						e.$refs.scroller.reset()
					})
				},
				registerLimit: function () {
					var e = this;
					this.$http.get("/data/json/limit/registerLimit.json").then(function (t) {
						e.onlyfullName = t.body.onlyfullName,
						e.onlyfullPhone = t.body.onlyfullPhone,
						t.body.trailUserValidCode && (e.registerLimitType = t.body.trailUserValidCode)
					})
				}
			},
			created: function () {
				this.$http.get("/v/user/getRegLimit", {
					emulateJSON: !0
				}).then(function (e) {
					this.limit = e.body
				})
			},
			mounted: function () {
				var e = v.default.get("spreadCode");
				e && (this.readOnlySpreadCode = !0, this.vo.intrCode = e),
				(0, b.default)(".register").scroll({
					scrollY: !0,
					scrollX: !1,
					indicators: !0,
					bounce: !0
				}),
				(0, b.default)(".popup").scroll({
					scrollY: !0,
					scrollX: !1,
					indicators: !0,
					bounce: !0
				}),
				(0, b.default)(".click").on("tap", "div", function (e) {
					for (var t = e.target; "DIV" !== t.nodeName; )
						t = t.parentNode;
					t && b.default.trigger(t, "click")
				}),
				(0, b.default)(".weui_vcode").on("tap", "img", function (e) {
					for (var t = e.target; "IMG" !== t.nodeName; )
						t = t.parentNode;
					t && b.default.trigger(t, "click")
				}),
				this.registerLimit()
			}
		}
	},
	554: function (e, t) {
		"use strict";
		function i(e, t) {
			var i = {};
			if (n(e) && e.length > 0)
				for (var r, o, l, c = t ? s : a, u = e.split(/;\s/g), A = 0, d = u.length; A < d; A++) {
					if (l = u[A].match(/([^=]+)=/i), l instanceof Array)
						try {
							r = s(l[1]),
							o = c(u[A].substring(l[1].length + 1))
						} catch (e) {}
					else
						r = s(u[A]), o = "";
					r && (i[r] = o)
				}
			return i
		}
		function n(e) {
			return "string" == typeof e
		}
		function r(e) {
			return n(e) && "" !== e
		}
		function o(e) {
			if (!r(e))
				throw new TypeError("Cookie name must be a non-empty string")
		}
		function a(e) {
			return e
		}
		var l = e.exports,
		s = decodeURIComponent,
		c = encodeURIComponent;
		l.get = function (e, t) {
			o(e),
			t = "function" == typeof t ? {
				converter: t
			}
			 : t || {};
			var n = i(document.cookie, !t.raw);
			return (t.converter || a)(n[e])
		},
		l.set = function (e, t, i) {
			o(e),
			i = i || {};
			var n = i.expires,
			a = i.domain,
			l = i.path;
			i.raw || (t = c(String(t)));
			var s = e + "=" + t,
			u = n;
			return "number" == typeof u && (u = new Date, u.setDate(u.getDate() + n)),
			u instanceof Date && (s += "; expires=" + u.toUTCString()),
			r(a) && (s += "; domain=" + a),
			r(l) && (s += "; path=" + l),
			i.secure && (s += "; secure"),
			document.cookie = s,
			s
		},
		l.remove = function (e, t) {
			return t = t || {},
			t.expires = new Date(0),
			this.set(e, "", t)
		}
	},
	662: function (e, t, i) {
		t = e.exports = i(3)(),
		t.push([e.id, ".registerStyle .weui_cells{background-color:#efeff4!important}.registerStyle .weui_cell{background:#fff;margin:6px 10px;border:1px solid #c8c8c8;border-radius:6px}", ""])
	},
	663: function (e, t, i) {
		t = e.exports = i(3)(),
		t.push([e.id, ".agreement-switch[data-v-4a598a3d]{padding:10px 15px}.operation-wrapper[data-v-4a598a3d]{margin-top:10px}.operation-wrapper .operation[data-v-4a598a3d]{color:#888;font-weight:200}.operation-wrapper .right[data-v-4a598a3d]{float:right;padding-right:15px}.operation-wrapper .left[data-v-4a598a3d]{padding-left:15px}.login-tip[data-v-4a598a3d]{font-size:.23rem;color:#888;padding:10px 15px}.mui-button-row[data-v-4a598a3d]{margin:10px 0!important}.register .base-wrapper img[data-v-4a598a3d]{width:132px;height:42px}.register .base-wrapper .weui_cell_switch[data-v-4a598a3d]{font-size:12px}.register .base-wrapper p[data-v-4a598a3d]{margin-bottom:0!important}.register .red[data-v-4a598a3d]{color:red}.register .mui-button-row[data-v-4a598a3d]{margin-top:40px;margin-bottom:44px;width:100%}.register .mui-button-row .mui-btn[data-v-4a598a3d]{width:95%;height:40px}.register .weui_input[data-v-4a598a3d]{border:none!important;height:24px!important;margin-bottom:0!important;text-align:right}.register .weui_cell[data-v-4a598a3d]{height:44px}.register .weui_cell_ft img[data-v-4a598a3d]{float:left}.register .weui_vcode[data-v-4a598a3d]{line-height:44px;padding-right:14px!important}", ""])
	},
	804: function (e, t, i) {
		var n = i(662);
		"string" == typeof n && (n = [[e.id, n, ""]]);
		i(4)(n, {});
		n.locals && (e.exports = n.locals)
	},
	805: function (e, t, i) {
		var n = i(663);
		"string" == typeof n && (n = [[e.id, n, ""]]);
		i(4)(n, {});
		n.locals && (e.exports = n.locals)
	},
	1053: function (e, t) {
		e.exports = {
			render: function () {
				var e = this,
				t = e.$createElement,
				i = e._self._c || t;
				return i("div", [i("div", {
							staticClass: "register mui-scroll-wrapper padding_tabbar",
							staticStyle: {
								top: "46px"
							}
						}, [i("div", {
									staticClass: "mui-scroll"
								}, [i("div", {
											staticClass: "base-wrapper"
										}, [i("group", {
													staticClass: "registerStyle",
													attrs: {
														labelWidth: "80px"
													}
												}, ["" === e.limit.userAccountMessage || null === e.limit.userAccountMessage ? i("x-input", {
															ref: "account",
															attrs: {
																title: "用户账号",
																required: "",
																min: 4,
																max: 12,
																"is-type": e.accountValid,
																placeholder: "请输入4-12个字母及数字"
															},
															on: {
																"on-blur": e.checkAccount
															},
															model: {
																value: e.vo.account,
																callback: function (t) {
																	e.$set(e.vo, "account", t)
																},
																expression: "vo.account"
															}
														}) : e._e(), e._v(" "), "" !== e.limit.userAccountMessage && null !== e.limit.userAccountMessage ? i("x-input", {
															ref: "account",
															attrs: {
																title: "用户账号",
																required: "",
																min: 4,
																max: 12,
																"is-type": e.accountValid,
																placeholder: e.limit.userAccountMessage
															},
															on: {
																"on-blur": e.checkAccount
															},
															model: {
																value: e.vo.account,
																callback: function (t) {
																	e.$set(e.vo, "account", t)
																},
																expression: "vo.account"
															}
														}) : e._e(), e._v(" "), i("x-input", {
															ref: "password",
															attrs: {
																title: "登录密码",
																required: "",
																type: "password",
																min: 6,
																max: 12,
																placeholder: "请输入6-12位字母和数字"
															},
															model: {
																value: e.vo.password,
																callback: function (t) {
																	e.$set(e.vo, "password", t)
																},
																expression: "vo.password"
															}
														}), e._v(" "), i("x-input", {
															ref: "confirmPassword",
															attrs: {
																title: "确认密码",
																required: "",
																type: "password",
																min: 6,
																max: 12,
																"equal-with": e.vo.password,
																placeholder: "请再输入一次密码"
															},
															model: {
																value: e.vo.confirmPassword,
																callback: function (t) {
																	e.$set(e.vo, "confirmPassword", t)
																},
																expression: "vo.confirmPassword"
															}
														}), e._v(" "), e.limit.intrCode < 2 ? i("x-input", {
															ref: "intrCode",
															attrs: {
																title: "推广码",
																required: 1 == e.limit.intrCode,
																readonly: e.readOnlySpreadCode,
																placeholder: 1 == e.limit.intrCode ? "必填" : ""
															},
															model: {
																value: e.vo.intrCode,
																callback: function (t) {
																	e.$set(e.vo, "intrCode", t)
																},
																expression: "vo.intrCode"
															}
														}) : e._e(), e._v(" "), e.limit.vCode > 0 ? i("x-input", {
															ref: "vCode",
															staticClass: "weui_vcode",
															attrs: {
																title: "验证码",
																required: e.limit.vCode > 0
															},
															on: {
																"on-focus": e.refreshVcode
															},
															model: {
																value: e.vo.vCode,
																callback: function (t) {
																	e.$set(e.vo, "vCode", t)
																},
																expression: "vo.vCode"
															}
														}, [i("img", {
																	attrs: {
																		slot: "right",
																		src: e.src
																	},
																	on: {
																		click: e.refreshVcode
																	},
																	slot: "right"
																})]) : e._e()], 1), e._v(" "), i("group", {
													staticClass: "registerStyle",
													attrs: {
														title: "会员资料",
														labelWidth: "80px"
													}
												}, [2 !== e.limit.fullName ? i("x-input", {
															ref: "fullName",
															attrs: {
																title: "真实姓名",
																"is-type": e.chinaNameValid,
																required: 1 === e.limit.fullName,
																placeholder: "与您的真实姓名相同"
															},
															model: {
																value: e.vo.fullName,
																callback: function (t) {
																	e.$set(e.vo, "fullName", t)
																},
																expression: "vo.fullName"
															}
														}) : e._e(), e._v(" "), e.limit.fundPwd < 2 ? i("x-input", {
															ref: "fundPwd",
															attrs: {
																title: "取款密码",
																required: 1 === e.limit.fundPwd,
																type: "number",
																min: 4,
																max: 4,
																placeholder: "4位纯数字"
															},
															model: {
																value: e.vo.fundPwd,
																callback: function (t) {
																	e.$set(e.vo, "fundPwd", "string" == typeof t ? t.trim() : t)
																},
																expression: "vo.fundPwd"
															}
														}) : e._e(), e._v(" "), e.limit.birthday < 2 ? i("datetime", {
															attrs: {
																"min-year": 1900,
																title: "出生日期"
															},
															model: {
																value: e.vo.birthday,
																callback: function (t) {
																	e.$set(e.vo, "birthday", t)
																},
																expression: "vo.birthday"
															}
														}) : e._e(), e._v(" "), e.limit.email < 2 ? i("x-input", {
															ref: "email",
															attrs: {
																title: "邮箱",
																"is-type": "email",
																required: 1 === e.limit.email
															},
															model: {
																value: e.vo.email,
																callback: function (t) {
																	e.$set(e.vo, "email", t)
																},
																expression: "vo.email"
															}
														}) : e._e(), e._v(" "), e.limit.phone < 2 ? i("x-input", {
															ref: "phone",
															attrs: {
																title: "手机号码",
																max: 11,
																required: 1 === e.limit.phone,
																placeholder: "请输入11位手机号码"
															},
															model: {
																value: e.vo.phone,
																callback: function (t) {
																	e.$set(e.vo, "phone", t)
																},
																expression: "vo.phone"
															}
														}) : e._e(), e._v(" "), e.limit.qq < 2 ? i("x-input", {
															ref: "qq",
															attrs: {
																title: "QQ",
																type: "number",
																required: 1 === e.limit.qq
															},
															model: {
																value: e.vo.qq,
																callback: function (t) {
																	e.$set(e.vo, "qq", t)
																},
																expression: "vo.qq"
															}
														}) : e._e(), e._v(" "), e.limit.weixin < 2 ? i("x-input", {
															ref: "weixin",
															attrs: {
																title: "微信账号",
																placeholder: e.limit.wechatPlaceholder,
																required: 1 === e.limit.weixin
															},
															model: {
																value: e.vo.weixin,
																callback: function (t) {
																	e.$set(e.vo, "weixin", t)
																},
																expression: "vo.weixin"
															}
														}) : e._e()], 1), e._v(" "), i("div", {
													staticClass: "agreement-switch"
												}, [i("MXCheckBox", {
															model: {
																value: e.agree,
																callback: function (t) {
																	e.agree = t
																},
																expression: "agree"
															}
														}, [e._v("我已年满18周岁，并且同意接受")]), i("a", {
															on: {
																click: function (t) {
																	e.showAgreement = !0
																}
															}
														}, [e._v("《开户协议》")])], 1)], 1), e._v(" "), i("div", {
											staticClass: "mui-button-row"
										}, [i("button", {
													staticClass: "mui-btn mui-btn-danger",
													staticStyle: {
														"font-size": "18px"
													},
													attrs: {
														disabled: !e.agree,
														type: "button"
													},
													on: {
														click: e.reg
													}
												}, [e._v("立即注册")])]), e._v(" "), i("div", {
											staticClass: "mui-button-row"
										}, [i("button", {
													staticClass: "mui-btn big-warning-text",
													attrs: {
														type: "button"
													},
													on: {
														click: function (t) {
															e.toLogin()
														}
													}
												}, [e._v("已有帐号，直接登录")])]), e._v(" "), i("div", {
											staticClass: "mui-button-row"
										}, [i("button", {
													staticClass: "mui-btn big-warning-text",
													attrs: {
														type: "button"
													},
													on: {
														click: function (t) {
															0 === e.registerLimitType ? e.registTest() : e.href2("/registTest")
														}
													}
												}, [e._v("免费试玩")])]), e._v(" "), i("div", {
											staticClass: "operation-wrapper"
										}, [i("a", {
													staticClass: "left operation",
													attrs: {
														href: e.AppStatus.zxkfPath
													}
												}, [e._v("在线客服")])])])]), e._v(" "), i("agree-ment-popup", {
							attrs: {
								title: "用户协议"
							},
							on: {
								"close-popup": function (t) {
									e.showAgreement = !1
								}
							},
							model: {
								value: e.showAgreement,
								callback: function (t) {
									e.showAgreement = t
								},
								expression: "showAgreement"
							}
						}), e._v(" "), i("div", {
							staticClass: "vux-popup-mask"
						})], 1)
			},
			staticRenderFns: []
		}
	},
	1187: function (e, t, i) {
		i(805),
		i(804);
		var n = i(2)(i(452), i(1053), "data-v-4a598a3d", null);
		e.exports = n.exports
	}
});
