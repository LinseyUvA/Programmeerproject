/*
 * Naam: Linsey Schaap
 * Studentnummer: 11036109
 *
 * Dit script...
 *
**/

function scatterplot(vervoerswijze, provincie, middel, jaar){

  // marges vast leggen
  var marge = {boven: 20, beneden: 20, rechts: 20, links: 20};
  var grafiekHoogte = hoogte - marge.boven - marge.beneden;
  var grafiekBreedte = breedte - marge.rechts - marge.links;

  // filter voor de juiste data
  dataVervoerswijze = vervoerswijze.filter(function(d,i) {
    return (d.Periode == jaar && d.Provincie == provincie && d.Vervoerswijze == "Totaal");
  });

  // maak een SVG element
  var svg = d3.select("#scatterplotContainer")
              .append("svg")
              .attr("height", hoogte)
              .attr("width", breedte);

  // lees de data als getallen
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
     .attr("class", "xAs")
     .attr("transform", "translate(" + 0 + "," + (grafiekHoogte + marge.boven)  + ")")
     .call(asX);

  // geef de x-as een titel
  svg.append("text")
     .attr("class", "titelAs")
     .attr("x", (breedte + marge.links) / 2 )
     .attr("y", grafiekHoogte + marge.boven - 3)
     .text("Afstand (kilometers)");

  // creëer een y-as
  var asY = d3.axisLeft(y);

  // voeg de y-as en waarden toe
  svg.append("g")
     .attr("class", "yAs")
     .attr("transform", "translate(" + marge.links + "," + 0 + ")")
     .call(asY);

  // geef de y-as een titel
  svg.append("text")
     .attr("class", "titelAs")
     .attr("transform", "rotate(-90)")
     .attr("y", marge.rechts)
     .attr("x", 0 - (hoogte / 2))
     .attr("dy", "1em")
     .text("Reisduur (minuten)");

   dagen = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag"]
   tijden = ["7 tot 9 uur", "9 tot 12 uur", "12 tot 16 uur", "16 tot 18 uur", "18 tot 24 uur"]

   // stel een kleur vast voor ieder cijfer voor levens voldoening
   var bucketKleur = []
   for (var i = 0; i < dataVervoerswijze.length; i++) {
     if (dagen.includes(dataVervoerswijze[i].Verplaatsing)) {
       dataVervoerswijze[i]["bucketKleur"] = "rgb(89, 140, 192)";
     }
     if (tijden.includes(dataVervoerswijze[i].Verplaatsing)) {
       dataVervoerswijze[i]["bucketKleur"] = "#79CF6E";
     }
   }


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
     .attr("id", function(d){
       if (parseInt(d.Verplaatsing[0])){
         return d.Verplaatsing.slice(2).replace(/\s+/g, '');}
       return d.Verplaatsing})
     .attr("fill", function(d) {
       return d["bucketKleur"];})
     .attr("stroke", "Black")

     // maak de datapunten interactief
     .on("mouseover", function() {
       infoKnopScatter.style("display", null);
       d3.select(this).style("r", 10);})
     .on("mouseout", function() {
       infoKnopScatter.style("display", "none");
       d3.select(this).style("r", 5)})
     .on("mousemove", function(d) {
       var xPos = d3.mouse(this)[0] - marge.rechts;
       var yPos = d3.mouse(this)[1] - marge.beneden;
       infoKnopScatter.attr("transform", "translate(" + xPos + "," + yPos + ")")
       infoKnopScatter.select("text").text(d.Verplaatsing);})
     .on("click", function(d) {
       infoKnopScatterSelectie.html("<br/>Er wordt in " + d.Provincie + " op "
                                    + d.Verplaatsing + " " + d.Afstand + " km afgelegd in "
                                    + d.Reisduur + " minuten<br/>");});

   d3.selectAll(".myCheckbox")
     .property("checked", true)
     .on("mouseover", function() {
       if (parseInt(this.value[0])){
         var waarde = this.value.slice(2).replace(/\s+/g, '');}
       else {
         var waarde = this.value;}
       d3.select("#" + waarde)
         .style("r", 10);})
     .on("mouseout", function() {
       d3.selectAll("circle")
         .style("r", 5)})
     .on("change", function() {
       update(vervoerswijze, provincie, "Totaal", jaar)})

   // creëer een infoKnop
   var infoKnopScatter = svg.append("g")
                            .attr("class", "tooltipje")
                            .style("display", "none");

   // voeg de informatie toe aan de infoKnop
   infoKnopScatter.append("text")
                  .attr("x", 15)
                  .attr("dy", "1.2em");

   var infoKnopScatterSelectie = d3.select("#scatterplotContainer").append("g")
                                   .attr("class", "tooltipje2");
}

function update(dataVervoerswijze, provincie, middel, jaar){
  var choices = [];
  d3.selectAll(".myCheckbox").each(function(d){
    cb = d3.select(this);
    if(cb.property("checked")){
      choices.push(cb.property("value"));
    }
  });

  data = ["maandag","dinsdag","woensdag","donderdag","vrijdag", "7 tot 9 uur",
          "9 tot 12 uur", "12 tot 16 uur", "16 tot 18 uur", "18 tot 24 uur"];

  console.log(data)

  if(choices.length > 0){
    d3.selectAll(".myCheckbox").each(function(d) {
      cb = d3.select(this)
      cb["_groups"]["0"]["0"].disabled = false;
      newData = data.filter(function(d,i){return choices.includes(d);});
    })
  }
  if (choices.length == 2) {
    d3.selectAll(".myCheckbox").each(function(d) {
      cb = d3.select(this)
      if (cb.property("checked")){
        cb["_groups"]["0"]["0"].disabled = true;
      }
    })
  }

  updateScatterplot(dataVervoerswijze, newData, provincie, middel, jaar)
}

