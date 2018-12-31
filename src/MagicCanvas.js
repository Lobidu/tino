export default {
  name: 'MagicCanvas',
  render () {
    return `<canvas id="cv" width="${window.innerWidth}" height="${window.innerHeight}"></canvas>`;
  },
  data: {
    gridSize: 100,
    maximumIntensity: 5
  },
  getColor(intensity){
    const hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    const relativeIntensity = intensity/this.maxIntensity;
    const intensityHexValue = Math.round(relativeIntensity * hex.length);
    const b = hex[intensityHexValue] || 'f';
    return `#0000${b}${b}`;
  },
  drawSquare(x, y, intensity){
    if(intensity <= 0) return;
    const squareSize = this.biggerDimension / this.gridSize;
    const posX = Math.floor((x - this.gridOverflowX)/this.gridSize * this.canvasRect.width);
    const posY = Math.floor((y - this.gridOverflowY)/this.gridSize * this.canvasRect.height);
    const ctx = this.canvas.getContext("2d");
    ctx.fillStyle = this.getColor(intensity);
    ctx.fillRect(posX,posY,squareSize,squareSize);
  },
  paintCanvas(){
    this.canvasRect = this.canvas.getBoundingClientRect();
    this.biggerDimension = Math.max(this.canvasRect.height, this.canvasRect.width);
    // Calculate the overflowing part in pixels, divide by 2, half for each end
    const overflowX = (this.biggerDimension - this.canvasRect.width) / 2;
    const overflowY = (this.biggerDimension - this.canvasRect.height) / 2;
    // Convert this to the amount of grid squares
    this.gridOverflowX = Math.floor(overflowX * this.gridSize / this.biggerDimension);
    this.gridOverflowY = Math.floor(overflowY * this.gridSize / this.biggerDimension);
    // Calculate the canvas size in numbers of squares
    const canvasSquareCountX = this.gridSize - this.gridOverflowX;
    const canvasSquareCountY = this.gridSize - this.gridOverflowY;
    for(let x=this.gridOverflowX; x<canvasSquareCountX; x++){
      for(let y=this.gridOverflowY; y<canvasSquareCountY; y++){
        const intensity = this.grid[x][y];
        // convert the grid values back into actual pixel coordinates
        this.drawSquare(x, y, intensity)
      }
    }
  },
  getEmptyGrid(){
    // Initializes a two-dimensional array with all values set to 0.
    const initialValue = 5;
    const col = Array(this.gridSize).fill(initialValue);
    return Array(this.gridSize).fill(col);
  },
  getMousePositionOnGrid(mousePos){
    const [mouseX, mouseY] = mousePos;
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((mouseX - rect.left) * this.gridSize / this.biggerDimension);
    const y = Math.floor((mouseY - rect.top) * this.gridSize / this.biggerDimension);
    return [x,y];
  },
  handleMouseMove(pos) {
    const [x,y] = this.getMousePositionOnGrid([pos.clientX,pos.clientY]);
    //this.ws.send(JSON.stringify([x,y]));
    this.grid[x][y]++;
    this.paintCanvas();
    //this.drawSquare(x, y, this.maxIntensity * 0.3);
    //this.drawDiminishingSquare(x, y)
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
      this.paintCanvas();
    };
  },
  mounted() {

    this.canvas = this.node.getElementsByTagName('canvas')[0];
    this.grid = this.getEmptyGrid();
    //this.initializeRemote();
    this.paintCanvas();
    //window.addEventListener("mousemove", (pos)=>(this.handleMouseMove(pos)), false);
  },
}