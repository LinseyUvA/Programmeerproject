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
    .defer(d3.json, "vervoerswijze.json")
    .defer(d3.xml, "Netherlands.svg")
    .awaitAll(grafieken);

  function grafieken(error, response) {
    if (error) throw error;

    kaart(response)

  }
};

function kaart(response) {

  // creëer een infoKnop
  var infoKnop = d3.select("body").append("g")
                   .attr("class", "tooltipje");

  // data opslaan
  var reizigerskilometers = response["0"]["data"]
  var vervoerswijze = response["1"]["data"]
  document.body.appendChild(response[2].documentElement);

  dataReizigers = []
  for (var i = 0; i < reizigerskilometers.length; i++) {
    if (reizigerskilometers[i].Periode == "2010" && reizigerskilometers[i].Vervoerswijze == "Totaal") {
      dataReizigers.push(reizigerskilometers[i])
    }
  }
  // var kleur = d3.scaleLinear([0, 9])
  //               .range(["#dadaeb", "#3f007d"])

  var svg = d3.selectAll("#Zeeland, #Noord-Holland, #Zuid-Holland, #Flevoland, #Utrecht, #Noord-Brabant, #Friesland, #Groningen, #Drenthe, #Overijssel, #Gelderland, #Limburg")
              .style("fill", "Indigo")
              .data(dataReizigers)
              // maak de staven interactief
              .on("mouseover", function() {
                infoKnop.style("display", null);
                d3.select(this).style("fill", "SlateGray");})
              .on("mouseout", function() {
                infoKnop.style("display", null);
                d3.select(this).style("fill", "Indigo");})
              .on("mousemove", function(d) {
                infoKnop.html("Er zijn in " + d.Provincie + " zijn er " + d.Afstand + " reizigerskilometers <br/>")})

}
