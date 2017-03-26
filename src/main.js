window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')


var map;
var tileset;
var layer;
var p;
var cursors;
var platforms
var jumpButton
function preload() {
       game.load.spritesheet('luigi', './images/luigi_right_swim.png', 15, 15, 4);

   //  game.stage._bgColor.rgba = '#3498db';

    game.load.crossOrigin = 'anonymous';
    game.load.tilemap('tilemap', "../game_assets/game_map.json", null, Phaser.Tilemap.TILED_JSON)
    game.load.image('tiles', "../images/Tiles_32x32.png")

   //  game.load.image('p', './images/Megaman_retro_3D_by_cezkid.png');
   //  game.load.image('platform', 'sprites/platform.png');

}
console.log(game)
function update () {
   game.physics.arcade.collide(p, layer);


p.body.velocity.x = 0;

if (cursors.left.isDown)
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
}
}
function create() {
   game.physics.startSystem(Phaser.Physics.ARCADE);

   game.stage.backgroundColor = '#3498db';

   //  The 'mario' key here is the Loader key given in game.load.tilemap
   let map = game.add.tilemap('tilemap');
   let layer
   //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
   //  The second parameter maps this name to the Phaser.Cache key 'tiles'
   map.addTilesetImage("Tiles_32x32", 'tiles');

   //  Creates a layer from the World1 layer in the map data.
   //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
   layer = map.createLayer('Ground_Layer');
   console.log(layer)
   map.setCollisionBetween(15, 16);
   map.setCollisionBetween(20, 25);
   map.setCollisionBetween(27, 29);
   map.setCollision(40);
   //  This resizes the game world to match the layer dimensions
   layer.resizeWorld();
   console.log(layer)
    p = game.add.sprite(300, 200, 'luigi');
   //  game.world.setBounds(0, 0, 1920, 1920);
    var walk = p.animations.add('swim');
    p.animations.play('swimn', 20, true);


   // console.log(game)

    game.physics.arcade.enable(p);

    p.body.collideWorldBounds = true;
    p.body.gravity.y = 1000;
    p.height = 32;
    p.width = 32;
    game.camera.follow(p);

   //  platforms.create(500, 150, 'platform');
   //  platforms.create(-200, 300, 'platform');
   //  platforms.create(400, 450, 'platform');
   //  platforms.create(100, 200, 'platform');



    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}
const game = new Phaser.Game(640, 640, Phaser.CANVAS, 'app-container', { create: create, preload, update});
console.log(game)
