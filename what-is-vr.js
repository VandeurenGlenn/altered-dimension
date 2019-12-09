import './altered-footer-28e738be.js';
import './custom-item-grid-a949881c.js';

var whatIsVr = customElements.define('what-is-vr-section', class WhatIsVRSection extends HTMLElement {
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
      
      h1, h2, h3, h4, p {
        margin: 0;
        padding: 8px;
        text-transform: uppercase;
      }
    </style>  
    
    <custom-container>
    
      <span class="row center" style="padding-top: 24px;max-width:100%;">
        <custom-divider style="border-bottom: 5px solid #FF6633;" class="flex"></custom-divider>
        <h1 style="color: #FF6633;">Wat Is VR?</h1>
        <custom-divider style="border-bottom: 5px solid #FF6633;" class="flex-2"></custom-divider>
      </span>
      <br>
      <br>
      <br>
      
      <br>
      <br>
      <br>
      <p>
        VIrtual Reality staat voor plezier. De ervaring van het ontdekken van nieuwe dingen.
        Het gevoel van iets voor de eerste keer te beleven. Het laat het kind weer naar boven
        komen.Om iedereen een zo goed mogelijke experience op te laten kunnen doen kan je Bij
        ons terecht tot maximaal 12 personen voor een groepsuitje. Je kan met 4 personen 
        toegang krijgen tot dezelfde Virtuele wereld
      </p>

      <p style="color: #FF6633;">
        Door de wetenschap achter de Technologie van VR is een Teambuilding activiteit 
        ontzettend goed voor een bedrijfsuitje of een feestje. Het zorgd voor een verhoogd 
        bewustzijn met gevolg voor menselijk interactie gedrag. Waardoor je een betere band 
        krijgt met de mensen rond je. Het biedt de mogelijkheid om op een rustige manier iets
        aan te brengen wat anders veel lastiger is.
      </p>

      <p>
        Het is geschikt om op een leuke manier te werken aan je teamwork skills je creativiteit 
        te boosten en je communicatie skills aan te scherpen.
      </p>
      
      <br>
      <br>
      <br>
      <custom-space value="10%"></custom-space>
      <altered-footer style="max-width:100%;width:100%;"></altered-footer>
    </custom-container>
    `
  }
});

export default whatIsVr;
