/*
 * Naam: Linsey Schaap
 * Studentnummer: 11036109
 *
 * Dit script haalt de gegevens op van het aantal overnachtingen dat plaats vindt in Nederland.
 * Hierbij wordt onderscheid gemaakt tussen verschillende landen en het soort hotel waar deze gasten in verblijven.
 *
**/

// stel hoogte en breedte vast
var hoogte = 300;
var breedte = 500;
var provincie = "Nederland";

window.onload = function() {

  d3.queue()
    .defer(d3.json, "data/reizigerskilometers.json")
    .defer(d3.json, "data/vervoerswijze.json")
    .defer(d3.xml, "data/Netherlands.svg")
    .awaitAll(grafieken);

  function grafieken(error, response) {
    if (error) throw error;

    // data opslaan
    var reizigerskilometers = response["0"]["data"];
    var vervoerswijze = response["1"]["data"];

    document.getElementById("kaartContainer").appendChild(response[2].documentElement);
    document.getElementById("knop").onclick = function() {reset(reizigerskilometers, vervoerswijze, "Totaal", "2010")};

    slider(reizigerskilometers, vervoerswijze);
    legenda();
    kaart(reizigerskilometers, vervoerswijze, "2010");
    ringdiagram(reizigerskilometers, vervoerswijze, "Nederland", "2010");
    scatterplot(vervoerswijze, "Nederland", "Totaal", "2010");
  };
};
