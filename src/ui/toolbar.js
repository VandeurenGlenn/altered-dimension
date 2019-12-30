export default customElements.define('app-toolbar', class AppToolbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
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