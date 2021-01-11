import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

  init () {
    this.right_paddle_velocity = new Phaser.Math.Vector2(0, 0);
    this.increase_speed_by = 1.5; // 110%

    this.width = this.game.config.width;
    this.height = this.game.config.height;

    this.who_won = "";
    this.left_paddle_score = 0;
    this.right_paddle_score = 0;
  }

  preload () {

  }

  create () {
    const score_style = {
        fontSize: '20px',
        color: '#ff0000'
      };
    this.left_score_text = this.add.text(this.width / 4, this.height / 4, this.left_paddle_score),
    this.right_score_text = this.add.text(3 * this.width / 4, this.height / 4, this.right_paddle_score);

    this.left_score_text.setStyle(score_style);
    this.right_score_text.setStyle(score_style)
    // Set boundary greater than actual
    this.physics.world.setBounds(-100, 0, 1000, this.height);
    // Game objects    
    this.ball = this.add.circle(this.width / 2, this.height / 2, 10, 0xffffff, 1),
    this.left_paddle = this.add.rectangle(10, this.height / 2, 10, 100, 0xffffff, 1);
    this.right_paddle = this.add.rectangle(790, this.height / 2, 10, 100, 0xffffff, 1)

    this.physics.add.existing(this.ball)
    this.physics.add.existing(this.left_paddle, true);
    this.physics.add.existing(this.right_paddle, true);
    
    this.ball.setOrigin(0.5, 0.5);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setCollideWorldBounds(true, 1, 1);

    this.resetBall();

    // this.left_paddle.body.setBounce(1, 1);
    // this.left_paddle.body.setMass(10000);

    // Add collider for both paddles
    this.physics.add.collider(this.left_paddle, this.ball, () => {
      // this.ball_velocity.x += 10;
      this.increaceSpeed();
    });
    this.physics.add.collider(this.right_paddle, this.ball, () => {
      this.increaceSpeed();
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update () {
    /**
     * @type {Phaser.Physics.Arcade.StaticBody}
     */
    const lp_body = this.left_paddle.body,
      diff = this.ball.y - this.right_paddle.y,
      ai_speed = 3;

    if (this.cursors.up.isDown) {
      this.left_paddle.y -= 10;
      lp_body.updateFromGameObject();
    } else if (this.cursors.down.isDown) {
      this.left_paddle.y += 10;
      lp_body.updateFromGameObject();
    }

    // Move the right paddle
    if (diff < 0) {
      // ball is below paddle
      this.right_paddle_velocity.y = -ai_speed;
    } else if (diff > 0) {
      // ball is below paddle
      this.right_paddle_velocity.y = ai_speed;
    }

    this.right_paddle.y += this.right_paddle_velocity.y;
    this.right_paddle.body.updateFromGameObject();

    // Check if any paddle misses the ball
    if(this.ball.x < 0) {
      // Right wins
      this.right_paddle_score++;
      this.who_won = "right";
      this.right_score_text.setText(this.right_paddle_score);
      this.resetBall();
    } else if (this.ball.x > 800) {
      // Left wins
      this.left_paddle_score++;
      this.who_won = "left";
      this.left_score_text.setText(this.left_paddle_score);
      this.resetBall();
    }
  }

  increaceSpeed () {
    if(this.ball.body.speed < 650) {
      this.ball.body.velocity.normalize().scale(this.ball.body.speed * this.increase_speed_by);
    }
  }

  resetBall () {
    let angle = Phaser.Math.Between(30, 60);
    
    if(this.who_won == "left") {
      angle = 270 - angle;
    } 
    const vec = this.physics.velocityFromAngle(angle, 200);

    
    this.ball.setPosition(this.width / 2, this.height / 2);

    this.ball.body.setVelocity(vec.x, vec.y);
  }
}