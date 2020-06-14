export default customElements.define('app-navigation', class AppNavigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
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