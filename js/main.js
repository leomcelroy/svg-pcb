import{html as O,svg as P}from"https://cdn.skypack.dev/lit-html";import{Turtle as ce}from"https://leomcelroy.com/gram-js/exports.js";import"https://leomcelroy.com/widgets/code-mirror.js";var I=["./library/connectors/ESP8266_12E.json","./library/connectors/header_FTDI.json","./library/connectors/power_65mm.json","./library/connectors/ESP32_CAM.json","./library/connectors/USB_A_plug.json","./library/connectors/header_i0.json","./library/connectors/header_serial_reverse.json","./library/connectors/header_4.json","./library/connectors/header_signal.json","./library/connectors/MTA_i0.json","./library/connectors/HM11.json","./library/connectors/header_MFRC522.json","./library/connectors/header_serial_reverse_5V.json","./library/connectors/USB_mini_B.json","./library/connectors/ESC.json","./library/connectors/MTA_PS2.json","./library/connectors/header_APA.json","./library/connectors/MTA_ICP.json","./library/connectors/stereo_2_5mm.json","./library/connectors/header_VL53L1X_3415.json","./library/connectors/Molex_serial.json","./library/connectors/header_SWD_4_1.json","./library/connectors/ESP_01.json","./library/connectors/HCSR04.json","./library/connectors/header_SWD_4_05.json","./library/connectors/ESP32_WROOM.json","./library/connectors/header_serial.json","./library/connectors/header_PDI.json","./library/connectors/I2C4x1v.json","./library/connectors/header_power.json","./library/connectors/MTA_serial.json","./library/connectors/header_LSM6DS33_2736.json","./library/connectors/MTA_2.json","./library/connectors/MTA_3.json","./library/connectors/header_LCD.json","./library/connectors/screw_terminal_2.json","./library/connectors/HCSR501.json","./library/connectors/screw_terminal_i0.json","./library/connectors/header_unipolar_stepper.json","./library/connectors/screw_terminal_power.json","./library/connectors/header_nRF24L01.json","./library/connectors/header_serial_reverse_3V3.json","./library/connectors/MTA_power.json","./library/connectors/MTA_4.json","./library/connectors/RCWL0516.json","./library/connectors/ESP_WROOM_02D.json","./library/connectors/RN4871.json","./library/connectors/header_I2C.json","./library/connectors/header_SWD.json","./library/connectors/header_servo.json","./library/connectors/microSD.json","./library/connectors/header_4H.json","./library/connectors/header_UPDI.json","./library/connectors/I2C4x1i.json","./library/connectors/I2C4x1h.json","./library/connectors/header_ISP.json","./library/connectors/header_NEO_6M.json","./library/connectors/MTA_5.json","./library/connectors/header_6.json","./library/connectors/header_UPDI_reverse.json","./library/connectors/header_bus.json","./library/connectors/TFT8x1v.json","./library/connectors/header_2H.json","./library/connectors/header_ATP.json","./library/switches/button_6mm.json","./library/switches/slide_switch.json","./library/diodes_transistors_regulators_sensors/D_1206.json","./library/diodes_transistors_regulators_sensors/mic_SPM1437.json","./library/diodes_transistors_regulators_sensors/LED_1206.json","./library/diodes_transistors_regulators_sensors/NMOSFET_TO252AA.json","./library/diodes_transistors_regulators_sensors/regulator_SOT223.json","./library/diodes_transistors_regulators_sensors/regulator_SOT23.json","./library/diodes_transistors_regulators_sensors/VL53L1X.json","./library/diodes_transistors_regulators_sensors/H_bridge_SM8.json","./library/diodes_transistors_regulators_sensors/SPG08P4HM4H.json","./library/diodes_transistors_regulators_sensors/Hall_SOT23.json","./library/diodes_transistors_regulators_sensors/VEML6040.json","./library/diodes_transistors_regulators_sensors/phototransistor_1206.json","./library/diodes_transistors_regulators_sensors/LED_RGB.json","./library/diodes_transistors_regulators_sensors/accel_MXD6235M.json","./library/diodes_transistors_regulators_sensors/ADXL343.json","./library/diodes_transistors_regulators_sensors/mic_SPU0414HR5H.json","./library/diodes_transistors_regulators_sensors/D_SOD_123.json","./library/diodes_transistors_regulators_sensors/LED_3014_1100.json","./library/diodes_transistors_regulators_sensors/A4953_SOICN.json","./library/diodes_transistors_regulators_sensors/NMOSFET_SOT23.json","./library/diodes_transistors_regulators_sensors/phototransistor_PLCC2.json","./library/diodes_transistors_regulators_sensors/PMOSFET_SOT23.json","./library/diodes_transistors_regulators_sensors/DRV8428_HTSSOP.json","./library/diodes_transistors_regulators_sensors/CMM4030D261I2STR.json","./library/crystals_and_resonators/XTAL_CSM_7.json","./library/crystals_and_resonators/XTAL_NX5032GA.json","./library/crystals_and_resonators/XTAL_EFOBM.json","./library/discretes/R_0402.json","./library/discretes/ST4EB.json","./library/discretes/C_1206.json","./library/discretes/R_1206.json","./library/discretes/choke.json","./library/discretes/L_1210.json","./library/discretes/C_FND.json","./library/ICs/CBA.json","./library/ICs/SAMD21E.json","./library/ICs/AVRDB28.json","./library/ICs/FT230XS.json","./library/ICs/ATtiny1614.json","./library/ICs/fab.json","./library/ICs/ATtiny44_SOICN.json","./library/ICs/ATxmegaE5_TQFP.json","./library/ICs/op_amp_SOICN.json","./library/ICs/ATtiny45_SOIC.json","./library/ICs/ATmega88_TQFP.json","./library/ICs/SAMD11D.json","./library/ICs/TRC102.json","./library/ICs/ATtiny412.json","./library/ICs/ATmega644_TQFP.json","./library/ICs/op_amp_SOT23_5.json","./library/ICs/SAMD11C.json","./library/ICs/ATtiny3216.json"];function N(e){let r=new XMLSerializer,t=document.querySelector("svg").cloneNode(!0),o=t.querySelectorAll(".no-download");for(let h of o)h.remove();let s=t.querySelector(".transform-group");s.style.transformOrigin="",s.style.transform="";let i=e.limits.x[1]-e.limits.x[0],n=e.limits.y[1]-e.limits.y[0];t.setAttribute("width",`${i*e.mm_per_unit}mm`),t.setAttribute("height",`${n*e.mm_per_unit}mm`),t.setAttribute("viewBox",`${e.limits.x[0]} ${e.limits.y[0]} ${i} ${n}`),t.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");let m=r.serializeToString(t),l="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(m),c=document.createElement("a");c.href=l,c.download="download.svg",document.body.appendChild(c),c.click(),document.body.removeChild(c)}function B(e,r){let t=new Blob([r],{type:"text/plain"});var o=document.createElement("a");o.href=URL.createObjectURL(t),o.download=`${e}`,o.click(),URL.revokeObjectURL(o)}var de=e=>e.map(r=>r.slice(10)).map(r=>O`
	<div class="import-item" @mousedown=${async t=>{let s=await(await fetch(`neil-components/${r}`)).text();dispatch("ADD_IMPORT",{text:s,name:t.target.innerText.split("/")[1].split(".")[0]})}}>${r}</div>
`);function q(e){return O`
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
				 		${de(I)}
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
		${ue(e)}
		<div id="vertical-bar"></div>
	`}var me=e=>e.length===4?`rgba(${e.map((r,t)=>t<3?Math.round(r*255):r).join(",")})`:"rgba(255, 255, 255, 1)",X=(e,r)=>P`
	<path
		d="${e}"
		fill-rule="nonzero"
		fill="${typeof r=="string"?r:me(r)}"/>
`,pe=e=>e.reduce((r,t,o)=>`${r} ${o===0?"M":"L"} ${t.join(",")}`,""),he=(e,r)=>{let t=[[e.lt.x,(e.lt.y+e.lb.y)/2],[e.rt.x,(e.rt.y+e.rb.y)/2]],o=[[(e.lt.x+e.rt.x)/2,e.lt.y],[(e.lb.x+e.rb.x)/2,e.lb.y]],s=[[e.lt.x,0],[e.rt.x,0]],i=[[0,e.lt.y],[0,e.lb.y]],n=[e.lt.x,e.rt.x],m=Math.abs(n[1]-n[0]),l=[e.lb.y,e.lt.y],c=Math.abs(l[1]-l[0]);function h(_,u){return Math.log(u)/Math.log(_)}let a=Math.round(h(5,Math.max(m,c))),d=r,p=(_,u)=>{let j=[],k=u*Math.ceil(_[0]/u)-u;for(;k<_[1]+u;)k=k+u,j.push(k);return j},y=_=>[[e.lt.x,_],[e.rt.x,_]],w=_=>[[_,e.lt.y],[_,e.lb.y]],f=_=>u=>P`<path stroke="black" vector-effect="non-scaling-stroke" stroke-width="${_}" d="${pe(u)}"/>`,b=p(l,d).map(y).map(f(.2)),x=p(n,d).map(w).map(f(.2));return P`
		<g class="grid no-download">
			${f(.6)(s)}
			${f(.6)(i)}
			${b}
			${x}
		</g>
	`},ue=e=>{var o;let r=e.shapes.map(s=>Array.isArray(s.d)?s.d.map(i=>X(i,s.color)):X(s.d,s.color)).flat(),t=(o=e.panZoomParams)==null?void 0:o.corners();return P`
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
				${e.panZoomParams&&e.gridSize>0&&e.grid?he(e.panZoomParams.corners(),e.gridSize):""}
				<rect
					class="limits no-download"
					width="${e.limits.x[1]-e.limits.x[0]}"
					height="${e.limits.y[1]-e.limits.y[0]}"
					stroke="black" fill="transparent" stroke-width="1"
					vector-effect="non-scaling-stroke"
					transform="translate(${e.limits.x[0]}, ${e.limits.y[0]})"/>
				${e.storedPCB&&e.viewHandles?fe(e.storedPCB):""}
			</g>

		</svg>
	`},R=.02,fe=e=>e.components.map((r,t)=>P`
	<g class="no-download translate-handle">
		<path
	        d="${new ce().arc(361,R).translate([r.posX,r.posY-R]).offset(.003).getPathData()}"
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
`);import{render as Oe}from"https://cdn.skypack.dev/lit-html";import ge from"https://cdn.skypack.dev/esprima";import"https://cdn.skypack.dev/astring";import{walk as E}from"https://cdn.skypack.dev/esprima-walk";function ye(e){let r=n=>n.includes("return kicadToObj("),o=e.codemirror.view.state.doc.toString().split(`
`),s=0,i=0;for(;;){let n=o[s];if(!n||(i+=n.length,s>o.length)||o[s]==="`)})()"&&!r(o[s+1]))break;s++}e.codemirror.foldRange(0,i+s)}function U(e,r){let t=document.querySelector("svg"),o=!1,s,i=0,n=0,m;r("mousedown",".translate-handle-trigger",l=>{o=!0,e.transforming=!0,i=0,n=0,s=t.panZoomParams.svgPoint({x:l.offsetX,y:l.offsetY}),m=l.target.dataset.index;let h=e.codemirror.view.state.doc.toString(),a=`()=>{${h}}`,d=ge.parseScript(a,{range:!0,comment:!0});console.log(d);let p=d.body[0].expression.body.body;console.log(p);let y=[];E(d,u=>{try{u.callee.type==="MemberExpression"&&u.callee.property.name==="add"&&y.push(u.arguments[1])}catch(j){}});let w=y.sort((u,j)=>u.range[0]-j.range[0]),f=u=>u.includes(".")?u.split(".")[1].length:u.length,b=(u,j)=>Math.round(u/j)*j,x=(u,j)=>Math.round(u*10**j)/10**j,_=u=>/[0-9]/i.test(u)||u===".";e.transformUpdate=(u,j)=>{let k=[];w[m].properties.forEach(A=>{if(A.key.name!=="translate")return;let[ie,ae]=A.value.elements,M=!1;E(ie,g=>{if(!M&&g.type==="Literal"&&typeof g.value=="number"){g.ogValue||(g.ogValue=g.value),g.ogRaw||(g.ogRaw=g.raw);let $=g.ogValue+u;k.push({from:g.range[0]-5,to:g.range[1]-5,insert:`${e.gridSize===0?x($,f(g.ogRaw)):x(b($,e.gridSize),8)}`}),M=!0}});let L=!1;E(ae,g=>{if(!L&&g.type==="Literal"&&typeof g.value=="number"){g.ogValue||(g.ogValue=g.value),g.ogRaw||(g.ogRaw=g.raw);let $=g.ogValue+j;k.push({from:g.range[0]-5,to:g.range[1]-5,insert:`${e.gridSize===0?x($,f(g.ogRaw)):x(b($,e.gridSize),8)}`}),L=!0}});let le=e.codemirror.view.state.doc.toString();e.codemirror.view.dispatch({changes:{from:0,to:le.length,insert:h}}),e.codemirror.view.dispatch({changes:k})}),ye(e)}}),r("mousemove","",l=>{if(!o)return;let h=t.panZoomParams.svgPoint({x:l.offsetX,y:l.offsetY}),a=h.x-s.x,d=h.y-s.y;dispatch("TRANSLATE",{x:a,y:d,index:m}),i=a,n=d}),r("mouseup","",l=>{o=!1,e.transforming=!1}),r("mouseleave","",l=>{o=!1,e.transforming=!1})}function V(e,r){let t=!1;r("mousedown","#vertical-bar",o=>{t=!0}),r("mousemove","",o=>{if(!t)return;let s=o.clientX/window.innerWidth*100;if(s===0)return;let i=1,n=99;s<i&&(s=i),s>n&&(s=n),document.documentElement.style.setProperty("--vertical-bar",`${s}%`),pauseEvent(o)}),r("mouseup","",o=>{t=!1})}function F(e,r){let t=!1,o=1,s=0,i=0,n={x:0,y:0};function m(a){a.style.transformOrigin=`${0}px ${0}px`,a.style.transform="translate("+s+"px, "+i+"px) scale("+o+")",e.gridSize>0&&dispatch("RENDER")}function l({x:a,y:d}){let p=(a-s)/o,y=(d-i)/o;return{x:p,y}}r("mousedown","",a=>{a.shiftKey||(t=!0,n={x:a.offsetX-s,y:a.offsetY-i},a.detail===2&&console.log(a.offsetX,a.offsetY,l({x:a.offsetX,y:a.offsetY})))}),r("mousemove","",a=>{if(!t||e.transforming)return;s=a.offsetX-n.x,i=a.offsetY-n.y;let d=document.querySelectorAll(".transform-group");for(let p of d)m(p)}),r("mouseup","",a=>{t=!1}),r("wheel","",a=>{let d=(a.offsetX-s)/o,p=(a.offsetY-i)/o;Math.sign(a.deltaY)<0?o*=1.03:o/=1.03,s=a.offsetX-d*o,i=a.offsetY-p*o;let y=document.querySelectorAll(".transform-group");for(let w of y)m(w);a.preventDefault()});function c(a){console.log("set scale x y");let p=document.querySelector("svg").getBoundingClientRect(),y=a.x[1]-a.x[0],w=a.y[1]-a.y[0],f=p.width/y,b=p.height/w,x=Math.min(f,b)*.9;o=x;let _={x:(a.x[0]+a.x[1])/2*x-p.width/2,y:(a.y[0]+a.y[1])/2*x-p.height/2};s=-_.x,i=-_.y;let u=document.querySelectorAll(".transform-group");for(let j of u)m(j)}function h(){let a=document.querySelector("svg");if(a===null)return null;let{left:d,right:p,bottom:y,top:w,width:f,height:b}=a.getBoundingClientRect(),x=l({x:f,y:b}),_=l({x:0,y:b}),u=l({x:f,y:0}),j=l({x:0,y:0});return{rt:x,lt:_,rb:u,lb:j}}return{scale:()=>o,x:()=>s,y:()=>i,corners:h,svgPoint:l,setScaleXY:c}}var z=0;function _e(e){var r=new FileReader;r.readAsText(e),r.onloadend=t=>{let o=r.result;dispatch("UPLOAD_COMP",{text:o,name:`component${z}`}),z++}}function be(e){var r=new FileReader;r.readAsText(e),r.onloadend=t=>{let o=r.result;dispatch("UPLOAD_JS",{text:o})}}function ve(e,r=[]){let t=e[0],o=t.name.split("."),s=o[0],i=o[o.length-1];if(i==="kicad_mod")_e(t);else if(i==="js")be(t);else throw Error("Unknown extension:",i)}function H(e,r){r("drop","",function(t){let s=t.dataTransfer.files;ve(s),pauseEvent(t)}),r("dragover","",function(t){pauseEvent(t)})}function Y(e,r){let t=null,o=null,s=document.querySelector("svg");r("mousedown","",n=>{!n.shiftKey||(t=s.panZoomParams.svgPoint({x:n.offsetX,y:n.offsetY}))}),r("mousemove","",n=>{document.body.classList.add("no-select"),!!n.shiftKey&&t!==null&&(o=s.panZoomParams.svgPoint({x:n.offsetX,y:n.offsetY}),e.selectBox.start=t,e.selectBox.end=o,dispatch("RENDER"))});function i(n,m){let{start:l,end:c}=m;return n.x>l.x&&n.x<c.x&&n.y>l.y&&n.y<c.y||n.x>l.x&&n.x<c.x&&n.y<l.y&&n.y>c.y||n.x<l.x&&n.x>c.x&&n.y>l.y&&n.y<c.y||n.x<l.x&&n.x>c.x&&n.y<l.y&&n.y>c.y}r("mouseup","",n=>{!n.shiftKey||(document.body.classList.remove("no-select"),t=null,o=null,e.selectBox.start=t,e.selectBox.end=o,dispatch("RENDER"))})}var Z=(e,r=!1)=>/[0-9]/i.test(e)||e==="."||r&&e==="-";function W(e,r){let t=!1,o,s,i,n,m,l;r("mousedown",".ͼb",c=>{let a=document.querySelector("code-mirror").view.state,d=a.doc,p=a.selection.main.head,y=d.lineAt(p),{from:w,to:f,text:b}=d.lineAt(p),x=p,_=p;for(;x>w&&Z(b[x-w-1],!0);)x--;for(;_<f&&Z(b[_-w]);)_++;l=b.slice(x-w,_-w),o=Number(l),t=!0,s=x,i=_,m=l.includes("."),n=l.includes(".")?l.split(".")[1].length:1}),r("mousemove","",c=>{if(!t)return;let h=document.querySelector("code-mirror"),a=0>c.movementX?1:-1,d=`${o}`;if(m){let w=Math.round(o*10**n)+c.movementX;w=Math.round(w)/10**n,o=w}else o+=c.movementX;let p=`${o}`;h.view.dispatch({changes:{from:s,to:s+l.length,insert:p}}),l=p,dispatch("RUN"),pauseEvent(c)}),r("mouseup","",c=>{t=!1})}function we(e){return e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,e.returnValue=!1,!1}window.pauseEvent=we;var G=e=>e.composedPath()[0],xe=(e,r)=>G(e).matches(r),K=e=>(r,t,o)=>{e.addEventListener(r,s=>{s.trigger=G(s),(t===""||xe(s,t))&&o(s)})};function J(e){let r=document.querySelector("svg"),t=K(r);r.panZoomParams=F(e,t),e.panZoomParams=r.panZoomParams,Y(e,t),U(e,t);let o=document.querySelector("body"),s=K(o);H(e,s),W(e,s),V(e,s),s("keydown","",i=>{let n=event.code;n==="Enter"&&event.shiftKey?(event.preventDefault(),dispatch("RUN",{save:!0})):n==="KeyT"&&event.shiftKey})}import{Turtle as v}from"https://leomcelroy.com/gram-js/exports.js";function je(e){return new v().arc(360,e).originate()}function Se(e,r){return new v().forward(e).right(90).forward(r).right(90).repeat(1).originate()}v.prototype.circle=je;v.prototype.rectangle=Se;var Te=([e,r],[t,o])=>Math.sqrt((t-e)**2+(o-r)**2),ke=(e,r)=>Te(e,r)<1e-6,Q=(e,r)=>{let t=e[0],o=new v;o.booleanScale=2e3,o.goto(t,!1);for(let s of e.slice(1))ke(s,t)||(o.goto(s),t=s);return o.offset(r/2)},Pe=([e,r],[t,o])=>[e+t,r+o];var $e=([e,r],t)=>[e*Math.cos(t)-r*Math.sin(t),r*Math.cos(t)+e*Math.sin(t)],ee=class{constructor({pads:r,layers:t}){this.pads=r,this.layers=t}pad(r){return this.pads[r]}padX(r){return this.pads[r][0]}padY(r){return this.pads[r][1]}get pos(){return this.pads.center}get posX(){return this.pads.center[0]}get posY(){return this.pads.center[1]}};function re(e,r={}){let t=r.translate||[0,0],o=r.rotate||0,s=r.padLabelSize||2e-4,i=r.componentLabelSize||3e-4,[n,m]=t,l=o*Math.PI/180,c={},h=[],a={};for(let d in e){let{pos:p,shape:y,layers:w}=e[d];y=typeof y=="string"?new v().bezier(y):y.copy();let f=Pe($e(p,l),t);if(c[d]=f,y.translate(f).rotate(o,f),!d.includes("_drill")){let b=new v().text(d).scale(s).originate().translate(f);h.push(b)}w.forEach(b=>{b in a?a[b]=a[b].group(y):a[b]=y})}return c.center=t,a.padLabels=h.reduce((d,p)=>d.group(p),new v),new ee({pads:c,layers:a})}var C=class{constructor(){this.layers={},this.components=[]}add(r,t={}){let o=t.name||"",s={translate:t.translate||[0,0],rotate:t.rotate||0,padLabelSize:t.padLabelSize||3e-4,componentLabelSize:t.componentLabelSize||4e-4},i=re(r,s);for(let n in i.layers)this.addShape(n,i.layers[n]);if(o!==""&&!o.includes("_drill")){let n=new v().text(o).scale(s.componentLabelSize).originate().translate(s.translate);this.addShape("componentLabels",n)}return this.components.push(i),i}via(r,t,o,s){let i={"1":{pos:[0,0],shape:new v().circle(o).getPathData(),layers:["F.Cu"],index:1},"2":{pos:[0,0],shape:new v().circle(o).getPathData(),layers:["B.Cu"],index:2},drill:{pos:[0,0],shape:new v().circle(t).getPathData(),layers:["drill"]}};return this.add(i,{translate:r,name:s})}addShape(r,t){return t instanceof v?(r in this.layers?this.layers[r]=this.layers[r].group(t):this.layers[r]=t,this.layers[r]):console.error("Shape isn't Turtle.")}subtractShape(r,t){return t instanceof v?(r in this.layers?this.layers[r]=this.layers[r].difference(t):this.layers[r]=new v,this.layers[r]):console.error("Shape isn't Turtle.")}getLayer(r,t=!1){let o=r.includes("Labels");return t=!r.includes("Labels"),this.layers[r]?t?this.layers[r].flatten().getPathData(o):this.layers[r].getPathData(o):""}wire(r,t,o="F.Cu"){this.addShape(o,Q(r,t))}};function S(e){this._line=this._col=this._pos=0,this._stream=e}S.not_whitespace_or_end=/^(\S|$)/;S.space_quote_paren_escaped_or_end=/^(\s|\\|"|'|`|,|\(|\)|$)/;S.string_or_escaped_or_end=/^(\\|"|$)/;S.string_delimiters=/["]/;S.quotes=/['`,]/;S.quotes_map={"'":"quote","`":"quasiquote",",":"unquote"};S.prototype={peek:Ee,consume:Ce,until:De,error:Re,string:Ae,atom:Me,quoted:Le,expr:Ie,list:Ne};function te(e){var r=new S(e),t=r.expr();return t instanceof Error?t:r.peek()!=""?r.error("Superfluous characters after expression: `"+r.peek()+"`"):t}function Re(e){var r=new Error("Syntax error: "+e);return r.line=this._line+1,r.col=this._col+1,r}function Ee(){return this._stream.length==this._pos?"":this._stream[this._pos]}function Ce(){if(this._stream.length==this._pos)return"";var e=this._stream[this._pos];return this._pos+=1,e=="\r"?(this.peek()==`
`&&(this._pos+=1,e+=`
`),this._line++,this._col=0):e==`
`?(this._line++,this._col=0):this._col++,e}function De(e){for(var r="";!e.test(this.peek());)r+=this.consume();return r}function Ae(){for(var e=this.consume(),r="";;){r+=this.until(S.string_or_escaped_or_end);var t=this.peek();if(t=="")return this.error("Unterminated string literal");if(t==e){this.consume();break}if(t=="\\"){this.consume(),t=this.peek(),t=="r"?(this.consume(),r+="\r"):t=="t"?(this.consume(),r+="	"):t=="n"?(this.consume(),r+=`
`):t=="f"?(this.consume(),r+="\f"):t=="b"?(this.consume(),r+="\b"):r+=this.consume();continue}r+=this.consume()}return new String(r)}function Me(){if(S.string_delimiters.test(this.peek()))return this.string();for(var e="";;){e+=this.until(S.space_quote_paren_escaped_or_end);var r=this.peek();if(r=="\\"){this.consume(),e+=this.consume();continue}break}return e}function Le(){var e=this.consume(),r=S.quotes_map[e];r=="unquote"&&this.peek()=="@"&&(this.consume(),r="unquote-splicing",e=",@"),this.until(S.not_whitespace_or_end);var t=this.expr();return t instanceof Error?t:t===""?this.error("Unexpected `"+this.peek()+"` after `"+e+"`"):[r,t]}function Ie(){if(this.until(S.not_whitespace_or_end),S.quotes.test(this.peek()))return this.quoted();var e=this.peek()=="("?this.list():this.atom();return this.until(S.not_whitespace_or_end),e}function Ne(){if(this.peek()!="(")return this.error("Expected `(` - saw `"+this.peek()+"` instead.");this.consume();var e=[],r=this.expr();if(r instanceof Error)return r;if(r!=="")for(e.push(r);(r=this.expr())!=="";){if(r instanceof Error)return r;e.push(r)}return this.peek()!=")"?this.error("Expected `)` - saw: `"+this.peek()+"`"):(this.consume(),e)}var Be=e=>e.reduce((r,t)=>{let o=t.split(".");return o.length===0?r:o[0]!=="*"?[...r,t]:[...r,`F.${o[1]}`,`B.${o[1]}`]},[]);function oe(e){let r=te(e),t=1/25.4,o={};for(let i of r){let n=i[0]==="pad",m=i[2]==="smd",l=i[2]==="thru_hole",c=i[3];if(n&&(m||l)){let h=i[1],a=i[4].slice(1).map(f=>Number(f)*t);a[1]=-a[1];let d=i[i.length-1];d=d?d.slice(1):[],d=Be(d);let p=i[5].slice(1).map(f=>Number(f)*t),y=c==="rect"?new v().rectangle(...p):new v().circle(p[0]);if(o[h]===void 0?o[h]=[{pos:a,shape:y,layers:d}]:o[h].push({pos:a,shape:y,layers:d}),i[i.length-2]?i[i.length-2][0]==="drill":!1){let f=Number(i[i.length-2][1])/25.4,b={pos:a,shape:new v().circle(f),layers:["drill"]};o[`${h}_drill`]===void 0?o[`${h}_drill`]=[b]:o[`${h}_drill`].push(b)}}}return Object.entries(o).reduce((i,n)=>{let[m,l]=n;return l.length===1?i[m]=l[0]:l.forEach((c,h)=>{i[`${m}_${h+1}`]=c}),i},{})}var D={codemirror:void 0,storedPCB:void 0,transforming:!1,transformUpdate:()=>{},selectBox:{},shapes:[],limits:{x:[0,1],y:[0,1]},mm_per_unit:25.4,grid:!0,gridSize:.05,viewHandles:!0,panZoomParams:void 0},se=class extends C{constructor(){super();D.storedPCB=this}},ne={kicadToObj:oe,PCB:se,Turtle:v};async function qe(e,r){let o=await(await fetch(e,{mode:"cors"})).text();r.codemirror.view.dispatch({changes:{from:0,insert:o}});let s=c=>c.includes("return kicadToObj("),n=r.codemirror.view.state.doc.toString().split(`
`),m=0,l=0;for(;;){let c=n[m];if(!c||(l+=c.length,m>n.length)||n[m]==="`)})()"&&!s(n[m+1]))break;m++}r.codemirror.foldRange(0,l+m),T("RUN"),document.querySelector(".center-button").click()}var Xe={INIT(e,r){T("RENDER"),r.codemirror=document.querySelector("#code-editor"),J(r);let t=new URL(window.location.href),o=window.location.search,s=new URLSearchParams(o).get("code"),i=new URLSearchParams(o).get("file");if(!s)if(i){let n=i;i.startsWith("http")||(n=`examples/${i}`),qe(n,r)}else{let n=window.localStorage.getItem("svg-pcb");r.codemirror.view.dispatch({changes:{from:0,insert:n!=null?n:""}}),T("RUN"),document.querySelector(".center-button").click()}},RUN({save:e=!1},r){let t=r.codemirror.view.state.doc.toString(),s=new Function(...Object.keys(ne),t)(...Object.values(ne)),{shapes:i,limits:n,mm_per_unit:m}=typeof s=="string"?JSON.parse(s):s;r.shapes=i,r.limits=n,r.mm_per_unit=m,e&&window.localStorage.setItem("svg-pcb",t),T("RENDER")},UPLOAD_COMP({text:e,name:r},t){e=e.replaceAll("$",""),e=`const ${r} = (() => { return kicadToObj(
\`${e}\`)})()
`,t.codemirror.view.dispatch({changes:{from:0,insert:e}}),t.codemirror.foldRange(0,e.length),T("RENDER")},UPLOAD_JS({text:e},r){let t=r.codemirror.view.state.doc.toString().length;r.codemirror.view.dispatch({changes:{from:0,to:t,insert:e}}),T("RUN"),document.querySelector(".center-button").click()},ADD_IMPORT({text:e,name:r},t){e=`const ${r} = ${e}
`,t.codemirror.view.dispatch({changes:{from:0,insert:e}}),T("RENDER")},TRANSLATE({x:e,y:r,index:t},o){o.transformUpdate(e,r),T("RUN")},RENDER(){Oe(q(D),document.getElementById("root"))}};function T(e,r={}){let t=Xe[e];t?t(r,D):console.log("Action not recongnized:",e)}window.dispatch=T;window.addEventListener("load",()=>{T("INIT")});
//# sourceMappingURL=main.js.map
