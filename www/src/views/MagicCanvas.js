import canvasapi from '../canvasApi.js';

export default {
  name: 'MagicCanvas',
  render () {
    return `<canvas id="cv" width="${window.innerWidth}" height="${window.innerHeight}"></canvas>`;
  },
  data: {
    gridSize: 100,
    maxIntensity: 1,
  },
  initializeCanvasMeasures(){
    this.canvas = this.node.getElementsByTagName('canvas')[0];
    this.cv = {};
    this.cv.boundingRect = this.canvas.getBoundingClientRect();
    this.cv.largerDimension = Math.max(this.cv.boundingRect.height, this.cv.boundingRect.width);
    // Calculate the overflowing part in pixels, divide by 2, half for each end
    const pxOverflowX = (this.cv.largerDimension - this.cv.boundingRect.width) / 2;
    const pxOverflowY = (this.cv.largerDimension - this.cv.boundingRect.height) / 2;
    // Convert this to the amount of grid squares
    this.cv.overflowX = Math.floor(pxOverflowX * this.gridSize / this.cv.largerDimension);
    this.cv.overflowY  = Math.floor(pxOverflowY * this.gridSize / this.cv.largerDimension);
    // Calculate the cv size in numbers of squares
    this.cv.squareCountX = this.gridSize - this.cv.overflowX;
    this.cv.squareCountY = this.gridSize - this.cv.overflowY;
    return true;
  },
  getColor(intensity){
    const relativeIntensity = Math.round(intensity/this.maxIntensity * 255);
    return `rgb(0, 0, ${relativeIntensity})`;
  },
  drawSquare(x, y, intensity){
    if(intensity <= 0) return;
    const squareSize = this.cv.largerDimension / this.gridSize;
    const posX = Math.floor((x - this.cv.overflowX)/this.gridSize * this.cv.largerDimension);
    const posY = Math.floor((y - this.cv.overflowY)/this.gridSize * this.cv.largerDimension);
    const canvas = this.node.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = this.getColor(intensity);
    ctx.fillRect(posX,posY,squareSize,squareSize);
  },
  paintCanvas(){
    for(let x=this.cv.overflowX; x<this.cv.squareCountX; x++){
      for(let y=this.cv.overflowY; y<this.cv.squareCountY; y++){
        const intensity = this.grid[x][y];
        this.drawSquare(x, y, intensity)
      }
    }
  },
  getEmptyGrid(){
    // Initializes a two-dimensional array with all values set to 0.
    const initialValue = 0;
    const col = Array(this.gridSize).fill(initialValue);
    return Array(this.gridSize).fill(col);
  },
  getMousePositionOnGrid(mousePos){
    const [mouseX, mouseY] = mousePos;
    const rect = this.cv.boundingRect;
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    const x = Math.floor((mouseX - rect.left) * this.gridSize / this.cv.largerDimension) + this.cv.overflowX;
    const y = Math.floor((mouseY - rect.top + scrollPos) * this.gridSize / this.cv.largerDimension) + this.cv.overflowY;
    return [x,y];
  },
  handleMouseMove(pos) {
    const [x,y] = this.getMousePositionOnGrid(pos);
    canvasapi.register([x,y]);
    this.grid[x][y]++;
    this.drawSquare(x, y, this.grid[x][y]);
  },
  async initializeRemoteData(){
    this.grid = canvasapi.grid;
    this.maxIntensity = canvasapi.maxIntensity;
    this.paintCanvas();
  },
  initialize(){
    this.grid = this.getEmptyGrid();
    this.initializeCanvasMeasures();
    canvasapi.onConnectionEstablished(() => this.initializeRemoteData());
  },
  mounted() {
    this.initialize();
    this.node.addEventListener("mousemove", e => this.handleMouseMove([e.clientX,e.clientY]), false);
    this.node.addEventListener("touchmove", e => {
      e.preventDefault(); // Chrome/Android fix
      this.handleMouseMove([e.pageX,e.pageY])
    }, false
    );
    window.addEventListener("resize", ()=>(this.initialize()), false);
  },
}