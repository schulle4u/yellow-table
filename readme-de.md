<p align="right"><a href="readme-de.md">Deutsch</a> &nbsp; <a href="readme.md">English</a></p>

# Table 0.9.3

Erstellt Tabellen aus CSV-Daten.

<p align="center"><img src="screenshot.png" alt="Bildschirmfoto"></p>

## Wie man eine Erweiterung installiert

[ZIP-Datei herunterladen](https://github.com/schulle4u/yellow-table/archive/refs/heads/main.zip) und in dein `system/extensions`-Verzeichnis kopieren. [Weitere Informationen zu Erweiterungen](https://github.com/annaesvensson/yellow-update/tree/main/readme-de.md).

## Wie man eine Tabellendatei anzeigt

Erstelle eine `[table]`-Abkürzung. 

Die folgenden Argumente sind verfügbar, mit Ausnahme des ersten Arguments sind alle Angaben optional:

`FileName` = Name der Tabellendatei  
`RowsPerPage` = Zeilenanzahl für die Paginierung, ein Wert größer als 0 aktiviert die Funktion  
`Caption` = Ein kurzer und hilfreicher Titel für deine Tabelle  
`Class` = Klasse für die HTML-Tabelle  

Diese Erweiterung lädt eine Tabellendatei im CSV-Format und gibt sie als HTML-Tabelle aus. Für umfangreiche Datensätze stehen ein Zeilenfilter sowie Spaltensortierung und Paginierung zur Verfügung. Des Weiteren können CSV-Daten mittels eines Code-Blocks in markdown geladen werden. Falls du noch mehr Funktionen benötigst, gibt es [hier eine Erweiterung gleichen Namens](https://github.com/GiovanniSalmeri/yellow-table), entwickelt von Giovanni Salmeri. 

## Beispiele

Grundsätzliche Verwendung:

    [table tapes.csv]

Benutzerdefinierte Klasse und Caption: 

    [table tapes.csv - "Meine Kassettensammlung" MyTapes]

Hier ist eine Seite mit einer Tabelle als Code-Block:

~~~
---
Title: Länder
TableCaption: Länder
---
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna pizza. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

```table
Code,English Name,French Name
AD,Andorra,Andorre
AE,United Arab Emirates,Emirats arabes unis
AF,Afghanistan,Afghanistan
AG,Antigua and Barbuda,Antigua-et-Barbuda
AI,Anguilla,Anguilla
AL,Albania,Albanie
```
~~~

## Einstellungen

Die folgenden Einstellungen können in der Datei `system/extensions/yellow-system.ini` vorgenommen werden:

`TableDirectory` = Verzeichnis für Tabellendateien  
`TableDelimiter` = Spaltentrenner, `auto` für automatische Erkennung  
`TableFirstRowHeader` = Benutze die erste Zeile der Tabellendatei als Spaltenüberschrift, 1 oder 0  
`TableFunctions` = Schaltet Filter-, Sortierungs und Paginierungsfunktionen ein, 1 oder 0  
`TableRowsPerPage` = Zeilenanzahl für die Paginierung, ein Wert größer als 0 aktiviert die Funktion  

## Entwickler

Steffen Schultz. [Hilfe finden](https://datenstrom.se/de/yellow/help/).
