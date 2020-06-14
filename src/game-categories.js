import CustomSelect from './../node_modules/custom-select-mixins/src/select-mixin.js';

export default customElements.define('game-categories', class GameCategories extends CustomSelect(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = this.template
  }
   
  connectedCallback() {
    super.connectedCallback()
    this.attrForSeclected = 'data-route';
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    </style>
    
    <slot></slot>
    
    `
  }
});