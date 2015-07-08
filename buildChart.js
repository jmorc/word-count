(function(){
    d3.select(".chart")
        .attr("width", 420)
        .attr("height", 150)
        .append("g")
        .attr("id", "chartFrame")
        .attr("transform", "translate(" + 100 + "," + 20 + ")");
})();