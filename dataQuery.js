(function(){
    d3.json('http://accuvit-frontend-challenge.herokuapp.com/', function(error, data) {
        if ( error ) {
            return console.warn(error);
        } else {
            window.my_data = data;
            document.getElementsByClassName("loader")[0].style.display = 'none';
            drawChart(my_data);
        }
    });
})();