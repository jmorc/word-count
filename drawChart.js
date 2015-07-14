(function(){
    
    // oneDayAgo is hard-coded because the API does not seem to return 
    // keywords from the past day (it looks like the latest ones are March
    // in one data set I examined)

    window.drawChart = function (data, keywords) {
        window.chartData = [];
        var oneDayAgo = new Date('Tue Feb 06 2015 10:49:01 GMT-0700 (PDT)');
        var counts = {};
        var wordCounts = [];
        var barHeight = 20;
        var margin = {top: 20, right: 30, bottom: 30, left: 100};
        var width = 420 - margin.left - margin.right;
        var height = barHeight * keywords.length;

        for (var i = 0; i < data.mentions.length; i++ ) {
          if (new Date(data.mentions[i].time) > oneDayAgo) {
              if ( counts[data.mentions[i].keyword] ) {
                  counts[data.mentions[i].keyword] += 1;
              } else {
                  counts[data.mentions[i].keyword] = 1
              }
          }
        }

        for ( var i = 0; i < keywords.length; i++ ) {
            wordCounts.push(counts[keywords[i]]);
        }

        for ( var i = 0; i < keywords.length; i++ ) {
            chartData[i] = {};
            chartData[i].name = keywords[i];
            chartData[i].count = wordCounts[i];
        }

        var range = [90];
        for ( var i = keywords.length - 1; i > 0; i-- ) {
            range.unshift(range[0] - 20)
        }

        var max = d3.max(wordCounts);
        var x = d3.scale.linear()
                  .domain([0, max])
                  .range([0, width]);
        var y = d3.scale.ordinal()
                  .domain(keywords)
                  .range(range);

        var chart = d3.select("#chartFrame");
        var bar = chart.selectAll("g.bar")
             .data(chartData, function(d) { return d.name });

        bar.enter().append("svg:g")
            .classed("bar", true)
            .attr("transform", function(d, i) { return "translate(0," + (y(d.name) - barHeight/2) + ")"; });

        bar.append("svg:rect")
            .attr("width", function(d) { return x(d.count); })
            .attr("height", barHeight - 1);

        bar.append("svg:text")
                .attr("x", function(d) { return x(d.count) - 3; })
                .attr("y", barHeight / 2)
                .attr("dy", ".35em")
                .text(function(d) { return d.count; });

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
    
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
    
        chart.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
    
        chart.append("svg:g")
            .attr("class", "y axis")
            .call(yAxis);
    }
})();
