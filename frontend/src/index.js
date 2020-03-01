import Engine from './engine.js';
import AppComponent from './views/App.js';

//const rootElement = document.getElementById('App');
const Root = new Engine(AppComponent, document.getElementById('App'));
Root.mount();

