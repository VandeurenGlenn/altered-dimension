import './../../node_modules/custom-tabs/custom-tabs.js';
import './../../node_modules/custom-tabs/src/custom-tab.js';
import './../../node_modules/custom-pages/src/custom-pages.js';
import games from './../data/games.js';
import './../game-eplorer.js';

export default customElements.define('games-section', class GamesSection extends HTMLElement {
  get explorer() {
    return this.shadowRoot.querySelector('game-explorer')
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  
  connectedCallback() {
    console.log(games);
    this.explorer.games = games
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        color: #eee;
        position: relative;
      }
      
      summary {
        padding-left: 24px; 
      }
      
      custom-pages {
        display: block;
      }
    </style>
    <game-explorer></game-explorer>
    
    <custom-pages>
      <section>
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/l_gWDl_f6V8?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </section>
    </custom-pages>
    `
  }
});