import Engine from './engine.js';
import Home from '../src/Home.js';

const root = document.getElementById('App');
const App = new Engine(Home, root);
App.mount();

