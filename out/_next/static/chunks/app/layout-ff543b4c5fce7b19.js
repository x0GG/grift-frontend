(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{5402:function(e,n,t){Promise.resolve().then(t.bind(t,3404)),Promise.resolve().then(t.bind(t,775)),Promise.resolve().then(t.bind(t,211)),Promise.resolve().then(t.t.bind(t,8974,23)),Promise.resolve().then(t.t.bind(t,4382,23)),Promise.resolve().then(t.bind(t,485)),Promise.resolve().then(t.bind(t,5418)),Promise.resolve().then(t.bind(t,1224)),Promise.resolve().then(t.bind(t,3007)),Promise.resolve().then(t.bind(t,2612)),Promise.resolve().then(t.t.bind(t,9216,23)),Promise.resolve().then(t.t.bind(t,9593,23)),Promise.resolve().then(t.bind(t,7776)),Promise.resolve().then(t.t.bind(t,7712,23))},3404:function(e,n,t){"use strict";t.d(n,{ModalWork:function(){return d}});var i=t(7437),r=t(9403),a=t(7749),l=t(2088),s=t(8087),o=t(2265),c=t(9032),u=t.n(c);let d=()=>{let[e,n]=(0,o.useState)(!1),t=(0,s.useTranslations)("ModalWork");return(0,o.useEffect)(()=>n(!0),[]),e&&(0,i.jsxs)(l.u,{onClose:()=>n(!1),children:[(0,i.jsxs)("div",{className:u().content,children:[(0,i.jsx)(a.s,{className:u().coin}),(0,i.jsx)("div",{className:u().title,children:t("title")}),(0,i.jsx)("strong",{className:u().number,children:"1500"})]}),(0,i.jsx)(r.z,{onClick:()=>n(!1),children:t("button")})]})}},9403:function(e,n,t){"use strict";t.d(n,{z:function(){return u},h:function(){return d}});var i=t(7437);let r=e=>e.startsWith("http")||e.startsWith("https");var a=t(4839),l=t(7138),s=t(1595),o=t(3397),c=t.n(o);let u=e=>{let{children:n,href:t,icon:o,className:u,onClick:d,type:m="primary",..._}=e,h=(0,i.jsxs)(i.Fragment,{children:[n&&(0,i.jsx)("span",{children:n}),o&&(0,i.jsx)(s.Icon,{icon:o})]}),v={"data-type":m,className:(0,a.Z)(c().btn,u),onClick:d};return t?r(t)?(0,i.jsx)("a",{..._,...v,href:t,target:"_blank",rel:"noopener noreferrer",children:h}):(0,i.jsx)(l.default,{..._,...v,href:t,children:h}):(0,i.jsx)("button",{..._,...v,children:h})},d=e=>{let{children:n,...t}=e;return(0,i.jsx)("div",{...t,className:(0,a.Z)(c().group,t.className),children:n})}},7749:function(e,n,t){"use strict";t.d(n,{s:function(){return l}});var i=t(7437),r=t(7903),a=t(5109);let l=e=>{let{level:n,min:t,...l}=e,{level:s}=(0,r.G)();n&&(s=n);let o=(0,a.l)(s);return(0,i.jsx)("img",{...l,src:"/img/coins/".concat(o.id).concat(t?"_min":"",".png"),width:t?88:350,height:t?88:350,alt:o.name,draggable:!1})}},775:function(e,n,t){"use strict";t.d(n,{Exchange:function(){return _}});var i=t(7437);let r=[{name:"Binance",logo:(0,i.jsx)("img",{src:"/img/exchange/binance.svg",loading:"lazy",alt:"Binance"})},{name:"Bybit",logo:(0,i.jsx)("img",{src:"/img/exchange/bybit.svg",loading:"lazy",alt:"Bybit"})},{name:"OKX",logo:(0,i.jsx)("img",{src:"/img/exchange/okx.svg",loading:"lazy",alt:"OKX"})}];var a=t(6202),l=t(4839),s=t(2265),o=t(4269),c=t(1595),u=t(2088),d=t(5778),m=t.n(d);let _=()=>{let[e,n]=(0,s.useState)(!1),{exchange:t,setExchange:d}=(0,a.L)(),_={name:"Exchange",logo:(0,i.jsx)("img",{src:"/img/base-token.png",alt:"clicker"})};t>=0&&(_=r[t]);let h=e=>{d(e),n(!1)};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("button",{className:m().button,onClick:()=>n(!0),children:[(0,i.jsx)("div",{className:m().logo,children:_.logo}),(0,i.jsx)("span",{children:_.name}),(0,i.jsx)(c.Icon,{icon:"ph:caret-down-fill",className:m().caret})]}),e&&(0,i.jsxs)(u.u,{onClose:()=>n(!1),className:m().modal,full:!0,children:[(0,i.jsx)(o.X,{title:"Choose an exchange platform",txt:"To take full advantage of our application."}),(0,i.jsx)("ul",{className:m().list,children:r.map((e,n)=>{let{name:r,logo:a}=e;return(0,i.jsxs)("li",{onClick:()=>h(n),className:(0,l.Z)(m().item,{[m().active]:t===n}),children:[(0,i.jsx)("div",{className:m().itemLogo,children:a}),(0,i.jsx)("div",{className:m().itemName,children:r}),(0,i.jsx)(c.Icon,{icon:t===n?"ph:check":"ph:caret-right",className:m().chevron})]},n)})})]})]})}},211:function(e,n,t){"use strict";t.d(n,{GsapInit:function(){return u}});var i=t(2576),r=t(2265),a=t(750);let l=()=>{let e=(0,r.useCallback)(()=>{let e=document.documentElement;e.style.setProperty("--vw",.01*e.clientWidth+"px"),e.style.setProperty("--dvh",.01*window.innerHeight+"px"),e.style.setProperty("--svh",.01*e.clientHeight+"px"),e.style.setProperty("--lvh","1vh")},[]);(0,r.useEffect)(()=>e(),[e]),(0,a.OR)("resize",e)};var s=t(19),o=t(9582),c=t(1204);o.p8.registerPlugin(s.V),o.p8.registerPlugin(c.i),o.p8.defaults({ease:i.ki,duration:i.V7});let u=()=>(l(),null)},4269:function(e,n,t){"use strict";t.d(n,{X:function(){return s}});var i=t(7437),r=t(4839),a=t(5017),l=t.n(a);let s=e=>{let{title:n,txt:t,top:a,bottom:s,...o}=e;return(0,i.jsxs)("div",{...o,className:(0,r.Z)(l().heading,o.className),children:[a&&a,n&&(0,i.jsx)("div",{className:l().title,children:n}),t&&(0,i.jsx)("p",{className:l().txt,children:t}),s&&s]})}},1595:function(e,n,t){"use strict";t.d(n,{Icon:function(){return a}});var i=t(7437),r=t(9355);let a=e=>{let{...n}=e;return(0,i.jsx)(r.JO,{...n})}},2088:function(e,n,t){"use strict";t.d(n,{u:function(){return c}});var i=t(7437),r=t(4839),a=t(4887),l=t(1595),s=t(4501),o=t.n(s);let c=e=>{let{onClose:n,children:t,className:s,title:c,full:u}=e,d=()=>{n()},m=(0,i.jsxs)("div",{className:(0,r.Z)(o().overlay,{[o().overlayFull]:u}),children:[(0,i.jsxs)("div",{className:(0,r.Z)(o().modal,s,{[o().full]:u}),children:[(0,i.jsx)(()=>(0,i.jsx)("button",{className:o().close,onClick:d,type:"button",children:(0,i.jsx)(l.Icon,{icon:"ph:x"})}),{}),c&&(0,i.jsx)("div",{className:o().title,children:c}),t]}),(0,i.jsx)("div",{className:o().overlayClose,onClick:d})]});return a.createPortal(m,document.getElementById("modal-root"))}},485:function(e,n,t){"use strict";t.d(n,{Nav:function(){return _}});var i=t(7437);let r=e=>{let{id:n,title:t,...r}=e;return(0,i.jsxs)("svg",{...r,xmlns:"http://www.w3.org/2000/svg",children:[t&&(0,i.jsx)("title",{children:t}),(0,i.jsx)("use",{href:"/img/sprites.svg#".concat(n)})]})};var a=t(4839),l=t(8087),s=t(7138),o=t(6463),c=t(7749),u=t(6018),d=t.n(u);let m=e=>{let{to:n,title:t,children:r}=e,l=(0,o.usePathname)();return(0,i.jsx)("li",{className:(0,a.Z)(d().item,{[d().active]:n===l}),children:(0,i.jsxs)(s.default,{href:n,className:d().navLink,children:[(0,i.jsx)("div",{className:d().icon,children:r}),t]})})},_=()=>{let e=(0,l.useTranslations)("Navigation"),n=(0,o.usePathname)();return(0,i.jsxs)("nav",{className:d().nav,children:[(0,i.jsxs)("ul",{children:[(0,i.jsx)(m,{to:"/friends",title:e("friends"),children:(0,i.jsx)(r,{id:"friends",viewBox:"0 0 33 24"})}),(0,i.jsx)(m,{to:"/mine",title:e("mine"),children:(0,i.jsx)(r,{id:"mine",viewBox:"0 0 25 25"})}),(0,i.jsx)("li",{className:(0,a.Z)(d().play,{[d().active]:"/"===n}),children:(0,i.jsx)(s.default,{href:"/",title:e("clicker"),children:(0,i.jsx)(r,{id:"clicker",viewBox:"0 0 30 35"})})}),(0,i.jsx)(m,{to:"/earn",title:e("earn"),children:(0,i.jsx)(r,{id:"earn",viewBox:"0 0 30 24"})}),(0,i.jsx)(m,{to:"/airdrop",title:e("airdrop"),children:(0,i.jsx)(c.s,{})})]}),(0,i.jsx)(r,{id:"nav-corner",viewBox:"0 0 127 33",className:d().corner})]})}},5418:function(e,n,t){"use strict";t.d(n,{NoMobile:function(){return m}});var i=t(7437),r=t(4839),a=t(3797),l=t.n(a),s=t(8087),o=t(2265),c=t(750),u=t(6690),d=t.n(u);let m=()=>{let e=(0,s.useTranslations)("NoMobile"),n=(0,o.useCallback)(()=>{let e=document.documentElement;l()()?e.classList.remove("no-mobile"):e.classList.add("no-mobile")},[]);return(0,o.useEffect)(()=>n(),[n]),(0,c.OR)("resize",n),(0,i.jsxs)("div",{className:(0,r.Z)(d().layer,"no-mobile-layer"),children:[(0,i.jsx)("div",{className:d().title,children:e("title")}),(0,i.jsx)("p",{className:d().txt,children:e("txt")})]})}},1224:function(e,n,t){"use strict";t.d(n,{Params:function(){return v}});var i=t(7437),r=t(5090),a=t(2265),l=t(4269),s=t(1595),o=t(2088),c=t(1328),u=t.n(c);let d=e=>{let{...n}=e;return(0,i.jsxs)("div",{className:u().check,children:[(0,i.jsx)("input",{...n,type:"checkbox"}),(0,i.jsx)("label",{htmlFor:n.id})]})};var m=t(156),_=t.n(m);let h=e=>{let{icon:n,title:t,desc:r,checked:a,onChange:l}=e;return(0,i.jsxs)("li",{className:_().item,children:[(0,i.jsx)("div",{className:_().illu,children:(0,i.jsx)(s.Icon,{icon:n})}),(0,i.jsxs)("div",{className:_().txt,children:[(0,i.jsx)("strong",{children:t}),r&&(0,i.jsx)("small",{children:r})]}),(0,i.jsx)(d,{id:n,checked:a,onChange:l})]})},v=()=>{let[e,n]=(0,a.useState)(!1),{vibration:t,tapAnimation:c,numberAnimaton:u,toggleVibration:d,toggleTapAnimation:m,toggleNumberAnimation:v}=(0,r.F)();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("button",{className:_().button,onClick:()=>n(!0),children:(0,i.jsx)(s.Icon,{icon:"material-symbols:settings"})}),e&&(0,i.jsxs)(o.u,{onClose:()=>n(!1),className:_().modal,children:[(0,i.jsx)(l.X,{title:"Application setting",txt:"Change your settings."}),(0,i.jsx)("ul",{className:_().list,children:[{icon:"material-symbols-light:vibration-outline-rounded",title:"Vibration",desc:"Enable or disable vibration.",checked:t,onChange:d},{icon:"ph:hand-tap-light",title:"Tap Animation",desc:"Enable or disable tap animation.",checked:c,onChange:m},{icon:"tabler:numbers",title:"Number Animation",desc:"Enable or disable number animation.",checked:u,onChange:v}].map(e=>(0,i.jsx)(h,{...e},e.title))})]})]})}},3007:function(e,n,t){"use strict";t.d(n,{User:function(){return m}});var i=t(7437),r=t(7903),a=t(4839),l=t(7749),s=t(1453),o=t.n(s);let c=e=>{let{src:n,name:t,level:r,...s}=e;return(0,i.jsxs)("div",{...s,className:(0,a.Z)(o().avatar,s.className),"data-letter":null==t?void 0:t.charAt(0),title:t,children:[n&&(0,i.jsx)("div",{style:{backgroundImage:"url(".concat(n,")")}}),r&&(0,i.jsx)(l.s,{level:r,min:!0})]})};var u=t(7545),d=t.n(u);let m=()=>{let{name:e,level:n}=(0,r.G)();return(0,i.jsxs)("div",{className:d().left,children:[(0,i.jsx)(c,{src:"/images/avatar.jpg",name:e,level:n}),(0,i.jsxs)("div",{className:d().name,children:[e," ",(0,i.jsx)("small",{children:"($GRIFTer)"})]})]})}},2576:function(e,n,t){"use strict";t.d(n,{JG:function(){return s},ZE:function(){return o},bm:function(){return c},MK:function(){return u},V7:function(){return a},ki:function(){return l}});var i=t(8621),r=t(9772);(0,i.D)({server:{},client:{NEXT_PUBLIC_NODE_ENV:r.z.enum(["development","production","test"])},runtimeEnv:{NEXT_PUBLIC_NODE_ENV:"development"}}).NEXT_PUBLIC_NODE_ENV;let a=1,l="none",s=2e3,o=500,c=1,u=2e3},4493:function(e,n,t){"use strict";t.d(n,{g:function(){return i}});let i=[{id:"bronze",name:"Bronze",requiredCoin:0,earnByTap:1,earnToLevelUp:1e3,profitByHour:8},{id:"silver",name:"Silver",requiredCoin:500,earnByTap:2,earnToLevelUp:2e3,profitByHour:16},{id:"gold",name:"Gold",requiredCoin:2e3,earnByTap:3,earnToLevelUp:3e3,profitByHour:24},{id:"platinum",name:"Platinum",requiredCoin:5e3,earnByTap:4,earnToLevelUp:4e3,profitByHour:32},{id:"diamond",name:"Diamond",requiredCoin:1e4,earnByTap:5,earnToLevelUp:5e3,profitByHour:40},{id:"epic",name:"Epic",requiredCoin:2e4,earnByTap:6,earnToLevelUp:6e3,profitByHour:48},{id:"legendary",name:"Legendary",requiredCoin:5e4,earnByTap:7,earnToLevelUp:7e3,profitByHour:56},{id:"master",name:"Master",requiredCoin:1e5,earnByTap:8,earnToLevelUp:8e3,profitByHour:64},{id:"grandmaster",name:"Grandmaster",requiredCoin:2e5,earnByTap:9,earnToLevelUp:9e3,profitByHour:72},{id:"lord",name:"Lord",requiredCoin:5e5,earnByTap:10,earnToLevelUp:1e4,profitByHour:80}]},7903:function(e,n,t){"use strict";t.d(n,{G:function(){return s}});var i=t(2576),r=t(4493),a=t(6202),l=t(5109);let s=()=>{let e=(0,a.L)(),n=(0,l.l)(e.level),t=(0,l.l)(e.level+1),s=n.earnByTap,o=i.ZE,c=e.level===r.g.length;return{...e,maxEnergy:o,earnByTap:s,currentLevel:n,nextLevel:t,maxLevel:c}}},5109:function(e,n,t){"use strict";t.d(n,{l:function(){return r}});var i=t(4493);let r=e=>{let n=e-1,t=i.g[n];return n===i.g.length&&(t=i.g[n-1]),t}},5090:function(e,n,t){"use strict";t.d(n,{F:function(){return a}});var i=t(9099),r=t(9291);let a=(0,i.Ue)((0,r.tJ)((e,n)=>({vibration:!0,tapAnimation:!0,numberAnimaton:!0,toggleVibration:()=>e(e=>({vibration:!e.vibration})),toggleTapAnimation:()=>e(e=>({tapAnimation:!e.tapAnimation})),toggleNumberAnimation:()=>e(e=>({numberAnimaton:!e.numberAnimaton}))}),{name:"settings"}))},6202:function(e,n,t){"use strict";t.d(n,{L:function(){return s}});var i=t(2576),r=t(4493),a=t(9099),l=t(9291);let s=(0,a.Ue)((0,l.tJ)((e,n)=>({name:"Username",level:1,totalCoins:0,coins:0,energy:i.ZE,exchange:-1,setExchange:n=>e(()=>({exchange:n})),addCoin:t=>{let i=n().totalCoins,a=n().level,l=r.g[a];a!==r.g.length&&i+t>=l.requiredCoin&&(e(e=>({level:e.level+1})),e(()=>({totalCoins:0}))),e(e=>({coins:e.coins+t,totalCoins:e.totalCoins+t}))},removeCoin:n=>e(e=>({coins:e.coins-n})),addEnergy:n=>e(e=>({energy:e.energy+n})),removeEnergy:n=>e(e=>({energy:e.energy-n})),setEnergy:n=>e(()=>({energy:n})),reset:()=>{e(()=>({coins:0,totalCoins:0,level:1,energy:i.ZE}))}}),{name:"user"}))},7712:function(){},9032:function(e){e.exports={content:"ModalWork_content__z9TPu",coin:"ModalWork_coin__OnWsr",title:"ModalWork_title___Qer9",number:"ModalWork_number__Sb8Kn"}},4382:function(e){e.exports={layout:"layout_layout__sx_l_",main:"layout_main__KhA0t",toast:"layout_toast__d0_aA"}},1453:function(e){e.exports={avatar:"Avatar_avatar__yZNjf"}},3397:function(e){e.exports={btn:"Button_btn__c2iDe",light:"Button_light__ThQs8",group:"Button_group__luMPf"}},5778:function(e){e.exports={button:"Exchange_button__wE7NO",caret:"Exchange_caret__Drbmo",logo:"Exchange_logo__0ixki",list:"Exchange_list__uMlwk",item:"Exchange_item__VUxdW",active:"Exchange_active__42Gof",itemLogo:"Exchange_itemLogo__SSiJ5",itemName:"Exchange_itemName__wNAdR",chevron:"Exchange_chevron__eX4L2"}},8974:function(e){e.exports={header:"Header_header__1RJ5C",right:"Header_right__RaQeL"}},5017:function(e){e.exports={heading:"Heading_heading__5N24X",title:"Heading_title__LrOdt",txt:"Heading_txt__7Q_tO"}},4501:function(e){e.exports={overlay:"Modal_overlay__qr6aL",overlayFull:"Modal_overlayFull__r9CP3",overlayClose:"Modal_overlayClose__fVfWV",modal:"Modal_modal__tv1jq",revealModal:"Modal_revealModal__KA5_9",full:"Modal_full__janXY",close:"Modal_close__8yl_X",title:"Modal_title__Jotfe"}},6018:function(e){e.exports={nav:"Nav_nav__wZ2Di",item:"Nav_item__Lg5o0",active:"Nav_active__NSFUZ",icon:"Nav_icon__2ULSD",play:"Nav_play__YGiY6",corner:"Nav_corner__59dfh"}},6690:function(e){e.exports={layer:"NoMobile_layer__SDaI5",title:"NoMobile_title__uI2wN",txt:"NoMobile_txt__mcWL6",qr:"NoMobile_qr__HtBG_"}},156:function(e){e.exports={button:"Params_button__MTv8A",list:"Params_list__g42F2",item:"Params_item__OEsSl",illu:"Params_illu__xw41g",txt:"Params_txt__gNUvi"}},1328:function(e){e.exports={check:"Switch_check__RKVVs"}},7545:function(e){e.exports={left:"User_left__lSiBe",name:"User_name__n_xS1"}}},function(e){e.O(0,[319,792,45,922,657,684,138,215,750,22,971,23,744],function(){return e(e.s=5402)}),_N_E=e.O()}]);