(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-badge/u-badge"],{"0b94":function(t,e,u){"use strict";var i=u("6ff8"),n=u.n(i);n.a},"18df":function(t,e,u){"use strict";u.r(e);var i=u("4b0a"),n=u("67e2");for(var a in n)"default"!==a&&function(t){u.d(e,t,(function(){return n[t]}))}(a);u("0b94");var r,o=u("f0c5"),s=Object(o["a"])(n["default"],i["b"],i["c"],!1,null,"361197e0",null,!1,i["a"],r);e["default"]=s.exports},"4b0a":function(t,e,u){"use strict";var i;u.d(e,"b",(function(){return n})),u.d(e,"c",(function(){return a})),u.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,u=(t._self._c,0!==Number(t.value)||t.showZero||t.isDot),i=t.show&&u?t.__get_style([t.$u.addStyle(t.customStyle),t.badgeStyle]):null;t.$mp.data=Object.assign({},{$root:{m0:u,s0:i}})},a=[]},"67e2":function(t,e,u){"use strict";u.r(e);var i=u("81d8"),n=u.n(i);for(var a in i)"default"!==a&&function(t){u.d(e,t,(function(){return i[t]}))}(a);e["default"]=n.a},"6ff8":function(t,e,u){},"81d8":function(t,e,u){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(u("6bd2"));function n(t){return t&&t.__esModule?t:{default:t}}var a={name:"u-badge",mixins:[t.$u.mpMixin,i.default,t.$u.mixin],computed:{boxStyle:function(){var t={};return t},badgeStyle:function(){var e={};if(this.color&&(e.color=this.color),this.bgColor&&!this.inverted&&(e.backgroundColor=this.bgColor),this.absolute&&(e.position="absolute",this.offset.length)){var u=this.offset[0],i=this.offset[1]||u;e.top=t.$u.addUnit(u),e.right=t.$u.addUnit(i)}return e},showValue:function(){switch(this.numberType){case"overflow":return Number(this.value)>Number(this.max)?this.max+"+":this.value;case"ellipsis":return Number(this.value)>Number(this.max)?"...":this.value;case"limit":return Number(this.value)>999?Number(this.value)>=9999?Math.floor(this.value/1e4*100)/100+"w":Math.floor(this.value/1e3*100)/100+"k":this.value;default:return Number(this.value)}}}};e.default=a}).call(this,u("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-badge/u-badge-create-component',
    {
        'uni_modules/uview-ui/components/u-badge/u-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("18df"))
        })
    },
    [['uni_modules/uview-ui/components/u-badge/u-badge-create-component']]
]);
