var tooltip = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("display", "none")
    .style("position", "absolute")
    .html("<label><span id=\"tt_county\"></span></label>");

var rateById = d3.map();
var nameById = d3.map();

var width = 960, height = 600;

var proj = d3.geo.albersUsa().scale(1000).translate([width/2, height/2]);
var path = d3.geo.path().projection(proj);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.csv, "data/us_counties.csv", function(d) {
        rateById.set(d.id, +d.value);
        nameById.set(d.id, d.name);})
    .await(makeMap);

function makeMap(error, us) {
    svg.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter()
        .append("path")
        .attr("class", function(d) { return "q" + rateById.get(d.id); })
        .attr("d", path)
        .on("mouseover", function(d) {
            var m = d3.mouse(d3.select("body").node());
            tooltip.style("display", null)
                .style("left", m[0] + 10 + "px")
                .style("top", m[1] - 10 + "px");
            // $("#tt_county").text(d.id + ": " + nameById.get(d.id));
            $("#tt_county").text(nameById.get(d.id));
        })
        .on("mouseout", function() {
            tooltip.style("display", "none");
        });

    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter()
        .append("path")
        .attr("d", path)
}
