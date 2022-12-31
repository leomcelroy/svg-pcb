let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">`


let data = {
    "pts": [
        [
            0.6,
            0.55
        ],
        [
            0.6028076171875,
            0.59793701171875
        ],
        [
            0.6107421875,
            0.64755859375
        ],
        [
            0.6230712890625,
            0.69820556640625
        ],
        [
            0.6390625,
            0.74921875
        ],
        [
            0.6579833984375,
            0.79993896484375
        ],
        [
            0.6791015625,
            0.8497070312499999
        ],
        [
            0.7016845703125,
            0.8978637695312499
        ],
        [
            0.725,
            0.94375
        ],
        [
            0.7483154296875,
            0.9867065429687499
        ],
        [
            0.7708984375,
            1.02607421875
        ],
        [
            0.7920166015625,
            1.06119384765625
        ],
        [
            0.8109375,
            1.09140625
        ],
        [
            0.8269287109374999,
            1.11605224609375
        ],
        [
            0.8392578125,
            1.1344726562499998
        ],
        [
            0.8471923828125,
            1.14600830078125
        ],
        [
            0.85,
            1.15
        ],
        [
            0.85274658203125,
            1.14600830078125
        ],
        [
            0.8602539062500001,
            1.1344726562499998
        ],
        [
            0.8714233398437499,
            1.11605224609375
        ],
        [
            0.88515625,
            1.09140625
        ],
        [
            0.90035400390625,
            1.06119384765625
        ],
        [
            0.9159179687500001,
            1.02607421875
        ],
        [
            0.9307495117187501,
            0.9867065429687499
        ],
        [
            0.9437500000000001,
            0.94375
        ],
        [
            0.9538208007812501,
            0.8978637695312499
        ],
        [
            0.95986328125,
            0.8497070312499999
        ],
        [
            0.96077880859375,
            0.79993896484375
        ],
        [
            0.95546875,
            0.74921875
        ],
        [
            0.94283447265625,
            0.69820556640625
        ],
        [
            0.9217773437500001,
            0.64755859375
        ],
        [
            0.89119873046875,
            0.59793701171875
        ],
        [
            0.85,
            0.55
        ]
    ],
    "chamfers": [],
    "fillets": [
        {
            "lowerLimit": [
                0.6,
                0.55
            ],
            "start": [
                0.85,
                1.15
            ],
            "upperLimit": [
                0.85,
                0.55
            ],
            "radius": 0.02,
            "index": 16
        }
    ]
}


function line_isect(p0x, p0y, p1x, p1y, q0x, q0y, q1x, q1y) {
  let d0x = p1x - p0x;
  let d0y = p1y - p0y;
  let d1x = q1x - q0x;
  let d1y = q1y - q0y;
  let vc = d0x * d1y - d0y * d1x;
  if (vc == 0) {
    return null;
  }
  let vcn = vc * vc;
  let q0x_p0x = q0x - p0x;
  let q0y_p0y = q0y - p0y;
  let vc_vcn = vc / vcn;
  let t = (q0x_p0x * d1y - q0y_p0y * d1x) * vc_vcn;
  let s = (q0x_p0x * d0y - q0y_p0y * d0x) * vc_vcn;
  // if (0 <= t && t < 1 && 0 <= s && s < 1) {
    let ret = {t, s, xy: null};
    ret.xy = [p1x * t + p0x * (1 - t), p1y * t + p0y * (1 - t)];
    // ret.side = pt_in_pl(p0x, p0y, p1x, p1y, q0x, q0y) < 0 ? -1 : 1;
    return ret;
  // }
  return null;
}

function v_proj(x0,y0,x1,y1,x2,y2){
  let dx = x2 - x1;
  let dy = y2 - y1;
  let l2 = dx*dx+dy*dy;
  let t = ((x0-x1)*dx + (y0-y1)*dy)/l2;
  return {t,xy:[x1*(1-t)+x2*t,y1*(1-t)+y2*t]};
}


function mapval(value,istart,istop,ostart,ostop){
  return ostart + (ostop - ostart) * ((value - istart)*1.0 / (istop - istart))
}

