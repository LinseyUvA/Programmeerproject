/*
 * Naam: Linsey Schaap
 * Studentnummer: 11036109
 *
 * Dit script...
 *
 * Bronnen:
 * https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518
 * http://d3-legend.susielu.com/
**/
var slider1;

function kaart(reizigerskilometers, vervoerswijze, jaar) {

  // creëer een infoKnop
  var infoKnop = d3.select("#kaartContainer").append("g")
                   .attr("class", "tooltipje");

  dataReizigers = [];
  for (var i = 0; i < reizigerskilometers.length; i++) {
    if (reizigerskilometers[i].Periode == jaar && reizigerskilometers[i].Vervoerswijze == "Totaal") {
      dataReizigers.push(reizigerskilometers[i]);
    };
  };

  var kleur = d3.scaleLinear()
                .domain([3,38])
                .range(["rgb(198,219,239)", "rgb(8,81,156)"]);

  var svg = d3.selectAll("#Zeeland, #Noord-Holland, #Zuid-Holland, #Flevoland, #Utrecht, #Noord-Brabant, #Friesland, #Groningen, #Drenthe, #Overijssel, #Gelderland, #Limburg")
              .attr("class", "kaart")
              .data(dataReizigers)
              .style("fill", function(d) {
                return kleur(d.Afstand);})

              // maak de staven interactief
              .on("mouseover", function() {
                infoKnop.style("display", null);
                d3.select(this).style("stroke-width", 1.5);})

              .on("mouseout", function() {
                infoKnop.style("display", null);
                d3.select(this).style("stroke-width", 1)
                d3.select(this).style("fill", function(d) {
                  return kleur(d.Afstand);});})
              .on("mousemove", function(d) {
                infoKnop.html("Er in " + d.Provincie + "<br/>zijn er " + d.Afstand + "<br/> reizigerskilometers <br/>");})
              .on("click", function(d) {
                provincie = d.Provincie
                d3.select(".tooltipje3").html("Selectie: " + provincie);
                updateRingdiagram(reizigerskilometers, vervoerswijze, provincie, jaar);
                update(vervoerswijze, provincie, "Totaal", jaar);})

}

function slider(reizigerskilometers, vervoerswijze) {
  // marges vast leggen
  var marge = {boven: 50, beneden: 20, rechts: 60, links: 160};
  var grafiekHoogte = hoogte - marge.boven - marge.beneden;
  var grafiekBreedte = breedte - marge.rechts - marge.links;

  var svg = d3.select("#sliderContainer")
              .attr("width", grafiekBreedte + marge.links + marge.rechts)
              .attr("height", grafiekHoogte + marge.boven + marge.beneden);

  slider1 = d3.sliderHorizontal()
                 .min(2010)
                 .max(2014)
                 .step(1)
                 .width(400)
                 .tickFormat(d3.format(""))
                 .ticks(5)
                 .on("onchange", val => {
                   d3.select(".tooltipje").remove();
                   d3.select(".tooltipje3").remove();
                   kaart(reizigerskilometers, vervoerswijze, val);
                   updateRingdiagram(reizigerskilometers, vervoerswijze, provincie, val);
                   update(vervoerswijze, provincie, "Totaal", val);
                   })

   var g = d3.select("#sliderContainer")
             .append("svg")
             .attr("id", "timTest")
             .attr("width", 600)
             .attr("height", 65)
             .append("g")
             .attr("transform", "translate(30,30)");

   g.call(slider1);
}

function legenda() {
  var schaal = d3.scaleLinear()
                 .domain([3,38])
                 .range(["rgb(198,219,239)", "rgb(8,81,156)"]);

  var g = d3.select("#sliderContainer")
            .append("svg")
            .attr("width", 600)
            .attr("height", 65)
            .append("g")
            .attr("transform", "translate(30,30)");

  var legenda = d3.legendColor()
                  .shapeWidth(49)
                  .cells(8)
                  .orient('horizontal')
                  .scale(schaal);

  g.call(legenda);
}

function reset(reizigerskilometers, vervoerswijze, middel, jaar) {
  provincie = "Nederland";
  d3.select(".tooltipje").remove();
  d3.select(".tooltipje3").remove();
  slider1.value(2010);

  d3.selectAll(".myCheckbox")
    .property("checked", true)

  kaart(reizigerskilometers, vervoerswijze, jaar);
  updateRingdiagram(reizigerskilometers, vervoerswijze, provincie, jaar);
  update(vervoerswijze, provincie, middel, jaar);
}
