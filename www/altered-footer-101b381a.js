var alteredFooter = customElements.define('altered-footer', class AlteredFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'});

    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 100% !important;
        align-items: center;
        position: relative;
        left: 0;
        margin-top: 48px;
        padding-top: 48px;
      }
      a {
        color: #ddd;
        text-decoration: none;
      }
      .row {
        z-index: 100;
        display: flex;
        flex-direction: row;
      }
      .column {
        display: flex;
        flex-direction: column;
        padding: 12px;
        box-sizing: border-box;
      }
      @media (max-width: 960px) {
        .row.mobile {
          flex-flow: row wrap !important;
          justify-content: space-around !important;
        }
      }
      @media (max-width: 860px) {
        :host {
          flex-direction: column !important;
        }
      }
      .forhead {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background: #000;
        height: 54px;
        border-bottom-left-radius: 54px;
        border-bottom-right-radius: 54px;
      }
      .overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        
        background: rgba(6, 63, 94, 0.25)
      }
    </style>
    <span class="overlay"></span>
    <span class="forhead"></span>
    <span class="row mobile">
      <span class="column" style="min-width: 320px;align-items: center;">
        <h2 style="padding-top: 12px;">The Altered Dimension</h2>
        <img loading="lazy" src="https://static.wixstatic.com/media/faec45_ac60db39dbdc468db1ee2e607329bbc4~mv2.png" style="width: 296px;height: 296px;" alt="logo"></img>
        <a type="button" name="button" href="https://www.google.com/maps/dir//The+Altered+Dimension,+Koning+Albertstraat,+Diest/@50.9862361,4.9833825,12z/">routebeschrijving</a>
      </span>
      <span class="column">
        <!-- <summary>
          Dit zijn de walk-in uren. 
        </summary>
        <summary>Tijdens deze uren kan je met of zonder reservering komen spelen.</summary>
        <summary>Boekingen kunnen ook voor en na de Walk-in uren.</summary>
        <summary>Tower Tag en groepen groter dan 4 personen dienen altijd te reserveren.</summary> -->
        <span class="row mobile">
          <span class="column" style="width: 100%;">
            <h2>24/6 - 6/7</h2>
            <span class="column">
              <p>
                Wij zijn 24/6 - 6/7 open op reservering.
              </p>
              <p>Je kan voor elke dag reserveren behalve maandag.</p>
            </span>
          </span>
          <span class="column"  style="width: 100%;">
            <h2>Walk-In</h2>
            <span class="row">
              <span class="column">
                <p>Maandag</p>
                <p>Dinsdag</p>
                <p>Woensdag</p>
                <p>Donderdag</p>
                <p>Vrijdag</p>
                <p>Zaterdag</p>
                <p>Zondag</p>
              </span>
              <span class="column">
                <p>Gesloten</p>

                <p>16: 00 - 20: 00 </p>
                
                <p>12: 00 - 20: 00</p>
                
                <p>16: 00 - 20: 00</p>
                
                <p>15: 00 - 22: 00</p>
                
                <p>11: 00 - 22: 00</p>
                
                <p>11: 00 - 20: 00</p>

              </span>
            </span>
              
          </span>
        </span>
      </span>
    </span>
    `
  }
});

export default alteredFooter;
