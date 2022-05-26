img="";
Status="";
Objects=[];
function preload(){
}
function setup(){
    canvas=createCanvas(350,350);
canvas.center();
video= createCapture(VIDEO);
video.size(350,350);
video.hide();
objectDetector= ml5.objectDetector('cocossd',modelLoaded); 
document.getElementById("status").innerHTML="Status: Detecting objects";
document.getElementById("no").innerHTML="No. of objects detected are-";
}

function modelLoaded(){
    console.log("Model is loaded");
    Status= "True";
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    Objects=results;
}

function draw(){
    image(video,0,0,350,350);
if(Status !=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotResult);
    for(i=0; i < Objects.length; i++){
        document.getElementById("status").innerHTML="Status: Object(s) Detected";
        document.getElementById("no").innerHTML="No. of objects detected are- "+Objects.length;
        percent= floor(Objects[i].confidence*100);
        fill(r,g,b);
        stroke(r,g,b);
        noFill();
        text(Objects[i].label+" "+percent+"%",Objects[i].x+15,Objects[i].y+15);
        rect(Objects[i].x,Objects[i].y,Objects[i].width,Objects[i].height);
    }
}
}