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

  // stel een kleur vast voor ieder cijfer voor levens voldoening
  var bucketKleur = []
  for (var i = 0; i < dataReizigers.length; i++) {
    if (parseInt(dataReizigers[i].Afstand) < 8) {
      dataReizigers[i]["bucketKleur"] = "rgb(218,218,235)";
    }
    if (parseInt(dataReizigers[i].Afstand) > 7.9 && parseInt(dataReizigers[i].Afstand) < 16) {
      dataReizigers[i]["bucketKleur"] = "rgb(188,189,220)";
    }
    if (parseInt(dataReizigers[i].Afstand) > 15.9 && parseInt(dataReizigers[i].Afstand) < 24) {
      dataReizigers[i]["bucketKleur"] = "rgb(158,154,200)";
    }
    if (parseInt(dataReizigers[i].Afstand) > 23.9 && parseInt(dataReizigers[i].Afstand) < 32) {
      dataReizigers[i]["bucketKleur"] = "rgb(117,107,177)";
    }
    if (parseInt(dataReizigers[i].Afstand) > 31.9) {
      dataReizigers[i]["bucketKleur"] = "rgb(84,39,143)";
    }
  }


  var svg = d3.selectAll("#Zeeland, #Noord-Holland, #Zuid-Holland, #Flevoland, #Utrecht, #Noord-Brabant, #Friesland, #Groningen, #Drenthe, #Overijssel, #Gelderland, #Limburg")
              .attr("class", "kaart")
              .data(dataReizigers)
              .style("fill", function(d) {
                return d["bucketKleur"];})

              // maak de staven interactief
              .on("mouseover", function() {
                infoKnop.style("display", null);
                d3.select(this).style("stroke-width", 1.5);})
              .on("mouseout", function() {
                infoKnop.style("display", null);
                d3.select(this).style("stroke-width", 1)
                d3.select(this).style("fill", function(d) {
                  return d["bucketKleur"];});})
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
                   console.log(val);
                   d3.select(".tooltipje").remove();
                   kaart(reizigerskilometers, vervoerswijze, val);
                   updateRingdiagram(reizigerskilometers, vervoerswijze, "Nederland", val);
                   update(vervoerswijze, "Nederland", "Totaal", val);
                   })

   var g = d3.select("#sliderContainer")
             .append("svg")
             .attr("width", 600)
             .attr("height", 100)
             .append("g")
             .attr("transform", "translate(30,30)");

   g.call(slider);

   // d3.select("#sliderContainer").on("click", () => slider.value(50));
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
