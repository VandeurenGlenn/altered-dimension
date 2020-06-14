import CustomSelector from './../node_modules/custom-select-mixins/src/selector-mixin.js';
import './ui/yt-iframe';

customElements.define('game-category-item', class GameCategoryItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'})
  }
  set value(value) {
    this._value = value
    this.render()
  }
  get value() {
    return this._value
  }
  render() {
    this.shadowRoot.innerHTML = this.template
  }
  get template() {
    return `${this.value ? `<style>
      :host {
        display: block;
        flex-direction: row;
        padding: 24px 8px;
        box-sizing: border-box;
        height: 100%;
        position: relative;
        --iframe-height: 240px;
        // min-height: 320px;
        // max-height: 560px;
        max-width: 720px;
        width: 100%;
      }
      iframe-video, video {
        border: none;
        // max-width: 320px;
      }
      .column {
        display: flex;
        flex-direction: column;
        max-width: 480px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 6px;
        height: 100%;
      }
      
      summary {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      
      
      @media (max-width:720px) {
        .column {
          padding: 0 12px 0 12px;
        }
        :host {
          padding-top: 0;
          flex-direction: column;
          min-height: auto;
          max-height: auto;
          --iframe-height: 280px;
          --iframe-width: 100%;
        }
      }
    </style>
    
    ${this.value.iframe ? `<yt-iframe loading="lazy" controls="0" src="${this.value.iframe}"></yt-iframe>` : ''}
    ${this.value.video ? `<video loading="lazy" controls="0" src="${this.value.video}"></video>` : ''}
    
    <span class="column">
      <h2>${this.value.title}</h2>
      
      <summary>${this.value.description}</summary>
    </span>
    
    ` : ''}`
  }
});

export default customElements.define('game-category', class GameCategory extends CustomSelector(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = this.template
  }
  
  set games(games) {
    for (const game of games) {
      const el = document.createElement('game-category-item')
      el.value = game
      this.appendChild(el)
    }
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        overflow: auto;
        width: 100%;
        align-items: center;
      }
    </style>
    
    <slot></slot>
    
    `
  }
});