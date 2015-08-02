var WIDTH = 800;
var HEIGHT = 800;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'gameDiv');

var stageSize = { width: WIDTH, height: HEIGHT };

var ColorIndex = 0;
var Score = 0;
var ColorCount = 10;

var GameOver = false;

game.state.add('Boot', bootState);  
game.state.add('Preload', preloadState);  
game.state.add('Menu', menuState); 
game.state.add('Main', mainState); 

game.state.start('Boot'); 