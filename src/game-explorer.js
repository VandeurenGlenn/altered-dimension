import './game-categories'
import './game-category'

export default customElements.define('game-explorer', class GameExplorer extends HTMLElement {
  get tabs() {
    return this.shadowRoot.querySelector('custom-tabs')
  }
  get categories() {
    return this.shadowRoot.querySelector('game-categories')
  }
  set games(value) {
    this._games = value
    this.renderGames()
  }
  
  set selected(value) {
    if (value) {
      this._selected = value
      // this.setAttribute('selected', value)
      this.tabs.select(value)
      this.categories.select(value)
    }
      console.log('select1');
  }
  
  get games() {
    return this._games
  }
  constructor() {
    super();
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = this.template
  }
  connectedCallback() {
    
    this.tabs.addEventListener('selected', ({detail}) => this.categories.select(detail))
    if (this.games) this.renderGames()
  }
  
  renderGames() {
    console.log('select');
    let i = 0;
    this.innerHTML = ''
    for (const [category, games] of Object.entries(this.games)) {
      const el = document.createElement('game-category')
      el.dataset.route = category
      
      el.style.zIndex = 99 - i;
      if (this.isEvenNumber(i)) {
        el.classList.add('animate-left');
      } else {
        el.classList.add('animate-right');
      }
      console.log(i);
      this.categories.appendChild(el)
      const tab = document.createElement('custom-tab')
      tab.innerHTML = `<p style="pointer-events: none;">${category}</p>`
      tab.dataset.route = category
      tab.setAttribute('tab', '')
      this.tabs.appendChild(tab)
      tab.style = 'pointer-events: auto;'
      el.games = games
      if (i === 0 && !this._selected) {
        this.selected = category
      } else {
        if (this.categories.querySelector(`[data-route="selected}"]`)) {
        this.selected = selected  
        }
        
      }
      i++
    }
  }
  isEvenNumber(number) {
    return Boolean(number % 2 === 0)
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        color: #eee;
      }
      slot {
        pointer-events: none;
      }
      custom-tab > * {
        pointer-events: none;
      }
      custom-tabs {        
        max-width: 720px;
        width: 100%;
      }
      game-categories {
        position: relative;
        width: 100%;
        height: 100%;
      }
      game-categories > * {
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: transform 120ms ease-out;
      }
      game-categories .custom-selected {
        opacity: 1;
        transform: translateX(0);
        transition: transform 120ms ease-in, opacity 120ms ease-in;
      }
      .animate-left {
        transform: translateX(-120%);
      }
      .animate-right {
        transform: translateX(120%);
      }
    </style>
    <custom-tabs attr-for-selected="data-route" selected="vr-arcade">
    </custom-tabs>
    <game-categories attr-for-selected="data-route">
    </game-categories>
    
    `
  }
});