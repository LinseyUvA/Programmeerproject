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

  dataReizigers = [];
  for (var i = 0; i < reizigerskilometers.length; i++) {
    if (reizigerskilometers[i].Periode == jaar && reizigerskilometers[i].Provincie == provincie && reizigerskilometers[i].Vervoerswijze != "Totaal") {
      dataReizigers.push(reizigerskilometers[i]);
    };
  };

  var kleur = d3.scaleOrdinal()
                // .range(["rgb(251,106,74)","rgb(252,146,114)","rgb(252,187,161)","rgb(254,224,210)","rgb(153,0,13)","rgb(203,24,29)","rgb(239,59,44)","rgb(217,217,217)","rgb(188,128,189)","rgb(204,235,197)","rgb(255,237,111)"])
                // .range(["#1C2454","#443399","#5C57C7","#6A81CD","#6EC6CF","#73D071","#ADDB94","rgb(217,217,217)","rgb(188,128,189)","rgb(204,235,197)","rgb(255,237,111)"])
                // .range(["#6F254F","#AC397A","#D279C1","#C2A3E0","BAE8DF","#E4D7AF","#D08E71","rgb(217,217,217)","rgb(188,128,189)","rgb(204,235,197)","rgb(255,237,111)"])
                .range(["#B14FC4","#A990DA","#718ED0","#81D5CB","#79CF6E","#448E2F","#2A7E53","rgb(217,217,217)","rgb(188,128,189)","rgb(204,235,197)","rgb(255,237,111)"])


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
                         d3.select(this).style("stroke", "Black");})
                       .on("mouseout", function() {
                         infoKnop.style("display", "none");
                         d3.select(this).style("stroke", null);})
                       .on("mousemove", function(d) {
                         var xPos = d3.mouse(this)[0] - marge.rechts;
                         var yPos = d3.mouse(this)[1] - marge.beneden;
                         infoKnop.attr("transform", "translate(" + xPos + "," + yPos + ")")
                         infoKnop.select("text").text(d.data.Afstand + " km");})
                       .on("click", function(d) {
                         if (["Auto (bestuurder)", "Auto (passagier)", "Fiets", "Lopen"].includes(d.data.Vervoerswijze)) {
                           update(vervoerswijze, provincie, d.data.Vervoerswijze, jaar);
                           infoKnop3.html("Selectie: " + provincie + " en " + d.data.Vervoerswijze);}
                         else {
                           update(vervoerswijze, provincie, "Totaal", jaar);
                           alert("Geen informatie over deze vervoerswijze beschikbaar")
                           infoKnop3.html("Selectie: " + provincie + " en Totaal ");}
                         })

  ring.append("path")
      .attr("d", arc)
      .attr("fill", function(d) {return kleur(d.data.Vervoerswijze)});

   // voeg een ondertitel aan de staafdiagram toe
   svg.append("text")
      .attr("class", "ondertitel")
      .text(provincie);

  // creëer een infoKnop
  var infoKnop = svg.append("g")
                    .attr("class", "tooltipje")
                    .style("display", "none");

  // voeg de informatie toe aan de infoKnop
  infoKnop.append("text")
          .attr("x", 40)
          .attr("dy", "1.2em");

  var infoKnop3 = d3.select("#kaartContainer").append("g")
                    .attr("class", "tooltipje3");

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

  dataReizigers = [];
  for (var i = 0; i < reizigerskilometers.length; i++) {
    if (reizigerskilometers[i].Periode == jaar && reizigerskilometers[i].Provincie == provincie && reizigerskilometers[i].Vervoerswijze != "Totaal") {
      dataReizigers.push(reizigerskilometers[i]);
    };
  };
  d3.selectAll(".arc").remove();

  // selecteer het figuur waar aanpassingen aan gedaan worden
  var svg = d3.select("#ringdiagramContainer")
              .select(".diagram")
              .attr("height", hoogte)
              .attr("width", breedte)
              .append("g")
              .attr("transform", "translate(" + grafiekBreedte + "," + (grafiekHoogte - straal/2) + ")");

  var infoKnop3 = d3.select("#kaartContainer").append("g")
                    .attr("class", "tooltipje3");

  var kleur = d3.scaleOrdinal()
                .range(["#B14FC4","#A990DA","#718ED0","#81D5CB","#79CF6E","#448E2F","#2A7E53","rgb(217,217,217)","rgb(188,128,189)","rgb(204,235,197)","rgb(255,237,111)"])

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
                  d3.select(this).style("stroke", "Black");})
                .on("mouseout", function() {
                  infoKnop.style("display", "none");
                  d3.select(this).style("stroke", null);})
                .on("mousemove", function(d) {
                  var xPos = d3.mouse(this)[0] - marge.rechts;
                  var yPos = d3.mouse(this)[1] - marge.beneden;
                  infoKnop.attr("transform", "translate(" + xPos + "," + yPos + ")")
                  infoKnop.select("text").text(d.data.Afstand + " km");})
                .on("click", function(d) {
                  // d3.select(".tooltipje3").remove();
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
  var infoKnop = svg.append("g")
                    .attr("class", "tooltipje")
                    .style("display", "none");

  // voeg de informatie toe aan de infoKnop
  infoKnop.append("text")
          .attr("x", 40)
          .attr("dy", "1.2em");
}
