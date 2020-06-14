(function () {

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

  var SelectorMixin = base => {
    return class SelectorMixin extends SelectMixin(base) {

    static get properties() {
        return merge(super.properties, {
          selected: {
            value: 0,
            observer: '__selectedObserver__'
          },
          multi: {
            value: false,
            reflect: true
          }
        });
      }
      constructor() {
        super();
      }
      connectedCallback() {
        super.connectedCallback();
        this._onClick = this._onClick.bind(this);
        this.addEventListener('click', this._onClick);
      }
      disconnectedCallback() {
        this.removeEventListener('click', this._onClick);
      }
      _onClick(event) {
        const target = event.path ? event.path[0] : event.composedPath()[0];
        const attr = target.getAttribute(this.attrForSelected);
        let selected;

        if (target.localName !== this.localName) {
          selected = attr ? attr : target;
        } else {
          selected = attr;
        }
        if (this.multi) {
          if (!Array.isArray(this.selected)) this.selected = [];
          const index = this.selected.indexOf(selected);
          if (index === -1) this.selected.push(selected);
          else this.selected.splice(index, 1);
          // trigger observer
          this.select(this.selected);

        } else this.selected = selected;

        this.dispatchEvent(new CustomEvent('selected', { detail: selected }));
      }
    }
  };

  customElements.define('custom-tabs', class CustomTabs extends SelectorMixin(HTMLElement) {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = this.template;
    }
    // TODO: make scrollable
    get template() {
      return `
      <style>
        :host {
          display: flex;
          flex-direction: row;
          /*align-items: flex-end;*/
          height: var(--custom-tabs-height, 48px);
        }
      </style>
      <slot></slot>
    `;
    }
  });

}());

customElements.define('custom-tab', class CustomTab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
    this._onMouseIn = this._onMouseIn.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
  }

  connectedCallback() {
    this.addEventListener('mouseover', this._onMouseIn);
    this.addEventListener('mouseout', this._onMouseOut);
  }

  disconnected() {
    this.removeEventListener('mouseover', this._onMouseIn);
    this.removeEventListener('mouseout', this._onMouseOut);
  }

  _onMouseIn() {
    this.classList.add('over');
  }

  _onMouseOut() {
    this.classList.remove('over');
  }

  get template() {
    return `
    <style>
      :host {
        position: relative;
        display: inline-flex;
        width: 148px;
        height: 48px;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        box-sizing: border-box;
        cursor: pointer;
        
        --tab-underline-color:  #00B8D4;
      }

      :host(.custom-selected) {
        border-bottom: 2px solid var(--tab-underline-color);
      }
      
      ::slotted(*) {
        pointer-events: none;
      }
    </style>
    <slot></slot>
    `;
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

var CustomSelect = base => {
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

var CustomSelector = base => {
  return class SelectorMixin extends CustomSelect(base) {

  static get properties() {
      return merge(super.properties, {
        selected: {
          value: 0,
          observer: '__selectedObserver__'
        },
        multi: {
          value: false,
          reflect: true
        }
      });
    }
    constructor() {
      super();
    }
    connectedCallback() {
      super.connectedCallback();
      this._onClick = this._onClick.bind(this);
      this.addEventListener('click', this._onClick);
    }
    disconnectedCallback() {
      this.removeEventListener('click', this._onClick);
    }
    _onClick(event) {
      const target = event.path ? event.path[0] : event.composedPath()[0];
      const attr = target.getAttribute(this.attrForSelected);
      let selected;

      if (target.localName !== this.localName) {
        selected = attr ? attr : target;
      } else {
        selected = attr;
      }
      if (this.multi) {
        if (!Array.isArray(this.selected)) this.selected = [];
        const index = this.selected.indexOf(selected);
        if (index === -1) this.selected.push(selected);
        else this.selected.splice(index, 1);
        // trigger observer
        this.select(this.selected);

      } else this.selected = selected;

      this.dispatchEvent(new CustomEvent('selected', { detail: selected }));
    }
  }
};

customElements.define('yt-iframe', class YtIframe extends HTMLElement {
  static get observedAttributes() {
    return ['src']
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  
  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value;
  }
  
  get _player() {
    return this.shadowRoot.querySelector('#player')
  }
  
  set src(value) {
    this._player.src = `https://www.youtube-nocookie.com/embed/${value}?controls=0&enablejsapi=1&origin=https://next.thealtereddimension.com&widget_referrer=https://next.thealtereddimension.com`;
    // this.player = new YT.Player(this._player, {
    //   height: '100%',
    //   width: '100%',
    //   playerVars: {
    //     origin: 'https://next.thealtereddimension.com',
    //     widget_referrer: 'https://next.thealtereddimension.com',
    //     autoplay: false,
    //     controls: false,
    //     fs: 0,
    //     modestbranding: 1,
    //     showinfo: 0,
    //     enablejsapi: true
    //   }
    // });
  }
  get template() {
    return `<style>
      :host {
        display: block;
        width: var(--iframe-width, 100%);
        height: var(--iframe-height, 100%);
      }
      
      #player {
        width: var(--iframe-width, 100%);
        height: var(--iframe-height, 100%);
        border: none;
      }
    </style>
    
    <iframe id="player" frameborder="0"></iframe>
    
    `
  }
});

export { CustomSelect as C, CustomSelector as a };
