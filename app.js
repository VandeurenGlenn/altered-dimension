import { S as SelectorMixin } from './selector-mixin-a6a7b665.js';

customElements.define('custom-logo', class CustomLogo extends HTMLElement {
  static get observedAttributes() { return ['src']; }

  set src(value) {
    this.img.src = value;
  }

  get img() {
    return this.shadowRoot.querySelector('img')
  }
  
  get spinner() {
    return this.shadowRoot.querySelector('.spinner')
  }

  constructor() {
    super();
    
    this._onload = this._onload.bind(this);
    this._resize = this._resize.bind(this);

    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: 8px 16px;
        align-items: center;
        box-sizing: border-box;
      }

      .spinner {
        padding: 8px 16px;
        box-sizing: border-box;
        position: absolute;
        border: 16px solid transparent;
        border-top: 16px solid #3498db; /* Blue */
        border-radius: 50%;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    
      img {
        z-index: 100;
        width: 100%;
        height: 100%;
      }
      
      .laser-beam {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 3px;
  height: 100%;
  background: rgba(99,195,231,0.6);
  -webkit-box-shadow: 0px 0px 15px 0px rgba(99,195,231,1);
  -moz-box-shadow: 0px 0px 15px 0px rgba(99,195,231,1);
  box-shadow: 0px 0px 15px 0px rgba(99,195,231,1);
  /* transform-origin: 0; */
  animation: laser 2s infinite;
  -webkit-animation: laser 2s infinite;
  /* z-index: 100; */
}
  
  .beam {
    -webkit-animation: laser 7.7s infinite;
    background: rgba(99,195,231,0.6);
    -webkit-box-shadow: 0px 0px 15px 0px rgba(99,195,231,1);
    -moz-box-shadow: 0px 0px 15px 0px rgba(99,195,231,1);
    box-shadow: 0px 0px 15px 0px rgba(99,195,231,1);
  }

@keyframes laser {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
    </style>
    <img></img>
    <span class="spinner">

    </span>
    <div class="laser-beam"></div>
    <div class="laser-beam beam"></div>
    `;
  }
  connectedCallback() {
    
    this.img.addEventListener('load', this._onload);
    if (this.hasAttribute('src')) this.src = this.getAttribute('src');
    window.addEventListener('resize', this._resize);
    this._resize();
  }
  _onload() {
    this._resize();
  }
  _resize() {
    const { width, height } = this.img.getBoundingClientRect();
    this.spinner.style.width = `${width}px`;
    this.spinner.style.height = `${height}px`;
  }
  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value;
  }
});

customElements.define('custom-container', class CustomContainer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }
      :host([row]) {
        flex-direction: column;
      }
      @media (min-width: 640px) {
        ::slotted(*) {
          max-width: 640px;
        }
      }
    </style>
    <slot></slot>
    `;
  }
});

(() => {
  class CustomInput extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = this.template;
    }
    set type(val) {
      this.input.setAttribute('type', val);
    }
    set placeholder(val) {
      this.input.setAttribute('placeholder', val);
    }
    set value(val) {
      this.input.setAttribute('value', val);
    }
    get input() {
      return this.shadowRoot.querySelector('input');
    }
    get value() {
      return this.input.value;
    }
    addListener(name, cb) {
      if(name === 'input' || name === 'change') {
        this.input.addEventListener(name, cb);
      } else {
        this.addEventListener(name, cb);
      }
    }
    get template() {
      return `
        <style>
          :host {
            display: block;
            height: var(--custom-input-height, 48px);
            background: var(--custom-input-background, transparent);
            width: 100%;
            box-shadow: 0px 1px 3px -1px #333;
            min-width: 240px;
          }
          input {
            --webkit-visibility: none;
            border: none;
            background: transparent;
            height: var(--custom-input-height, 48px);
            width: 100%;
          }
        </style>
        <slot name="before"></slot>
        <input></input>
        <slot name="after"></slot>
      `;
    }
  }  customElements.define('custom-input', CustomInput);
})();

const define  = klass => customElements.define('custom-selector', klass);
define(class CustomSelector extends SelectorMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = '<slot></slot>';
  }
});

var app = customElements.define('altered-app', class AlteredApp extends HTMLElement {
  get drawerToggle() {
    return this.querySelector('.drawer-menu-icon')  
  }
  
  get drawer() {
    return this.querySelector('custom-drawer')  
  }
  
  get drawerSelected() {
    return this.drawer.querySelector('custom-menu').selected
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.go = this.go.bind(this);
    this.shadowRoot.innerHTML = `
    <style>
     :host {
       position: absolute;
       top: 0;
       left: 0;
       bottom: 0;
       right: 0;
     }
    </style>
    <custom-page-controller></custom-page-controller>
    <custom-svg-iconset>
      <svg><defs>
        <g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
        <g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
      </defs></svg>
    </custom-svg-iconset>
    <slot></slot>
    `;
    (async () => {
      await import('./custom-svg-iconset-01f346e8.js');
      import('./custom-svg-icon-b3b9700f.js');
    })();
  }
  
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    
    this.drawerToggle.addEventListener('click', () => {
      if (this.hasAttribute('drawer-open')) this.removeAttribute('drawer-open');
      else this.setAttribute('drawer-open', '');
    });
    console.log('eee');
    (async () => {
      await import('./custom-drawer-b43c6f3e.js');
      // await customElements.whenDefined('custom-drawer')
      await import('./custom-page-controller-1c0da1aa.js');
      
      console.log(this.shadowRoot);
      window.go = this.go;
      if (!this.drawerSelected) go('home');
      
  
    })();
  }
  
  async go(route, subRoute, info) {
    const has = await customElements.get(`${route}-section`);
    if (!has)
    console.log(has);
  }
  
});

export default app;
