// Board Name: Modular Things Xiao Stepper Motor Control Board
// Board Designer: Rico Kanthatham, Skylabworkshop
// Date Created: February 23, 2023
// License: Creative Commons Non-Commercial Attribution

/* -- DECLARE_COMPONENTS -- */
const LED_1206 = {"A":{"shape":"M -0.037,0.034L 0.027,0.034L 0.027,-0.034L -0.037,-0.034L -0.037,0.034",
                       "pos":[-0.055,0],
                       "layers":["F.Cu"],
                       "index":1},
                  "C":{"shape":"M -0.027,0.034L 0.037,0.034L 0.037,-0.034L -0.027,-0.034L -0.027,0.034",
                       "pos":[0.055,0],
                       "layers":["F.Cu"],
                       "index":2}}
const header_4H = {"1":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025",
                        "pos":[0,0.15],
                        "layers":["F.Cu"],
                        "index":1},
                   "2":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025",
                        "pos":[0,0.05],"layers":["F.Cu"],"index":2},
                   "3":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],
                        "layers":["F.Cu"],
                        "index":3},
                   "4":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025",
                        "pos":[0,-0.15],
                        "layers":["F.Cu"],
                        "index":4}}
const C_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034",
                     "pos":[-0.06,0],
                     "layers":["F.Cu"],
                     "index":1},
                "2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034",
                     "pos":[0.06,0],
                     "layers":["F.Cu"],
                     "index":2}}
const R_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034",
                     "pos":[-0.06,0],
                     "layers":["F.Cu"],
                     "index":1},
                "2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034",
                     "pos":[0.06,0],
                     "layers":["F.Cu"],
                     "index":2}}
const H_bridge_SM8 = {"GND":{"shape":"M 0.035,0.016L -0.035,0.016L -0.0356,0.016L -0.0361,0.016L -0.0372,0.0159L -0.0378,0.0157L -0.0383,0.0156L -0.0389,0.0155L -0.0394,0.0154L -0.0399,0.0152L -0.0405,0.015L -0.041,0.0149L -0.042,0.0144L -0.0435,0.0136L -0.0439,0.0133L -0.0453,0.0123L -0.0457,0.0119L -0.0469,0.0107L -0.0472,0.0103L -0.0476,0.0098L -0.048,0.0094L -0.0482,0.0089L -0.0486,0.0085L -0.0489,0.008L -0.0491,0.0075L -0.0494,0.007L -0.0496,0.0065L -0.0499,0.006L -0.0502,0.005L -0.0505,0.0039L -0.0506,0.0034L -0.0509,0.0022L -0.051,0.0011L -0.051,-0.0011L -0.0509,-0.0022L -0.0506,-0.0034L -0.0505,-0.0039L -0.0502,-0.005L -0.0499,-0.006L -0.0496,-0.0065L -0.0494,-0.007L -0.0491,-0.0075L -0.0489,-0.008L -0.0486,-0.0085L -0.0482,-0.0089L -0.048,-0.0094L -0.0476,-0.0098L -0.0472,-0.0103L -0.0469,-0.0107L -0.0457,-0.0119L -0.0453,-0.0123L -0.0439,-0.0133L -0.0435,-0.0136L -0.042,-0.0144L -0.041,-0.0149L -0.0405,-0.015L -0.0399,-0.0152L -0.0394,-0.0154L -0.0389,-0.0155L -0.0383,-0.0156L -0.0378,-0.0157L -0.0372,-0.0159L -0.0361,-0.016L -0.0356,-0.016L -0.035,-0.016L 0.035,-0.016L 0.035,0.016",
                             "pos":[-0.13,0.09],
                             "layers":["F.Cu"],
                             "index":1},
                      "IN2":{"shape":"M -0.035,0.016L 0.035,0.016L 0.035,-0.016L -0.035,-0.016L -0.035,0.016",
                             "pos":[-0.13,0.03],
                             "layers":["F.Cu"],
                             "index":2},
                      "IN1":{"shape":"M -0.035,0.016L 0.035,0.016L 0.035,-0.016L -0.035,-0.016L -0.035,0.016",
                             "pos":[-0.13,-0.03],
                             "layers":["F.Cu"],
                             "index":3},
                      "VREF":{"shape":"M -0.035,0.016L 0.035,0.016L 0.035,-0.016L -0.035,-0.016L -0.035,0.016",
                              "pos":[-0.13,-0.09],
                              "layers":["F.Cu"],
                              "index":4},
                      "VBB":{"shape":"M -0.035,0.016L 0.035,0.016L 0.035,-0.016L -0.035,-0.016L -0.035,0.016",
                             "pos":[0.13,-0.09],
                             "layers":["F.Cu"],
                             "index":5},
                      "OUT1":{"shape":"M -0.035,0.016L 0.035,0.016L 0.035,-0.016L -0.035,-0.016L -0.035,0.016",
                              "pos":[0.13,-0.03],
                              "layers":["F.Cu"],
                              "index":6},
                      "LSS":{"shape":"M -0.035,0.016L 0.035,0.016L 0.035,-0.016L -0.035,-0.016L -0.035,0.016",
                             "pos":[0.13,0.03],
                             "layers":["F.Cu"],
                             "index":7},
                      "OUT2":{"shape":"M -0.035,0.016L 0.035,0.016L 0.035,-0.016L -0.035,-0.016L -0.035,0.016",
                              "pos":[0.13,0.09],
                              "layers":["F.Cu"],
                              "index":8}}
