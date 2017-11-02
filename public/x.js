!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=225)}({0:function(e,t,n){"use strict";function r(e){return"[object Array]"===C.call(e)}function o(e){return"[object ArrayBuffer]"===C.call(e)}function i(e){return"undefined"!=typeof FormData&&e instanceof FormData}function a(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function s(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return void 0===e}function l(e){return null!==e&&"object"==typeof e}function f(e){return"[object Date]"===C.call(e)}function p(e){return"[object File]"===C.call(e)}function h(e){return"[object Blob]"===C.call(e)}function d(e){return"[object Function]"===C.call(e)}function v(e){return l(e)&&d(e.pipe)}function g(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function w(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function m(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function y(e,t){if(null!==e&&void 0!==e)if("object"==typeof e||r(e)||(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function x(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=x(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)y(arguments[n],e);return t}function b(e,t,n){return y(t,function(t,r){e[r]=n&&"function"==typeof t?k(t,n):t}),e}var k=n(2),E=n(11),C=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:E,isFormData:i,isArrayBufferView:a,isString:s,isNumber:u,isObject:l,isUndefined:c,isDate:f,isFile:p,isBlob:h,isFunction:d,isStream:v,isURLSearchParams:g,isStandardBrowserEnv:m,forEach:y,merge:x,extend:b,trim:w}},1:function(e,t,n){"use strict";(function(t){function r(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var o=n(0),i=n(13),a={"Content-Type":"application/x-www-form-urlencoded"},s={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(3):void 0!==t&&(e=n(3)),e}(),transformRequest:[function(e,t){return i(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};s.headers={common:{Accept:"application/json, text/plain, */*"}},o.forEach(["delete","get","head"],function(e){s.headers[e]={}}),o.forEach(["post","put","patch"],function(e){s.headers[e]=o.merge(a)}),e.exports=s}).call(t,n(7))},10:function(e,t,n){"use strict";function r(e){var t=new a(e),n=i(a.prototype.request,t);return o.extend(n,a.prototype,t),o.extend(n,t),n}var o=n(0),i=n(2),a=n(12),s=n(1),u=r(s);u.Axios=a,u.create=function(e){return r(o.merge(s,e))},u.Cancel=n(6),u.CancelToken=n(26),u.isCancel=n(5),u.all=function(e){return Promise.all(e)},u.spread=n(27),e.exports=u,e.exports.default=u},11:function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}},12:function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new a,response:new a}}var o=n(1),i=n(0),a=n(21),s=n(22),u=n(24),c=n(25);r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,this.defaults,{method:"get"},e),e.method=e.method.toLowerCase(),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url));var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},i.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))}}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},13:function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},14:function(e,t,n){"use strict";var r=n(4);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},15:function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},16:function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(0);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var a=[];o.forEach(t,function(e,t){null!==e&&void 0!==e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),a.push(r(t)+"="+r(e))}))}),i=a.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},17:function(e,t,n){"use strict";var r=n(0);e.exports=function(e){var t,n,o,i={};return e?(r.forEach(e.split("\n"),function(e){o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t&&(i[t]=i[t]?i[t]+", "+n:n)}),i):i}},18:function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},19:function(e,t,n){"use strict";function r(){this.message="String contains an invalid character"}function o(e){for(var t,n,o=String(e),a="",s=0,u=i;o.charAt(0|s)||(u="=",s%1);a+=u.charAt(63&t>>8-s%1*8)){if((n=o.charCodeAt(s+=.75))>255)throw new r;t=t<<8|n}return a}var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",e.exports=o},2:function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},20:function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},21:function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(0);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},22:function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(0),i=n(23),a=n(5),s=n(1);e.exports=function(e){return r(e),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return a(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},225:function(e,t,n){e.exports=n(226)},226:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=n(9),s=n.n(a),u={containers:{container:"huntr",inner:"huntr-inner",button:"huntr-button",buttonText:"huntr-text",content:"huntr-content",reviews:"huntr-reviews",example:"huntr-example",header:"huntr-header",reviewLinks:"ph-review-link",productLinks:"ph-product-link"},slug:"",exampleWidget:!1,onlyShowOnParam:!1,showOnMobile:!0,reviewShow:!0,reviewText:"reviews",reviewColor:"rgba(0, 0, 0, 0.5)",ctaReviewText:"Write Review",brandingURL:"https://huntr.in/",brandingText:"powered by huntr.in",serverURL:window.localhost?"http://localhost:3000/":"https://huntr.in/",productURL:"https://www.producthunt.com/posts/",productData:"api/products/",stylesheet:"widget/app.css"},c=function(e){var t=window.huntr,n=e,r=!0,o=!1,i=void 0;try{for(var a,s=Object.keys(n)[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var u=a.value,c=t[u],l=n[u];void 0!==c&&(c!==l&&(n[u]=c))}}catch(e){o=!0,i=e}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}(u),l=function e(){r(this,e);var t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href=c.serverURL+c.stylesheet,t.media="all",document.getElementsByTagName("head")[0].appendChild(t)},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=function(){function e(){o(this,e),this.widgetSize(),window.addEventListener("resize",function(){this.widgetSize()}.bind(this))}return f(e,[{key:"widgetSize",value:function(){var e=this.getContentHeight();window.innerHeight,window.innerWidth;e<10&&(document.getElementById(c.containers.content).className="no-reviews",this.setContentHeight(86))}},{key:"getContentHeight",value:function(){var e=document.getElementById(c.containers.reviews),t=window.getComputedStyle(e),n=t.height.replace("px","");return parseInt(n)}},{key:"setContentHeight",value:function(e){document.getElementById(c.containers.inner).style.height=e+"px"}}]),e}(),h=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=function(){function e(t){if(i(this,e),this.productData=t,!t.error){var n=this.buttonMarkup()+'<div id="huntr-inner" class="'+this.getReviewCountClass()+'"><div id="huntr-content">'+this.widgetHeaderMarkup()+'<ul id="huntr-reviews">'+this.widgetReviewsMarkup()+"</ul></div>"+this.getBranding()+"</div>";this.appendMarkupToBody(n),this.reviewCountStyling(),this.setProductURL(),document.getElementById(c.containers.button).addEventListener("click",function(){this.openWidget(),new p}.bind(this)),c.exampleWidget&&this.startExampleWidget()}}return h(e,[{key:"openWidget",value:function(){document.getElementById(c.containers.button).classList.toggle("huntr-active"),document.getElementById(c.containers.inner).classList.toggle("huntr-active")}},{key:"startExampleWidget",value:function(){var e=this;setTimeout(function(){e.openWidget()},1e3)}},{key:"getBranding",value:function(){return'<a href="'+c.brandingURL+"?ref="+c.slug+'" target="_blank" class="huntr-branding">'+c.brandingText+"</a>"}},{key:"getReviewCountClass",value:function(){var e="one";return this.productData.reviews.count>0&&(e="two"),this.productData.reviews.count>1&&(e="three"),e}},{key:"getProductHuntLogo",value:function(){return'<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20" fill="#DA552F"></path><path d="M22.667 20H17v-6h5.667c1.656 0 3 1.343 3 3s-1.344 3-3 3m0-10H13v20h4v-6h5.667c3.866 0 7-3.134 7-7s-3.134-7-7-7" fill="#FFF"></path></g></svg>'}},{key:"getButtonAvatars",value:function(){var e="";return this.productData.reviews.count>0&&(e+='<li><img src="'+this.productData.reviews.list[0].avatar_url+'"></li>'),this.productData.reviews.count>1&&(e+='<li><img src="'+this.productData.reviews.list[1].avatar_url+'"></li>'),e+="<li>"+this.getProductHuntLogo()+"</li>"}},{key:"getSmiley",value:function(e){switch(e){case"positive":return'<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="#66BE00"><path d="M11 20.975c-5.5 0-9.975-4.475-9.975-9.975S5.5 1.025 11 1.025 20.975 5.5 20.975 11 16.5 20.975 11 20.975zM10.999 1.52c-5.227 0-9.48 4.252-9.48 9.48 0 5.228 4.253 9.48 9.48 9.48s9.48-4.252 9.48-9.48c0-5.228-4.253-9.48-9.48-9.48z" stroke="#7CBC00"></path><path d="M11.054 15.43a6.555 6.555 0 0 1-4.42-1.727.477.477 0 0 1 .648-.698 5.589 5.589 0 0 0 3.772 1.47 5.595 5.595 0 0 0 3.674-1.386.482.482 0 0 1 .673.04.482.482 0 0 1-.04.673 6.467 6.467 0 0 1-4.307 1.629zm5.585-5.682c.099.064.232-.01.232-.13v-.004a1.288 1.288 0 0 0-2.574 0v.005c0 .119.134.188.233.129a1.995 1.995 0 0 1 1.05-.298 1.92 1.92 0 0 1 1.059.298zm-9.174 0c.1.064.233-.01.233-.13v-.004a1.288 1.288 0 0 0-2.574 0v.005c0 .119.133.188.232.129a1.995 1.995 0 0 1 1.05-.298 1.93 1.93 0 0 1 1.06.298z"></path></g></svg>';case"neutral":return'<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="#999"><path d="M11 20.975c-5.5 0-9.975-4.475-9.975-9.975S5.5 1.025 11 1.025 20.975 5.5 20.975 11 16.5 20.975 11 20.975zM11 1.52c-5.228 0-9.48 4.252-9.48 9.48 0 5.228 4.252 9.48 9.48 9.48 5.228 0 9.48-4.252 9.48-9.48 0-5.228-4.252-9.48-9.48-9.48z" stroke="#999"></path><path d="M16.09 9.347a1.024 1.024 0 1 1-2.05 0c0-.57.46-1.025 1.024-1.025a1.017 1.017 0 0 1 1.025 1.025zm-8.125 0a1.028 1.028 0 0 1-2.054 0c0-.57.46-1.025 1.03-1.025a1.02 1.02 0 0 1 1.024 1.025zm7.475 4.673H6.56a.475.475 0 0 1 0-.95h8.88a.475.475 0 0 1 0 .95z"></path></g></svg>';case"negative":return'<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="#F95353"><path d="M11 20.975c-5.5 0-9.975-4.475-9.975-9.975S5.5 1.025 11 1.025 20.975 5.5 20.975 11 16.5 20.975 11 20.975zM11 1.52c-5.228 0-9.48 4.252-9.48 9.48 0 5.228 4.252 9.48 9.48 9.48 5.228 0 9.48-4.252 9.48-9.48 0-5.228-4.252-9.48-9.48-9.48z" stroke="#F95353"></path><path d="M4.317 9.97a.339.339 0 0 1-.164-.044.32.32 0 0 1-.108-.436c.534-.9 1.505-1.5 2.435-1.48a.319.319 0 0 1 .312.322.318.318 0 0 1-.317.312h-.03c-.697 0-1.44.465-1.85 1.168a.335.335 0 0 1-.278.158zm13.366 0a.315.315 0 0 1-.272-.153c-.416-.703-1.159-1.168-1.857-1.168h-.03a.315.315 0 0 1-.316-.312.316.316 0 0 1 .312-.322c.916-.02 1.9.58 2.435 1.48.09.149.04.347-.113.436a.341.341 0 0 1-.159.04zm-3.099 1.565a.093.093 0 0 0-.134.099c.12.584.694 1.03 1.387 1.03.698 0 1.272-.446 1.39-1.03.016-.075-.064-.139-.133-.1a2.55 2.55 0 0 1-1.257.322 2.585 2.585 0 0 1-1.253-.321zm-9.678 0c-.07-.035-.149.024-.134.099.114.584.693 1.03 1.391 1.03.698 0 1.273-.446 1.387-1.03.014-.075-.065-.139-.134-.1a2.55 2.55 0 0 1-1.258.322 2.6 2.6 0 0 1-1.252-.321zm9.5 5.064c.297.05.5-.297.302-.525-.861-1-2.203-1.638-3.708-1.638-1.505 0-2.847.643-3.708 1.638-.198.228.005.575.302.525A21.819 21.819 0 0 1 11 16.342c1.228.005 2.381.094 3.406.257z"></path></g></svg>'}}},{key:"getUserSmiley",value:function(e){return e.positive_vote>0?this.getSmiley("positive"):e.neutral_vote>0?this.getSmiley("neutral"):e.negative_vote>0?this.getSmiley("negative"):void 0}},{key:"setProductURL",value:function(){for(var e=document.getElementsByClassName(c.containers.reviewLinks),t=document.getElementsByClassName(c.containers.productLinks),n=0;n<e.length;n++)e.item(n).setAttribute("href",c.productURL+c.slug+"/reviews");for(var n=0;n<t.length;n++)t.item(n).setAttribute("href",c.productURL+c.slug)}},{key:"reviewCountStyling",value:function(){var e=document.getElementById(c.containers.buttonText);e.style.display=c.reviewShow?"block":"none",e.style.color=c.reviewColor}},{key:"getReviewButtonText",value:function(){var e=c.reviewText;return"reviews"==e&&1==this.productData.reviews.count&&(e="review"),e}},{key:"appendMarkupToBody",value:function(e){var t=document.createElement("div");t.innerHTML=e,c.exampleWidget?document.getElementById(c.containers.example).innerHTML=e:document.body.appendChild(t)}},{key:"buttonMarkup",value:function(){return'<div id="huntr-button"><ul>'+this.getButtonAvatars()+'</ul><span id="huntr-text" class="'+this.getReviewCountClass()+'"><em>'+this.productData.reviews.count+"</em> "+this.getReviewButtonText()+"</span></div>"}},{key:"widgetHeaderMarkup",value:function(){return'<div id="huntr-header"><div class="huntr-choices"><a target="_blank" class="ph-review-link huntr-positive">'+this.getSmiley("positive")+"<span>"+this.productData.positive_votes+'</span></a><a target="_blank" class="ph-review-link huntr-neutral">'+this.getSmiley("neutral")+"<span>"+this.productData.neutral_votes+'</span></a><a target="_blank" class="ph-review-link huntr-negative">'+this.getSmiley("negative")+"<span>"+this.productData.negative_votes+'</span></a></div><a target="_blank" class="ph-product-link huntr-cta huntr-upvote"><span>'+this.productData.upvotes+'</span></a><a target="_blank" class="ph-review-link huntr-cta huntr-review">'+c.ctaReviewText+"</a></div>"}},{key:"widgetReviewsMarkup",value:function(){for(var e=this.productData.reviews.list,t="",n=0;n<e.length;n++)t+='<li><div class="huntr-reaction positive">'+this.getUserSmiley(e[n])+'</div><div class="huntr-person"><img src="'+e[n].avatar_url+'" alt="Avatar"><a href="https://producthunt.com/@'+e[n].product_hunt_username+'" target="_blank">'+e[n].user_name+"</a>"+e[n].user_title+'</div><div class="huntr-review"><p><strong>Pros:</strong> '+e[n].pros+"</p><p><strong>Cons:</strong> "+e[n].cons+'</p><p class="under">'+e[n].review+"</p></div></li>";return t}}]),e}();new l;var v=!0;window.innerWidth<850&&!c.showOnMobile&&(v=!1),c.onlyShowOnParam&&(window.location.href.indexOf("rel=producthunt")>-1||(v=!1)),v&&(window.axios=s.a,s.a.get(c.serverURL+c.productData+c.slug).then(function(e){new d(e.data)}))},23:function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},24:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},25:function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},26:function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(6);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r(function(t){e=t}),cancel:e}},e.exports=r},27:function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},3:function(e,t,n){"use strict";var r=n(0),o=n(14),i=n(16),a=n(17),s=n(18),u=n(4),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(19);e.exports=function(e){return new Promise(function(t,l){var f=e.data,p=e.headers;r.isFormData(f)&&delete p["Content-Type"];var h=new XMLHttpRequest,d="onreadystatechange",v=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in h||s(e.url)||(h=new window.XDomainRequest,d="onload",v=!0,h.onprogress=function(){},h.ontimeout=function(){}),e.auth){var g=e.auth.username||"",w=e.auth.password||"";p.Authorization="Basic "+c(g+":"+w)}if(h.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,h[d]=function(){if(h&&(4===h.readyState||v)&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in h?a(h.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?h.response:h.responseText,i={data:r,status:1223===h.status?204:h.status,statusText:1223===h.status?"No Content":h.statusText,headers:n,config:e,request:h};o(t,l,i),h=null}},h.onerror=function(){l(u("Network Error",e,null,h)),h=null},h.ontimeout=function(){l(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",h)),h=null},r.isStandardBrowserEnv()){var m=n(20),y=(e.withCredentials||s(e.url))&&e.xsrfCookieName?m.read(e.xsrfCookieName):void 0;y&&(p[e.xsrfHeaderName]=y)}if("setRequestHeader"in h&&r.forEach(p,function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete p[t]:h.setRequestHeader(t,e)}),e.withCredentials&&(h.withCredentials=!0),e.responseType)try{h.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){h&&(h.abort(),l(e),h=null)}),void 0===f&&(f=null),h.send(f)})}},4:function(e,t,n){"use strict";var r=n(15);e.exports=function(e,t,n,o,i){var a=new Error(e);return r(a,t,n,o,i)}},5:function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},6:function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},7:function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(l===setTimeout)return setTimeout(e,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function i(e){if(f===clearTimeout)return clearTimeout(e);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function a(){v&&h&&(v=!1,h.length?d=h.concat(d):g=-1,d.length&&s())}function s(){if(!v){var e=o(a);v=!0;for(var t=d.length;t;){for(h=d,d=[];++g<t;)h&&h[g].run();g=-1,t=d.length}h=null,v=!1,i(e)}}function u(e,t){this.fun=e,this.array=t}function c(){}var l,f,p=e.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(e){l=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(e){f=r}}();var h,d=[],v=!1,g=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];d.push(new u(e,t)),1!==d.length||v||o(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=c,p.addListener=c,p.once=c,p.off=c,p.removeListener=c,p.removeAllListeners=c,p.emit=c,p.prependListener=c,p.prependOnceListener=c,p.listeners=function(e){return[]},p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},9:function(e,t,n){e.exports=n(10)}});