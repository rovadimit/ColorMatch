var bootState = {
    
    preload: function() {
        game.load.image('loader', 'assets/images/loader.png');
    },
	
	create: function() {

		game.stage.backgroundColor = '#000000';

		game.state.start("Preload");
	}
};