const XIAO_RP2040 = {"VCC": {"shape": "M 0.0285 -0.022 H -0.0285 V 0.022 V 0.022 V 0.037 L -0.0275 0.04 V 0.043 L -0.0265 0.046 L -0.0255 0.049 L -0.0235 0.051 L -0.0215 0.053 L -0.0195 0.056 L -0.0175 0.058 L -0.0145 0.059 L -0.0115 0.06 L -0.0085 0.061 L -0.0055 0.062 H -0.0025 H 0.0035 H 0.0065 L 0.0095 0.061 L 0.0125 0.06 L 0.0155 0.059 L 0.0175 0.058 L 0.0205 0.056 L 0.0225 0.053 L 0.0245 0.051 L 0.0255 0.049 L 0.0265 0.046 L 0.0275 0.043 L 0.0285 0.04 V 0.037 V 0.022 Z",
                             "pos":[0.2395,-0.256],
                             "layers":["F.Cu"],
                             "index":1},
                     "GND": {"shape": "M 0.0285 -0.022 H -0.0285 V 0.022 V 0.022 V 0.037 L -0.0275 0.04 V 0.043 L -0.0265 0.046 L -0.0255 0.049 L -0.0235 0.051 L -0.0215 0.053 L -0.0195 0.056 L -0.0175 0.058 L -0.0145 0.059 L -0.0115 0.06 L -0.0085 0.061 L -0.0055 0.062 H -0.0025 H 0.0035 H 0.0065 L 0.0095 0.061 L 0.0125 0.06 L 0.0155 0.059 L 0.0175 0.058 L 0.0205 0.056 L 0.0225 0.053 L 0.0245 0.051 L 0.0255 0.049 L 0.0265 0.046 L 0.0275 0.043 L 0.0285 0.04 V 0.037 V 0.022 Z",
                             "pos":[0.1675,-0.256],
                             "layers":["F.Cu"],
                             "index":2},
                     "3V3": {"shape": "M 0.0285 -0.022 H -0.0285 V 0.022 V 0.022 V 0.037 L -0.0275 0.04 V 0.043 L -0.0265 0.046 L -0.0255 0.049 L -0.0235 0.051 L -0.0215 0.053 L -0.0195 0.056 L -0.0175 0.058 L -0.0145 0.059 L -0.0115 0.06 L -0.0085 0.061 L -0.0055 0.062 H -0.0025 H 0.0035 H 0.0065 L 0.0095 0.061 L 0.0125 0.06 L 0.0155 0.059 L 0.0175 0.058 L 0.0205 0.056 L 0.0225 0.053 L 0.0245 0.051 L 0.0255 0.049 L 0.0265 0.046 L 0.0275 0.043 L 0.0285 0.04 V 0.037 V 0.022 Z",
                             "pos":[0.0955,-0.256],
                             "layers":["F.Cu"],
                             "index":3},
                     "10": {"shape": "M 0.0285 -0.022 H -0.0285 V 0.022 V 0.022 V 0.037 L -0.0275 0.04 V 0.043 L -0.0265 0.046 L -0.0255 0.049 L -0.0235 0.051 L -0.0215 0.053 L -0.0195 0.056 L -0.0175 0.058 L -0.0145 0.059 L -0.0115 0.06 L -0.0085 0.061 L -0.0055 0.062 H -0.0025 H 0.0035 H 0.0065 L 0.0095 0.061 L 0.0125 0.06 L 0.0155 0.059 L 0.0175 0.058 L 0.0205 0.056 L 0.0225 0.053 L 0.0245 0.051 L 0.0255 0.049 L 0.0265 0.046 L 0.0275 0.043 L 0.0285 0.04 V 0.037 V 0.022 Z","pos":[0.0235,-0.256],"layers":["F.Cu"],"index":4},
                     "9": {"shape": "M 0.0285 -0.022 H -0.0285 V 0.022 V 0.022 V 0.037 L -0.0275 0.04 V 0.043 L -0.0265 0.046 L -0.0255 0.049 L -0.0235 0.051 L -0.0215 0.053 L -0.0195 0.056 L -0.0175 0.058 L -0.0145 0.059 L -0.0115 0.06 L -0.0085 0.061 L -0.0055 0.062 H -0.0025 H 0.0035 H 0.0065 L 0.0095 0.061 L 0.0125 0.06 L 0.0155 0.059 L 0.0175 0.058 L 0.0205 0.056 L 0.0225 0.053 L 0.0245 0.051 L 0.0255 0.049 L 0.0265 0.046 L 0.0275 0.043 L 0.0285 0.04 V 0.037 V 0.022 Z","pos":[-0.0485,-0.256],"layers":["F.Cu"],"index":5},
                     "8": {"shape": "M 0.0285 -0.022 H -0.0285 V 0.022 V 0.022 V 0.037 L -0.0275 0.04 V 0.043 L -0.0265 0.046 L -0.0255 0.049 L -0.0235 0.051 L -0.0215 0.053 L -0.0195 0.056 L -0.0175 0.058 L -0.0145 0.059 L -0.0115 0.06 L -0.0085 0.061 L -0.0055 0.062 H -0.0025 H 0.0035 H 0.0065 L 0.0095 0.061 L 0.0125 0.06 L 0.0155 0.059 L 0.0175 0.058 L 0.0205 0.056 L 0.0225 0.053 L 0.0245 0.051 L 0.0255 0.049 L 0.0265 0.046 L 0.0275 0.043 L 0.0285 0.04 V 0.037 V 0.022 Z","pos":[-0.1205,-0.256],"layers":["F.Cu"],"index":6},
                     "7": {"shape": "M 0.0285 -0.022 H -0.0285 V 0.022 V 0.022 V 0.037 L -0.0275 0.04 V 0.043 L -0.0265 0.046 L -0.0255 0.049 L -0.0235 0.051 L -0.0215 0.053 L -0.0195 0.056 L -0.0175 0.058 L -0.0145 0.059 L -0.0115 0.06 L -0.0085 0.061 L -0.0055 0.062 H -0.0025 H 0.0035 H 0.0065 L 0.0095 0.061 L 0.0125 0.06 L 0.0155 0.059 L 0.0175 0.058 L 0.0205 0.056 L 0.0225 0.053 L 0.0245 0.051 L 0.0255 0.049 L 0.0265 0.046 L 0.0275 0.043 L 0.0285 0.04 V 0.037 V 0.022 Z","pos":[-0.1925,-0.256],"layers":["F.Cu"],"index":7},
                     "6": {"shape": "M 0.0285 -0.0335 L 0.0275 -0.0365 L 0.0265 -0.0385 L 0.0255 -0.0415 L 0.0245 -0.0445 L 0.0225 -0.0465 L 0.0205 -0.0485 L 0.0175 -0.0505 L 0.0155 -0.0525 L 0.0125 -0.0535 L 0.0095 -0.0545 H 0.0065 L 0.0035 -0.0555 H -0.0035 L -0.0065 -0.0545 H -0.0095 L -0.0115 -0.0535 L -0.0145 -0.0525 L -0.0175 -0.0505 L -0.0195 -0.0485 L -0.0215 -0.0465 L -0.0235 -0.0445 L -0.0255 -0.0415 L -0.0265 -0.0385 L -0.0275 -0.0365 L -0.0285 -0.0335 V -0.0295 V -0.0145 V -0.0145 V 0.0285 H 0.0285 V -0.0145 V -0.0145 V -0.0295 Z","pos":[-0.1925,0.2375],"layers":["F.Cu"],"index":8},
                     "5": {"shape": "M 0.0285 -0.0335 L 0.0275 -0.0365 L 0.0265 -0.0385 L 0.0255 -0.0415 L 0.0245 -0.0445 L 0.0225 -0.0465 L 0.0205 -0.0485 L 0.0175 -0.0505 L 0.0155 -0.0525 L 0.0125 -0.0535 L 0.0095 -0.0545 H 0.0065 L 0.0035 -0.0555 H -0.0035 L -0.0065 -0.0545 H -0.0095 L -0.0115 -0.0535 L -0.0145 -0.0525 L -0.0175 -0.0505 L -0.0195 -0.0485 L -0.0215 -0.0465 L -0.0235 -0.0445 L -0.0255 -0.0415 L -0.0265 -0.0385 L -0.0275 -0.0365 L -0.0285 -0.0335 V -0.0295 V -0.0145 V -0.0145 V 0.0285 H 0.0285 V -0.0145 V -0.0145 V -0.0295 Z","pos":[-0.1205,0.2375],"layers":["F.Cu"],"index":9},
                     "4": {"shape": "M 0.0285 -0.0335 L 0.0275 -0.0365 L 0.0265 -0.0385 L 0.0255 -0.0415 L 0.0245 -0.0445 L 0.0225 -0.0465 L 0.0205 -0.0485 L 0.0175 -0.0505 L 0.0155 -0.0525 L 0.0125 -0.0535 L 0.0095 -0.0545 H 0.0065 L 0.0035 -0.0555 H -0.0035 L -0.0065 -0.0545 H -0.0095 L -0.0115 -0.0535 L -0.0145 -0.0525 L -0.0175 -0.0505 L -0.0195 -0.0485 L -0.0215 -0.0465 L -0.0235 -0.0445 L -0.0255 -0.0415 L -0.0265 -0.0385 L -0.0275 -0.0365 L -0.0285 -0.0335 V -0.0295 V -0.0145 V -0.0145 V 0.0285 H 0.0285 V -0.0145 V -0.0145 V -0.0295 Z","pos":[-0.0485,0.2375],"layers":["F.Cu"],"index":10},
                     "3": {"shape": "M 0.0285 -0.0335 L 0.0275 -0.0365 L 0.0265 -0.0385 L 0.0255 -0.0415 L 0.0245 -0.0445 L 0.0225 -0.0465 L 0.0205 -0.0485 L 0.0175 -0.0505 L 0.0155 -0.0525 L 0.0125 -0.0535 L 0.0095 -0.0545 H 0.0065 L 0.0035 -0.0555 H -0.0035 L -0.0065 -0.0545 H -0.0095 L -0.0115 -0.0535 L -0.0145 -0.0525 L -0.0175 -0.0505 L -0.0195 -0.0485 L -0.0215 -0.0465 L -0.0235 -0.0445 L -0.0255 -0.0415 L -0.0265 -0.0385 L -0.0275 -0.0365 L -0.0285 -0.0335 V -0.0295 V -0.0145 V -0.0145 V 0.0285 H 0.0285 V -0.0145 V -0.0145 V -0.0295 Z","pos":[0.0235,0.2375],"layers":["F.Cu"],"index":11},
                     "2": {"shape": "M 0.0285 -0.0335 L 0.0275 -0.0365 L 0.0265 -0.0385 L 0.0255 -0.0415 L 0.0245 -0.0445 L 0.0225 -0.0465 L 0.0205 -0.0485 L 0.0175 -0.0505 L 0.0155 -0.0525 L 0.0125 -0.0535 L 0.0095 -0.0545 H 0.0065 L 0.0035 -0.0555 H -0.0035 L -0.0065 -0.0545 H -0.0095 L -0.0115 -0.0535 L -0.0145 -0.0525 L -0.0175 -0.0505 L -0.0195 -0.0485 L -0.0215 -0.0465 L -0.0235 -0.0445 L -0.0255 -0.0415 L -0.0265 -0.0385 L -0.0275 -0.0365 L -0.0285 -0.0335 V -0.0295 V -0.0145 V -0.0145 V 0.0285 H 0.0285 V -0.0145 V -0.0145 V -0.0295 Z","pos":[0.0955,0.2375],"layers":["F.Cu"],"index":12},
                     "1": {"shape": "M 0.0285 -0.0335 L 0.0275 -0.0365 L 0.0265 -0.0385 L 0.0255 -0.0415 L 0.0245 -0.0445 L 0.0225 -0.0465 L 0.0205 -0.0485 L 0.0175 -0.0505 L 0.0155 -0.0525 L 0.0125 -0.0535 L 0.0095 -0.0545 H 0.0065 L 0.0035 -0.0555 H -0.0035 L -0.0065 -0.0545 H -0.0095 L -0.0115 -0.0535 L -0.0145 -0.0525 L -0.0175 -0.0505 L -0.0195 -0.0485 L -0.0215 -0.0465 L -0.0235 -0.0445 L -0.0255 -0.0415 L -0.0265 -0.0385 L -0.0275 -0.0365 L -0.0285 -0.0335 V -0.0295 V -0.0145 V -0.0145 V 0.0285 H 0.0285 V -0.0145 V -0.0145 V -0.0295 Z","pos":[0.1675,0.2375],"layers":["F.Cu"],"index":13},"0": {"shape": "M 0.0285 -0.0335 L 0.0275 -0.0365 L 0.0265 -0.0385 L 0.0255 -0.0415 L 0.0245 -0.0445 L 0.0225 -0.0465 L 0.0205 -0.0485 L 0.0175 -0.0505 L 0.0155 -0.0525 L 0.0125 -0.0535 L 0.0095 -0.0545 H 0.0065 L 0.0035 -0.0555 H -0.0035 L -0.0065 -0.0545 H -0.0095 L -0.0115 -0.0535 L -0.0145 -0.0525 L -0.0175 -0.0505 L -0.0195 -0.0485 L -0.0215 -0.0465 L -0.0235 -0.0445 L -0.0255 -0.0415 L -0.0265 -0.0385 L -0.0275 -0.0365 L -0.0285 -0.0335 V -0.0295 V -0.0145 V -0.0145 V 0.0285 H 0.0285 V -0.0145 V -0.0145 V -0.0295 Z","pos":[0.2395,0.2375],"layers":["F.Cu"],"index":14},  "CLK": {"shape": "M 0.016 0.002 V 0.004 L 0.015 0.006 V 0.007 L 0.014 0.009 L 0.012 0.011 L 0.011 0.012 L 0.009 0.013 L 0.008 0.014 L 0.006 0.015 H 0.004 L 0.002 0.016 H 0 V 0.016 H -0.002 L -0.004 0.015 H -0.005 L -0.007 0.014 L -0.009 0.013 L -0.01 0.012 L -0.012 0.011 L -0.013 0.009 L -0.014 0.007 L -0.015 0.006 V 0.004 L -0.016 0.002 V 0 V 0 V -0.002 L -0.015 -0.004 V -0.006 L -0.014 -0.008 L -0.013 -0.009 L -0.012 -0.011 L -0.01 -0.012 L -0.009 -0.014 L -0.007 -0.015 H -0.005 L -0.004 -0.016 H -0.002 H 0 V -0.016 H 0.002 H 0.004 L 0.006 -0.015 H 0.008 L 0.009 -0.014 L 0.011 -0.012 L 0.012 -0.011 L 0.014 -0.009 L 0.015 -0.008 V -0.006 L 0.016 -0.004 V -0.002 V 0 Z","pos":[0.2610,-0.038],"layers":["F.Cu"],"index":15},  "DIO": {"shape": "M 0.016 0.002 V 0.004 L 0.015 0.006 V 0.007 L 0.014 0.009 L 0.012 0.011 L 0.011 0.012 L 0.009 0.013 L 0.008 0.014 L 0.006 0.015 H 0.004 L 0.002 0.016 H 0 V 0.016 H -0.002 L -0.004 0.015 H -0.005 L -0.007 0.014 L -0.009 0.013 L -0.01 0.012 L -0.012 0.011 L -0.013 0.009 L -0.014 0.007 L -0.015 0.006 V 0.004 L -0.016 0.002 V 0 V 0 V -0.002 L -0.015 -0.004 V -0.006 L -0.014 -0.008 L -0.013 -0.009 L -0.012 -0.011 L -0.01 -0.012 L -0.009 -0.014 L -0.007 -0.015 H -0.005 L -0.004 -0.016 H -0.002 H 0 V -0.016 H 0.002 H 0.004 L 0.006 -0.015 H 0.008 L 0.009 -0.014 L 0.011 -0.012 L 0.012 -0.011 L 0.014 -0.009 L 0.015 -0.008 V -0.006 L 0.016 -0.004 V -0.002 V 0 Z","pos":[0.2610,0.034],"layers":["F.Cu"],"index":16},"RESET": {"shape": "M 0.016 0.002 V 0.004 L 0.015 0.006 V 0.007 L 0.014 0.009 L 0.012 0.011 L 0.011 0.012 L 0.009 0.013 L 0.008 0.014 L 0.006 0.015 H 0.004 L 0.002 0.016 H 0 V 0.016 H -0.002 L -0.004 0.015 H -0.005 L -0.007 0.014 L -0.009 0.013 L -0.01 0.012 L -0.012 0.011 L -0.013 0.009 L -0.014 0.007 L -0.015 0.006 V 0.004 L -0.016 0.002 V 0 V 0 V -0.002 L -0.015 -0.004 V -0.006 L -0.014 -0.008 L -0.013 -0.009 L -0.012 -0.011 L -0.01 -0.012 L -0.009 -0.014 L -0.007 -0.015 H -0.005 L -0.004 -0.016 H -0.002 H 0 V -0.016 H 0.002 H 0.004 L 0.006 -0.015 H 0.008 L 0.009 -0.014 L 0.011 -0.012 L 0.012 -0.011 L 0.014 -0.009 L 0.015 -0.008 V -0.006 L 0.016 -0.004 V -0.002 V 0 Z","pos":[0.1890,0.034],"layers":["F.Cu"],"index":17},"P_GND": {"shape": "M 0.016 0.002 V 0.004 L 0.015 0.006 V 0.007 L 0.014 0.009 L 0.012 0.011 L 0.011 0.012 L 0.009 0.013 L 0.008 0.014 L 0.006 0.015 H 0.004 L 0.002 0.016 H 0 V 0.016 H -0.002 L -0.004 0.015 H -0.005 L -0.007 0.014 L -0.009 0.013 L -0.01 0.012 L -0.012 0.011 L -0.013 0.009 L -0.014 0.007 L -0.015 0.006 V 0.004 L -0.016 0.002 V 0 V 0 V -0.002 L -0.015 -0.004 V -0.006 L -0.014 -0.008 L -0.013 -0.009 L -0.012 -0.011 L -0.01 -0.012 L -0.009 -0.014 L -0.007 -0.015 H -0.005 L -0.004 -0.016 H -0.002 H 0 V -0.016 H 0.002 H 0.004 L 0.006 -0.015 H 0.008 L 0.009 -0.014 L 0.011 -0.012 L 0.012 -0.011 L 0.014 -0.009 L 0.015 -0.008 V -0.006 L 0.016 -0.004 V -0.002 V 0 Z","pos":[0.1890,-0.038],"layers":["F.Cu"],"index":18},"VIN": {"shape": "M -0.028 -0.0075 V -0.0085 L -0.027 -0.0095 V -0.0105 V -0.0115 H -0.026 L -0.025 -0.0125 V -0.0125 L -0.024 -0.0135 H -0.023 H -0.022 V -0.0145 H -0.021 H 0.022 H 0.023 L 0.024 -0.0135 H 0.025 H 0.026 L 0.027 -0.0125 V -0.0125 L 0.028 -0.0115 V -0.0115 L 0.029 -0.0105 V -0.0095 V -0.0085 L 0.03 -0.0075 V -0.0065 V 0.0075 V 0.0085 L 0.029 0.0095 V 0.0105 V 0.0105 L 0.028 0.0115 V 0.0125 H 0.027 V 0.0135 H 0.026 L 0.025 0.0145 H 0.024 H 0.023 H 0.022 H -0.021 H -0.022 V 0.0145 H -0.023 L -0.024 0.0135 H -0.025 V 0.0125 H -0.026 L -0.027 0.0115 V 0.0105 V 0.0105 L -0.028 0.0095 V 0.0085 V 0.0075 V -0.0065 Z","pos":[-0.222,0.0335],"layers":["F.Cu"],"index":19},"C_GND": {"shape": "M -0.028 -0.0075 V -0.0085 L -0.027 -0.0095 V -0.0105 V -0.0115 H -0.026 L -0.025 -0.0125 V -0.0125 L -0.024 -0.0135 H -0.023 H -0.022 V -0.0145 H -0.021 H 0.022 H 0.023 L 0.024 -0.0135 H 0.025 H 0.026 L 0.027 -0.0125 V -0.0125 L 0.028 -0.0115 V -0.0115 L 0.029 -0.0105 V -0.0095 V -0.0085 L 0.03 -0.0075 V -0.0065 V 0.0075 V 0.0085 L 0.029 0.0095 V 0.0105 V 0.0105 L 0.028 0.0115 V 0.0125 H 0.027 V 0.0135 H 0.026 L 0.025 0.0145 H 0.024 H 0.023 H 0.022 H -0.021 H -0.022 V 0.0145 H -0.023 L -0.024 0.0135 H -0.025 V 0.0125 H -0.026 L -0.027 0.0115 V 0.0105 V 0.0105 L -0.028 0.0095 V 0.0085 V 0.0075 V -0.0065 Z","pos":[-0.222,-0.0385],"layers":["F.Cu"],"index":20},  "USB_D_0": {"shape": "M 0.0115 0.014 H -0.0135 H -0.0155 H -0.0175 H -0.0195 V 0.012 L -0.0205 0.011 L -0.0215 0.01 L -0.0225 0.009 L -0.0235 0.008 L -0.0245 0.007 L -0.0255 0.006 V 0.004 V 0.002 V 0 V 0 V -0.002 V -0.004 V -0.006 L -0.0245 -0.007 L -0.0235 -0.008 L -0.0225 -0.009 L -0.0215 -0.01 L -0.0205 -0.011 L -0.0195 -0.012 L -0.0185 -0.013 H -0.0165 H -0.0145 H -0.0125 H 0.0125 H 0.0145 H 0.0165 H 0.0185 L 0.0195 -0.012 L 0.0205 -0.011 L 0.0215 -0.01 L 0.0225 -0.009 L 0.0235 -0.008 L 0.0245 -0.007 L 0.0255 -0.006 V -0.004 V -0.002 V 0 V 0 V 0.002 V 0.004 V 0.006 L 0.0245 0.007 L 0.0235 0.008 L 0.0225 0.009 L 0.0205 0.01 L 0.0195 0.011 L 0.0185 0.012 L 0.0175 0.013 H 0.0155 H 0.0135 Z","pos":[0.1695,0.116],"layers":["drill"],"index":21},  "USB_D_1": {"shape": "M 0.0115 0.014 H -0.0135 H -0.0155 H -0.0175 H -0.0195 V 0.012 L -0.0205 0.011 L -0.0215 0.01 L -0.0225 0.009 L -0.0235 0.008 L -0.0245 0.007 L -0.0255 0.006 V 0.004 V 0.002 V 0 V 0 V -0.002 V -0.004 V -0.006 L -0.0245 -0.007 L -0.0235 -0.008 L -0.0225 -0.009 L -0.0215 -0.01 L -0.0205 -0.011 L -0.0195 -0.012 L -0.0185 -0.013 H -0.0165 H -0.0145 H -0.0125 H 0.0125 H 0.0145 H 0.0165 H 0.0185 L 0.0195 -0.012 L 0.0205 -0.011 L 0.0215 -0.01 L 0.0225 -0.009 L 0.0235 -0.008 L 0.0245 -0.007 L 0.0255 -0.006 V -0.004 V -0.002 V 0 V 0 V 0.002 V 0.004 V 0.006 L 0.0245 0.007 L 0.0235 0.008 L 0.0225 0.009 L 0.0205 0.01 L 0.0195 0.011 L 0.0185 0.012 L 0.0175 0.013 H 0.0155 H 0.0135 Z","pos":[0.1695,-0.128],"layers":["drill"],"index":22},  "USB_D_2": {"shape": "M 0.0115 0.014 H -0.0135 H -0.0155 H -0.0175 H -0.0195 V 0.012 L -0.0205 0.011 L -0.0215 0.01 L -0.0225 0.009 L -0.0235 0.008 L -0.0245 0.007 L -0.0255 0.006 V 0.004 V 0.002 V 0 V 0 V -0.002 V -0.004 V -0.006 L -0.0245 -0.007 L -0.0235 -0.008 L -0.0225 -0.009 L -0.0215 -0.01 L -0.0205 -0.011 L -0.0195 -0.012 L -0.0185 -0.013 H -0.0165 H -0.0145 H -0.0125 H 0.0125 H 0.0145 H 0.0165 H 0.0185 L 0.0195 -0.012 L 0.0205 -0.011 L 0.0215 -0.01 L 0.0225 -0.009 L 0.0235 -0.008 L 0.0245 -0.007 L 0.0255 -0.006 V -0.004 V -0.002 V 0 V 0 V 0.002 V 0.004 V 0.006 L 0.0245 0.007 L 0.0235 0.008 L 0.0225 0.009 L 0.0205 0.01 L 0.0195 0.011 L 0.0185 0.012 L 0.0175 0.013 H 0.0155 H 0.0135 Z","pos":[0.2872,-0.128],"layers":["drill"],"index":23},  "USB_D_3": {"shape": "M 0.0115 0.014 H -0.0135 H -0.0155 H -0.0175 H -0.0195 V 0.012 L -0.0205 0.011 L -0.0215 0.01 L -0.0225 0.009 L -0.0235 0.008 L -0.0245 0.007 L -0.0255 0.006 V 0.004 V 0.002 V 0 V 0 V -0.002 V -0.004 V -0.006 L -0.0245 -0.007 L -0.0235 -0.008 L -0.0225 -0.009 L -0.0215 -0.01 L -0.0205 -0.011 L -0.0195 -0.012 L -0.0185 -0.013 H -0.0165 H -0.0145 H -0.0125 H 0.0125 H 0.0145 H 0.0165 H 0.0185 L 0.0195 -0.012 L 0.0205 -0.011 L 0.0215 -0.01 L 0.0225 -0.009 L 0.0235 -0.008 L 0.0245 -0.007 L 0.0255 -0.006 V -0.004 V -0.002 V 0 V 0 V 0.002 V 0.004 V 0.006 L 0.0245 0.007 L 0.0235 0.008 L 0.0225 0.009 L 0.0205 0.01 L 0.0195 0.011 L 0.0185 0.012 L 0.0175 0.013 H 0.0155 H 0.0135 Z","pos":[0.2872,0.116],"layers":["drill"],"index":24}}


