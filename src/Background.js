export default {
  name: 'Background',
  render(){
    return `<canvas id="cv" width="${window.innerWidth}" height="${window.innerHeight}"></canvas>`
  },
  data: {
    gridSize: 100,
    maximumIntensity: 1,
    grid: []
  },
  setMousePosition(pos) {
   const x = pos.clientX / window.innerWidth;
   const y = pos.clientY / window.innerWidth;
   const posX = Math.floor(x * this.gridSize);
   const posY = Math.floor(y * this.gridSize);
   this.grid[posX][posY]++;
   this.populateGrid();
  },
  initializeGrid(){
    for(let x=0; x<this.gridSize; x++){
      const col = [];
      for(let y=0; y<this.gridSize; y++){
        col.push(0);
      }
      this.grid.push(col)
    }
  },
  populateGrid(){
    const gridSize = window.innerWidth / 100;
    const canvas = document.getElementById('cv');

    const maxIntensity = this.getMaximumIntensity();
    for(let x=0; x<this.gridSize; x++){
      for(let y=0; y<this.gridSize; y++){
        const intensity = this.grid[x][y];
        const ctx = canvas.getContext("2d");
        const posX = Math.round(x/100 * window.innerWidth);
        const posY = Math.round(y/100 * window.innerWidth);
        if(intensity>0){
          ctx.fillStyle = this.getColor(intensity,maxIntensity);
          ctx.fillRect(posX,posY,gridSize,gridSize);
        }
      }
    }
  },
  getMaximumIntensity(){
    const maxRow = this.grid.map(row=>(Math.max.apply(Math, row)));
    return Math.max.apply(null, maxRow);
  },
  getColor(intensity, maximum = 100){
    const scale = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    const index = Math.round(intensity/maximum * scale.length);
    const result = scale[index];
    return `#${result}${result}0000`;
  },
  mounted() {
    this.initializeGrid();
   window.addEventListener("mousemove", (pos)=>(this.setMousePosition(pos)), false);
    //this.setMousePosition(0,0)
  }
};