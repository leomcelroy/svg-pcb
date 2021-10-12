import{html as B,svg as $}from"https://cdn.skypack.dev/lit-html";import"https://leomcelroy.com/widgets/code-mirror.js";var L=["./library/connectors/ESP8266_12E.json","./library/connectors/header_FTDI.json","./library/connectors/power_65mm.json","./library/connectors/ESP32_CAM.json","./library/connectors/USB_A_plug.json","./library/connectors/header_i0.json","./library/connectors/header_serial_reverse.json","./library/connectors/header_4.json","./library/connectors/header_signal.json","./library/connectors/MTA_i0.json","./library/connectors/HM11.json","./library/connectors/header_MFRC522.json","./library/connectors/header_serial_reverse_5V.json","./library/connectors/USB_mini_B.json","./library/connectors/ESC.json","./library/connectors/MTA_PS2.json","./library/connectors/header_APA.json","./library/connectors/MTA_ICP.json","./library/connectors/stereo_2_5mm.json","./library/connectors/header_VL53L1X_3415.json","./library/connectors/Molex_serial.json","./library/connectors/header_SWD_4_1.json","./library/connectors/ESP_01.json","./library/connectors/HCSR04.json","./library/connectors/header_SWD_4_05.json","./library/connectors/ESP32_WROOM.json","./library/connectors/header_serial.json","./library/connectors/header_PDI.json","./library/connectors/I2C4x1v.json","./library/connectors/header_power.json","./library/connectors/MTA_serial.json","./library/connectors/header_LSM6DS33_2736.json","./library/connectors/MTA_2.json","./library/connectors/MTA_3.json","./library/connectors/header_LCD.json","./library/connectors/screw_terminal_2.json","./library/connectors/HCSR501.json","./library/connectors/screw_terminal_i0.json","./library/connectors/header_unipolar_stepper.json","./library/connectors/screw_terminal_power.json","./library/connectors/header_nRF24L01.json","./library/connectors/header_serial_reverse_3V3.json","./library/connectors/MTA_power.json","./library/connectors/MTA_4.json","./library/connectors/RCWL0516.json","./library/connectors/ESP_WROOM_02D.json","./library/connectors/RN4871.json","./library/connectors/header_I2C.json","./library/connectors/header_SWD.json","./library/connectors/header_servo.json","./library/connectors/microSD.json","./library/connectors/header_4H.json","./library/connectors/header_UPDI.json","./library/connectors/I2C4x1i.json","./library/connectors/I2C4x1h.json","./library/connectors/header_ISP.json","./library/connectors/header_NEO_6M.json","./library/connectors/MTA_5.json","./library/connectors/header_6.json","./library/connectors/header_UPDI_reverse.json","./library/connectors/header_bus.json","./library/connectors/TFT8x1v.json","./library/connectors/header_2H.json","./library/connectors/header_ATP.json","./library/switches/button_6mm.json","./library/switches/slide_switch.json","./library/diodes_transistors_regulators_sensors/D_1206.json","./library/diodes_transistors_regulators_sensors/mic_SPM1437.json","./library/diodes_transistors_regulators_sensors/LED_1206.json","./library/diodes_transistors_regulators_sensors/NMOSFET_TO252AA.json","./library/diodes_transistors_regulators_sensors/regulator_SOT223.json","./library/diodes_transistors_regulators_sensors/regulator_SOT23.json","./library/diodes_transistors_regulators_sensors/VL53L1X.json","./library/diodes_transistors_regulators_sensors/H_bridge_SM8.json","./library/diodes_transistors_regulators_sensors/SPG08P4HM4H.json","./library/diodes_transistors_regulators_sensors/Hall_SOT23.json","./library/diodes_transistors_regulators_sensors/VEML6040.json","./library/diodes_transistors_regulators_sensors/phototransistor_1206.json","./library/diodes_transistors_regulators_sensors/LED_RGB.json","./library/diodes_transistors_regulators_sensors/accel_MXD6235M.json","./library/diodes_transistors_regulators_sensors/ADXL343.json","./library/diodes_transistors_regulators_sensors/mic_SPU0414HR5H.json","./library/diodes_transistors_regulators_sensors/D_SOD_123.json","./library/diodes_transistors_regulators_sensors/LED_3014_1100.json","./library/diodes_transistors_regulators_sensors/A4953_SOICN.json","./library/diodes_transistors_regulators_sensors/NMOSFET_SOT23.json","./library/diodes_transistors_regulators_sensors/phototransistor_PLCC2.json","./library/diodes_transistors_regulators_sensors/PMOSFET_SOT23.json","./library/diodes_transistors_regulators_sensors/DRV8428_HTSSOP.json","./library/diodes_transistors_regulators_sensors/CMM4030D261I2STR.json","./library/crystals_and_resonators/XTAL_CSM_7.json","./library/crystals_and_resonators/XTAL_NX5032GA.json","./library/crystals_and_resonators/XTAL_EFOBM.json","./library/discretes/R_0402.json","./library/discretes/ST4EB.json","./library/discretes/C_1206.json","./library/discretes/R_1206.json","./library/discretes/choke.json","./library/discretes/L_1210.json","./library/discretes/C_FND.json","./library/ICs/CBA.json","./library/ICs/SAMD21E.json","./library/ICs/AVRDB28.json","./library/ICs/FT230XS.json","./library/ICs/ATtiny1614.json","./library/ICs/fab.json","./library/ICs/ATtiny44_SOICN.json","./library/ICs/ATxmegaE5_TQFP.json","./library/ICs/op_amp_SOICN.json","./library/ICs/ATtiny45_SOIC.json","./library/ICs/ATmega88_TQFP.json","./library/ICs/SAMD11D.json","./library/ICs/TRC102.json","./library/ICs/ATtiny412.json","./library/ICs/ATmega644_TQFP.json","./library/ICs/op_amp_SOT23_5.json","./library/ICs/SAMD11C.json","./library/ICs/ATtiny3216.json"];function I(e){let r=new XMLSerializer,t=document.querySelector("svg").cloneNode(!0),o=t.querySelectorAll(".no-download");for(let h of o)h.remove();let n=t.querySelector(".transform-group");n.style.transformOrigin="",n.style.transform="";let i=e.limits.x[1]-e.limits.x[0],s=e.limits.y[1]-e.limits.y[0];t.setAttribute("width",`${i*e.mm_per_unit}mm`),t.setAttribute("height",`${s*e.mm_per_unit}mm`),t.setAttribute("viewBox",`${e.limits.x[0]} ${e.limits.y[0]} ${i} ${s}`),t.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");let m=r.serializeToString(t),l="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(m),c=document.createElement("a");c.href=l,c.download="download.svg",document.body.appendChild(c),c.click(),document.body.removeChild(c)}function N(e,r){let t=new Blob([r],{type:"text/plain"});var o=document.createElement("a");o.href=URL.createObjectURL(t),o.download=`${e}`,o.click(),URL.revokeObjectURL(o)}var le=e=>e.map(r=>r.slice(10)).map(r=>B`
	<div class="import-item" @mousedown=${async t=>{let n=await(await fetch(`neil-components/${r}`)).text();dispatch("ADD_IMPORT",{text:n,name:t.target.innerText.split("/")[1].split(".")[0]})}}>${r}</div>
`);function O(e){return B`
		<div class="top-menu">
			<div class="left">
				<button 
					@click=${()=>dispatch("RUN",{save:!0})}>
					run
				</button>
				<div class="seperator"></div>
				<div class="dropdown-container">
				 	import
				 	<div class="dropdown-content">
				 		${le(L)}		
				 	</div>
				 </div>
				 <div class="seperator"></div>
				 <div class="dropdown-container">
					download
					<div class="dropdown-content dropdown-content-right">
						<button 
							@click=${()=>I(e)}>
							svg
						</button>
						<button 
							@click=${()=>N("anon.js",e.codemirror.view.state.doc.toString())}>
							js
						</button>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="dropdown-container">
					drawing
					<div class="dropdown-content dropdown-content-right">
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
		${ce(e)}
		<div id="vertical-bar"></div>
	`}var de=e=>e.length===4?`rgba(${e.map((r,t)=>t<3?Math.round(r*255):r).join(",")})`:e.length===3?`hsl(${e[0]}, ${e[1]}%, ${e[2]}%)`:"rgba(255, 255, 255, 1)",q=(e,r)=>$`
	<path 
		d="${e}" 
		fill-rule="nonzero"
		fill="${de(r)}"/>
`,ue=e=>e.reduce((r,t,o)=>`${r} ${o===0?"M":"L"} ${t.join(",")}`,""),me=(e,r)=>{let t=[[e.lt.x,(e.lt.y+e.lb.y)/2],[e.rt.x,(e.rt.y+e.rb.y)/2]],o=[[(e.lt.x+e.rt.x)/2,e.lt.y],[(e.lb.x+e.rb.x)/2,e.lb.y]],n=[[e.lt.x,0],[e.rt.x,0]],i=[[0,e.lt.y],[0,e.lb.y]],s=[e.lt.x,e.rt.x],m=Math.abs(s[1]-s[0]),l=[e.lb.y,e.lt.y],c=Math.abs(l[1]-l[0]);function h(_,u){return Math.log(u)/Math.log(_)}let a=Math.round(h(5,Math.max(m,c))),d=r,p=(_,u)=>{let j=[],k=u*Math.ceil(_[0]/u)-u;for(;k<_[1]+u;)k=k+u,j.push(k);return j},f=_=>[[e.lt.x,_],[e.rt.x,_]],v=_=>[[_,e.lt.y],[_,e.lb.y]],b=_=>u=>$`<path stroke="black" vector-effect="non-scaling-stroke" stroke-width="${_}" d="${ue(u)}"/>`,y=p(l,d).map(f).map(b(.2)),x=p(s,d).map(v).map(b(.2));return $`
		<g class="grid no-download">
			${b(.6)(n)}
			${b(.6)(i)}
			${y}
			${x}
		</g>
	`},ce=e=>{var o;let r=e.shapes.map(n=>Array.isArray(n.d)?n.d.map(i=>q(i,n.color)):q(n.d,n.color)).flat(),t=(o=e.panZoomParams)==null?void 0:o.corners();return $`
		<svg id="viewer" style="transform: scale(1, -1);">
			<g class="transform-group">
			      ${e.selectBox.start&&e.selectBox.end?$`
			      	<path 
				        class="selectBox"
				        d="
				          M ${e.selectBox.start.x} ${e.selectBox.start.y} 
				          L ${e.selectBox.end.x} ${e.selectBox.start.y} 
				          L ${e.selectBox.end.x} ${e.selectBox.end.y}     
				          L ${e.selectBox.start.x} ${e.selectBox.end.y}
				        "
			      	/>`:""}
				${r}
				${e.panZoomParams&&e.gridSize>0?me(e.panZoomParams.corners(),e.gridSize):""}
				<rect 
					class="limits no-download" 
					width="${e.limits.x[1]-e.limits.x[0]}"
					height="${e.limits.y[1]-e.limits.y[0]}"
					stroke="black" fill="transparent" stroke-width="1"
					vector-effect="non-scaling-stroke"
					transform="translate(${e.limits.x[0]}, ${e.limits.y[0]})"/>
				${e.storedPCB&&e.viewHandles?pe(e.storedPCB):""}
			</g>
		
		</svg>
	`},pe=e=>e.components.map((r,t)=>$`
	<circle 
		class="no-download translate-handle" 
		cx="${r.posX}" 
		cy="${r.posY}" 
		data-index=${t}
		r="0.02" 
		vector-effect="non-scaling-stroke"
		/>
`);import{render as Ie}from"https://cdn.skypack.dev/lit-html";import he from"https://cdn.skypack.dev/esprima";import"https://cdn.skypack.dev/astring";import{walk as E}from"https://cdn.skypack.dev/esprima-walk";function fe(e){let r=s=>s.includes("return kicadToObj("),o=e.codemirror.view.state.doc.toString().split(`
`),n=0,i=0;for(;;){let s=o[n];if(!s||(i+=s.length,n>o.length)||o[n]==="`)})()"&&!r(o[n+1]))break;n++}e.codemirror.foldRange(0,i+n)}function X(e,r){let t=document.querySelector("svg"),o=!1,n,i=0,s=0,m;r("mousedown",".translate-handle",l=>{o=!0,e.transforming=!0,i=0,s=0,n=t.panZoomParams.svgPoint({x:l.offsetX,y:l.offsetY}),m=l.target.dataset.index;let h=e.codemirror.view.state.doc.toString(),a=`()=>{${h}}`,d=he.parseScript(a,{range:!0,comment:!0});console.log(d);let p=d.body[0].expression.body.body;console.log(p);let f=[];E(d,u=>{try{u.callee.type==="MemberExpression"&&u.callee.property.name==="add"&&f.push(u.arguments[1])}catch(j){}});let v=f.sort((u,j)=>u.range[0]-j.range[0]),b=u=>u.includes(".")?u.split(".")[1].length:u.length,y=(u,j)=>Math.round(u/j)*j,x=(u,j)=>Math.round(u*10**j)/10**j,_=u=>/[0-9]/i.test(u)||u===".";e.transformUpdate=(u,j)=>{let k=[];v[m].properties.forEach(M=>{if(M.key.name!=="translate")return;let[ne,ie]=M.value.elements,D=!1;E(ne,g=>{if(!D&&g.type==="Literal"&&typeof g.value=="number"){g.ogValue||(g.ogValue=g.value),g.ogRaw||(g.ogRaw=g.raw);let P=g.ogValue+u;k.push({from:g.range[0]-5,to:g.range[1]-5,insert:`${x(y(P,e.gridSize),8)}`}),D=!0}});let A=!1;E(ie,g=>{if(!A&&g.type==="Literal"&&typeof g.value=="number"){g.ogValue||(g.ogValue=g.value),g.ogRaw||(g.ogRaw=g.raw);let P=g.ogValue+j;k.push({from:g.range[0]-5,to:g.range[1]-5,insert:`${x(y(P,e.gridSize),8)}`}),A=!0}});let ae=e.codemirror.view.state.doc.toString();e.codemirror.view.dispatch({changes:{from:0,to:ae.length,insert:h}}),e.codemirror.view.dispatch({changes:k})}),fe(e)}}),r("mousemove","",l=>{if(!o)return;let h=t.panZoomParams.svgPoint({x:l.offsetX,y:l.offsetY}),a=h.x-n.x,d=h.y-n.y;dispatch("TRANSLATE",{x:a,y:d,index:m}),i=a,s=d}),r("mouseup","",l=>{o=!1,e.transforming=!1}),r("mouseleave","",l=>{o=!1,e.transforming=!1})}function U(e,r){let t=!1;r("mousedown","#vertical-bar",o=>{t=!0}),r("mousemove","",o=>{if(!t)return;let n=o.clientX/window.innerWidth*100;if(n===0)return;let i=1,s=99;n<i&&(n=i),n>s&&(n=s),document.documentElement.style.setProperty("--vertical-bar",`${n}%`),pauseEvent(o)}),r("mouseup","",o=>{t=!1})}function V(e,r){let t=!1,o=1,n=0,i=0,s={x:0,y:0};function m(a){a.style.transformOrigin=`${0}px ${0}px`,a.style.transform="translate("+n+"px, "+i+"px) scale("+o+")",e.gridSize>0&&dispatch("RENDER")}function l({x:a,y:d}){let p=(a-n)/o,f=(d-i)/o;return{x:p,y:f}}r("mousedown","",a=>{a.shiftKey||(t=!0,s={x:a.offsetX-n,y:a.offsetY-i},a.detail===2&&console.log(a.offsetX,a.offsetY,l({x:a.offsetX,y:a.offsetY})))}),r("mousemove","",a=>{if(!t||e.transforming)return;n=a.offsetX-s.x,i=a.offsetY-s.y;let d=document.querySelectorAll(".transform-group");for(let p of d)m(p)}),r("mouseup","",a=>{t=!1}),r("wheel","",a=>{let d=(a.offsetX-n)/o,p=(a.offsetY-i)/o;Math.sign(a.deltaY)<0?o*=1.03:o/=1.03,n=a.offsetX-d*o,i=a.offsetY-p*o;let f=document.querySelectorAll(".transform-group");for(let v of f)m(v);a.preventDefault()});function c(a){console.log("set scale x y");let p=document.querySelector("svg").getBoundingClientRect(),f=a.x[1]-a.x[0],v=a.y[1]-a.y[0],b=p.width/f,y=p.height/v,x=Math.min(b,y)*.9;o=x;let _={x:(a.x[0]+a.x[1])/2*x-p.width/2,y:(a.y[0]+a.y[1])/2*x-p.height/2};n=-_.x,i=-_.y;let u=document.querySelectorAll(".transform-group");for(let j of u)m(j)}function h(){let a=document.querySelector("svg");if(a===null)return null;let{left:d,right:p,bottom:f,top:v,width:b,height:y}=a.getBoundingClientRect(),x=l({x:b,y}),_=l({x:0,y}),u=l({x:b,y:0}),j=l({x:0,y:0});return{rt:x,lt:_,rb:u,lb:j}}return{scale:()=>o,x:()=>n,y:()=>i,corners:h,svgPoint:l,setScaleXY:c}}var z=0;function _e(e){var r=new FileReader;r.readAsText(e),r.onloadend=t=>{let o=r.result;dispatch("UPLOAD_COMP",{text:o,name:`component${z}`}),z++}}function ye(e,r=[]){let t=e[0],o=t.name.split("."),n=o[0],i=o[o.length-1];if(r.length>0&&!r.includes(i))throw"Extension not recongized: "+o;_e(t)}function F(e,r){r("drop","",function(t){let n=t.dataTransfer.files;ye(n),pauseEvent(t)}),r("dragover","",function(t){pauseEvent(t)})}function H(e,r){let t=null,o=null,n=document.querySelector("svg");r("mousedown","",s=>{!s.shiftKey||(t=n.panZoomParams.svgPoint({x:s.offsetX,y:s.offsetY}))}),r("mousemove","",s=>{document.body.classList.add("no-select"),!!s.shiftKey&&t!==null&&(o=n.panZoomParams.svgPoint({x:s.offsetX,y:s.offsetY}),e.selectBox.start=t,e.selectBox.end=o,dispatch("RENDER"))});function i(s,m){let{start:l,end:c}=m;return s.x>l.x&&s.x<c.x&&s.y>l.y&&s.y<c.y||s.x>l.x&&s.x<c.x&&s.y<l.y&&s.y>c.y||s.x<l.x&&s.x>c.x&&s.y>l.y&&s.y<c.y||s.x<l.x&&s.x>c.x&&s.y<l.y&&s.y>c.y}r("mouseup","",s=>{!s.shiftKey||(document.body.classList.remove("no-select"),t=null,o=null,e.selectBox.start=t,e.selectBox.end=o,dispatch("RENDER"))})}var Y=(e,r=!1)=>/[0-9]/i.test(e)||e==="."||r&&e==="-";function Z(e,r){let t=!1,o,n,i,s,m,l;r("mousedown",".ͼb",c=>{let a=document.querySelector("code-mirror").view.state,d=a.doc,p=a.selection.main.head,f=d.lineAt(p),{from:v,to:b,text:y}=d.lineAt(p),x=p,_=p;for(;x>v&&Y(y[x-v-1],!0);)x--;for(;_<b&&Y(y[_-v]);)_++;l=y.slice(x-v,_-v),o=Number(l),t=!0,n=x,i=_,m=l.includes("."),s=l.includes(".")?l.split(".")[1].length:1}),r("mousemove","",c=>{if(!t)return;let h=document.querySelector("code-mirror"),a=0>c.movementX?1:-1,d=`${o}`;if(m){let v=Math.round(o*10**s)+c.movementX;v=Math.round(v)/10**s,o=v}else o+=c.movementX;let p=`${o}`;h.view.dispatch({changes:{from:n,to:n+l.length,insert:p}}),l=p,dispatch("RUN"),pauseEvent(c)}),r("mouseup","",c=>{t=!1})}function ge(e){return e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,e.returnValue=!1,!1}window.pauseEvent=ge;var W=e=>e.composedPath()[0],be=(e,r)=>W(e).matches(r),G=e=>(r,t,o)=>{e.addEventListener(r,n=>{n.trigger=W(n),(t===""||be(n,t))&&o(n)})};function K(e){let r=document.querySelector("svg"),t=G(r);r.panZoomParams=V(e,t),e.panZoomParams=r.panZoomParams,H(e,t),X(e,t);let o=document.querySelector("body"),n=G(o);F(e,n),Z(e,n),U(e,n),n("keydown","",i=>{let s=event.code;s==="Enter"&&event.shiftKey?(event.preventDefault(),dispatch("RUN",{save:!0})):s==="KeyT"&&event.shiftKey})}import{Turtle as w}from"https://leomcelroy.com/gram-js/exports.js";function ve(e){return new w().arc(360,e).originate()}function we(e,r){return new w().forward(e).right(90).forward(r).right(90).repeat(1).originate()}w.prototype.circle=ve;w.prototype.rectangle=we;var je=([e,r],[t,o])=>Math.sqrt((t-e)**2+(o-r)**2),xe=(e,r)=>je(e,r)<1e-6,Q=(e,r)=>{let t=e[0],o=new w;o.goto(t,!1);for(let n of e.slice(1))xe(n,t)||(o.goto(n),t=n);return o.offset(r)},Se=([e,r],[t,o])=>[e+t,r+o];var Te=([e,r],t)=>[e*Math.cos(t)-r*Math.sin(t),r*Math.cos(t)+e*Math.sin(t)],J=class{constructor({pads:r,layers:t}){this.pads=r,this.layers=t}pad(r){return this.pads[r]}padX(r){return this.pads[r][0]}padY(r){return this.pads[r][1]}get pos(){return this.pads.center}get posX(){return this.pads.center[0]}get posY(){return this.pads.center[1]}};function ee(e,r={}){let t=r.translate||[0,0],o=r.rotate||0,n=r.padLabelSize||2e-4,i=r.componentLabelSize||3e-4,[s,m]=t,l=o*Math.PI/180,c={},h=[],a={};for(let d in e){let{pos:p,shape:f,layers:v}=e[d];f=typeof f=="string"?new w().bezier(f):f.copy();let b=Se(Te(p,l),t);if(c[d]=b,!d.includes("_drill")){let y=new w().text(d).scale(n).originate().translate(b);h.push(y)}f.rotate(o),f.translate(b),v.forEach(y=>{y in a?a[y]=a[y].group(f):a[y]=f})}return c.center=t,a.padLabels=h.reduce((d,p)=>d.group(p),new w),new J({pads:c,layers:a})}var R=class{constructor(){this.layers={},this.components=[]}add(r,t={}){let o=t.name||"",n={translate:t.translate||[0,0],rotate:t.rotate||0,padLabelSize:t.padLabelSize||3e-4,componentLabelSize:t.componentLabelSize||4e-4},i=ee(r,n);for(let s in i.layers)this.addShape(s,i.layers[s]);if(o!==""&&!o.includes("_drill")){let s=new w().text(o).scale(n.componentLabelSize).originate().translate(n.translate);this.addShape("componentLabels",s)}return this.components.push(i),i}addShape(r,t){return t instanceof w?(r in this.layers?this.layers[r]=this.layers[r].group(t):this.layers[r]=t,this.layers[r]):console.error("Shape isn't Turtle.")}getLayer(r,t=!1){let o=r.includes("Labels");return t=!r.includes("Labels"),this.layers[r]?t?this.layers[r].flatten().getPathData(o):this.layers[r].getPathData(o):""}wire(r,t,o="F.Cu"){this.addShape(o,Q(r,t))}via(r,t,o){}};function S(e){this._line=this._col=this._pos=0,this._stream=e}S.not_whitespace_or_end=/^(\S|$)/;S.space_quote_paren_escaped_or_end=/^(\s|\\|"|'|`|,|\(|\)|$)/;S.string_or_escaped_or_end=/^(\\|"|$)/;S.string_delimiters=/["]/;S.quotes=/['`,]/;S.quotes_map={"'":"quote","`":"quasiquote",",":"unquote"};S.prototype={peek:$e,consume:Pe,until:Ee,error:ke,string:Re,atom:Ce,quoted:Me,expr:De,list:Ae};function re(e){var r=new S(e),t=r.expr();return t instanceof Error?t:r.peek()!=""?r.error("Superfluous characters after expression: `"+r.peek()+"`"):t}function ke(e){var r=new Error("Syntax error: "+e);return r.line=this._line+1,r.col=this._col+1,r}function $e(){return this._stream.length==this._pos?"":this._stream[this._pos]}function Pe(){if(this._stream.length==this._pos)return"";var e=this._stream[this._pos];return this._pos+=1,e=="\r"?(this.peek()==`
`&&(this._pos+=1,e+=`
`),this._line++,this._col=0):e==`
`?(this._line++,this._col=0):this._col++,e}function Ee(e){for(var r="";!e.test(this.peek());)r+=this.consume();return r}function Re(){for(var e=this.consume(),r="";;){r+=this.until(S.string_or_escaped_or_end);var t=this.peek();if(t=="")return this.error("Unterminated string literal");if(t==e){this.consume();break}if(t=="\\"){this.consume(),t=this.peek(),t=="r"?(this.consume(),r+="\r"):t=="t"?(this.consume(),r+="	"):t=="n"?(this.consume(),r+=`
`):t=="f"?(this.consume(),r+="\f"):t=="b"?(this.consume(),r+="\b"):r+=this.consume();continue}r+=this.consume()}return new String(r)}function Ce(){if(S.string_delimiters.test(this.peek()))return this.string();for(var e="";;){e+=this.until(S.space_quote_paren_escaped_or_end);var r=this.peek();if(r=="\\"){this.consume(),e+=this.consume();continue}break}return e}function Me(){var e=this.consume(),r=S.quotes_map[e];r=="unquote"&&this.peek()=="@"&&(this.consume(),r="unquote-splicing",e=",@"),this.until(S.not_whitespace_or_end);var t=this.expr();return t instanceof Error?t:t===""?this.error("Unexpected `"+this.peek()+"` after `"+e+"`"):[r,t]}function De(){if(this.until(S.not_whitespace_or_end),S.quotes.test(this.peek()))return this.quoted();var e=this.peek()=="("?this.list():this.atom();return this.until(S.not_whitespace_or_end),e}function Ae(){if(this.peek()!="(")return this.error("Expected `(` - saw `"+this.peek()+"` instead.");this.consume();var e=[],r=this.expr();if(r instanceof Error)return r;if(r!=="")for(e.push(r);(r=this.expr())!=="";){if(r instanceof Error)return r;e.push(r)}return this.peek()!=")"?this.error("Expected `)` - saw: `"+this.peek()+"`"):(this.consume(),e)}var Le=e=>e.reduce((r,t)=>{let o=t.split(".");return o.length===0?r:o[0]!=="*"?[...r,t]:[...r,`F.${o[1]}`,`B.${o[1]}`]},[]);function te(e){let r=re(e),t=1/25.4,o={};for(let i of r){let s=i[0]==="pad",m=i[2]==="smd",l=i[2]==="thru_hole",c=i[3];if(s&&(m||l)){let h=i[1],a=i[4].slice(1).map(b=>Number(b)*t);a[1]=-a[1];let d=i[i.length-1];d=d?d.slice(1):[],d=Le(d);let p=i[5].slice(1).map(b=>Number(b)*t),f=c==="rect"?new w().rectangle(...p):new w().circle(p[0]);if(o[h]===void 0?o[h]=[{pos:a,shape:f,layers:d}]:o[h].push({pos:a,shape:f,layers:d}),i[i.length-2]?i[i.length-2][0]==="drill":!1){let b=Number(i[i.length-2][1])/25.4,y={pos:a,shape:new w().circle(b),layers:["drill"]};o[`${h}_drill`]===void 0?o[`${h}_drill`]=[y]:o[`${h}_drill`].push(y)}}}return Object.entries(o).reduce((i,s)=>{let[m,l]=s;return l.length===1?i[m]=l[0]:l.forEach((c,h)=>{i[`${m}_${h+1}`]=c}),i},{})}var C={codemirror:void 0,storedPCB:void 0,transforming:!1,transformUpdate:()=>{},selectBox:{},shapes:[],limits:{x:[0,1],y:[0,1]},mm_per_unit:25.4,gridSize:.05,viewHandles:!0,panZoomParams:void 0},oe=class extends R{constructor(){super();C.storedPCB=this}},se={kicadToObj:te,PCB:oe,Turtle:w};async function Ne(e,r){let o=await(await fetch(e,{mode:"cors"})).text();r.codemirror.view.dispatch({changes:{from:0,insert:o}});let n=c=>c.includes("return kicadToObj("),s=r.codemirror.view.state.doc.toString().split(`
`),m=0,l=0;for(;;){let c=s[m];if(!c||(l+=c.length,m>s.length)||s[m]==="`)})()"&&!n(s[m+1]))break;m++}r.codemirror.foldRange(0,l+m),T("RUN"),document.querySelector(".center-button").click()}var Be={INIT(e,r){T("RENDER"),r.codemirror=document.querySelector("#code-editor"),K(r);let t=new URL(window.location.href),o=window.location.search,n=new URLSearchParams(o).get("code"),i=new URLSearchParams(o).get("file");if(!n)if(i){let s=i;i.startsWith("http")||(s=`examples/${i}`),Ne(s,r)}else{let s=window.localStorage.getItem("svg-pcb");r.codemirror.view.dispatch({changes:{from:0,insert:s!=null?s:""}}),T("RUN"),document.querySelector(".center-button").click()}},RUN({save:e=!1},r){let t=r.codemirror.view.state.doc.toString(),n=new Function(...Object.keys(se),t)(...Object.values(se)),{shapes:i,limits:s,mm_per_unit:m}=typeof n=="string"?JSON.parse(n):n;r.shapes=i,r.limits=s,r.mm_per_unit=m,e&&window.localStorage.setItem("svg-pcb",t),T("RENDER")},UPLOAD_COMP({text:e,name:r},t){e=e.replaceAll("$",""),e=`const ${r} = (() => { return kicadToObj(
\`${e}\`)})()
`,t.codemirror.view.dispatch({changes:{from:0,insert:e}}),t.codemirror.foldRange(0,e.length),T("RENDER")},ADD_IMPORT({text:e,name:r},t){e=`const ${r} = ${e}
`,t.codemirror.view.dispatch({changes:{from:0,insert:e}}),T("RENDER")},TRANSLATE({x:e,y:r,index:t},o){o.transformUpdate(e,r),T("RUN")},RENDER(){Ie(O(C),document.getElementById("root"))}};function T(e,r={}){let t=Be[e];t?t(r,C):console.log("Action not recongnized:",e)}window.dispatch=T;window.addEventListener("load",()=>{T("INIT")});
//# sourceMappingURL=main.js.map
