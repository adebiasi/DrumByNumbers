let inputTextList = [];
let currPatternIndex = 0;

let defaultSoundsNames = ["acoustic", "acoustic_legacy", "beatbox", "electro", "hiphop", "r2d2", "world"]
let defaultSampleNames = ["crash", "hihat", "kick", "openhat", "ride", "snare", "tom1", "tom2", "tom3", "tom4"]

let currFrame = 0
let binaryList;
let samples = []
let timeRate = 500;
let intId;
let currSounds = 0;

let currInputText = ""


function setup() {
    View.setup();

    prepareSounds(defaultSoundsNames[0]);

    binaryList = []
    inputTextList = [];
    for (let i = 0; i < defaultSampleNames.length; i++) {
        binaryList.push([]);
        inputTextList.push("");
    }
    intId = setInterval(playSamples, timeRate);

}

function prepareSounds(sound) {
    samples = []

    for (let i = 0; i < defaultSampleNames.length; i++) {
        loadSound('sounds/' + sound + '/' + defaultSampleNames[i] + '.wav', soundLoaded, soundError);
    }

}

function soundLoaded(sound) {
    if (sound.isLoaded()) {
        samples.push(sound)
        samples.sort((a, b) => a.file.localeCompare(b.file));
    }
}

function soundError(sound) {
}


function draw() {
    View.draw(currInputText, binaryList, samples, timeRate);
}


function playSamples() {
    currFrame++;

    for (let i = 0; i < samples.length; i++) {
        play(i, samples[i]);
    }
}

function play(index, sample) {

    if (binaryList[index] == null) return;

    if (binaryList[index][currFrame % binaryList[index].length] == 1) {
        sample.play();
    }
}


function incSampleIndex() {
    currPatternIndex = (currPatternIndex + 1) % samples.length
}

function decSampleIndex() {
    if (currPatternIndex == 0) {
        currPatternIndex = samples.length - 1
    } else {
        currPatternIndex = (currPatternIndex - 1) % samples.length
    }
}

const DOWN_KEY_CODE = 40
const UP_KEY_CODE = 38
const LEFT_KEY_CODE = 37
const RIGHT_KEY_CODE = 39
const SPACE_KEY_CODE = 32

let shiftKey = false;
let ctrlKey = false;

function keyPressed() {
    console.log(keyCode)

    if (keyIsDown(SHIFT)) {
        shiftKey = true;
    }
    if (keyIsDown(CONTROL)) {
        ctrlKey = true;
    }

    if (shiftKey && ctrlKey) {
        let prevSampleIndex = currPatternIndex;
        let prevText = inputTextList[prevSampleIndex]
        let prevBinary = binaryList[prevSampleIndex]
        if (keyCode === DOWN_ARROW) {
            console.log("Shift + Ctrl + Freccia giù premuti contemporaneamente.");
            incSampleIndex();
        } else if (keyCode === UP_ARROW) {
            console.log("Shift + Ctrl + Freccia su premuti contemporaneamente.");
            decSampleIndex();
        }
        inputTextList[prevSampleIndex] = inputTextList[currPatternIndex]
        binaryList[prevSampleIndex] = binaryList[currPatternIndex]
        inputTextList[currPatternIndex] = prevText;
        binaryList[currPatternIndex] = prevBinary;
        // incSampleIndex();
    } else if (
        (keyCode >= 48 && keyCode <= 57) ||
        (/[!@#$%^&*(),.?":{}|<>]/.test(key)) ||
        key == 'm') {
        currInputText += key;
    } else if (keyCode === BACKSPACE) {
        currInputText = currInputText.slice(0, -1);
    } else if (keyCode === 13) {
        let expandedTextList = RhythmsGenerator.expandText(currInputText)

        currInputText = "";

        for (let i = 0; i < expandedTextList.length; i++) {
            let processedText = RhythmsGenerator.processText(expandedTextList[i]);

            inputTextList[currPatternIndex] = expandedTextList[i];
            binaryList[currPatternIndex] = processedText;
            incSampleIndex();
        }
        currInputText = inputTextList[currPatternIndex];

    } else if (keyCode === DOWN_KEY_CODE) {
        incSampleIndex();
        currInputText = inputTextList[currPatternIndex];

    } else if (keyCode === UP_KEY_CODE) {
        decSampleIndex();
        currInputText = inputTextList[currPatternIndex];

    } else if (keyCode === LEFT_KEY_CODE) {
        timeRate += 25;
        clearInterval(intId)
        intId = setInterval(playSamples, timeRate);
    } else if (keyCode === RIGHT_KEY_CODE) {
        timeRate -= 25;
        clearInterval(intId)
        intId = setInterval(playSamples, timeRate);
    } else if (keyCode === SPACE_KEY_CODE) {
        currSounds++;
        prepareSounds(defaultSoundsNames[currSounds % defaultSoundsNames.length]);
    }

}

function keyReleased() {
    if (keyCode === SHIFT) {
        shiftKey = false;
    } else if (keyCode === CONTROL) {
        ctrlKey = false;
    }
}