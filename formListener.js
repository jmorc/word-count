(function(){
    var form = document.getElementById('select_form');

    form.addEventListener("submit", function(event) {
        var keywords = [];
        event.preventDefault();
        var options = document.getElementById("selector").selectedOptions;
    
        for (var i = 0; i < options.length; i++) {
            keywords.push(options[i].value)
        }

        // drawChart(window.my_data, keywords);
        redrawChart(window.chartData, keywords);
    });
})();