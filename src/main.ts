import { Application, Assets, FillGradient, Sprite, Text, TextStyle } from "pixi.js";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")?.appendChild(app.canvas);

  // Create beautiful text
  const radialGradient = new FillGradient({
    type: 'radial',
    center: { x: 0.5, y: 0.5 },
    innerRadius: 0,
    outerCenter: { x: 0.5, y: 0.5 },
    outerRadius: 0.5,
    colorStops: [
      { offset: 0, color: 'yellow' }, // Center color
      { offset: 1, color: 'green' }   // Edge color
    ],
    // Use normalized coordinate system where (0,0) is the top-left and (1,1) is the bottom-right of the shape
    textureSpace: 'local'
  });
  const rainbowGradient = new FillGradient({
    type: 'linear',
    start: { x: 0, y: 0 },
    end: { x: 250, y: 50 },
    colorStops: [
      { offset: 0, color: 0xff0000 },    // Red
      { offset: 0.33, color: 0x00ff00 }, // Green
      { offset: 0.66, color: 0x0000ff }, // Blue
      { offset: 1, color: 0xff00ff }     // Purple
    ],
    textureSpace: 'global'  // Use world coordinates
  })
  const textStyle = new TextStyle({
    fontFamily: 'Arial Black',
    fontSize: 48,
    fill: radialGradient,
    stroke: '#ffffff',
    dropShadow: {
      alpha: 0.5,         // 50% opacity shadow
      angle: Math.PI / 6, // 30 degrees
      blur: 4,            // Soft shadow edge
      color: '#000000',   // Black shadow
      distance: 6         // Shadow offset
    },
    wordWrap: true,
    wordWrapWidth: 440,
    align: 'center'
  })
  const welcomeText = new Text('Welcome to BunnyLand', textStyle);

  // Center the text
  welcomeText.x = app.screen.width / 2;
  welcomeText.y = 50;
  welcomeText.anchor.set(0.5, 0);

  // Add to stage
  app.stage.addChild(welcomeText);

  // Load the bunny texture
  const texture = await Assets.load("./assets/bunny.png");

  // Create a bunny Sprite
  const bunny = new Sprite(texture);

  // Center the sprite's anchor point
  bunny.anchor.set(0.5);
  bunny.scale.set(2);

  // Move the sprite to the center of the screen
  bunny.position.set(app.screen.width / 2, app.screen.height / 2);

  // Sound
  const audio = document.createElement('audio');
  audio.src = "./assets/yop.mp3";
  audio.controls = false;  // Show audio controls
  audio.autoplay = false; // Don't autoplay
  audio.loop = false;     // Don't loop
  audio.volume = 0.75;

  let bunnyRot = 0.05
  let bunnyRotRight = true
  bunny.interactive = true;
  bunny.on('pointerdown', () => {
    bunnyRotRight = !bunnyRotRight
    bunnyRot = 0.0
    audio.currentTime = 0
    audio.play()
  });

  // Add the bunny to the stage
  app.stage.addChild(bunny);

  // Listen for animate update
  app.ticker.add((time) => {
    bunny.rotation += bunnyRot * time.deltaTime;
    if (bunnyRotRight === true && bunnyRot < 0.1) {
      bunnyRot += 0.001;
    }
    else if (bunnyRotRight === false && bunnyRot > -0.1) {
      bunnyRot -= 0.001;
    }
  });

})();
