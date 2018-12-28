import Skill from './components/skill.js';

export default {
  name: 'Skills',
  components: [Skill],
  render: () => (
    `<div id="skills" class="page center-elements">
     <div class="width-50"><h2>This is what I do best.</h2>
     <p class="mb-50">My skill set is quite diverse, ranging from experience 
     design to SQL all the way to Docker.
     But these are the skills I really excel at:</p>
    <div class="width-width-100">
    <skill title="Node.js" value="85"></skill>
    <skill title="Javascript" value="90"></skill>
    <skill title="Vue.js" value="85"></skill>
    <skill title="UX" value="80"></skill>
    <skill title="MongoDB" value="60"></skill>
    <skill title="PHP" value="70"></skill>
    </div></div>`),
};