import './altered-footer-28e738be.js';
import './custom-item-grid-a949881c.js';

var price = customElements.define('price-section', class PriceSection extends HTMLElement {
  get grid() {
    return this.shadowRoot.querySelector('custom-item-grid.grid')
  }
  get gridFour() {
    return this.shadowRoot.querySelector('custom-item-grid.four')
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  connectedCallback() {
    const grid = [
      {
        title: 'Short Game',
        alt: '€16 p.p.'
      },
      {
        title: 'The Experience',
        alt: '€27.5 p.p.'
      }, 
      {
        title: 'Full Experience',
        alt: '€42 p.p.'
      }
    ];
    this.setupGrid(this.grid, grid);
    
    const four = [
      {
        title: 'Short Game',
        alt: '€13.5 p.p.'
      },
      {
        title: 'The Experience',
        alt: '€24.5 p.p.'
      }, 
      {
        title: 'Full Experience',
        alt: '€39 p.p.'
      }
    ];
    this.setupGrid(this.gridFour, four);
  }
  
  setupGrid(grid, items, info) {
    for (const item of items) {
      const el = document.createElement('custom-grid-item');
      if (info) {
        el.dataset.route = item.route;
        el.dataset.routeInfo = info;
      }      
      el.innerHTML = `
      <span slot="title">
        <h3>${item.title}</h3>
        <h3>${item.alt}</h3>
      </span>
      <!-- <img slot="img" alt="${item.alt}"></img> -->
      `;
      grid.appendChild(el);
    }
  }
  get template() { 
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        background: #000;
        box-sizing: border-box;
      }
      .column {
        display: flex;
        flex-direction: column;
      }
      .row {
        width: 100%;
        display: flex;
      }
      .center {
        align-items: center;
      }
      .flex {
        flex: 1;
      }
      .flex-2 {
        flex: 2;
      }
      custom-container {        
        overflow-y: auto;
      }
      custom-container > * {
        // max-width: 480px;
      }
      .hours {
        padding-top: 48px;
        max-width: 320px;
      }
      h1, h2, h3, h4, p {
        margin: 0;
        padding: 8px;
        text-transform: uppercase;
      }
      p {
        text-align: center;
      }
      .column {
        height: -webkit-fill-available;
width: 100%;
      }
      custom-grid-item {
        background: #ffffff52;
        height: 90px;
      }
    </style>  
    
    <custom-container>
    
      <span class="row center" style="padding-top: 24px;max-width:100%;">
        <custom-divider style="border-bottom: 5px solid #fff;" class="flex"></custom-divider>
        <h1>prijzen</h1>
        <custom-divider style="border-bottom: 5px solid #fff;" class="flex-2"></custom-divider>
      </span>
    
      <span class="column">
        <h3>(1 -3 players)</h3>
        <custom-item-grid class="grid"></custom-item-grid>
      </span>
      
      <span class="column">
        <h3>(4 players)</h3>
        <custom-item-grid class="four"></custom-item-grid>
      </span>
      
    <custom-space value="10%"></custom-space>
    <altered-footer style="max-width:100%;width:100%;"></altered-footer>
    </custom-container>
    `
  }
});

export default price;
