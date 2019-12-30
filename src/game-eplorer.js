import './game-categories'

export default customElements.define('game-explorer', class GameExplorer extends HTMLElement {
  get tabs() {
    return this.shadowRoot.querySelector('custom-tabs')
  }
  set games(value) {
    this.innerHTML = ''
    for (const [category, games] of Object.entries(value)) {
      console.log(category);
      const section = document.createElement('section')
      const tab = document.createElement('custom-tab')
      tab.innerHTML = `<p style="pointer-events: none;">${category}</p>`
      tab.dataset.route = category
      tab.setAttribute('tab', '')
      this.tabs.appendChild(tab)
      for (const game of games) {
        console.log(game);
        const el = document.createElement('game-explorer-item')
      }
    }
  }
  constructor() {
    super();
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = this.template
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
      }
      slot {
        pointer-events: none;
      }
      custom-tab > * {
        pointer-events: none;
      }
    </style>
    <custom-tabs>
      <slot name="tab"></slot>
    </custom-tabs>
    <game-categories></game-categories>
    
    `
  }
});