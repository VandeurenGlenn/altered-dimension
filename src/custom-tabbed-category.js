import CustomSelector from './../node_modules/custom-select-mixins/src/selector-mixin.js';
import './ui/yt-iframe';

customElements.define('custom-tabbed-category-item', class CustomTabbedCategoryItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'})
  }
  set value(value) {
    this._value = value;
    (async () => {
      if (value.marked) await import('./custom-marked.js')
      this.render()
    })()
  }
  get value() {
    return this._value
  }
  render() {
    this.shadowRoot.innerHTML = this.template
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

export default customElements.define('custom-tabbed-category', class CustomTabbedCategory extends CustomSelector(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = this.template
  }
  
  set items(items) {
    for (const item of items) {
      console.log(item);
      const el = document.createElement('custom-tabbed-category-item')
      el.value = item
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