export default {
  name: 'nextViewBtnComponent',
  props: ['scroll'],
  data:{
    isTouchInteraction: false,
    isHidden: false,
  },
  render()  {
    return `
         <button class="nxt-v-btn"></button>
    `;
  },
  mounted(){
    this.detectTouch();
    this.node.addEventListener('click', () => { this.makeScroll() });
    window.addEventListener('scroll', () => this.handleScroll())
  },
  wiggle(){
    this.node.classList.add('wiggle');
    setTimeout(() => {
        this.node.classList.remove('wiggle')
      }, 1000
    )
  },
  detectTouch(){
    window.addEventListener('touchstart', () => {
      this.isTouchInteraction = true;
      if (this.isInPosition()) {
        this.node.classList.remove('opacity-0');
        this.wiggle();
      }
   });
  },
  scrollTo(target, pos=1, iteration=1, maxIterations=50){
    // In a perfect world, we could just use the 'behavior: smooth' property of the
    // window.scollTo function.
    // That's not supported by Safari, though, so this
    // function recreates this behavior, adding an ease-in-out effect
    // while we're at it.
    window.scrollTo({ top: pos, left: 0});

    // return if we're there.
    if(iteration >= maxIterations) return;

    // This is a gaussian function to ease the scroll effect.
    // View https://www.desmos.com/calculator/3zwub5yvo2
    // for a visualization. This was probably way more work than
    // necessary.
    const b = 0.5; // position of amplitude as partial of animation
    const c = 0.1; // width of amplitude ~ which speed to start/end with?
    const d = 1.2; // "softness" of animation: closer to 1 = softer
    const a = (target/maxIterations) * (1.2 + target / window.innerHeight);
                  // Don't ask me where the 1.2 is coming from.
                  // It's needed to make the animation end at the target.
    const x = (iteration/maxIterations);
    const inc = a * Math.pow(d, (-(Math.pow((x - b), 2) / (2 * Math.pow(c, 2)))));
    requestAnimationFrame(
      () => this.scrollTo(target, (pos + inc), (iteration + 1), maxIterations),
    )
  },
  makeScroll() {
    const target = window.innerHeight * ( (this.scroll || 100) / 100);
    this.scrollTo(target);
  },
  isInPosition(){
    return this.node.getBoundingClientRect().top >= (0.8 * window.innerHeight)
  },
  handleScroll(){
    if(this.isInPosition()){
      // scrolled back into view, reset.
      if (this.isTouchInteraction){
        this.node.classList.remove('opacity-0')
      }
    } else {
      this.node.classList.add('opacity-0')
    }
  },
};
