import Skill from '../components/skill.js';

export default {
  name: 'Skills',
  components: [Skill],
  render: () => (
    `<div id="skills" class="page center-elements">
       <div class="width-75 container">
         <h2>Tech inspires.</h2>
         <p class="mb-50">
            <span class="lead">User experience is not limited to the realm of front-end.</span>
             For it to become a piece of art, all parts have to play together like a symphony.
             I love finding inspiration in every element of the stack. These are the skills and
             languages that I currently master best.
         </p>
         <div class="width-100">
          <skill title="Node.js" value="85"></skill>
          <skill title="Vue.js" value="90"></skill>
          <skill title="UX" value="85"></skill>
          <skill title="Docker" value="60"></skill>
          <skill title="MongoDB" value="65"></skill>
          <skill title="Python" value="68"></skill>
         </div>
      </div>
    </div>
    `),
};