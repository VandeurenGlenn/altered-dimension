export default customElements.define('why-vr-section', class WhyVrSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
    * {
      box-sizing: border-box;
      margin: 0;
    }
    :host {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      color: #eee;
      align-items: center;
      justify-content: center;
    }
    
    summary {
      box-sizing: border-box;
      padding: 24px;
      max-width: 760px;
    }
    
    .container {
    max-width: 760px;
      padding: 24px;
      border-radius: 40px;
      background: rgba(6, 63, 94, 0.25);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    
    img {
      width: 100%;
      max-height: 440px;
      max-width: 760px;
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;   
      min-width: 320px;
      height: 100%;
      min-height: 320px;
    }
    @media(max-width: 480px) {
      .container {
        padding: 0;
      }
      img {        
        border-radius: 0;
      }
    }
    </style>
    <span class="container">
      <img loading="lazy" src="why-vr-480.jpg" alt="">
      <summary>
        <h2>Waarom kiezen voor Virtual Reality?</h2>
        <br>
        
        <p>
          Virual Reality staat voor plezier. De ervaring van het ontdekken van nieuwe dingen. Het gevoel van iets voor de eerste keer te beleven. Het laat het kind weer naar boven komen. 
        </p>
        <p>
          Door de wetenschap achter de technologie van VR. is een teambuilding activiteit ontzettend goed voor een bedrijfsuitje een feest of andere events. Het zorgd voor een verhoogd bewust zijn met gevolg voor menselijke interactie gedrag. Waardoor je een betere band krijgt met de mensen rond je. Het biedt de mogelijkheid om op een rustige manier iets aan te brengen wat anders veel lastiger is
        </p>
        <p>
          Het is geschikt om op een leuke manier te werken aan je teamwork skills je creativiteit te boosten en je communicatie skills aan te scherpen.
        </p>
      </summary>
      </span>
      `
  }
});