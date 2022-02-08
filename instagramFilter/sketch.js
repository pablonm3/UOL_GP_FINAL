// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var filter_no = 1;


var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];

var kernel_sharpen = [
  [0,-1, 0],
  [-1,5,-1],
  [0, -1, 0]
]

/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height + 30);
}

/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    var filtered_img = imgIn;
    if(filter_no == 1){
      filtered_img = earlyBirdFilter(imgIn)
    }
    else if(filter_no == 2){
      filtered_img = sharpenFilter(imgIn)
    }
    else if(filter_no == 3){
      filtered_img = highContrastFilter(imgIn)
    }
    image(filtered_img, imgIn.width, 0);
    textSize(20);
    text("Press [1] for Sepia, [2] for Sharpen, [3] for high_contrast", 50, imgIn.height + 20)
    noLoop();
}

function highContrastFilter(img){
  var imgOut = createImage(imgIn.width, imgIn.height);

  imgOut.loadPixels();
  img.loadPixels();
  for(var x=0; x<img.width; x++){
      for(var y=0; y<img.height; y++){
        var index = (y*img.width + x) *4;


        var oldRed = img.pixels[index + 0]
        var oldGreen = img.pixels[index + 1]
        var oldBlue = img.pixels[index + 2]
        const inc_rate = 1.1,
              dec_rate = 0.9;
        newRed = oldRed * inc_rate
        if(oldRed< 128){
          newRed = oldRed * dec_rate
        }
        newGreen = oldGreen * inc_rate
        if(oldGreen< 128){
          newGreen = oldGreen * dec_rate
        }
        newBlue = oldBlue * inc_rate
        if(oldBlue< 128){
          newBlue = oldBlue * dec_rate
        }


        imgOut.pixels[index + 0] = newRed;
        imgOut.pixels[index + 1] = newGreen;
        imgOut.pixels[index + 2] = newBlue;
        imgOut.pixels[index + 3] = 255;
      }
  }

  imgOut.updatePixels();

  return imgOut;
}

function sharpenFilter(img){
    var imgOut = createImage(img.width, img.height)
    var matrixSize = kernel_sharpen.length
    imgOut.loadPixels();
    img.loadPixels();
    for(var x=0; x<img.width; x++){
        for(var y=0; y<img.height; y++){
            var index = (y*img.width + x) *4;
            var c = convolution(x,y,kernel_sharpen, matrixSize, img)
    
            
            imgOut.pixels[index + 0] = c[0]
            imgOut.pixels[index + 1] = c[1]
            imgOut.pixels[index + 2] = c[2]
            imgOut.pixels[index + 3] = 255;         
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(imgIn){
  var resultImg = createImage(imgIn.width, imgIn.height);
      resultImg = sepiaFilter(imgIn);
      resultImg = darkCorners(resultImg);
      resultImg = radialBlurFilter(resultImg);
      resultImg = borderFilter(resultImg)
  return resultImg;
}

function borderFilter(img){
  const border = 8
  var stroke_w = 20;
  var buffer = createGraphics(img.width, img.height);
  buffer.background(0)
  buffer.image(img, border, border, img.width - border*2, img.height - border*2)
  buffer.strokeWeight(stroke_w);
  buffer.stroke(255);
  
  buffer.noFill();
  buffer.rect(0,0, img.width-3, img.height-3, 55);

  buffer.strokeWeight(stroke_w+5);
  buffer.rect(0,0, img.width, img.height);




  return buffer;

}


function sepiaFilter(img){
  var imgOut = createImage(imgIn.width, imgIn.height);

  imgOut.loadPixels();
  img.loadPixels();
  for(var x=0; x<img.width; x++){
      for(var y=0; y<img.height; y++){
        var index = (y*img.width + x) *4;


        var oldRed = img.pixels[index + 0]
        var oldGreen = img.pixels[index + 1]
        var oldBlue = img.pixels[index + 2]

        newRed = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189)
        newGreen = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168)
        newBlue = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131)


        imgOut.pixels[index + 0] = newRed;
        imgOut.pixels[index + 1] = newGreen;
        imgOut.pixels[index + 2] = newBlue;
        imgOut.pixels[index + 3] = 255;
      }
  }

  imgOut.updatePixels();

  return imgOut;

}


function darkCorners(img){
  var imgOut = createImage(imgIn.width, imgIn.height);

  imgOut.loadPixels();
  img.loadPixels();
  for(var x=0; x<img.width; x++){
      for(var y=0; y<img.height; y++){
        var index = (y*img.width + x) *4;


        var oldRed = img.pixels[index + 0]
        var oldGreen = img.pixels[index + 1]
        var oldBlue = img.pixels[index + 2]

        var dynLum = 1
        var _dist = dist(x,y, img.width/2, img.height/2)

        if(_dist >300){
          if(_dist < 450){
            dynLum = 1.4 - map(_dist, 300, 450, 0.4, 1)
          }
          else{
            const max_dist = Math.sqrt(Math.pow(img.width,2) + Math.pow(img.height,2));
            dynLum = 0.4 - map(_dist, 450, max_dist, 0, 0.4)
          }
        }

        newRed = oldRed * dynLum
        newGreen = oldGreen * dynLum
        newBlue = oldBlue * dynLum


        imgOut.pixels[index + 0] = newRed;
        imgOut.pixels[index + 1] = newGreen;
        imgOut.pixels[index + 2] = newBlue;
        imgOut.pixels[index + 3] = 255;
      }
  }

  imgOut.updatePixels();

  return imgOut;

}

function convolution(x, y, matrix, matrixSize, img){
  var totalRed = 0;
  var totalGreen = 0;
  var totalBlue = 0;
  var offset = floor(matrixSize / 2)
  for(var i=0; i<matrixSize; i++){
      for(var j=0; j<matrixSize; j++){
          var xloc = x + i - offset
          var yloc = y + j - offset
          var index = (img.width * yloc + xloc)*4
          index = constrain(index, 0, img.pixels.length -1)
          totalRed += img.pixels[index + 0] * matrix[i][j]
          totalGreen += img.pixels[index + 1] * matrix[i][j]
          totalBlue += img.pixels[index + 2] * matrix[i][j]
      }
  }
  return [totalRed, totalGreen, totalBlue]

}

function radialBlurFilter(img){
  var imgOut = createImage(img.width, img.height)
  var matrixSize = matrix.length
  imgOut.loadPixels();
  img.loadPixels();
  for(var x=0; x<img.width; x++){
      for(var y=0; y<img.height; y++){
          var index = (y*img.width + x) *4;
          var oldRed = img.pixels[index + 0]
          var oldGreen = img.pixels[index + 1]
          var oldBlue = img.pixels[index + 2]
        
          var c = convolution(x,y,matrix, matrixSize, img)
  
          
          var dynBlur = map(dist(x,y,mouseX, mouseY), 0, 300, 0, 1)
          imgOut.pixels[index + 0] = c[0]*dynBlur + oldRed*(1-dynBlur);
          imgOut.pixels[index + 1] = c[1]*dynBlur + oldGreen*(1-dynBlur);
          imgOut.pixels[index + 2] = c[2]*dynBlur + oldBlue*(1-dynBlur);
          imgOut.pixels[index + 3] = 255;         
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

function keyPressed() {
  console.error("value: ", keyCode)
  if (keyCode === 49) {
    filter_no = 1;
  } else if(keyCode === 50){
    filter_no = 2;
  } else if(keyCode === 51){
    filter_no = 3;
  }
  loop();
}