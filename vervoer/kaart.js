/*
 * Naam: Linsey Schaap
 * Studentnummer: 11036109
 *
 * Dit script...
 *
**/
function kaart(reizigerskilometers, vervoerswijze) {
  // creëer een infoKnop
  var infoKnop = d3.select("#kaartContainer").append("g")
                   .attr("class", "tooltipje");

  dataReizigers = [];
  for (var i = 0; i < reizigerskilometers.length; i++) {
    if (reizigerskilometers[i].Periode == "2010" && reizigerskilometers[i].Vervoerswijze == "Totaal") {
      dataReizigers.push(reizigerskilometers[i]);
    };
  };

  var svg = d3.selectAll("#Zeeland, #Noord-Holland, #Zuid-Holland, #Flevoland, #Utrecht, #Noord-Brabant, #Friesland, #Groningen, #Drenthe, #Overijssel, #Gelderland, #Limburg")
              .attr("class", "kaart")
              .style("fill", "rgb(190,186,218)")
              .data(dataReizigers)
              // maak de staven interactief
              .on("mouseover", function() {
                infoKnop.style("display", null);
                d3.select(this).style("fill", "SlateGray");})
              .on("mouseout", function() {
                infoKnop.style("display", null);
                d3.select(this).style("fill", "rgb(190,186,218)");})
              .on("mousemove", function(d) {
                infoKnop.html("Er in " + d.Provincie + " zijn er " + d.Afstand + " reizigerskilometers <br/>");})
              .on("click", function(d) {
                d3.selectAll(".tooltipje3").remove()
                updateRingdiagram(reizigerskilometers, vervoerswijze, d.Provincie);
                update(vervoerswijze, d.Provincie, "Totaal");})
}

function slider() {
  // marges vast leggen
  var marge = {boven: 50, beneden: 20, rechts: 60, links: 160};
  var grafiekHoogte = hoogte - marge.boven - marge.beneden;
  var grafiekBreedte = breedte - marge.rechts - marge.links;

  // var svg = d3.select("#sliderContainer")
  //   .append("svg")
  //   .attr("width", grafiekBreedte + marge.links + marge.rechts)
  //   .attr("height", grafiekHoogte + marge.boven + marge.beneden);
  //
  // var formatDateIntoYear = d3.timeFormat("%Y")
  //
  // var startDatum = new Date("2010");
  // var eindDatum = new Date("2014");
  //
  // var moving = false;
  // var currentValue = 0;
  // var targetValue = grafiekBreedte;
  //
  // var playButton = d3.select("#play-button");
  //
  // var x = d3.scaleTime()
  //     .domain([startDatum, eindDatum])
  //     .range([0, targetValue])
  //     .clamp(true);
  //
  // var slider = svg.append("g")
  //     .attr("class", "slider")
  //     .attr("transform", "translate(" + marge.links + "," + grafiekHoogte/5 + ")");
  //
  // slider.append("line")
  //     .attr("class", "track")
  //     .attr("x1", x.range()[0])
  //     .attr("x2", x.range()[1])
  //     .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
  //     .attr("class", "track-inset")
  //     .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
  //     .attr("class", "track-overlay")
  //     .call(d3.drag()
  //         .on("start.interrupt", function() { slider.interrupt(); })
  //         .on("start drag", function() {
  //           currentValue = d3.event.x;
  //           update(x.invert(currentValue));
  //         })
  //     );
  //
  // slider.insert("g", ".track-overlay")
  //     .attr("class", "ticks")
  //     .attr("transform", "translate(0," + 18 + ")")
  //     .selectAll("text")
  //     .data(x.ticks(4))
  //     .enter()
  //     .append("text")
  //     .attr("x", x)
  //     .attr("y", 10)
  //     .attr("text-anchor", "middle")
  //     .text(function(d) { return formatDateIntoYear(d); });
  //
  // var handle = slider.insert("circle", ".track-overlay")
  //     .attr("class", "handle")
  //     .attr("r", 9);
  //
  // var label = slider.append("text")
  //     .attr("class", "label")
  //     .attr("text-anchor", "middle")
  //     .text(formatDateIntoYear(startDatum))
  //     .attr("transform", "translate(0," + (-25) + ")")
}
