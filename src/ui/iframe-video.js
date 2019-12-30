export default customElements.define('iframe-video', class IframeVideo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  get template() {
    return `<style>
      :host {
        display: block;
        position: relative;
      }
      iframe, video {
        position: absolute;
      }
    </style>
    <img slot="bottom" src="https://i.vimeocdn.com/video/270645039_960.jpg" alt=""></img>
    <iframe slot="bottom" src="//player.vimeo.com/video/39252414?api=true&loop=true&autoplay=true&title=false&portrait=false&byline=false&background=true" width="960px" frameborder="0"></iframe>
    `
  }
});