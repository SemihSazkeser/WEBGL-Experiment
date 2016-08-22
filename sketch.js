var fft, low, midLo, midHi, high;
var soundFile, delay, reverb, volume;

function preload() {
  soundFile = loadSound('Daughter - Run (Lyrics).mp3');
}
function setup(){
	
	//Set framecounted background
	specialbackground = (frameCount/5 %225) + (volume * 200);
	
	//Set the density of the pixels
	pixelDensity(2);
	
	// create the canvas
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Play the soundfile
  soundFile.play();
  soundFile.rate(1);
  
  //Get the amplitude & frequencies
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw(){
	
	// get volume from the amplitude process
  volume = amplitude.getLevel();

  // get frequencies
  fft.analyze();
  low = fft.getEnergy('bass');
  midLo = fft.getEnergy('lowMid');
  midHi = fft.getEnergy('mid');
  high = fft.getEnergy('highMid');
	
	// get Spectrum
	var spectrum = fft.analyze();
	
/*	
	reverb = new p5.Reverb();
  reverb.process(soundFile, 6, 1);
	reverb.amp(1); // turn it up!
*/
	
	//Set Colours for ambient, directional and point Light
  var locY = (mouseY / height - 0.5) * (-2);
  var locX = (mouseX / width - 0.5) * 2;

  //ambientLight(high);
  directionalLight(midLo, 0, 0, 0.25, 0.25, 0.25);
  //pointLight(0, 0, high, locX, locY, 0);
  pointLight(600, 600, 400, -locX, -locY, 0);
  
  //Set Background with fft interaction
    noFill();
    colorMode();
    background (2020, WEBGL);

///// Creating the Sphere //////

rotateY(frameCount * 0,01);

for(var j = 0; j < 0.1; j++){
    push();
   	for(var i = 0; i < frameCount * 0.1; i++){
      translate(cos(low * 0.01 + j) * 10, sin(high * 0.01 + j) * 10, i * 0.01);
      rotateZ(frameCount * 0.0001);
      rotateZ(frameCount * 0.0001);
      push();
      box(0,01, 0,01, 1);
      pop();
    }
    pop();
    }	
}