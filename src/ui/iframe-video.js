function onPlayerReady(event) {
  // event.target.playVideo();
}

let done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

export default customElements.define('iframe-video', class IframeVideo extends HTMLElement {
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
    this.player = new YT.Player(this._player, {
      height: '100%',
      width: '100%',
      videoId:  value,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
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
      }
    </style>
    
    <div id="player"></div>
    
    `
  }
});