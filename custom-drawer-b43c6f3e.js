var customDrawer = customElements.define('custom-drawer', class CustomDrawer extends HTMLElement {
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
        width: var(--custom-drawer-width, 256px);
        height: auto;
        background: var(--custom-drawer-background, #FFF);
        background-blend-mode: hue;
        color: var(--custom-drawer-color, #333);
        opacity: 0;
        box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.14);
      }
      ::slotted([slot="header"]) {
        display: block;
        box-sizing: border-box;
        min-height: 48px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.14);
        color: var(--custom-header-color, #FFF);
        background: var(--custom-header-background, #EEE);
      }
      ::slotted([slot="footer"]) {
        display: block;
        box-sizing: border-box;
        min-height: 48px;
        border-top: 1px solid rgba(0, 0, 0, 0.14);
      }
      ::slotted([slot="content"]) {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    </style>
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>`;
  }

});

export default customDrawer;
