export default {
  name: 'SkillComponent',
  props: ['title', 'value'],
  render()  {
    return `
    <div class="skill">
        <div class="title">${this.title}</div>
        <div class="bar">
            <div class="value"></div>
        </div>
    </div>`
  },
  mounted(){
    window.addEventListener('scroll', () => { this.handleScroll() });
  },
  handleScroll() {
    if(this.node.getBoundingClientRect().bottom < window.innerHeight){
      const valBar = this.node.getElementsByClassName('value')[0];
      valBar.setAttribute("style", `width: ${this.value}%`);
    }
  },
};
