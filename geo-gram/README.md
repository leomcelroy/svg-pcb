# Gram JS

```
point :: { x: number, y: number }
polyline :: point[]
shape :: polyline[]

enhanced :: { 
  shape: shape, 
  metadata: ...{ name: string } 
}

transformObj :: {
  dx: number,
  dy: number,
  sx: number,
  sy: number,
  rotate: number,
  ox: number,
  oy: number
}

or

{
  translate: [number, number],
  scale: [number, number],
  origin: [number, number],
  rotate: number
}
```

- [x] turnForward
- [x] vec
- [x] close
- [x] translate
- [x] rotate
- [x] scale
- [] applyMatrix
- [x] transform(transformObj): polyline
- [x] originate
- [x] goTo
- [x] reverse
- [x] thicken
- [x] copyPaste
- [x] offset
- [x] outline
- [x] expand
- [x] intersect
- [x] difference
- [x] union
- [x] xor
- [] trim
- [] pathD(pathData: string): polyline
- [] bezier
- [] fillet
- [] roundCorners
- [] arc

- [x] lastAngle
- [x] extrema
- [x] point
  - [x] lt
  - [x] lc
  - [x] lb
  - [x] ct
  - [x] cc
  - [x] cb
  - [x] rt
  - [x] rc
  - [x] rb
  - [x] start
  - [x] end
  - [ ] centroid
- [x] width
- [x] height

- ? text
- ? dogbone
- ? repeat
- ? flip
- ? slide(angle: number, distance: number): polyline


```
    lt -- ct -- rt 
     |     |     |        
    lc -- cc -- rc   
     |     |     |      
    lb -- cb -- rb 
``` 