const API_URL = "https://travel-advisor.p.rapidapi.com/";
const travelAdvisorHost = "travel-advisor.p.rapidapi.com";
const travelAdvisorKey = "";
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
let debounce = (func, wait, immediate) => {
   let timeout;
   return function executedFunction() {
       let context = this;
       let args = arguments;
       let later = ()=> {
           timeout = null;
           if (!immediate) func.apply(context, args);
       };
       let callNow = immediate && !timeout;
       clearTimeout(timeout);
       timeout = setTimeout(later, wait);
       if (callNow) func.apply(context, args);
   };
};

let search = () => {
   let currentFocus;
   let searchInputElement = document.getElementById("searchBar");
   /*Event Listender when some data is entered in the search text field*/
   searchInputElement.addEventListener("input", debounce(function(e) {
       // Get the new value entered in the input field
       let newValue = this.value;

       let xhr = new XMLHttpRequest();
       if (!newValue || newValue.length < 3) {
           closeAllLists();
           return false;
       }

       xhr.addEventListener("readystatechange", function () {
           if (this.readyState === this.DONE) {
               /*close any already open lists of searched values*/
               //successRespone.data.Typeahead_autocomplete.results[0].detailsV2.locationId;
               closeAllLists();
               const data = JSON.parse(this.responseText).data.Typeahead_autocomplete.results;
               console.log(data);
               const geos = data.filter((element) => {
                   return element.__typename == "Typeahead_LocationItem";
               });
               let locationList = [];
               geos.forEach((element) => {
                   locationList.push(element.detailsV2.names.name);
               });
               currentFocus = -1;
               /*create a div which will show the suggestion list:*/
               let searchListDiv = document.createElement("div");
               searchListDiv.setAttribute("id", searchInputElement.id + "search-list");
               searchListDiv.setAttribute("class", "search-items");
               /*append the DIV element as a child of the search container:*/
               searchInputElement.parentNode.appendChild(searchListDiv);
               /*for each item in the array...*/
               for (let i = 0; i < locationList.length; i++) {
               /*check if the item starts with the same letters as the text field value:*/
                   if ((locationList[i].toUpperCase()).includes(newValue.toUpperCase())) {
                       /*create a DIV element for each matching element:*/
                       let listElementDiv = document.createElement("div");
                       listElementDiv.setAttribute("onClick", "window.location='list.html?city=" + locationList[i] + "'");
                       listElementDiv.innerText = locationList[i];
                       /*insert a input field that will hold the current array item's value:*/
                       listElementDiv.innerHTML += "<input type='hidden' value='" + locationList[i] + "'>";
                       /*execute a function when someone clicks on a city shown as the suggestions*/
                       listElementDiv.addEventListener("click", function(e) {
                           /*insert the value for the search text field:*/
                           searchInputElement.value = this.getElementsByTagName("input")[0].value;
                           /*close the list of search values,
                           (or any other open lists of search values:*/
                           closeAllLists();
                       });
                       searchListDiv.appendChild(listElementDiv);
                   }
               }
           }
       });

       xhr.open("GET", API_URL + "locations/v2/auto-complete?lang=en_US&units=km&query=" + newValue);
       xhr.setRequestHeader("x-rapidapi-host", travelAdvisorHost);
       xhr.setRequestHeader("x-rapidapi-key", travelAdvisorKey);

       xhr.send();
       
   },500));

   let closeAllLists = elmnt => {
       /*close all search lists in the document,
       except the one passed as an argument:*/
       let x = document.getElementsByClassName("search-items");
       for (let i = 0; i < x.length; i++) {
           if (elmnt != x[i] && elmnt != searchInputElement) {
               x[i].parentNode.removeChild(x[i]);
           }
       }
   }

   /*execute a function when someone clicks in the document:*/
   document.addEventListener("click", e => {
       closeAllLists(e.target);
   });
}

/*call the search funtion with the list of cities if api is not integrated*/
search();
//Call disable loader after the page gets loaded completed
disableLoader();