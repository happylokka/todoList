(function(t){function e(e){for(var o,s,r=e[0],l=e[1],c=e[2],d=0,f=[];d<r.length;d++)s=r[d],i[s]&&f.push(i[s][0]),i[s]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);u&&u(e);while(f.length)f.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],o=!0,r=1;r<n.length;r++){var l=n[r];0!==i[l]&&(o=!1)}o&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var o={},i={app:0},a=[];function s(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=o,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(n,o,function(e){return t[e]}.bind(null,o));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var u=l;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"3aff":function(t,e,n){},"3e0a":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var o=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:{backgroundImage:"url("+t.imgUrl+")"},attrs:{id:"app"}},[n("todoList")],1)},a=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-container",[n("el-header",[n("div",{staticClass:"timeBox"},[n("p",{staticClass:"date"},[t._v(t._s(t.date))]),n("p",{directives:[{name:"show",rawName:"v-show",value:t.flag,expression:"flag"}],staticClass:"time",on:{dblclick:t.change}},[t._v(t._s(t.time))])]),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.flag,expression:"!flag"}],staticClass:"timeBox",on:{dblclick:t.change}},[n("p",[t._v(t._s(t.week))])]),n("div",{staticClass:"hello"},[n("p",[t._v(t._s(t.text))]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],ref:"name",class:{active:t.name},attrs:{type:"text"},domProps:{value:t.name},on:{keyup:function(e){if(!("button"in e)&&13!==e.keyCode)return null;t.named()},input:function(e){e.target.composing||(t.name=e.target.value)}}})])]),n("el-main",[0==t.todolist.length?n("div",{staticClass:"taskBox"},[n("p",{staticClass:"title"},[t._v("今天想要完成的目标是？")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newtodo.content,expression:"newtodo.content"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.newtodo.content},on:{keyup:function(e){return"button"in e||13===e.keyCode?t.add(e):null},input:function(e){e.target.composing||t.$set(t.newtodo,"content",e.target.value)}}})]):n("div",{staticClass:"targetBox"},[n("i",{staticClass:"el-icon-plus",on:{click:t.addTopic}}),n("p",[t._v("进行中："+t._s(t.todolist.length))]),n("p",[t._v("已完成："+t._s(t.donenum))]),n("ul",{staticClass:"list-group"},t._l(t.todolist,function(e,o){return n("li",{key:o,staticClass:"list-group-item"},[n("el-checkbox",{attrs:{size:"mini"},model:{value:e.done,callback:function(n){t.$set(e,"done",n)},expression:"todo.done"}}),n("p",{class:{done:t.todolist[o].done},on:{dblclick:function(e){t.isDone(o)}}},[t._v(t._s(e.content))]),n("i",{staticClass:"el-icon-close",on:{click:function(e){t.del(o)}}})],1)}),0)])]),n("el-footer")],1),n("p",{staticClass:"author"},[t._v("CREATE BY LOKKA")])],1)},r=[],l=n("f499"),c=n.n(l),u=(n("7f7f"),{name:"todoList",data:function(){return{date:null,time:null,week:null,flag:!0,show:!0,name:"",newtodo:{content:"",done:!1},tt:10,todolist:[]}},created:function(){this.nowTime(),this.getWeek(new Date),this.name=JSON.parse(localStorage.getItem("name"))||this.name,this.todolist=JSON.parse(localStorage.getItem("data"))||this.todolist},mounted:function(){var t=this;setInterval(function(){t.nowTime()},1e3)},methods:{formatDateTime:function(t){var e=new Date(t).getFullYear(),n=new Date(t).getMonth()+1<10?"0"+(new Date(t).getMonth()+1):new Date(t).getMonth()+1,o=new Date(t).getDate()<10?"0"+new Date(t).getDate():new Date(t).getDate(),i=new Date(t).getHours()<10?"0"+new Date(t).getHours():new Date(t).getHours(),a=new Date(t).getMinutes()<10?"0"+new Date(t).getMinutes():new Date(t).getMinutes(),s=new Date(t).getSeconds()<10?"0"+new Date(t).getSeconds():new Date(t).getSeconds();this.date=e+"-"+n+"-"+o,this.time=i+":"+a+":"+s},getWeek:function(t){var e;0==t.getDay()&&(e="星期日"),1==t.getDay()&&(e="星期一"),2==t.getDay()&&(e="星期二"),3==t.getDay()&&(e="星期三"),4==t.getDay()&&(e="星期四"),5==t.getDay()&&(e="星期五"),6==t.getDay()&&(e="星期六"),this.week=e},nowTime:function(){this.formatDateTime(new Date)},change:function(){this.flag=!this.flag},empty:function(){alert(1)},add:function(){this.newtodo.content&&(this.todolist.push(this.newtodo),this.show=!this.show,this.newtodo={content:"",done:!1})},named:function(){this.$refs.name.blur()},del:function(t){this.todolist.splice(t,1)},isDone:function(t){this.todolist[t].done=!this.todolist[t].done},addTopic:function(){this.show=!this.show}},computed:{text:function(){return(new Date).getHours()>=12?"下午好，":"上午好，"},donenum:function(){return this.todolist.filter(function(t){return t.done}).length}},watch:{todolist:{handler:function(){localStorage.setItem("data",c()(this.todolist)),0==this.todolist.length&&(this.show=!0)},deep:!0},name:function(){localStorage.setItem("name",c()(this.name))}}}),d=u,f=(n("75f4"),n("2877")),p=Object(f["a"])(d,s,r,!1,null,"0d7c39a3",null);p.options.__file="todoList.vue";var h=p.exports,m=n("f2e8"),g={name:"app",data:function(){return{imgUrl:""}},components:{todoList:h},created:function(){var t=this;m("https://bing.ioliu.cn/v1/rand?w=1920&h=1200",null,function(e,n){e?console.error(e):t.imgUrl=n.data.url})}},v=g,w=(n("8564"),Object(f["a"])(v,i,a,!1,null,"5642f71d",null));w.options.__file="App.vue";var D=w.exports,y=(n("3aff"),n("c451"),n("5c96")),_=n.n(y);n("0fae");o["default"].use(_.a),o["default"].config.productionTip=!1,new o["default"]({render:function(t){return t(D)}}).$mount("#app")},"75f4":function(t,e,n){"use strict";var o=n("f406"),i=n.n(o);i.a},8564:function(t,e,n){"use strict";var o=n("3e0a"),i=n.n(o);i.a},c451:function(t,e){(function(t,e){var n=t.documentElement,o="orientationchange"in window?"orientationchange":"resize",i=function(){var t=n.clientWidth;t&&(n.style.fontSize=t>=750?"100px":t/640*100+"px")};t.addEventListener&&(e.addEventListener(o,i,!1),t.addEventListener("DOMContentLoaded",i,!1))})(document,window)},f406:function(t,e,n){}});
//# sourceMappingURL=app.e9367752.js.map