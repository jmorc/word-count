    var oneDayAgo = new Date('Tue Feb 06 2015 10:49:01 GMT-0700 (PDT)');
    // oneDayAgo is hard-coded because the API does not seem to return 
    // keywords from the past day (it looks like the latest ones are March
    // in one data set I examined)

    function drawChart(data, keywords) {
        var counts = {};
        var maxCount = 0;
        var wordCounts = [];
    
        for (var i = 0; i < data.mentions.length; i++ ) {
          if (new Date(data.mentions[i].time) > oneDayAgo) {
              if ( counts[data.mentions[i].keyword] ) {
                  counts[data.mentions[i].keyword] += 1;
              } else {
                  counts[data.mentions[i].keyword] = 1
              }
          }
        }

        if ( typeof keywords === 'undefined' ) {
            keywords = [];
            for ( entry in counts ) {
                keywords.push(entry);
                wordCounts.push(counts[entry]);
            }
        } else {
            for ( var i = 0; i < keywords.length; i++ ) {
                wordCounts.push(counts[keywords[i]]);
            }
        }

        var range = [10];
        for ( var i = 1; i < keywords.length; i++ ) {
            range.push((i * 20) + 10)
        }

        console.log(wordCounts)
        console.log(keywords)

        var min = d3.min(wordCounts);
        var max = d3.max(wordCounts);
    
        var barHeight = 20;
        var margin = {top: 20, right: 30, bottom: 30, left: 100},
            width = 420 - margin.left - margin.right,
            height = barHeight * keywords.length;
    
        var x = d3.scale.linear()
            .domain([0, max])
            .range([0, width]);
    
        var y = d3.scale.ordinal()
            .domain(keywords)
            .range(range);

        var chart = d3.select("#chartFrame");

        // var chart = d3.select(".chart")
        //     .attr("width", width + margin.left + margin.right)
        //     .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = chart.selectAll(".bar")
        .data(wordCounts)

    var newBars = bar.enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })

    newBars.append("rect")
        .attr("width", x)
        .attr("height", barHeight - 1)

    newBars.append("text")
        .attr("x", function(d) { return x(d) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d; })
        .style('color', 'white');

    bar.exit().remove();

    axes = chart.selectAll('.axis');
    axes.remove();

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
    
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
    
        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
    
        chart.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    }


    var form = document.getElementById('select_form');

    form.addEventListener("submit", function(event) {
        var keywords = [];
        event.preventDefault();
        var options = document.getElementById("selector").selectedOptions;

        for (var i = 0; i < options.length; i++) {
            keywords.push(options[i].value)
        }

        d3.json('./data.json', function(error, data) {
            if ( error ) {
                return console.warn(error);
            } else {
                drawChart(data, keywords);
            }
        });
    });