// variables & constants
var stepperWide = 37; //distance: width and height of motor board in mm
var stepperHoles = 31; //distanc: center-center stepper motor holes in mm

const convert = 25.4; //convert mm to inches
const offset = 0.08; //last minute board offset from origin center cheat

const powerWire = 0.04; //width of power traces
const signalWire = 0.02; //width of signal traces

const width = 0;
const height = 1;

/* -- DECLARE_PCB -- */
let board = new PCB();

// Specify the shape and dimensions of the PCB outline
let interior = path(
  pt(-(stepperWide/convert)/2-offset, (stepperWide/convert)/2),
  pt((stepperWide/convert)/2-offset, (stepperWide/convert)/2),
  pt((stepperWide/convert)/2-offset, -(stepperWide/convert)/2),
  pt(-(stepperWide/convert)/2-offset, -(stepperWide/convert)/2),
);

board.addShape("interior", interior);

// Mounting Holes
const hole1 = geo.circle(-0.05);
geo.translate(hole1, [-(stepperHoles/convert)/2-offset, (stepperHoles/convert)/2]);
board.addShape("drill", hole1);

const hole2 = geo.circle(-0.05);
geo.translate(hole2, [(stepperHoles/convert)/2-offset, (stepperHoles/convert)/2]);
board.addShape("drill", hole2);

