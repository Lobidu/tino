export default {
  name: 'Skill',
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
    setTimeout(
      () => {
        const valBar = this.node.getElementsByClassName('value')[0];
        valBar.setAttribute("style", `width: ${this.value}%`);
      }, 2000);

  }
};