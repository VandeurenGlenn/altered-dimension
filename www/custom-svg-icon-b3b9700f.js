var customSvgIcon = ((base = HTMLElement) => {
  customElements.define('custom-svg-icon', class CustomSvgIcon extends base {

    /**
     * Attributes observer
     * @return {Array} ['icon']
     */
    static get observedAttributes() {
      return ['icon'];
    }

    /**
     * Iconset
     * @return {object} window.svgIconset
     * [checkout](svg-iconset.html) for more info.
     */
    get iconset() {
      return window.svgIconset
    }

    set iconset(value) {
      window.iconset = value;
    }

    /**
     * icon
     * @param {string} value icon to display.
     * optional: you can create multiple iconsets
     * by setting a different name on svg-iconset.
     *
     * **example:** ```html
     * <svg-iconset name="my-icons">
     *   <g id="menu">....</g>
     * </svg-iconset>
     * ```
     * This means we can ask for the icon using a prefix
     * **example:** ```html
     * <reef-icon-button icon="my-icons::menu"></reef-icon-button>
     * ```
     */
    set icon(value) {
      if (this.icon !== value) {
        this._icon = value;
        this.__iconChanged__({value: value});
      }
    }

    get icon() {
      return this._icon;
    }

    get template() {
      return `
        <style>
          :host {
            width: var(--svg-icon-size, 24px);
            height: var(--svg-icon-size, 24px);
            display: inline-flex;
            display: -ms-inline-flexbox;
            display: -webkit-inline-flex;
            display: inline-flex;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            position: relative;
            vertical-align: middle;
            fill: var(--svg-icon-color, #111);
            stroke: var(--svg-icon-stroke, none);
          }
        </style>
      `;
    }

    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this._onIconsetReady = this._onIconsetReady.bind(this);
    }

    /**
     * Basic render template, can be called from host using super.render() or extended
     *
     * @example ```js
     * const iconTempl = super.template();
     * ```
     */
    render() {
      this.shadowRoot.innerHTML = this.template;
    }

    connectedCallback() {
      this.icon = this.getAttribute('icon') || null;
      if (!super.render) this.render();
    }

    _onIconsetReady() {
      window.removeEventListener('svg-iconset-added', this._onIconsetReady);
      this.__iconChanged__({value: this.icon});
    }

    __iconChanged__(change) {
      if (!this.iconset) {
        window.addEventListener('svg-iconset-added', this._onIconsetReady);
        return;
      }
      if (change.value && this.iconset) {
        let parts = change.value.split('::');
        if (parts.length === 1) {
          this.iconset['icons'].host.applyIcon(this, change.value);
        } else if (this.iconset[parts[0]]) {
          this.iconset[parts[0]].host.applyIcon(this, parts[1]);
        }
      } else if(!change.value && this.iconset && this._icon) {
        let parts = this._icon.split('::');
        if (parts.length === 1) {
          this.iconset['icons'].host.removeIcon(this);
        } else {
          this.iconset[parts[0]].host.removeIcon(this);
        }
      }
      this.iconset = this.iconset;
    }

    /**
     * Runs when attribute changes.
     * @param {string} name The name of the attribute that changed.
     * @param {string|object|array} oldValue
     * @param {string|object|array} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) this[name] = newValue;
    }
  });
})();

export default customSvgIcon;
