
import events from './../data/events.js';
import './../custom-tabbed-explorer';
import ytApi from './../yt-iframe-api';

export default customElements.define('events-section', class EventsSection extends HTMLElement {
  get explorer() {
    return this.shadowRoot.querySelector('custom-tabbed-explorer')
  }
  
  set selected(value) {
    this.explorer.selected = value
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  
  connectedCallback() {
    console.log(events);
    (async () => {
      // await ytApi
      // requestAnimationFrame(() => {
        this.explorer.items = events
      // })
    })()
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