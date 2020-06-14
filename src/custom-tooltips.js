import Storage from 'lfc-'

export default customElements.define('custom-tooltips', class CustomTooltips extends HTMLElement {
  constructor() {
    super();
  }
  get template() {
    return `<style>
      :host {
        display: block;
      }
    </style>`
  }
});