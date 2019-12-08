var vrLaser = customElements.define('vr-laser-section', class VrLaserSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get grid() {
    return this.shadowRoot.querySelector('custom-item-grid')
  }
  connectedCallback() {
    const lasers = [
      {
        title: 'Tower Tag',
        img: 'tower-tag_thumb_360.jpg',
        route: 'tower-tag'
      },
      {
        title: 'Tower Tag',
        img: 'tower-tag_thumb_360.jpg',
        route: 'tower-tag'
      }
    ];
    
    this.setupGrid(this.grid, lasers, 'games/vr-laser');
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
        <img src="tower-tag.png" slot="left"></img>
        <span class="column" slot="right">
        <h1>VR Laser</h1>
          <p>In het arcade deel van ons assortiment team je up met je vrienden/collega's/family of eender wie.</p>
        </span>
      </summary-panel>
      
      <span class="games">
        <custom-item-grid>
          <custom-grid-item data-route="tower-tag" data-route-info="games/vr-laser">
            <h2 slot="title">Tower Tag</h2>
            <img slot="img" src="tower-tag_thumb_360.jpg"></img>
          </custom-grid-item>
          <custom-grid-item data-route="tower-tag" data-route-info="games/vr-laser">
          <h2 slot="title">Tower Tag</h2>
            <img slot="img" src="tower-tag_thumb_360.jpg"></img>
          </custom-grid-item>
          <custom-grid-item data-route="tower-tag" data-route-info="games/vr-laser">
            <h2 slot="title">Tower Tag</h2>
            <img slot="img" src="tower-tag_thumb_360.jpg"></img>
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

export default vrLaser;
