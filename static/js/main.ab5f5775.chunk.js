(this["webpackJsonpdena-review"]=this["webpackJsonpdena-review"]||[]).push([[0],{13:function(e,s,t){},15:function(e,s,t){"use strict";t.r(s);var n=t(2),r=t(3),a=t(5),i=t(4),c=t(1),o=t.n(c),l=t(8),u=t.n(l),h=(t(6),t(13),t(0)),j=function(e){Object(a.a)(t,e);var s=Object(i.a)(t);function t(){return Object(n.a)(this,t),s.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){var e,s=this;return e=null===this.props.value?"":"X"===this.props.value?"stone-color1":"stone-color2",Object(h.jsx)("button",{className:"stone "+e,onClick:function(){s.props.onClick()}})}}]),t}(o.a.Component),p=j,d=function(e){Object(a.a)(t,e);var s=Object(i.a)(t);function t(){return Object(n.a)(this,t),s.apply(this,arguments)}return Object(r.a)(t,[{key:"renderStone",value:function(e){var s=this;return Object(h.jsx)(p,{value:this.props.squares[e],onClick:function(){return s.props.onClick(e)}})}},{key:"render",value:function(){return Object(h.jsxs)("div",{className:"board-row",children:[this.renderStone(7*this.props.index+0),this.renderStone(7*this.props.index+1),this.renderStone(7*this.props.index+2),this.renderStone(7*this.props.index+3),this.renderStone(7*this.props.index+4),this.renderStone(7*this.props.index+5),this.renderStone(7*this.props.index+6)]})}}]),t}(o.a.Component),b=function(e){Object(a.a)(t,e);var s=Object(i.a)(t);function t(){return Object(n.a)(this,t),s.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){var e=this;return Object(h.jsxs)("div",{children:[Object(h.jsx)(d,{index:0,squares:this.props.squares,onClick:function(s){return e.props.onClick(s)}}),Object(h.jsx)(d,{index:1,squares:this.props.squares,onClick:function(s){return e.props.onClick(s)}}),Object(h.jsx)(d,{index:2,squares:this.props.squares,onClick:function(s){return e.props.onClick(s)}}),Object(h.jsx)(d,{index:3,squares:this.props.squares,onClick:function(s){return e.props.onClick(s)}}),Object(h.jsx)(d,{index:4,squares:this.props.squares,onClick:function(s){return e.props.onClick(s)}}),Object(h.jsx)(d,{index:5,squares:this.props.squares,onClick:function(s){return e.props.onClick(s)}})]})}}]),t}(o.a.Component),f=b,x=function(e){Object(a.a)(t,e);var s=Object(i.a)(t);function t(){return Object(n.a)(this,t),s.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){var e=this,s=this.props.volume;return 1===s?Object(h.jsx)("div",{className:"volume",children:Object(h.jsx)("i",{className:"fas fa-volume-up fa-3x",onClick:function(){return e.props.onClick()}})}):.5===s?Object(h.jsx)("div",{className:"volume",children:Object(h.jsx)("i",{className:"fas fa-volume-down fa-3x",onClick:function(){return e.props.onClick()}})}):Object(h.jsx)("div",{className:"volume",children:Object(h.jsx)("i",{className:"fas fa-volume-off fa-3x",onClick:function(){return e.props.onClick()}})})}}]),t}(o.a.Component),O=x,v=function(e){Object(a.a)(t,e);var s=Object(i.a)(t);function t(){return Object(n.a)(this,t),s.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){var e,s=null,t=null;return e=this.props.winner?this.props.winner:this.props.xIsNext?"X":"O",this.props.isDraw||("X"===e?s=e:t=e),Object(h.jsxs)("div",{className:"indicator",children:[Object(h.jsx)(p,{value:s,onClick:function(){}}),Object(h.jsx)(p,{value:t,onClick:function(){}})]})}}]),t}(o.a.Component),m=v;function k(e,s){if(42===s)return null;if(null===e[s])return k(e,s+1);for(var t=[[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1],[1,0],[1,1]],n=Math.trunc(s/7),r=s%7,a=0;a<8;a++){var i=7*(n+0*t[a][0])+(r+0*t[a][1]),c=7*(n+1*t[a][0])+(r+1*t[a][1]),o=7*(n+2*t[a][0])+(r+2*t[a][1]),l=7*(n+3*t[a][0])+(r+3*t[a][1]);if(N(a,[i,c,o])&&(e[i]===e[c]&&e[i]===e[o]&&e[i]===e[l]))return console.log(i),console.log(c),console.log(o),console.log(l),[i,c,o,l]}return k(e,s+1)}function N(e,s){for(var t=0;t<s.length;t++){var n=s[t],r=Math.trunc(n/7),a=n%7;if(0===a&&e>=3&&e<=5||0===r&&e>=1&&e<=3||6===a&&(e<=1||7===e)||5===r&&e>=6&&e<=8)return!1}return!0}function C(e,s){var t=new Audio(e);t.volume=s,t.play().then((function(){console.log("Audio started!")})).catch((function(e){return console.warn(e)}))}var y=function(e){Object(a.a)(t,e);var s=Object(i.a)(t);function t(e){var r;return Object(n.a)(this,t),(r=s.call(this,e)).state={history:[{squares:Array(42).fill(null)}],stepNumber:0,xIsNext:!0,isEnter:!1,isDraw:!1,volume:.5},r}return Object(r.a)(t,[{key:"handleClick",value:function(e){if(this.state.isEnter&&!this.state.isDraw){var s=this.state.history.slice(0,this.state.stepNumber+1),t=s[s.length-1].squares.slice(),n=function(e,s){for(var t=s%7,n=0;n<6;n++){var r=7*n+t;if(null!==e[r])return 0===n?null:r-7}return t+35}(t,e);if(!k(t,0)&&null!==n){t[n]=this.state.xIsNext?"X":"O",41===this.state.stepNumber&&this.setState({isDraw:!0});var r=k(t,0),a=r?t[r[0]]:null;if(r)for(var i=0;i<t.length;i++){var c=r.includes(i);t[i]=c?a:null}this.setState({history:s.concat([{squares:t}]),stepNumber:s.length,xIsNext:!this.state.xIsNext})}}}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"resetGame",value:function(){this.setState({isDraw:!1}),this.jumpTo(0)}},{key:"toggleVolume",value:function(){var e;e=1===this.state.volume?.5:.5===this.state.volume?0:1,console.log(e),this.setState({volume:e})}},{key:"render",value:function(){var e=this,s=this.state.history[this.state.stepNumber],t=k(s.squares,0),n=t?s.squares[t[0]]:null,r=this.state.isEnter?" board-on":"";return Object(h.jsxs)("div",{className:"game",children:[Object(h.jsxs)("div",{className:"game-title",children:[Object(h.jsxs)("span",{className:"neon flash",children:["\u96fb",Object(h.jsx)("span",{children:"\u96fb"})]}),Object(h.jsxs)("span",{className:"neon flash",children:["\u8133",Object(h.jsx)("span",{children:"\u8133"})]}),Object(h.jsxs)("span",{className:"neon flash",children:["\u76e4",Object(h.jsx)("span",{children:"\u76e4"})]}),Object(h.jsxs)("span",{className:"neon flash",children:["\u4e0a",Object(h.jsx)("span",{children:"\u4e0a"})]}),Object(h.jsxs)("span",{className:"neon flash",children:["\u5a2f",Object(h.jsx)("span",{children:"\u5a2f"})]}),Object(h.jsxs)("span",{className:"neon flash",children:["\u697d",Object(h.jsx)("span",{children:"\u697d"})]}),Object(h.jsxs)("span",{className:"neon flash",children:["\xa0",Object(h.jsx)("span",{children:"\xa0"})]}),Object(h.jsxs)("span",{className:"neon flash",children:["\u56db",Object(h.jsx)("span",{children:"\u56db"})]}),Object(h.jsxs)("span",{className:"neon flash",children:["\u5b50",Object(h.jsx)("span",{children:"\u5b50"})]}),Object(h.jsxs)("span",{className:"neon flash",children:["\u68cb",Object(h.jsx)("span",{children:"\u68cb"})]})]}),Object(h.jsxs)("div",{className:"game-info",children:[Object(h.jsx)(m,{xIsNext:this.state.xIsNext,isDraw:this.state.isDraw,winner:n}),Object(h.jsx)("button",{className:"reset-button",onClick:function(){C("audio/switch.mp3",e.state.volume),e.resetGame()},children:"RESET"}),Object(h.jsx)(O,{volume:this.state.volume,onClick:function(){e.toggleVolume(),C("audio/switch.mp3",e.state.volume)}}),Object(h.jsx)("button",{className:"enter-button",onClick:function(){e.state.isEnter||(C("audio/bell_sound.mp3",e.state.volume),e.setState({isEnter:!0}))},children:" \u5165\u5834 \u261e "})]}),Object(h.jsx)("div",{className:"game-body",children:Object(h.jsx)("div",{className:"game-board"+r,children:Object(h.jsx)(f,{squares:s.squares,onClick:function(s){e.state.isEnter&&C("audio/switch.mp3",e.state.volume),e.handleClick(s)}})})})]})}}]),t}(o.a.Component);u.a.render(Object(h.jsx)(y,{}),document.getElementById("root"))},6:function(e,s,t){}},[[15,1,2]]]);
//# sourceMappingURL=main.ab5f5775.chunk.js.map