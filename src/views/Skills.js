import Skill from '../components/skill.js';

export default {
  name: 'Skills',
  components: [Skill],
  render: () => (
    `<div id="skills" class="page center-elements">
       <div class="width-75 container">
         <h2>This is where I leave impressions.</h2>
         <p class="mb-50">
         I am not the type who specialises in one particular language or tech, though I have 
         a pretty good grasp on JS. My skill set ranges from UX to SQL all the way to Docker.
         In short, these are the skills I believe I'm really good at:</p>
         <div class="width-width-100">
          <skill title="Node.js" value="85"></skill>
          <skill title="Vue.js" value="90"></skill>
          <skill title="UX" value="85"></skill>
          <skill title="Docker" value="80"></skill>
          <skill title="MongoDB" value="60"></skill>
          <skill title="PHP" value="70"></skill>
         </div>
      </div>
    </div>
    `),
};