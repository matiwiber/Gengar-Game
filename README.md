# Hi, welcome to "Gengar Run" !

![](https://i.imgur.com/tiFQJTm.png)



## Description

"Why Gengar has to run?"... Good question. Your are gonna see why, but first, you need to know how can you help him.

- You can control Gengar whit the Arrow keys ◄= Left & Right =►
- RUN!!, watch your steps and go to the nearest hole, the gravity is your friend
- Be careful!! maybe you will find some obstacles in your way
- HAVE FUN!! That's the important, and try to do your best score :)

![](https://i.imgur.com/wwuiEZR.png)



## MVP (DOM - CANVAS)

The Pokémon Gengar can move in 2 directions (Left & Right), has to be directed to the hole without touch the roof or any obstacle. The game ends when happens something that was mentioned before. The idea is to try to achieve the highest score.

## Data structure

1. index.html
2. main.js
3. style.css
4. game.js
5. player.js
6. obstacle.js

### 1. index.html file

### 2. Main file

- buildDom
- createStartScreen / removeStartScreen
- createGameScreen / removeGameScreen
- startGame / endGame

### 3. style.css

### 4. Game

#### Properties

- canvas
- ctx
- player
- obstacles
- isGameOver

#### Methods

- start
- startLoop
  - loop
- checkCollisions
- gameOver
- printScore

### 5. Player

#### Properties

- canvas
- ctx
- direction
- image
- x
- y
- width
- height
- isFalling

#### Methods

- moveLeft
- moveRight
- didCollideCeiling
- checkIfStanding --> used to check if player is standing, and change the property `isFalling`

### 6. Obstacle

#### Properties

- canvas
- ctx
- position
- speed
- x
- y
- width
- height

#### Methods

- draw
- move


Gh page game
![](https://matiwiber.github.io/Gengar-Game/)
https://matiwiber.github.io/Gengar-Game/
