import MagicCanvas from './MagicCanvas.js';

export default {
  name: 'Home',
  components: [MagicCanvas],
  render() {
    return `<div id="home" class="page center-elements text-center">
     <magiccanvas></magiccanvas>
     <h1>Great <span class="text-primary">code</span> leaves an impression.</h1>
    </div>`
  }
};