function lerp_hue(h0,h1,t){
  var methods = [
    [Math.abs(h1-h0),     mapval(t,0,1,h0,h1)],
    [Math.abs(h1+Math.PI*2-h0), mapval(t,0,1,h0,h1+Math.PI*2)],
    [Math.abs(h1-Math.PI*2-h0), mapval(t,0,1,h0,h1-Math.PI*2)]
    ]
  methods.sort((x,y)=>(x[0]-y[0]))
  return (methods[0][1]+Math.PI*4)%(Math.PI*2);
}

function hue_dist(h0,h1){
  return Math.min(
    Math.abs(h1-h0),
    Math.abs(h1+Math.PI*2-h0),
    Math.abs(h1-Math.PI*2-h0)
  );
}



function tangent_segs_circ(p0x, p0y, p1x, p1y, q0x, q0y, q1x, q1y, rad){
  let o = line_isect(p0x, p0y, p1x, p1y, q0x, q0y, q1x, q1y);
  if (!o){
    return;
  }
  let a0 = Math.atan2(p1y-p0y,p1x-p0x);
  let a1 = Math.atan2(q1y-q0y,q1x-q0x);
  let b = lerp_hue(a0,a1,0.5);
  let c = hue_dist(a0,a1)/2;

  let d = rad / Math.sin(c);

  let k = [o.xy[0]+d*Math.cos(b), o.xy[1]+d*Math.sin(b) ]
  // console.log(o.xy);
  // svg += `<line x0="${k[0]*200}" y0="${k[1]*200}" x1="${o.xy[0]*200}" y1="${o.xy[1]*200}" r="2" stroke="red"/>`
  // svg += `<circle cx="${k[0]*200}" cy="${k[1]*200}" r="2"/>`
  // svg += `<circle cx="${o.xy[0]*200}" cy="${o.xy[1]*200}" r="2"/>`
  // svg += `<circle cx="${o.xy[0]*200}" cy="${o.xy[1]*200}" r="${d*200}" fill="red"/>`

  let o0 = v_proj(...k, p0x, p0y, p1x, p1y);
  let o1 = v_proj(...k, q0x, q0y, q1x, q1y);
  
  // svg += `<circle cx="${o0.xy[0]*200}" cy="${o0.xy[1]*200}" r="2"/>`

  if (0 <= o0.t && o0.t < 1 && 0 <= o1.t && o1.t < 1){
    return [k,o0,o1];
  }

  return null;
}


function proc(pts,fillet){
  let ps0 = pts.slice(0,fillet.index);
  let ps1 = pts.slice(fillet.index);
  for (let i = 0; i < ps0.length-1; i++){
    for (let j = 0; j < ps1.length-1; j++){
      let o = tangent_segs_circ(...ps0[i+1],...ps0[i], ...ps1[j], ...ps1[j+1], fillet.radius);
      if (o){
        let qs0 = ps0.slice(0,i);
        let qs1 = ps1.slice(j+1);
        let p0 = o[0];
        let p1 = o[1].xy;
        let p2 = o[2].xy;
        let a1 = Math.atan2(p1[1]-p0[1],p1[0]-p0[0]);
        let a2 = Math.atan2(p2[1]-p0[1],p2[0]-p0[0]);
        for (let k = 0; k < 100; k++){
          let a = mapval(k,0,100,a1,a2);
          qs0.push([p0[0]+Math.cos(a)*fillet.radius,p0[1]+Math.sin(a)*fillet.radius]);
        }
        return qs0.concat(qs1);
      }
    }
  }
  return null;
}

for (let f = 0.02; f < 1; f+=0.02){

  data.fillets[0].radius = f;
  let qts = proc(data.pts,data.fillets[0]);

  if (qts){
    console.log(f)
    // let polys = [data.pts,qts];
    let polys = [qts];
    svg += `<path stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" d="`
    for (let i = 0; i < polys.length; i++){
      svg += '\nM ';
      for (let j = 0; j < polys[i].length; j++){
        let [x,y] = polys[i][j];
        svg += `${(((x)*200))/1 } ${(((y)*200))/1 } `;
      }
    }
    svg += `\n"/>`;
  }

}

svg+=`</svg>`

const fs = require('fs')
fs.writeFileSync("fillettest.svg",svg);