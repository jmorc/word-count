(function(){
    
    // oneDayAgo is hard-coded because the API does not seem to return 
    // keywords from the past day (it looks like the latest ones are March
    // in one data set I examined)

    window.redrawChart = function (chartData, keywords) {
        var oneDayAgo = new Date('Tue Feb 06 2015 10:49:01 GMT-0700 (PDT)');
        var counts = {};
        var maxCount = 0;
        var wordCounts = [];
        var barHeight = 20;
        var margin = {top: 20, right: 30, bottom: 30, left: 100};
        var width = 420 - margin.left - margin.right;
        var height = barHeight * keywords.length;
        var redrawData = [];
        var k = 0;
        var max = 0;

        for ( var i = 0; i < 5; i++ ) {
            if ( chartData[i].count > max ) max = chartData[i].count;
            for ( var j = 0; j < keywords.length; j++ ) {
                if ( keywords[j] === chartData[i].name ) {
                    redrawData[k] = {};
                    redrawData[k].name = keywords[j];
                    redrawData[k].count = chartData[i].count;
                    k += 1;
                }
            }
        }

        var range = [90];
        for ( var i = keywords.length - 1; i > 0; i-- ) {
            range.unshift(range[0] - 20)
        }

        var x = d3.scale.linear()
                  .domain([0, max])
                  .range([0, width]);

        var y = d3.scale.ordinal()
                  .domain(keywords)
                  .range(range);

        var chart = d3.select("#chartFrame");

        chart.selectAll('g.bar').selectAll('text').remove();
        var axes = chart.selectAll('.y.axis');
        axes.remove();

        var bar = chart.selectAll("g.bar")
             .data(redrawData, function(d) { return d.name });

        bar.enter()
            .append("svg:g")
            .classed("bar", true)
               .append("svg:rect")
               .attr("width", function(d) { return x(d.count); })
               .attr("height", barHeight - 1);

        bar.append("svg:text")
                .attr("x", function(d) { return x(d.count) - 3; })
                .attr("y", barHeight / 2)
                .attr("dy", ".35em")
                .text(function(d) { return d.count; });

        bar.transition()
           .duration(1000)
           .attr("transform", function(d, i) { return "translate(0," + (y(d.name) - barHeight/2) + ")"; })

        bar.exit().remove()

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        chart.append("svg:g")
            .attr("class", "y axis")
            .call(yAxis);
    }
})();