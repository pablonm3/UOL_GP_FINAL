var confLocs  = []
var confTheta = []
var grass_img,
    ball_img;

function setup() {
    grass_img = loadImage("assets/grass.jpeg")
    ball_img = loadImage("assets/ball.jpeg")
    createCanvas(900, 800, WEBGL);
    angleMode(DEGREES);
    for(var i=0; i<200; i++){
        const v = createVector(random(-500, 501), random(-800, 1), random(-500, 501))
        confLocs.push(v)
        confTheta.push(random(0, 361))
    }
}

function confetti(){
    texture(ball_img)
    noStroke()
    for(var i=0; i<200; i++){
        push()
            translate(confLocs[i])
            rotateX(confTheta[i])
            //TODO: add ball texture here
            sphere(15,15)
        pop()
        confLocs[i].y += 1
        confTheta[i] += 10
        if(confLocs[i].y >0){
            confLocs[i].y = -800
        }
    }
}

function draw() {
    background(125);
    //camera(800, -600, 800);
    var xLoc = cos(frameCount) * height*1.2
    var zLoc = sin(frameCount) * height*1.2
    camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0)
    normalMaterial();
    stroke(0);
    strokeWeight(2);
    confetti()
    //pointLight(255, 255, 255, height,height,height);
    //lights();
    ambientLight(128, 128, 128);
    directionalLight(128, 128, 128, 0, 300, 0);
    for (var x=-400; x<400; x+=50){
        for (var z=-400; z<400; z+=50){
            push()
                translate(x, 0, z)
                const distance = dist(0, x, 0, 0, 0, z)
                const length = map(sin(distance + frameCount), -1, 1, 100, 300)
                ambientMaterial(255, 255, 255);
                texture(grass_img)
                //pointLight(255, 255, 255, 0, 0, 0);
                box(50, length, 50)
            pop()
        }   
    }
}
