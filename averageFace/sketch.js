var imgs = [];
var avgImg;
var numOfImages = 30;
var amt = 0
var img_index;


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
    img_index = int(random(0, numOfImages))
    pixelDensity(1);
    createCanvas(imgs[0].width * 2, imgs[0].height);
    avgImg = createGraphics(imgs[0].width, imgs[0].height );
}

function keyPressed() {
    img_index = int(random(0, numOfImages))
    loop()
}

function mouseMoved() {
    amt = map(mouseX, 0, width, 0,1)
    draw()
}

//////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgs[img_index], 0, 0);

    avgImg.loadPixels();
    for(var i=0; i<numOfImages; i++){
        imgs[i].loadPixels();
    }
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
            var avg_vector = createVector(sumR/numOfImages, sumG/numOfImages, sumB/numOfImages)
            const right_img_x = imgs[img_index].pixels[index +0]
            const right_img_y = imgs[img_index].pixels[index +1]
            const right_img_z = imgs[img_index].pixels[index +2]
            avg_vector.lerp(right_img_x, right_img_y, right_img_z, amt)
            avgImg.pixels[index + 0] = avg_vector.x // red channel
            avgImg.pixels[index + 1] = avg_vector.y // green channel
            avgImg.pixels[index + 2] = avg_vector.z // blue channel
            avgImg.pixels[index + 3] = 255
        }   
    }
    avgImg.updatePixels();
    image(avgImg, imgs[0].width, 0);
    noLoop() 
}
