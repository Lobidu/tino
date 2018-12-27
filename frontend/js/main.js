import Engine from './engine.js';
import App from '../src/App.js';

const rootElement = document.getElementById('App');
const Root = new Engine(App, rootElement  );
Root.mount();

