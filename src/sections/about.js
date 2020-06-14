export default customElements.define('about-section', class AboutSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  get template() {
    return `<style>
    * {
      box-sizing: border-box;
      margin: 0;
    }
    :host {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      color: #eee;
      align-items: center;
      justify-content: center;
    }
    
    summary {
      width: 50%;
      padding-left: 36px; 
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      max-width: 480px;
    }
    
    .container {
      max-width: 960px;
      padding: 24px;
      border-radius: 40px;
      background: rgba(6, 63, 94, 0.25);
      display: flex;
      overflow-y: auto;
    }
    
    img {
      width: 100%;
      max-height: 257px;
      max-width: 480px;
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
      min-width: 320px;
      height: 100%;
      min-height: 320px;
    }
    
    @media(max-width: 960px) {
      .container {
        flex-direction: column;
        align-items: center;
        padding: 0;  
      }
      summary {
        padding: 24px;
        width: 100%;
      }
      img {
        
        border-top-right-radius: 40px;        
        border-bottom-left-radius: 0px;
      }
    }
    @media(max-width: 440px) {
      .container {
        padding: 0;
      }
      img {        
        border-radius: 0;
      }
    }
    </style>
    <span class="container">
      <img src="./altered-dimension-480.jpg"></img>
      <summary>
      
        <h2>The Altered Dimension</h2>
        <p>The Altered Dimension is geopend sinds 1 december 2019 gelegen in Diest in de Koning Albertstraat. Samen met de hardware streven we naar de zo best mogelijke ervaring. Samen met de VR. escape rooms en VR. arcade games bieden we exclusief in België Tower Tag aan. Een Virtual Reality laser shoot, genomineerd voor het meest innovatieve en beste game design 2019.</p>

​
      </summary>
      </span>
    `
  }
});