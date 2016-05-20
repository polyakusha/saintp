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

//Object with prices and all of that shit

var saint = {
    welcome: 0,
    hermitage: 600,
    boattrip: 700,
    isaak: 150,
    peterhof: 600,
    metro: 35,
    swanlake: 1000,
    moscow: 1200

};

saintArr = Object.keys(saint);

//Main code

$(function () {

    //Money stuff
    $.getJSON(
        'http://api.fixer.io/latest',
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
        //var something = parseFloat((fx.convert(saint.metro)).toFixed(2));
        //var demo = new CountUp('one', 0, 0, 2, 0.7, options);
        //demo.update(something);
        //demo.start();
    });

    //Animation stuff
    $('#fullpage').fullpage({
        anchors: saintArr,
        scrollingSpeed: 1000,
        //todo: нужно пофиксить анимацию, сейчас херово пашет
        easing: 'easeInQuart',
        css3: false,
        controlArrows: true,
        //slidesNavigation: true,
        //slidesNavPosition: 'bottom',
        //menu: '#myMenu',
        //navigation: true,
        //navigationPosition: 'left',
        //navigationTooltips: saintArr,
        //showActiveTooltip: false,


        afterLoad: function(anchorLink, index){
            for (i in saintArr) {
                var saintArrPos = saintArr[i];
                if (anchorLink == saintArrPos && saintArrPos != 'welcome') {
                    var convertMoney = parseFloat((fx.convert(saint[saintArrPos]).toFixed(2)));
                    var tagname = 's' + saintArrPos;
                    //console.log(tagname);
                    var myCounter = new CountUp(tagname, 0, convertMoney, 2, 0.7, options);
                    myCounter.start();
                }
            }
        }
    });

    $('.moveup').on('click', function(){
        $.fn.fullpage.moveSectionUp();
    });

    $('.movedown').on('click', function(){
        $.fn.fullpage.moveSectionDown();
    });

    $('.USD').on('click', function(){
        fx.settings = {
            from : "RUB",
            to : "USD"
        };
        options.suffix = "$";
    });

});