const hole3 = geo.circle(-0.05);
geo.translate(hole3, [-(stepperHoles/convert)/2-offset, -(stepperHoles/convert)/2]);
board.addShape("drill", hole3);

const hole4 = geo.circle(-0.05);
geo.translate(hole4, [(stepperHoles/convert)/2-offset, -(stepperHoles/convert)/2]);
board.addShape("drill", hole4);

/* -- ADD_COMPONENTS -- */

const XiaoRP2040 = board.add(XIAO_RP2040, { translate: pt(0, -0.4), rotate: -90, name: "XIAO_RP2040" })

const hbridge1 = board.add(H_bridge_SM8, { translate: pt(-0.42, 0.07), rotate: 90, name: "H_bridge_SM8" })
const hbridge2 = board.add(H_bridge_SM8, { translate: pt(0.14, hbridge1.posY), rotate: 90, name: "H_bridge_SM8" })

const LED = board.add(LED_1206, { translate: pt(hbridge1.padX("GND")-0.055, -0.35), rotate: 0, name: "LED" })

const C1 = board.add(C_1206, { translate: pt(hbridge2.padX("VREF")+0.1, hbridge2.padY("VREF")+0.06), rotate: 90, name: "C1 0.1uF" })
const C2 = board.add(C_1206, { translate: pt(0.4, hbridge2.padY("VBB")), rotate: 0, name: "C2 1uF" })
const C3 = board.add(C_1206, { translate: pt(0.4, C2.posY+0.1), rotate: 0, name: "C3 10uF" })
const C4 = board.add(C_1206, { translate: pt(-0.24, 0), rotate: 90, name: "C4 0.1uF" })
const C5 = board.add(C_1206, { translate: pt(-0.18, hbridge1.padY("VBB")), rotate: 0, name: "C5 1uF" })
const C6 = board.add(C_1206, { translate: pt(-0.18, C5.posY+0.1), rotate: 0, name: "C6 10uF" })

