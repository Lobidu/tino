import SkillComponent from '../components/skill.js';

export default {
  name: 'SkillsComponent',
  components: [SkillComponent],
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
          <skill-component title="Node.js" value="85"></skill-component>
          <skill-component title="Vue.js" value="90"></skill-component>
          <skill-component title="UX" value="85"></skill-component>
          <skill-component title="Docker" value="80"></skill-component>
          <skill-component title="SQL" value="65"></skill-component>
          <skill-component title="Python" value="68"></skill-component>
          <skill-component title="GraphQL" value="30"></skill-component>
         </div>
      </div>
    </div>
    `),
};
