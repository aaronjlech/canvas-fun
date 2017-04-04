window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')
var map;
var tileset;
var layer;
var flag;
var p;
var cursors;
var platforms;
var jumpButton;
var scoreView = document.querySelector("#score");
var healthView = document.querySelector("#health");
var timeView = document.querySelector('#time')
var score = 0;
var health = 100;
var time = 10;
var speed = 0;
var text;
var jumpHeight = 0;
var level_one ={
   preload: function(){
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
      game.load.spritesheet('luigi', './images/luigi_right_swim.png', 15, 15, 4);

      game.stage._bgColor.rgba = '#3498db';

      game.load.crossOrigin = 'anonymous';
      game.load.tilemap('tilemap', "../game_assets/dynamic_map.json", null, Phaser.Tilemap.TILED_JSON)
      game.load.image('tiles', "../images/Tiles_32x32.png")
      game.load.image("flag", '../images/blue_flag.png')
   },
   create: function(){
      var changeTime = setInterval(function(){
         time -= 1
         timeView.innerHTML = time
         if(time === 0){
            console.log(window)
            clearInterval(changeTime)
         }
      }, 1000)
      game.physics.startSystem(Phaser.Physics.ARCADE);
      var style = { font: "20px VT323", fill: "#fff", tabs: 132 };

      map = game.add.tilemap('tilemap')
      map.addTilesetImage("Tiles_32x32", 'tiles');

      layer = map.createLayer("main_layer");

      map.setCollisionBetween(0 , 35);

      map.setCollisionBetween(52 , 64);

      map.setTileIndexCallback(51, hitCoin, this);
      layer.resizeWorld();
      flag = game.add.sprite(3000, 220, 'flag')
       p = game.add.sprite(0, 550, 'luigi');
       var walk = p.animations.add('swim');
       p.animations.play('swimn', 20, true);

       game.physics.arcade.enable(p);


       p.body.collideWorldBounds = true;
       p.body.gravity.y = 1000;
       p.height = 32;
       p.width = 32;
       p.body.onWorldBounds = new Phaser.Signal();
       p.body.onWorldBounds.add(hitWorldBounds, this);

       game.camera.follow(p);


       cursors = game.input.keyboard.createCursorKeys();
       jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

   },

   update: function(){

      game.physics.arcade.collide(p, layer);

      p.body.velocity.x = 0;

      if (cursors.left.isDown)
         {
            if(speed > 0){
               speed = 0
            }
            if(speed > -500){
               console.log('asdfad')
               speed += -40

            }else{
               speed = -500
            }
            p.body.velocity.x = speed

         }
         else if (cursors.right.isDown)
         {
            if(!p.body.onFloor()){
               speed = 375
            }
            if(speed < 0){
               speed = 0
            }
            if(speed < 500){
               speed += 40

            }else{
               speed = 500
            }
            p.body.velocity.x = speed

         }

         if (cursors.up.isDown && (p.body.onFloor() || p.body.touching.down) ||jumpButton.isDown && (p.body.onFloor() || p.body.touching.down))
         {
              p.body.velocity.y = -450;
         }
         // if(p.body.position.y >100){
         //    console.log(p.body.position.y)
         // }
         if(p.body.position.y === 608){
            health = 0
            healthView.innerHTML = health
            console.log(game.state.render())
            game.state.render()
         }
   }
}

function hitCoin(sprite, tile) {
   if(tile.alpha !== 0){
      scoreView.innerHTML = score += 1
   }
    tile.alpha = 0;

    layer.dirty = true;

    return false;
}
function hitWorldBounds(){

}
const game = new Phaser.Game(640, 640, Phaser.CANVAS, 'app-container');
game.state.add('main', level_one)

game.state.start('main')
