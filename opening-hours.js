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
      }
      .column {
        display: flex;
        flex-direction: column;
      }
      .row {
        display: flex;
      }
      .flex {
        flex: 1;
      }
    </style>
    <custom-container>
    <h1>openingstijden</h1>
    <p>Onze walk-in uren zijn de uren waar je vrije toegang 
krijgt tot The Altered Dimension.</p>

<p>Teambuilding, verjaardagsfeestjes en groepen
 zijn welkom voor en tijdens de walk-in uren.
Maar wel enkel op reservatie.</p>
    
    
    <span class="row" style="width:100%;max-width: 640px;">
      <h2>Walk In</h2>
      <span class="flex"></span>
      <span>-</span>
      <span class="flex"></span>
      
    </span>
    <span class="column" style="width: 100%;">
      <span class="row" style="width: 100%;">
        <h4>maandag</h4>
        <span class="flex"></span>
        <h4>gesloten</h4>
      </span>
      
      <span class="row" style="width: 100%;">
        <h4>dinsdag</h4>
        <span class="flex"></span>
        <h4>16:00 - 20:00</h4>
      </span>
    </span>

<span class="flex"></span>

  <span class="column">
  <p>
  
16:00 tot 20:00
  </p>
    <p>
12:00 tot 20:00
  </p>  <p>
16:00 tot 20:00 
  </p>  <p>
15:00 tot 00:00
  </p>  <p>
11:00 tot 00:00
</p>  <p>
11:00 tot 22:00
</p>
</span>

    </span>
    </custom-container>
    `
  }
});

export default openingHours;
