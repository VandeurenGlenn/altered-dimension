var arizonaSunshine = customElements.define('arizona-sunshine-section', class ArizonaSunshineSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
      h1 {
        padding-top: 8px;
        margin: 0;
        width: 100%;
        box-sizing: border-box;
      }
      .img {
        height: 50%;
      }
      span {
        overflow: scroll;
        box-sizing: border-box;
        background: #000000d1;
      }
      @media (max-width: 960px) {
        span {
          width: 100%;
        }
      }
      @media (max-width: 640px) {
        h1 {
          padding-left: 16px;
        }
        span {
          padding: 0 16px;
        }
        .img {
          height: 30%;
        }
      }
      iframe {
        max-height: 364px;
      }
    </style>
    <custom-container>
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Nw5YzBqk01I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" controls="0" allowfullscreen></iframe>
    <h1>Arizona Sunshine</h1>
    <span>
    <p>The unnamed player character awakes in a cave in an Arizona river valley. While exploring his surroundings and killing zombies he encounters, he finds a radio, turns it on and hears, among much static, something which sounds like a human voice. Searching for the source of the signal, the player encounters another radio with a stronger signal and comes to the conclusion that it is sent from a refinery which has been reinforced by the military. But when he reaches the refinery, he sees that it has been overrun by zombies. The player kills them all in a fit of rage and then has a breakdown. After staying the night in a safe room in the refinery, he continues the next morning, aimless and desperate. But after finding another radio, he notices that the signal is still there and is being sent from a town called Sunshine, Arizona. The player continues to the town and finally reaches the radio station, only to find out that no one in the station is alive and the signal is sent automatically. But when he screams his frustrations into the radio station microphone, someone answers him and tells him to wait outside, where he is rescued by a helicopter after withstanding a massive horde of zombies..</p>

    </span>
    </custom-container>
    `;
  }
});

export default arizonaSunshine;
