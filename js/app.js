jQuery(document).ready(init);

//Same as: jQuery(document).ready(init);

//Our application goes here:
function init() {
    let options = {
        url: "data.json",
        success: jsonHandler
    }
    let entries;

    function removeDups(names) {
        let unique = {};
        names.forEach(function (i) {
            if (!unique[i]) { unique[i] = true; }
        });
        return Object.keys(unique);
    }

    function showOptions(listOfCities) {
        //1)get datalist
        let datalist = document.querySelector("#cities");
        console.log(datalist); //Testing

        //2)loop over unique cities array
        listOfCities.map(addOption);

        function addOption(city) {
            let option = `<option value="${city}"></option>`
            datalist.innerHTML += option;
        }

        //  2.1)Inside Loop:
        //     --Create option element
        //     --Add city value
        //     --Add to datalist(innerHTML)
    }

    function jsonHandler(data) {

        function getCity(hotel) {
            return hotel.city;
            //console.log(hotel.city);
        }

        entries = data[1].entries;
        let cities = entries.map(getCity);
        let uniqueCities = removeDups(cities);

        //console.log(entries); //Array [ {HOTEL} x 4 ]

        // console.log(uniqueCities);
        showOptions(uniqueCities);
    }

    function getHotelsFromSelected(selectedCity) {
        console.log(entries, selectedCity);
    }

    function handleCityInput(e) {
        if (e.keyCode === 13) {
            let selectedCity = this.value;
            //    console.log(entries);
            //    console.log("Selected City : ",selectedCity);
            getHotelsFromSelected(selectedCity);

        }
    }
    function getHotelsFromSelected(selectedCity) {
        console.log(entries, selectedCity);

        function isHotelinCity(hotel) {
            return hotel.city.toLowerCase() === selectedCity.toLowerCase().trim();
        }
        let availableHotels = entries.filter(isHotelinCity);
        console.log(availableHotels);
        return availableHotels;

    }



    let citiesInput = document.querySelector("#inputcities");

    citiesInput.addEventListener("keydown", handleCityInput);


    $.ajax(options);
}

//Alternative,no global vars at all:
//jQuery (function init()){ ... });