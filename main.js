song1 = "";
song2= "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload() {
    song1= loadSound("Harry potter.mp3");
    song2 = loadSound("peter.mp3")
}

function setup() {
    canvas = createCanvas(600,430);
    canvas.position(450, 225);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded() {
    console.log("PoseNet model has been initialized!");
}

function draw() {
    image(video, 0, 0, 600, 450);
}

function gotPoses(results) {
if (results.length > 0) {
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;

    console.log("Left Wrist X is " + leftWristX + " and Left Wrist Y is " + leftWristY);
    console.log("Right Wrist X is " + rightWristX + " and Right Wrist Y is " + rightWristY);
}
}