
> Diese Seite bei [https://eugen-w.github.io/calliope-callibot/](https://eugen-w.github.io/calliope-callibot/) öffnen

## Als Erweiterung verwenden

Dieses Repository kann als **Erweiterung** in MakeCode hinzugefügt werden.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Neues Projekt**
* klicke auf **Erweiterungen** unter dem Zahnrad-Menü
* nach **https://github.com/eugen-w/calliope-callibot** suchen und importieren

## Dieses Projekt bearbeiten ![Build Status Abzeichen](https://github.com/eugen-w/calliope-callibot/workflows/MakeCode/badge.svg)

Um dieses Repository in MakeCode zu bearbeiten.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Importieren** und dann auf **Importiere URL**
* füge **https://github.com/eugen-w/calliope-callibot** ein und klicke auf Importieren

## Blockvorschau

Dieses Bild zeigt den Blockcode vom letzten Commit im Master an.
Die Aktualisierung dieses Bildes kann einige Minuten dauern.

![Eine gerenderte Ansicht der Blöcke](https://github.com/eugen-w/calliope-callibot/raw/master/.github/makecode/blocks.png)

#### Metadaten (verwendet für Suche, Rendering)

* for PXT/calliopemini
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

### To do Liste
- Der Bot soll per knopf druck an und aus gemacht werden können (erledigt)
- Der Bot soll von der Mitte der Plane aus Starten können und wenn er den fetten Kreis trifft soll er entlang dieses Kreis fahren (erledigt)
- Der Bot soll automatisch nach einer bestimmten Zeit aufhören zu fahren (erledigt)
- Der Bot soll anhalten, wenn ein Gegenstand vor ihm steht. (erledigt)

## Variablen
### Zeit
Timer der ab Knopfdruck von A läuft. Bei 0 ist der Timer abgelaufen und der Roboter hält an.
### fahren
0 Bedeutet, dass der Roboter nicht fährt. Bei 1 fährt er. Kann Zurzeit über die Knöpfe A und B verämdert werden.
### kreisgefunden
Wenn kreisgefunden auf 1 ist, beudeutet es, dass der Roboter sich endgültig auf dem Kreis befindet.
### kreisTimer
Ein Timer, der startet, wenn die Sensoren auf einer dunklen Fläche sind. Wenn der Timer 0 ist, ist er abgelaufen.

## Ideen für weitere Funktionen des Calli Bots
### Den Bot zu musik tanzen lassen
### Den Bot koordinaten geben können zu denen er dann fährt auf der Plane
