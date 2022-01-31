var imgs = [];
var avgImg;
var numOfImages = 30;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    for(var i=0; i<numOfImages; i++){
        var filename = "assets/"+i+".jpg"
        console.log("loading filename: "+ filename)
        img = loadImage(filename)
        imgs.push(img)
    }

}
//////////////////////////////////////////////////////////
function setup() {
    pixelDensity(1);
    createCanvas(imgs[0].width * 2, imgs[0].height);
    avgImg = createGraphics(imgs[0].width, imgs[0].height );
}

function keyPressed() {
    draw();
}

//////////////////////////////////////////////////////////
function draw() {
    background(125);
    const img_index = int(random(0, numOfImages))
    image(imgs[img_index], 0, 0);

    avgImg.loadPixels();
    for(var i=0; i<numOfImages; i++){
        imgs[i].loadPixels();
    }
    // imgs[0].pixels.forEach((pixel, index)=>{
    //     const x = index
    // })
    for(var x =0; x<imgs[0].width; x++){
        for(var y =0; y<imgs[0].width; y++){
            var index = ((imgs[0].width * y) + x) * 4;
            var sumR =0;
            var sumG =0;
            var sumB =0;
            for(var i=0; i< numOfImages; i++){
                sumR += imgs[i].pixels[index+0]
                sumG += imgs[i].pixels[index+1]
                sumB += imgs[i].pixels[index+2]
            }
            avgImg.pixels[index + 0] = sumR/numOfImages // red channel
            avgImg.pixels[index + 1] = sumG/numOfImages // green channel
            avgImg.pixels[index + 2] = sumB/numOfImages // blue channel
            avgImg.pixels[index + 3] = 255
        }   
    }
    avgImg.updatePixels();
    image(avgImg, imgs[0].width, 0);
    noLoop() 
}
