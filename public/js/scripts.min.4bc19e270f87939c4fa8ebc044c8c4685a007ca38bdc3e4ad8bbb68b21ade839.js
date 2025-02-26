!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Lightense=t():e.Lightense=t()}(window,function(){return t={},e.m=n=[function(e){function s(e,t){var n,s=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),s.push.apply(s,n)),s}function n(e){for(var t,n=1;n<arguments.length;n++)t=null!=arguments[n]?arguments[n]:{},n%2?s(Object(t),!0).forEach(function(n){var s,o=e,i=t[s=n];s in o?Object.defineProperty(o,s,{value:i,enumerable:!0,configurable:!0,writable:!0}):o[s]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))});return e}function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=function(){"use strict";var c,s=window,t=document,r={time:300,padding:40,offset:40,keyboard:!0,cubicBezier:"cubic-bezier(.2, 0, .1, 1)",background:"var(--bg-color-80, rgba(255, 255, 255, .98))",zIndex:1e6,beforeShow:void 0,afterShow:void 0,beforeHide:void 0,afterHide:void 0},e={};function a(t){var n=e[t];if(n){if("function"!=typeof n)throw"config.".concat(t," must be a function!");Reflect.apply(n,e,[e])}}function l(o){o.src&&!o.classList.contains("lightense-target")&&(o.classList.add("lightense-target"),o.addEventListener("click",function(c){return e.keyboard&&(c.metaKey||c.ctrlKey)?s.open(o.src,"_blank"):void function(o){if(e.target=o,e.target.classList.contains("lightense-open"))return i();a("beforeShow"),e.scrollY=s.scrollY,function(e,t,n){e.addEventListener(t,function s(o){Reflect.apply(n,this,o),e.removeEventListener(t,s)})}(e.target,"transitionend",function(){a("afterShow")});var c=new Image;c.onload=function(){!function(n){var c=n.width,h=n.height,f=s.pageYOffset||t.documentElement.scrollTop||0,p=s.pageXOffset||t.documentElement.scrollLeft||0,o=e.target.getBoundingClientRect(),u=c/o.width,a=s.innerWidth||t.documentElement.clientWidth||0,l=s.innerHeight||t.documentElement.clientHeight||0,i=e.target.getAttribute("data-lightense-padding")||e.target.getAttribute("data-padding")||e.padding,m=i<a?a-i:a-r.padding,d=i<l?l-i:l-r.padding,g=c/h,v=m/d;e.scaleFactor=c<m&&h<d?u:g<v?d/h*u:m/c*u;var b=a/2,j=f+l/2,y=o.left+p+o.width/2,_=o.top+f+o.height/2;e.translateX=Math.round(b-y),e.translateY=Math.round(j-_)}(this),function(){e.target.classList.add("lightense-open"),e.wrap=t.createElement("div"),e.wrap.className="lightense-wrap",setTimeout(function(){e.target.style.transform="scale("+e.scaleFactor+")"},20),e.target.parentNode.insertBefore(e.wrap,e.target),e.wrap.appendChild(e.target),setTimeout(function(){e.wrap.style.transform="translate3d("+e.translateX+"px, "+e.translateY+"px, 0)"},20);var o={cubicBezier:e.target.getAttribute("data-lightense-cubic-bezier")||e.cubicBezier,background:e.target.getAttribute("data-lightense-background")||e.target.getAttribute("data-background")||e.background,zIndex:e.target.getAttribute("data-lightense-z-index")||e.zIndex},s=n(n({},e),o);d("lightense-images-css-computed",`
    :root {
      --lightense-z-index: `.concat(s.zIndex-1,`;
      --lightense-backdrop: `).concat(s.background,`;
      --lightense-duration: `).concat(s.time,`ms;
      --lightense-timing-func: `).concat(s.cubicBezier,`;
    }`)),e.container.style.visibility="visible",setTimeout(function(){e.container.style.opacity="1"},20)}(),s.addEventListener("keyup",h,!1),s.addEventListener("scroll",u,!1),e.container.addEventListener("click",i,!1)},c.src=e.target.src}(this)},!1))}function d(e,n){var s,o=t.head||t.getElementsByTagName("head")[0];t.getElementById(e)&&t.getElementById(e).remove(),s=t.createElement("style"),s.id=e,s.styleSheet?s.styleSheet.cssText=n:s.appendChild(t.createTextNode(n)),o.appendChild(s)}function i(){a("beforeHide"),s.removeEventListener("keyup",h,!1),s.removeEventListener("scroll",u,!1),e.container.removeEventListener("click",i,!1),e.target.classList.remove("lightense-open"),e.wrap.style.transform="",e.target.style.transform="",e.target.classList.add("lightense-transitioning"),e.container.style.opacity="",setTimeout(function(){a("afterHide"),e.container.style.visibility="",e.container.style.backgroundColor="",e.wrap.parentNode.replaceChild(e.target,e.wrap),e.target.classList.remove("lightense-transitioning")},e.time)}function u(){Math.abs(e.scrollY-s.scrollY)>=e.offset&&i()}function h(e){e.preventDefault(),27===e.keyCode&&i()}return function(s){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};c=function(e){switch(o(e)){case"undefined":throw"You need to pass an element!";case"string":return t.querySelectorAll(e);case"object":return e}}(s),e=n(n({},r),i),d("lightense-images-css",`
:root {
  --lightense-z-index: `.concat(e.zIndex-1,`;
  --lightense-backdrop: `).concat(e.background,`;
  --lightense-duration: `).concat(e.time,`ms;
  --lightense-timing-func: `).concat(e.cubicBezier,`;
}

.lightense-backdrop {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: calc(var(--lightense-z-index) - 1);
  padding: 0;
  margin: 0;
  transition: opacity var(--lightense-duration) ease;
  cursor: zoom-out;
  opacity: 0;
  background-color: var(--lightense-backdrop);
  visibility: hidden;
}

@supports (-webkit-backdrop-filter: blur(30px)) {
  .lightense-backdrop {
    background-color: var(--lightense-backdrop);
    -webkit-backdrop-filter: blur(30px);
  }
}

@supports (backdrop-filter: blur(30px)) {
  .lightense-backdrop {
    background-color: var(--lightense-backdrop);
    backdrop-filter: blur(30px);
  }
}

.lightense-wrap {
  position: relative;
  transition: transform var(--lightense-duration) var(--lightense-timing-func);
  z-index: var(--lightense-z-index);
  pointer-events: none;
}

.lightense-target {
  cursor: zoom-in;
  transition: transform var(--lightense-duration) var(--lightense-timing-func);
  pointer-events: auto;
}

.lightense-open {
  cursor: zoom-out;
}

.lightense-transitioning {
  pointer-events: none;
}`)),t.querySelector(".lightense-backdrop")||(e.container=t.createElement("div"),e.container.className="lightense-backdrop",t.body.appendChild(e.container)),function(e){var t,n=e.length;if(n)for(t=0;t<n;t++)l(e[t]);else l(e)}(c)}}();e.exports=i}],e.c=t,e.d=function(t,n,s){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:s})},e.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o,s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(o in t)e.d(s,o,function(e){return t[e]}.bind(null,o));return s},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e.p="",e(e.s=0);function e(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return n[s].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var t,n}),!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).reframe=t()}(this,function(){"use strict";function e(){for(var n=0,e=0,s=arguments.length;e<s;e++)n+=arguments[e].length;for(var o=Array(n),i=0,e=0;e<s;e++)for(var a=arguments[e],t=0,r=a.length;t<r;t++,i++)o[i]=a[t];return o}return function(t,n){return void 0===n&&(n="js-reframe"),("string"==typeof t?e(document.querySelectorAll(t)):"length"in t?e(t):[t]).forEach(function(e){var t,s,o,i,a,r,c,l;-1!==e.className.split(" ").indexOf(n)||-1<e.style.width.indexOf("%")||(s=e.getAttribute("height")||e.offsetHeight,o=e.getAttribute("width")||e.offsetWidth,l=("string"==typeof s?parseInt(s):s)/("string"==typeof o?parseInt(o):o)*100,(i=document.createElement("div")).className=n,(c=i.style).position="relative",c.width="100%",c.paddingTop=l+"%",(t=e.style).position="absolute",t.width="100%",t.height="100%",t.left="0",t.top="0",null!==(a=e.parentNode)&&void 0!==a&&a.insertBefore(i,e),null!==(r=e.parentNode)&&void 0!==r&&r.removeChild(e),i.appendChild(e))})}});var searchResults=document.getElementById("js-results-container"),searchInput=document.getElementById("js-search-input"),contextDive=170,timerUserInput=!1;function search(e){for(;searchResults.firstChild;)searchResults.removeChild(searchResults.firstChild);0===e.length||e.length<1?searchResults.style.display="none":(searchResults.style.display="block",getJSON("/index.json",function(t){var n=[];let s=new RegExp(e,"i");t.forEach(function(e){(e.title.match(s)||e.content.match(s))&&n.push(e)}),n.length>0?(searchResults.appendChild(htmlToElement('<h4 class="search-counter col col-12 animate">Found: '.concat(n.length,"</h4>"))),n.forEach(function(t,n){let s=t.content.toLowerCase().indexOf(e.toLowerCase()),o=s+e.length,a=s-contextDive;a>0?(a=t.content.indexOf(" ",a)+1)<s?s=a:s-=contextDive/2:s=0;let r=o+contextDive;r<t.content.length?-1!==(r=t.content.indexOf(" ",r))?o=r:o+=contextDive/2:o=t.content.length-1;let i=t.content.substring(s,o);0!==s&&(i="...".concat(i)),o!==t.content.length-1&&(i=i.concat("..."));let c="".concat('<div class="article col col-12 animate" id="search-summary-',n,'" >').concat('<h2 class="article__title"><a href="',t.permalink,'">',t.title,' <i class="fa-solid fa-arrow-right"></i></a></h2>').concat('<div class="article__meta"> <time class="article__date">',t.date,'</time> – <span class="article__minutes">',t.readingTime," min read</span> </div>").concat('<p class="article__excerpt">',i,"</p>").concat("</div>");searchResults.appendChild(htmlToElement(c))})):searchResults.appendChild(htmlToElement('<h3 class="no-results">No results found</h3>'))}))}function getJSON(e,t){let n=new XMLHttpRequest;n.open("GET",e),n.onload=function(){200===n.status?t(JSON.parse(n.responseText)):console.error("Some error processing ".concat(e,": ",n.status))},n.onerror=function(){console.error("Connection error: ".concat(n.status))},n.send()}function htmlToElement(e){let t=document.createElement("template");return e=e.trim(),t.innerHTML=e,t.content.firstChild}searchInput.addEventListener("keyup",function(){timerUserInput&&clearTimeout(timerUserInput),timerUserInput=setTimeout(function(){search(searchInput.value.trim())},100)})