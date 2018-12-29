import Home from './Home.js';
import Transition from './Transition.js';
import About from './About.js';
import Info from './Info.js';
import Skills from './Skills.js';
import Footer from './Footer.js';

export default {
  name: 'App',
  components: [Home, Transition, About, Info, Skills, Footer],
  render() {
    return `
      <home></home>
      <div class="gradient">
       <transition></transition>
       <about></about>
      </div>
      <info></info>
      <skills></skills>
      <footer></footer>
    `}
};