function updateScatterplot(vervoerswijze, dataFilter, provincie, middel, jaar){
  d3.selectAll(".tooltipje2").remove()

  // marges vast leggen
  var marge = {boven: 20, beneden: 20, rechts: 20, links: 20};
  var grafiekHoogte = hoogte - marge.boven - marge.beneden;
  var grafiekBreedte = breedte - marge.rechts - marge.links;

  // filter voor de juiste data
  dataVervoer = vervoerswijze.filter(function(d,i) {
    return (d.Periode == jaar && d.Provincie == provincie && d.Vervoerswijze == middel
      && dataFilter.includes(d.Verplaatsing));
  })

  // maak een SVG element
  var svg = d3.select("#scatterplotContainer")
              .select("svg")
              .attr("height", hoogte)
              .attr("width", breedte);

  // lees de data als getallen
  dataVervoer.forEach(function(d) {
    d["Reisduur"] = parseFloat(d["Reisduur"]);
    d["Afstand"] = parseInt(d["Afstand"]);
  });

  // maak een schaalfunctie voor de x waarden
  var x = d3.scaleLinear()
            .domain([d3.min(dataVervoer, function(d) {
              return d["Afstand"];}), d3.max(dataVervoer, function(d) {
              return d["Afstand"];})])
            .range([marge.links, grafiekBreedte + marge.links]);

  // maak een schaalfunctie voor de y waarden
  var y = d3.scaleLinear()
            .domain([d3.min(dataVervoer, function(d) {
              return d["Reisduur"];}), d3.max(dataVervoer, function(d) {
              return d["Reisduur"];})])
            .range([grafiekHoogte + marge.boven, marge.boven])

  // creëer een x-as
  var asX = d3.axisBottom(x)

  // voeg de x-as en waarden toe
  svg.select(".xAs")
     .transition()
     .duration(500)
     .call(asX)
     .attr("font-size", "10px");

  // creëer een y-as
  var asY = d3.axisLeft(y);

  // voeg de y-as en waarden toe
  svg.select(".yAs")
     .transition()
     .duration(500)
     .call(asY)
     .attr("font-size", "10px");

  dagen = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag"]
  tijden = ["7 tot 9 uur", "9 tot 12 uur", "12 tot 16 uur", "16 tot 18 uur", "18 tot 24 uur"]

  // stel een kleur vast voor ieder cijfer voor levens voldoening
  var bucketKleur = []
  for (var i = 0; i < dataVervoer.length; i++) {
    if (dagen.includes(dataVervoer[i].Verplaatsing)) {
      dataVervoer[i]["bucketKleur"] = "rgb(89, 140, 192)";
    }
    if (tijden.includes(dataVervoer[i].Verplaatsing)) {
      dataVervoer[i]["bucketKleur"] = "#79CF6E";
    }
  }

  // maak de cirkels voor de scatterplot
  var cirkel = svg.selectAll("circle").data(dataVervoer);

  cirkel.exit().remove();

  cirkel.enter()
        .append("circle")
        .merge(cirkel)
        .transition()
        .duration(500)
        .attr("cx", function(d) {
          return x(d["Afstand"]); })
        .attr("cy", function(d) {
          return y(d["Reisduur"]); })
        .attr("r", 5)
        .attr("fill", function(d) {
          return d["bucketKleur"];})
        .attr("stroke", "Black")
        .attr("id", function(d){
          if (parseInt(d.Verplaatsing[0])){
            return d.Verplaatsing.slice(2).replace(/\s+/g, '');}
          return d.Verplaatsing})

  // maak de datapunten interactief
  d3.selectAll("circle")
    .on("mouseover", function() {
      infoKnopScatter.style("display", null);
      d3.select(this).style("r", 10);})
    .on("mouseout", function() {
      infoKnopScatter.style("display", "none");
      d3.select(this).style("r", 5)})
    .on("mousemove", function(d) {
        var xPos = d3.mouse(this)[0] - marge.rechts;
        var yPos = d3.mouse(this)[1] - marge.beneden;
        infoKnopScatter.attr("transform", "translate(" + xPos + "," + yPos + ")")
        infoKnopScatter.select("text").text(d.Verplaatsing);})
    .on("click", function(d) {
      infoKnopScatterSelectie.html("<br/>Er wordt in " + d.Provincie + " op "
                                   + d.Verplaatsing + " " + d.Afstand + " km afgelegd in "
                                   + d.Reisduur + " minuten<br/>");});

  d3.selectAll(".myCheckbox")
    .on("mouseover", function() {
      if (parseInt(this.value[0])){
        var waarde = this.value.slice(2).replace(/\s+/g, '');}
      else {
        var waarde = this.value;}
      d3.select("#" + waarde)
        .style("r", 10);})
    .on("mouseout", function() {
      d3.selectAll("circle")
        .style("r", 5)})

  // creëer een infoKnop
  var infoKnopScatter = svg.append("g")
                           .attr("class", "tooltipje")
                           .style("display", "none");

  // voeg de informatie toe aan de infoKnop
  infoKnopScatter.append("text")
                 .attr("x", 15)
                 .attr("dy", "1.2em");

  var infoKnopScatterSelectie = d3.select("#scatterplotContainer").append("g")
                                  .attr("class", "tooltipje2");

}
