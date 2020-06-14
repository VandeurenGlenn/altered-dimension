customElements.define('app-header', class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;        
        box-shadow: inset 0px 5px 6px -3px rgba(0, 0, 0, 0.4);
        height: 128px;
        min-height: 128px;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        background: var(--primary-background);
        z-index: 100;
        // background: rgba(6, 63, 94, 0.25);
      }
    </style>
    <slot name="top"></slot>
    <slot name="bottom"></slot>
    `
  }
});

customElements.define('app-toolbar', class AppToolbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 36px;
        min-height: 36px;
      }
    </style>
    <slot></slot>
    `
  }
});

customElements.define('app-logo', class AppLogo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: block;
      }
    </style>
    <slot></slot>
    `
  }
});

customElements.define('app-navigation', class AppNavigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        width: 100%;
        height: 36px;
        min-height: 36px;
        color: #ddd;
        // flex-flow: row wrap;
        // justify-content: space-around;
      }
    </style>
    <slot></slot>
    `
  }
});

customElements.define('app-nav-item', class AppNavItem extends HTMLElement {
  static get observedAttributes() {
    return ['href']
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  
  set href(value) {
    this.shadowRoot.querySelector('a').setAttribute('href', value);
  }
  
  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 36px;
        min-height: 40px;
        font-size: 22px;
        font-weight: 800;
        padding: 24px;
        box-sizing: border-box;
        text-transform: capitalize;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
    </style>
    <a>
    <slot></slot>
    </a>
    `
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

/**
 * @extends HTMLElement
 */
var customSvgIconset = ((base = HTMLElement) => {
  window.svgIconset = window.svgIconset || {};

  customElements.define('custom-svg-iconset', class CustomSvgIconset extends base {
    /**
     * Attributes to observe
     *
     * Updates the js prop value with related attribute value
     * @return {array} ['name', 'theme', size]
     */
    static get observedAttributes() {
      return ['name', 'theme', 'size'];
    }
    /**
     * Runs whenever inserted into document
     */
    constructor() {
      super();
    }
    connectedCallback() {
      if (!this.hasAttribute('name')) {
        this.name = this.name;
      }
      this.style.display = 'none';
    }
    // Getters
    /**
     * The name of the iconset
     * @default {string} icons
     */
    get name() {
      return this._name || 'icons';
    }
    /**
     * The theme for the iconset
     * @default {string} light
     * @return {string}
     */
    get theme() {
      return this._theme || 'light';
    }
    /**
     * The size for the icons
     * @default {number} 24
     * @return {number}
     */
    get size() {
      return this._size || 24;
    }
    // Setters
    /**
     * Creates the iconset[name] in window
     */
    set name(value) {
      if (this._name !== value) {
        this._name = value;
        window.svgIconset[value] = {host: this, theme: this.theme};
        window.dispatchEvent(new CustomEvent('svg-iconset-update'));
        window.dispatchEvent(new CustomEvent('svg-iconset-added', {detail: value}));
      }
    }
    /**
     * Reruns applyIcon whenever a change has been detected
     */
    set theme(value) {
      if (this._theme !== value && this.name) {
        window.svgIconset[this.name] = {host: this, theme: value};
        window.dispatchEvent(new CustomEvent('svg-iconset-update'));
      }
      this._theme = value;
    }
    /**
     * @private
     */
    set size(value) {
      this._size = value;
    }
    /**
     * Runs whenever given attribute in observedAttributes has changed
     * @private
     */
    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        this[name] = newVal;
      }
    }
    /* from https://github.com/PolymerElements/iron-iconset-svg */
    /**
     * Applies an icon to given element
     * @param {HTMLElement} element the element appending the icon to
     * @param {string} icon The name of the icon to show
     */
    applyIcon(element, icon) {
      element = element.shadowRoot || element;
      this.removeIcon(element);
      this._cloneIcon(icon).then(icon => {
        element.insertBefore(icon, element.childNodes[0]);
        element._iconSetIcon = icon;
      });
    }
    /**
     * Remove an icon from the given element by undoing the changes effected
     * by `applyIcon`.
     *
     * @param {Element} element The element from which the icon is removed.
     */
    removeIcon(element) {
      // Remove old svg element
      element = element.shadowRoot || element;
      if (element._iconSetIcon) {
        element.removeChild(element._iconSetIcon);
        element._iconSetIcon = null;
      }
    }
    /**
     * Produce installable clone of the SVG element matching `id` in this
     * iconset, or `undefined` if there is no matching element.
     *
     * @return {Element} Returns an installable clone of the SVG element
     * matching `id`.
     * @private
     */
    _cloneIcon(id) {
      return new Promise((resolve, reject) => {
        // create the icon map on-demand, since the iconset itself has no discrete
        // signal to know when it's children are fully parsed
        try {
          this._icons = this._icons || this._createIconMap();
          let svgClone = this._prepareSvgClone(this._icons[id], this.size);
          resolve(svgClone);
        } catch (error) {
          reject(error);
        }
      });
    }
    // TODO: Update icon-map on child changes
    /**
     * Create a map of child SVG elements by id.
     *
     * @return {!Object} Map of id's to SVG elements.
     * @private
     */
    _createIconMap() {
      var icons = Object.create(null);
      this.querySelectorAll('[id]')
        .forEach(icon => {
          icons[icon.id] = icon;
        });
      return icons;
    }
    /**
     * @private
     */
    _prepareSvgClone(sourceSvg, size) {
      if (sourceSvg) {
        var content = sourceSvg.cloneNode(true),
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
            viewBox = content.getAttribute('viewBox') || '0 0 ' + size + ' ' + size,
            cssText = 'pointer-events: none; display: block; width: 100%; height: 100%;';
        svg.setAttribute('viewBox', viewBox);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.cssText = cssText;
        svg.appendChild(content).removeAttribute('id');
        return svg;
      }
      return null;
    }
  });
})();

var customSvgIconset$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': customSvgIconset
});

customElements.define('custom-drawer', class CustomDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }

  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        width: var(--custom-drawer-width, 256px);
        height: auto;
        background: var(--custom-drawer-background, #FFF);
        background-blend-mode: hue;
        color: var(--custom-drawer-color, #333);
        opacity: 0;
        box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.14);
      }
      ::slotted([slot="header"]) {
        display: block;
        box-sizing: border-box;
        min-height: 48px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.14);
        color: var(--custom-header-color, #FFF);
        background: var(--custom-header-background, #EEE);
      }
      ::slotted([slot="footer"]) {
        display: block;
        box-sizing: border-box;
        min-height: 48px;
        border-top: 1px solid rgba(0, 0, 0, 0.14);
      }
      ::slotted([slot="content"]) {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    </style>
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>`;
  }

});

