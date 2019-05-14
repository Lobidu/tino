import Skill from '../components/skill.js';

export default {
  name: 'Skills',
  components: [Skill],
  render: () => (
    `<div id="skills" class="page center-elements">
       <div class="width-75 container">
         <h2>This is where I leave impressions.</h2>
         <p class="mb-50">
            <span class="lead"> I try, I fail, I try again.</span>
            I love experimenting with tech. I try something, sometimes it sticks, sometimes it doesn't.
            Here is what stuck so far:
         </p>
         <div class="width-width-100">
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