var contact = customElements.define('contact-section', class ContactSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
    * {
      box-sizing: border-box;
    }
      :host {
        display: block !important;
        flex-direction: column;
        padding-top: 24px;
        box-sizing: border-box;
        align-items: center;
        width: 100%;
        color: #ddd;
        overflow-y: auto;
      }
      
      input {
        outline: none;
        box-sizing: border-box;
        padding: 0 12px;
        height: 40px;
        background: #064b7d;
        border: none;
        margin-right: 6px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        color: #cc7512;
      }
      textarea {
        background-color: #cc7512;
        box-sizing: border-box;
        padding: 12px;
        max-height: 140px;        
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        width: 100%;
        min-width: 260px;
        color: #064b7d;
      }
      
      input::-webkit-input-placeholder {
        font-weight: 800;
        color: #cc7512;
      }
      
      textarea::-webkit-input-placeholder {        
        font-weight: 800;
        color: #064b7d;
      }
      
      input, textarea {
        border: none;
      }
      
      .column {
        display: flex;
        flex-direction: column;
        max-height: 140px;
      }
      
      .row {
        display: flex;
        flex-direction: row;
      }
      
      .flex {
        flex: 1;
      }
      
      .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 24px;
        border-radius: 54px;
        background: rgba(6, 63, 94, 0.25);
        max-width: 960px;
        position: relative;
        left: 50%;
        transform: translate(-50%);
      }
      
      iframe {
        border: none;
        min-height: 400px;
          border-radius: 40px;
      }
      
      section {
        padding: 24px;
        background: rgba(6, 63, 94, 0.25);
        border-radius: 40px;
        margin-bottom: 24px;
      }
      p {
        margin: 0;
      }
      
      .info:not(.mobile) {
        padding-bottom: 24px;
      }
      
      .row {
        align-item: center;
      }
      
      .info.mobile {
        height: 0;
        padding: 0;
        opacity: 0;
        width: 0;
      }
      
      @media (max-width: 860px) {
        .container {
          display: flex;
          flex-direction: column;
          padding: 0;
        }
        
        .info:not(.mobile) {
          height: 0;
          padding: 0;
          opacity: 0;
        }
        
        .info.mobile {
          margin-top: 24px;
          height: auto;
          width: auto;
          opacity: 1;
        }
        
        textarea {
          min-width: 0;
        }
      }
      
      @media (max-width: 560px) {
        textarea {
          height: 200px;
          border-radius: 40px;
          margin-top: 24px;
        }
        input {
          border-radius: 40px;
        }
        .mobile {
          flex-direction: column;
        }
      }
    </style>    
    
    <span class="container">
        <section>
          <span class="column info">
            <p><strong>Koning Albertstraat 43, 3290 Diest</strong></p>
            
            <p><strong>Info@TheAlteredDimension.com</strong></p>
            
            <p><strong>0493/92 02 52</strong></p>
            
            <p><strong>facebook</strong></p>
            
            <p><strong>instagram</strong></p>
          </span>
          <span class="flex"></span>
          <span class="row mobile">
            <span class="column" style="height: 140px;">
              <input placeholder="naam"></input>
              
              <span class="flex"></span>
              
              <input placeholder="email"></input>
              
              <span class="flex"></span>
              
              <input placeholder="onderwerp"></input>
            </span>
          
            <textarea type="textfield" placeholder="bericht"></textarea>
          </span>
          
          <span class="column info mobile">
            <p><strong>Koning Albertstraat 43, 3290 Diest</strong></p>
            
            <p><strong>Info@TheAlteredDimension.com</strong></p>
            
            <p><strong>0493/92 02 52</strong></p>
            
            <p><strong>facebook</strong></p>
            
            <p><strong>instagram</strong></p>
          </span>
      
    </section>
      <iframe src="https://maps.google.com/maps?q=thealtereddimension&t=&z=17&ie=UTF8&iwloc=&output=embed" width="100%"></iframe>
      
      
    </span>
    <altered-footer></altered-footer>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": "https://thealtereddimension.be",
      "name": "TheAlteredDimension",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "0493/92 02 52",
        "contactType": "Boeken, algemene info"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Belgium",
        "addressRegion": "Vlaams-Brabant",
        "streetAddress": "Koning Albertstraat 43, 3290 Diest"
      }
    }
    </script>
    `
  }
});

export default contact;
