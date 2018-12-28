export default {
  name: 'Transition',
  data: {
    visitors: 49,
  },
  render() {
   return `<div id="transition" class="fade center-elements">` +
     `<div class="text-center width-50"><p>` +
     ` By moving your cursor, you have left an impression on this website. ` +
     ` To this day, ${this.visitors} users have left their individual mark.` +
     `</p></div>` +
     `</div>`
  },
  handleScroll() {
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollPos > 0.1 * window.innerHeight){
      const el = document.getElementById('transition');
      el.classList.add("visible")
    }
  },
  mounted() {
    document.onscroll = (p) => { this.handleScroll(p) };
  }
};