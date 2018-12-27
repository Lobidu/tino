import Background from './Background.js';

export default {
  name: 'Home',
  components: [Background],
  render: () => (
    '<div id="home" class="page">' +
    ' <background></background>' +
    ' <h1>Great <span class="text-primary">code</span><br/>leaves an impression.</h1>' +
    '</div>')
};
