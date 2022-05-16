// AngularJS - 1.4.5
var app = angular.module('fd-calculator', []);

app.controller("myCtrl", function($scope) {
    $scope.yearValue = [ 0, 1, 2, 3 ];
    $scope.monthValue = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
    $scope.dayValue = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ];
});



// JavaScript Calculate Function to Calculate Fixed Interest
function Calculate() {
    var customerType = document.getElementsByName('customerType');
    var fdType = document.getElementById("fd-type").value;
    var amount = Number(document.getElementById("amount").value);
    var rate = 0;
    var year = Number(document.getElementById("year").value);
    var month = Number(document.getElementById("month").value);
    var day = Number(document.getElementById("day").value);
    var maturityAmount = 0;
    var interest = 0;

    var generalRate = [ 4, 4.5, 5, 5.5, 6.25, 6];
    var seniorCitizenRate = [ 4, 4.5, 5, 5.5, 6.75, 6.5];

    var depositDate = new Date();
    // depositDate.setMonth( depositDate.getMonth() + 1 );
    var maturityDate = new Date();
    maturityDate.setFullYear( depositDate.getFullYear() + year );
    maturityDate.setMonth( depositDate.getMonth() + month );
    maturityDate.setDate( depositDate.getDate() + day );
    
    var differenceDays = (maturityDate - depositDate) / (1000*24*60*60);

    if(differenceDays <15) {
        document.getElementById("displayError").innerHTML = "*Tenure will be at least 15 Days";
        return false;
    }

    document.getElementById("displayAmount").innerHTML = '₹ ' + amount.toFixed(0);
    
    if(customerType[0].checked) {
        if(differenceDays>=15 && differenceDays<=45) {
            rate = generalRate[0];
        }
        else if(differenceDays>=46 && differenceDays<=90) {
            rate = generalRate[1];
        }
        else if(differenceDays>=91 && differenceDays<=180) {
            rate = generalRate[2];
        }
        else if(differenceDays>=181 && differenceDays<=364) {
            rate = generalRate[3];
        }
        else if(differenceDays>=365 && differenceDays<=730) {
            rate = generalRate[4];
        }
        else if(differenceDays>=731) {
            rate = generalRate[5];
        }
    }
    else if(customerType[1].checked) {
        if(differenceDays>=15 && differenceDays<=45) {
            rate = seniorCitizenRate[0];
        }
        else if(differenceDays>=46 && differenceDays<=90) {
            rate = seniorCitizenRate[1];
        }
        else if(differenceDays>=91 && differenceDays<=180) {
            rate = seniorCitizenRate[2];
        }
        else if(differenceDays>=181 && differenceDays<=364) {
            rate = seniorCitizenRate[3];
        }
        else if(differenceDays>=365 && differenceDays<=730) {
            rate = seniorCitizenRate[4];
        }
        else if(differenceDays>=731) {
            rate = seniorCitizenRate[5];
        }
    }

    document.getElementById("displayRate").innerHTML = rate + ' %';
    document.getElementById("displayTimePeriod").innerHTML = depositDate.getDate() + "/" + (depositDate.getMonth()+1) + "/" + depositDate.getFullYear() + " - " + maturityDate.getDate() + "/" + (maturityDate.getMonth()+1) + "/" + maturityDate.getFullYear()

    if(fdType == 1) {
        if(differenceDays<=364) {
            interest = (amount*rate*differenceDays)/(365*100);
            maturityAmount = amount + interest;
        }
        else {
            maturityAmount = ( amount * Math.pow( 1+(rate/(100*4)) , (4*(differenceDays/365)) ) );
            interest = maturityAmount - amount;
        }
        document.getElementById("displayInterest").innerHTML = '₹ ' + interest.toFixed(0);
    }
    else if(fdType == 2) {
        maturityAmount = amount;
        interest = (amount*rate*differenceDays)/(365*100);
        document.getElementById("displayInterest").innerHTML = '₹ ' + interest.toFixed(0) + " ( ₹ " + ((amount*rate)/(4*100)).toFixed(2) + " per Quater )" ;
    }
    else if(fdType == 3) {
        maturityAmount = amount;
        interest = (amount*rate*differenceDays)/(365*100);
        document.getElementById("displayInterest").innerHTML = '₹ ' + interest.toFixed(0) + " ( ₹ " + ((amount*rate)/(12*100)).toFixed(2) + " per Month )" ;
    }

    document.getElementById("displayMaturityAmount").innerHTML = '₹ ' + maturityAmount.toFixed(0);

    document.getElementById("displayError").innerHTML = "";
}