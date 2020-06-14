export default customElements.define('book-section', class BookSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    
    this.innerHTML = this.template
  }
  get template() {
    return `<style>
      :host {
        display: block;
      }
    </style>`
  }
});