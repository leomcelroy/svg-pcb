/* -- DECLARE_COMPONENTS -- */
const LED_RGB = {"R":{"shape":"M 0.0014,-0.0489L 0.0021,-0.0489L 0.0028,-0.0488L 0.0035,-0.0487L 0.0042,-0.0486L 0.0048,-0.0484L 0.0062,-0.048L 0.0068,-0.0478L 0.0075,-0.0475L 0.0082,-0.0472L 0.0094,-0.0467L 0.01,-0.0463L 0.0106,-0.046L 0.0134,-0.0439L 0.0144,-0.0429L 0.0149,-0.0424L 0.0154,-0.0419L 0.0166,-0.0402L 0.017,-0.0396L 0.0173,-0.039L 0.018,-0.0378L 0.0186,-0.0365L 0.0188,-0.0359L 0.0191,-0.0352L 0.0192,-0.0345L 0.0194,-0.0338L 0.0198,-0.0318L 0.0199,-0.0311L 0.02,-0.0304L 0.02,-0.0297L 0.02,-0.029L 0.02,0.029L -0.02,0.029L -0.02,-0.029L -0.02,-0.0297L -0.02,-0.0304L -0.0199,-0.0311L -0.0198,-0.0318L -0.0194,-0.0338L -0.0192,-0.0345L -0.0191,-0.0352L -0.0188,-0.0359L -0.0186,-0.0365L -0.018,-0.0378L -0.0173,-0.039L -0.017,-0.0396L -0.0166,-0.0402L -0.0154,-0.0419L -0.0149,-0.0424L -0.0144,-0.0429L -0.0134,-0.0439L -0.0106,-0.046L -0.01,-0.0463L -0.0094,-0.0467L -0.0082,-0.0472L -0.0075,-0.0475L -0.0068,-0.0478L -0.0062,-0.048L -0.0048,-0.0484L -0.0042,-0.0486L -0.0035,-0.0487L -0.0028,-0.0488L -0.0021,-0.0489L -0.0014,-0.0489L -0.0007,-0.049L 0.0007,-0.049L 0.0014,-0.0489","pos":[-0.029,-0.059],"layers":["F.Cu"],"index":1},"A":{"shape":"M -0.02,0.029L 0.02,0.029L 0.02,-0.029L -0.02,-0.029L -0.02,0.029","pos":[0.029,-0.059],"layers":["F.Cu"],"index":2},"B":{"shape":"M -0.02,0.029L 0.02,0.029L 0.02,-0.029L -0.02,-0.029L -0.02,0.029","pos":[0.029,0.059],"layers":["F.Cu"],"index":3},"G":{"shape":"M -0.02,0.029L 0.02,0.029L 0.02,-0.029L -0.02,-0.029L -0.02,0.029","pos":[-0.029,0.059],"layers":["F.Cu"],"index":4}}
const phototransistor_1206 = {"C":{"shape":"M -0.037,0.034L 0.027,0.034L 0.027,-0.034L -0.037,-0.034L -0.037,0.034","pos":[-0.055,0],"layers":["F.Cu"],"index":1},"E":{"shape":"M -0.027,0.034L 0.037,0.034L 0.037,-0.034L -0.027,-0.034L -0.027,0.034","pos":[0.055,0],"layers":["F.Cu"],"index":2}}
const SAMD21E = {"A0":{"shape":"M 0.0276,0.0079L -0.0276,0.0079L -0.0278,0.0079L -0.0281,0.0079L -0.0287,0.0078L -0.0289,0.0077L -0.0292,0.0077L -0.0295,0.0076L -0.0297,0.0076L -0.03,0.0075L -0.0303,0.0074L -0.0305,0.0073L -0.031,0.0071L -0.0317,0.0067L -0.032,0.0065L -0.0324,0.0062L -0.0326,0.006L -0.0328,0.0059L -0.0334,0.0053L -0.0336,0.0051L -0.0338,0.0048L -0.0339,0.0046L -0.0341,0.0044L -0.0342,0.0042L -0.0344,0.0039L -0.0345,0.0037L -0.0346,0.0035L -0.0348,0.0032L -0.0349,0.0029L -0.035,0.0024L -0.0352,0.0019L -0.0353,0.0016L -0.0354,0.0011L -0.0354,0.0005L -0.0354,-0.0005L -0.0354,-0.0011L -0.0353,-0.0016L -0.0352,-0.0019L -0.035,-0.0024L -0.0349,-0.0029L -0.0348,-0.0032L -0.0346,-0.0035L -0.0345,-0.0037L -0.0344,-0.0039L -0.0342,-0.0042L -0.0341,-0.0044L -0.0339,-0.0046L -0.0338,-0.0048L -0.0336,-0.0051L -0.0334,-0.0053L -0.0328,-0.0059L -0.0326,-0.006L -0.0324,-0.0062L -0.032,-0.0065L -0.0317,-0.0067L -0.031,-0.0071L -0.0305,-0.0073L -0.0303,-0.0074L -0.03,-0.0075L -0.0297,-0.0076L -0.0295,-0.0076L -0.0292,-0.0077L -0.0289,-0.0077L -0.0287,-0.0078L -0.0281,-0.0079L -0.0278,-0.0079L -0.0276,-0.0079L 0.0276,-0.0079L 0.0276,0.0079","pos":[-0.1774,0.1102],"layers":["F.Cu"],"index":1},"A01":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[-0.1774,0.0787],"layers":["F.Cu"],"index":2},"A02":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[-0.1774,0.0472],"layers":["F.Cu"],"index":3},"A03":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[-0.1774,0.0157],"layers":["F.Cu"],"index":4},"A04":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[-0.1774,-0.0157],"layers":["F.Cu"],"index":5},"A05":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[-0.1774,-0.0472],"layers":["F.Cu"],"index":6},"A06":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[-0.1774,-0.0787],"layers":["F.Cu"],"index":7},"A07":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[-0.1774,-0.1102],"layers":["F.Cu"],"index":8},"VAN":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[-0.1102,-0.1774],"layers":["F.Cu"],"index":9},"GND1":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[-0.0787,-0.1774],"layers":["F.Cu"],"index":10},"GND2":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[0.0157,0.1774],"layers":["F.Cu"],"index":28},"A08":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[-0.0472,-0.1774],"layers":["F.Cu"],"index":11},"A09":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[-0.0157,-0.1774],"layers":["F.Cu"],"index":12},"A10":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[0.0157,-0.1774],"layers":["F.Cu"],"index":13},"A11":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[0.0472,-0.1774],"layers":["F.Cu"],"index":14},"A14":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[0.0787,-0.1774],"layers":["F.Cu"],"index":15},"A15":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[0.1102,-0.1774],"layers":["F.Cu"],"index":16},"A16":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[0.1774,-0.1102],"layers":["F.Cu"],"index":17},"A17":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[0.1774,-0.0787],"layers":["F.Cu"],"index":18},"A18":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[0.1774,-0.0472],"layers":["F.Cu"],"index":19},"A19":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[0.1774,-0.0157],"layers":["F.Cu"],"index":20},"A22":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[0.1774,0.0157],"layers":["F.Cu"],"index":21},"A23":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[0.1774,0.0472],"layers":["F.Cu"],"index":22},"24-":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[0.1774,0.0787],"layers":["F.Cu"],"index":23},"25+":{"shape":"M -0.0276,0.0079L 0.0276,0.0079L 0.0276,-0.0079L -0.0276,-0.0079L -0.0276,0.0079","pos":[0.1774,0.1102],"layers":["F.Cu"],"index":24},"A27":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[0.1102,0.1774],"layers":["F.Cu"],"index":25},"RST":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[0.0787,0.1774],"layers":["F.Cu"],"index":26},"A28":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[0.0472,0.1774],"layers":["F.Cu"],"index":27},"VCR":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[-0.0157,0.1774],"layers":["F.Cu"],"index":29},"VIN":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[-0.0472,0.1774],"layers":["F.Cu"],"index":30},"CLK":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[-0.0787,0.1774],"layers":["F.Cu"],"index":31},"DIO":{"shape":"M -0.0079,0.0276L 0.0079,0.0276L 0.0079,-0.0276L -0.0079,-0.0276L -0.0079,0.0276","pos":[-0.1102,0.1774],"layers":["F.Cu"],"index":32}}
const R_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}}
const LED_1206 = {"A":{"shape":"M -0.037,0.034L 0.027,0.034L 0.027,-0.034L -0.037,-0.034L -0.037,0.034","pos":[-0.055,0],"layers":["F.Cu"],"index":1},"C":{"shape":"M -0.027,0.034L 0.037,0.034L 0.037,-0.034L -0.027,-0.034L -0.027,0.034","pos":[0.055,0],"layers":["F.Cu"],"index":2}}
const USB_A_plug = {"5V":{"shape":"M -0.05,0.02L 0.242,0.02L 0.242,-0.02L -0.05,-0.02L -0.05,0.02","pos":[0,0.138],"layers":["F.Cu"],"index":1},"D-":{"shape":"M -0.05,0.02L 0.202,0.02L 0.202,-0.02L -0.05,-0.02L -0.05,0.02","pos":[0,0.039],"layers":["F.Cu"],"index":2},"D+":{"shape":"M -0.05,0.02L 0.202,0.02L 0.202,-0.02L -0.05,-0.02L -0.05,0.02","pos":[0,-0.039],"layers":["F.Cu"],"index":3},"GND":{"shape":"M -0.05,0.02L 0.242,0.02L 0.242,-0.02L -0.05,-0.02L -0.05,0.02","pos":[0,-0.138],"layers":["F.Cu"],"index":4}};
const regulator_SOT23 = {"out":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[-0.045,0.0375],"layers":["F.Cu"],"index":1},"in":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[-0.045,-0.0375],"layers":["F.Cu"],"index":2},"gnd":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[0.045,0],"layers":["F.Cu"],"index":3}};
const C_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const header_SWD = {"VCC":{"shape":"M -0.047,-0.015L 0.0481,-0.015L 0.0491,-0.0149L 0.0496,-0.0148L 0.0506,-0.0146L 0.0512,-0.0144L 0.0516,-0.0142L 0.0521,-0.0141L 0.0526,-0.0139L 0.0536,-0.0135L 0.055,-0.0127L 0.0554,-0.0125L 0.0562,-0.0118L 0.0566,-0.0115L 0.057,-0.0112L 0.0574,-0.0108L 0.0582,-0.0101L 0.0597,-0.008L 0.06,-0.0075L 0.0603,-0.0071L 0.0607,-0.0061L 0.0609,-0.0056L 0.0611,-0.0051L 0.0613,-0.0047L 0.0616,-0.0036L 0.0617,-0.0031L 0.0618,-0.0026L 0.0618,-0.0021L 0.0619,-0.0016L 0.062,-0.001L 0.062,0.001L 0.0619,0.0016L 0.0618,0.0021L 0.0618,0.0026L 0.0617,0.0031L 0.0616,0.0036L 0.0613,0.0047L 0.0611,0.0051L 0.0609,0.0056L 0.0607,0.0061L 0.0603,0.0071L 0.06,0.0075L 0.0597,0.008L 0.0582,0.0101L 0.0574,0.0108L 0.057,0.0112L 0.0566,0.0115L 0.0562,0.0118L 0.0554,0.0125L 0.055,0.0127L 0.0536,0.0135L 0.0526,0.0139L 0.0521,0.0141L 0.0516,0.0142L 0.0512,0.0144L 0.0506,0.0146L 0.0496,0.0148L 0.0491,0.0149L 0.0481,0.015L 0.0475,0.015L 0.047,0.015L -0.047,0.015L -0.047,-0.015","pos":[0.077,-0.1],"layers":["F.Cu"],"index":1},"DIO":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,-0.1],"layers":["F.Cu"],"index":2},"GND1":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,-0.05],"layers":["F.Cu"],"index":3},"GND2":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,0],"layers":["F.Cu"],"index":5},"GND3":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,0.1],"layers":["F.Cu"],"index":9},"CLK":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,-0.05],"layers":["F.Cu"],"index":4},"SWO":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,0],"layers":["F.Cu"],"index":6},"KEY":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,0.05],"layers":["F.Cu"],"index":7},"NC":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,0.05],"layers":["F.Cu"],"index":8},"RST":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,0.1],"layers":["F.Cu"],"index":10}};

