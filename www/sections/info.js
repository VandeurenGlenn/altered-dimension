import './yt-iframe-efb9d794.js';
import './custom-tabbed-explorer-7dd15744.js';

var info = {
  contact: [{
    template: `
    <contact-section></contact-section>
    `
  }],
  'over ons': [{
    template: `<about-section></about-section>`
  }],
  'waarom VR': [{
    template: `<why-vr-section></why-vr-section>`
  }],
  
};

var info$1 = customElements.define('info-section', class InfoSection extends HTMLElement {
  get explorer() {
    return this.shadowRoot.querySelector('custom-tabbed-explorer')
  }
  
  set selected(value) {
    this.explorer.selected = value;
    this.explorer.selected = value;
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  
  connectedCallback() {
    console.log(info);
    (async () => {
      // requestAnimationFrame(() => {
        this.explorer.items = info;
      // })
    })();
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        color: #eee;
        height: 100%;
        width: 100%;
        justify-content: center;
      }
    </style>
    <custom-tabbed-explorer></custom-tabbed-explorer>
    `
  }
});

export default info$1;
