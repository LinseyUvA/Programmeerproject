/*
 * Naam: Linsey Schaap
 * Studentnummer: 11036109
 *
 * Dit script...
 *
**/
function kaart(reizigerskilometers) {
  // creëer een infoKnop
  var infoKnop = d3.select("body").append("g")
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
                infoKnop.html("Er zijn in " + d.Provincie + " zijn er " + d.Afstand + " reizigerskilometers <br/>");})
              .on("click", function(d) {
                  updateRingdiagram(reizigerskilometers, d.Provincie);})
}
