/*
 * Naam: Linsey Schaap
 * Studentnummer: 11036109
 *
 * Dit script haalt de gegevens op van het aantal overnachtingen dat plaats vindt in Nederland.
 * Hierbij wordt onderscheid gemaakt tussen verschillende landen en het soort hotel waar deze gasten in verblijven.
 *
**/

window.onload = function() {

  d3.queue()
    .defer(d3.json, "reizigerskilometers.json")
    .defer(d3.xml, "Nederland.svg")
    .awaitAll(grafieken);

  function grafieken(error, response) {
    if (error) throw error;

    kaart(response)

  }
};

function kaart(response) {

  console.log(response)
  // creëer een infoKnop
  var infoKnop = d3.select("body").append("g")
                   .attr("class", "tooltipje");

  // data opslaan
  var reizigerskilometers = response["0"]["data"]
  document.body.appendChild(response[1].documentElement);

  var svg = d3.selectAll("#Noord-Holland, #Zuid-Holland, #Zeeland, #Flevoland, #Utrecht, #Noord-Brabant, #Friesland, #Groningen, #Drenthe, #Overijssel, #Gelderland, #Limburg")
              .style("fill", "Indigo")
              .data(reizigerskilometers)
              // maak de staven interactief
              .on("mouseover", function() {
                  infoKnop.style("display", null);
                  d3.select(this).style("fill", "SlateGray");})
              .on("mouseout", function() {
                  infoKnop.style("display", null);
                  d3.select(this).style("fill", "Indigo");})
              .on("mousemove", function(d) {
                  infoKnop.html("Vanuit " + d.Provincie + " overnachten duizend mensen in Nederland (2012)<br/>")})

}
