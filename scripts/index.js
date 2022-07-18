
function viewMore() {
   let viewButton = document.getElementById('viewBtn');
   if (viewButton.innerHTML == "View more") {
      document.getElementById("cityCards2").style.display = "flex";
      viewButton.innerHTML = "View less"
   }
   else {
      document.getElementById("cityCards2").style.display = "none";
      viewButton.innerHTML = "View more"
   }
}