const R1 = board.add(R_1206, { translate: pt(C1.padX("1")+0.1, C1.padY("1")-0.06), rotate: 90, name: "R1 120R" })
const R2 = board.add(R_1206, { translate: pt(0.05, 0.32), rotate: 0, name: "R2 300R" })
const R3 = board.add(R_1206, { translate: pt(-0.1, C4.padY("1")), rotate: 0, name: "R3 120R" })
const R4 = board.add(R_1206, { translate: pt(hbridge1.padX("OUT2"), hbridge1.padY("OUT2")+0.1), rotate: 0, name: "R4 300R" })
const R5 = board.add(R_1206, { translate: pt(R4.posX, R4.posY+0.1), rotate: 0, name: "R5 0R" })
const R6 =  board.add(R_1206, { translate: pt(R5.posX+0.21, R5.posY), rotate: 0, name: "R6 0R" })
const R7 =  board.add(R_1206, { translate: pt(R2.padX("1")+0.06, R5.posY), rotate: 0, name: "R7 0R" })
const R8 =  board.add(R_1206, { translate: pt(R2.padX("2")+0.06, R5.posY+0.08), rotate: 0, name: "R8 0R" })

const header1x4 = board.add(header_4H, { translate: pt(0, 0.65), rotate: 90, name: "header1x4" })

