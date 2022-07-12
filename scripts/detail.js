const pricePerPersonPerDay = 1000;
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
    //if(!adult.isNaN() && !diffDays.isNaN()){
    total = pricePerPersonPerDay * adult * diffDays;
    if (isNaN(total)) {
        console.log("inside");
        total = 0;
    }
    document.getElementById("price").value = "Rs. " + total;
}
