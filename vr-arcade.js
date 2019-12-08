import './altered-footer-8cf33f48.js';
import './custom-item-grid-a949881c.js';

customElements.define('summary-panel', class SummaryPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }

  get template() {
    return `
<style>
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 400px;
    max-width: 1200px;
  }
  ::slotted([slot="left"]) {
    padding-bottom: 24px;
  }
  @media(min-width: 1200px) {
    :host {
      flex-direction: row;
      width: 80%;
    }
    ::slotted([slot="left"]) {
      padding-right: 24px;
      padding-bottom: 0;
    }
  }
</style>
<slot name="left"></slot>
<slot name="right"></slot>
    `;
  }
});

var vrArcade = customElements.define('vr-arcade-section', class VrArcadeSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get grid() {
    return this.shadowRoot.querySelector('custom-item-grid')
  }
  connectedCallback() {
    const arcades = [
      {
        title: 'Arizona Sunshine',
        img: './arizona-sunshine_thumb_360.jpg',
        route: 'arizona-sunshine'
      },
      {
        title: 'Arizona Sunshine',
        img: './arizona-sunshine_thumb_360.jpg',
        route: 'arizona-sunshine'
      }
    ];
    
    this.setupGrid(this.grid, arcades, 'games/vr-arcade');
  }
  setupGrid(grid, items, info) {
    for (const item of items) {
      const el = document.createElement('custom-grid-item');
      el.dataset.route = item.route;
      el.dataset.routeInfo = info;
      el.innerHTML = `
      <h2 slot="title">${item.title}</h2>
      <img slot="img" src="${item.img}"></img>
      `;
      grid.appendChild(el);
    }
  }
  get template() {
    return `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
          overflow: hidden;
      }
      h1 {
        padding-top: 8px;
        margin: 0;
        width: 100%;
        box-sizing: border-box;
      }
      .column {
        display: flex;
        flex-direction: column;
      }
      span {
        width: 100%;
        box-sizing: border-box;
        background: #000000d1;
      }
      img {
        max-height: 364px;
        max-width: 60%;
      }
      .games {
        height: 100%;
        width: 100%;
        max-width: 1200px;
        padding: 12px 0;
      }
      
      custom-container {
        overflow-y: scroll;
      }
      
      custom-container > * {
        max-width: 1200px;
      }
      summary-panel {
        min-height: auto;
      }
      @media (max-width: 1200px) {
        img {
          max-width: 100%;
          max-height: 100%;
        }
        span {
          padding: 8px 16px;
        }
        summary-panel {
          width: 100%;
        }
        .games {
          padding: 16px;
        }
      }
      @media (max-width: 960px) {
        span {
          width: 100%;
        }
      }
      @media (max-width: 640px) {
        span {
          padding: 8px 16px;
        }
        // img {
        //   height: 30%;
        // }
        summary {
          flex-direction: column;
        }
      }
      altered-footer {
        box-sizing: border-box;
        max-width: 100% !important;
        width: 100%;
      }
    </style>
    <custom-container>
      
      <summary-panel>
        <img src="vr.png" slot="left"></img>
        <span class="column" slot="right">
        <h1>VR Arcade</h1>
          <p>In het arcade deel van ons assortiment kan je spelletjes spelen voor jong en oud.</p>
          <p>Gaande van Beat saber, klimmen op snoep, zombies schieten,... voor ieder wat wils</p>
        </span>
      </summary-panel>
      
      <span class="games">
        <custom-item-grid>
          <custom-grid-item>
            <h2 slot="title">Arizona Sunshine</h2>
            <img slot="img" src="./arizona-sunshine_thumb_360.jpg"></img>
          </custom-grid-item>
          <custom-grid-item>
          <h2 slot="title">Arizona Sunshine</h2>
            <img slot="img" src="./arizona-sunshine_thumb_360.jpg"></img>
          </custom-grid-item>
          <custom-grid-item>
            <h2 slot="title">Arizona Sunshine</h2>
            <img slot="img" src="./arizona-sunshine_thumb_360.jpg"></img>
          </custom-grid-item>
          <custom-grid-item>
            <h2 slot="title">More Comming Soon</h2>
          </custom-grid-item>
        </custom-item-grid>
      </span>
      <custom-space></custom-space>
      <altered-footer></altered-footer>
    </custom-container>
    `;
  }
});

export default vrArcade;
