//header template starts here...
let headerTemplate =`<a href="index.html" id="logo">
<img src="/assests/images/logo.png"  style="height:60px; width: 60px;" alt="logo"><br>
</a>
<button type="button" class="btn btn-light btn-sm" data-toggle="modal" data-target="#example-modal"
   id="login">LOGIN</button>`;

document.getElementsByTagName("header")[0].innerHTML = headerTemplate;

//footer template starts here...

let footerTemplate = ` <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#contact-modal"
id="contactUs">Contact Us</button>
<div>
<p id="copyright">&copy;2020 ROOM SEARCH PVT.LTD.</p>
</div>
<div class="socialImage">
<a href="https://www.facebook.com">
<img src="/assests/images/facebook.png" target="_blank" style="height:20px; width: 22px;">
</a>
<a href="https://www.instagram.com">
<img src="/assests/images/instagram.png" target="_blank" style="height:20px; width: 22px;">
</a>
<a href="https://twitter.com">
<img src="/assests/images/twitter.png" target="_blank" style="height:20px; width: 22px;">
</a>
</div>`
document.getElementsByTagName("footer")[0].innerHTML = footerTemplate;
