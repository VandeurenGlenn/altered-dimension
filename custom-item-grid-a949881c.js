customElements.define('custom-grid-item', class CustomGridItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;    
  }
  get template() {
    return `<style>
      :host {
        position: relative;
        align-items: center;
        box-sizing: border-box;
        display: flex;
        width: 33%;
        flex-direction: column;
        padding: 3px;
      }
      [name="img"]::slotted([slot="img"]) {
        width: 100%;
        max-width: 100% !important;
        pointer-events: none;
      }
      [name="title"]::slotted(*) {
        position: absolute;
        top: 0;
        left: 3px;
        right: 0;
        background: rgba(0, 0, 0, 0.52);
        padding: 6px;
        box-sizing: border-box;
        pointer-events: none;
      }
      @media (max-width: 1200px) {
        :host {
          width: 50%;
        }
      }
    </style>
    <slot id="title" name="title"></slot>
    <slot name="img"></slot>
    `
  }
});

customElements.define('custom-item-grid', class CustomItemGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;    
  }
  connectedCallback() {
    this.addEventListener('click', event => {
      const {route, info} = event.srcElement.dataset;
      if (route) {
        go(route, info);
      }
    });
  }
  get template() {
    return `<style>
      :host {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        max-width: 1200px;
        box-sizing: border-box;
        padding: 12px 0;
      }
    </style>
    <slot></slot>
    `
  }
});
