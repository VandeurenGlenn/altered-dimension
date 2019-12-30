export default customElements.define('about-section', class AboutSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: row;
        padding: 86px 0;
        box-sizing: border-box;
        color: #eee;
      }
      
      summary {
        padding-left: 24px; 
      }
    </style>
      <img src="./Altered Dimension.webp"></img>
      <summary>
      
        <h2>The Altered Dimension</h2>
        <p>The Altered Dimension is geopend sinds 1 december 2019 gelegen in diest in de Koning Albertstraat. Samen met de hardware streven we naar de zo best mogelijke ervaring. Samen met de VR. escape rooms en VR. arcade games bieden we exclusief in Belië Tower Tag aan. Een Virtual Reality laser shoot, genomineerd voor het meest innovatieve en beste game design 2019.</p>

​
      </summary>
    `
  }
});