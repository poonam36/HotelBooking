const pricePerPersonPerDay = 1000;
let urlParams = new URLSearchParams(window.location.search);
const API_URL = "https://travel-advisor.p.rapidapi.com/";
const travelAdvisorHost = "travel-advisor.p.rapidapi.com";
const travelAdvisorKey = "2c2ec3c1c2msh674419a4952260ep1d82eejsne3e3e3a7c1fc";


function calculateTotal() {
    var adult = document.getElementById("adults").value;
    var fromdate = document.getElementById("datefrom").value;
    document.getElementById("dateto").min = fromdate;
    var todate = document.getElementById("dateto").value;

    var date1 = new Date(fromdate);
    var date2 = new Date(todate);
    var diffDays = (date2 - date1) / (1000 * 60 * 60 * 24);
    var total = 0;
    //console.log(adult);
    console.log(diffDays);
    //?adults=3&name=atul&datefrom=2022-07-12&dateto=2022-07-20
    total = pricePerPersonPerDay * adult * diffDays;
    if (isNaN(total)) {
        console.log("inside");
        total = 0;
    }
    document.getElementById("price").value = "Rs. " + total;
    sessionStorage.setItem("price", "Rs. " + total);
    sessionStorage.setItem("diffDays", diffDays);
}

window.addEventListener('load',getHotelDetails);
function getHotelImages() {

    const xhr = new XMLHttpRequest();
    let url = API_URL + "photos/list?location_id=" + urlParams.get('hotel');
    console.log("hotel id==>" + urlParams.get('hotel'));
    sessionStorage.setItem("hotelId", urlParams.get('hotel'));
    xhr.open("GET", url);
    xhr.setRequestHeader("X-RapidAPI-Key", travelAdvisorKey);
    xhr.setRequestHeader("X-RapidAPI-Host", travelAdvisorHost);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var successResponse = JSON.parse(xhr.responseText);
            // console.log(successResponse);
            for (let i = 0; i < successResponse.data.length; i++) {
                let image = successResponse.data[i].images.original.url;
                if (i == 0) {
                    let template = `<div class="carousel-item active">
                <img  class="slider-image" src="${image}" >
              </div>`;
                    document.getElementById("carousel-inner").innerHTML = template;
                } else {
                    let template = `<div class="carousel-item">
                <img class="slider-image" src="${image}">
              </div>`;
                    document.getElementById("carousel-inner").innerHTML += template;
                }
            }

        }
    }
}


function getHotelDetails() {

    const xhr = new XMLHttpRequest();
    let url = API_URL + "hotels/get-details?location_id=" + sessionStorage.getItem("cityId");
    xhr.open("GET", url);
    xhr.setRequestHeader("X-RapidAPI-Key", travelAdvisorKey);
    xhr.setRequestHeader("X-RapidAPI-Host", travelAdvisorHost);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let successResponse = JSON.parse(xhr.responseText);
            //console.log(successResponse);
            for (let i = 0; i < successResponse.data.length; i++) {

                let hotelId = successResponse.data[i].location_id;
                let sessionHotelId = sessionStorage.getItem("hotelId");

                if (hotelId == sessionHotelId) {
                    let image = successResponse.data[i].photo.images.original.url;
                    let hotelName = successResponse.data[i].name;
                    let hotelAddress = successResponse.data[i].address;
                    let hotelDescription = successResponse.data[i].description;
                    let rating = successResponse.data[i].rating;
                    let amenities = successResponse.data[i].amenities; //key , name

                    sessionStorage.setItem("hotelAddress", hotelAddress);
                    sessionStorage.setItem("hotelName", hotelName);
                    sessionStorage.setItem("hotelImage", image);

                    document.getElementById("hotelName").innerHTML = hotelName;
                    document.getElementById("description").innerHTML = hotelDescription;

                    document.getElementById("stars").innerHTML = getStars(parseFloat(rating));
                    setAmenities(amenities);
                }
            }
        }
    }
    getHotelImages();
}

function setAmenities(amenities) {
    var ul = document.createElement('ul');
    ul.setAttribute('id', 'proList');


    document.getElementById('amenities').appendChild(ul);

    let totalAmenities = amenities.length;
    if (totalAmenities > 10) {
        amenities.splice(10);
    }
    for (var i = 0; i < amenities.length; i++) {
        var listViewItem = document.createElement('li');
        listViewItem.appendChild(document.createTextNode(amenities[i].name));
        listView.appendChild(listViewItem);
    }
}


function getStars(rating) {
    // Round to nearest half
    rating = Math.round(rating * 2) / 2;
    let output = [];

    // Append all the filled whole stars
    for (var i = rating; i >= 1; i--)
        output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    // If there is a half a star, append it
    if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    // Fill the empty stars
    for (let i = (5 - rating); i >= 1; i--)
        output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    return output.join('');
}