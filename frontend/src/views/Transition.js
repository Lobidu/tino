import canvasapi from '../canvasApi.js';

export default {
  name: 'TransitionComponent',
  data: {
    elementTop: 0,
    visitors: 1,
    isTouchInteraction: false,
  },
  render() {
   return `
      <div class="sticky center-elements">
          <div id="transition" class="">
                <div class="text-center width-50">
                  <p class="display">
                     By
                      ${this.isTouchInteraction ? 'touching the screen' : 'moving your cursor'},
                     you have left an impression on this website. 
                     To this day, 
                      ${this.visitors} visitor${(this.visitors > 1) ? 's have' : ' has' } 
                     left their individual mark.
                  </p>
               </div>
          </div>
      </div>
    `
  },
  handleScroll() {
    const min = this.elementTop;
    const max = min + window.innerHeight;
    const position = window.scrollY;
    const percentOfFilled = Math.floor(position / max * 100) / 100;
    const opacity = Math.max(Math.min(percentOfFilled, 1), 0);
    this.node.style.opacity = opacity;
  },
  getVisitors(){
    this.visitors = canvasapi.visitors;
  },
  mounted() {
    this.elementTop = this.node.getBoundingClientRect().top;
    window.addEventListener('touchstart', () => { this.isTouchInteraction = true; });
    window.addEventListener('scroll', () => this.handleScroll());
    canvasapi.onConnectionEstablished(() => this.getVisitors())
  }
};
