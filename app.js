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

//
/**
* Replaces all accented chars with regular ones
*/
const replaceAccents = string => {
  // verifies if the String has accents and replace them
  if (string.search(/[\xC0-\xFF]/g) > -1) {
      string = string
              .replace(/[\xC0-\xC5]/g, "A")
              .replace(/[\xC6]/g, "AE")
              .replace(/[\xC7]/g, "C")
              .replace(/[\xC8-\xCB]/g, "E")
              .replace(/[\xCC-\xCF]/g, "I")
              .replace(/[\xD0]/g, "D")
              .replace(/[\xD1]/g, "N")
              .replace(/[\xD2-\xD6\xD8]/g, "O")
              .replace(/[\xD9-\xDC]/g, "U")
              .replace(/[\xDD]/g, "Y")
              .replace(/[\xDE]/g, "P")
              .replace(/[\xE0-\xE5]/g, "a")
              .replace(/[\xE6]/g, "ae")
              .replace(/[\xE7]/g, "c")
              .replace(/[\xE8-\xEB]/g, "e")
              .replace(/[\xEC-\xEF]/g, "i")
              .replace(/[\xF1]/g, "n")
              .replace(/[\xF2-\xF6\xF8]/g, "o")
              .replace(/[\xF9-\xFC]/g, "u")
              .replace(/[\xFE]/g, "p")
              .replace(/[\xFD\xFF]/g, "y");
  }

  return string;
};

const removeNonWord = string => string.replace(/[^0-9a-zA-Z\xC0-\xFF \-]/g, '');

const WHITE_SPACES = [
    ' ', '\n', '\r', '\t', '\f', '\v', '\u00A0', '\u1680', '\u180E',
    '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006',
    '\u2007', '\u2008', '\u2009', '\u200A', '\u2028', '\u2029', '\u202F',
    '\u205F', '\u3000'
];

/**
* Remove chars from beginning of string.
*/
const ltrim = (string, chars) => {
  chars = chars || WHITE_SPACES;

  var start = 0,
      len = string.length,
      charLen = chars.length,
      found = true,
      i, c;

  while (found && start < len) {
      found = false;
      i = -1;
      c = string.charAt(start);

      while (++i < charLen) {
          if (c === chars[i]) {
              found = true;
              start++;
              break;
          }
      }
  }

  return (start >= len) ? '' : string.substr(start, len);
};

/**
* Remove chars from end of string.
*/
const rtrim = (string, chars) => {
  chars = chars || WHITE_SPACES;

  var end = string.length - 1,
      charLen = chars.length,
      found = true,
      i, c;

  while (found && end >= 0) {
      found = false;
      i = -1;
      c = string.charAt(end);

      while (++i < charLen) {
          if (c === chars[i]) {
              found = true;
              end--;
              break;
          }
      }
  }

  return (end >= 0) ? string.substring(0, end + 1) : '';
};

/**
 * Add space between camelCase text.
 */
const unCamelCase = string => {
  string = string.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2');
  string = string.toLowerCase();
  return string;
};

/**
 * Remove white-spaces from beginning and end of string.
 */
const trim = (string, chars) => {
  chars = chars || WHITE_SPACES;
  return ltrim(rtrim(string, chars), chars);
};

/**
 * Convert to lower case, remove accents, remove non-word chars and
 * replace spaces with the specified delimeter.
 * Does not split camelCase text.
 */
const slugify = (string, delimeter) => {
  if (delimeter == null) {
      delimeter = "-";
  }

  string = replaceAccents(string);
  string = removeNonWord(string);
  string = trim(string) //should come after removeNonWord
          .replace(/ +/g, delimeter) //replace spaces with delimeter
          .toLowerCase();
  return string;
};

