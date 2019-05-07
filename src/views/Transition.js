import canvasapi from '../canvasApi.js';

export default {
  name: 'Transition',
  data: {
    visitors: 1,
    isTouchInteraction: false,
  },
  render() {
   return `
    <div id="transition" class="fade center-elements">
      <div class="text-center width-50">
        <p>
           By
           ${this.isTouchInteraction ? 'touching the screen' : 'moving your cursor'},
           you have left an impression on this website. 
           To this day, ${this.visitors} visitors have left their individual mark.
        </p>
       </div>
    </div>`
  },
  handleScroll() {
    if(this.node.getBoundingClientRect().bottom < window.innerHeight){
      this.node.classList.add("visible");
    }
  },
  getVisitors(){
    this.visitors = canvasapi.visitors;
  },
  mounted() {
    window.addEventListener('touchstart', () => { this.isTouchInteraction = true; })
    window.addEventListener('scroll', () => this.handleScroll());
    canvasapi.onConnectionEstablished(() => this.getVisitors())
  }
};