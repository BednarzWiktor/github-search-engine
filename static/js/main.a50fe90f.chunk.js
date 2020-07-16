(this["webpackJsonpgithub-search-engine"]=this["webpackJsonpgithub-search-engine"]||[]).push([[0],{35:function(e,r,t){e.exports={container:"Search_container__1vJAR",option:"Search_option__2X2jn",filters:"Search_filters__F1GTs"}},81:function(e,r,t){e.exports=t(97)},97:function(e,r,t){"use strict";t.r(r),t.d(r,"FeatureWrapper",(function(){return D}));var n=t(0),a=t.n(n),u=t(51),c=t(20),s=t(36),o=t(38),i={result:{users:[],repos:[]},isLoading:!1,error:{users:null,repos:null}},l=Object(s.b)({name:"search",initialState:i,reducers:{setResultByTarget:function(e,r){var t=r.payload,n=t.target,a=t.result;e.result[n]=a},setIsLoading:function(e,r){var t=r.payload.isLoading;e.isLoading=t},setErrorByTarget:function(e,r){var t=r.payload,n=t.target,a=t.error;e.error[n]=a}}}),p=l.actions,f=p.setResultByTarget,d=p.setIsLoading,g=p.setErrorByTarget,h=l.reducer,b={search:i},m=Object(c.c)({search:h}),y=Object(s.a)({reducer:m,devTools:!1,preloadedState:b,middleware:[o.a]}),v=t(43),O=t(23),E=t(45),j=function(e){return 403===e.status?"Too many requests, please wait before continuing search":(console.error(e),null)},w=Object(O.a)((function(e){return e.search.result.users}),(function(e){return e.search.result.repos}),(function(e){return e.search.isLoading}),(function(e,r,t){var n,a=(n=e)&&Array.isArray(n)?n.map((function(e){return{origin:"user",url:e.html_url,name:e.login}})):[],u=function(e){return e&&Array.isArray(e)?e.map((function(e){return{origin:"repo",url:e.html_url,name:e.name}})):[]}(r);return t?[]:Object(E.sortBy)([].concat(Object(v.a)(a),Object(v.a)(u)),(function(e){return e.name.toLowerCase()})).slice(0,50)})),x=Object(O.a)((function(e){return e.search.error.users}),(function(e){return e.search.error.repos}),(function(e,r){return e||r})),S=t(13),_=t.n(S),k=t(21),L=t(69),R=function(){var e=new L.a({baseUrl:"https://api.github.com"});return{getUsersByQuery:function(){var r=Object(k.a)(_.a.mark((function r(t){var n,a,u,c=arguments;return _.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=c.length>1&&void 0!==c[1]?c[1]:50,r.prev=1,r.next=4,e.search.users({q:"".concat(t,"+in:login"),per_page:n});case 4:return a=r.sent,u=a.data,r.abrupt("return",{payload:u,error:null});case 9:return r.prev=9,r.t0=r.catch(1),r.abrupt("return",{payload:null,error:j(r.t0)});case 12:case"end":return r.stop()}}),r,null,[[1,9]])})));return function(e){return r.apply(this,arguments)}}(),getReposByQuery:function(){var r=Object(k.a)(_.a.mark((function r(t){var n,a,u,c=arguments;return _.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=c.length>1&&void 0!==c[1]?c[1]:50,r.prev=1,r.next=4,e.search.repos({q:"".concat(t,"+in:name"),per_page:n});case 4:return a=r.sent,u=a.data,r.abrupt("return",{payload:u,error:null});case 9:return r.prev=9,r.t0=r.catch(1),r.abrupt("return",{payload:null,error:j(r.t0)});case 12:case"end":return r.stop()}}),r,null,[[1,9]])})));return function(e){return r.apply(this,arguments)}}()}}(),B=function(){var e=Object(k.a)(_.a.mark((function e(r,t){var n,a,u,c;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="users"===t?R.getUsersByQuery:R.getReposByQuery,e.next=3,n(r);case 3:if(a=e.sent,u=a.payload,c=a.error,!u){e.next=10;break}return e.abrupt("return",f({target:t,result:u.items}));case 10:return e.abrupt("return",g({target:t,error:c}));case 11:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}(),C=t(17),T=t(98),A=t(137),N=t(143),U=t(141),I=t(146),Q=t(142),q=t(144),F=t(132),J=t(136),G=function(e){switch(e.origin){case"repo":return a.a.createElement(F.a,null);case"user":return a.a.createElement(J.a,null);default:return null}},H=t(35),V=t.n(H),W=function(e){var r=e.combinedResults,t=e.getSearchResults,u=e.clearSearchResults,c=e.isLoading,s=e.error,o=e.clearError,i=Object(n.useState)(null),l=Object(C.a)(i,2),p=l[0],f=l[1],d=Object(n.useState)(""),g=Object(C.a)(d,2),h=g[0],b=g[1],m=Object(n.useState)(["users","repos"]),y=Object(C.a)(m,2),O=y[0],j=y[1],w=Object(n.useCallback)(Object(E.debounce)((function(e,r){return t(e,r)}),500),[]),x=function(){o()},S=function(e){return function(){var r=function(e,r){return e&&Array.isArray(e)?e.includes(r)?e.filter((function(e){return e!==r})):[].concat(Object(v.a)(e),[r]):[]}(O,e);b(""),u(),j(r)}};return Object(n.useEffect)((function(){p&&window.open(p.url,"_blank")}),[p]),a.a.createElement("div",{className:V.a.container},a.a.createElement("aside",{className:V.a.filters},a.a.createElement(T.a,{variant:"body1",component:"span"},"Search within:"),a.a.createElement("span",{className:V.a.filtersControls},a.a.createElement(A.a,{label:"Users",control:a.a.createElement(N.a,{checked:O.includes("users"),onChange:S("users"),name:"Users",color:"primary"})}),a.a.createElement(A.a,{label:"Repos",control:a.a.createElement(N.a,{checked:O.includes("repos"),onChange:S("repos"),name:"Repos",color:"primary"})}))),a.a.createElement("main",{className:V.a.input},a.a.createElement(Q.a,{value:p,onChange:function(e,r,t){f(r),"clear"===t&&u()},inputValue:h,onInputChange:function(e,r){s&&o(),b(r),r&&r.length>=3&&O&&O.length>0&&w(r,O)},options:r,getOptionLabel:function(e){return e.name},getOptionSelected:function(e){return e.url===(p&&p.url)},clearOnBlur:!1,loading:!!c,loadingText:"Fetching data...",disabled:0===O.length,renderInput:function(e){return a.a.createElement(U.a,Object.assign({},e,{error:!!s,label:"Search GitHub",variant:"outlined"}))},renderOption:function(e){return a.a.createElement("span",{className:V.a.option},a.a.createElement("span",null,e.name),a.a.createElement(G,{origin:e.origin}))}})),a.a.createElement(I.a,{open:!!s,onClose:x},a.a.createElement(q.a,{elevation:6,variant:"filled",onClose:x,severity:"error"},s)))},X={getSearchResults:function(e,r){return function(){var t=Object(k.a)(_.a.mark((function t(n){return _.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n(d({isLoading:!0})),!r.includes("users")){t.next=7;break}return t.t0=n,t.next=5,B(e,"users");case 5:t.t1=t.sent,(0,t.t0)(t.t1);case 7:if(!r.includes("repos")){t.next=13;break}return t.t2=n,t.next=11,B(e,"repos");case 11:t.t3=t.sent,(0,t.t2)(t.t3);case 13:n(d({isLoading:!1}));case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},clearSearchResults:function(){return function(e){e(f({target:"users",result:[]})),e(f({target:"repos",result:[]}))}},clearError:function(){return function(e){e(g({target:"users",error:null})),e(g({target:"repos",error:null}))}}},z=Object(u.b)((function(e){return{combinedResults:w(e),isLoading:e.search.isLoading,error:x(e)}}),X)((function(e){return a.a.createElement(W,e)})),D=(t(96),function(){return a.a.createElement(u.a,{store:y},a.a.createElement(z,null))})}},[[81,1,2]]]);
//# sourceMappingURL=main.a50fe90f.chunk.js.map