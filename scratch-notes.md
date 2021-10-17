# TODO

- [] add error messages
- [] fix minus bug
- [] fix text rendering in gram-js
- [] firefox rendering bug
- [x] save
- [] upload
	- [x] kicad module
	- [] js
- [] share site
- [x] converter from python to js board
- [x] improve gram-js docs

- [x] switch to full javascript parser
	- esprima
	- acorn
	- https://github.com/meriyah/meriyah
	- cherow
	- https://github.com/davidbonnet/astring
	
- [x] recompile ast to javascript
- [x] optimize js parsing and recompilation
- manipulation handles for other transformations
- [x] add component menu
- [x] python scraper for neil's components
- [x] update skypack dependency or bundle

https://gitlab.cba.mit.edu/classes/865.21/projects/frep-editor/-/blob/main/extras/PCB_py2js.py

- render as board
- [x] clean up menu
- convert whole boards
- make tutorial
- draw wire

# Bugs

- fix fontBoundingBoxAscent
	- render text with opentype.js
- anti-aliasing in firefox


# Older

- Should I use multiple strokes in path?
	- M 0 0 L 80 80 M 0 0 L 78 5
- Booleans on beziers?
- Convert to polyline (with Turtle) then boolean
- Just use colors to union
	- easier selections
- Accept all svgs
	- could have fill conflicts
	- could be useful for screen printing
	- easier selections
- My own subset
	- may need this for text anyway
	- easier selections
	- eg
		- wire
			- ["wire", pathdata, thickness] -> `<path lineJoin lineCap/>`
		- circle
		- rectangle
		- path
		- text
