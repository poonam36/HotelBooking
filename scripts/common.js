//header template starts here...
let headerTemplate = `<a href="index.html" id="logo">
<img src="/assests/images/logo.png"  style="height:60px; width: 60px;" alt="logo"><br>
</a>
<div id="logindiv">
<button type="button" class="btn btn-light btn-sm" data-toggle="modal" data-target="#example-modal" id="login" onclick="login()">LOGIN</button> </div>`;

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

//login button to logout

localStorage.setItem('username', 'admin');
localStorage.setItem('password', 'admin');

//Writing function for login
function login() {
   if (document.getElementById("login").innerHTML == "LOGIN") {
      document.getElementById("login").setAttribute("data-toggle", "modal");
      document.getElementById("login").setAttribute("data-target", "#example-modal");
   }
   else if (document.getElementById("login").innerHTML == "LOGOUT") {
      document.getElementById("login").innerHTML = "LOGIN";
      document.getElementById("payNowbtn").className = "btn btn-success disabled";
      document.getElementById("payNowbtn").disabled = true;
      username.value = '';
      password.value = '';

   }
}

function modalLogin() {
   var username = localStorage.getItem('username');
   var password = localStorage.getItem('password');
   if (document.getElementById("username").value == username &&
      document.getElementById("password").value == password) {
      document.getElementById("login").innerHTML = "LOGOUT";
      document.getElementById("login").removeAttribute("data-toggle");
      document.getElementById("login").removeAttribute("data-target");
      alert("Successfully logged in");
      document.getElementsByClassName("close")[0].click();
      document.getElementById("payNowbtn").className = "btn btn-success";
      document.getElementById("payNowbtn").disabled = false;
   } else {
      alert("Incorrect credentials");
      username.value = '';
      password.value = '';
   }

}

