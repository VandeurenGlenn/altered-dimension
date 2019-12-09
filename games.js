import './altered-footer-28e738be.js';
import './custom-item-grid-a949881c.js';

var games = customElements.define('games-section', class GamesSection extends HTMLElement {
  get arcadeGrid() {
    return this.shadowRoot.querySelector('.arcade-grid')
  }
  get laserGrid() {
    return this.shadowRoot.querySelector('.laser-grid')
  }
  get escapeGrid() {
    return this.shadowRoot.querySelector('.escape-grid')
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
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
    
    this.setupGrid(this.arcadeGrid, arcades, 'games/vr-arcade');
    
  
    
    const lasers = [
      {
        title: 'Tower Tag',
        img: './tower-tag_thumb_360.jpg',
        route: 'tower-tag'
      },
      {
        title: 'Tower Tag',
        img: './tower-tag_thumb_360.jpg',
        route: 'tower-tag'
      }
    ];
        
    this.setupGrid(this.laserGrid, lasers, 'games/vr-laser');
    
    const escapes = [
      {
        title: 'Escape Room',
        img: './arizona-sunshine_thumb_360.jpg',
        route: 'tower-tag'
      },
      {
        title: 'Escape Room',
        img: './arizona-sunshine_thumb_360.jpg',
        route: 'tower-tag'
      }
    ];
    
    this.setupGrid(this.escapeGrid, escapes, 'games/vr-escape');
    
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
      <span class="column">
        <h1>VR. Arcade</h1>
        <p>Beleef een onvergetelijk avontuur in een van de virtuele werelden. Ga op pad en verken de mooiste of de meest gestoorde werelden</p>
      </span>
      <custom-item-grid class="arcade-grid">
      
      
      
      </custom-item-grid>
      
      <span class="column">
        <h1>VR. Laser Game</h1>
        <p>Stap met 4 spelers tegelijk  in de wereld van Tower Tag om een rondje laser schieten te spelen.</p>
      </span>
      <custom-item-grid class="laser-grid">
      
      </custom-item-grid>
      
      <span class="column">
        <h1>VR. Escape</h1>
        <p>Stap met 4 spelers tegelijk  in de wereld van Tower Tag om een rondje laser schieten te spelen.</p>
      </span>
      <custom-item-grid class="escape-grid">
      
      </custom-item-grid>
      <custom-space></custom-space>
      <altered-footer></altered-footer>
    </custom-container>
    `;
  }
});

export default games;
