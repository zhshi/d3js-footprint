var tooltip = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("display", "none")
    .style("position", "absolute")
    .html("<label><span id=\"tt_county\"></span></label>");

var width = 960, height = 600;

var rateCNById = d3.map();

var projCN = d3.geo.mercator().center([105, 38]).scale(750).translate([width/2, height/2]);
var pathCN = d3.geo.path().projection(projCN);

var svgCN = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

queue()
    .defer(d3.json, "data/china_cities.json")
    .defer(d3.json, "data/china_provinces.json")
    .defer(d3.csv, "data/china_cities.csv", function(d) {rateCNById.set(d.id, +d.value);})
    .await(makeCNMap);

function makeCNMap(error, counties, states) {
    svgCN.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(counties.features)
        .enter()
        .append("path")
        .attr("class", function(d) { return "q" + rateCNById.get(d.id); })
        .attr("d", pathCN)
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

    svgCN.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(states.features)
        .enter()
        .append("path")
        .attr("d", pathCN)
}


var rateUSById = d3.map();
var nameUSById = d3.map();

var projUS = d3.geo.albersUsa().scale(1000).translate([width/2, height/2]);
var pathUS = d3.geo.path().projection(projUS);

var svgUS = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.csv, "data/us_counties.csv", function(d) {
        rateUSById.set(d.id, +d.value);
        nameUSById.set(d.id, d.name);})
    .await(makeUSMap);

function makeUSMap(error, us) {
    svgUS.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter()
        .append("path")
        .attr("class", function(d) { return "q" + rateUSById.get(d.id); })
        .attr("d", pathUS)
        .on("mouseover", function(d) {
            var m = d3.mouse(d3.select("body").node());
            tooltip.style("display", null)
                .style("left", m[0] + 10 + "px")
                .style("top", m[1] - 10 + "px");
            // $("#tt_county").text(d.id + ": " + nameById.get(d.id));
            $("#tt_county").text(nameUSById.get(d.id));
        })
        .on("mouseout", function() {
            tooltip.style("display", "none");
        });

    svgUS.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter()
        .append("path")
        .attr("d", pathUS)
}
