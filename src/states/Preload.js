var preloadState = {

    preload: function() {

        game.load.image('background', 'assets/images/darkPurple.png');
        game.load.image('inGameBackground', 'assets/images/purple.png');
        game.load.image('playButton', 'assets/images/playButton.png');
        game.load.image('checkmark', 'assets/images/checkmark.png');
        game.load.image('cross', 'assets/images/cross.png');
        game.load.image('checkmark', 'assets/images/checkmark.png');
        game.load.image('arrowLeft', 'assets/images/arrowLeft.png');
        game.load.image('arrowRight', 'assets/images/arrowRight.png');

        game.load.image('pad', 'assets/images/pad.png');
    },
    
    create: function() {
        
        game.state.start('Menu');
    }
};