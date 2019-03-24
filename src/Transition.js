export default {
  name: 'Transition',
  data: {
    visitors: 49,
  },
  render() {
   return `
    <div id="transition" class="fade center-elements">
      <div class="text-center width-50">
        <p>
           By moving your cursor, you have left an impression on this website. 
           To this day, ${this.visitors} users have left their individual mark.
        </p>
       </div>
    </div>`
  },
  handleScroll() {
    if(this.node.getBoundingClientRect().bottom < window.innerHeight){
      this.node.classList.add("visible");
    }
  },
  mounted() {
    window.addEventListener('scroll', () => { this.handleScroll() });
  }
};