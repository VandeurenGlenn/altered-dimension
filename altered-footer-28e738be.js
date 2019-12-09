customElements.define('custom-space', class CustomSpace extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        padding-top: var(--custom-space, 10%);
      }
      :host([horizontal]) {
        flex-direction: row;
        padding-left: var(--custom-space, 10%);
      }
    </style>`
  }
});

customElements.define('altered-footer', class AlteredFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;    
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        height: 140px;
      }
      .row {
        display: flex;
        flex-direction: row;
      }
      .column {
        display: flex;
        flex-direction: column;
      }
      .base {
        align-items: baseline;
      }
      .center {
        align-items: center;
      }
      h1, h4 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
      .flex {
        flex: 1;
      }
      .flex-2 {
        flex: 2;
      }
      .copyright {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        box-sizing: border-box;
        font-size: 12px;
  			text-overflow: ellipsis;
  	    white-space: nowrap;
  	    overflow: hidden;
        color: #eee;
      }
      .made-with .icon {
        width: 24px;
        height: 24px;
        padding: 0 8px;
      }
      .copyright .icon, span[slot="made-with"] .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .copyright .icon {
        padding-right: 8px;
        width: 12px;
        height: 12px;
      }
      .copyright small {
  			text-overflow: ellipsis;
  			white-space: nowrap;
  			overflow: hidden;
  			/* width: calc(100% - 30px) !important; */
  		}
    </style>
    <span class="row center">      
      <custom-divider style="border-bottom: 5px solid #3366CC;" class="flex"></custom-divider>
      <span class="column" style="text-align: right; padding: 0 16px;">
        <span class="row base" style="color: #3366CC">
          <h1 style="font-size: 64px;">V</h1>
          <h1 style="text-transform: lowercase; text-align: center;">irtual</h1>
          <h1 style="padding-left: 16px; font-size: 64px;">R</h1>
          <h1 style="text-transform: lowercase; text-align: center;">eality</h1>
        </span>
        <h4>thealtereddimension.be</h4>
      </span>
      <custom-divider style="border-bottom: 5px solid #3366CC;" class="flex"></custom-divider>
    </span>
    <span class="flex"></span>
    <span class="column" >
      addr Koning Albertstraat 43, 3290 Diest
      <p>tel</p>
      <p>email</p>
    </span>
    <span class="flex"></span>
    <span class="copyright"><img class="icon" src="copyright.svg"></img><small title="The Altered Dimension. Code licensed under the CC-BY-NC-SA-4.0 License. Except as otherwise noted, Documentation & media are licensed under CC-BY-4.0 License.">The Altered Dimension. Code licensed under the CC-BY-NC-SA-4.0 License. Except as otherwise noted, Documentation & media are licensed under CC-BY-4.0 License.</small></span>
    `
  }
});
