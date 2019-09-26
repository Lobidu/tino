import Engine from './engine.js';
import App from './views/App.js';

//const rootElement = document.getElementById('App');
const Root = new Engine(App, document.getElementById('App'));
Root.mount();

