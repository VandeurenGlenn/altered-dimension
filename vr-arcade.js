var vrArcade = customElements.define('vr-arcade-section', class VrArcadeSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: block;
      }
    </style>
    <p>Virtual Reality arcade.

In het arcade deel van ons assortiment kan je spelletjes spelen voor jong en oud.
Gaande van Beat saber, klimmen op snoep, zombies schieten,... voor ieder wat wilss</p>`
  }
});

export default vrArcade;
