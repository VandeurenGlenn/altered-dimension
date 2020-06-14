var home = customElements.define('home-section', class HomeSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  connectedCallback() {
    this.addEventListener('scroll', () =>  document.dispatchEvent(new CustomEvent('scroll', {detail: this.scrollTop})));
    // this.shadowRoot.querySelector('iframe').src= "https://player.vimeo.com/video/39252414?autoplay=1&loop=1&title=0&byline=0&portrait=0";
    // this.shadowRoot.querySelector('.maps').src= "https://maps.google.com/maps?q=thealtereddimension&t=&z=17&ie=UTF8&iwloc=&output=embed";
    
    const btns = Array.from(this.shadowRoot.querySelectorAll('.nav'));
    console.log(btns);
    btns.forEach(btn => btn.addEventListener('click', e => {
      console.log(e);
      go(e.target.innerHTML);
      console.log(e.target.innerHTML);
    }));
  }
  get template() {
    return `<style>
    * {
      box-sizing: border-box;
    }
      :host {
        display: block !important;
        // flex-direction: column;
        box-sizing: border-box;
        color: #eee;
        align-items: center;
        overflow-y: auto;
        
      }
      .container {
        display: flex;
        padding: 24px;
        border-radius: 40px;
        //background: rgba(6, 63, 94, 0.25);
        flex-direction: column;
        left: 50%;
        transform: translateX(-50%);
        position: relative;
      }
      
      iframe {
        border: none;
        width: 100%;
        max-height: 960px;
        width: 100% !important;
        height: 100% !important;
      }
      .center {
        align-items: center;
      }
      .row {
        display: flex;
        flex-direction: row;
      }
      section {
        padding: 24px;
        box-sizing: border-box;
      }
      .column {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
      .flex {
        flex: 1;
      }
      .flex-2 {
        flex: 2;
      }
      .categories {
        width: 100%;
        flex-flow: row wrap;
        justify-content: space-around !important;
      }
      .categories .img {
        border-radius: 40px;
      }
      .categories .column {
        padding: 12px;
        box-sizing: border-box;
      }
      .be .column {
        align-items: center;
        justify-content: center;
        max-width: 320px;
      }
      .categories .column, .be .column {
          box-sizing: border-box;
          max-width: 326px;
          min-height: 380px;
          width: 100%;
      }
      .be .column button {
        min-width: 132px;
      }
      .be {
        padding-top: 24px;
      }
      .be .mobile {
        flex-flow: row wrap;
        justify-content: space-around;
      }
      .laser {
        /* background: url('https://static.wixstatic.com/media/faec45_66a8f1b7f44c436fa0f65bf17f526b2c~mv2_d_4608_2112_s_2.jpg'); */
        /* height: 500px;
        width: 960px; */
        max-width: 960px;
        max-height: 500px;
        width: 100%;
        // height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
      }
      [drawer-icon] {
        /* opacity: 0; */
        /* position: absolute;
        left: 12px;
        top: 12px; */
        
        --svg-icon-size: 42px;
        
        z-index: 101;
        pointer-events: none;
      }
      app-navigation {
        align-items: center;
        color: #ddd;
        padding: 12px;
        height: 48px;
        z-index: 100;
      }
      button {
        background: #063F5E;
        border-radius: 120px;
        height: 43px;
        border-color: #00D0FF;
        color: #eee;
        outline: none;
        cursor: pointer;
        user-select: none;
      }
      .maps {
        min-height: 440px;
      }
      section.row {
        justify-content: center;
      }
      img, iframe {
        border-radius: 40px;
      }
      
        .be {
          min-width: 912px;
        }
      @media (max-width: 960px) {
        
          .be {
            min-width: 100%;
          }
        .row.mobile {
          flex-flow: row wrap !important;
          justify-content: space-around !important;
        }
        [drawer-icon] {
          opacity: 1;
          pointer-events: auto;
        }
        app-navigation {
          padding-top: 56px;
          flex-direction: column;
          position: fixed;
          height: fit-content;
          width: 240px;
          top: 0;
          left: 0;
          bottom: 0;
          transform: translateX(-105%);
          z-index: 100;
        }
        
        app-navigation[opened] {
          transform: translateX(0);
        }
        
        section.row summary {
          max-width: 500px;
        }
        
      }

      custom-container {
        width: 960px;
        overflow-y: auto;
      }
      summary {
        padding-left: 24px; 
      }
      
      .be img.logo {
        height: 176px;
      }
      .maps {
        margin-top: 24px;
      }
      .overlay {
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: url("vr.svg");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .glass {
        position: absolute;
        height: 100%;
        width: 50%;
        /* border: 44px solid #000; */
        border-right: 10px solid #000;        
        border-top: 10px solid #000;
        
        border-radius: 50px;
      }
      .right {
        /* border: 44px solid #000; */
        border-top: 10px solid #000;
        border-left: 10px solid #000;
        right: 0;
        border-radius: 50px;
      }
      
      @media (min-width: 960px) {
        
        iframe {
          min-height: 348px;
        }
        
         iframe {
          max-width: 960px !important;
          width: 100%;
        }
        custom-container > * {
          max-width: 960px !important;
          width: 100%;
        }
      }
      .hidden {
        padding: 0 !important;
        opacity: 0;
        height: 0;
        pointer-events: none;
        margin: 0;
      }
      
      section[data-route] {
        overflow-y: auto;
        color: #ddd;
      }
      
      summary {
        padding-left: 24px;
      }
      
      .be p {
        text-align: center;
      }
      
      @media (max-width: 860px) {
        footer, section.row {
          flex-direction: column !important;
        }
        section.row img {
          max-width: 480px;
        }
        section.row {   
          padding: 24px;
        }
        
        .container {
          padding: 0;
        }
        
        .be .column {
          justify-content: inherit;
        }
        
        .be h2 {
          padding-bottom: 12px;
        }
        
        .laser {
          box-sizing: border-box;
        }
        
        section {
          padding: 24px 0;
          box-sizing: border-box;
        }
        
        
        .be {
          padding: 24px;
        }
      }
      
      section {
        // background: rgba(6, 63, 94, 0.25);
        border-radius: 40px;
        width: 100%;
      }
      .container {
        max-width:960px;
      }
      .categories .img {
        height: 176px;
      }
      .img.arcade {
        background-image: url(1.jpg);
      }
      .img.escape {
        background-image: url(2.jpg);
      }
      .img.laser {
        background-image: url(3.jpg);
      }
      .img {
        display: block;
        object-fit: cover;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
    </style>
    <span class="container">
      
      
      <section class="categories row mobile">
        <span class="column">
          <span class="img arcade" src="1.jpg" loading="lazy" alt="vr arcade"></span>
          <br>
          <button class="nav">VR Arcade</button>
          <p>
            Beleef een onvergetelijk avontuur in één van de virtuele werelden! Ga op pad en verken de mooiste of de meest gestoorde werelden die te verkennen zijn in Virtual Reality.
          </p>
        </span>
        
        <span class="column">
          <span class="img escape" loading="lazy" src="2.jpg" alt="vr escape"></span>
          <br>
          <button class="nav">VR Escape</button>
          <p>
          Alleen of met vrienden! Geraak jij op tijd uit onze Virtual Reality escape rooms? 
          </p>
        </span>
        
        <span class="column">
          <span class="img laser" loading="lazy" src="3.jpg" alt="vr laser"></span>
          <br>
          <button class="nav">VR Laser</button>
          <p>
          Kom jij de eerste plaats claimen? Kom samen met of tegen je vrienden een rondje laser schieten in de virtuele wereld van Tower Tag.
          </p>
        </span>        
      </section>
      
      <section class="be column">
        <br>
        <span class="row mobile">
          <span class="column">
            <h2>Feesten en Events</h2>
            
            <img loading="lazy" src="event.svg" alt="events" class="logo"></img>
            <p>
              Virtual Reality op jouw feest of event? 
            </p>
                        
            <a href="#!/events/evenementen"><button>Meer info</button></a>
          </span>
          <span class="column">
            <h2>Verjaardagsfeest</h2>
            <img loading="lazy" src="feest.svg" class="logo" alt="party"></img>
            <p>
              Virtual Reality verjaardagsfeest? 
            </p>
            <a href="#!/events/verjaardagfeest"><button>Meer info</button></a>
          </span>  
        </span>
      </section>
      
      
      
  </span>
  <altered-footer></altered-footer>
    `
    
      // <img loading="lazy" class="laser" src="rift s.png" alt="">
    // <iframe class="maps" loading="lazy"></iframe>
  }
});

export default home;
