let urlParams = new URLSearchParams(window.location.search);
const API_URL = "https://travel-advisor.p.rapidapi.com/";
const travelAdvisorHost = "travel-advisor.p.rapidapi.com";
const travelAdvisorKey = "";
let locations = [];
searchLocation();

function searchLocation() {

    const xhr = new XMLHttpRequest();
    let url = API_URL + "locations/v2/auto-complete?query=" + urlParams.get('city');
    console.log("city==>" + urlParams.get('city'));

    xhr.open("GET", url);
    xhr.setRequestHeader("X-RapidAPI-Key", travelAdvisorKey);
    xhr.setRequestHeader("X-RapidAPI-Host", travelAdvisorHost);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var successRespone = JSON.parse(xhr.responseText);
            // console.log(successRespone);
            let cityId = successRespone.data.Typeahead_autocomplete.results[0].detailsV2.locationId;
            let geocode = successRespone.data.Typeahead_autocomplete.results[0].detailsV2.geocode;
            sessionStorage.setItem("cityId", cityId);
          
            getHotelDetails(cityId);
        }
    }
}

function getHotelDetails(cityId) {
    const xhr = new XMLHttpRequest();
    let url = API_URL + "hotels/get-details?location_id=" + cityId;
    console.log("cityId ==>" + cityId);

    xhr.open("GET", url);
    xhr.setRequestHeader("X-RapidAPI-Key", travelAdvisorKey);
    xhr.setRequestHeader("X-RapidAPI-Host", travelAdvisorHost);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let successResponse = JSON.parse(xhr.responseText);
             console.log(successResponse);
            for (let i = 0; i < successResponse.data.length; i++) {
                let image = successResponse.data[i].photo.images.original.url;
                let hotelName = successResponse.data[i].name;
                let hotelId = successResponse.data[i].location_id;
                let hotelAddress = successResponse.data[i].address;
                let rating = successResponse.data[i].rating;
               
                
                if (image == undefined) {
                    continue;
                } else {
                let latitude = successResponse.data[i].latitude;
                let longitude = successResponse.data[i].longitude;
                console.log(latitude);
                console.log(longitude);
                    let cityCard = `
<div class="listCityImage">
<a href="detail.html?hotel=${hotelId}"> <img id="hotelImage"
      src="${image}">
</a>
<div class="hotelText">
      <p>${hotelName}</p>
      <span id="stars">${getStars(parseFloat(rating))}</span>
      <p>${hotelAddress}</p>
</div>
</div>`;

                    document.getElementById("list").innerHTML += cityCard;

                    locations.push([hotelName + "<br><a href=\"detail.html?id=" + hotelId + "\">Book Hotel</a>", latitude, longitude]);
                }
            }
            initMap(locations);
        }
        
    }
    disableLoader();
    
}
//this function is used to initialize the google map and place the markers at the position obtained by the latitude and longitude of the hotel from the API
let initMap = locations => {
  // let location = locations[0];
    let latitude = locations[0][1];
    let longitude =locations[0][2];
    let center = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: center
    });
    let infoWindow =  new google.maps.InfoWindow({});
    let marker, count;
    for (count = 0; count < locations.length; count++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[count][1], locations[count][2]),
            map: map,
            title: locations[count][0]
        });
        google.maps.event.addListener(marker, 'click', ((marker, count) => {
            return function() {
                infoWindow.setContent(locations[count][0]);
                infoWindow.open(map, marker);
            }
        })(marker, count));
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