// Rehana Al-Soltane
// MIT license 2022

// constants
const width = 7.8;
const height = 3.3;

// copper exlusion zone
const w_center = 1.45;
const h_center = 2.00;
const x_side = 3.00;

/* -- DECLARE_PCB -- */
let board = new PCB();

let crown = geo.pathD([], "m 95.8758,99.96599 c -9.00728,0.49633 -15.715477,34.02654 -21.262267,34.08836 -4.281476,0.0478 -5.840859,-15.62665 -13.519072,-15.61765 -7.678202,0.009 -15.132248,22.71793 -18.373555,22.65753 -3.241297,-0.0604 -4.283784,-10.28313 -8.57157,-9.83764 -4.386404,0.45573 -5.669227,7.91625 -9.026322,10.24537 -1.497518,1.03895 -5.169565,1.78672 -11.692309,1.79472 -10.4717005,0.0136 -8.4878543,0.0217 -8.4878543,0.0217 L 4.9108113,166.5397 H 95.935745 v 0.0336 h 91.395975 l -0.032,-23.22132 c 0,0 1.98333,-0.008 -8.48837,-0.0217 -6.52275,-0.008 -10.19428,-0.75577 -11.6918,-1.79472 -3.35709,-2.32912 -4.63991,-9.78964 -9.02632,-10.24537 -4.28778,-0.44549 -5.33079,9.77671 -8.57209,9.83712 -3.2413,0.0604 -10.69483,-22.64856 -18.37303,-22.65753 -7.67822,-0.009 -9.23812,15.66592 -13.51959,15.61817 -5.55895,-0.062 -12.28458,-33.73635 -21.321698,-34.08836 v -0.03204 c -0.144136,-0.009 -0.288009,-0.0094 -0.430982,-0.0015 z");
var s = 0.039;
geo.scale(crown, [s, -s]);
geo.originate(crown)
geo.translate(crown, [0.00, 1.27]);

