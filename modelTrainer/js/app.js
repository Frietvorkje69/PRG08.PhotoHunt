const video = document.getElementById("webcam");
const label = document.getElementById("label");

const labelGiraffeBtn = document.querySelector("#labelGiraffe");
const labelDogBtn = document.querySelector("#labelDog");
const labelCatBtn = document.querySelector("#labelCat");
const labelHumanBtn = document.querySelector("#labelHuman");
const savebtn = document.querySelector("#save");
const trainbtn = document.querySelector("#train");

const labelClassifyBtn = document.querySelector("#labelClassify");

labelGiraffeBtn.addEventListener("click", () => addGiraffe() && console.log("- Adding giraffe img.."));
labelDogBtn.addEventListener("click", () => addDog() && console.log("- Adding dog img.."));
labelCatBtn.addEventListener("click", () => addCat() && console.log("- Adding cat img.."));
labelHumanBtn.addEventListener("click", () => addHuman() && console.log("- Addin human img.."));
labelClassifyBtn.addEventListener("click", () => classify() && console.log("- Classifying.."));

trainbtn.addEventListener("click", () => train() && console.log("- Training.."));
savebtn.addEventListener("click", () => save() && console.log("- Saving.."));

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
label.innerText = "Ready when you are!";

// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
}



// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, videoReady);

// Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}

function addGiraffe() {
    console.log('add giraffe')
    label.innerText = 'Added Giraffe';
    classifier.addImage(document.getElementById('webcam'), 'giraffe');
}

function addCat() {
    console.log('add cat')
    label.innerText = 'Added cat';
    classifier.addImage(document.getElementById('webcam'), 'cat');
}

function addDog() {
    console.log('add dog')
    label.innerText = 'Added dog';
    classifier.addImage(document.getElementById('webcam'), 'dog');
}

function addHuman() {
    console.log('add Human')
    label.innerText = 'Added human';
    classifier.addImage(document.getElementById('webcam'), 'human');
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
    label.innerText = 'I spy a.. '+ result[0].label + ' (' + result[0].confidence + ')';
});
}

// Save the model locally
function save() {
    label.innerText = 'Model saved to download folder.';
    featureExtractor.save();
}