/* -- ADD_WIRES -- */
// generic wire path & wire width code >> board.wire(path(), 0.03);

//5V Power Line from Xiao
//Xiao VCC > LED Anode
board.wire(path(
  XiaoRP2040.pad("VCC"),
  pt(-0.37, XiaoRP2040.padY("VCC")),
  pt(LED.padX("A"), -0.45),
  LED.pad("A")), powerWire);

//LED Anode > R5 1
board.wire(path(
  LED.pad("A"),
  pt(LED.padX("A"), -0.2),
  pt(-0.65, -0.15),
  pt(-0.65, R5.padY("1")),
  R5.pad("1"),
  ), powerWire);

//R5 2 > R6 1
board.wire([
  R5.pad("2"),
  R6.pad("1")
], powerWire)

//R6 1 > C6 2
board.wire([
  R6.pad("2"),
  C6.pad("1")
], powerWire)

//R6 2 > R7 1
board.wire([
  R6.pad("2"),
  R7.pad("1")
], powerWire);

//R7 2 > R8 1
board.wire([
  R7.pad("2"),
  R8.pad("1")
], powerWire);

//R8 2 > C3 1
board.wire(path(
  R8.pad("2"),
  pt(C3.padX("1"), R8.padY("2")-0.03),
  C3.pad("1"),
  ), powerWire);

