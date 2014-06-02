var tooltip = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("display", "none")
    .style("position", "absolute")
    .html("<label><span id=\"tt_county\"></span></label>");

var rateById = d3.map();

// var quantize = d3.scale.quantize()
//     .domain([0, 3])
//     .range(d3.range(3).map(function(i) {return "q" + i;}));

var width = 960, height = 600;

var proj = d3.geo.mercator().center([105, 38]).scale(750).translate([width/2, height/2]);
var path = d3.geo.path().projection(proj);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

queue()
    .defer(d3.json, "data/china_cities.json")
    .defer(d3.json, "data/china_provinces.json")
    .defer(d3.csv, "data/china_cities.csv", function(d) {rateById.set(d.id, +d.value);})
    .await(makeMap);

function makeMap(error, counties, states) {
    svg.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(counties.features)
        .enter()
        .append("path")
        .attr("class", function(d) { return "q" + rateById.get(d.id); })
        .attr("d", path)
        // .attr("id", function(d) {return d.id;})
        .on("mouseover", function(d) {
            var m = d3.mouse(d3.select("body").node());
            tooltip.style("display", null)
                .style("left", m[0] + 10 + "px")
                .style("top", m[1] - 10 + "px");
            $("#tt_county").text(d.properties.name);
        })
        .on("mouseout", function() {
            tooltip.style("display", "none");
        });

    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(states.features)
        .enter()
        .append("path")
        .attr("d", path)
}
