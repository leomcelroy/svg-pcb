# TODO
- [] handles for
	- [] deleting components
	- [] deleting inventory, which clears adds
	- [] rotating components
- [] file names
- [] select components
- [] component labels by default 
- [] copper fill
- [] wire dragging
- [] smart routing
- [] when dragging screen and triggering out drag continues on re-entry
- [] add error handling
- [x] don't snap to grid when grid is off
- [x] add new file button

- [] add names to dropped components
- [] fix codemirror config
	- [] remove autocomplete
- [] only draw handles if layer handle it on is visible
- [] optimize
	- [x] don't generate wires until export, use native path rendering
	- [x] use codemirror parsing instead of esprima
- [] create function to generate callback for manipulating points
- [] fix gerber export
- [] convert kicad to json on import
- [] why is the wire path getting flattened, can't have holes
- [x] prevent auto-import with matching names
- [] cache recent files (up to five?)
- [] add color pickers for board layers
- [] add version system
- [] fix build system to bundle url dependencies
	- should have single js file after build
- [] filter shapes with empty paths
- [] should we accept the color arrays or just color strings
- [x] add drag n drop component
- [] add wire direct manipulation
- [] add color editor widget for board render
- [] gerber
- [x] render function
- [x] change return to function call
- [] add error messages
- [x] fix minus bug
- [] fix text rendering in gram-js
- [] firefox rendering bug
- [] fix gram js text to be faster
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

https://css-tricks.com/converting-color-spaces-in-javascript/

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



{
   "imports": {
        "gram-js": "https://leomcelroy.com/gram-js/exports.js",
        "code-mirror": "https://leomcelroy.com/widgets/code-mirror.js"
   }
}

```
/* __COMPONENTS__ */
/* ___COMPONENTS___ */
/* --COMPONENTS-- */
/* ---COMPONENTS--- */
/* -- COMPONENTS -- */
/* --- COMPONENTS --- */
/* __components__ */
/* ___components___ */
/* --components-- */
/* ---components--- */
/* -- components -- */
/* --- components --- */
```


```
/* -- DECLARE_COMPONENTS -- */
/* -- DECLARE_PCB -- */
/* -- ADD_COMPONENTS -- */
/* -- ADD_WIRES -- */
/* -- RENDER_PCB -- */

```
