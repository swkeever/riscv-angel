(this["webpackJsonpriscv-angel-extended"]=this["webpackJsonpriscv-angel-extended"]||[]).push([[0],{19:function(e,a,r){"use strict";r.r(a);var t=r(0),n=r.n(t),l=r(3),i=r.n(l),o=r(2),s=r.n(o),c=r(4),u=r(1),m=[{name:"x0",abiName:"zero",description:"hardwired zero",saver:null},{name:"x1",abiName:"ra",description:"return address",saver:"Caller"},{name:"x2",abiName:"sp",description:"stack pointer",saver:"Callee"},{name:"x3",abiName:"gp",description:"global pointer",saver:null},{name:"x4",abiName:"tp",description:"thread pointer",saver:null},{name:"x5",abiName:"t0",description:"temporary register",saver:"Caller"},{name:"x6",abiName:"t1",description:"temporary register",saver:"Caller"},{name:"x7",abiName:"t2",description:"temporary register",saver:"Caller"},{name:"x8",abiName:"s0 / fp",description:"saved register / frame pointer",saver:"Callee"},{name:"x9",abiName:"s1",description:"saved register",saver:"Callee"},{name:"x10",abiName:"a0",description:"function argument / return value",saver:"Caller"},{name:"x11",abiName:"a1",description:"function argument / return value",saver:"Caller"},{name:"x12",abiName:"a2",description:"function argument",saver:"Caller"},{name:"x13",abiName:"a3",description:"function argument",saver:"Caller"},{name:"x14",abiName:"a4",description:"function argument",saver:"Caller"},{name:"x15",abiName:"a5",description:"function argument",saver:"Caller"},{name:"x16",abiName:"a6",description:"function argument",saver:"Caller"},{name:"x17",abiName:"a7",description:"function argument",saver:"Caller"},{name:"x18",abiName:"s2",description:"saved register",saver:"Callee"},{name:"x19",abiName:"s3",description:"saved register",saver:"Callee"},{name:"x20",abiName:"s4",description:"saved register",saver:"Callee"},{name:"x21",abiName:"s5",description:"saved register",saver:"Callee"},{name:"x22",abiName:"s6",description:"saved register",saver:"Callee"},{name:"x23",abiName:"s7",description:"saved register",saver:"Callee"},{name:"x24",abiName:"s8",description:"saved register",saver:"Callee"},{name:"x25",abiName:"s9",description:"saved register",saver:"Callee"},{name:"x26",abiName:"s10",description:"saved register",saver:"Callee"},{name:"x27",abiName:"s11",description:"saved register",saver:"Callee"},{name:"x28",abiName:"t3",description:"temporary register",saver:"Caller"},{name:"x29",abiName:"t4",description:"temporary register",saver:"Caller"},{name:"x30",abiName:"t5",description:"temporary register",saver:"Caller"},{name:"x31",abiName:"t6",description:"temporary register",saver:"Caller"}],d=function(){return m};var p=function(e,a){var r=Object(t.useRef)();Object(t.useEffect)((function(){r.current=e}),[e]),Object(t.useEffect)((function(){if(null!==a){var e=setInterval((function(){r.current()}),a);return function(){return clearInterval(e)}}return null}),[a])};for(var f=function(){var e=Object(t.useState)(null),a=Object(u.a)(e,2),r=a[0],n=a[1];return p((function(){n(window.myCpu)}),125),r||null},v=function(){return n.a.createElement("div",{className:"loader"},"Loading...")},g=function(e){var a=e.title;return n.a.createElement("h2",{className:"module-header"},a)},b=r(13).Uint64LE,N=function(){var e=Object(t.useState)("all"),a=Object(u.a)(e,2),r=a[0],l=a[1],i=f();if(!i)return n.a.createElement(v,null);var o=d(),s=i.registers.map((function(e){return new b(e).toString(16)})).map((function(e,a){return Object(c.a)(Object(c.a)({},o[a]),{},{value:e})})),m=function(){switch(r){case"callee-saved":return s.filter((function(e){return"Callee"===e.saver}));case"caller-saved":return s.filter((function(e){return"Caller"===e.saver}));case"all":return s;default:throw Error("unknown filter")}}(),p=function(e){var a,t=e.classifier;return n.a.createElement("button",{className:(a=t,a===r?"btn-active":void 0),type:"button",onClick:function(){return l(t)}},t)},N=function(){return n.a.createElement("div",{className:"btn-group",role:"group"},n.a.createElement(p,{classifier:"all"}),n.a.createElement(p,{classifier:"caller-saved"}),n.a.createElement(p,{classifier:"callee-saved"}))};return n.a.createElement(n.a.Fragment,null,n.a.createElement(g,{title:"Registers"}),n.a.createElement(N,null),n.a.createElement("ul",{className:"register-list"},s.map((function(e){var a=!m.includes(e)&&"register-disabled";return n.a.createElement("li",{className:"register-row ".concat(a),key:"reg-".concat(e.abiName)},n.a.createElement("span",{className:"register-name ".concat(a)},e.name),n.a.createElement("span",{className:"register-abi ".concat(a)},e.abiName),n.a.createElement("span",{className:"register-value ".concat(a)},e.value))}))))},C=getComputedStyle(document.body),x={color:{},size:{},tiny:{}},y=1;y<=9;y+=1)x.color["p".concat(y)]=C.getPropertyValue("--color-p".concat(y)),x.color["g".concat(y)]=C.getPropertyValue("--color-g".concat(y)),x.size["".concat(y)]=C.getPropertyValue("--sz-".concat(y)),y<=4&&(x.tiny["".concat(y)]=C.getPropertyValue("--tiny-".concat(y)));x.font=C.getPropertyValue("--font"),x.fontMono=C.getPropertyValue("--font-mono");var E=x;function O(){var e,a,r=f(),l=n.a.createRef(),i=Object(t.useState)(null),o=Object(u.a)(i,2),c=o[0],m=o[1];if(Object(t.useEffect)((function(){if(r)if(c)c.data=a,c.update(0);else{var e=l.current.getContext("2d");m(new s.a(e,{type:"pie",data:a,options:{legend:{fontSize:E.size[5],position:"left",labels:{padding:parseInt(E.size[5],10)}},tooltips:!0,rotation:Math.PI/4}}))}}),[r,c,l,a]),!r)return n.a.createElement(v,null);var d=(e=(e=r.instruction_amounts).filter((function(e){return"memoryOrder"!==e.label}))).map((function(e){return e.label})),p=e.map((function(e){return e.value}));p.every((function(e){return 0===e}))&&(p=p.fill(1/p.length));var b=e.map((function(e,a){return E.color["p".concat(a+3)]}));return a={datasets:[{data:p,backgroundColor:b,borderColor:E.color.g9,hoverBackgroundColor:b}],labels:d},n.a.createElement(n.a.Fragment,null,n.a.createElement(g,{title:"Instructions"}),n.a.createElement("div",{className:"canvas-container"},n.a.createElement("canvas",{className:"inst-pie",ref:l})))}var j=function(){var e=Object(t.useState)([]),a=Object(u.a)(e,2),r=a[0],l=a[1],i=Object(t.useState)([0]),o=Object(u.a)(i,2),c=o[0],m=o[1],d=f(),p=n.a.createRef(),b=Object(t.useState)(null),N=Object(u.a)(b,2),C=N[0],x=N[1],y={labels:Array(10).fill().map((function(e,a){return(a+1).toString()})).reverse(),datasets:[{fill:!1,borderColor:E.color.p4,pointBackgroundColor:E.color.p4,hoverBackgroundColor:E.color.p2,data:r}]};return Object(t.useEffect)((function(){if(d&&!C){var e=p.current.getContext("2d");x(new s.a(e,{type:"line",data:y,options:{legend:{display:!1},scales:{xAxes:[{gridLines:{color:E.color.g8}}],yAxes:[{gridLines:{color:E.color.g8}}]}}}))}else d&&C&&(C.data=y,C.update(0))}),[d,C,p,y]),Object(t.useEffect)((function(){if(d&&c!==d.nonzeroMemoryTotal){if(10===r.length){var e=r.filter((function(e,a){return 0!==a})).concat(d.nonzeroMemoryTotal);l(e)}else{var a=r.concat(d.nonzeroMemoryTotal);l(a)}m(d.nonzeroMemoryTotal)}}),[d,r,c]),d?n.a.createElement(n.a.Fragment,null,n.a.createElement(g,{title:"Number of Non-zero Words"}),n.a.createElement("p",null,"".concat((100*parseFloat(d.nonzeroMemoryTotal/d.memoryTotal)).toFixed(2)," % ")),n.a.createElement("div",{className:"canvas-container"},n.a.createElement("canvas",{id:"myChart",ref:p}))):n.a.createElement(v,null)};s.a.defaults.global.defaultFontFamily=E.font,s.a.defaults.global.defaultFontColor=E.color.g5,s.a.defaults.global.defaultFontSize=parseInt(E.size[1],10),s.a.defaults.global.aspectRatio=1.5,s.a.defaults.global.responsive=!0,i.a.render(n.a.createElement(N,null),document.querySelector("#registerPanel")),i.a.render(n.a.createElement(O,null),document.querySelector("#instructionPanel")),i.a.render(n.a.createElement(j,null),document.querySelector("#memoryPanel"))},6:function(e,a,r){e.exports=r(19)}},[[6,1,2]]]);
//# sourceMappingURL=main.2ec686e4.chunk.js.map