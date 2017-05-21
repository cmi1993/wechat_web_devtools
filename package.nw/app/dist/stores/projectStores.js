"use strict";function init(){function e(e){var t=0,r=void 0,o=void 0,i=void 0;if(0===e.length)return t;for(r=0,i=e.length;r<i;r++)o=e.charCodeAt(r),t=(t<<5)-t+o,t|=0;return t>0?t:0-t}function t(){var e=JSON.stringify(I);localStorage.setItem("projectLists",e),a.writeFile(O,e)}function r(e,t){if(t){var r=e.projectpath,o=i.join(__dirname,"../weapp/newquick/");try{var p=s.sync("./**/**",{cwd:o});p.forEach(function(e){var t=i.join(o,e),n=i.join(r,e),s=a.lstatSync(t);if(s.isDirectory())c.sync(n);else{var p=a.readFileSync(t);a.writeFileSync(n,p)}})}catch(e){n.error("projectStores.js initProject error "+e.toString())}}}function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},r=require("../actions/windowActions.js"),o="alert";r.showConfirm({content:e,type:o,callback:t})}var i=require("path"),a=require("fs"),n=require("../common/log/log.js"),s=require("glob"),c=require("mkdir-p"),p=require("../common/request/request.js"),h=require("../config/urlConfig.js"),u=require("../config/errcodeConfig.js"),f=(require("../weapp/commit/unpack.js"),require("../config/dirConfig.js")),l=require("../utils/file.js"),j=require("../utils/newReport.js"),g=require("./windowStores.js"),d=require("events").EventEmitter,P="last-select-project",S=require("../config/config.js"),_=S.SELECT_URL_TYPE,v=S.SELECT_UNKNOW_TYPE,m=0,E=+new Date,C=f.WeappProjectInfo;if(!C){var y=i.join(nw.App.getDataPath(),"..");C=i.join(y,"WeappProject")}var O=i.join(C,"projectinfo.json"),I=JSON.parse(localStorage.getItem("projectLists"))||[];a.writeFile(O,localStorage.getItem("projectLists")||"[]");var N={},w=null,A={},T=!1,D=parseInt(localStorage.getItem(P))||v,R={},L={Network:{RequestDomain:[],WsRequestDomain:[],UploadDomain:[],DownloadDomain:[]},Setting:{MaxLocalstorageSize:10,MaxCodeSize:5,MaxWebviewDepth:5,MaxBackgroundLifespan:300,MaxRequestConcurrent:5,MaxUploadConcurrent:1,MaxDownloadConcurrent:10,MaxFileStorageSize:100}};I.forEach(function(t){t.hash=e(t.projectid),void 0===t.es6&&(t.es6=!0),void 0===t.watcher&&(t.watcher=!0),void 0===t.saveBeforeCompile&&(t.saveBeforeCompile=!0),void 0===t.editWebview&&(t.editWebview=!0),void 0===t.postcss&&(t.postcss=!0),void 0===t.urlCheck&&(t.urlCheck=!0),void 0===t.newFeature&&(t.newFeature={show:!1,check:!1,time:Date.now()}),void 0===t.initPath&&(t.initPath={enable:!1,page:"",scene:"default",query:"",appid:"",referData:"",groupInfo:{}}),void 0===t.uploadPath&&(t.uploadPath={enable:!1,page:"",query:""}),void 0===t.libVersion&&(t.libVersion="1.1.0")});var q=function(e,r){if(!T){T=!0;var o=h.getWeappAttrURL,i=e.ext_appid?e.ext_appid:"",a=o+"?appid="+e.appid+"&ext_appid="+i+"&platform="+(e.platform?1:0)+"&_r="+Math.random();n.info("projectStores.js begin get projectAttr "+a);var s=e.ext_appid?e.ext_appid:e.appid;p({url:a,body:JSON.stringify({appid_list:[s]}),method:"post",needToken:1},function(o,a,c){if(T=!1,o)return n.error("projectStores.js end requestProjectAttr network error: "+JSON.stringify(o)),void r(o);n.info("projectStores.js end requestProjectAttr "+c);var p=void 0;try{p=JSON.parse(c)}catch(e){return n.error("projectStores.js end requestProjectAttr parse body error: "+c+" "+JSON.stringify(o)),void r("系统错误 "+c)}var h=p.baseresponse,u=h?parseInt(h.errcode):0;if(0===u){var f=p.attr_list[0],l=f.jsapi_list,j={};if(l&&l.length>0){for(var g=0;g<l.length;g++){var d=l[g];j[d.name]=d}delete f.jsapi_list,f.permission=j}var P=f.share_info;if(P&&P.length>0&&(delete f.share_info,f.groupList=P),i){var S=x.getProjectByHash(e.hash);S.extAppInfo={appid:s,app_nickname:f.appname,app_head_img:f.appicon_url},t()}r(null,f)}else n.error("projectStores.js setProjectConfig error "+u),r(u)})}},x=Object.assign({},d.prototype,{getLastSelect:function(){if(D===_||D===v)return parseInt(D);var e=this.getProjectByHash(D);if(e){var t="projectattr"+e.hash,r=void 0;try{r=JSON.parse(localStorage.getItem(t))}catch(e){return v}var o=e.isTourist;if(r||o)return x.setProjectConfig(e,function(){}),e}return v},setProjectType:function(e){D=e,localStorage.setItem(P,e)},getCurrentProject:function(){return w},getCurrentProjectConfig:function(){return w?this.getProjectConfig(w)||{}:{}},setProjectPostCss:function(e,r){var o=this.getProjectByHash(e);o.postcss=r,t()},setProjectEs6:function(e,r){var o=this.getProjectByHash(e);o.es6=r,t(),this.emit("PROJECT_STORES_CONFIG_CHANGE",o)},setProjectUrlCheck:function(e,r){var o=this.getProjectByHash(e);o.urlCheck=r,t(),this.emit("PROJECT_STORES_CONFIG_CHANGE",o)},setProjectMinified:function(e,r){var o=this.getProjectByHash(e);o.minified=r,t()},setProjectEditWebview:function(e,r){var o=this.getProjectByHash(e);o.editWebview=r,t(),this.emit("PROJECT_STORES_CHANGE_EDIT_WEBVIEW",o,r)},setProjectNewFeature:function(e,r){var o=this.getProjectByHash(e);o.newFeature=r,t(),this.emit("PROJECT_STORES_CONFIG_CHANGE",o)},setProjectWatcher:function(e,r){var o=this.getProjectByHash(e);o.watcher=r,t()},setProjectInitPath:function(e,r){var o=this.getProjectByHash(e);o.initPath=r,t()},setProjectUploadPath:function(e,r){var o=this.getProjectByHash(e);o.uploadPath=Object.assign({},o.uploadPath,r),t()},getProjectByHash:function(e){return e=parseInt(e),I.find(function(t){return t.hash===e})},getProjectByID:function(e){return I.find(function(t){return t.projectid===e})},getProjectList:function(){return I},addVerifyProject:function(e,t){},add:function(o,i){o.hash=e(o.projectid),o.es6=!0,o.watcher=!0,o.editWebview=!0,o.newFeature={time:Date.now(),show:!1,check:!1},o.initPath={enable:!1},o.uploadPath={enable:!1},I.unshift(o),r(o,i),t(),n.info("projectStores.js add "+JSON.stringify(o)),this.emit("ADD_PROJECT",I)},del:function(e){var r=I.findIndex(function(t){return t.projectid===e});if(r>-1){var o=I[r];delete localStorage["projectattr"+o.hash],delete localStorage["last-up-test-time-"+o.hash],delete localStorage["last-up-load-time-"+o.hash],delete localStorage["projectuserauth_"+o.hash],I.splice(r,1),t(),l.cleanProjectFile(o,!0),n.info("projectStores.js del "+e),this.emit("DEL_PROJECT",I),j("project_delete",o.appid)}},close:function(){this.emit("CLOSE_PROJECT")},restart:function(e){g.getEditorConfig("saveBeforeCompile")?this.emit("SAVE_ALL_AND_REBUILD",e):this.restartImmediate(e)},restartImmediate:function(e){m++,this.emit("RESTART_PROJECT",e),j("project_compile",e.appid)},getRestartInfo:function(){return{projectRestartNum:m,projectBeginTime:E}},getProjectConfig:function(e){return N[e.hash]},setProjectConfig:function(e,t,r){var i=this;if("function"==typeof t&&(r=t,t={}),w=e,e.isTourist){var a=Object.assign({},L);return a.appid=e.appid,N[e.hash]=a,void r()}var s="projectattr"+e.hash,c=void 0,p=!1;try{c=JSON.parse(localStorage.getItem(s))}catch(e){n.error("projectStores.js setProjectConfig parse localStorage projectAttr error")}!t.refresh&&c&&c.permission&&(N[e.hash]=c,p=!0,r()),q(e,function(t,a){t?t===u.DEV_App_Not_Band?(o("当前开发者未绑定此 AppID ，请到 mp 后台操作后重试",function(){nw.Shell.openExternal("https://mp.weixin.qq.com/")}),n.error("projectStores.js setProjectConfig error "+t)):t===u.NOT_LOGIN||t===u.INVALID_TOKEN?o("登录态失效，请重新登录"):t===u.DEV_PLATFORM_INVALID_EXT_APPID?o("无效的 extAppID 请检查"):t===u.DEV_PLATFORM_EXT_APPID_NOT_AUTH?o("extAppID 未授权"):!p&&o("获取项目属性错误，错误码: "+t):(N[e.hash]=a,localStorage.getItem(s)!=JSON.stringify(a)&&(localStorage.setItem(s,JSON.stringify(a)),i.emit("PROJECT_STORES_CONFIG_CHANGE",e)),p||r()),i.emit("PROJECT_CONFIG_REFRESHED",N[e.hash])})},getSdkUserAuthStorage:function(e){if(A[e.hash])return A[e.hash];var t="projectuserauth_"+e.hash,r={};try{r=JSON.parse(localStorage.getItem(t))||{}}catch(e){localStorage.setItem(t,"{}"),n.error("projectStores.js getSdkUserAuthStorage parse localStorage Sdk error")}return A[e.hash]=r||{},A[e.hash]},setUserAuthPemissionStorage:function(e,t){A[e.hash]&&(A[e.hash]=t||{});var r="projectuserauth_"+e.hash;localStorage.setItem(r,JSON.stringify(t||{}))},setProjectScene:function(e,r){e.initPath||(e.initPath={}),e.initPath.scene=r,t()},setProjectExtAppid:function(e,r){var o=this.getProjectByHash(e);o&&(o.ext_appid=r,t())},setProjectExtAppInfo:function(e,t){var r=e.ext_appid,o=e.extAppInfo;r&&o&&r===o.appid?t(null):this.setProjectConfig(e,{refresh:!0},function(){t()})},setProjectLibVersion:function(e,r){var o=this.getProjectByHash(e);o&&o.libVersion!=r&&(o.libVersion=r,t(),x.restart(o),this.emit("ON_VENDOR_LIB_CHANGE",r))},resetProjectLibVersion:function(e){I.forEach(function(t){t.libVersion=e}),t(),this.emit("ON_VENDOR_LIB_CHANGE",e)},getProjectLocalStorage:function(e){var t={};if(R[e])t=R[e];else{var r=g.getUserInfo(),o=r?r.openid:"guest",n=this.getProjectByHash(e),s=n.appid,c=n.appname,p=i.join(f.WeappStorage,s+"_"+c+"_"+o+".data.json");try{t=JSON.parse(a.readFileSync(p,"utf8"))}catch(r){t={},this.setProjectLocalStorage(e,t)}R[e]=t}return t},setProjectLocalStorage:function(e,t){R[e]=t;try{var r=g.getUserInfo(),o=r?r.openid:"guest",s=this.getProjectByHash(e),c=s.appid,p=s.appname,h=i.join(f.WeappStorage,c+"_"+p+"_"+o+".data.json");a.writeFileSync(h,JSON.stringify(t),"utf8")}catch(e){n.error("projectStores.js setProjectLocalStorage catch error "+e)}}});_exports=x}var _exports;init(),module.exports=_exports;