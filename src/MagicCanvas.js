export default {
  name: 'MagicCanvas',
  render () {
    return `<canvas id="cv" width="${window.innerWidth}" height="${window.innerHeight}"></canvas>`;
  },
  data: {
    gridSize: 100,
    maxIntensity: 1,
    mousetrace: [],
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
    const relativeIntensity = intensity/this.maxIntensity;
    return `rgba(0, 0, 255, ${relativeIntensity})`;
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
    return {ctx, posX, posY, squareSize};
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
    const x = Math.floor((mouseX - rect.left) * this.gridSize / this.cv.largerDimension) + this.cv.overflowX;
    const y = Math.floor((mouseY - rect.top) * this.gridSize / this.cv.largerDimension) + this.cv.overflowY;
    return [x,y];
  },
  handleMouseMove(pos) {
    const [x,y] = this.getMousePositionOnGrid([pos.clientX,pos.clientY]);
    this.ws.send(JSON.stringify([x,y]));
    this.grid[x][y]++;
    //this.paintCanvas();
    //this.drawSquare(x, y, this.grid[x][y]+0.2*this.maxIntensity);
    const intensity = this.grid[x][y]+0.5*this.maxIntensity;
    const square = this.drawSquare(x, y, intensity);
    this.fadeSquare(square, intensity, this.grid[x][y])

  },
  fadeSquare(square, fadeFromIntensity, fadeToIntensity){
    if (fadeFromIntensity < fadeToIntensity) return;
    const steps = Math.round(this.maxIntensity / 100);
    setTimeout(
      () => {
        square.ctx.fillStyle = this.getColor(fadeFromIntensity-steps);
        square.ctx.fillRect(square.posX, square.posY, square.squareSize, square.squareSize)
      },
      100
    )
  },
  drawDiminishingSquare(x, y, intensity){
    if (intensity < this.grid[x][y]) return;
    const steps = Math.round(this.maxIntensity / 100);
    const ctx = this.drawSquare(x, y, intensity);
    setTimeout(
      ()=>{
        this.drawDiminishingSquare(x, y, intensity-steps);
      },
      100
    )
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
  initialize(){
    this.grid = this.getEmptyGrid();
    this.initializeCanvasMeasures();
    this.initializeRemote();
  },
  mounted() {
    this.initialize();
    window.addEventListener("mousemove", (pos)=>(this.handleMouseMove(pos)), false);
    window.addEventListener("resize", ()=>(this.initialize()), false);
  },
}