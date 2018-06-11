/*
 * Naam: Linsey Schaap
 * Studentnummer: 11036109
 *
 * Dit script haalt de gegevens op van het aantal overnachtingen dat plaats vindt in Nederland.
 * Hierbij wordt onderscheid gemaakt tussen verschillende landen en het soort hotel waar deze gasten in verblijven.
 *
**/
// stel hoogte en breedte vast
var hoogte = 300;
var breedte = 500;

// marges vast leggen
var marge = {boven: 70, beneden: 20, rechts: 120, links: 120};
var grafiekHoogte = hoogte - marge.boven - marge.beneden;
var grafiekBreedte = breedte - marge.rechts - marge.links;
var straal = grafiekBreedte / 2;
var arc = d3.arc()
            .outerRadius(straal - 10)
            .innerRadius(straal - 50);

window.onload = function() {

  d3.queue()
    .defer(d3.json, "reizigerskilometers.json")
    .defer(d3.json, "vervoerswijze.json")
    .defer(d3.xml, "Netherlands.svg")
    .awaitAll(grafieken);

  function grafieken(error, response) {
    if (error) throw error;

    // data opslaan
    var reizigerskilometers = response["0"]["data"];
    var vervoerswijze = response["1"]["data"];
    document.body.appendChild(response[2].documentElement);
    kaart(reizigerskilometers);
    ringdiagram(reizigerskilometers, "Nederland");
    scatterplot(vervoerswijze, "Nederland");
  };
};

function updateRingdiagram(reizigerskilometers, provincie){
  dataReizigers = [];
  for (var i = 0; i < reizigerskilometers.length; i++) {
    if (reizigerskilometers[i].Periode == "2010" && reizigerskilometers[i].Provincie == provincie && reizigerskilometers[i].Vervoerswijze != "Totaal") {
      dataReizigers.push(reizigerskilometers[i]);
    };
  };
  d3.selectAll(".arc").remove();

  // selecteer het figuur waar aanpassingen aan gedaan worden
  var svg = d3.select("body")
              .select(".diagram")
              .attr("height", hoogte)
              .attr("width", breedte)
              .append("g")
              .attr("transform", "translate(" + grafiekBreedte + "," + (grafiekHoogte - straal/2) + ")");

  var kleur = d3.scaleOrdinal()
                .range(["rgb(141,211,199)","rgb(255,255,179)","rgb(190,186,218)","rgb(251,128,114)","rgb(128,177,211)","rgb(253,180,98)","rgb(179,222,105)","rgb(252,205,229)","rgb(217,217,217)","rgb(188,128,189)","rgb(204,235,197)","rgb(255,237,111)"])

  var pie = d3.pie()
              .value(function(d){return d.Afstand})
              .sort(null);

  var ring = svg.selectAll(".arc")
                .data(pie(dataReizigers))
                .enter()
                .append("g")
                .attr("class", "arc")
                // maak de staven interactief
                .on("mouseover", function() {
                  infoKnop.style("display", null);
                  d3.select(this).style("stroke", "SlateGrey");})
                .on("mouseout", function() {
                  infoKnop.style("display", "none");
                  d3.select(this).style("stroke", null);})
                .on("mousemove", function(d) {
                  var xPos = d3.mouse(this)[0] - marge.rechts;
                  var yPos = d3.mouse(this)[1] - marge.beneden;
                  infoKnop.attr("transform", "translate(" + xPos + "," + yPos + ")")
                  infoKnop.select("text").text(d.data.Vervoerswijze + ": " + d.data.Afstand + " km");});

  ring.append("path")
      .attr("d", arc)
      .attr("fill", function(d) {return kleur(d.data.Vervoerswijze)})
      .transition()
      .duration(300);

   // voeg een ondertitel aan de staafdiagram toe
   d3.select(".ondertitel")
      .text(provincie);

  // creëer een infoKnop
  var infoKnop = svg.append("g")
                    .attr("class", "tooltipje")
                    .style("display", "none");

  // voeg de informatie toe aan de infoKnop
  infoKnop.append("text")
          .attr("x", straal / 2)
          .attr("dy", "1.2em");
}
