//Settings for the currencty stuff:

fx.base = "RUB";

fx.settings = {
    from : "RUB",
    to : "EUR"
};

function getAllRates (saint) {
    var metroEur = (fx.convert(saint.metro)).toFixed(2);
    console.log(metroEur);
}

//Settings for the countUp.js

var options = {
    useEasing : true,
    useGrouping : true,
    separator : '',
    decimal : '.',
    prefix : '',
    suffix : '€'
};

//Object with prices and all of shit

var saint = {
    welcome: 0,
    metro: 35,
    hermitage: 600,
    uber: 300,
    radissonRoyalBlueBusiness: 8300,
    hostel: 500,
    palkinbigdinner: 8400,
};

saintArr = Object.keys(saint);

//Main code

$(function () {

    //Menu generation


    //Money stuff
    $.getJSON(
        // NB: using Open Exchange Rates here, but you can use any source!
        'https://openexchangerates.org/api/latest.json?app_id=dc24bad74a9649f79f29784c7d935106',
        function(data) {
            if ( typeof fx !== "undefined" && fx.rates ) {
                fx.rates = data.rates;
                fx.base = data.base;
            } else {
                var fxSetup = {
                    rates : data.rates,
                    base : data.base
                };

            }
        }
    ).done(function () {
        //var blya = parseFloat((fx.convert(saint.metro)).toFixed(2));
        //var demo = new CountUp('one', 0, 0, 2, 0.7, options);
        //demo.update(blya);
        //demo.start();
    });

    //Animation stuff
    $('#fullpage').fullpage({
        anchors: saintArr,
        scrollingSpeed: 1000,
        easing: 'easeInElastic',
        css3: false,
        //menu: '#myMenu',
        navigation: true,
        //navigationPosition: 'left',
        //@todo: тут получше дописать
        navigationTooltips: saintArr,
        showActiveTooltip: false,

        afterLoad: function(anchorLink, index){
            for (i in saintArr) {
                var saintArrPos = saintArr[i];
                if (anchorLink == saintArrPos && saintArrPos != 'welcome') {
                    var blya = parseFloat((fx.convert(saint[saintArrPos]).toFixed(2)));
                    var tagname = 's' + saintArrPos;
                    //console.log(tagname);
                    var myCounter = new CountUp(tagname, 0, blya, 2, 0.7, options);
                    myCounter.start();
                }
            }
        }
    });
});


//@todo: обернуть всё в объект - возможно
//@todo: шаблонизация