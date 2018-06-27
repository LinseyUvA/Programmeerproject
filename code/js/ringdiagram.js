/*
 * Naam: Linsey Schaap
 * Studentnummer: 11036109
 *
 * Dit script...
 *
**/

function ringdiagram(reizigerskilometers, vervoerswijze, provincie, jaar){

  // marges vast leggen
  var marge = {boven: 50, beneden: 20, rechts: 60, links: 160};
  var grafiekHoogte = hoogte - marge.boven - marge.beneden;
  var grafiekBreedte = breedte - marge.rechts - marge.links;
  var straal = grafiekBreedte / 2;
  var arc = d3.arc()
              .outerRadius(straal - 10)
              .innerRadius(straal - 50);

  // filter voor de juiste data
  dataReizigers = reizigerskilometers.filter(function(d,i) {
    return (d.Periode == jaar && d.Provincie == provincie && d.Vervoerswijze != "Totaal");
  });

  // maak een kleurschema
  var kleur = d3.scaleOrdinal()
                .range(["#B14FC4","#A990DA","#718ED0","#81D5CB","#79CF6E","#448E2F","#2A7E53"])


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

                // maak de ringen interactief
                .on("mouseover", function() {
                  infoKnopRing.style("display", null);
                  d3.select(this).style("stroke", "Black");})
                .on("mouseout", function() {
                  infoKnopRing.style("display", "none");
                  d3.select(this).style("stroke", null);})
                .on("mousemove", function(d) {
                  var xPos = d3.mouse(this)[0] - marge.rechts;
                  var yPos = d3.mouse(this)[1] - marge.beneden;
                  infoKnopRing.attr("transform", "translate(" + xPos + "," + yPos + ")")
                  infoKnopRing.select("text").text(d.data.Afstand + " km");})
                .on("click", function(d) {
                  if (["Auto (bestuurder)", "Auto (passagier)", "Fiets", "Lopen"].includes(d.data.Vervoerswijze)) {
                    update(vervoerswijze, provincie, d.data.Vervoerswijze, jaar);
                    infoKnopSelectie.html("Selectie: " + provincie + " en " + d.data.Vervoerswijze);}
                  else {
                    update(vervoerswijze, provincie, "Totaal", jaar);
                    alert("Geen informatie over deze vervoerswijze beschikbaar")
                    infoKnopSelectie.html("Selectie: " + provincie + " en Totaal ");}
                  })

  ring.append("path")
      .attr("d", arc)
      .attr("fill", function(d) {return kleur(d.data.Vervoerswijze)});

   // voeg een ondertitel aan de staafdiagram toe
   svg.append("text")
      .attr("class", "ondertitel")
      .text(provincie);

  // creëer een infoKnop
  var infoKnopRing = svg.append("g")
                        .attr("class", "tooltipje")
                        .style("display", "none");

  // voeg de informatie toe aan de infoKnop
  infoKnopRing.append("text")
              .attr("x", 40)
              .attr("dy", "1.2em");

  var infoKnopSelectie = d3.select("#kaartContainer").append("g")
                           .attr("class", "tooltipje3");

  // tekst voor de legenda opstellen
  vervoer = ["Auto (bestuurder)", "Auto (passagier)", "Trein", "Bus/tram/metro",
             "Brom-/snorfiets", "Fiets", "Lopen"]

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
            return i * 16 - 110})
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

function updateRingdiagram(reizigerskilometers, vervoerswijze, provincie, jaar){
  // marges vast leggen
  var marge = {boven: 50, beneden: 20, rechts: 60, links: 160};
  var grafiekHoogte = hoogte - marge.boven - marge.beneden;
  var grafiekBreedte = breedte - marge.rechts - marge.links;
  var straal = grafiekBreedte / 2;
  var arc = d3.arc()
              .outerRadius(straal - 10)
              .innerRadius(straal - 50);

  // filter voor de juiste data
  dataReizigers = reizigerskilometers.filter(function(d,i) {
    return (d.Periode == jaar && d.Provincie == provincie && d.Vervoerswijze != "Totaal");
  });

  // selecteer het figuur waar aanpassingen aan gedaan worden
  var svg = d3.select("#ringdiagramContainer")
              .select(".diagram")
              .attr("height", hoogte)
              .attr("width", breedte)
              .append("g")
              .attr("transform", "translate(" + grafiekBreedte + "," + (grafiekHoogte - straal/2) + ")");

  var infoKnopSelectie = d3.select("#kaartContainer").append("g")
                           .attr("class", "tooltipje3");

  // maak een kleurschema
  var kleur = d3.scaleOrdinal()
                .range(["#B14FC4","#A990DA","#718ED0","#81D5CB","#79CF6E","#448E2F","#2A7E53"])

  var pie = d3.pie()
              .value(function(d){return d.Afstand})
              .sort(null);

  var ring = svg.selectAll(".arc")
                .data(pie(dataReizigers))
                .enter()
                .append("g")
                .attr("class", "arc")

                // maak de ringen interactief
                .on("mouseover", function() {
                  infoKnopRing.style("display", null);
                  d3.select(this).style("stroke", "Black");})
                .on("mouseout", function() {
                  infoKnopRing.style("display", "none");
                  d3.select(this).style("stroke", null);})
                .on("mousemove", function(d) {
                  var xPos = d3.mouse(this)[0] - marge.rechts;
                  var yPos = d3.mouse(this)[1] - marge.beneden;
                  infoKnopRing.attr("transform", "translate(" + xPos + "," + yPos + ")")
                  infoKnopRing.select("text").text(d.data.Afstand + " km");})
                .on("click", function(d) {
                  if (["Auto (bestuurder)", "Auto (passagier)", "Fiets", "Lopen"].includes(d.data.Vervoerswijze)) {
                    update(vervoerswijze, provincie, d.data.Vervoerswijze, jaar);
                    d3.select(".tooltipje3").html("Selectie: " + provincie + " en " + d.data.Vervoerswijze);}
                  else {
                    update(vervoerswijze, provincie, "Totaal", jaar);
                    alert("Geen informatie over deze vervoerswijze beschikbaar")
                    d3.select(".tooltipje3").html("Selectie: " + provincie + " en Totaal ");}
                  })

  ring.append("path")
      .attr("d", arc)
      .attr("fill", function(d) {return kleur(d.data.Vervoerswijze)})
      .transition()
      .duration(1500);

   // voeg een ondertitel aan de staafdiagram toe
   d3.select(".ondertitel")
     .text(provincie);

  // creëer een infoKnop
  var infoKnopRing = svg.append("g")
                        .attr("class", "tooltipje")
                        .style("display", "none");

  // voeg de informatie toe aan de infoKnop
  infoKnopRing.append("text")
              .attr("x", 40)
              .attr("dy", "1.2em");
}
