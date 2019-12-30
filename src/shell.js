import './ui/header';
import './ui/toolbar';
import './ui/logo';
import './ui/navigation';
import './ui/nav-item';
import './../node_modules/@vandeurenglenn/custom-container/custom-container'
import './../node_modules/custom-svg-iconset/src/custom-svg-iconset.js'


export default customElements.define('app-shell', class AppShell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  
  set selected(value) {
    if (this._current !== value) {
      if (!this.previousSelected) this.previousSelected = 'home';
      this.querySelector(`[data-route="${this.previousSelected}"]`).classList.add('hidden')
      this.querySelector(`[data-route="${value}"]`).classList.remove('hidden')
      this.previousSelected = value
      
      this._current = value;
      
      (async () => {
        await import(`./${value}.js`)
      })();
    }
  }
  
  connectedCallback() {
    const onhashchange = () => {
      const parts = window.location.hash.split('/');
      this.selected = parts[1]
    }
    window.onhashchange = onhashchange;
    onhashchange();
    
    (async () => {
      await import('./../node_modules/custom-svg-iconset/src/custom-svg-iconset.js')
      await import('./../node_modules/custom-svg-icon/src/custom-svg-icon.js')
      
      this.querySelector('app-navigation').addEventListener('mouseup', () => {
        const nav = this.querySelector('app-navigation')
        if (nav.hasAttribute('opened')) nav.removeAttribute('opened')
      })
      this.querySelector('custom-svg-icon[drawer-icon]').addEventListener('mouseup', () => {
        const nav = this.querySelector('app-navigation')
        if (nav.hasAttribute('opened')) nav.removeAttribute('opened')
        else nav.setAttribute('opened', '')
      })
    })()
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