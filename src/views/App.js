import Home from './Home.js';
import Transition from './Transition.js';
import About from './About.js';
import Info from './Info.js';
import Skills from './Skills.js';
import Next from './Next.js';
import Footer from './Footer.js';

export default {
  name: 'App',
  components: [Home, Transition, About, Info, Skills, Next, Footer],
  render() {
    return `
      <home></home>
      <div class="gradient-dark">
       <transition></transition>
       <about></about>
      </div>
      <div class="earth">
      <div class="atmosphere"></div>
      <div class="gradient-light">
        <info></info>
        <skills></skills>
      </div>
      </div>
      <next></next>
      <footer></footer>
    `},
  mounted(){
    window.addEventListener('touchstart', ()=>{ this.node.classList.add('touch') });
  }
};
