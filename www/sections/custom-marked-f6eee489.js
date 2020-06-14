var customMarked = customElements.define('custom-marked', class CustomMarked extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
  
  set markdown(value) {
    this.shadowRoot.innerHTML = `${this._style} ${value}`;
    console.log(this.renderer);
  }
  
  connectedCallback() {
    (async () => {
      // await import('../bower_components/prism/prism.js'),
      await import('./markdown-it.min-27176a90.js');
      this._md = new markdownit({html: true});
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

export default customMarked;
