import Background from './Background.js';

export default {
  name: 'App',
  components: [Background],
  render: () => ('<div><background></background><h1>I\'m ready,' +
    ' Cupertino</h1></div>')
};