// wire parameters
const w = 0.016;

//ruler cross
const makeCross = (x, y) => {
  const width = 0.15;
  const height = 0.19;
  const w = 0.016
  
  board.wire([
    [x, y],
    [x - width/2, y]
  ], w);


  board.wire([
    [x, y],
    [x + width/2, y]
  ], w);

  board.wire([
    [x, y],
    [x, y - height/2]
  ], w);

  board.wire([
    [x, y],
    [x, y + height/2]
  ], w);
}

// hole parameters
const hole_w = 0.0312;
const hole_h = 0.430;
const hole_n_x = 85;
const hole_n_y = 7;

let do_holes = true;

let hole = null;
var x = 0 ;
var y = 0;
if (do_holes) {
  for (var i=-hole_n_x; i < hole_n_x+1; i++) {
    for (var j = 0; j < hole_n_y; j++) {
      x = hole_w * 2 * i;
      y = j * (hole_h+hole_w);

      // center
      if (x >= -w_center/2 && x <= w_center/2) {
        continue;
      }

      // sides
      if (x < -x_side || x > x_side) {
        continue;
      }

      if (i % 2 == 0) {
        // even number, shift up
        y += hole_h/2 + hole_w/2;
      }
      hole = geo.path(path([-hole_w/2, -hole_h/2],
                           [hole_w/2, -hole_h/2],
                           [hole_w/2, hole_h/2],
                           [-hole_w/2, hole_h/2]));
      geo.translate(hole, [x, y]);
      board.addShape("drill", hole);
    }
  }
}