//C3 1 > C2 1
board.wire([
  C3.pad("1"),
  C2.pad("1")
], powerWire);

//C5 1 > C6 1
board.wire([
  C5.pad("1"),
  C6.pad("1")
], powerWire)


//GND line from Xiao
//Xiao GND > LED Cathode
board.wire(path(
  XiaoRP2040.pad("GND"),
  pt(-0.35, XiaoRP2040.padY("GND")),
  pt(LED.padX("C"), -0.43),
  LED.pad("C")), powerWire);

//LED cathode > hbridge1 GND
board.wire(path(
  LED.pad("C"),
  hbridge1.pad("GND")), powerWire)

//hbridge1 GND > C4 2
board.wire(path(
  hbridge1.pad("GND"),
  pt(hbridge1.padX("GND"), C4.padY("2")),
  C4.pad("2")), powerWire);

//hbridge1 GND > R4 1
board.wire(path(
  pt(hbridge1.padX("GND"), C4.padY("2")),
  pt(R4.padX("1"), 0.06),
  R4.pad("1"),
  ), powerWire);

//C4 2 > C5 2
board.wire(path(
  C4.pad("2"),
  C5.pad("2")
), powerWire)

//C5 2 > C6 2
board.wire(path(
  C5.pad("2"),
  C6.pad("2")
), powerWire)

//C6 2 > R2 1
board.wire(path(
  C6.pad("2"),
  R2.pad("1")
), powerWire)

