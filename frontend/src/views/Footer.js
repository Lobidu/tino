export default {
  name: 'FooterComponent',
  render: () => (
    `<div id="footer" class="page center-elements">
       <div class="container center-elements column">
        <div class="center-elements row mb-50 width-75">
          <a href="mailto:janisaltherr@gmail.com">
            <image src="/img/mail.svg" alt="mail" class="social-icon"></image>
          </a>
          <a href="https://github.com/Lobidu">
            <image src="/img/github.svg" alt="github" class="social-icon"></image>
          </a>
          <a href="https://www.linkedin.com/in/janis-altherr">
            <image src="/img/linkedin.svg" alt="linkedin" class="social-icon"></image>
          </a>
        </div>
        <div class="text-center">
         <p>
           <span class="text-small">
             This page was proudly handcrafted using nothing but plain Javascript.
             The graphic on the top is driven by a Node.js server.<br/>
             <a href="https://github.com/Lobidu/tino">View the sourcecode on Github</a>.
           </span>
         </p>
        </div>
      </div>
     </div>`),
};
