var menu, bar1, bar2, bar3, prev, next, rand;
var soundFilenames = ['assets/sink.mp3', 'assets/fridge.mp3', 'assets/snap.mp3']
var menuButtons = [];
var showMenu = true;
var sounds = [];
var fft;
var i = 0;

function preload() {
  sounds = soundFilenames.map((name) => loadSound(name))
  print(sounds)
}

function setup() {
  createCanvas(700, 600);
  fft = new p5.FFT()

  menu = createDiv();
  bar1 = createDiv();
  bar2 = createDiv();
  bar3 = createDiv();
  prev = createButton('Previous');
  next = createButton('Next');
  rand = createButton('Random');

  menu.position(350, 50);
  prev.position(100, menu.y + 40);
  next.position(prev.x + 200, menu.y + 40);
  rand.position(next.x + 200, menu.y + 40);

  menu.mouseClicked(onMenu);
  prev.mouseClicked(onPrev);
  next.mouseClicked(onNext);
  rand.mouseClicked(onRand);

  bar1.parent(menu);
  bar2.parent(menu);
  bar3.parent(menu);

  menu.class('menu');
  bar1.class('bar');
  bar2.class('bar');
  bar3.class('bar');

  menuButtons = [prev, next, rand];

  playSound();
}

function draw() {
  background(0);
  let waveform = fft.waveform();

  noFill();
  beginShape();
  strokeWeight(1);
  for (let k = 0; k < waveform.length; k++) {
    let x = map(k, 0, waveform.length, 0, width);
    let y = map(waveform[k], -1, 1, 0, height);
    stroke(random(255), random(255), random(255));
    vertex(x, y);
  }
  endShape();
}

function onMenu() {
  showMenu = !showMenu;

  if (showMenu) {
    menuButtons.forEach(function(button) {
      button.style('visibility', 'hidden');
      button.style('opacity', 0);
    });
  } else {
    menuButtons.forEach(function(button) {
      button.style('visibility', 'visible');
    });

    for (let k = 0; k <= 2000; k++) {
      menuButtons.forEach(function(button) {
        button.style('opacity', k/2000);
      });
    }
  }
}

function onPrev() {
  stopSound();
  i = Math.max(0, i - 1);
  playSound();
}

function onNext() {
  stopSound();
  i = (i + 1) % sounds.length;
  playSound();
}

function onRand() {
  stopSound();
  i = Math.floor(random(99) % sounds.length);
  playSound();
}

function playSound() {
  let currentSound = sounds[i];
  currentSound.play();
  console.log(currentSound);
}

function stopSound() {
  let currentSound = sounds[i];
  currentSound.stop();
}