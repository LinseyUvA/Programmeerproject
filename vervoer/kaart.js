/*
 * Naam: Linsey Schaap
 * Studentnummer: 11036109
 *
 * Dit script...
 *
**/
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
                updateRingdiagram(reizigerskilometers, vervoerswijze, d.Provincie, jaar);
                update(vervoerswijze, d.Provincie, "Totaal", jaar);})

  updateSlider(reizigerskilometers, vervoerswijze);
}

function slider(reizigerskilometers, vervoerswijze) {

  // marges vast leggen
  var marge = {boven: 50, beneden: 20, rechts: 60, links: 160};
  var grafiekHoogte = hoogte - marge.boven - marge.beneden;
  var grafiekBreedte = breedte - marge.rechts - marge.links;

  var svg = d3.select("#sliderContainer")
    .attr("width", grafiekBreedte + marge.links + marge.rechts)
    .attr("height", grafiekHoogte + marge.boven + marge.beneden);

  var slider = d3.sliderHorizontal()
                 .min(2010)
                 .max(2014)
                 .step(1)
                 .width(400)
                 .tickFormat(d3.format(""))
                 .ticks(5)
                 .on("onchange", val => {
                   console.log(val)
                   d3.select(".tooltipje").remove()
                   kaart(reizigerskilometers, vervoerswijze, val)
                   updateRingdiagram(reizigerskilometers, vervoerswijze, "Nederland", val)
                   update(vervoerswijze, "Nederland", "Totaal", val)
                   })

   var g = d3.select("#sliderContainer")
             .append("svg")
             .attr("width", 600)
             .attr("height", 100)
             .append("g")
             .attr("transform", "translate(30,30)")

   g.call(slider);

   d3.select("#sliderContainer").on("click", () => slider.value(5));
}

function updateSlider(reizigerskilometers, vervoerswijze, provincie) {

  // marges vast leggen
  var marge = {boven: 50, beneden: 20, rechts: 60, links: 160};
  var grafiekHoogte = hoogte - marge.boven - marge.beneden;
  var grafiekBreedte = breedte - marge.rechts - marge.links;

  var svg = d3.select("#sliderContainer")
    .attr("width", grafiekBreedte + marge.links + marge.rechts)
    .attr("height", grafiekHoogte + marge.boven + marge.beneden);

  var slider = d3.sliderHorizontal()
                 .min(2010)
                 .max(2014)
                 .step(1)
                 .width(400)
                 .tickFormat(d3.format(""))
                 .ticks(5)
                 .on("onchange", val => {
                   console.log(val)
                   d3.select(".tooltipje").remove()
                   kaart(reizigerskilometers, vervoerswijze, val)
                   updateRingdiagram(reizigerskilometers, vervoerswijze, provincie, val)
                   update(vervoerswijze, provincie, "Totaal", val)
                   })

   var g = d3.select("#sliderContainer")
             .select("svg")
             .attr("width", 600)
             .attr("height", 100)
             .select("g")
             .attr("transform", "translate(30,30)")

   g.call(slider);

   d3.select("#sliderContainer").on("click", () => slider.value(5));
}
