# unit-4-game
JQuery game


Images credit:

Eurofighter Typhoon: Photo by Mariusz Prusaczyk on Unsplash

Dutch F-16: Photo by Marián Kvasnica on Unsplash

Mig 21: Photo by Dan on Unsplash

Mig 29 blowing up at airshow: https://www.ainonline.com/sites/default/files/uploads/2018/01/webeurofighter-typhoon-sunset.jpg by Rob Schleiffert, https://www.flickr.com/photos/109661044@N07/.

Sky Photo: by Paweł Czerwiński on Unsplash 

Photo of russian knights display team at sunset:
https://www.flickr.com/photos/mordolff/5691943705/ 


**Pseudo Code**

1. gameStart()

2. chooseCharacter() //player
  
3. moveCharacters() //separate player form opponents

4. chooseCharacter() //opponent

5. moveCharcters() //move selected character to defender area

6. attack() //opponent loses hp and opponent counters.

7. gameStatust()  //check if player loses/wins/or has  more fighting to do.

Variables/objects:

var character {
  healthPoints : x
  attackPower : x
  counterAttackPower : x
  
  +functions
}
