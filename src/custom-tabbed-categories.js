import CustomSelect from './../node_modules/custom-select-mixins/src/select-mixin.js';

export default customElements.define('custom-tabbed-categories', class CustomTabbedCategories extends CustomSelect(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = this.template    
    this.attrForSeclected = 'data-route'
  }
   
  connectedCallback() {
    super.connectedCallback()
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