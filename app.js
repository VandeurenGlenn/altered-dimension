var app = customElements.define('altered-app', class AlteredApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
  
  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    </style>
    <custom-svg-iconset>
      <svg><defs>
        <g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
      </defs></svg>
    </custom-svg-iconset>
    <slot></slot>
    `;
    
    (async () => {
      
      await import('./custom-svg-iconset-01f346e8.js');
      await import('./custom-svg-icon-b3b9700f.js');
  
    })();
  }
  
});

export default app;