window.Backed = window.Backed || {};
// binding does it's magic using the propertyStore ...
window.Backed.PropertyStore = window.Backed.PropertyStore || new Map();

// TODO: Create & add global observer
var PropertyMixin = base => {
  return class PropertyMixin extends base {
    static get observedAttributes() {
      return Object.entries(this.properties).map(entry => {if (entry[1].reflect) {return entry[0]} else return null});
    }

    get properties() {
      return customElements.get(this.localName).properties;
    }

    constructor() {
      super();
      if (this.properties) {
        for (const entry of Object.entries(this.properties)) {
          const { observer, reflect, renderer } = entry[1];
          // allways define property even when renderer is not found.
          this.defineProperty(entry[0], entry[1]);
        }
      }
    }

    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();
      if (this.attributes)
        for (const attribute of this.attributes) {
          if (String(attribute.name).includes('on-')) {
            const fn = attribute.value;
            const name = attribute.name.replace('on-', '');
            this.addEventListener(String(name), event => {
              let target = event.path[0];
              while (!target.host) {
                target = target.parentNode;
              }
              if (target.host[fn]) {
                target.host[fn](event);
              }
            });
          }
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this[name] = newValue;
    }

    /**
     * @param {function} options.observer callback function returns {instance, property, value}
     * @param {boolean} options.reflect when true, reflects value to attribute
     * @param {function} options.render callback function for renderer (example: usage with lit-html, {render: render(html, shadowRoot)})
     */
    defineProperty(property = null, {strict = false, observer, reflect = false, renderer, value}) {
      Object.defineProperty(this, property, {
        set(value) {
          if (value === this[`___${property}`]) return;
          this[`___${property}`] = value;

          if (reflect) {
            if (value) this.setAttribute(property, String(value));
            else this.removeAttribute(property);
          }

          if (observer) {
            if (observer in this) this[observer]();
            else console.warn(`observer::${observer} undefined`);
          }

          if (renderer) {
            const obj = {};
            obj[property] = value;
            if (renderer in this) this.render(obj, this[renderer]);
            else console.warn(`renderer::${renderer} undefined`);
          }

        },
        get() {
          return this[`___${property}`];
        },
        configurable: strict ? false : true
      });
      // check if attribute is defined and update property with it's value
      // else fallback to it's default value (if any)
      const attr = this.getAttribute(property);
      this[property] = attr || this.hasAttribute(property) || value;
    }
  }
};

