const video = document.getElementById("webcam");
const label = document.getElementById("label");

// const labelOneBtn = document.querySelector("#labelOne");
// const labelTwoBtn = document.querySelector("#labelTwo");
const labelThreeBtn = document.querySelector("#labelThree");
// const trainbtn = document.querySelector("#train");
// const savebtn = document.querySelector("#save");

// labelOneBtn.addEventListener("click", () => addLuke() && console.log("- Adding Luke img.."));
// labelTwoBtn.addEventListener("click", () => addNonLuke() && console.log("- Adding non Luke img.."));
labelThreeBtn.addEventListener("click", () =>  classify() && console.log("- Classifying.."));

// trainbtn.addEventListener("click", () => train() && console.log("- Training.."));
// savebtn.addEventListener("click", () => save() && console.log("- Saving.."));

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}
label.innerText = "Show me a picture of a Giraffe!";

// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
    featureExtractor.load('model/model.json');
    console.log('Model Loaded!');
}



// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, videoReady);

// Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}


function addLuke() {
    console.log('add luke')
    label.innerText = 'Added Luke';
    classifier.addImage(document.getElementById('webcam'), 'Luke');
}

function addNonLuke() {
    console.log('add non luke')
    label.innerText = 'Added non Luke';
    classifier.addImage(document.getElementById('webcam'), 'nonLuke');
}

// Retrain the network
function train() {
classifier.train((lossValue) => {
    if (lossValue === null) {
        label.innerText = 'Training Completed';
    } else {
        label.innerText = 'Loss is ' + lossValue;
}
});
}

// Get a prediction for that image
function classify() {
classifier.classify(document.getElementById('webcam'), (err, result) => {
    console.log(result);

    if (result[0].label == 'giraffe') {
        speak(`That looks like a fine giraffe`)
        label.innerText = 'That looks like a fine giraffe';
    } else {
        speak(`that ain't no giraffe man..`)
        label.innerText = 'that aint no giraffe man';
    }
});
}

// Save the model locally
function save() {
    label.innerText = 'Model saved to download folder.';
    featureExtractor.save();
}

let synth = window.speechSynthesis

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

speak("Hello how about you show me agirrafe?")
