# Name: Linsey Schaap
# Student number: 11036109
"""
This script convert a csv file into a JSON format.
"""

import csv
import json


csvbestand = open("reizigerskilometers.csv", "r")
jsonbestand = open("reizigerskilometers.json", "w")

namen = ("Vervoerswijze", "Periode", "Provincie", "Afstand")
bestand = csv.DictReader(csvbestand, namen)

# Parse the CSV into JSON
out = json.dumps( [ regel for regel in bestand ] )
# Save the JSON
jsonbestand.write('{"data": ' + out + '}')
