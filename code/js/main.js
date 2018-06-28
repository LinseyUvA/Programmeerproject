/*
 * Naam: Linsey Schaap
 * Studentnummer: 11036109
 *
 * Dit script haalt de gegevens op van het aantal reizigerskilometers en de vervoerswijze.
 * Hierbij wordt onderscheid gemaakt tussen verschillende provincies en jaren.
 * Vervolgens worden alle visualisaties opgeroepen.
 *
**/

// stel hoogte en breedte vast
var hoogte = 300;
var breedte = 500;

// zet provincie vast
var provincie = "Nederland";

window.onload = function() {

  // laad alle bestanden in
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

    // roep de kaart en de knop aan
    document.getElementById("kaartContainer").appendChild(response[2].documentElement);
    document.getElementById("knop").onclick = function() {reset(reizigerskilometers, vervoerswijze)};

    // roep alle visualisatie aan
    slider(reizigerskilometers, vervoerswijze);
    legenda();
    kaart(reizigerskilometers, vervoerswijze, "2010");
    ringdiagram(reizigerskilometers, vervoerswijze, provincie, "2010");
    scatterplot(vervoerswijze, provincie, "Totaal", "2010");
  };
};