/**
 * @mixin Backed
 * @module utils
 * @export merge
 *
 * some-prop -> someProp
 *
 * @param {object} object The object to merge with
 * @param {object} source The object to merge
 * @return {object} merge result
 */
var merge = (object = {}, source = {}) => {
  // deep assign
  for (const key of Object.keys(object)) {
    if (source[key]) {
      Object.assign(object[key], source[key]);
    }
  }
  // assign the rest
  for (const key of Object.keys(source)) {
    if (!object[key]) {
      object[key] = source[key];
    }
  }
  return object;
};

var SelectMixin = base => {
  return class SelectMixin extends PropertyMixin(base) {

    static get properties() {
      return merge(super.properties, {
        selected: {
          value: 0,
          observer: '__selectedObserver__'
        }
      });
    }

    constructor() {
      super();
    }

    get slotted() {
      return this.shadowRoot ? this.shadowRoot.querySelector('slot') : this;
    }

    get _assignedNodes() {
      const nodes = 'assignedNodes' in this.slotted ? this.slotted.assignedNodes() : this.children;
      const arr = [];
      for (var i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.nodeType === 1) arr.push(node);
      }
      return arr;
    }

    /**
    * @return {String}
    */
    get attrForSelected() {
      return this.getAttribute('attr-for-selected') || 'name';
    }

    set attrForSelected(value) {
      this.setAttribute('attr-for-selected', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        // check if value is number
        if (!isNaN(newValue)) {
          newValue = Number(newValue);
        }
        this[name] = newValue;
      }
    }

    /**
     * @param {string|number|HTMLElement} selected
     */
    select(selected) {
      if (selected) this.selected = selected;
      // TODO: fix selectedobservers
      if (this.multi) this.__selectedObserver__();
    }

    next(string) {
      const index = this.getIndexFor(this.currentSelected);
      if (index !== -1 && index >= 0 && this._assignedNodes.length > index &&
          (index + 1) <= this._assignedNodes.length - 1) {
        this.selected = this._assignedNodes[index + 1];
      }
    }

    previous() {
      const index = this.getIndexFor(this.currentSelected);
      if (index !== -1 && index >= 0 && this._assignedNodes.length > index &&
          (index - 1) >= 0) {
        this.selected = this._assignedNodes[index - 1];
      }
    }

    getIndexFor(element) {
      if (element && element instanceof HTMLElement === false)
        return console.error(`${element} is not an instanceof HTMLElement`);

      return this._assignedNodes.indexOf(element || this.selected);
    }

    _updateSelected(selected) {
      selected.classList.add('custom-selected');
      if (this.currentSelected && this.currentSelected !== selected) {
        this.currentSelected.classList.remove('custom-selected');
      }
      this.currentSelected = selected;
    }

    /**
     * @param {string|number|HTMLElement} change.value
     */
    __selectedObserver__(value) {
      const type = typeof this.selected;
      if (Array.isArray(this.selected)) {
        for (const child of this._assignedNodes) {
          if (child.nodeType === 1) {
            if (this.selected.indexOf(child.getAttribute(this.attrForSelected)) !== -1) {
              child.classList.add('custom-selected');
            } else {
              child.classList.remove('custom-selected');
            }
          }
        }
        return;
      } else if (type === 'object') return this._updateSelected(this.selected);
      else if (type === 'string') {
        for (const child of this._assignedNodes) {
          if (child.nodeType === 1) {
            if (child.getAttribute(this.attrForSelected) === this.selected) {
              return this._updateSelected(child);
            }
          }
        }
      } else {
        // set selected by index
        const child = this._assignedNodes[this.selected];
        if (child && child.nodeType === 1) this._updateSelected(child);
        // remove selected even when nothing found, better to return nothing
      }
    }
  }
};

/**
 * @extends HTMLElement
 */
