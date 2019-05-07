import MagicCanvas from './MagicCanvas.js';
import NextViewBtn from '../components/nextViewBtn.js';

export default {
  name: 'Home',
  components: [MagicCanvas, NextViewBtn],
  render() {
    return `<div id="home" class="page center-elements text-center">
     <magiccanvas></magiccanvas>
     <h1>Great <span class="text-blue">code</span> leaves an impression.</h1>
     <nextviewbtn class="scroll-btn animate-opacity opacity-0" scroll="66"></nextviewbtn>
    </div>`;
  },
  mounted(){
    this.node.addEventListener('touchmove', (e) => e.preventDefault());
  }
};
