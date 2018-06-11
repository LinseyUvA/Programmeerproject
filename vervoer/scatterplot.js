function scatterplot(vervoerswijze, provincie){
  dataVervoerswijze = []
  for (var i = 0; i < vervoerswijze.length; i++) {
    if (vervoerswijze[i].Periode == "2010" && vervoerswijze[i].Provincie == provincie && vervoerswijze[i].Vervoerswijze == "Totaal") {
      dataVervoerswijze.push(vervoerswijze[i]);
    };
  };
  // maak een SVG element
  var svg = d3.select("#scatterplotContainer")
              .append("svg")
              .attr("height", hoogte)
              .attr("width", breedte);

  dataVervoerswijze.forEach(function(d) {
    d["Reisduur"] = parseFloat(d["Reisduur"]);
    d["Afstand"] = parseInt(d["Afstand"]);
  });

  // maak een schaalfunctie voor de x waarden
  var x = d3.scaleLinear()
            .domain([d3.min(dataVervoerswijze, function(d) {
              return d["Afstand"];}), d3.max(dataVervoerswijze, function(d) {
              return d["Afstand"];})])
            .range([marge.links, grafiekBreedte + marge.links]);


  // maak een schaalfunctie voor de y waarden
  var y = d3.scaleLinear()
            .domain([d3.min(dataVervoerswijze, function(d) {
              return d["Reisduur"];}), d3.max(dataVervoerswijze, function(d) {
              return d["Reisduur"];})])
            .range([grafiekHoogte + marge.boven, marge.boven])

  // creëer een x-as
  var asX = d3.axisBottom(x);

  // voeg de x-as en waarden toe
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + 0 + "," + (grafiekHoogte + marge.boven)  + ")")
     .call(asX)
     .attr("font-size", "10px");

  // // geef de x-as een titel
  // svg.append("text")
  //    .attr("x", breedte / 2 )
  //    .attr("y",  y(0) + marge.beneden - 3)
  //    .style("text-anchor", "middle")
  //    .text("Afstand (kilometers)");

  // creëer een y-as
  var asY = d3.axisLeft(y);

  // voeg de y-as en waarden toe
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + marge.links + "," + 0 + ")")
     .call(asY)
     .attr("font-size", "10px");

  // geef de y-as een titel
  svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 + marge.rechts)
     .attr("x", 0 - (hoogte / 2))
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .text("Reisduur (minuten)");

   // // voeg een titel aan de scatterplot toe
   // svg.append("text")
   //    .attr("class", "title")
   //    .attr("x", breedte / 2 )
   //    .attr("y", marge.boven / 2)
   //    .attr("font-size", "18px")
   //    .attr("text-anchor", "middle")
   //    .text("De relatie tussen de afstand en de de reisduur per provincie");

  // maak de cirkels voor de scatterplot
  svg.selectAll("circle")
     .data(dataVervoerswijze)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
       return x(d["Afstand"]); })
     .attr("cy", function(d) {
       return y(d["Reisduur"]); })
     .attr("r", 5)
     .attr("fill", "rgb(190,186,218)")
     .attr("stroke", "Black")
     .on("mouseover", function() {
       infoKnop.style("display", null);
       d3.select(this).style("fill", "SlateGrey");})
     .on("mouseout", function() {
       infoKnop.style("display", "none");
       d3.select(this).style("fill", "rgb(190,186,218)");});

   // creëer een infoKnop
   var infoKnop = svg.append("g")
       .attr("class", "tooltipje")
       .style("display", "none");

   // voeg de informatie toe aan de infoKnop
   infoKnop.append("text")
     .attr("x", 40)
     .attr("dy", "1.2em");
}