class CustomPages extends SelectMixin(HTMLElement) {
  constructor() {
    super();
    this.slotchange = this.slotchange.bind(this);
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          flex: 1;
          position: relative;
          --primary-background-color: #ECEFF1;
          overflow: hidden;
        }
        ::slotted(*) {
          display: flex;
          position: absolute;
          opacity: 0;
          pointer-events: none;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transition: transform ease-out 160ms, opacity ease-out 60ms;
          /*transform: scale(0.5);*/
          transform-origin: left;
        }
        ::slotted(.animate-up) {
          transform: translateY(-120%);
        }
        ::slotted(.animate-down) {
          transform: translateY(120%);
        }
        ::slotted(.custom-selected) {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
          transition: transform ease-in 160ms, opacity ease-in 320ms;
          max-height: 100%;
          max-width: 100%;
        }
      </style>
      <!-- TODO: scale animation, ace doesn't resize that well ... -->
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.slotchange);
  }

  isEvenNumber(number) {
    return Boolean(number % 2 === 0)
  }

  /**
   * set animation class when slot changes
   */
  slotchange() {
    let call = 0;
    for (const child of this.slotted.assignedNodes()) {
      if (child && child.nodeType === 1) {
        child.style.zIndex = 99 - call;
        if (this.isEvenNumber(call++)) {
          child.classList.add('animate-down');
        } else {
          child.classList.add('animate-up');
        }
        this.dispatchEvent(new CustomEvent('child-change', {detail: child}));
      }
    }
  }
}customElements.define('custom-pages', CustomPages);

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

 const define = klass => {
   const name = hyphenate(klass.name);
   return shouldRegister(name) ? customElements.define(name, klass) : '';
 };

