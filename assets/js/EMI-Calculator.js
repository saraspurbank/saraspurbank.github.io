// Calculate Function will Calculate EMI
function Calculate() {
    var amount = Number(document.getElementById("amount").value);
    var month = Number(document.getElementById("month").value);
    var rate = Number(document.getElementById("rate").value);
    var compound = Number(document.getElementById("compound-term").value);
    var emi = (amount*(rate/(compound*100))*Math.pow(1+(rate/(compound*100)),month)/(Math.pow(1+(rate/(compound*100)),month)-1)).toFixed(2);
    var payment = (emi*month).toFixed(2);
    var interest = (payment-amount).toFixed(2);
    
    var today = new Date();
    var endDate = new Date();
    today.setMonth( today.getMonth() + 1 );
    endDate.setMonth( today.getMonth() + month );

    document.getElementById("displayAmount").innerHTML = '₹ ' + amount.toFixed(0);
    document.getElementById("displayRate").innerHTML = rate.toFixed(2) + ' %';
    document.getElementById("displayTimePeriod").innerHTML = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " - " + endDate.getDate() + "/" + endDate.getMonth() + "/" + endDate.getFullYear();
    if(emi>=0) {
        document.getElementById("displayEMI").innerHTML = '₹ ' + emi;
        document.getElementById("displayTotalInterest").innerHTML = '₹ ' + interest;
        document.getElementById("displayTotalPayment").innerHTML = '₹ ' + payment;
    }
    return false;
}