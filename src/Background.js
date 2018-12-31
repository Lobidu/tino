export default {
  name: 'Background',
  render(){
    return `<canvas id="cv" width="${this.canvasWidth}" height="${this.canvasHeight}"></canvas>`
  },
  data: {
    gridSize: 100,
    squareSize: window.innerWidth / 100,
    canvasWidth: window.innerWidth,
    canvasHeight: window.innerHeight,
    maximumIntensity: 1,
  },
  getEmptyGrid(){
    // Initializes a two-dimensional array with all values set to 0.
    const initialValue = 0;
    const col = Array(this.gridSize).fill(initialValue);
    return Array(this.gridSize).fill(col);
  },
  getMousePositionOnGrid(mousePos){
    const [mouseX, mouseY] = mousePos;
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((mouseX - rect.left) * this.gridSize / rect.width);
    const y = Math.floor((mouseY - rect.top) * this.gridSize / rect.width);
    return [x,y];
  },
  handleMouseMove(pos) {
    const [x,y] = this.getMousePositionOnGrid([pos.clientX,pos.clientY]);
    this.ws.send(JSON.stringify([x,y]));
    this.grid[x][y]++;
    this.drawSquare(x, y, this.maxIntensity * 0.3);
    //this.drawDiminishingSquare(x, y)
  },
  drawDiminishingSquare(x, y, intensity=this.maxIntensity){
    if (intensity < this.grid[x][y]) return;
    const steps = Math.round(this.maxIntensity / 100);
    this.drawSquare(x, y, intensity);
    setTimeout(
      ()=>{
        this.drawDiminishingSquare(x, y, intensity-steps);
      },
      1
    )
  },
  drawSquare(x, y, intensity){
    if(intensity <= 0) return;
    const posX = Math.round(x/100 * this.canvasWidth);
    const posY = Math.round(y/100 * this.canvasWidth);

    const ctx = this.canvas.getContext("2d");
    ctx.fillStyle = this.getColor(intensity);
    ctx.fillRect(posX,posY,this.squareSize,this.squareSize);
  },
  populateGrid(){
    for(let x=0; x<this.gridSize; x++){
      for(let y=0; y<this.gridSize; y++){
        const intensity = this.grid[x][y];
        this.drawSquare(x, y, intensity)
      }
    }
  },
  getColor(intensity){
    const hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    const relativeIntensity = intensity/this.maxIntensity;
    const intensityHexValue = Math.round(relativeIntensity * hex.length);
    const b = hex[intensityHexValue] || 'f';
    return `#0000${b}${b}`;
  },
  establishSocket(){
    return new Promise(resolve => {
      // Establish a websocket connection
      this.ws = new WebSocket("ws://ec2-54-194-151-237.eu-west-1.compute.amazonaws.com:8080");
      this.ws.onclose = () => {
        // try again
        this.establishSocket();
      };
      this.ws.onopen = () => {
        resolve();
      }
    })
  },
  async initializeRemote(){
    this.establishSocket();
    await this.establishSocket();
    this.ws.onmessage = (response) => {
      // When the connection is established, the server answers with the necessary information
      const { grid, maxIntensity } = JSON.parse(response.data);
      this.grid = grid;
      this.maxIntensity = maxIntensity * 0.8;
      this.populateGrid();
    };
  },
  mounted() {
    this.grid = this.getEmptyGrid();
    this.canvas = this.node.getElementsByTagName('canvas')[0];
    this.initializeRemote();
    window.addEventListener("mousemove", (pos)=>(this.handleMouseMove(pos)), false);
  }
};