const config = {
  url: 'ws://janis.eu-west-1.elasticbeanstalk.com:8080'
};

class CanvasApi {
  constructor() {
    this._ws = undefined;
    this.grid = [];
    this.visitors = 1;
    this.connectionEstablishedFunctions = [];
    this.init();
  }

  establishSocket(){
    // Establish a websocket connection
    this._ws = new WebSocket(config.url);
    this._ws.onclose = () => {
      // try again
      this.establishSocket();
    };
  }

  getMaximumIntensity() {
    const colMaxima = this.grid.map((col) => (Math.max.apply(Math, col)));
    return Math.max.apply(null, colMaxima);
  };

  async init() {
    this.establishSocket();
    this._ws.onmessage = (response) => {
      // When the connection is established, the server answers with the necessary information
      const { grid, visitors } = JSON.parse(response.data);
      this.grid = grid;
      this.visitors = visitors;
      this.maxIntensity = this.getMaximumIntensity() * 0.8;
      this.connectionEstablishedFunctions.map(e => e())
    };
  }

  onConnectionEstablished(func){
    this.connectionEstablishedFunctions.push(func);
  }

  register(data) {
    this._ws.send(JSON.stringify(data))
  }
}

export default new CanvasApi();
