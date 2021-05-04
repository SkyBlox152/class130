song = "";
left_wristX = 0;
left_wristY = 0;
right_wristX = 0;
right_wristY = 0;
score = 0;
scoreRightwrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, module_loaded)
    posenet.on('pose', gotposses);
}

function preload() {
    song = "music.mp3";
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill(255, 255, 255);
    stroke("black");

    if (score > 0.2) {
        circle(left_wristX, left_wristY, 20);
        Left_wrist_x = Number(left_wristX);
        Number_remove_decimal = floor(Left_wrist_x);
        divide_volume = Number_remove_decimal / 500;
        document.getElementById("songvolume1").innerHTML="volume= "+divide_volume; 
        song.setVolume(divide_volume);
    }

    if (scoreRightwrist > 0.2) {
        circle(right_wristX, right_wristY, 20);
        if (right_wristY > 0 && right_wristY <= 100) {
            song.rate(0.5);
            document.getElementById("songrate1").innerHTML = "Speed=0.5X";
        }
        else if(right_wristY > 100 && right_wristY <= 200){
            song.rate(1);
            document.getElementById("songrate1").innerHTML = "Speed=1X";
        }
        else if(right_wristY > 200 && right_wristY <= 300){
            song.rate(1.5);
            document.getElementById("songrate1").innerHTML = "Speed=1.5X";
        }
        else if(right_wristY > 300 && right_wristY <= 400){
            song.rate(2);
            document.getElementById("songrate1").innerHTML = "Speed=2X";
        }
        else if(right_wristY > 400 && right_wristY <= 500){
            song.rate(2.5);
            document.getElementById("songrate1").innerHTML = "Speed=2.5X";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1.0);
}

function module_loaded() {
    console.log("model has loaded");
}

function gotposses(results) {
    console.log(results);
    if (results.length > 0) {
        score = results[0].pose.keypoints[9].score;
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;
        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;
        scoreRightwrist = results[0].pose.keypoints[10].score;
    }
}

