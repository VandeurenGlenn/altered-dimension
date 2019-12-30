export default customElements.define('app-logo', class AppLogo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
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