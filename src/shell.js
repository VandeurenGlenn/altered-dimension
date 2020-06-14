import './ui/header';
import './ui/toolbar';
import './ui/logo';
import './ui/navigation';
import './ui/nav-item';
import './../node_modules/@vandeurenglenn/custom-container/custom-container'
import './../node_modules/custom-svg-iconset/src/custom-svg-iconset.js'
import './../node_modules/custom-drawer/custom-drawer.js'
import './../node_modules/custom-pages/src/custom-pages.js'
import './../node_modules/custom-divider/custom-divider.js'
import  {dapHash} from './../build/.buildParams.json'

export default customElements.define('app-shell', class AppShell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  
  get pages() {
    return this.querySelector('custom-pages')
  }
  
  get drawer() {
    return this.querySelector('custom-drawer')
  }
  
  set selected(value) {
    if (this._current !== value) {
      if (!this.previousSelected) this.previousSelected = 'home';
      // this.querySelector(`[data-route="${this.previousSelected}"]`).classList.add('hidden')
      // this.querySelector(`[data-route="${value}"]`).classList.remove('hidden')
      this.pages.select(value)
      this.previousSelected = value
      
      this._current = value;
      
      if (value) {
        (async () => {
          await import(`./sections/${value}.js`)
        })();
      };
    }
  }
  
  connectedCallback() {
    document.addEventListener('scroll', ({detail}) => {
      if (this.hasAttribute('opened')) this.removeAttribute('opened')
      if (detail > this.lastScrollTop) {
        this.setAttribute('scrolling', '')
        this.removeAttribute('sticky')
      } else this.setAttribute('sticky', '')
      
      if (detail <= 80) {
        this.removeAttribute('sticky')
        this.removeAttribute('scrolling')
      }
      
      this.lastScrollTop = detail
    }, true)
    
    window.go = selected => {
      this.selected = 'games'
      window.location.hash = `!/games/${selected}`
      this.querySelector('games-section').selected = selected
    }
    const onhashchange = async () => {
      const parts = window.location.hash.split('/');
      const selected = parts[1];
      console.log(parts);
      console.log(decodeURI(parts[2]));
      if (parts[1] === 'appointment') {
        const url = 'https://m.facebook.com/services_vertical/book_appointment/?page_id=115867859850993&referrer=primary_cta&referrer_surface=page'
        open(url)
      }
      if (parts[1] === 'prices') {
        const url = 'https://www.facebook.com/115867859850993/photos/rpp.115867859850993/130761101695002/?type=3&theater'
        open(url)
      }
      if (parts[1]) {
        await import(`./sections/${parts[1]}.js`)
      }
      if (parts[2]) {
        console.log('into');
        const uri = decodeURI(parts[2])
        // const has = await customElements.get('contact-section');
      // if (parts[1] === 'info') {
          // setTimeout(function () {
            this.pages.querySelector(`[data-route="${parts[1]}"]`).selected = uri
            this.pages.querySelector(`[data-route="${parts[1]}"]`).selected = uri
          // }, 5000);
      // }
        if (parts[1] === 'info') {
          if (uri === 'over ons') await import(`./sections/about.js`)
          else if (uri === 'waarom VR') await import(`./sections/why-vr.js`)
          else if (uri === 'contact') await import(`./sections/contact.js`)  
         }// else if (parts[1] === 'events') {
        //   if (uri === 'verjaardagfeest') {
        //     await import(`./sections/events.js`)
        //     const el = this.shadowRoot.querySelector(`[data-route="events"]`).selected = uri
        //   } else if (uri === 'teambuilding') {
        //     await import(`./sections/events.js`)
        //     const el = this.shadowRoot.querySelector(`[data-route="events"]`).selected = uri
        //   } else if (uri === 'evenementen') {
        //     await import(`./sections/events.js`)
        //     const el = this.shadowRoot.querySelector(`[data-route="events"]`).selected = uri
        //   }
        // } else if (parts[1] === 'games') {          
        //   if (uri === 'VR Arcade') {
        //     // const el = this.shadowRoot.querySelector(`[data-route="events"]`).selected = uri
        //   } else if (uri === 'teambuilding') {
        //     await import(`./sections/events.js`)
        //     // const el = this.shadowRoot.querySelector(`[data-route="events"]`).selected = uri
        //   } else if (uri === 'evenementen') {
        //     await import(`./sections/events.js`)
        //     // const el = this.shadowRoot.querySelector(`[data-route="events"]`).selected = uri
        //   }
        // }
      } else {
        let hash
        if (parts[1] === 'info') {
          hash = `!/info/contact`
        }
        if (hash) window.location.hash = hash
      }
      this.removeAttribute('sticky')
      this.removeAttribute('scrolling')
      this.selected = parts[1] || 'home'
    }
    window.onhashchange = onhashchange;
    onhashchange();
    const desktop = ({matches}) => {
      console.log(matches);
      if (matches) { // If media query matches
        // this.setAttribute('opened', '')
          // document.body.style.backgroundColor = "yellow";
        } else {
          // this.removeAttribute('opened')
          // document.body.style.backgroundColor = "pink";
        }
      };

      var x = window.matchMedia("(min-width: 1400px)");
      console.log(x);
      desktop(x);
      x.onchange = desktop;
      window.addEventListener('DOMContentLoaded', (event) => {
        setTimeout(() => {
          const link = document.createElement('link')
          link.setAttribute('rel', 'dns-prefetch')
          link.href = 'https://node0.preload.ipfs.io'
          document.head.appendChild(link)
          const script = document.createElement('script')
          script.setAttribute('prefetch', '');
          script.onload = async () => {
            window.api = await new LeofcoinApi()
            window.api.ready = true;
            // resolve latest website version
            let response = await fetch('https://next.thealtereddimension.com/api/dns?domain=thealtereddimension.com')
            response = await response.text()
            console.log(response);
            // get latest known website version
            await api.ipfs.get(response)
          }
          script.src = './lfc-api.js'
            document.head.appendChild(script)
        }, 5500);  
      });
    (async () => {
      await import('./../node_modules/custom-svg-iconset/src/custom-svg-iconset.js')
      await import('./../node_modules/custom-svg-icon/src/custom-svg-icon.js')
      
      this.querySelector('custom-drawer').addEventListener('click', () => {
        if (this.hasAttribute('opened')) this.removeAttribute('opened')
      })
      this.querySelector('custom-svg-icon[drawer-icon]').addEventListener('click', () => {
        if (this.hasAttribute('opened')) this.removeAttribute('opened')
        else this.setAttribute('opened', '')
      })
      
      import('./altered-footer.js')
      
      
    })();
  }
  
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: row;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
      }
      ::slotted(custom-pages) {
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 54px;
        top: 128px;
        transition: width 120ms ease-in, transform 120ms ease-in;
        will-change: height, transform, transition, top, bottom;
        // transition: padding 120ms ease-in;
      }
      ::slotted(app-header) {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        transition: transform 120ms ease-in;
        padding: 12px;
        box-sizing: border-box;
      }
      ::slotted(custom-drawer) {
        opacity: 0;
        position: absolute;
        pointer-events: none !important;
        background: rgba(6, 63, 94, 0.25);
        transition: opacity 120ms ease-in, transform 120ms ease-in;
        z-index: 200 !important;
      }
      :host:not([opened]) ::slotted(custom-drawer) {
        opacity: 0 !important;
        left: 0;
        pointer-events: none !important;
      }
      :host([opened]) ::slotted(custom-drawer) {
        opacity: 1 !important;
        left: 0;
        pointer-events: auto !important;
        width: 100%;
      }
      :host([scrolling]) ::slotted(app-header) {
        transform: translateY(-105%)
      }
      :host([scrolling][sticky]) ::slotted(app-header) {
        position: fixed;
        transform: translateY(0)
      }
      :host([scrolling]) ::slotted(custom-pages) {
        height: calc(100% - 54px);
        transform: translateY(-128px);
      }
      @media(min-width: 1200px) {
        :host([opened]) ::slotted(custom-drawer) {
          width: 256px
        }
        :host([opened]) ::slotted(app-header) {
          position: absolute;
          right: 0;
          transform: translateX(256px);
          width: calc(100% - 256px);
        }
        :host([opened]) ::slotted(custom-pages) {          
          transform: translateX(256px);
          width: calc(100% - 256px);
        }
      }
      .column {
        display: flex;
        flex-direction: column;
      }
    </style>
    <slot name="drawer"></slot>
    <span class="column" style="overflow: hidden;">
      <slot name="header"></slot>
      <slot name="main"></slot>
    </span>
    <slot name="footer"></slot>
    
    `
  }
});