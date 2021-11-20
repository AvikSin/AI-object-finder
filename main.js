objects = []
status = ""


function setup() {
    canvas = createCanvas(350, 350)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(350, 350)
    video.hide()

}

function start() {
    object_name = document.getElementById("text_input").value
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "status : detecting Objects"
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 350, 350)
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object detected";
            fill("#FF0000");
            percentage = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name) {
                video.stop()
                objectDetector.detect(gotResult);
                document.getElementById("number_of_objects").innerHTML = object_name + " found";

                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + " Found");
                synth.speak(utterThis);

            } else {
                document.getElementById("number_of_objects").innerHTML = object_name + " not found"

            }
        }
    }
}