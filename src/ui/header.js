export default customElements.define('app-header', class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
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