board.addShape("outline", crown);

let copper = structuredClone(crown);

geo.difference(copper, geo.rectangle(w_center-2*w, 5.299))

let side_rect1 = geo.rectangle(x_side*2, 5.299);
geo.translate(side_rect1, [2*x_side + 4*w, 0]);

let side_rect2 = geo.rectangle(x_side*2, 5.299);
geo.translate(side_rect2, [-2*x_side - 4*w, 0]);

let middle_band = geo.rectangle(10, 2*w);
geo.translate(middle_band, [0, 0.43]);

geo.difference(copper, side_rect1);
geo.difference(copper, side_rect2);
geo.difference(copper, middle_band);

board.addShape("F.Cu", copper);

/* -- ADD_COMPONENTS -- */
let R10 = board.add(R_1206, { translate: pt(-0.023, 0.521), rotate: -90, id: "R10" })
let LED4 = board.add(LED_1206, { translate: pt(-0.337, 0.218), rotate: 0, id: "LED4" })
let LED5 = board.add(LED_1206, { translate: pt(0.279, 0.224), rotate: 0, id: "LED5" })
let R7 = board.add(R_1206, { translate: pt(0.068, 0.523), rotate: -90, id: "R7" })
let R9 = board.add(R_1206, { translate: pt(0.154, 0.524), rotate: -90, id: "R9" })

