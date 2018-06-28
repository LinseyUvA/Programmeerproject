# Report
## Korte beschrijving
![](doc/screenshot.jpeg)
In bovenstaaande screenshot zijn alle visualisaties te zien.
De visualisaties bestaan uit een kaart, ringdiagram en scatterplot.
Verder zijn er nog drie interactieve onderdelen, de slider, een reset knop en een checkbox.
De slider haalt de data op voor het gekozen jaar (2010 t/m 2014).
De reset knop zet alle data terug naar het jaar 2010 en voor heel Nederland.
De checkbox is onderdeel van de scatterplot.
Door boxen uit te zetten verdwijnen de desbetreffende datapunten in de scatterplot.

## Technisch design
![](doc/designDiagram.PNG) \
De kaart heeft een hover functie waarbij het aantal kilometers zichtbaar wordt voor de desbetreffende provincie.
Door te klikken op de kaart worden de ringdiagram en scatterplot geupdatet.
De ringdiagram heeft ook zowel een hover functie als klikfunctie.
Na het klikken op een onderdeel van de ring zal de scatterplot opnieuw worden geupdatet.
Voordat de scatterplot kan worden geupdatet wordt eerst de functie checkbox aangeroepen.
Deze functie bekijkt welke vinkjes aan staan en geeft deze data door aan de update functie voor de scatterplot.
Over alle visualisaties zit een slider die alle drie update.
De reset knop zet voor alle visualisatie de waarden weer terug naar 2010, Nederland en Totaal.

## Uitdagingen
Tijdens het programmeren vond ik het lastig om de tooltips op de juiste plekken te krijgen.
Soms werd er niets getoond of kwamen ze achter de visualisaties terecht.
Een ander obstakel was om transitie toe te voegen aan de scatterplot, omdat alle datapunten verdwenen wanneer ik het probeerde toe te passen.
De checkbox leverde ook wat problemen op, want het meegeven van de juiste informatie en dat weer doorgeven aan de volgende functie was niet heel intuïtief. Ook een muis functie hier aan toevoegen was lastig, maar met behulp van de assistenten kwamen we er gelukkig wel uit. \
Het grootste verschil met mijn design document is dat de interactieve delen meer tijd en opslag nodig hadden.
Vooral de checkbox die ervoor zorgde dat alle updates van de scatterplot eerst langs de functie *checkbox* moesten om ervoor te zorgen dat de juiste data werd gepresenteerd.

## Gemaakte beslissingen
Aan het begin heb ik het implementeren van de interactieve onderdelen onderschat.
Het bleek dat hier soms nog best grote functies voor moesten worden geschreven die nog best handig waren voor het updaten van bijvoorbeeld de scatterplot.
Ik heb ervoor gekozen om mijn project in meerdere functies op te delen dat ik in eerste instantie had bedacht.
Deze keuze zorgt ervoor dat mijn project leesbaarder is geworden. \
Tijdens het programmeren moest ik een keuze maken tussen statische assen bij het klikken op een checkbox en meerdere functies of één functie die de scatterplot update.
Ik ben voor de laatste optie gegaan en heb ervoor gekozen dat de gebruiker de laatste twee datapunten niet kan uitzetten.
Hierdoor hebben de assen nog steeds een enigszins normale verdeling. \
Als er meer tijd zou zijn zou ik graag nog een extra checkbox bij de scatterplot willen vroegen waar je meerdere provincies tegelijkertijd kan weergeven.
Op deze manier kan je niet alleen dagen en tijdstippen met elkaar vergelijken maar ook de provincies.
Een ander element dat ik zou willen toevoegen is een knop voor Nederland.
Deze knop zet alle waarden dan alleen terug naar Nederland.
Dus niet zoals de reset knop doet ook nog het jaar naar 2010, alle vinkjes bij de checkbox aan en alle vervoerswijze (Totaal).
