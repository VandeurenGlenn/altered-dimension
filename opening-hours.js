var openingHours = customElements.define('opening-hours-section', class OpeningHoursSection extends HTMLElement {
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
        background: #003366;
        box-sizing: border-box;
        padding-top: 64px;
        --custom-space: 8%;
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
        max-width: 480px;
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
    </style>  
    
    <custom-container>
    
    <span class="row center" style="padding-top: 24px;max-width:100%;">
      <custom-divider style="border-bottom: 5px solid #FF6633;" class="flex"></custom-divider>
      <h1 style="color: #FF6633;">openingstijden</h1>
      <custom-divider style="border-bottom: 5px solid #FF6633;" class="flex-2"></custom-divider>
    </span>
    <br>
    <p>Onze walk-in uren zijn de uren waar je vrije toegang 
krijgt tot The Altered Dimension.</p>
<br>
<p>Teambuilding, verjaardagsfeestjes en groepen
 zijn welkom voor en tijdens de walk-in uren.
 </p>
<p>Enkel op reservatie.</p>
    

<span class="column hours" style="width: 100%;">
    <span class="row center" style="color: #FF6633;">
      <h3>Walk - In</h3>
      <span class="flex"></span>
      <span>-</span>
      <span class="flex"></span>
      <h3>vrije toegang</h3>
    </span>
    <custom-divider style="border-bottom: 5px solid #FF6633;"></custom-divider>
      <span class="row" style="width: 100%;color: #3366CC;">
        <h4>maandag</h4>
        <span class="flex"></span>
        <h4>gesloten</h4>
      </span>
      
      <span class="row" style="width: 100%;">
        <h4>dinsdag</h4>
        <span class="flex"></span>
        <h4>16:00 - 20:00</h4>
      </span>
      
      <span class="row" style="width: 100%;">
        <h4>woensdag</h4>
        <span class="flex"></span>
        <h4>12:00 - 20:00</h4>
      </span>
      
      <span class="row" style="width: 100%;">
        <h4>donderdag</h4>
        <span class="flex"></span>
        <h4>16:00 - 20:00</h4>
      </span>
      
      <span class="row" style="width: 100%;">
        <h4>vrijdag</h4>
        <span class="flex"></span>
        <h4>15:00 - 00:00</h4>
      </span>
      
      <span class="row" style="width: 100%;">
        <h4>zaterdag</h4>
        <span class="flex"></span>
        <h4>11:00 - 00:00</h4>
      </span>
      
      <span class="row" style="width: 100%;">
        <h4>zondag</h4>
        <span class="flex"></span>
        <h4>11:00 - 22:00</h4>
      </span>
    </span>

    </span>
    <custom-space space="8%"></custom-space>
    <altered-footer style="max-width:100%;width:100%;"></altered-footer>
    </custom-container>
    `
  }
});

export default openingHours;
