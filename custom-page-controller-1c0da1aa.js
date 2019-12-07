import { a as SelectMixin, S as SelectorMixin } from './selector-mixin-a6a7b665.js';

/**
 * @extends HTMLElement
 */
class CustomPages extends SelectMixin(HTMLElement) {
  constructor() {
    super();
    this.slotchange = this.slotchange.bind(this);
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          flex: 1;
          position: relative;
          --primary-background-color: #ECEFF1;
          overflow: hidden;
        }
        ::slotted(*) {
          display: flex;
          position: absolute;
          opacity: 0;
          pointer-events: none;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transition: transform ease-out 160ms, opacity ease-out 60ms;
          /*transform: scale(0.5);*/
          transform-origin: left;
        }
        ::slotted(.animate-up) {
          transform: translateY(-120%);
        }
        ::slotted(.animate-down) {
          transform: translateY(120%);
        }
        ::slotted(.custom-selected) {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
          transition: transform ease-in 160ms, opacity ease-in 320ms;
          max-height: 100%;
          max-width: 100%;
        }
      </style>
      <!-- TODO: scale animation, ace doesn't resize that well ... -->
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.slotchange);
  }

  isEvenNumber(number) {
    return Boolean(number % 2 === 0)
  }

  /**
   * set animation class when slot changes
   */
  slotchange() {
    let call = 0;
    for (const child of this.slotted.assignedNodes()) {
      if (child && child.nodeType === 1) {
        child.style.zIndex = 99 - call;
        if (this.isEvenNumber(call++)) {
          child.classList.add('animate-down');
        } else {
          child.classList.add('animate-up');
        }
        this.dispatchEvent(new CustomEvent('child-change', {detail: child}));
      }
    }
  }
}customElements.define('custom-pages', CustomPages);

customElements.define('custom-menu', class CustomMenu extends SelectorMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  
  _onClick(event) {
    super._onClick(event);
    const sub = this.querySelector(`[custom-submenu][data-route="${this.selected}"]`);
    if (sub && sub.dataset.route === this.selected) this._toggleSub(sub);
  }
  
  _toggleSub(sub) {
    const els = this.querySelectorAll(`[sub-menu-item="${this.selected}"]`);
    if (sub.hasAttribute('opened')) sub.removeAttribute('opened');
    else sub.setAttribute('opened', '');
    for (const el of els) {
      if (sub.hasAttribute('opened')) el.setAttribute('shown', '');
      else {
        if (el.hasAttribute('custom-submenu')) {
          const elsInEl = this.querySelectorAll(`[sub-menu-item="${el.dataset.route}"]`);
          el.removeAttribute('opened');
          for (const el of elsInEl) {
            el.removeAttribute('shown');
          }
        }
        
        el.removeAttribute('shown');
      }
    }
    
  }
  
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
      }
      ::slotted([sub-menu-item]) {
        transform: scale(0);
        height: 0px !important;
        padding: 0 !important;
      }
      ::slotted([sub-menu-item][shown]) {
        height: auto !important;
        padding: 12px 12px 12px 36px !important;
        transform: scale(1);
      }
      ::slotted([sub-menu-item][in-custom-submenu][shown]) {
        padding: 12px 12px 12px 64px !important;
      }
    </style>
    <slot></slot>
    `
  }
});

customElements.define('custom-page-title', class CustomPageTitle extends HTMLElement {
    get value() {
      return this.getAttribute('value')
    }
    set value(value) {
      this.setAttribute('value', value);
      this.innerHTML = `<h3>${value}</h3>`;
    }
  constructor() {
    super();
    this.style.paddingLeft = '4px';
    this.style.textTransform = 'uppercase';
    this.innerHTML = `<h3>${this.value}</h3>`;
  }
  get template() {
    return 
  }
});

var customPageController = customElements.define('custom-page-controller', class CustomPageController extends HTMLElement {
  set title(value) {
    this._title.value = value;
  }
  set page(value) {
    this._pages.select(value);
  }
  get _title() { return document.querySelector('custom-page-title') }
  get _pages() { return document.querySelector('custom-pages') }
  get _nav() { return document.querySelector('custom-menu') }
  // set
  constructor() {
    super();
    this.style.display = 'none';
  }
  
  connectedCallback() {
    this.whenDefined(['custom-pages', 'custom-page-title']);
  }
  
  async whenDefined(elements) {
    for (const element of elements) {
      if (element === 'custom-pages') await customElements.whenDefined(element);
      if (element === 'custom-page-title') this._setupListener();
    }    
  }
  
  _setupListener() {
    this._nav.addEventListener('selected', ({detail}) => {
      this.page = detail;
      this.title = detail;
    });
  }
});

export default customPageController;
