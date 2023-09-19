import { html, render, svg } from "lit-html";

export { html, render, svg };

export function createComponent({ 
  name, // tag?
  props,
  css, 
  view,
  onConstruct,
  onConnect,
  onDisconnect,
  onAttributeChange
}) {

    if (!name) {
      console.error("name is required");
    }

    css = css ? css : null;
    view = view ? view : null;
    onConstruct = onConstruct ? onConstruct : null;
    onConnect = onConnect ? onConnect : null;
    onDisconnect = onDisconnect ? onDisconnect : null;
    onAttributeChange = onAttributeChange ? onAttributeChange : null;

  
    class Temp extends HTMLElement {

      constructor() {
        super();

        this.dom = this.attachShadow({ mode: "open" });

        for (const key in props) {
          Object.defineProperty(this, key, {
            get: function() {
              return props[key];
            },
            set: function(value) {
              props[key] = value;
              if (onAttributeChange) onAttributeChange(this, key, value);
              this.render();
            },
            enumerable: true,
            configurable: true
          });
        }
      
        if (css) {
          // const id = `_${Date.now()}`
          // this.classList.add(id);
          addCSS(css, this.dom);
        }

        this.render();
        if (onConstruct) onConstruct(this);
 
      }
    
      // connect component
      connectedCallback() {
        if (onConnect) onConnect(this);
      }
  
      disconnectedCallback() {
        if (onDisconnect) onDisconnect(this);
      }

      render() {
        render(view(this), this.dom);
      }

      // static get observedAttributes() { 
      //   return Object.keys(props); 
      // }

      // attributeChangedCallback(name, oldValue, newValue) {
      //   console.log(name, oldValue, newValue);
      //   this[name] = JSON.parse(newValue);
      //   this.render();
      // }
  }

  customElements.define( name, Temp );

}

function addCSS(css, dom){
  var s = document.createElement('style');
  s.setAttribute('type', 'text/css');
  if (s.styleSheet) {   // IE
      s.styleSheet.cssText = css;
  } else {                // the world
      s.appendChild(document.createTextNode(css));
  }

  // var head = document.getElementsByTagName('head')[0];
  // head.appendChild;
  dom.appendChild(s);
 }
