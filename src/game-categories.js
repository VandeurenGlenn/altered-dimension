import CustomSelect from './../node_modules/custom-select-mixins/src/select-mixin.js';

export default customElements.define('game-categories', class GameCategories extends CustomSelect(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = this.template
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
      }
    </style>
    
    <slot></slot>
    
    `
  }
});