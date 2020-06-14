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