let R8 = board.add(R_1206, { translate: pt(0.333, 0.723), rotate: 0, id: "R8" })
let PT = board.add(phototransistor_1206, { translate: pt(-0.396, 0.892), rotate: 180, id: "photo" })
let J2 = board.add(USB_A_plug, { translate: pt(0, 2.45), rotate: 90, id: "USB" })
let IC1 = board.add(SAMD21E, { translate: pt(-0.01, 0.879), rotate: 0, id: "D21E", padLabelSize: 0.0109 })
let J1 = board.add(header_SWD, {translate: pt(IC1.posX, IC1.padY("DIO")+.34), rotate: -90, id: 'J1 SWD'});
let C1 = board.add(C_1206, {translate: pt(IC1.padX("GND2"), IC1.padY("A27")+0.15), id: 'C1 1uF'});
let C2 = board.add(C_1206, {translate: pt(IC1.padX("A07")-0.015, IC1.padY("VAN")-0.116), rotate: 90, id: 'C2\n1uF'});
let IC2 = board.add(regulator_SOT23, {translate: pt(C2.posX-0.157, C2.posY), rotate: -90, id: 'IC2\n3.3V'});
let LED1 = board.add(LED_1206, { translate: pt(-3.252, 0.452), rotate: -90, id: "LED1" })
let LED2 = board.add(LED_1206, { translate: pt(0.257, 1.947), rotate: 90, id: "LED2" })
let R2 = board.add(R_1206, { translate: pt(0.337, 0.894), rotate: 0, id: "R2" })
let LED3 = board.add(LED_1206, { translate: pt(3.27, 0.44), rotate: 270, id: "LED3" })
let R5 = board.add(R_1206, { translate: pt(-0.339, 1.04), rotate: 270, id: "R5" })



const w_USB = 0.47;

let USB_rect = geo.path([[-w_USB/2, -0.2],
                         [w_USB/2, -0.2],
                         [w_USB/2, 0.32],
                         [-w_USB/2, 0.32]]);

geo.translate(USB_rect, J2.pos);

board.addShape("outline", USB_rect);

/* -- ADD_WIRES -- */
board.wire(path(
  LED1.pad("A"),
  pt(-3.251, 0.751),
  pt(-3.05, 0.75),
  ), w);

board.wire(path(
  LED1.pad("C"),
  pt(-3.256, 0.1),
  pt(-3.05, 0.1),), w);



board.wire(path(IC1.pad("VAN"),
                pt(IC1.padX("VAN"), IC1.posY+.015),
                pt(IC1.padX("VIN"), IC1.posY+.015),
                IC1.pad("VIN"),), w);

board.wire(path(IC1.pad("GND1"),
                pt(IC1.padX("GND1"), IC1.posY-.015),
                pt(IC1.padX("GND2"), IC1.posY-.015),
                IC1.pad("GND2"),), w);

board.wire(path(J1.pad("VCC"),
                pt(J1.padX("VCC"), IC1.padY("VIN")+.09),
                pt(IC1.padX("VIN"), IC1.padY("VIN")+.09),
                IC1.pad("VIN"),), w);

board.wire(path(J1.pad("GND1"),
                J1.pad("GND2"),), w);

