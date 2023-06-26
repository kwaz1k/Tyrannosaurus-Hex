const e=new Phaser.Class({Extends:Phaser.Scene,initialize:function(){Phaser.Scene.call(this,{key:"gameScene"})},preload(){this.load.image("backgroundGame","https://i.postimg.cc/ncCJCFZ6/wallpaperbetter-com-3840x2160-1.jpg"),this.load.spritesheet("tHex","https://i.postimg.cc/SsRRc797/spritesheet.png",{frameWidth:243,frameHeight:370}),this.load.image("ground","https://i.postimg.cc/8c9BWznw/ground.png")},create(){this.anims.create({key:"jump",frames:this.anims.generateFrameNumbers("tHex",{start:1,end:1}),frameRate:10}),this.anims.create({key:"idle",frames:this.anims.generateFrameNumbers("tHex",{start:0,end:0}),frameRate:10});let{width:e,height:t}=this.sys.game.config;this.backgroundImage=this.add.tileSprite(0,0,this.sys.game.config.width,this.sys.game.config.height,"backgroundGame").setOrigin(0,0).setScrollFactor(0).setScale(1,1600/e);let i=this.physics.add.sprite(1080,this.sys.game.config.height-200,"tHex");this.grounds=this.physics.add.staticGroup();for(let e=0;e<3;e+=1){let t=this.grounds.create(1080+1080*e,this.sys.game.config.height,"ground");this.physics.add.collider(i,t)}i.setGravityY(800),i.setScale(.5);let s=this.input.keyboard.createCursorKeys(),a=()=>{i.body.touching.down&&(i.setVelocityY(-500),this.isRunning=!0,this.score+=10,this.scoreText.setText(`Score: ${this.score}`),i.anims.play("jump"))};s.up.on("down",a),s.space.on("down",a),this.input.on("pointerdown",a),this.speed=5,this.isRunning=!1,this.cameras.main.startFollow(i,!0,.5,.5,0,150),this.score=0,this.scoreText=this.add.text(16,16,"Score: 0",{fontSize:"32px",fill:"#fff",fontFamily:"MinecraftiaRegular"}),this.scoreText.setScrollFactor(0),this.update=()=>{if(this.isRunning&&(i.x+=this.speed,this.backgroundImage.tilePositionX=.3*this.cameras.main.scrollX),i.body.touching.down&&i.anims.currentAnim&&"jump"===i.anims.currentAnim.key&&i.anims.play("idle"),i.x>this.grounds.getChildren()[0].x+1080){this.grounds.getChildren()[0].destroy();let e=this.grounds.create(this.grounds.getChildren()[this.grounds.getChildren().length-1].x+1080,this.sys.game.config.height,"ground");this.physics.add.collider(i,e)}}}}),t={type:Phaser.AUTO,scale:{mode:Phaser.Scale.RESIZE,autoCenter:Phaser.Scale.CENTER_BOTH,width:window.innerWidth,height:window.innerHeight},scene:[{preload:function(){this.load.image("background","https://i.postimg.cc/W1j6zxMm/wallpaperbetter-com-3840x2160-3.jpg"),this.load.image("logo","https://i.postimg.cc/8Cn1XJDy/image.png"),this.load.image("defaultPlayButtonImage","https://i.postimg.cc/154HV439/11.png"),this.load.image("defaultAutorButtonImage","https://i.postimg.cc/fRKLWdbT/author-Button.png")},create:function(){let{width:e}=this.sys.game.config,{height:t}=this.sys.game.config,i=this.add.image(0,0,"background").setOrigin(0,0),s=this.add.image(e/2,t/2-130,"logo"),a=()=>{if(this.cameras.main){let e=this.cameras.main.width/i.width,t=this.cameras.main.height/i.height,s=Math.max(e,t);i.setScale(s).setScrollFactor(0)}},n=()=>{let t=e/1050;s.setScale(t)};a(),n(),this.scale.on("resize",()=>{a(),n()});let o=this.add.image(e/2,t/2,"defaultPlayButtonImage").setInteractive().on("pointerdown",(function(){console.log("Игра начинается..."),this.scene.start("gameScene")}).bind(this));o.on("pointerover",()=>{o.setScale(1.05)}),o.on("pointerout",()=>{o.setScale(1)});let h=this.add.image(e/2,t/2+110,"defaultAutorButtonImage").setInteractive().on("pointerdown",()=>void console.log("Открытие титров..."));h.on("pointerover",()=>{h.setScale(1.05)}),h.on("pointerout",()=>{h.setScale(1)})}},e],physics:{default:"arcade",arcade:{gravity:{y:300},debug:!1}}};new Phaser.Game(t);
//# sourceMappingURL=index.fd89721a.js.map