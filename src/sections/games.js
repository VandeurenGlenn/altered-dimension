import './../../node_modules/custom-tabs/custom-tabs.js';
import './../../node_modules/custom-tabs/src/custom-tab.js';
import games from './../data/games.js';
import './../game-explorer.js';
import ytApi from './../yt-iframe-api';

export default customElements.define('games-section', class GamesSection extends HTMLElement {
  get explorer() {
    return this.shadowRoot.querySelector('game-explorer')
  }
  
  set selected(value) {
    this.explorer.selected = value
    this.explorer.selected = value
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  
  connectedCallback() {
    (async () => {
      //
      // await ytApi
      // requestAnimationFrame(() => {
        this.explorer.games = games
      // })
    })()
  }
  get template() {
    return `<style>
      :host {
        display: block;
        flex-direction: row;
        box-sizing: border-box;
        color: #eee;
        height: 100%;
        width: 100%;
        justify-content: center;
      }
    </style>
    <script type="application/ld+json">
    {
      "@context": "http://schema.org/",
      "@type": "Product",
      "serviceType": "Virtual reality center",
      "provider": {
        "@type": "LocalBusiness",    
        "priceRange": "average",
        "image": "https://thealtereddimension.com/altered-logo.png",
        "logo": "https://thealtereddimension.com/altered-logo.png",
        "telephone": "0493/92 02 52",
        "name": "The Altered Dimension",
        "description": "The Altered Dimension is the place to be for having a great time in virtual reality!",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Belgium",
          "addressRegion": "Vlaams-Brabant",
          "streetAddress": "Koning Albertstraat 43, 3290 Diest"
          },  
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "50.986149",
            "longitude": "5.053422"
          },
          "currenciesAccepted": "EUR"
      	},
      "areaServed": {
        "@type": "State",
        "name": "Vlaams-Brabant"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services and games",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "games",
            "itemListElement": [
              {
                "@type": "Offer",
                "price": "16 to 42",
                "description": "prices range from 16 to 42",
                "itemOffered": {
                  "@type": "Service",
                  "name": "VR arcade games"
                }
              },
              {
                "@type": "Offer",
                "price": "16 to 42",
                "description": "prices range from 16 to 42",
                "itemOffered": {
                  "@type": "Service",
                  "name": "VR Escape rooms"
                }
              },
              {
                "@type": "Offer",
                "price": "16 to 42",
                "description": "prices range from 16 to 42",
                "itemOffered": {
                  "@type": "Service",
                  "name": "VR laser tag"
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Birthday party"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Teambuilding"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Events"
                }
              }
            ]
          }
        ]
      }
    }
    </script>
    <game-explorer></game-explorer>
    `
  }
});