define(class CustomDivider extends HTMLElement {
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

var shell = customElements.define('app-shell', class AppShell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  
  get pages() {
    return this.querySelector('custom-pages')
  }
  
  get drawer() {
    return this.querySelector('custom-drawer')
  }
  
  set selected(value) {
    if (this._current !== value) {
      if (!this.previousSelected) this.previousSelected = 'home';
      // this.querySelector(`[data-route="${this.previousSelected}"]`).classList.add('hidden')
      // this.querySelector(`[data-route="${value}"]`).classList.remove('hidden')
      this.pages.select(value);
      this.previousSelected = value;
      
      this._current = value;
      
      if (value) {
        (async () => {
          await import(`./sections/${value}.js`);
        })();
      }    }
  }
  
  connectedCallback() {
    document.addEventListener('scroll', ({detail}) => {
      if (this.hasAttribute('opened')) this.removeAttribute('opened');
      if (detail > this.lastScrollTop) {
        this.setAttribute('scrolling', '');
        this.removeAttribute('sticky');
      } else this.setAttribute('sticky', '');
      
      if (detail <= 80) {
        this.removeAttribute('sticky');
        this.removeAttribute('scrolling');
      }
      
      this.lastScrollTop = detail;
    }, true);
    
    window.go = selected => {
      this.selected = 'games';
      window.location.hash = `!/games/${selected}`;
      this.querySelector('games-section').selected = selected;
    };
    const onhashchange = async () => {
      const parts = window.location.hash.split('/');
      const selected = parts[1];
      console.log(parts);
      console.log(decodeURI(parts[2]));
      if (parts[1] === 'appointment') {
        const url = 'https://m.facebook.com/services_vertical/book_appointment/?page_id=115867859850993&referrer=primary_cta&referrer_surface=page';
        open(url);
      }
      if (parts[1] === 'prices') {
        const url = 'https://www.facebook.com/115867859850993/photos/rpp.115867859850993/130761101695002/?type=3&theater';
        open(url);
      }
      if (parts[1]) {
        await import(`./sections/${parts[1]}.js`);
      }
      if (parts[2]) {
        console.log('into');
        const uri = decodeURI(parts[2]);
        // const has = await customElements.get('contact-section');
      // if (parts[1] === 'info') {
          // setTimeout(function () {
            this.pages.querySelector(`[data-route="${parts[1]}"]`).selected = uri;
            this.pages.querySelector(`[data-route="${parts[1]}"]`).selected = uri;
          // }, 5000);
      // }
        if (parts[1] === 'info') {
          if (uri === 'over ons') await import('./about-51c874c3.js');
          else if (uri === 'waarom VR') await import('./why-vr-bcf47fde.js');
          else if (uri === 'contact') await import('./contact-3eebe96a.js');  
         }// else if (parts[1] === 'events') {
        //   if (uri === 'verjaardagfeest') {
        //     await import(`./sections/events.js`)
        //     const el = this.shadowRoot.querySelector(`[data-route="events"]`).selected = uri
        //   } else if (uri === 'teambuilding') {
        //     await import(`./sections/events.js`)
        //     const el = this.shadowRoot.querySelector(`[data-route="events"]`).selected = uri
        //   } else if (uri === 'evenementen') {
        //     await import(`./sections/events.js`)
        //     const el = this.shadowRoot.querySelector(`[data-route="events"]`).selected = uri
        //   }
        // } else if (parts[1] === 'games') {          
        //   if (uri === 'VR Arcade') {
        //     // const el = this.shadowRoot.querySelector(`[data-route="events"]`).selected = uri
        //   } else if (uri === 'teambuilding') {
        //     await import(`./sections/events.js`)
        //     // const el = this.shadowRoot.querySelector(`[data-route="events"]`).selected = uri
        //   } else if (uri === 'evenementen') {
        //     await import(`./sections/events.js`)
        //     // const el = this.shadowRoot.querySelector(`[data-route="events"]`).selected = uri
        //   }
        // }
      } else {
        let hash;
        if (parts[1] === 'info') {
          hash = `!/info/contact`;
        }
        if (hash) window.location.hash = hash;
      }
      this.removeAttribute('sticky');
      this.removeAttribute('scrolling');
      this.selected = parts[1] || 'home';
    };
    window.onhashchange = onhashchange;
    onhashchange();
    const desktop = ({matches}) => {
      console.log(matches);
      };

      var x = window.matchMedia("(min-width: 1400px)");
      console.log(x);
      desktop(x);
      x.onchange = desktop;
      window.addEventListener('DOMContentLoaded', (event) => {
        setTimeout(() => {
          const link = document.createElement('link');
          link.setAttribute('rel', 'dns-prefetch');
          link.href = 'https://node0.preload.ipfs.io';
          document.head.appendChild(link);
          const script = document.createElement('script');
          script.setAttribute('prefetch', '');
          script.onload = async () => {
            window.api = await new LeofcoinApi();
            window.api.ready = true;
            // resolve latest website version
            let response = await fetch('https://next.thealtereddimension.com/api/dns?domain=thealtereddimension.com');
            response = await response.text();
            console.log(response);
            // get latest known website version
            await api.ipfs.get(response);
          };
          script.src = './lfc-api.js';
            document.head.appendChild(script);
        }, 5500);  
      });
    (async () => {
      await Promise.resolve().then(function () { return customSvgIconset$1; });
      await import('./custom-svg-icon-b3b9700f.js');
      
      this.querySelector('custom-drawer').addEventListener('click', () => {
        if (this.hasAttribute('opened')) this.removeAttribute('opened');
      });
      this.querySelector('custom-svg-icon[drawer-icon]').addEventListener('click', () => {
        if (this.hasAttribute('opened')) this.removeAttribute('opened');
        else this.setAttribute('opened', '');
      });
      
      import('./altered-footer-101b381a.js');
      
      
    })();
  }
  
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: row;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
      }
      ::slotted(custom-pages) {
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 54px;
        top: 128px;
        transition: width 120ms ease-in, transform 120ms ease-in;
        will-change: height, transform, transition, top, bottom;
        // transition: padding 120ms ease-in;
      }
      ::slotted(app-header) {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        transition: transform 120ms ease-in;
        padding: 12px;
        box-sizing: border-box;
      }
      ::slotted(custom-drawer) {
        opacity: 0;
        position: absolute;
        pointer-events: none !important;
        background: rgba(6, 63, 94, 0.25);
        transition: opacity 120ms ease-in, transform 120ms ease-in;
        z-index: 200 !important;
      }
      :host:not([opened]) ::slotted(custom-drawer) {
        opacity: 0 !important;
        left: 0;
        pointer-events: none !important;
      }
      :host([opened]) ::slotted(custom-drawer) {
        opacity: 1 !important;
        left: 0;
        pointer-events: auto !important;
        width: 100%;
      }
      :host([scrolling]) ::slotted(app-header) {
        transform: translateY(-105%)
      }
      :host([scrolling][sticky]) ::slotted(app-header) {
        position: fixed;
        transform: translateY(0)
      }
      :host([scrolling]) ::slotted(custom-pages) {
        height: calc(100% - 54px);
        transform: translateY(-128px);
      }
      @media(min-width: 1200px) {
        :host([opened]) ::slotted(custom-drawer) {
          width: 256px
        }
        :host([opened]) ::slotted(app-header) {
          position: absolute;
          right: 0;
          transform: translateX(256px);
          width: calc(100% - 256px);
        }
        :host([opened]) ::slotted(custom-pages) {          
          transform: translateX(256px);
          width: calc(100% - 256px);
        }
      }
      .column {
        display: flex;
        flex-direction: column;
      }
    </style>
    <slot name="drawer"></slot>
    <span class="column" style="overflow: hidden;">
      <slot name="header"></slot>
      <slot name="main"></slot>
    </span>
    <slot name="footer"></slot>
    
    `
  }
});

export default shell;
