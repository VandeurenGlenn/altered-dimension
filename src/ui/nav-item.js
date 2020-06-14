export default customElements.define('app-nav-item', class AppNavItem extends HTMLElement {
  static get observedAttributes() {
    return ['href']
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  
  set href(value) {
    this.shadowRoot.querySelector('a').setAttribute('href', value)
  }
  
  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value
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