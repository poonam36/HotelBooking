let urlParams = new URLSearchParams(window.location.search);
const API_URL = "https://travel-advisor.p.rapidapi.com/";
const travelAdvisorHost = "travel-advisor.p.rapidapi.com";
const travelAdvisorKey = "";

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
            // console.log(successResponse);
            for (let i = 0; i < successResponse.data.length; i++) {
                let image = successResponse.data[i].photo.images.original.url;
                let hotelName = successResponse.data[i].name;
                let hotelId = successResponse.data[i].location_id;
                let hotelAddress = successResponse.data[i].address;
                let rating = successResponse.data[i].rating;
                if (image == undefined) {
                    continue;
                } else {
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

                }
            }
        }
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