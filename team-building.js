import './altered-footer-28e738be.js';
import './custom-item-grid-a949881c.js';

var teamBuilding = customElements.define('team-building-section', class TeamBuildingSection extends HTMLElement {
  get gridVR() {
    return this.shadowRoot.querySelector('custom-item-grid.vr')
  }
  get gridVRFood() {
    return this.shadowRoot.querySelector('custom-item-grid.vr-food')
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  connectedCallback() {
    const vr = [
      {
        title: 'Short Game',
        alt: '€19.5 p.p.'
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
    this.setupGrid(this.gridVR, vr);
    
    const vrFood = [
      {
        title: 'Short Game',
        alt: '€29.5 p.p.'
      },
      {
        title: 'The Experience',
        alt: '€34.5 p.p.'
      }, 
      {
        title: 'Full Experience',
        alt: '€49 p.p.'
      }
    ];
    this.setupGrid(this.gridVRFood, vrFood);
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
        background: #FF6633;
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
    </style>  
    
    <custom-container>
    
      <span class="row center" style="padding-top: 24px;max-width:100%;">
        <custom-divider style="border-bottom: 5px solid #003366;" class="flex"></custom-divider>
        <h1 style="color: #003366;">teambuilding</h1>
        <custom-divider style="border-bottom: 5px solid #003366;" class="flex-2"></custom-divider>
      </span>
    
      <span class="column">
        <h3>(1 free drink p.p.)</h3>
        <custom-item-grid class="vr"></custom-item-grid>
      </span>
      
      <span class="column">
        <h3>(VR + Food&drinks *)</h3>
        <custom-item-grid class="vr-food"></custom-item-grid>
      </span>
      <small>Assortiment mini sandwiches + 2 drinks P.P.</small>
      <p>
      We have 4 zones: four people can play at the same time.
while the other players recharge,
you can watch your teammates on the screen in-game. 
Prepare for the next round!
      </p>
    <custom-space value="10%"></custom-space>
    <altered-footer style="max-width:100%;width:100%;"></altered-footer>
    </custom-container>
    `
  }
});

export default teamBuilding;
