(function(){
    d3.json('http://accuvit-frontend-challenge.herokuapp.com/', function(error, data) {
        if ( error ) {
            return console.warn(error);
        } else {
            document.getElementsByClassName("loader")[0].style.display = 'none';
            drawChart(data, ['peaches', 'pineapples',
                             'bananas', 'apples', 'pears']);
        }
    });
})();