board.wire(path(J1.pad("DIO"),
                pt(J1.padX("DIO")-0.106, J1.padY("DIO")),
pt(-0.217, 1.121),
                pt(-0.203, 1.064),
                
                IC1.pad("DIO"),
), w);

board.wire(path(J1.pad("CLK"),
                pt(J1.padX("CLK"), J1.posY),
                pt(J1.padX("VCC")-.05, J1.posY),
                pt(J1.padX("VCC")-.05, IC1.padY("CLK")+.06),
                pt(IC1.padX("CLK"), IC1.padY("CLK")+.06),
                IC1.pad("CLK"),), w);

board.wire(path(J1.pad("GND2"),
                pt(J1.padX("GND2"), J1.posY),
                pt(J1.padX("GND3"), J1.posY),
                J1.pad("GND3"),), w);

board.wire(path(J1.pad("RST"),
                pt(J1.padX("RST")+.05, J1.padY("RST")),
                pt(J1.padX("RST")+.05, IC1.padY("RST")+.06),
                pt(IC1.padX("RST"), IC1.padY("RST")+.06),
                IC1.pad("RST"),), w);

board.wire(path(C1.pad("1"),
                pt(IC1.padX("VCR"), C1.posY),
                IC1.pad("VCR"),), w);

board.wire(path(C1.pad("2"),
                pt(C1.posX, C1.posY),
                IC1.pad("GND2"),), w);

board.wire(path(C1.pad("2"),
                pt(J1.padX("GND3"), C1.posY),
                J1.pad("GND3"),), w);

board.wire(path(C2.pad("1"),
                pt(IC1.padX("GND1"), C2.padY("1")),
                IC1.pad("GND1"),), w);

board.wire(path(C2.pad("1"),
                pt(IC1.padX("A16")+0.166, C2.padY("1")),
                pt(IC1.padX("A16")+0.169, 1.679),
                pt(0.137, 1.68),
                 pt(0.138, 2.421),
                J2.pad("GND"),), w);

board.wire(path(C2.pad("2"),
                pt(IC1.padX("VAN"), C2.padY("2")),
                IC1.pad("VAN"),), w);

board.wire(path(IC2.pad("out"),
                pt(IC2.padX("out"), C2.padY("2")),
                C2.pad("2"),), w);

board.wire(path(IC2.pad("in"),
                pt(IC2.padX("in"), J1.padY("DIO")+0.076),
                pt(J1.padX("DIO")-0.035, J1.padY("DIO")+0.079),
                pt(J1.padX("RST")-0.229, J2.padY("5V")-0.018),
                
                J2.pad("5V"),), w);

board.wire(path(IC2.pad("gnd"),
                pt(IC2.padX("gnd"), C2.padY("1")),
                C2.pad("1"),), w);

//LED2 C to USB GND
board.wire(path(LED2.pad("C"),
  LED2.pad("C"),
  pt(0.138, 2.002),), w);

//LED2 A to R2 pad 2
board.wire(path(LED2.pad("A"),
  pt(0.256, 1.734),
  
  pt(0.4, 1.732),
  R2.pad("2"),
  ), w);

//R2 pad 1 to pin A22
board.wire(path(R2.pad("1"),
  R2.pad("1"),
  
  IC1.pad("A22"),), w);

//left pad to R10
board.wire(path(
  pt(-0.72, 0.816),
  pt(-0.632, 0.817),
  pt(-0.629, 0.36),
  pt(-0.023, 0.362),
  R10.pad("2"),
  
), w);

//R10 pad 1 to IC1 pin A10
board.wire(path(R10.pad("1"),
  pt(-0.023, 0.638),
  pt(0.006, 0.638),
  IC1.pad("A10"),
               ), w);

//R1 on side to GND line
board.wire(path(
  pt(-0.726, 0.029),
  pt(0.554, 0.027),
  pt(0.551, 0.606),
  pt(0.333, 0.607),
), w);

// PHOTO C to IC1.pad A03 (analog and ADC)
board.wire(path(PT.pad("C"),
  
  // pt(-0.247, 0.892),
  // pt(-0.227, 0.894),
  IC1.pad("A03")
 
               ), w);

