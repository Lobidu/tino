import HomeComponent from './Home.js';
import TransitionComponent from './Transition.js';
import AboutComponent from './About.js';
import InfoComponent from './Info.js';
import SkillsComponent from './Skills.js';
import NextComponent from './Next.js';
import FooterComponent from './Footer.js';
import Info2Component from './Info-2.js';

export default {
  name: 'AppComponent',
  components: [HomeComponent, TransitionComponent, AboutComponent, InfoComponent, Info2Component, SkillsComponent, NextComponent, FooterComponent],
  render() {
    return `
      <home-component></home-component>
      <div class="gradient-dark">
       <transition-component></transition-component>
       <about-component></about-component>
      </div>
      <div class="earth text-dark position-relative">
        <div class="atmosphere"></div>
        <div class="gradient-light">
          <info-component></info-component>
          <info2-component></info2-component>
          <skills-component></skills-component>
        </div>
        <next-component></next-component>
      </div>
      <footer-component></footer-component>
    `},
  mounted(){
    window.addEventListener('touchstart', ()=>{ this.node.classList.add('touch') });
  }
};
