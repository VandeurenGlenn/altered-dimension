export default customElements.define('yt-iframe', class YtIframe extends HTMLElement {
  static get observedAttributes() {
    return ['src']
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  
  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value
  }
  
  get _player() {
    return this.shadowRoot.querySelector('#player')
  }
  
  set src(value) {
    this._player.src = `https://www.youtube-nocookie.com/embed/${value}?controls=0&enablejsapi=1&origin=https://next.thealtereddimension.com&widget_referrer=https://next.thealtereddimension.com`
    // this.player = new YT.Player(this._player, {
    //   height: '100%',
    //   width: '100%',
    //   playerVars: {
    //     origin: 'https://next.thealtereddimension.com',
    //     widget_referrer: 'https://next.thealtereddimension.com',
    //     autoplay: false,
    //     controls: false,
    //     fs: 0,
    //     modestbranding: 1,
    //     showinfo: 0,
    //     enablejsapi: true
    //   }
    // });
  }
  get template() {
    return `<style>
      :host {
        display: block;
        width: var(--iframe-width, 100%);
        height: var(--iframe-height, 100%);
      }
      
      #player {
        width: var(--iframe-width, 100%);
        height: var(--iframe-height, 100%);
        border: none;
      }
    </style>
    
    <iframe id="player" frameborder="0"></iframe>
    
    `
  }
});