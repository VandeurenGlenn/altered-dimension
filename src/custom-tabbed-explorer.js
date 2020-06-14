import './../node_modules/custom-tabs/custom-tabs.js';
import './../node_modules/custom-tabs/src/custom-tab.js';
import './custom-tabbed-categories'
import './custom-tabbed-category'

export default customElements.define('custom-tabbed-explorer', class CustomTabbedExplorer extends HTMLElement {
  get tabs() {
    return this.shadowRoot.querySelector('custom-tabs')
  }
  get categories() {
    return this.shadowRoot.querySelector('custom-tabbed-categories')
  }
  set items(value) {
    this._items = value
    this.renderItems()
  }
  
  set selected(value) {
    if (value) {
      this._selected = value
      // this.setAttribute('selected', value)
      this.tabs.selected = value
      this.categories.selected = value
    }
      console.log('select1');
  }
  
  get items() {
    return this._items
  }
  constructor() {
    super();
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = this.template
  }
  connectedCallback() {
    
    this.tabs.addEventListener('selected', ({detail}) => {
      this.categories.select(detail)
      const parts = location.hash.split('/')
      window.location.hash = `!/${parts[1]}/${detail}`
    })
    if (this.items) this.renderItems()
  }
  
  renderItems() {
    console.log('select');
    let i = 0;
    this.innerHTML = ''
    for (const [category, items] of Object.entries(this.items)) {
      const el = document.createElement('custom-tabbed-category')
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
      el.items = items
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
      }
      slot {
        pointer-events: none;
      }
      custom-tab > * {
        pointer-events: none;
      }
      custom-tabs {
        max-width: 780px;
        width: 100%;
      }
      custom-tabbed-categories {
        position: relative;
        flex: 1;
      }
      custom-tabbed-categories > * {
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: transform 120ms ease-out;
      }
      custom-tabbed-categories .custom-selected {
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
    <custom-tabbed-categories attr-for-selected="data-route"></custom-tabbed-categories>
    
    `
  }
});