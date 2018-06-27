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

// initialiseer een slider voor zowel de slider als de reset knop
var sliderJaren;

// functie die de kaart maakt
function kaart(reizigerskilometers, vervoerswijze, jaar) {

  // creëer een infoKnop voor extra info over de provincie
  var infoKnopKaart = d3.select("#kaartContainer").append("g")
                   .attr("class", "tooltipje");

  // creëer een infoKnop om aan te geven waar op wordt geselecteerd
  var infoKnopSelectie = d3.select("#kaartContainer").append("g")
                    .attr("class", "tooltipje3");

  // filter voor de juiste data
  dataReizigers = reizigerskilometers.filter(function(d,i) {
    return (d.Periode == jaar && d.Vervoerswijze == "Totaal");
  });

  // creëer een kleurschema
  var kleur = d3.scaleLinear()
                .domain([3,38])
                .range(["rgb(198,219,239)", "rgb(8,81,156)"]);

  // koppel de data aan de provincies
  var svg = d3.selectAll("#Zeeland, #Noord-Holland, #Zuid-Holland, #Flevoland, #Utrecht, \
                         #Noord-Brabant, #Friesland, #Groningen, #Drenthe, #Overijssel, \
                         #Gelderland, #Limburg")
              .attr("class", "kaart")
              .data(dataReizigers)
              .style("fill", function(d) {
                return kleur(d.Afstand);})

              // maak de staven interactief
              .on("mouseover", function() {
                infoKnopKaart.style("display", null);
                d3.select(this).style("stroke-width", 1.5);})
              .on("mouseout", function() {
                infoKnopKaart.style("display", null);
                d3.select(this).style("stroke-width", 1)
                d3.select(this).style("fill", function(d) {
                  return kleur(d.Afstand);});})
              .on("mousemove", function(d) {
                infoKnopKaart.html("Er worden in " + d.Provincie + "<br/> " + d.Afstand +
                                   " miljard <br/> reizigerskilometers afgelegd<br/>");})
              .on("click", function(d) {
                provincie = d.Provincie;
                d3.select(".tooltipje3").html("Selectie: " + provincie);
                updateRingdiagram(reizigerskilometers, vervoerswijze, provincie, jaar);
                checkbox(vervoerswijze, provincie, "Totaal", jaar);})
};

// maak een legenda aan voor de kaart
function legenda() {

  // creëer een kleurschaal voor de legenda
  var schaal = d3.scaleLinear()
                 .domain([3,38])
                 .range(["rgb(198,219,239)", "rgb(8,81,156)"]);

  // voeg een svg toe voor de slider
  var g = d3.select("#sliderContainer")
            .append("svg")
            .attr("width", 600)
            .attr("height", 65)
            .append("g")
            .attr("transform", "translate(30,30)");

  // creëer de layout van de slider
  var legenda = d3.legendColor()
                  .shapeWidth(49)
                  .cells(8)
                  .orient("horizontal")
                  .scale(schaal);

  g.call(legenda);
};

// functie voor het aanmaken van een slider voor de jaren 2010 t/m 2014
function slider(reizigerskilometers, vervoerswijze) {

  // marges vast leggen
  var marge = {boven: 50, beneden: 20, rechts: 60, links: 160};
  var grafiekHoogte = hoogte - marge.boven - marge.beneden;
  var grafiekBreedte = breedte - marge.rechts - marge.links;

  // maak een SVG element
  var svg = d3.select("#sliderContaine")
              .attr("width", grafiekBreedte + marge.links + marge.rechts)
              .attr("height", grafiekHoogte + marge.boven + marge.beneden);

  // creëer de layout van de slider
  sliderJaren = d3.sliderHorizontal()
                 .min(2010)
                 .max(2014)
                 .step(1)
                 .width(400)
                 .tickFormat(d3.format(""))
                 .ticks(5)
                 .on("onchange", val => {
                   d3.select(".tooltipje").remove();
                   d3.select(".tooltipje3").html("Selectie: " + provincie);
                   kaart(reizigerskilometers, vervoerswijze, val);
                   updateRingdiagram(reizigerskilometers, vervoerswijze, provincie, val);
                   checkbox(vervoerswijze, provincie, "Totaal", val);})

  // maak een svg voor de slider
  var g = d3.select("#sliderContainer")
            .append("svg")
            .attr("width", 600)
            .attr("height", 65)
            .append("g")
            .attr("transform", "translate(30,30)");

   g.call(sliderJaren);
};

// funcie die alle waarden terug zet naar 2010 en Nederland
function reset(reizigerskilometers, vervoerswijze) {

  // zet alle waarden terug
  provincie = "Nederland";
  middel = "Totaal";
  jaar = "2010";

  // verwijder alle tooltips
  d3.select(".tooltipje").remove();
  d3.select(".tooltipje3").remove();

  // zet de slider terug naar 2010
  sliderJaren.value(2010);

  // zet alle vinkjes in checkbox weer aan
  d3.selectAll(".myCheckbox")
    .property("checked", true)

  // roep alle visualisatie aan voor de nieuwe waarden
  kaart(reizigerskilometers, vervoerswijze, jaar);
  updateRingdiagram(reizigerskilometers, vervoerswijze, provincie, jaar);
  checkbox(vervoerswijze, provincie, middel, jaar);
}
