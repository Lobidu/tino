import MagicCanvasComponent from './MagicCanvas.js';
import NextViewBtnComponent from '../components/nextViewBtn.js';

export default {
  name: 'HomeComponent',
  components: [MagicCanvasComponent, NextViewBtnComponent],
  render() {
    return `
    <div id="home" class="screen center-elements text-center">
     <magic-canvas-component></magic-canvas-component>
     <h1>Great <span class="text-blue">code</span> leaves an impression.</h1>
     <next-view-btn-component class="scroll-btn animate-opacity opacity-0" scroll="66"></next-view-btn-component>
    </div>`;
  },
  mounted(){
    this.node.addEventListener('touchmove', (e) => e.preventDefault());
  }
};
