var towerTag = customElements.define('tower-tag-section', class TowerTagSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
      .img {
        height: 50%;
      }
      h1 {
        padding-top: 8px;
        margin: 0;
        width: 100%;
        box-sizing: border-box;
      }
      span {
        overflow-y: auto;
        box-sizing: border-box;
        background: #000000d1;
      }
      @media (max-width: 960px) {
        span {
          width: 100%;
        }
      }
      @media (max-width: 640px) {
        
        h1 {
          padding-left: 16px;
        }
        span {
          padding: 0 16px;
        }
      }
      .img {
        max-height: 364px;
      }
    </style>
    <custom-container>
    <img src="tower-tag.png" class="img"></img>
    <h1>Tower Tag</h1>
    <span>
    <p>Tower Tag is een Virtual Reality Laser game dat gespeeld word rond een obelisk.</p>
    <p>De obilisk staat in het spel en in de echte wereld.</p>
    <p>Slingerend boven een stad
ga je van obelisk naar obelisk, de obilisk bied bescherming in game en een veilig
gevoel uit game.</p>

<p>Tower Tag word herkend als E sport en er worden regelamatig wedstrijden georganiseerd.</p>

<p>Kom je de wereld van Tower Tag domineren?
 </p>
    </span>
    </custom-container>`
  }
});

export default towerTag;
