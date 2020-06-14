export default customElements.define('custom-marked', class CustomMarked extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
  }
  
  set markdown(value) {
    this.shadowRoot.innerHTML = `${this._style} ${value}`;
    console.log(this.renderer);
  }
  
  connectedCallback() {
    (async () => {
      // await import('../bower_components/prism/prism.js'),
      await import('./../node_modules/markdown-it/dist/markdown-it.min.js')
      this._md = new markdownit({html: true})
      this.markdown = this._md.render(this.innerHTML, {html: true});
    })();    
  }
  get _style() {
    return `<style>
      :host {
        display: flex;
        width: 100%;
        flex-direction: column;
      }
    </style>`
  }
});