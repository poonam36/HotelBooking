const pricePerPersonPerDay = 1000;
let urlParams = new URLSearchParams(window.location.search);


function payNow() {
    alert("Hi your booking is successfull!!");
}
window.addEventListener('load',getHotelDetails);
function fillDetails(){
   const diffDays = sessionStorage.getItem("diffDays");
   const price = sessionStorage.getItem("price");
   //?adults=3&name=atul&datefrom=2022-07-12&dateto=2022-07-20
  const adults = urlParams.get('adults');
  const name = urlParams.get('name');
  const datefrom = urlParams.get('datefrom');
  const dateto = urlParams.get('dateto');
  const tariff = "Rs 1000 x "+ adults +" Adults x "+ diffDays+ "Nights";
  document.getElementById("name").innerHTML = name;
  document.getElementById("adults").innerHTML = adults;
  document.getElementById("dateFrom").innerHTML = datefrom;
  document.getElementById("dateTo").innerHTML = dateto;
  document.getElementById("tariff").innerHTML = tariff;
  document.getElementById("price").innerHTML = price;
}

function getHotelDetails(){
    fillDetails();
   const hotelAddress = sessionStorage.getItem("hotelAddress");
   const hotelName = sessionStorage.getItem("hotelName");
   const image = sessionStorage.getItem("hotelImage");
   document.getElementById("hotelName").innerHTML = hotelName;
   document.getElementById("hotelAddress").innerHTML = hotelAddress;
   document.getElementById("hotelImage").setAttribute("src",image);

}