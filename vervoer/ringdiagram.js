/*
 * Naam: Linsey Schaap
 * Studentnummer: 11036109
 *
 * Dit script...
 *
**/

function ringdiagram(reizigerskilometers, provincie){
  dataReizigers = [];
  for (var i = 0; i < reizigerskilometers.length; i++) {
    if (reizigerskilometers[i].Periode == "2010" && reizigerskilometers[i].Provincie == provincie && reizigerskilometers[i].Vervoerswijze != "Totaal") {
      dataReizigers.push(reizigerskilometers[i]);
    };
  };

  var kleur = d3.scaleOrdinal()
                .range(["rgb(141,211,199)","rgb(255,255,179)","rgb(190,186,218)","rgb(251,128,114)","rgb(128,177,211)","rgb(253,180,98)","rgb(179,222,105)","rgb(252,205,229)","rgb(217,217,217)","rgb(188,128,189)","rgb(204,235,197)","rgb(255,237,111)"]);

  var pie = d3.pie()
              .value(function(d){return d.Afstand});

  // creëer een format voor een afbeelding
  var svg = d3.select("body")
              .append("svg")
              .attr("class", "diagram")
              .attr("height", hoogte)
              .attr("width", breedte)
              .append("g")
              .attr("transform", "translate(" + grafiekBreedte + "," + (grafiekHoogte - straal/2) + ")");

  var ring = svg.selectAll("arc")
                       .data(pie(dataReizigers))
                       .enter()
                       .append("g")
                       .attr("class", "arc")
                       // maak de staven interactief
                       .on("mouseover", function() {
                         infoKnop2.style("display", null);
                         d3.select(this).style("stroke", "SlateGrey");})
                       .on("mouseout", function() {
                         infoKnop2.style("display", "none");
                         d3.select(this).style("stroke", null);})
                       .on("mousemove", function(d) {
                         var xPos = d3.mouse(this)[0] - marge.rechts;
                         var yPos = d3.mouse(this)[1] - marge.beneden;
                         infoKnop2.attr("transform", "translate(" + xPos + "," + yPos + ")")
                         infoKnop2.select("text").text(d.data.Vervoerswijze + ": " + d.data.Afstand + " km");});

  ring.append("path")
             .attr("d", arc)
             .attr("fill", function(d) {return kleur(d.data.Afstand)});

   // voeg een ondertitel aan de staafdiagram toe
   svg.append("text")
      .attr("class", "ondertitel")
      .text(provincie)
      .style("text-anchor", "middle");

  // creëer een infoKnop
  var infoKnop2 = svg.append("g")
      .attr("class", "tooltipje")
      .style("display", "none");

  // voeg de informatie toe aan de infoKnop
  infoKnop2.append("text")
    .attr("x", straal / 2)
    .attr("dy", "1.2em");
}
