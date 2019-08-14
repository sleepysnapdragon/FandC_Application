var context;
var currentSlide = 0;
x1 = 0;
x2 = 800;
xt = 3;
var trns;
var repeat;
var pics = [];
pics[0] = new Image();
pics[1] = new Image();
pics[2] = new Image();

function auto() {
  //get images
  pics[0].src = "./images/accollo.jpg";
  pics[1].src = "./images/disagio.jpg";
  pics[2].src = "./images/nuno.jpg";

  //begin display when first image is ready
  pics[0].onload = function() {
    context = canvas.getContext("2d");
    context.drawImage(pics[currentSlide], x1, 0, 800, 600);
    repeat = setTimeout(function() {
      startTrans(pics);
    }, 3000);
  };
}

function startTrans(pics) {
  trns = setInterval(function() {
    changePic(pics);
  }, 10);
}

function changePic(pics) {
  context.clearRect(0, 0, 800, 600);
  var nextSlide = currentSlide == pics.length - 1 ? 0 : currentSlide + 1;
  context.drawImage(pics[currentSlide], x1, 0, 800, 600);
  context.drawImage(pics[nextSlide], x2, 0, 800, 600);
  if (x1 > -800) {
    x1 -= xt;
    x2 -= xt;
  } else {
    x1 = 0;
    x2 = 800;
    if (currentSlide + 1 > pics.length - 1) {
      currentSlide = 0;
      clearInterval(trns);
      auto();
    } else {
      currentSlide++;
      clearInterval(trns);
      auto();
    }
  }
}

function stopAuto() {
  clearTimeout(repeat);
}

function showX(x) {
  stopAuto();
  context.clearRect(0, 0, 800, 600);
  currentSlide = x;
  context.drawImage(pics[currentSlide], 0, 0, 800, 600);
}

function next() {
  stopAuto();
  context.clearRect(0, 0, 800, 600);
  if (currentSlide == 2) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  context.drawImage(pics[currentSlide], 0, 0, 800, 600);
}

function previous() {
  stopAuto();
  context.clearRect(0, 0, 800, 600);
  if (currentSlide == 0) {
    currentSlide = 2;
  } else {
    currentSlide--;
  }
  context.drawImage(pics[currentSlide], 0, 0, 800, 600);
}
