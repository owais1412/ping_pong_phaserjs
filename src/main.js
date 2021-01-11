import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import TitleScreen from "./scenes/TitleScreen";

/**
 * @type {Phaser.Types.Core.GameConfig}
 */
const config = {
  width: 800,
  height: 500,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0},
      debug: false
    }
  }
}

const game = new Phaser.Game(config);

game.scene.add('titlescreen', TitleScreen);
game.scene.add('gamescreen', GameScene);

game.scene.start('gamescreen');