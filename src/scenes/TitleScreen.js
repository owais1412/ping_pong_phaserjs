import Phaser from "phaser";

export default class TitleScreen extends Phaser.Scene {

  preload () {

  }

  create () {
    const textWidth = this.game.config.width / 2,
      textHeight = this.game.config.height / 2,
      text = this.add.text(textWidth, textHeight, "Hello World");
    text.setOrigin(0.5, 0.5);
  }
}