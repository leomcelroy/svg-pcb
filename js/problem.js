const a = () => board.add(test_footprint, { translate: [0.15, 2.1] })

for(let i = 0; i < 4; i++) {
  board.add(test_footprint, { translate: [-0.55*i, 1.7] })
  board.add(test_footprint, { translate: [-0.3*i, 2.55] })
}

board.add(test_footprint, { translate: [0.6, 2.55] })
a()

/*
problem because board.add is called last but declared first
*/