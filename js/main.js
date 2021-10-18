import{html as U,svg as P}from"https://cdn.skypack.dev/lit-html";import{Turtle as ue}from"https://leomcelroy.com/gram-js/exports.js";import"https://leomcelroy.com/widgets/code-mirror.js";var N=["./library/connectors/ESP8266_12E.json","./library/connectors/header_FTDI.json","./library/connectors/power_65mm.json","./library/connectors/ESP32_CAM.json","./library/connectors/USB_A_plug.json","./library/connectors/header_i0.json","./library/connectors/header_serial_reverse.json","./library/connectors/header_4.json","./library/connectors/header_signal.json","./library/connectors/MTA_i0.json","./library/connectors/HM11.json","./library/connectors/header_MFRC522.json","./library/connectors/header_serial_reverse_5V.json","./library/connectors/USB_mini_B.json","./library/connectors/ESC.json","./library/connectors/MTA_PS2.json","./library/connectors/header_APA.json","./library/connectors/MTA_ICP.json","./library/connectors/stereo_2_5mm.json","./library/connectors/header_VL53L1X_3415.json","./library/connectors/Molex_serial.json","./library/connectors/header_SWD_4_1.json","./library/connectors/ESP_01.json","./library/connectors/HCSR04.json","./library/connectors/header_SWD_4_05.json","./library/connectors/ESP32_WROOM.json","./library/connectors/header_serial.json","./library/connectors/header_PDI.json","./library/connectors/I2C4x1v.json","./library/connectors/header_power.json","./library/connectors/MTA_serial.json","./library/connectors/header_LSM6DS33_2736.json","./library/connectors/MTA_2.json","./library/connectors/MTA_3.json","./library/connectors/header_LCD.json","./library/connectors/screw_terminal_2.json","./library/connectors/HCSR501.json","./library/connectors/screw_terminal_i0.json","./library/connectors/header_unipolar_stepper.json","./library/connectors/screw_terminal_power.json","./library/connectors/header_nRF24L01.json","./library/connectors/header_serial_reverse_3V3.json","./library/connectors/MTA_power.json","./library/connectors/MTA_4.json","./library/connectors/RCWL0516.json","./library/connectors/ESP_WROOM_02D.json","./library/connectors/RN4871.json","./library/connectors/header_I2C.json","./library/connectors/header_SWD.json","./library/connectors/header_servo.json","./library/connectors/microSD.json","./library/connectors/header_4H.json","./library/connectors/header_UPDI.json","./library/connectors/I2C4x1i.json","./library/connectors/I2C4x1h.json","./library/connectors/header_ISP.json","./library/connectors/header_NEO_6M.json","./library/connectors/MTA_5.json","./library/connectors/header_6.json","./library/connectors/header_UPDI_reverse.json","./library/connectors/header_bus.json","./library/connectors/TFT8x1v.json","./library/connectors/header_2H.json","./library/connectors/header_ATP.json","./library/switches/button_6mm.json","./library/switches/slide_switch.json","./library/diodes_transistors_regulators_sensors/D_1206.json","./library/diodes_transistors_regulators_sensors/mic_SPM1437.json","./library/diodes_transistors_regulators_sensors/LED_1206.json","./library/diodes_transistors_regulators_sensors/NMOSFET_TO252AA.json","./library/diodes_transistors_regulators_sensors/regulator_SOT223.json","./library/diodes_transistors_regulators_sensors/regulator_SOT23.json","./library/diodes_transistors_regulators_sensors/VL53L1X.json","./library/diodes_transistors_regulators_sensors/H_bridge_SM8.json","./library/diodes_transistors_regulators_sensors/SPG08P4HM4H.json","./library/diodes_transistors_regulators_sensors/Hall_SOT23.json","./library/diodes_transistors_regulators_sensors/VEML6040.json","./library/diodes_transistors_regulators_sensors/phototransistor_1206.json","./library/diodes_transistors_regulators_sensors/LED_RGB.json","./library/diodes_transistors_regulators_sensors/accel_MXD6235M.json","./library/diodes_transistors_regulators_sensors/ADXL343.json","./library/diodes_transistors_regulators_sensors/mic_SPU0414HR5H.json","./library/diodes_transistors_regulators_sensors/D_SOD_123.json","./library/diodes_transistors_regulators_sensors/LED_3014_1100.json","./library/diodes_transistors_regulators_sensors/A4953_SOICN.json","./library/diodes_transistors_regulators_sensors/NMOSFET_SOT23.json","./library/diodes_transistors_regulators_sensors/phototransistor_PLCC2.json","./library/diodes_transistors_regulators_sensors/PMOSFET_SOT23.json","./library/diodes_transistors_regulators_sensors/DRV8428_HTSSOP.json","./library/diodes_transistors_regulators_sensors/CMM4030D261I2STR.json","./library/crystals_and_resonators/XTAL_CSM_7.json","./library/crystals_and_resonators/XTAL_NX5032GA.json","./library/crystals_and_resonators/XTAL_EFOBM.json","./library/discretes/R_0402.json","./library/discretes/ST4EB.json","./library/discretes/C_1206.json","./library/discretes/R_1206.json","./library/discretes/choke.json","./library/discretes/L_1210.json","./library/discretes/C_FND.json","./library/ICs/CBA.json","./library/ICs/SAMD21E.json","./library/ICs/AVRDB28.json","./library/ICs/FT230XS.json","./library/ICs/ATtiny1614.json","./library/ICs/fab.json","./library/ICs/ATtiny44_SOICN.json","./library/ICs/ATxmegaE5_TQFP.json","./library/ICs/op_amp_SOICN.json","./library/ICs/ATtiny45_SOIC.json","./library/ICs/ATmega88_TQFP.json","./library/ICs/SAMD11D.json","./library/ICs/TRC102.json","./library/ICs/ATtiny412.json","./library/ICs/ATmega644_TQFP.json","./library/ICs/op_amp_SOT23_5.json","./library/ICs/SAMD11C.json","./library/ICs/ATtiny3216.json"];function O(e){let r=new XMLSerializer,t=document.querySelector("svg").cloneNode(!0),s=t.querySelectorAll(".no-download");for(let f of s)f.remove();let o=t.querySelector(".transform-group");o.style.transformOrigin="",o.style.transform="";let i=e.limits.x[1]-e.limits.x[0],n=e.limits.y[1]-e.limits.y[0];t.setAttribute("width",`${i*e.mm_per_unit}mm`),t.setAttribute("height",`${n*e.mm_per_unit}mm`),t.setAttribute("viewBox",`${e.limits.x[0]} ${e.limits.y[0]} ${i} ${n}`),t.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");let d=r.serializeToString(t),l="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(d),c=document.createElement("a");c.href=l,c.download="download.svg",document.body.appendChild(c),c.click(),document.body.removeChild(c)}function B(e,r){let t=new Blob([r],{type:"text/plain"});var s=document.createElement("a");s.href=URL.createObjectURL(t),s.download=`${e}`,s.click(),URL.revokeObjectURL(s)}var me=e=>e.map(r=>r.slice(10)).map(r=>U`
	<div class="import-item" @mousedown=${async t=>{let o=await(await fetch(`neil-components/${r}`)).text();dispatch("ADD_IMPORT",{text:o,name:t.target.innerText.split("/")[1].split(".")[0]})}}>${r}</div>
`);function q(e){return U`
		<div class="top-menu">
			<div class="left">
				<button
					@click=${()=>dispatch("RUN",{save:!0})}>
					run (shift + enter)
				</button>
				<div class="seperator"></div>
				<div class="dropdown-container">
				 	import
				 	<div class="dropdown-content">
				 		${me(N)}
				 	</div>
				 </div>
				 <div class="seperator"></div>
				 <div class="dropdown-container">
					download
					<div class="dropdown-content dropdown-content">
						<button
							@click=${()=>O(e)}>
							svg
						</button>
						<button
							@click=${()=>B("anon.js",e.codemirror.view.state.doc.toString())}>
							js
						</button>
					</div>
				</div>
				<div class="seperator"></div>
				<div class="dropdown-container">
					drawing
					<div class="dropdown-content dropdown-content">
						<button
							class="center-button"
							@click=${()=>{e.panZoomParams.setScaleXY(e.limits)}}>
							center
						</button>
						<div>
							<span>handles</span>
							<input
								type="checkbox"
								checked=${e.viewHandles}
								@change=${r=>{e.viewHandles=r.target.checked,dispatch("RENDER")}}
								class="handles-checkbox">
							</input>
						</div>
						<div>
							<span>grid</span>
							<input
								type="checkbox"
								checked=${e.grid}
								@change=${r=>{e.grid=r.target.checked,dispatch("RENDER")}}
								>
							</input>
						</div>
						<div>
							<span>grid size:</span>
							<input
								type="number"
								step="0.005"
								min="0"
								value=${e.gridSize}
								@change=${r=>{e.gridSize=Number(r.target.value),dispatch("RENDER")}}>
							</input>
						</div>
					</div>
				</div>
			</div>
		</div>
		<code-mirror id="code-editor"></code-mirror>
		${pe(e)}
		<div id="vertical-bar"></div>
	`}var fe=e=>e.length===4?`rgba(${e.map((r,t)=>t<3?Math.round(r*255):r).join(",")})`:"rgba(255, 255, 255, 1)",X=(e,r)=>P`
	<path
		d="${e}"
		fill-rule="nonzero"
		fill="${typeof r=="string"?r:fe(r)}"/>
`,he=e=>e.reduce((r,t,s)=>`${r} ${s===0?"M":"L"} ${t.join(",")}`,""),ge=(e,r)=>{let t=[[e.lt.x,(e.lt.y+e.lb.y)/2],[e.rt.x,(e.rt.y+e.rb.y)/2]],s=[[(e.lt.x+e.rt.x)/2,e.lt.y],[(e.lb.x+e.rb.x)/2,e.lb.y]],o=[[e.lt.x,0],[e.rt.x,0]],i=[[0,e.lt.y],[0,e.lb.y]],n=[e.lt.x,e.rt.x],d=Math.abs(n[1]-n[0]),l=[e.lb.y,e.lt.y],c=Math.abs(l[1]-l[0]);function f(_,p){return Math.log(p)/Math.log(_)}let a=Math.round(f(5,Math.max(d,c))),m=r,u=(_,p)=>{let x=[],k=p*Math.ceil(_[0]/p)-p;for(;k<_[1]+p;)k=k+p,x.push(k);return x},v=_=>[[e.lt.x,_],[e.rt.x,_]],y=_=>[[_,e.lt.y],[_,e.lb.y]],h=_=>p=>P`<path stroke="black" vector-effect="non-scaling-stroke" stroke-width="${_}" d="${he(p)}"/>`,j=u(l,m).map(v).map(h(.2)),w=u(n,m).map(y).map(h(.2));return P`
		<g class="grid no-download">
			${h(.6)(o)}
			${h(.6)(i)}
			${j}
			${w}
		</g>
	`},pe=e=>{var s;let r=e.shapes.map(o=>Array.isArray(o.d)?o.d.map(i=>X(i,o.color)):X(o.d,o.color)).flat(),t=(s=e.panZoomParams)==null?void 0:s.corners();return P`
		<svg id="viewer" style="transform: scale(1, -1);">
			<g class="transform-group">
			      ${e.selectBox.start&&e.selectBox.end?P`
			      	<path
				        class="selectBox"
				        d="
				          M ${e.selectBox.start.x} ${e.selectBox.start.y}
				          L ${e.selectBox.end.x} ${e.selectBox.start.y}
				          L ${e.selectBox.end.x} ${e.selectBox.end.y}
				          L ${e.selectBox.start.x} ${e.selectBox.end.y}
				        "
			      	/>`:""}
			    <g class="shapes">${r}</g>
				${e.panZoomParams&&e.gridSize>0&&e.grid?ge(e.panZoomParams.corners(),e.gridSize):""}
				<rect
					class="limits no-download"
					width="${e.limits.x[1]-e.limits.x[0]}"
					height="${e.limits.y[1]-e.limits.y[0]}"
					stroke="black" fill="transparent" stroke-width="1"
					vector-effect="non-scaling-stroke"
					transform="translate(${e.limits.x[0]}, ${e.limits.y[0]})"/>
				${e.storedPCB&&e.viewHandles?ye(e.storedPCB):""}
			</g>

		</svg>
	`},R=.02,ye=e=>e.components.map((r,t)=>P`
	<g class="no-download translate-handle">
		<path
	        d="${new ue().arc(361,R).translate([r.posX,r.posY-R]).offset(.003).getPathData()}"
	  	/>
	  	<circle
	  		class="translate-handle-trigger" 
			data-index=${t}
	  		stroke="none"
	  		fill="#00000000"
		 	cx="${r.posX}"
		 	cy="${r.posY}"
		 	r="${R}"
		 	/>
	</g>
`);import{render as qe}from"https://cdn.skypack.dev/lit-html";import _e from"https://cdn.skypack.dev/esprima";import"https://cdn.skypack.dev/astring";import{walk as E}from"https://cdn.skypack.dev/esprima-walk";function be(e){let r=n=>n.includes("return kicadToObj("),s=e.codemirror.view.state.doc.toString().split(`
`),o=0,i=0;for(;;){let n=s[o];if(!n||(i+=n.length,o>s.length)||s[o]==="`)})()"&&!r(s[o+1]))break;o++}e.codemirror.foldRange(0,i+o)}function F(e,r){let t=document.querySelector("svg"),s=!1,o,i=0,n=0,d;r("mousedown",".translate-handle-trigger",l=>{s=!0,e.transforming=!0,i=0,n=0,o=t.panZoomParams.svgPoint({x:l.offsetX,y:l.offsetY}),d=l.target.dataset.index;let f=e.codemirror.view.state.doc.toString(),a=`()=>{${f}}`,m=_e.parseScript(a,{range:!0,comment:!0});console.log(m);let u=m.body[0].expression.body.body;console.log(u);let v=[];E(m,p=>{try{p.callee.type==="MemberExpression"&&p.callee.property.name==="add"&&v.push(p.arguments[1])}catch(x){}});let y=v.sort((p,x)=>p.range[0]-x.range[0]),h=p=>p.includes(".")?p.split(".")[1].length:p.length,j=(p,x)=>Math.round(p/x)*x,w=(p,x)=>Math.round(p*10**x)/10**x,_=p=>/[0-9]/i.test(p)||p===".";e.transformUpdate=(p,x)=>{let k=[];y[d].properties.forEach(M=>{if(M.key.name!=="translate")return;let[le,ce]=M.value.elements,L=!1;E(le,g=>{if(!L&&g.type==="Literal"&&typeof g.value=="number"){g.ogValue||(g.ogValue=g.value),g.ogRaw||(g.ogRaw=g.raw);let $=g.ogValue+p;k.push({from:g.range[0]-5,to:g.range[1]-5,insert:`${e.gridSize===0?w($,h(g.ogRaw)):w(j($,e.gridSize),8)}`}),L=!0}});let I=!1;E(ce,g=>{if(!I&&g.type==="Literal"&&typeof g.value=="number"){g.ogValue||(g.ogValue=g.value),g.ogRaw||(g.ogRaw=g.raw);let $=g.ogValue+x;k.push({from:g.range[0]-5,to:g.range[1]-5,insert:`${e.gridSize===0?w($,h(g.ogRaw)):w(j($,e.gridSize),8)}`}),I=!0}});let de=e.codemirror.view.state.doc.toString();e.codemirror.view.dispatch({changes:{from:0,to:de.length,insert:f}}),e.codemirror.view.dispatch({changes:k})}),be(e)}}),r("mousemove","",l=>{if(!s)return;let f=t.panZoomParams.svgPoint({x:l.offsetX,y:l.offsetY}),a=f.x-o.x,m=f.y-o.y;dispatch("TRANSLATE",{x:a,y:m,index:d}),i=a,n=m}),r("mouseup","",l=>{s=!1,e.transforming=!1}),r("mouseleave","",l=>{s=!1,e.transforming=!1})}function V(e,r){let t=!1;r("mousedown","#vertical-bar",s=>{t=!0}),r("mousemove","",s=>{if(!t)return;let o=s.clientX/window.innerWidth*100;if(o===0)return;let i=1,n=99;o<i&&(o=i),o>n&&(o=n),document.documentElement.style.setProperty("--vertical-bar",`${o}%`),pauseEvent(s)}),r("mouseup","",s=>{t=!1})}function H(e,r){let t=!1,s=1,o=0,i=0,n={x:0,y:0};function d(a){a.style.transformOrigin=`${0}px ${0}px`,a.style.transform="translate("+o+"px, "+i+"px) scale("+s+")",e.gridSize>0&&dispatch("RENDER")}function l({x:a,y:m}){let u=(a-o)/s,v=(m-i)/s;return{x:u,y:v}}r("mousedown","",a=>{a.shiftKey||(t=!0,n={x:a.offsetX-o,y:a.offsetY-i},a.detail===2&&console.log(a.offsetX,a.offsetY,l({x:a.offsetX,y:a.offsetY})))}),r("mousemove","",a=>{if(!t||e.transforming)return;o=a.offsetX-n.x,i=a.offsetY-n.y;let m=document.querySelectorAll(".transform-group");for(let u of m)d(u)}),r("mouseup","",a=>{t=!1}),r("wheel","",a=>{let m=(a.offsetX-o)/s,u=(a.offsetY-i)/s;Math.sign(a.deltaY)<0?s*=1.03:s/=1.03,o=a.offsetX-m*s,i=a.offsetY-u*s;let v=document.querySelectorAll(".transform-group");for(let y of v)d(y);a.preventDefault()});function c(a){console.log("set scale x y");let u=document.querySelector("svg").getBoundingClientRect(),v=a.x[1]-a.x[0],y=a.y[1]-a.y[0],h=u.width/v,j=u.height/y,w=Math.min(h,j)*.9;s=w;let _={x:(a.x[0]+a.x[1])/2*w-u.width/2,y:(a.y[0]+a.y[1])/2*w-u.height/2};o=-_.x,i=-_.y;let p=document.querySelectorAll(".transform-group");for(let x of p)d(x)}function f(){let a=document.querySelector("svg");if(a===null)return null;let{left:m,right:u,bottom:v,top:y,width:h,height:j}=a.getBoundingClientRect(),w=l({x:h,y:j}),_=l({x:0,y:j}),p=l({x:h,y:0}),x=l({x:0,y:0});return{rt:w,lt:_,rb:p,lb:x}}return{scale:()=>s,x:()=>o,y:()=>i,corners:f,svgPoint:l,setScaleXY:c}}var z=0;function ve(e){var r=new FileReader;r.readAsText(e),r.onloadend=t=>{let s=r.result;dispatch("UPLOAD_COMP",{text:s,name:`component${z}`}),z++}}function we(e){var r=new FileReader;r.readAsText(e),r.onloadend=t=>{let s=r.result;dispatch("UPLOAD_JS",{text:s})}}function xe(e,r=[]){let t=e[0],s=t.name.split("."),o=s[0],i=s[s.length-1];if(i==="kicad_mod")ve(t);else if(i==="js")we(t);else throw Error("Unknown extension:",i)}function Y(e,r){r("drop","",function(t){let o=t.dataTransfer.files;xe(o),pauseEvent(t)}),r("dragover","",function(t){pauseEvent(t)})}function Z(e,r){let t=null,s=null,o=document.querySelector("svg");r("mousedown","",n=>{!n.shiftKey||(t=o.panZoomParams.svgPoint({x:n.offsetX,y:n.offsetY}))}),r("mousemove","",n=>{document.body.classList.add("no-select"),!!n.shiftKey&&t!==null&&(s=o.panZoomParams.svgPoint({x:n.offsetX,y:n.offsetY}),e.selectBox.start=t,e.selectBox.end=s,dispatch("RENDER"))});function i(n,d){let{start:l,end:c}=d;return n.x>l.x&&n.x<c.x&&n.y>l.y&&n.y<c.y||n.x>l.x&&n.x<c.x&&n.y<l.y&&n.y>c.y||n.x<l.x&&n.x>c.x&&n.y>l.y&&n.y<c.y||n.x<l.x&&n.x>c.x&&n.y<l.y&&n.y>c.y}r("mouseup","",n=>{!n.shiftKey||(document.body.classList.remove("no-select"),t=null,s=null,e.selectBox.start=t,e.selectBox.end=s,dispatch("RENDER"))})}var W=(e,r=!1)=>/[0-9]/i.test(e)||e==="."||r&&e==="-";function G(e,r){let t=!1,s,o,i,n,d,l;r("mousedown",".ͼb",c=>{let a=document.querySelector("code-mirror").view.state,m=a.doc,u=a.selection.main.head,v=m.lineAt(u),{from:y,to:h,text:j}=m.lineAt(u),w=u,_=u;for(;w>y&&W(j[w-y-1],!0);)w--;for(;_<h&&W(j[_-y]);)_++;l=j.slice(w-y,_-y),s=Number(l),t=!0,o=w,i=_,d=l.includes("."),n=l.includes(".")?l.split(".")[1].length:1}),r("mousemove","",c=>{if(!t)return;let f=document.querySelector("code-mirror"),a=0>c.movementX?1:-1,m=`${s}`;if(d){let y=Math.round(s*10**n)+c.movementX;y=Math.round(y)/10**n,s=y}else s+=c.movementX;let u=`${s}`;f.view.dispatch({changes:{from:o,to:o+l.length,insert:u}}),l=u,dispatch("RUN"),pauseEvent(c)}),r("mouseup","",c=>{t=!1})}function je(e){return e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,e.returnValue=!1,!1}window.pauseEvent=je;var K=e=>e.composedPath()[0],Se=(e,r)=>K(e).matches(r),J=e=>(r,t,s)=>{e.addEventListener(r,o=>{o.trigger=K(o),(t===""||Se(o,t))&&s(o)})};function Q(e){let r=document.querySelector("svg"),t=J(r);r.panZoomParams=H(e,t),e.panZoomParams=r.panZoomParams,Z(e,t),F(e,t);let s=document.querySelector("body"),o=J(s);Y(e,o),G(e,o),V(e,o),o("keydown","",i=>{let n=event.code;n==="Enter"&&event.shiftKey?(event.preventDefault(),dispatch("RUN",{save:!0})):n==="KeyT"&&event.shiftKey})}import{Turtle as b}from"https://leomcelroy.com/gram-js/exports.js";function Te(e){return new b().arc(360,e).originate()}function ke(e,r){return new b().forward(e).right(90).forward(r).right(90).repeat(1).originate()}b.prototype.circle=Te;b.prototype.rectangle=ke;var Pe=([e,r],[t,s])=>Math.sqrt((t-e)**2+(s-r)**2),$e=(e,r)=>Pe(e,r)<1e-6,ee=(e,r)=>({F:{pos:[0,0],shape:new b().circle(r).getPathData(),layers:["F.Cu"],index:1},B:{pos:[0,0],shape:new b().circle(r).getPathData(),layers:["B.Cu"],index:2},drill:{pos:[0,0],shape:new b().circle(e).getPathData(),layers:["drill"]}}),re=(e,r)=>{let t=e[0],s=new b;s.booleanScale=2e3,s.goto(t,!1);for(let o of e.slice(1))$e(o,t)||(s.goto(o),t=o);return s.offset(r/2)},Re=([e,r],[t,s])=>[e+t,r+s];var Ee=([e,r],t)=>[e*Math.cos(t)-r*Math.sin(t),r*Math.cos(t)+e*Math.sin(t)],te=class{constructor({pads:r,layers:t}){this.pads=r,this.layers=t}pad(r){return this.pads[r]}padX(r){return this.pads[r][0]}padY(r){return this.pads[r][1]}get pos(){return this.pads.center}get posX(){return this.pads.center[0]}get posY(){return this.pads.center[1]}};function C(e,r,t){let s=e.split(`
`),o=new b;for(let[i,n]of s.entries()){let d=new b().text(n).scale(.01*r).originate().translate([0,i*r*1.5]);o.group(d)}return o.originate().translate(t)}function se(e,r={}){let t=r.translate||[0,0],s=r.rotate||0,o=r.padLabelSize||.02,[i,n]=t,d=s*Math.PI/180,l={},c=[],f={};for(let a in e){let{pos:m,shape:u,layers:v}=e[a];u=typeof u=="string"?new b().bezier(u):u.copy();let y=Re(Ee(m,d),t);if(l[a]=y,u.translate(y).rotate(s,y),!a.includes("drill")){let h=C(a,o,y);c.push(h)}v.forEach(h=>{h in f?f[h]=f[h].group(u):f[h]=u})}return l.center=t,f.padLabels=c.reduce((a,m)=>a.group(m),new b),new te({pads:l,layers:f})}var D=class{constructor(){this.layers={},this.components=[]}add(r,t={}){let s=t.name||"",o={translate:t.translate||[0,0],rotate:t.rotate||0,padLabelSize:t.padLabelSize||.03,componentLabelSize:t.componentLabelSize||.04},i=se(r,o);for(let n in i.layers)this.addShape(n,i.layers[n]);if(s!==""&&!s.includes("drill")){let n=C(s,o.componentLabelSize,o.translate);this.addShape("componentLabels",n)}return this.components.push(i),i}addShape(r,t){return t instanceof b?(r in this.layers?this.layers[r]=this.layers[r].group(t):this.layers[r]=t,this.layers[r]):console.error("Shape isn't Turtle.")}subtractShape(r,t){return t instanceof b?(r in this.layers?this.layers[r]=this.layers[r].difference(t):this.layers[r]=new b,this.layers[r]):console.error("Shape isn't Turtle.")}getLayer(r,t=!1){let s=r.includes("Labels");return t=!r.includes("Labels"),this.layers[r]?t?this.layers[r].flatten().getPathData(s):this.layers[r].getPathData(s):""}wire(r,t,s="F.Cu"){this.addShape(s,re(r,t))}};function S(e){this._line=this._col=this._pos=0,this._stream=e}S.not_whitespace_or_end=/^(\S|$)/;S.space_quote_paren_escaped_or_end=/^(\s|\\|"|'|`|,|\(|\)|$)/;S.string_or_escaped_or_end=/^(\\|"|$)/;S.string_delimiters=/["]/;S.quotes=/['`,]/;S.quotes_map={"'":"quote","`":"quasiquote",",":"unquote"};S.prototype={peek:De,consume:Ae,until:Me,error:Ce,string:Le,atom:Ie,quoted:Ne,expr:Oe,list:Be};function oe(e){var r=new S(e),t=r.expr();return t instanceof Error?t:r.peek()!=""?r.error("Superfluous characters after expression: `"+r.peek()+"`"):t}function Ce(e){var r=new Error("Syntax error: "+e);return r.line=this._line+1,r.col=this._col+1,r}function De(){return this._stream.length==this._pos?"":this._stream[this._pos]}function Ae(){if(this._stream.length==this._pos)return"";var e=this._stream[this._pos];return this._pos+=1,e=="\r"?(this.peek()==`
`&&(this._pos+=1,e+=`
`),this._line++,this._col=0):e==`
`?(this._line++,this._col=0):this._col++,e}function Me(e){for(var r="";!e.test(this.peek());)r+=this.consume();return r}function Le(){for(var e=this.consume(),r="";;){r+=this.until(S.string_or_escaped_or_end);var t=this.peek();if(t=="")return this.error("Unterminated string literal");if(t==e){this.consume();break}if(t=="\\"){this.consume(),t=this.peek(),t=="r"?(this.consume(),r+="\r"):t=="t"?(this.consume(),r+="	"):t=="n"?(this.consume(),r+=`
`):t=="f"?(this.consume(),r+="\f"):t=="b"?(this.consume(),r+="\b"):r+=this.consume();continue}r+=this.consume()}return new String(r)}function Ie(){if(S.string_delimiters.test(this.peek()))return this.string();for(var e="";;){e+=this.until(S.space_quote_paren_escaped_or_end);var r=this.peek();if(r=="\\"){this.consume(),e+=this.consume();continue}break}return e}function Ne(){var e=this.consume(),r=S.quotes_map[e];r=="unquote"&&this.peek()=="@"&&(this.consume(),r="unquote-splicing",e=",@"),this.until(S.not_whitespace_or_end);var t=this.expr();return t instanceof Error?t:t===""?this.error("Unexpected `"+this.peek()+"` after `"+e+"`"):[r,t]}function Oe(){if(this.until(S.not_whitespace_or_end),S.quotes.test(this.peek()))return this.quoted();var e=this.peek()=="("?this.list():this.atom();return this.until(S.not_whitespace_or_end),e}function Be(){if(this.peek()!="(")return this.error("Expected `(` - saw `"+this.peek()+"` instead.");this.consume();var e=[],r=this.expr();if(r instanceof Error)return r;if(r!=="")for(e.push(r);(r=this.expr())!=="";){if(r instanceof Error)return r;e.push(r)}return this.peek()!=")"?this.error("Expected `)` - saw: `"+this.peek()+"`"):(this.consume(),e)}var Ue=e=>e.reduce((r,t)=>{let s=t.split(".");return s.length===0?r:s[0]!=="*"?[...r,t]:[...r,`F.${s[1]}`,`B.${s[1]}`]},[]);function ne(e){let r=oe(e),t=1/25.4,s={};for(let i of r){let n=i[0]==="pad",d=i[2]==="smd",l=i[2]==="thru_hole",c=i[3];if(n&&(d||l)){let f=i[1],a=i[4].slice(1).map(h=>Number(h)*t);a[1]=-a[1];let m=i[i.length-1];m=m?m.slice(1):[],m=Ue(m);let u=i[5].slice(1).map(h=>Number(h)*t),v=c==="rect"?new b().rectangle(...u):new b().circle(u[0]);if(s[f]===void 0?s[f]=[{pos:a,shape:v,layers:m}]:s[f].push({pos:a,shape:v,layers:m}),i[i.length-2]?i[i.length-2][0]==="drill":!1){let h=Number(i[i.length-2][1])/25.4,j={pos:a,shape:new b().circle(h),layers:["drill"]};s[`${f}_drill`]===void 0?s[`${f}_drill`]=[j]:s[`${f}_drill`].push(j)}}}return Object.entries(s).reduce((i,n)=>{let[d,l]=n;return l.length===1?i[d]=l[0]:l.forEach((c,f)=>{i[`${d}_${f+1}`]=c}),i},{})}var A={codemirror:void 0,storedPCB:void 0,transforming:!1,transformUpdate:()=>{},selectBox:{},shapes:[],limits:{x:[0,1],y:[0,1]},mm_per_unit:25.4,grid:!0,gridSize:.05,viewHandles:!0,panZoomParams:void 0},ie=class extends D{constructor(){super();A.storedPCB=this}},ae={kicadToObj:ne,PCB:ie,via:ee,Turtle:b};async function Xe(e,r){let s=await(await fetch(e,{mode:"cors"})).text();r.codemirror.view.dispatch({changes:{from:0,insert:s}});let o=c=>c.includes("return kicadToObj("),n=r.codemirror.view.state.doc.toString().split(`
`),d=0,l=0;for(;;){let c=n[d];if(!c||(l+=c.length,d>n.length)||n[d]==="`)})()"&&!o(n[d+1]))break;d++}r.codemirror.foldRange(0,l+d),T("RUN"),document.querySelector(".center-button").click()}var Fe={INIT(e,r){T("RENDER"),r.codemirror=document.querySelector("#code-editor"),Q(r);let t=new URL(window.location.href),s=window.location.search,o=new URLSearchParams(s).get("code"),i=new URLSearchParams(s).get("file"),n=new URLSearchParams(s).get("handles")==="false",d=new URLSearchParams(s).get("grid")==="false";if(n&&(r.viewHandles=!1),d&&(r.grid=!1),!o)if(i){let l=i;i.startsWith("http")||(l=`examples/${i}`),Xe(l,r)}else{let l=window.localStorage.getItem("svg-pcb");r.codemirror.view.dispatch({changes:{from:0,insert:l!=null?l:""}}),T("RUN"),document.querySelector(".center-button").click()}T("RENDER")},RUN({save:e=!1},r){let t=r.codemirror.view.state.doc.toString(),o=new Function(...Object.keys(ae),t)(...Object.values(ae)),{shapes:i,limits:n,mm_per_unit:d}=typeof o=="string"?JSON.parse(o):o;r.shapes=i,r.limits=n,r.mm_per_unit=d,e&&window.localStorage.setItem("svg-pcb",t),T("RENDER")},UPLOAD_COMP({text:e,name:r},t){e=e.replaceAll("$",""),e=`const ${r} = (() => { return kicadToObj(
\`${e}\`)})()
`,t.codemirror.view.dispatch({changes:{from:0,insert:e}}),t.codemirror.foldRange(0,e.length),T("RENDER")},UPLOAD_JS({text:e},r){let t=r.codemirror.view.state.doc.toString().length;r.codemirror.view.dispatch({changes:{from:0,to:t,insert:e}}),T("RUN"),document.querySelector(".center-button").click()},ADD_IMPORT({text:e,name:r},t){e=`const ${r} = ${e}
`,t.codemirror.view.dispatch({changes:{from:0,insert:e}}),T("RENDER")},TRANSLATE({x:e,y:r,index:t},s){s.transformUpdate(e,r),T("RUN")},RENDER(){qe(q(A),document.getElementById("root"))}};function T(e,r={}){let t=Fe[e];t?t(r,A):console.log("Action not recongnized:",e)}window.dispatch=T;window.addEventListener("load",()=>{T("INIT")});
//# sourceMappingURL=main.js.map
