song1 = "";
song2= "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore =0;
leftStatus = "";
rightStatus = "";
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

    fill("#2a303d");
    stroke("#2a303d");
    rightStatus = song1.isPlaying();
    leftStatus = song2.isPlaying();
    if (leftWristScore > 0.2) {
        song1.stop();
    circle(leftWristX, leftWristY, 20);

    if (leftStatus == false) {
        song2.play();
        document.getElementById("value").innerHTML = "Peter Pan";
    }
    }
    if (rightWristScore > 0.2) {
        song2.stop();
        circle(rightWristX, rightWristY, 20) 

        if(rightStatus == false) {
            song1.play();
            document.getElementById("value").innerHTML = "Harry Potter"
        }
    }
}

function gotPoses(results) {
if (results.length > 0) {
    console.log(results);
    leftWristScore = results[0].pose.keypoints[9].score;
    console.log("Left Wrist Score is " + leftWristScore);
    rightWristScore = results[0].pose.keypoints[10].score;
    console.log("Right Wrist Score is " + rightWristScore);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;

    console.log("Left Wrist X is " + leftWristX + " and Left Wrist Y is " + leftWristY);
    console.log("Right Wrist X is " + rightWristX + " and Right Wrist Y is " + rightWristY);
}
}