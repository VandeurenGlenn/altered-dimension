import { C as CustomSelect, a as CustomSelector } from './yt-iframe-efb9d794.js';

customElements.define('custom-tabbed-categories', class CustomTabbedCategories extends CustomSelect(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = this.template;    
    this.attrForSeclected = 'data-route';
  }
   
  connectedCallback() {
    super.connectedCallback();
  }
  
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    </style>
    
    <slot></slot>
    
    `
  }
});

customElements.define('custom-tabbed-category-item', class CustomTabbedCategoryItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
  }
  set value(value) {
    this._value = value;
    (async () => {
      if (value.marked) await import('./custom-marked-f6eee489.js');
      this.render();
    })();
  }
  get value() {
    return this._value
  }
  render() {
    this.shadowRoot.innerHTML = this.template;
  }
  get _style() {
    return `<style>
      :host {
        display: block;
        box-sizing: border-box;
        min-height: 320px;
        height: 100%;
        font-size: 18px;
        width: 100%;
        max-width: 760px;
      }
      iframe-video, video {
        border: none;
        --iframe-height: 240px;
        // max-width: 320px;
      }
      .column {
        display: flex;
        flex-direction: column;
        width: 100%;
        box-sizing: border-box;
      }
      
      .row {
        display: flex;
        width: 100%;
      }
      
      custom-marked {
        box-sizing: border-box;
      }
      
      @media (max-width: 780px) {
        .mobile {
          flex-direction: column;
          align-items: center;
        }
        
        custom-marked {
          padding: 0 12px;
        }
        
        img {
          padding-left: 0 !important; 
        }
      }
      
      
      @media (max-width:720px) {
        .column {
          padding: 0 12px 0 12px;
        }
        :host {
          padding-top: 0;
          flex-direction: column;
          
          --iframe-height: 280px;
          --iframe-width: 100%;
        }
      }
    </style>`;
  }
  get template() {
    if (!this.value) return ``
    if (this.value.template) return this._style + this.value.template
    return `${this.value ? `${this._style}
    
    ${this.value.iframe ? `<yt-iframe loading="lazy" controls="0" src="${this.value.iframe}"></yt-iframe>` : ''}
    ${this.value.video ? `<video loading="lazy" controls="0" src="${this.value.video}"></video>` : ''}
    ${this.value.img ? `<img loading="lazy" src="${this.value.img}"></img>` : ''}
    
    <span class="column">
      ${this.value.title ? `<h2>${this.value.title}</h2>` : ''}
      ${this.value.marked ? `<custom-marked>${this.value.marked}</custom-marked>` : ''}
      ${this.value.description ? `<summary>${this.value.description}</summary>`: ''}
    </span>
    
    ` : ''}`
  }
});

customElements.define('custom-tabbed-category', class CustomTabbedCategory extends CustomSelector(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  
  set items(items) {
    for (const item of items) {
      console.log(item);
      const el = document.createElement('custom-tabbed-category-item');
      el.value = item;
      this.appendChild(el);
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

customElements.define('custom-tabbed-explorer', class CustomTabbedExplorer extends HTMLElement {
  get tabs() {
    return this.shadowRoot.querySelector('custom-tabs')
  }
  get categories() {
    return this.shadowRoot.querySelector('custom-tabbed-categories')
  }
  set items(value) {
    this._items = value;
    this.renderItems();
  }
  
  set selected(value) {
    if (value) {
      this._selected = value;
      // this.setAttribute('selected', value)
      this.tabs.selected = value;
      this.categories.selected = value;
    }
      console.log('select1');
  }
  
  get items() {
    return this._items
  }
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  connectedCallback() {
    
    this.tabs.addEventListener('selected', ({detail}) => {
      this.categories.select(detail);
      const parts = location.hash.split('/');
      window.location.hash = `!/${parts[1]}/${detail}`;
    });
    if (this.items) this.renderItems();
  }
  
  renderItems() {
    console.log('select');
    let i = 0;
    this.innerHTML = '';
    for (const [category, items] of Object.entries(this.items)) {
      const el = document.createElement('custom-tabbed-category');
      el.dataset.route = category;
      
      el.style.zIndex = 99 - i;
      if (this.isEvenNumber(i)) {
        el.classList.add('animate-left');
      } else {
        el.classList.add('animate-right');
      }
      console.log(i);
      this.categories.appendChild(el);
      const tab = document.createElement('custom-tab');
      tab.innerHTML = `<p style="pointer-events: none;">${category}</p>`;
      tab.dataset.route = category;
      tab.setAttribute('tab', '');
      this.tabs.appendChild(tab);
      tab.style = 'pointer-events: auto;';
      el.items = items;
      if (i === 0 && !this._selected) {
        this.selected = category;
      } else {
        if (this.categories.querySelector(`[data-route="selected}"]`)) {
        this.selected = selected;  
        }
        
      }
      i++;
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
