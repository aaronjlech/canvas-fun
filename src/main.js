window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')

var map;
var tileset;
var layer;
var p;
var cursors;
var platforms;
var jumpButton;
var scoreView = document.querySelector("#score");
var healthView = document.querySelector("#health");
var timeView = document.querySelector('#time')
var score = 0;
var health = 100;
var time = 10
var text;
var level_one ={
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

      layer = map.createLayer("Tile_layer");

      map.setCollisionBetween(0 , 5);
      map.setTileIndexCallback(51, hitCoin, this);
      layer.resizeWorld();
       p = game.add.sprite(0, -200, 'luigi');
       var walk = p.animations.add('swim');
       p.animations.play('swimn', 20, true);

       game.physics.arcade.enable(p);


       p.body.collideWorldBounds = true;
       p.body.gravity.y = 1000;
       p.height = 32;
       p.width = 32;
       game.camera.follow(p);


       cursors = game.input.keyboard.createCursorKeys();
       jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

   },
   preload: function(){
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
      game.load.spritesheet('luigi', './images/luigi_right_swim.png', 15, 15, 4);

      game.stage._bgColor.rgba = '#3498db';

      game.load.crossOrigin = 'anonymous';
      game.load.tilemap('tilemap', "../game_assets/tile_map_w_objects.json", null, Phaser.Tilemap.TILED_JSON)
      game.load.image('tiles', "../images/Tiles_32x32.png")

   },
   update: function(){

         game.physics.arcade.collide(p, layer);

         p.body.velocity.x = 0;

         if (cursors.left.isDown && p.body.onFloor())
         {
            p.body.velocity.x = -500;

         }
         else if (cursors.right.isDown)
         {

              p.body.velocity.x = 500;
         }

         if (cursors.up.isDown && (p.body.onFloor() || p.body.touching.down) ||jumpButton.isDown && (p.body.onFloor() || p.body.touching.down))
         {

              p.body.velocity.y = -500;
         }
         if(cursors.down.isDown){
            p.body.velocity.y = 500;
            console.log(p.body.position)

         }
         if(p.body.position.y === 608){
            health = 0
            healthView.innerHTML = health
            game.state.stop()

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

const game = new Phaser.Game(640, 640, Phaser.CANVAS, 'app-container');
game.state.add('main', level_one)

game.state.start('main')
