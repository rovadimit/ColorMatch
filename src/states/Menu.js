var menuState = {
    
    create: function() {
        
        var background = game.add.tileSprite(0, 0, 800, 1280, 'background');
        
        //tekst s pravila
        //buton PLAY s tekst
        
        var playButton = game.add.sprite(game.world.width / 2, game.world.height / 2, 'playButton');
        playButton.anchor.setTo(0.5, 0.5);
        playButton.scale.setTo(3, 3);

        game.input.onDown.addOnce(
            function() {
                game.state.start('Main');
            }, 
            this
        );       
    }
};