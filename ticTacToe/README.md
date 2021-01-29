# Tic Tac Toe mit integrierter Minimax AI

TicTacToe im Browser spielen? Ähnlich revolutionär wie die Klimapolitik der CDU! Dieses Projekt enstand im Rahmen des Kurses Programmiersprachen I an der HfG Schwäbisch Gmünd. 
Bestandteil des Projektes sind variable Spielregeln (Spielfeldgröße, Punkte die benötigt sind um zu gewinnen etc.) und ein Spielmodus gegen eine AI. 

<img src="./resources/imageFiles/screenshotWin.png" width="700px">
Hier beschreibe ich, was dieses großartige Projekt tut. Weshalb es gebaut wurde. Welche Inspirationen und vorhandenen Quellen eingeflossen sind, und für wen es gemacht wurde. Ein Screenshot macht sich hier auch immer gut.

## Usage / Benutzung

Um TicTacToe spielen zu können ist es nötig das Repository lokal zu klonen und daraufhin tictactoe.html im Browser auszuführen (bevorzugt Google Chrome oder Firefox). Daraufhin sollte sich die Benutzeroberfläche zum Spielen öffnen. 
Achtung! Momentan sind nur begrenzte Spielfeld-Größen möglich (bei Player vs. Player max 10x10, im AI modus max 5x5).

## Structure / Aufbau

Wichtige Variablen bei diesem Tic Tac Toe: 

* **let gameRunning:** Eine Bool zur Feststellung ob das Spiel momentan "läuft" und in dem Zuge Klicks o.ä. zulässt.
  * `gameSizeXY`: Spielfeld-Größe
  * `p`: pointsToWin, also wieviele gleiche in einer Reihe benötigt sind um ein Spiel für sich zu entscheiden.

* **let gameField = []:** Ein Array um unser Spielfeld status zu Speichern. Wird Verwendet bei: 
  * `checkWin()`: Zur Gewinnermittlung wird das gesamte Array ausgelesen und auf "Gewinnsituationen" überprüft. 
  * `minimax(board, depth, isMaximizing)`: Zum Planen des nächsten AI-Zuges

_Zentrale Funktionen von diesem TicTacToe:_

 `function initUI(gameSizeXY, p)`: <p id="ptw">Eine</p> Funktion zur generierung des Spielfelds & Grundsatz für die Spiellogik
  * `gameSizeXY`: Spielfeld-Größe
  * `p`: pointsToWin, also wieviele gleiche in einer Reihe benötigt sind um ein Spiel für sich zu entscheiden.

Aufbauend auf dem `gameSize` Wert wird das obig beschriebene `gameField` Array generiert und die sichtbaren Zellen des Spielfelds erstellt und dargestellt. Im Anschluss werden durch die `addEventListeners()` Funktion jedem Feld bzw. jeder Zelle ein Event-Listener für Hover- und Clickevents zugewiesen. Die Event-Listener für Click Events sind für jedes Feld einzigartig, da sie beim Click ihre eigene ID übergeben, um diese später in der `handleGridClick(selGrid)` Funktion auszuwerten können.
Die ID's stehen in direkter Verbindung zum `gameField` Array, wie diese Grafik zeigt:

<img src="./resources/imageFiles/ids.png" width="700px">


`function handleGridClick(selGrid)`: Diese Funktion wird dann aufgerufen, wenn der Spieler auf eine der Zellen drückt und somit den Event-Listener dieser Zelle triggert. Der Funktion wird die selGrid (kurz für selected Grid) Variable übergeben, in diesem Fall die ID der Zelle. Daraufhin folgt die Überprüfung ob die gewählte Zelle leer ist. Sollte dem so sein, wird die Zelle mit dem Zeichen des `teamToMove` also dem aktiven Spieler besetzt. Sobald alle Style und Logik Anpassungen für den nächsten Zug getroffen wurden, wird durch die `checkForWin()` Funktion ermittelt, ob es einen Gewinner gibt.

`function checkForWin()`: Eine Funktion um den Status des aktuellen Spielfelds auszuwerten und mögliche Gewinne zu ermitteln.<br> Zunächst werden die zwei Siegesbedingungen (`winCondition1` & `winCondition2`) gesetzt, indem das Team Symbol (momentan o & b für orange und blau) so oft wiederholt wird, wieviele <a href="#ptw">pointsToWin</a> benötigt sind. Folgende drei Gewinnmöglichkeiten sind jeweils separiert: vertikaler, horizontaler oder diagonaler Gewinn, die grundlegende Logik bleibt jedoch die Selbe: Es wird das ganze Spielfeld Zeile für Zeile betrachtet (*Anmerkung: Hier könnte sich ein vermeindliches Bottleneck für größere/tiefere AI-Spiele befinden*) und in die Strings `curLineV`, `curLineH`, `curLineD` und `curLineD2` geschrieben. <br>Daraufhin wird überprüft ob einer dieser Strings unserer Siegesbedingungen enthält.
<img src="./resources/imageFiles/checkForWin.png" width="700px">
<br>
Bei der diagonalen Gewinnüberprüfung, wird bei jeder Zelle überprüft.

_(Achtung: Hier werden nur Funktionen beschrieben, die eine zentrale Rolle einnehmen.)_

Nach der Beschreibung der elementaren Bestandteile wird aus der Vogelperspektive nochmals beschrieben, welche Gesamtzustände euer System durchlaufen kann. In diesem Fall würde der User zunächst 0 bis n Personen erzeugen, und diese mit haveParty() zum Bier trinken bringen.  Dabei wird innerhalb von haveParty nacheinander für jede Person drinkBeer() aufgerufen, unter Benutzung von neuen Bier-Objekten. Nach Ende der Party muss das Programm neu gestartet werden um die Zustände zurückzusetzen.

_(Achtung, dieser Teil liest sich jetzt sehr ähnlich zur Funktionsbeschreibung von haveParty - das liegt daran dass es im Beispiel nur eine zentrale Funktion gibt. Ihr habt aber mehrere die zusammenspielen!)._

## Future Work

Was noch fehlt, und was die nächsten Schritte wären um es ggf. umzusetzen:
* Erweiterung der Party um Musik
* Berücksichtung individueller Verträglichkeiten von Bier in der Person-Klasse
* etc...
