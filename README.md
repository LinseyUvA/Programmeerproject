# Programmeerproject
Linsey Schaap (11036109)

## Probleemstelling
Dagelijkse verplaatst men zich, maar het werk, voor boodschappen of om een hobby of sport uit te kunnen oefenen. Maar in welke provincie leggen ze de meeste kilometers of en op welke manier doet men dit. Met deze visualisatie wordt dit in kaart gebracht. Aan de hand van de visualisaties kunnen conclusies worden getrokken die voor de desbetreffende persoon relevant kunnen zijn. Zoals het kiezen van snelste vervoerswijze op dat moment of in de juiste provincie een fietswinkel beginnen.

## Oplossing
Om erachter te komen hoe de Nederlander zich verplaatst, wordt in kaart gebracht hoeveel reizigerskilometers er per provincie worden afgelegd, welke vervoerswijze wordt gebruikt en op welk tijdstip van de week en dag dit plaats vindt.

![](doc/Schets.PNG)

Op de kaart is voor verscheidene jaren te zien hoeveel reizigerskilometers er per provincie worden afgelegd. De provincies zijn aanklikbaar waarna in een ringdiagram te zien is op welke wijze men zich vervoerd en tegelijkertijd wordt in een scatterplot zichtbaar hoe de verhouding is tussen de hoeveelheid minuten en het aantal kilometers. Als er op een vervoerswijze in de ringdiagram wordt geklikt zal de scatterplot worden geüpdatet voor de desbetreffende vervoerswijze.

### Functies
* Er kan uit verscheidene jaartallen gekozen worden waarna de kleur van de kaart zal worden geüpdatet.
* Op de kaart kan geklikt worden, hiermee verschijnt de ringdiagram en de scatterplot.
* In de scatterplot kan door middel van de checkbox onderscheid worden gemaakt in dagen of tijdstippen.
* In de ringdiagram kan op een aantal vervoerswijze geklikt worden wat zal zorgen voor een update van de scatterplot.

## Vereisten
### Data
De data is verkregen via het CBS via onderstaande linken:
* https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83497ned/table?ts=1528104865883
* https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83498ned/table?ts=1528113717793
Voor de visualisatie wordt gebruik gemaakt van alle provincies voor de jaren 2010 tot en met 2014 waarbij gekeken wordt naar de gegevens per persoon per jaar. Bij kenmerken van verplaatsing wordt alleen gekeken naar doordeweekse dagen en alle tijdstippen op 0 tot 7 uur na.

### Externe componenten
* colorbrewer
* bootstrap

### Gerelateerde visualisaties
De Vervoerregio Amsterdam heeft de Regionale Thermometer Mobiliteit gepubliceerd. Met behulp van deze visualisatie wordt een beeld geschets van hoe de Amsterdammers zich verplaatsen. Hierbij maken zij onderandere gebruik van kaaten, puntdiagrammen en ringdiagrammen. Er zijn echter geen functie voor de gebruiker die ervoor zorgen dat de visualisatie interactief wordt. (file:///C:/Users/Linsey/Downloads/regionale-thermometer-mobiliteit-2017.pdf)
Een andere vergelijkbare visualisatie is die van het Kennisinstituut voor Mobiliteitsbeleid. Zij laten met behulp van een gestapelde lijn grafiek zien hoe de verdeling is tussen de verschillende vervoerswijzen. Door over de grafiek te bewegen zijn precieze hoeveelheden te zien. (https://www.kimnet.nl/mobiliteitsbeeld#personenvervoer-article1)

### Moeilijkste onderdelen
