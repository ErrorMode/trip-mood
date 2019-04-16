jQuery(document).ready(init);


//Same as: jQuery(document).ready(init);

//Our application goes here:
function init() {
    let options = {
        url: "data.json",
        success: jsonHandler
    }

    function removeDups(names) {
        let unique = {};
        names.forEach(function (i) {
            if (!unique[i]) { unique[i] = true; }
        });
        return Object.keys(unique);
    }

    function jsonHandler(data) {

        let entries = data[1].entries;
        let cities = entries.map(getCity);

        //console.log(entries); //Array [ {HOTEL} x 4 ]

        function getCity(hotel) {
            return hotel.city;
            //console.log(hotel.city);
        }

        let uniqueCities = removeDups(cities);
        console.log(uniqueCities);

    }

    $.ajax(options);
}

//Alternative,no global vars at all:
//jQuery (function init()){ ... });