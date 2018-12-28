import Home from './Home.js';
import Transition from './Transition.js';
import About from './About.js';
import Info from './Info.js';
import Skills from './Skills.js';

export default {
  name: 'App',
  components: [Home, Transition, About, Info, Skills],
  render: () => (
    '<home></home>' +
    '<div class="gradient"> ' +
    ' <transition></transition>' +
    ' <about></about>' +
    '</div>' +
    '<info></info>' +
    '<skills></skills>' +
    '')
};
