(function(){
    d3.json('http://accuvit-frontend-challenge.herokuapp.com/', function(error, data) {
        if ( error ) {
            return console.warn(error);
        } else {
            window.my_data = data;
            drawChart(my_data);
        }
    });
})();