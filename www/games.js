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
        return 'assignedNodes' in this.slotted ? this.slotted.assignedNodes() : this.children;
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
        this.selected = selected;
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
        switch (typeof this.selected) {
          case 'object':
            this._updateSelected(this.selected);
            break;
          case 'string':
            for (const child of this._assignedNodes) {
              if (child.nodeType === 1) {
                if (child.getAttribute(this.attrForSelected) === this.selected) {
                  return this._updateSelected(child);
                }
              }
            }
            if (this.currentSelected) {
              this.currentSelected.classList.remove('custom-selected');
            }
            break;
          default:
            // set selected by index
            const child = this._assignedNodes[this.selected];
            if (child && child.nodeType === 1) {
              this._updateSelected(child);
            // remove selected even when nothing found, better to return nothing
            } else if (this.currentSelected) {
              this.currentSelected.classList.remove('custom-selected');
            }
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
        const target = event.path[0];
        const attr = target.getAttribute(this.attrForSelected);
        if (target.localName !== this.localName) {
          this.selected = attr ? attr : target;
          this.dispatchEvent(new CustomEvent('selected', { detail: this.selected }));
        }
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
      return 'assignedNodes' in this.slotted ? this.slotted.assignedNodes() : this.children;
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
      this.selected = selected;
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
      switch (typeof this.selected) {
        case 'object':
          this._updateSelected(this.selected);
          break;
        case 'string':
          for (const child of this._assignedNodes) {
            if (child.nodeType === 1) {
              if (child.getAttribute(this.attrForSelected) === this.selected) {
                return this._updateSelected(child);
              }
            }
          }
          if (this.currentSelected) {
            this.currentSelected.classList.remove('custom-selected');
          }
          break;
        default:
          // set selected by index
          const child = this._assignedNodes[this.selected];
          if (child && child.nodeType === 1) {
            this._updateSelected(child);
          // remove selected even when nothing found, better to return nothing
          } else if (this.currentSelected) {
            this.currentSelected.classList.remove('custom-selected');
          }
      }
    }
  }
};

/**
 * @extends HTMLElement
 */
class CustomPages extends CustomSelect(HTMLElement) {
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

var games = {
  'vr arcade': [
    {
      title: 'Arizona Sunshine',
      subtitle: 'Zombies and Guns',
      multiplayer: true,
      singleplayer: true,
      pvp: false,
      description: `
      Sta midden in een zombie apocalyps in Arizona Sunshine Een spel exclusief ontwikkeld voor VR. Speel alleen of ga met 4 op pad naar de bewoonde wereld.`,
      iframe: 'https://www.youtube-nocookie.com/embed/l_gWDl_f6V8?controls=0'
    }, {
      title: 'Raw Data',
      subtitle: 'Skills, guns and robots',
      singleplayer: false,
      multiplayer: true,
      pvp: true,
      description: `
      Een kwantum computer gemaakt om alle informatie in de wereld te vergaren staat op punt om de wereld te veroveren. Kies 1 van de 4 avatars en steel de data al vecht tegen eindeloze killer robots. `,
      iframe: 'https://www.youtube-nocookie.com/embed/_R_lzYpDZmw?controls=0'
    }, {
      title: 'Super Hot',
      subtitle: 'Skills and guns',
      multiplayer: false,
      singleplayer: true,
      pvp: false,
      description: `
      Ga voor de High score van deze geweldige slomotion shooter.  Ontwijk, vang, gooi of schiet je weg door de kogels, scherven en brokstukken naar buiten.`,
      iframe: 'https://www.youtube-nocookie.com/embed/pzG7Wc6mbwE?controls=0'
    }
  ], 'vr escape': [
  ], 'vr laser': [
  ]
};

customElements.define('game-categories', class GameCategories extends CustomSelect(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
      }
    </style>
    
    <slot></slot>
    
    `
  }
});

customElements.define('game-explorer', class GameExplorer extends HTMLElement {
  get tabs() {
    return this.shadowRoot.querySelector('custom-tabs')
  }
  set games(value) {
    this.innerHTML = '';
    for (const [category, games] of Object.entries(value)) {
      console.log(category);
      const section = document.createElement('section');
      const tab = document.createElement('custom-tab');
      tab.innerHTML = `<p style="pointer-events: none;">${category}</p>`;
      tab.dataset.route = category;
      tab.setAttribute('tab', '');
      this.tabs.appendChild(tab);
      for (const game of games) {
        console.log(game);
        const el = document.createElement('game-explorer-item');
      }
    }
  }
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
      }
      slot {
        pointer-events: none;
      }
      custom-tab > * {
        pointer-events: none;
      }
    </style>
    <custom-tabs>
      <slot name="tab"></slot>
    </custom-tabs>
    <game-categories></game-categories>
    
    `
  }
});

var games$1 = customElements.define('games-section', class GamesSection extends HTMLElement {
  get explorer() {
    return this.shadowRoot.querySelector('game-explorer')
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  
  connectedCallback() {
    console.log(games);
    this.explorer.games = games;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        color: #eee;
        position: relative;
      }
      
      summary {
        padding-left: 24px; 
      }
      
      custom-pages {
        display: block;
      }
    </style>
    <game-explorer></game-explorer>
    
    <custom-pages>
      <section>
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/l_gWDl_f6V8?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </section>
    </custom-pages>
    `
  }
});

export default games$1;
