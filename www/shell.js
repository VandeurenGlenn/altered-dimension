import './custom-svg-iconset-01f346e8.js';

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
        background: #031c2a;
        height: 36px;
        min-height: 36px;
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
        min-height: 36px;
        font-size: 22px;
        font-weight: 800;
        text-transform: capitalize;
        align-items: center;
        justify-content: center;
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

var shell = customElements.define('app-shell', class AppShell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  
  set selected(value) {
    if (this._current !== value) {
      if (!this.previousSelected) this.previousSelected = 'home';
      this.querySelector(`[data-route="${this.previousSelected}"]`).classList.add('hidden');
      this.querySelector(`[data-route="${value}"]`).classList.remove('hidden');
      this.previousSelected = value;
      
      this._current = value;
      
      (async () => {
        await import(`./${value}.js`);
      })();
    }
  }
  
  connectedCallback() {
    const onhashchange = () => {
      const parts = window.location.hash.split('/');
      this.selected = parts[1];
    };
    window.onhashchange = onhashchange;
    onhashchange();
    
    (async () => {
      await import('./custom-svg-iconset-01f346e8.js');
      await import('./custom-svg-icon-b3b9700f.js');
      
      this.querySelector('app-navigation').addEventListener('mouseup', () => {
        const nav = this.querySelector('app-navigation');
        if (nav.hasAttribute('opened')) nav.removeAttribute('opened');
      });
      this.querySelector('custom-svg-icon[drawer-icon]').addEventListener('mouseup', () => {
        const nav = this.querySelector('app-navigation');
        if (nav.hasAttribute('opened')) nav.removeAttribute('opened');
        else nav.setAttribute('opened', '');
      });
    })();
  }
  
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }
      custom-container ::slotted(*) {
        max-width: 960px !important;
      }
    </style>
    <custom-container>
      <slot></slot>
    </custom-container>
    
    <slot name="footer"></slot>
    
    `
  }
});

export default shell;