//C5 2 > C6 2
board.wire([
  C5.pad("2"),
  C6.pad("2")
], powerWire)

//C4 2 > C1 2
board.wire(path(
  C4.pad("2"),
  pt(hbridge2.padX("GND"), C1.padY("2")),
  C1.pad("2")
), powerWire)

//hbridge2 GND > C1 2
board.wire(path(
  hbridge2.pad("GND"),
  pt(hbridge2.padX("GND"), C1.padY("2")),
  C1.pad("2")), powerWire);

//C1 2 > C2 2
board.wire(path(
  C1.pad("2"),
  pt(C2.padX("2")-0.03, C1.padY("2")),
  C2.pad("2")), powerWire);

//C2 2 > C3 2
board.wire([
  C2.pad("2"),
  C3.pad("2")
], powerWire);


//Xiao Connections
//Xiao 7 > R3 2
board.wire(path(
  XiaoRP2040.pad("7"),
  pt(R3.padX("1")+0.02, XiaoRP2040.padY("7")),
  R3.pad("2")), powerWire)

//R3 1 > C4 1
board.wire(path(
  R3.pad("1"),
  C4.pad("1")
), powerWire)

//Xiao 8 > hbridge1 IN1
board.wire(path(
  XiaoRP2040.pad("8"),
  pt(hbridge1.padX("VREF"), XiaoRP2040.padY("8")),
  pt(hbridge1.padX("IN1"), -0.15),
  hbridge1.pad("IN1")
  ), signalWire);

//Xiao 9 > hbridge1 IN2
board.wire(path(
  XiaoRP2040.pad("9"),
  pt(hbridge1.padX("IN1")+0.03, XiaoRP2040.padY("9")),
  pt(hbridge1.padX("IN2"), -0.15),
  hbridge1.pad("IN2")), signalWire);

//Xiao 4 > R1 1
board.wire(path(
  XiaoRP2040.pad("4"),
  pt(R1.padX("1"), XiaoRP2040.padY("4")+0.05),
  R1.pad("1")), powerWire);

//R1 2 > C1 1
board.wire(path(
  R1.pad("2"),
  C1.pad("1")
), powerWire);

//Xiao 5 > hbridge2 IN2
board.wire(path(
  XiaoRP2040.pad("5"),
  pt(hbridge2.padX("IN2"), XiaoRP2040.padY("5")+0.02),
  hbridge2.pad("IN2")), signalWire);

//Xiao 6 > hbridge2 IN1
board.wire(path(
  XiaoRP2040.pad("6"),
  pt(hbridge2.padX("IN1"), XiaoRP2040.padY("6")+0.05),
  hbridge2.pad("IN1")), signalWire);


//hbridge1 connections
//hbridge1 VREF > C4
board.wire([
  hbridge1.pad("VREF"),
  C4.pad("1")
  ], powerWire);

//hbridge1 OUT2 > header1x4 1
board.wire(path(
  hbridge1.pad("OUT2"),
  pt(hbridge1.padX("OUT2"), R5.posY+0.08),
  pt(header1x4.padX("1"), header1x4.posY-0.08),
  header1x4.pad("1")), signalWire*0.8);

//hbridge1 LSS > R4 2
board.wire([
  hbridge1.pad("LSS"),
  R4.pad("2")
  ], signalWire);

//hbridge1 OUT1 > header1x4 2
board.wire(path(
  hbridge1.pad("OUT1"),
  pt(hbridge1.padX("OUT1"), R4.posY),
  pt(R6.posX, R6.posY-0.08),
  pt(R6.posX, R6.posY+0.08),
  pt(header1x4.padX("2"), header1x4.posY-0.1),
  header1x4.pad("2")
  ), signalWire*0.8);

//hbridg1 VBB > C5 1
board.wire([
  hbridge1.pad("VBB"),
  C5.pad("1")
], powerWire)


//hbridge2 connections
//hbridge2 VREF > C1 1
board.wire([
  hbridge2.pad("VREF"),
  C1.pad("1")
], powerWire);

//hbridge2 OUT2 > header1x4 3
board.wire(path(
  hbridge2.pad("OUT2"),
  header1x4.pad("3")), signalWire*0.8);

//hbridge2 LSS > R2 2
board.wire([
  hbridge2.pad("LSS"),
  R2.pad("2")
], signalWire);

//hbridge2 OUT1 > header1x4 4
board.wire(path(
  hbridge2.pad("OUT1"),
  pt(hbridge2.padX("OUT1"), header1x4.padY("4")-0.1),
  pt(header1x4.padX("4"), header1x4.padY("4")-0.08),
  header1x4.pad("4")), signalWire*0.8);

//hbridge2 VBB > C2 1
board.wire([
  hbridge2.pad("VBB"),
  C2.pad("1")
], powerWire);


/* -- RENDER_PCB -- */

const limit0 = pt(-0.85, -0.77); //export boundary lower left corner
const limit1 = pt(0.7, 0.77); //exort boundary upper right corner
const xMin = Math.min(limit0[0], limit1[0]);
const xMax = Math.max(limit0[0], limit1[0]);
const yMin = Math.min(limit0[1], limit1[1]);
const yMax = Math.max(limit0[1], limit1[1]);

renderPCB({
  pcb: board,
  layerColors: {
    "interior": "#002d00ff",
    //"B.Cu": "#ff4c007f",
    "F.Cu": "#ff8c00cc",
    "drill": "#b3ff9e82",
    "padLabels": "#ffffffe5",
    "componentLabels": "#48ff00b7",
  },
  limits: {
    x: [xMin, xMax],
    y: [yMin, yMax]
  },
  mm_per_unit: convert
});