/**
* Replaces spaces with hyphens, split camelCase text, remove non-word chars, remove accents and convert to lower case.
*/
const hyphenate = string => {
  string = unCamelCase(string);
  return slugify(string, "-");
};


 let sheduled = false;
 const afterRenderQue = [];
 const beforeRenderQue = [];

 const callMethod = array => {
   const context = array[0];
   const callback = array[1];
   const args = array[2];
   try {
     callback.apply(context, args);
   } catch(e) {
     setTimeout(() => {
       throw e;
     });
   }
 };

 const flushQue = que => {
   while (que.length) {
     callMethod(que.shift);
   }
 };

 const runQue = que => {
   for (let i=0, l=que.length; i < l; i++) {
     callMethod(que.shift());
   }
   sheduled = false;
 };

 const shedule = () => {
   sheduled = true;
   requestAnimationFrame(() => {
     flushQue(beforeRenderQue);
     setTimeout(() => {
       runQue(afterRenderQue);
     });
   });
 };

 const RenderStatus = (() => {
   window.RenderStatus = window.RenderStatus || {
     afterRender: (context, callback, args) => {
       if (!sheduled) {
         shedule();
       }
       afterRenderQue.push([context, callback, args]);
     },
     beforeRender: (context, callback, args) => {
       if (!sheduled) {
         shedule();
       }
       beforeRenderQue.push([context, callback, args]);
     }
   };
 })();

 const shouldRegister = name => {
   return customElements.get(name) ? false : true;
 };

 const define$1 = klass => {
   const name = hyphenate(klass.name);
   return shouldRegister(name) ? customElements.define(name, klass) : '';
 };

define$1(class CustomDivider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        height: 1px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        margin-top: -1px;
      }
      :host([top]) {
        border-bottom: none;
        margin-bottom: -1px;
        border-top: 1px solid rgba(0, 0, 0, 0.12);
      }
      :host([left]) {
        height: 100%;
        width: 1px;
        border-bottom: none;
        margin-right: -1px;
        border-left: 1px solid rgba(0, 0, 0, 0.12);
      }
      :host([right]) {
        height: 100%;
        width: 1px;
        border-bottom: none;
        left: -1px;
        border-right: 1px solid rgba(0, 0, 0, 0.12);
      }
    </style>
    `;
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
  get pageController() {
    return this.shadowRoot.querySelector('custom-page-controller')
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.go = this.go.bind(this);
    this._onhashChange = this._onhashChange.bind(this);
    
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
    this.addEventListener('mouse-up', event => {
      if (event.srcElement.hasAttribute('custom-submenu')) return;
      if (this.hasAttribute('drawer-open')) this.removeAttribute('drawer-open');
      else this.setAttribute('drawer-open', '');
    });
    this.drawer.addEventListener('click', event => {
      if (event.srcElement.hasAttribute('custom-submenu')) return;
      if (this.hasAttribute('drawer-open')) this.removeAttribute('drawer-open');
      else this.setAttribute('drawer-open', '');
    });
    
    this.drawerToggle.addEventListener('click', () => {
      if (this.hasAttribute('drawer-open')) this.removeAttribute('drawer-open');
      else this.setAttribute('drawer-open', '');
    });
    
    (async () => {
      await import('./custom-drawer-b43c6f3e.js');
      // await customElements.whenDefined('custom-drawer')
      await import('./custom-page-controller-dbb204cc.js');
      window.go = this.go;
      if (!this.drawerSelected) go('home');
      window.onhashchange = this._onhashChange;
  
    })();
  }
  
  _onhashChange() {
    const hash = location.hash;
    const slices = hash.split('/');
    console.log(slices);
    if (slices.length > 1) {
      const selected = slices[slices.length - 1];
      console.log(selected);
      if (selected !== this.drawerSelected) {        
        this.pageController._nav.dispatchEvent(new CustomEvent('selected', { detail: selected }));
      }
    }
  }
  
  async go(route, info) {
    let hash = route;
    if (info) {
      hash = `${info}/${route}`;
    }
    window.location.hash = `!/${hash}`;
    
    if (route === 'home') return
    
    const has = await customElements.get(`${route}-section`);
    try {
      if (!has) await import(`./${route}.js`);
    } catch (e) {
      console.error(e);
    }
  }
  
});

export default app;
