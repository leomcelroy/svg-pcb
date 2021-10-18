import{html as B,svg as P}from"https://cdn.skypack.dev/lit-html";import{Turtle as de}from"https://leomcelroy.com/gram-js/exports.js";import"https://leomcelroy.com/widgets/code-mirror.js";var I=["./library/connectors/ESP8266_12E.json","./library/connectors/header_FTDI.json","./library/connectors/power_65mm.json","./library/connectors/ESP32_CAM.json","./library/connectors/USB_A_plug.json","./library/connectors/header_i0.json","./library/connectors/header_serial_reverse.json","./library/connectors/header_4.json","./library/connectors/header_signal.json","./library/connectors/MTA_i0.json","./library/connectors/HM11.json","./library/connectors/header_MFRC522.json","./library/connectors/header_serial_reverse_5V.json","./library/connectors/USB_mini_B.json","./library/connectors/ESC.json","./library/connectors/MTA_PS2.json","./library/connectors/header_APA.json","./library/connectors/MTA_ICP.json","./library/connectors/stereo_2_5mm.json","./library/connectors/header_VL53L1X_3415.json","./library/connectors/Molex_serial.json","./library/connectors/header_SWD_4_1.json","./library/connectors/ESP_01.json","./library/connectors/HCSR04.json","./library/connectors/header_SWD_4_05.json","./library/connectors/ESP32_WROOM.json","./library/connectors/header_serial.json","./library/connectors/header_PDI.json","./library/connectors/I2C4x1v.json","./library/connectors/header_power.json","./library/connectors/MTA_serial.json","./library/connectors/header_LSM6DS33_2736.json","./library/connectors/MTA_2.json","./library/connectors/MTA_3.json","./library/connectors/header_LCD.json","./library/connectors/screw_terminal_2.json","./library/connectors/HCSR501.json","./library/connectors/screw_terminal_i0.json","./library/connectors/header_unipolar_stepper.json","./library/connectors/screw_terminal_power.json","./library/connectors/header_nRF24L01.json","./library/connectors/header_serial_reverse_3V3.json","./library/connectors/MTA_power.json","./library/connectors/MTA_4.json","./library/connectors/RCWL0516.json","./library/connectors/ESP_WROOM_02D.json","./library/connectors/RN4871.json","./library/connectors/header_I2C.json","./library/connectors/header_SWD.json","./library/connectors/header_servo.json","./library/connectors/microSD.json","./library/connectors/header_4H.json","./library/connectors/header_UPDI.json","./library/connectors/I2C4x1i.json","./library/connectors/I2C4x1h.json","./library/connectors/header_ISP.json","./library/connectors/header_NEO_6M.json","./library/connectors/MTA_5.json","./library/connectors/header_6.json","./library/connectors/header_UPDI_reverse.json","./library/connectors/header_bus.json","./library/connectors/TFT8x1v.json","./library/connectors/header_2H.json","./library/connectors/header_ATP.json","./library/switches/button_6mm.json","./library/switches/slide_switch.json","./library/diodes_transistors_regulators_sensors/D_1206.json","./library/diodes_transistors_regulators_sensors/mic_SPM1437.json","./library/diodes_transistors_regulators_sensors/LED_1206.json","./library/diodes_transistors_regulators_sensors/NMOSFET_TO252AA.json","./library/diodes_transistors_regulators_sensors/regulator_SOT223.json","./library/diodes_transistors_regulators_sensors/regulator_SOT23.json","./library/diodes_transistors_regulators_sensors/VL53L1X.json","./library/diodes_transistors_regulators_sensors/H_bridge_SM8.json","./library/diodes_transistors_regulators_sensors/SPG08P4HM4H.json","./library/diodes_transistors_regulators_sensors/Hall_SOT23.json","./library/diodes_transistors_regulators_sensors/VEML6040.json","./library/diodes_transistors_regulators_sensors/phototransistor_1206.json","./library/diodes_transistors_regulators_sensors/LED_RGB.json","./library/diodes_transistors_regulators_sensors/accel_MXD6235M.json","./library/diodes_transistors_regulators_sensors/ADXL343.json","./library/diodes_transistors_regulators_sensors/mic_SPU0414HR5H.json","./library/diodes_transistors_regulators_sensors/D_SOD_123.json","./library/diodes_transistors_regulators_sensors/LED_3014_1100.json","./library/diodes_transistors_regulators_sensors/A4953_SOICN.json","./library/diodes_transistors_regulators_sensors/NMOSFET_SOT23.json","./library/diodes_transistors_regulators_sensors/phototransistor_PLCC2.json","./library/diodes_transistors_regulators_sensors/PMOSFET_SOT23.json","./library/diodes_transistors_regulators_sensors/DRV8428_HTSSOP.json","./library/diodes_transistors_regulators_sensors/CMM4030D261I2STR.json","./library/crystals_and_resonators/XTAL_CSM_7.json","./library/crystals_and_resonators/XTAL_NX5032GA.json","./library/crystals_and_resonators/XTAL_EFOBM.json","./library/discretes/R_0402.json","./library/discretes/ST4EB.json","./library/discretes/C_1206.json","./library/discretes/R_1206.json","./library/discretes/choke.json","./library/discretes/L_1210.json","./library/discretes/C_FND.json","./library/ICs/CBA.json","./library/ICs/SAMD21E.json","./library/ICs/AVRDB28.json","./library/ICs/FT230XS.json","./library/ICs/ATtiny1614.json","./library/ICs/fab.json","./library/ICs/ATtiny44_SOICN.json","./library/ICs/ATxmegaE5_TQFP.json","./library/ICs/op_amp_SOICN.json","./library/ICs/ATtiny45_SOIC.json","./library/ICs/ATmega88_TQFP.json","./library/ICs/SAMD11D.json","./library/ICs/TRC102.json","./library/ICs/ATtiny412.json","./library/ICs/ATmega644_TQFP.json","./library/ICs/op_amp_SOT23_5.json","./library/ICs/SAMD11C.json","./library/ICs/ATtiny3216.json"];function N(e){let r=new XMLSerializer,t=document.querySelector("svg").cloneNode(!0),s=t.querySelectorAll(".no-download");for(let h of s)h.remove();let o=t.querySelector(".transform-group");o.style.transformOrigin="",o.style.transform="";let i=e.limits.x[1]-e.limits.x[0],n=e.limits.y[1]-e.limits.y[0];t.setAttribute("width",`${i*e.mm_per_unit}mm`),t.setAttribute("height",`${n*e.mm_per_unit}mm`),t.setAttribute("viewBox",`${e.limits.x[0]} ${e.limits.y[0]} ${i} ${n}`),t.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");let u=r.serializeToString(t),l="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(u),c=document.createElement("a");c.href=l,c.download="download.svg",document.body.appendChild(c),c.click(),document.body.removeChild(c)}function O(e,r){let t=new Blob([r],{type:"text/plain"});var s=document.createElement("a");s.href=URL.createObjectURL(t),s.download=`${e}`,s.click(),URL.revokeObjectURL(s)}var ue=e=>e.map(r=>r.slice(10)).map(r=>B`
	<div class="import-item" @mousedown=${async t=>{let o=await(await fetch(`neil-components/${r}`)).text();dispatch("ADD_IMPORT",{text:o,name:t.target.innerText.split("/")[1].split(".")[0]})}}>${r}</div>
`);function U(e){return B`
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
				 		${ue(I)}
				 	</div>
				 </div>
				 <div class="seperator"></div>
				 <div class="dropdown-container">
					download
					<div class="dropdown-content dropdown-content">
						<button
							@click=${()=>N(e)}>
							svg
						</button>
						<button
							@click=${()=>O("anon.js",e.codemirror.view.state.doc.toString())}>
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
		${me(e)}
		<div id="vertical-bar"></div>
	`}var pe=e=>e.length===4?`rgba(${e.map((r,t)=>t<3?Math.round(r*255):r).join(",")})`:"rgba(255, 255, 255, 1)",q=(e,r)=>P`
	<path
		d="${e}"
		fill-rule="nonzero"
		fill="${typeof r=="string"?r:pe(r)}"/>
`,he=e=>e.reduce((r,t,s)=>`${r} ${s===0?"M":"L"} ${t.join(",")}`,""),fe=(e,r)=>{let t=[[e.lt.x,(e.lt.y+e.lb.y)/2],[e.rt.x,(e.rt.y+e.rb.y)/2]],s=[[(e.lt.x+e.rt.x)/2,e.lt.y],[(e.lb.x+e.rb.x)/2,e.lb.y]],o=[[e.lt.x,0],[e.rt.x,0]],i=[[0,e.lt.y],[0,e.lb.y]],n=[e.lt.x,e.rt.x],u=Math.abs(n[1]-n[0]),l=[e.lb.y,e.lt.y],c=Math.abs(l[1]-l[0]);function h(_,m){return Math.log(m)/Math.log(_)}let a=Math.round(h(5,Math.max(u,c))),d=r,p=(_,m)=>{let j=[],k=m*Math.ceil(_[0]/m)-m;for(;k<_[1]+m;)k=k+m,j.push(k);return j},y=_=>[[e.lt.x,_],[e.rt.x,_]],w=_=>[[_,e.lt.y],[_,e.lb.y]],f=_=>m=>P`<path stroke="black" vector-effect="non-scaling-stroke" stroke-width="${_}" d="${he(m)}"/>`,b=p(l,d).map(y).map(f(.2)),x=p(n,d).map(w).map(f(.2));return P`
		<g class="grid no-download">
			${f(.6)(o)}
			${f(.6)(i)}
			${b}
			${x}
		</g>
	`},me=e=>{var s;let r=e.shapes.map(o=>Array.isArray(o.d)?o.d.map(i=>q(i,o.color)):q(o.d,o.color)).flat(),t=(s=e.panZoomParams)==null?void 0:s.corners();return P`
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
				${e.panZoomParams&&e.gridSize>0&&e.grid?fe(e.panZoomParams.corners(),e.gridSize):""}
				<rect
					class="limits no-download"
					width="${e.limits.x[1]-e.limits.x[0]}"
					height="${e.limits.y[1]-e.limits.y[0]}"
					stroke="black" fill="transparent" stroke-width="1"
					vector-effect="non-scaling-stroke"
					transform="translate(${e.limits.x[0]}, ${e.limits.y[0]})"/>
				${e.storedPCB&&e.viewHandles?ge(e.storedPCB):""}
			</g>

		</svg>
	`},R=.02,ge=e=>e.components.map((r,t)=>P`
	<g class="no-download translate-handle">
		<path
	        d="${new de().arc(361,R).translate([r.posX,r.posY-R]).offset(.003).getPathData()}"
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
`);import{render as Ue}from"https://cdn.skypack.dev/lit-html";import ye from"https://cdn.skypack.dev/esprima";import"https://cdn.skypack.dev/astring";import{walk as E}from"https://cdn.skypack.dev/esprima-walk";function _e(e){let r=n=>n.includes("return kicadToObj("),s=e.codemirror.view.state.doc.toString().split(`
`),o=0,i=0;for(;;){let n=s[o];if(!n||(i+=n.length,o>s.length)||s[o]==="`)})()"&&!r(s[o+1]))break;o++}e.codemirror.foldRange(0,i+o)}function X(e,r){let t=document.querySelector("svg"),s=!1,o,i=0,n=0,u;r("mousedown",".translate-handle-trigger",l=>{s=!0,e.transforming=!0,i=0,n=0,o=t.panZoomParams.svgPoint({x:l.offsetX,y:l.offsetY}),u=l.target.dataset.index;let h=e.codemirror.view.state.doc.toString(),a=`()=>{${h}}`,d=ye.parseScript(a,{range:!0,comment:!0});console.log(d);let p=d.body[0].expression.body.body;console.log(p);let y=[];E(d,m=>{try{m.callee.type==="MemberExpression"&&m.callee.property.name==="add"&&y.push(m.arguments[1])}catch(j){}});let w=y.sort((m,j)=>m.range[0]-j.range[0]),f=m=>m.includes(".")?m.split(".")[1].length:m.length,b=(m,j)=>Math.round(m/j)*j,x=(m,j)=>Math.round(m*10**j)/10**j,_=m=>/[0-9]/i.test(m)||m===".";e.transformUpdate=(m,j)=>{let k=[];w[u].properties.forEach(A=>{if(A.key.name!=="translate")return;let[ae,le]=A.value.elements,M=!1;E(ae,g=>{if(!M&&g.type==="Literal"&&typeof g.value=="number"){g.ogValue||(g.ogValue=g.value),g.ogRaw||(g.ogRaw=g.raw);let $=g.ogValue+m;k.push({from:g.range[0]-5,to:g.range[1]-5,insert:`${e.gridSize===0?x($,f(g.ogRaw)):x(b($,e.gridSize),8)}`}),M=!0}});let L=!1;E(le,g=>{if(!L&&g.type==="Literal"&&typeof g.value=="number"){g.ogValue||(g.ogValue=g.value),g.ogRaw||(g.ogRaw=g.raw);let $=g.ogValue+j;k.push({from:g.range[0]-5,to:g.range[1]-5,insert:`${e.gridSize===0?x($,f(g.ogRaw)):x(b($,e.gridSize),8)}`}),L=!0}});let ce=e.codemirror.view.state.doc.toString();e.codemirror.view.dispatch({changes:{from:0,to:ce.length,insert:h}}),e.codemirror.view.dispatch({changes:k})}),_e(e)}}),r("mousemove","",l=>{if(!s)return;let h=t.panZoomParams.svgPoint({x:l.offsetX,y:l.offsetY}),a=h.x-o.x,d=h.y-o.y;dispatch("TRANSLATE",{x:a,y:d,index:u}),i=a,n=d}),r("mouseup","",l=>{s=!1,e.transforming=!1}),r("mouseleave","",l=>{s=!1,e.transforming=!1})}function F(e,r){let t=!1;r("mousedown","#vertical-bar",s=>{t=!0}),r("mousemove","",s=>{if(!t)return;let o=s.clientX/window.innerWidth*100;if(o===0)return;let i=1,n=99;o<i&&(o=i),o>n&&(o=n),document.documentElement.style.setProperty("--vertical-bar",`${o}%`),pauseEvent(s)}),r("mouseup","",s=>{t=!1})}function V(e,r){let t=!1,s=1,o=0,i=0,n={x:0,y:0};function u(a){a.style.transformOrigin=`${0}px ${0}px`,a.style.transform="translate("+o+"px, "+i+"px) scale("+s+")",e.gridSize>0&&dispatch("RENDER")}function l({x:a,y:d}){let p=(a-o)/s,y=(d-i)/s;return{x:p,y}}r("mousedown","",a=>{a.shiftKey||(t=!0,n={x:a.offsetX-o,y:a.offsetY-i},a.detail===2&&console.log(a.offsetX,a.offsetY,l({x:a.offsetX,y:a.offsetY})))}),r("mousemove","",a=>{if(!t||e.transforming)return;o=a.offsetX-n.x,i=a.offsetY-n.y;let d=document.querySelectorAll(".transform-group");for(let p of d)u(p)}),r("mouseup","",a=>{t=!1}),r("wheel","",a=>{let d=(a.offsetX-o)/s,p=(a.offsetY-i)/s;Math.sign(a.deltaY)<0?s*=1.03:s/=1.03,o=a.offsetX-d*s,i=a.offsetY-p*s;let y=document.querySelectorAll(".transform-group");for(let w of y)u(w);a.preventDefault()});function c(a){console.log("set scale x y");let p=document.querySelector("svg").getBoundingClientRect(),y=a.x[1]-a.x[0],w=a.y[1]-a.y[0],f=p.width/y,b=p.height/w,x=Math.min(f,b)*.9;s=x;let _={x:(a.x[0]+a.x[1])/2*x-p.width/2,y:(a.y[0]+a.y[1])/2*x-p.height/2};o=-_.x,i=-_.y;let m=document.querySelectorAll(".transform-group");for(let j of m)u(j)}function h(){let a=document.querySelector("svg");if(a===null)return null;let{left:d,right:p,bottom:y,top:w,width:f,height:b}=a.getBoundingClientRect(),x=l({x:f,y:b}),_=l({x:0,y:b}),m=l({x:f,y:0}),j=l({x:0,y:0});return{rt:x,lt:_,rb:m,lb:j}}return{scale:()=>s,x:()=>o,y:()=>i,corners:h,svgPoint:l,setScaleXY:c}}var z=0;function be(e){var r=new FileReader;r.readAsText(e),r.onloadend=t=>{let s=r.result;dispatch("UPLOAD_COMP",{text:s,name:`component${z}`}),z++}}function ve(e){var r=new FileReader;r.readAsText(e),r.onloadend=t=>{let s=r.result;dispatch("UPLOAD_JS",{text:s})}}function we(e,r=[]){let t=e[0],s=t.name.split("."),o=s[0],i=s[s.length-1];if(i==="kicad_mod")be(t);else if(i==="js")ve(t);else throw Error("Unknown extension:",i)}function H(e,r){r("drop","",function(t){let o=t.dataTransfer.files;we(o),pauseEvent(t)}),r("dragover","",function(t){pauseEvent(t)})}function Y(e,r){let t=null,s=null,o=document.querySelector("svg");r("mousedown","",n=>{!n.shiftKey||(t=o.panZoomParams.svgPoint({x:n.offsetX,y:n.offsetY}))}),r("mousemove","",n=>{document.body.classList.add("no-select"),!!n.shiftKey&&t!==null&&(s=o.panZoomParams.svgPoint({x:n.offsetX,y:n.offsetY}),e.selectBox.start=t,e.selectBox.end=s,dispatch("RENDER"))});function i(n,u){let{start:l,end:c}=u;return n.x>l.x&&n.x<c.x&&n.y>l.y&&n.y<c.y||n.x>l.x&&n.x<c.x&&n.y<l.y&&n.y>c.y||n.x<l.x&&n.x>c.x&&n.y>l.y&&n.y<c.y||n.x<l.x&&n.x>c.x&&n.y<l.y&&n.y>c.y}r("mouseup","",n=>{!n.shiftKey||(document.body.classList.remove("no-select"),t=null,s=null,e.selectBox.start=t,e.selectBox.end=s,dispatch("RENDER"))})}var Z=(e,r=!1)=>/[0-9]/i.test(e)||e==="."||r&&e==="-";function W(e,r){let t=!1,s,o,i,n,u,l;r("mousedown",".ͼb",c=>{let a=document.querySelector("code-mirror").view.state,d=a.doc,p=a.selection.main.head,y=d.lineAt(p),{from:w,to:f,text:b}=d.lineAt(p),x=p,_=p;for(;x>w&&Z(b[x-w-1],!0);)x--;for(;_<f&&Z(b[_-w]);)_++;l=b.slice(x-w,_-w),s=Number(l),t=!0,o=x,i=_,u=l.includes("."),n=l.includes(".")?l.split(".")[1].length:1}),r("mousemove","",c=>{if(!t)return;let h=document.querySelector("code-mirror"),a=0>c.movementX?1:-1,d=`${s}`;if(u){let w=Math.round(s*10**n)+c.movementX;w=Math.round(w)/10**n,s=w}else s+=c.movementX;let p=`${s}`;h.view.dispatch({changes:{from:o,to:o+l.length,insert:p}}),l=p,dispatch("RUN"),pauseEvent(c)}),r("mouseup","",c=>{t=!1})}function xe(e){return e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,e.returnValue=!1,!1}window.pauseEvent=xe;var G=e=>e.composedPath()[0],je=(e,r)=>G(e).matches(r),K=e=>(r,t,s)=>{e.addEventListener(r,o=>{o.trigger=G(o),(t===""||je(o,t))&&s(o)})};function J(e){let r=document.querySelector("svg"),t=K(r);r.panZoomParams=V(e,t),e.panZoomParams=r.panZoomParams,Y(e,t),X(e,t);let s=document.querySelector("body"),o=K(s);H(e,o),W(e,o),F(e,o),o("keydown","",i=>{let n=event.code;n==="Enter"&&event.shiftKey?(event.preventDefault(),dispatch("RUN",{save:!0})):n==="KeyT"&&event.shiftKey})}import{Turtle as v}from"https://leomcelroy.com/gram-js/exports.js";function Se(e){return new v().arc(360,e).originate()}function Te(e,r){return new v().forward(e).right(90).forward(r).right(90).repeat(1).originate()}v.prototype.circle=Se;v.prototype.rectangle=Te;var ke=([e,r],[t,s])=>Math.sqrt((t-e)**2+(s-r)**2),Pe=(e,r)=>ke(e,r)<1e-6,Q=(e,r)=>({F:{pos:[0,0],shape:new v().circle(r).getPathData(),layers:["F.Cu"],index:1},B:{pos:[0,0],shape:new v().circle(r).getPathData(),layers:["B.Cu"],index:2},drill:{pos:[0,0],shape:new v().circle(e).getPathData(),layers:["drill"]}}),ee=(e,r)=>{let t=e[0],s=new v;s.booleanScale=2e3,s.goto(t,!1);for(let o of e.slice(1))Pe(o,t)||(s.goto(o),t=o);return s.offset(r/2)},$e=([e,r],[t,s])=>[e+t,r+s];var Re=([e,r],t)=>[e*Math.cos(t)-r*Math.sin(t),r*Math.cos(t)+e*Math.sin(t)],re=class{constructor({pads:r,layers:t}){this.pads=r,this.layers=t}pad(r){return this.pads[r]}padX(r){return this.pads[r][0]}padY(r){return this.pads[r][1]}get pos(){return this.pads.center}get posX(){return this.pads.center[0]}get posY(){return this.pads.center[1]}};function te(e,r={}){let t=r.translate||[0,0],s=r.rotate||0,o=r.padLabelSize||2e-4,i=r.componentLabelSize||3e-4,[n,u]=t,l=s*Math.PI/180,c={},h=[],a={};for(let d in e){let{pos:p,shape:y,layers:w}=e[d];y=typeof y=="string"?new v().bezier(y):y.copy();let f=$e(Re(p,l),t);if(c[d]=f,y.translate(f).rotate(s,f),!d.includes("_drill")){let b=new v().text(d).scale(o).originate().translate(f);h.push(b)}w.forEach(b=>{b in a?a[b]=a[b].group(y):a[b]=y})}return c.center=t,a.padLabels=h.reduce((d,p)=>d.group(p),new v),new re({pads:c,layers:a})}var C=class{constructor(){this.layers={},this.components=[]}add(r,t={}){let s=t.name||"",o={translate:t.translate||[0,0],rotate:t.rotate||0,padLabelSize:t.padLabelSize||3e-4,componentLabelSize:t.componentLabelSize||4e-4},i=te(r,o);for(let n in i.layers)this.addShape(n,i.layers[n]);if(s!==""&&!s.includes("_drill")){let n=new v().text(s).scale(o.componentLabelSize).originate().translate(o.translate);this.addShape("componentLabels",n)}return this.components.push(i),i}addShape(r,t){return t instanceof v?(r in this.layers?this.layers[r]=this.layers[r].group(t):this.layers[r]=t,this.layers[r]):console.error("Shape isn't Turtle.")}subtractShape(r,t){return t instanceof v?(r in this.layers?this.layers[r]=this.layers[r].difference(t):this.layers[r]=new v,this.layers[r]):console.error("Shape isn't Turtle.")}getLayer(r,t=!1){let s=r.includes("Labels");return t=!r.includes("Labels"),this.layers[r]?t?this.layers[r].flatten().getPathData(s):this.layers[r].getPathData(s):""}wire(r,t,s="F.Cu"){this.addShape(s,ee(r,t))}};function S(e){this._line=this._col=this._pos=0,this._stream=e}S.not_whitespace_or_end=/^(\S|$)/;S.space_quote_paren_escaped_or_end=/^(\s|\\|"|'|`|,|\(|\)|$)/;S.string_or_escaped_or_end=/^(\\|"|$)/;S.string_delimiters=/["]/;S.quotes=/['`,]/;S.quotes_map={"'":"quote","`":"quasiquote",",":"unquote"};S.prototype={peek:Ce,consume:De,until:Ae,error:Ee,string:Me,atom:Le,quoted:Ie,expr:Ne,list:Oe};function se(e){var r=new S(e),t=r.expr();return t instanceof Error?t:r.peek()!=""?r.error("Superfluous characters after expression: `"+r.peek()+"`"):t}function Ee(e){var r=new Error("Syntax error: "+e);return r.line=this._line+1,r.col=this._col+1,r}function Ce(){return this._stream.length==this._pos?"":this._stream[this._pos]}function De(){if(this._stream.length==this._pos)return"";var e=this._stream[this._pos];return this._pos+=1,e=="\r"?(this.peek()==`
`&&(this._pos+=1,e+=`
`),this._line++,this._col=0):e==`
`?(this._line++,this._col=0):this._col++,e}function Ae(e){for(var r="";!e.test(this.peek());)r+=this.consume();return r}function Me(){for(var e=this.consume(),r="";;){r+=this.until(S.string_or_escaped_or_end);var t=this.peek();if(t=="")return this.error("Unterminated string literal");if(t==e){this.consume();break}if(t=="\\"){this.consume(),t=this.peek(),t=="r"?(this.consume(),r+="\r"):t=="t"?(this.consume(),r+="	"):t=="n"?(this.consume(),r+=`
`):t=="f"?(this.consume(),r+="\f"):t=="b"?(this.consume(),r+="\b"):r+=this.consume();continue}r+=this.consume()}return new String(r)}function Le(){if(S.string_delimiters.test(this.peek()))return this.string();for(var e="";;){e+=this.until(S.space_quote_paren_escaped_or_end);var r=this.peek();if(r=="\\"){this.consume(),e+=this.consume();continue}break}return e}function Ie(){var e=this.consume(),r=S.quotes_map[e];r=="unquote"&&this.peek()=="@"&&(this.consume(),r="unquote-splicing",e=",@"),this.until(S.not_whitespace_or_end);var t=this.expr();return t instanceof Error?t:t===""?this.error("Unexpected `"+this.peek()+"` after `"+e+"`"):[r,t]}function Ne(){if(this.until(S.not_whitespace_or_end),S.quotes.test(this.peek()))return this.quoted();var e=this.peek()=="("?this.list():this.atom();return this.until(S.not_whitespace_or_end),e}function Oe(){if(this.peek()!="(")return this.error("Expected `(` - saw `"+this.peek()+"` instead.");this.consume();var e=[],r=this.expr();if(r instanceof Error)return r;if(r!=="")for(e.push(r);(r=this.expr())!=="";){if(r instanceof Error)return r;e.push(r)}return this.peek()!=")"?this.error("Expected `)` - saw: `"+this.peek()+"`"):(this.consume(),e)}var Be=e=>e.reduce((r,t)=>{let s=t.split(".");return s.length===0?r:s[0]!=="*"?[...r,t]:[...r,`F.${s[1]}`,`B.${s[1]}`]},[]);function oe(e){let r=se(e),t=1/25.4,s={};for(let i of r){let n=i[0]==="pad",u=i[2]==="smd",l=i[2]==="thru_hole",c=i[3];if(n&&(u||l)){let h=i[1],a=i[4].slice(1).map(f=>Number(f)*t);a[1]=-a[1];let d=i[i.length-1];d=d?d.slice(1):[],d=Be(d);let p=i[5].slice(1).map(f=>Number(f)*t),y=c==="rect"?new v().rectangle(...p):new v().circle(p[0]);if(s[h]===void 0?s[h]=[{pos:a,shape:y,layers:d}]:s[h].push({pos:a,shape:y,layers:d}),i[i.length-2]?i[i.length-2][0]==="drill":!1){let f=Number(i[i.length-2][1])/25.4,b={pos:a,shape:new v().circle(f),layers:["drill"]};s[`${h}_drill`]===void 0?s[`${h}_drill`]=[b]:s[`${h}_drill`].push(b)}}}return Object.entries(s).reduce((i,n)=>{let[u,l]=n;return l.length===1?i[u]=l[0]:l.forEach((c,h)=>{i[`${u}_${h+1}`]=c}),i},{})}var D={codemirror:void 0,storedPCB:void 0,transforming:!1,transformUpdate:()=>{},selectBox:{},shapes:[],limits:{x:[0,1],y:[0,1]},mm_per_unit:25.4,grid:!0,gridSize:.05,viewHandles:!0,panZoomParams:void 0},ne=class extends C{constructor(){super();D.storedPCB=this}},ie={kicadToObj:oe,PCB:ne,via:Q,Turtle:v};async function qe(e,r){let s=await(await fetch(e,{mode:"cors"})).text();r.codemirror.view.dispatch({changes:{from:0,insert:s}});let o=c=>c.includes("return kicadToObj("),n=r.codemirror.view.state.doc.toString().split(`
`),u=0,l=0;for(;;){let c=n[u];if(!c||(l+=c.length,u>n.length)||n[u]==="`)})()"&&!o(n[u+1]))break;u++}r.codemirror.foldRange(0,l+u),T("RUN"),document.querySelector(".center-button").click()}var Xe={INIT(e,r){T("RENDER"),r.codemirror=document.querySelector("#code-editor"),J(r);let t=new URL(window.location.href),s=window.location.search,o=new URLSearchParams(s).get("code"),i=new URLSearchParams(s).get("file"),n=new URLSearchParams(s).get("handles")==="false",u=new URLSearchParams(s).get("grid")==="false";if(n&&(r.viewHandles=!1),u&&(r.grid=!1),!o)if(i){let l=i;i.startsWith("http")||(l=`examples/${i}`),qe(l,r)}else{let l=window.localStorage.getItem("svg-pcb");r.codemirror.view.dispatch({changes:{from:0,insert:l!=null?l:""}}),T("RUN"),document.querySelector(".center-button").click()}T("RENDER")},RUN({save:e=!1},r){let t=r.codemirror.view.state.doc.toString(),o=new Function(...Object.keys(ie),t)(...Object.values(ie)),{shapes:i,limits:n,mm_per_unit:u}=typeof o=="string"?JSON.parse(o):o;r.shapes=i,r.limits=n,r.mm_per_unit=u,e&&window.localStorage.setItem("svg-pcb",t),T("RENDER")},UPLOAD_COMP({text:e,name:r},t){e=e.replaceAll("$",""),e=`const ${r} = (() => { return kicadToObj(
\`${e}\`)})()
`,t.codemirror.view.dispatch({changes:{from:0,insert:e}}),t.codemirror.foldRange(0,e.length),T("RENDER")},UPLOAD_JS({text:e},r){let t=r.codemirror.view.state.doc.toString().length;r.codemirror.view.dispatch({changes:{from:0,to:t,insert:e}}),T("RUN"),document.querySelector(".center-button").click()},ADD_IMPORT({text:e,name:r},t){e=`const ${r} = ${e}
`,t.codemirror.view.dispatch({changes:{from:0,insert:e}}),T("RENDER")},TRANSLATE({x:e,y:r,index:t},s){s.transformUpdate(e,r),T("RUN")},RENDER(){Ue(U(D),document.getElementById("root"))}};function T(e,r={}){let t=Xe[e];t?t(r,D):console.log("Action not recongnized:",e)}window.dispatch=T;window.addEventListener("load",()=>{T("INIT")});
//# sourceMappingURL=main.js.map
