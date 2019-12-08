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
        overflow: scroll;
      }
      
      custom-container > * {
        max-width: 1200px;
      }
      summary-panel {
        min-height: auto;
      }
      .game {
        position: relative;
        align-items: center;
        box-sizing: border-box;
        display: flex;
        width: 33%;
        flex-direction: column;
        // padding: 6px;
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
        .game {
          width: 50%;
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
      .game-container {
        width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
      }
      .game img {
        width: 100%;
    max-width: 100%;
      }
      .game .title {
        position: absolute;
        top: 0;
        left: 6px;
        right: 0;
        background: rgba(0, 0, 0, 0.52);
        padding: 6px;
        box-sizing: border-box;
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
        <span class="game-container">
          <span class="game">
            <h2 class="title">Arizona Sunshine</h2>
            <img src="arizona-sunshine_thumb_360.jpg"></img>
          </span>
          <span class="game">
          <h2 class="title">Arizona Sunshine</h2>
            <img src="arizona-sunshine_thumb_360.jpg"></img>
          </span>
          <span class="game">
            <h2 class="title">Arizona Sunshine</h2>
            <img src="arizona-sunshine_thumb_360.jpg"></img>
          </span>
        </span>
      </span>
    </custom-container>
    `;
  }
});

export default vrArcade;