// R5 pad 2 to A03
board.wire(path(R5.pad("2"),
  R5.pad("2"),
  pt(-0.252, 0.981),
  pt(-0.252, 0.898), 
               ), w);

//R5 pad 1 to VCC
board.wire(path(R5.pad("1"),
  R5.pad("1"),
  pt(-0.262, 1.101),
  pt(-0.26, 1.055),
  pt(-0.227, 1.024),
  pt(-0.154, 1.024),
  pt(-0.058, 0.937),
               ), w);

//phototransistor pad E to GND
board.wire(path(PT.pad("E"),
  PT.pad("E"),
  pt(-0.453, 0.459),
  pt(-0.118, 0.456),
  pt(-0.118, 0.526),
               ), w);


//LED3 pad C 
board.wire(path(LED3.pad("C"),
  LED3.pad("C"),
  pt(3.27, 0.11),
  pt(3.04, 0.11),
               ), w);

// LED3 pad A 
board.wire(path(LED3.pad("A"),
  LED3.pad("A"),
  pt(3.27, 0.72),
  pt(3.03, 0.72),
               ), w);

// RIGHT LED3 C TO GND
board.wire(path(
  pt(0.72, 0.26),
  pt(0.607, 0.26),
  pt(0.603, 0.652),
  pt(0.335, 0.655),), w);

// RIGHT LED3 TO A16
board.wire(path(
  pt(0.725, 0.721),
  R8.pad("2"),), w);

board.wire(path(R8.pad("1"),
                
  R8.pad("1"),
  pt(0.166, 0.723),
  IC1.pad("A16")
               ), w);

//R7 pad 1 to IC1 pin A08
board.wire(path(R7.pad("1"),
  R7.pad("1"),
  pt(0.068, 0.583),
  IC1.pad("A14")
               ), w);

//R7 pad 2 to LED4 pad A
board.wire(path(R7.pad("2"),
  R7.pad("2"),
  pt(0.069, 0.312),
                
  pt(-0.392, 0.313),
  LED4.pad("A"),
               ), w);

//R9 pad 1 to IC1 pin A09
board.wire(path(R9.pad("1"),
  R9.pad("1"),
  pt(0.152, 0.649),
  pt(0.1, 0.648),
  IC1.pad("A15"),
               ), w);

//R9 pad 2 to LED5 pad A
board.wire(path(R9.pad("2"),
  R9.pad("2"),
  pt(0.152, 0.308),
  pt(0.222, 0.308),
  LED5.pad("A")
               ), w);

//LED4 pad C to GND
board.wire(path(LED4.pad("C"),
  pt(-0.283, 0.102),
  pt(0.498, 0.1),
  pt(0.498, 0.567),
  pt(0.333, 0.568),
               ), w);

//LED5 pad C to GND
board.wire(path(LED5.pad("C"),
  LED5.pad("C"),
  
  pt(0.336, 0.525),
               ), w);


//USB D- to IC1 24-
board.wire(path(J2.pad("D-"),
               
  pt(-0.041, 2.425),
  pt(-0.049, 1.573),
  pt(0.19, 1.57),
  pt(0.189, 1.06),
  pt(0.051, 0.956),
  IC1.pad("24-"),
               ), w);

//USB D+ to IC1 25+
board.wire(path(
  J2.pad("D+"),
  pt(0.039, 2.421),
  pt(0.032, 1.621),
  pt(0.28, 1.62),
  pt(0.276, 0.99),
  IC1.pad("25+"),
  
), w);

let lip = 0.1;
let background = geo.rectangle(width, height+lip);

geo.translate(background, [0, (height-lip)/2]);

board.addShape("background", background);

/* -- RENDER_PCB -- */
renderPCB({
  pcb: board,
  layerColors: {
    //"background": "#000000ff",

    //"F.Cu": "#ffffffff",

    "outline": "#002d00ff",
    "B.Cu": "#ff4c007f",
    "F.Cu": "#ff8c00cc",
    "drill": "#ffffffff",
    "padLabels": "#ffff99e5",
    "componentLabels": "#00e5e5e5",
  },
  limits: {
    x: [-width/2, width/2],
    y: [-lip, height]
  },
  mmPerUnit: 25.4
});
