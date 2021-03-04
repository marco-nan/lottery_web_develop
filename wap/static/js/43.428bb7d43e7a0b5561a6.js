webpackJsonp([43,55],{118:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(108);e.default={mixins:[i.childMixin],props:{activeClass:String,disabled:Boolean},computed:{style:function(){return{borderWidth:this.$parent.lineWidth+"px",borderColor:this.$parent.activeColor,color:this.currentSelected?this.$parent.activeColor:this.disabled?this.$parent.disabledColor:this.$parent.defaultColor,border:this.$parent.animate?"none":"auto"}}}}},119:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(108);e.default={mixins:[i.parentMixin],mounted:function(){var t=this;this.$nextTick(function(){setTimeout(function(){t.hasReady=!0},0)})},props:{lineWidth:{type:Number,default:3},activeColor:String,barActiveColor:String,defaultColor:String,disabledColor:String,animate:{type:Boolean,default:!0}},computed:{barLeft:function(){return this.currentIndex*(100/this.number)+"%"},barRight:function(){return(this.number-this.currentIndex-1)*(100/this.number)+"%"},barStyle:function(){return{left:this.barLeft,right:this.barRight,display:"block",backgroundColor:this.barActiveColor||this.activeColor,height:this.lineWidth+"px",transition:this.hasReady?null:"none"}},barClass:function(){return{"vux-tab-ink-bar-transition-forward":"forward"===this.direction,"vux-tab-ink-bar-transition-backward":"backward"===this.direction}}},watch:{currentIndex:function(t,e){this.direction=t>e?"forward":"backward",this.$emit("on-index-change",t,e)}},data:function(){return{direction:"forward",right:"100%",hasReady:!1}}}},121:function(t,e,a){e=t.exports=a(3)(),e.push([t.id,".vux-tab-ink-bar{position:absolute;height:2px;bottom:0;left:0;background-color:#04be02}.vux-tab-ink-bar-transition-forward{transition:right .3s cubic-bezier(.35,0,.25,1),left .3s cubic-bezier(.35,0,.25,1) .09s}.vux-tab-ink-bar-transition-backward{transition:right .3s cubic-bezier(.35,0,.25,1) .09s,left .3s cubic-bezier(.35,0,.25,1)}.vux-tab{display:-ms-flexbox;display:flex;background-color:#fff;height:44px;position:relative}.vux-tab button{padding:0;border:0;outline:0;background:0 0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.vux-tab .vux-tab-item{display:block;-ms-flex:1;flex:1;width:100%;height:100%;box-sizing:border-box;background:linear-gradient(180deg,#e5e5e5,#e5e5e5,hsla(0,0%,90%,0)) 0 100% no-repeat;background-size:100% 1px;font-size:14px;text-align:center;line-height:44px;color:#666}.vux-tab .vux-tab-item.vux-tab-selected{color:#04be02;border-bottom:3px solid #04be02}.vux-tab .vux-tab-item.vux-tab-disabled{color:#ddd}.vux-tab.vux-tab-no-animate .vux-tab-item.vux-tab-selected{background:0 0}",""])},123:function(t,e,a){var i=a(121);"string"==typeof i&&(i=[[t.id,i,""]]);a(4)(i,{});i.locals&&(t.exports=i.locals)},125:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"vux-tab",class:{"vux-tab-no-animate":!t.animate}},[t._t("default"),t._v(" "),t.animate?a("div",{staticClass:"vux-tab-ink-bar",class:t.barClass,style:t.barStyle}):t._e()],2)},staticRenderFns:[]}},126:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"vux-tab-item",class:[t.currentSelected?t.activeClass:"",{"vux-tab-selected":t.currentSelected,"vux-tab-disabled":t.disabled}],style:t.style,on:{click:t.onItemClick}},[t._t("default")],2)},staticRenderFns:[]}},128:function(t,e,a){var i=a(2)(a(118),a(126),null,null);t.exports=i.exports},129:function(t,e,a){a(123);var i=a(2)(a(119),a(125),null,null);t.exports=i.exports},510:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=a(129),n=i(o),r=a(128),s=i(r),l=a(134),c=i(l),d=a(39),u=i(d);e.default={components:{Tab:n.default,TabItem:s.default,SimpleChoosePopup:c.default},data:function(){return{ruleHtml:"",name:"一般体育说明",showChooseGamePopup:!1,betGameType:"ft",gameList:[{name:"一般体育说明",type:"yibantiyu"},{name:"足球",type:"zq"},{name:"篮球",type:"lq"},{name:"冰球",type:"bq"},{name:"棒球",type:"binqiu"},{name:"排球",type:"pq"},{name:"网球",type:"wq"}],tabType:"tygz",dataType:"yibantiyu"}},mounted:function(){(0,u.default)(".sports-rules-scroll-wrapper").scroll({scrollY:!0,scrollX:!1,indicators:!0,bounce:!0}),this.loadData()},methods:{loadData:function(){var t=this;this.$vux.loading.show({text:"加载中"}),this.$http.get("/sports/Rule/data/"+this.dataType+".html").then(function(e){t.ruleHtml=e.bodyText;var a=void 0,i=void 0;t.$http.get("/api/sports/getLowRateConfig").then(function(e){"null"===e.body||"fail"===e.body||null===e.body?a="<li>如果对此规则与条款的内容有任何疑义，请以公司的解释为准。 </li>":(i="<li>当赔率低于"+e.body.toFixed(2)+" 时（除了全场/半场让球，全场/半场大小赔率外，其他赔率都需减1再计算是否符合低赔率）,该注单不返水、不计算有效投注（综合过关注单除外）。</li>",a="<li>公司规定赛事赔率"+e.body.toFixed(2)+" 或低于"+e.body.toFixed(2)+" 系统默认不计算有效投注。 </li><li>如果对此规则与条款的内容有任何疑义，请以公司的解释为准。 </li>"),t.ruleHtml=t.ruleHtml.replace("<div id = 'h5ruleCommonly'></div>",a),t.ruleHtml=t.ruleHtml.replace("<div id = 'h5ruleMatch'></div>",i)}),(0,u.default)(".sports-rules-scroll-wrapper").scroll().scrollTo(0,0,400),t.$vux.loading.hide()}).catch(function(e){t.$vux.loading.hide(),e&&e.bodyText&&(t.ruleHtml=e.bodyText)})},selectGame:function(t){this.dataType=t.type,this.loadData()},switchTab:function(t){this.tabType=t,"tygz"===this.tabType?this.dataType="yibantiyu":this.dataType=t,this.loadData()}}}},650:function(t,e,a){e=t.exports=a(3)(),e.push([t.id,".rule-content[data-v-3a7b88a4]{padding:10px}.vux-tab[data-v-3a7b88a4]{background-color:#ef473a}.vux-tab .vux-tab-selected[data-v-3a7b88a4]{font-weight:500;font-size:16px}.trend-bottom[data-v-3a7b88a4]{width:100%;height:44px;position:fixed;bottom:0;z-index:2;background-color:#fff;box-shadow:0 -3px 20px #ccc}.trend-bottom span[data-v-3a7b88a4]{line-height:44px;padding-left:10px;color:#666;font-weight:100}.red-btn[data-v-3a7b88a4]{background:#e74c3c;color:#fff;height:33px;line-height:33px;border:0;outline:none;font-size:14px;border-radius:3px;padding:0 15px}.bet-btn[data-v-3a7b88a4]{float:right;margin-right:7px;margin-top:5px}.choose-game-btn[data-v-3a7b88a4]{background-color:#e67e22}",""])},791:function(t,e,a){var i=a(650);"string"==typeof i&&(i=[[t.id,i,""]]);a(4)(i,{});i.locals&&(t.exports=i.locals)},1039:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("tab",{attrs:{"active-color":"#fff","line-width":2,defaultColor:"#eee"}},[a("tab-item",{attrs:{selected:!0},on:{"on-item-click":function(e){t.switchTab("tygz")}}},[t._v("体育规则")]),t._v(" "),a("tab-item",{on:{"on-item-click":function(e){t.switchTab("gztk")}}},[t._v("规则与条款")]),t._v(" "),a("tab-item",{on:{"on-item-click":function(e){t.switchTab("way")}}},[t._v("赔率计算列表")])],1),t._v(" "),a("div",{staticClass:"mui-scroll-wrapper sports-rules-scroll-wrapper",staticStyle:{"margin-top":"90px","padding-bottom":"44px"}},[a("div",{staticClass:"mui-scroll"},[a("div",{staticClass:"rule-content",domProps:{innerHTML:t._s(t.ruleHtml)}})])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"tygz"===t.tabType,expression:"tabType === 'tygz'"}],staticClass:"trend-bottom"},[a("span",[t._v(t._s(t.name))]),t._v(" "),a("a",{staticClass:"red-btn bet-btn",attrs:{href:"#/sports/game/"+t.betGameType}},[t._v("去投一注")]),t._v(" "),a("a",{staticClass:"red-btn bet-btn choose-game-btn",on:{click:function(e){t.showChooseGamePopup=!0}}},[t._v("选择游戏")])]),t._v(" "),a("simple-choose-popup",{attrs:{title:"选择游戏",items:t.gameList,selectedItem:t.selectGame},on:{"close-popup":function(e){t.showChooseGamePopup=!1}},model:{value:t.showChooseGamePopup,callback:function(e){t.showChooseGamePopup=e},expression:"showChooseGamePopup"}}),t._v(" "),a("div",{staticClass:"vux-popup-mask"})],1)},staticRenderFns:[]}},1241:function(t,e,a){a(791);var i=a(2)(a(510),a(1039),"data-v-3a7b88a4",null);t.exports=i.exports}});