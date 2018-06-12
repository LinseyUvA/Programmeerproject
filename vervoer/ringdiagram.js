/*
 * Naam: Linsey Schaap
 * Studentnummer: 11036109
 *
 * Dit script...
 *
**/

function ringdiagram(reizigerskilometers, provincie){

  // marges vast leggen
  var marge = {boven: 50, beneden: 20, rechts: 60, links: 160};
  var grafiekHoogte = hoogte - marge.boven - marge.beneden;
  var grafiekBreedte = breedte - marge.rechts - marge.links;
  var straal = grafiekBreedte / 2;
  var arc = d3.arc()
              .outerRadius(straal - 10)
              .innerRadius(straal - 50);

  dataReizigers = [];
  for (var i = 0; i < reizigerskilometers.length; i++) {
    if (reizigerskilometers[i].Periode == "2010" && reizigerskilometers[i].Provincie == provincie && reizigerskilometers[i].Vervoerswijze != "Totaal") {
      dataReizigers.push(reizigerskilometers[i]);
    };
  };

  var kleur = d3.scaleOrdinal()
                .range(["rgb(141,211,199)","rgb(255,255,179)","rgb(190,186,218)","rgb(251,128,114)","rgb(128,177,211)","rgb(253,180,98)","rgb(179,222,105)","rgb(252,205,229)","rgb(217,217,217)","rgb(188,128,189)","rgb(204,235,197)","rgb(255,237,111)"]);

  var pie = d3.pie()
              .value(function(d){return d.Afstand})
              .sort(null);

  // creëer een format voor een afbeelding
  var svg = d3.select("#ringdiagramContainer")
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
                         infoKnop.style("display", null);
                         d3.select(this).style("stroke", "SlateGrey");})
                       .on("mouseout", function() {
                         infoKnop.style("display", "none");
                         d3.select(this).style("stroke", null);})
                       .on("mousemove", function(d) {
                         var xPos = d3.mouse(this)[0] - marge.rechts;
                         var yPos = d3.mouse(this)[1] - marge.beneden;
                         infoKnop.attr("transform", "translate(" + xPos + "," + yPos + ")")
                         infoKnop.select("text").text(d.data.Afstand + " km");});

  ring.append("path")
             .attr("d", arc)
             .attr("fill", function(d) {return kleur(d.data.Vervoerswijze)});

   // voeg een ondertitel aan de staafdiagram toe
   svg.append("text")
      .attr("class", "ondertitel")
      .text(provincie)
      .style("text-anchor", "middle");

  // creëer een infoKnop
  var infoKnop = svg.append("g")
      .attr("class", "tooltipje")
      .style("display", "none");

  // voeg de informatie toe aan de infoKnop
  infoKnop.append("text")
    .attr("x", 40)
    .attr("dy", "1.2em");

  vervoer = ["Auto (bestuurder)", "Auto (passagier)", "Trein", "Bus/tram/metro", "Brom-/snorfiets", "Fiets", "Lopen"]

  // maak legenda voor de kleuren
  var legenda = svg.append("g")
                   .attr("class", "legend")

  // maak de vakjes voor de legenda
  legenda.selectAll("rect")
          .data(vervoer)
          .enter().append("rect")
          .attr("height", 8)
          .attr("width", 8)
          .attr("x", -260)
          .attr("y", function(d, i) {
            return i * 16 - 110
          })
          .style("fill", kleur);

  // voeg tekst toe aan de legenda
  legenda.selectAll("text")
         .data(vervoer)
         .enter()
         .append("text")
         .attr("x", -250)
         .attr("y", function(d, i) {
           return i * 16 - 107})
         .attr("dy", ".35em")
         .text(function(d,i) {
           return vervoer[i]})
}
