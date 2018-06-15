# Voortgang

Linsey Schaap (11036109)

## Week 1
### Woensdag
* Design document afgemaakt
* Begonnen aan ringdiagram
  * tooltip achter ringen
  * tekst van tooltip valt buiten het beeld (marge rechts vergroten zorgt voor kleinere ringdiagram)

  ![](doc/tooltipAchterRing.PNG)

* Tooltip kaart absoluut gemaakt maar nog niet op de juiste plek

![](doc/tooltipkaart.PNG)

### Donderdag
* Verder gegaan aan de ringdiagram
  * Update functie doet het nu als er op de kaart wordt geklikt
  * Tooltip staat nu voor de ringen
  * Er zijn 4 provincies; Utrecht, Zeeland, Groningen en Friesland die twee rode blokken hebben

 ![](doc/rodeBlokken.PNG)

* Begonnen aan de scatterplot, maar problemen met de tooltip die niet wilt verschijnen wanner je met je muis over een cirkel beweegt

## Week 2
### Maandag
* Verder aan de ringdiagram
  * De fout van de twee kleuren is er nu uit, door kleur toe te voegen aan de hand van vervoerswijze en niet aan de afstand, hierdoor kregen vervoerswijze met dezelfde afstand dezelfde kleur. En de diagram sorteert niet meer op afstand, hierdoor kan er beter worden vergeleken tussen de provincies.
  * Moeite met een transition. Krijg het niet voor elkaar om dat toe te passen

* Bootstrap toegevoegd
  * Begin gemaakt aan layout
  * Krijg de visualisaties niet binnen de verschillende secties. Met hulp erachter gekomen dat een element niet aan de body moet worden toegewezen, maar aan de juiste container

### Dinsdag
* Layout
  * De visualisaties staan nu allemaal op de juiste plek
* Verder gegaan aan de scatterplot
  * Update functie aangemaakt, waarbij de assen een trasition hebben, maar de cirkels nog niet.
  * Tooltip 2 klopt nog niet, omdat hij altijd aangeeft dat het om Nederland gaat
  * Een checkbox toegevoegd (werkt nog niet optimaal, omdat hij bij het klikken op een nieuwe provincies alle cirkels weer laat zien, ongeacht of er delen in de checkbox uit staan)

### Woensdag
* Scatterplot
  * De tooltip verdwijnt nu zodra er op een andere provincie wordt geklikt. Hierdoor staat er geen foutieve infomatie meer.
  * De checkbox doet het nu goed, ook wanneer er op een andere provincie wordt geklikt
  * Er wordt een foutmelding gegeven wanneer er geen enkel vinkje meer staat aangevinkt in de checkbox, maar hij gaat daarna alsnog weg (moet nog aangepast worden)
* Ringdiagram
  * Iedere ring heeft nu een onclick functie of geeft een foutmelding als er geen info over te vinden is.
  * Wanneer de klikfunctie wordt gebruikt wordt er aangegeven op welke functie is geklikt. De plek waar dit wordt geprint kan effectiever.

 ![](doc/printVervoerswijze.PNG)

### Donderdag
* Slider
  * Onderzoek gedaan naar verschillende sliders en een aantal proberen te implementeren, maar nog zonder succes. Later verder aan werken met behulp van een nieuwe bron die ik heb gevonden.

![](doc/slider.PNG)
