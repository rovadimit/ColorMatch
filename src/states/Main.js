var mainState = {
    
    scoreText: null,
    arrowLeft: null,
    arrowRight: null,
    leftCard: null,
    rightCard: null,
    leftText: null,
    rightText: null,
    leftCardPos: [],
    rightCardPos: [],
    leftPad: null,
    rightPad: null,
    colors: [],
    currentColor: null,
    currentText: null,
    currentColorMeaning: null,

    create: function() {    

        var inGameBackground = game.add.tileSprite(0, 0, 800, 1280, 'inGameBackground');

        this.colors = [
            [ "red", "blue", "black" ], 
            [ "#ff0000", "#0000ff", "#000000" ]
        ];

        this.leftCardPos = { x: this.game.world.width / 4, y: this.game.world.height / 2};
        this.rightCardPos = { x: this.game.world.width / 4 * 3, y: this.game.world.height / 2};
        
        //score label
        this.scoreText = game.add.text(game.world.width / 2, 0, Score.toString(), {
            font: "bold 65px Arial",
            fill: "#ffffff"
        });
        this.scoreText.anchor.setTo(0.5, 0);

        this.leftCard = game.add.group();
        this.rightCard = game.add.group();


        //pads
        this.leftPad = game.add.sprite(this.leftCardPos.x, this.leftCardPos.y, 'pad');
        this.leftPad.anchor.setTo(0.5);
        this.leftPad.scale.setTo(5.8, 4);
        this.leftCard.add(this.leftPad);

        this.rightPad = game.add.sprite(game.world.width / 4 * 3, game.world.height / 2, 'pad');
        this.rightPad.anchor.setTo(0.5);
        this.rightPad.scale.setTo(5.8, 4);
        this.rightCard.add(this.rightPad);

        //left text - only the text changes
        var styleLeft = { font: "90px Arial", fill: "#000000", align: "center" };

        this.leftText = game.add.text(this.leftCardPos.x, this.leftCardPos.y, " ", styleLeft);
        this.leftText.anchor.set(0.5);

        this.leftCard.add(this.leftText);

        
        //left and right key press methods
        var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        leftKey.onDown.add(function() {this.chooseTrueFalse(false);}, this);
        
        var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        rightKey.onDown.add(function() {this.chooseTrueFalse(true);}, this);
        
        
        //left and right arrow
        this.arrowLeft = game.add.sprite(game.world.width / 2, game.world.height, 'arrowLeft');
        this.arrowLeft.anchor.setTo(1, 1);
        this.arrowLeft.scale.setTo(1.5);
        this.arrowLeft.tint = 0xdf0101;
        
        this.arrowRight = game.add.sprite(game.world.width / 2, game.world.height, 'arrowRight');
        this.arrowRight.anchor.setTo(0, 1);
        this.arrowRight.scale.setTo(1.5);
        this.arrowRight.tint = 0x01df01;
        
        this.newPair();      
    },

    chooseTrueFalse: function(choice) {

        if (!GameOver) {

            ColorIndex++;

            if ((choice && this.currentColor === this.currentColorMeaning) || (!choice && this.currentColor !== this.currentColorMeaning)) {
                console.log("true");
                var checkmark = game.add.sprite(game.world.width / 2, game.world.height / 2, 'checkmark');
                checkmark.tint = 0x00ff00;
                checkmark.anchor.setTo(0.5, 0.5);
                checkmark.scale.setTo(0);
                var checkmarkTween = game.add.tween(checkmark.scale).to({x: 3, y: 3}, 200, Phaser.Easing.Linear.None)
                    .to({x: 0, y: 0}, 200, Phaser.Easing.Linear.None);
                checkmarkTween.onComplete.add(function() {checkmark.destroy();});
                checkmarkTween.start();
            }
            else {
                console.log("false");
                var cross = game.add.sprite(game.world.width / 2, game.world.height / 2, 'cross');
                cross.tint = 0xffff00;
                cross.anchor.setTo(0.5, 0.5);
                cross.scale.setTo(0);
                var crossTween = game.add.tween(cross.scale).to({x: 3, y: 3}, 200, Phaser.Easing.Linear.None)
                    .to({x: 0, y: 0}, 200, Phaser.Easing.Linear.None);
                crossTween.onComplete.add(function() {cross.destroy();});
                crossTween.start();
            }

            if (ColorIndex < ColorCount) {
                this.newPair();
            }
            else {
                GameOver = true;
                var moveTween = game.add.tween(this.leftCard).to({x: - game.world.width / 2}, 300, Phaser.Easing.Linear.None, true, 0);
                var moveTween1 = game.add.tween(this.rightCard).to({x: game.world.width + game.world.width / 2}, 300, Phaser.Easing.Linear.None, true, 0);
                moveTween.onComplete.add(function() {
                    this.leftCard.destroy();
                    this.rightCard.destroy();
                    var moveScoreDown = game.add.tween(this.scoreText).to({y: game.world.height / 2 - this.scoreText.height}, 300, Phaser.Easing.Linear.None, true, 0);
                    moveScoreDown.onComplete.add(function() {
                        game.add.tween(this.scoreText.scale).to({x: 3, y: 3}, 300, Phaser.Easing.Linear.None, true, 0);
                    }, this);
                    game.add.tween(this.arrowLeft).to({x: - game.world.width / 2}, 300, Phaser.Easing.Linear.None, true, 0);
                    game.add.tween(this.arrowRight).to({x: game.world.width + game.world.width / 2}, 300, Phaser.Easing.Linear.None, true, 0);
                }, this);
            }
        }
    },

    newPair: function() {

        var rnd = game.rnd.integerInRange(0, 2);

        this.currentText = this.colors[0][rnd];
        this.currentColorMeaning = this.colors[1][rnd];
        this.leftText.text = this.currentText;

        if (this.rightText) {
            this.rightText.text = "";
            this.rightCard.remove(this.rightText);
            this.rightText.destroy();
            this.rightText = null;
        }  

        this.currentColor =  this.colors[1][game.rnd.integerInRange(0, 2)];

        var styleRight = { font: "90px Arial", fill: this.currentColor, align: "center" };

        this.rightText = game.add.text(this.rightCardPos.x, this.rightCardPos.y, this.colors[0][game.rnd.integerInRange(0, 2)], styleRight);
        this.rightText.anchor.set(0.5);
        this.rightCard.add(this.rightText);
    }
};