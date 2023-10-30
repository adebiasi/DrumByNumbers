let inputTextList;
let currPatternIndex = 0;
let numberFontSize = 260;
let binaryFontSize = 15;
let soundsNames = ["acoustic", "acoustic_legacy", "beatbox", "electro", "hiphop", "r2d2", "world"]
let sampleNames = ["crash", "hihat", "kick", "openhat", "ride", "snare", "tom1", "tom2", "tom3", "tom4"]

let currFrame = 0
let binaryList;
let samples = []
let timeRate = 500;
let intId;
let currSounds = 0;

let currInputText = ""

function setup() {
    createCanvas(800, 800);
    // frameRate(1);
    textAlign(CENTER, CENTER);

    prepareSounds(soundsNames[0]);

    binaryList = []
    inputTextList = [];
    for (let i = 0; i < sampleNames.length; i++) {
        binaryList.push([]);
        inputTextList.push("");
    }
    intId = setInterval(incrementVariable, timeRate);

}

let sampleSound

function prepareSounds(sound) {
    samples = []
    // samplesResponses = []
    // for(let i = 0; i<sampleNames.length; i++){
    //     samplesResponses[i]="";
    // }
    for (let i = 0; i < sampleNames.length; i++) {
        sampleSound = loadSound('sounds/' + sound + '/' + sampleNames[i] + '.wav', soundLoaded, soundError);
    }

}

function soundLoaded(sound) {
    if (sound.isLoaded()) {
        samples.push(sound)
        samples.sort((a, b) => a.file.localeCompare(b.file));
    }
}

function soundError(sound) {
    // if (sound.isLoaded()) {
    //     samples.push(sound)
    //     samples.sort();
    // }
}

function draw() {
    background(220);
    stroke(0, 0, 0)
    fill(0, 0, 0)
    textAlign(CENTER)
    textSize(numberFontSize);

    text(currInputText, width / 2, height * 0.25);
    // binaryList = RhythmsGenerator.decimalToPatternList(inputTextList);
    displayBinaryList(binaryList);


}

function processText(currText) {

    const regexEuclideanRhythm = /^\d+,\d+$/;
    const matchEuclideanRhythm = regexEuclideanRhythm.exec(currText);

    const regexIntervals = /^\d+(\.\d+)+$/;
    const matchIntervals = regexIntervals.exec(currText);

    const regexCrossRhythm = /^\d+(\:\d+)+$/;
    const matchCrossRhythm = regexCrossRhythm.exec(currText);

    if (matchCrossRhythm) {
        const numbers = matchCrossRhythm[0].split(':');
        let lcm = RhythmsGenerator.calculateLCMForList(numbers);
        console.log("lcm: " + lcm)
        let list = []
        for (let i = 0; i < numbers.length; i++) {
            let res = (RhythmsGenerator.euclideanRhythms(numbers[i], lcm));
            list.push(res);
        }
        console.log(list)
        return list;
    } else if (matchIntervals) {
        const numbers = matchIntervals[0].split('.');
        console.log(numbers)
        let res = RhythmsGenerator.intervals(numbers);
        console.log(res);
        return res;
    } else if (matchEuclideanRhythm) {
        const numbers = matchEuclideanRhythm[0].split(',');
        const pulses = parseFloat(numbers[0]);
        const steps = parseFloat(numbers[1]);
        console.log(pulses)
        console.log(steps)

        let res = RhythmsGenerator.euclideanRhythms(pulses, steps);
        console.log(res);
        return res;
    } else {
        return RhythmsGenerator.decimalToPattern(currText);
    }
}

function displayBinaryList(binaryList) {
    textSize(binaryFontSize);
    textAlign(CENTER)
    for (let i = 0; i < samples.length; i++) {
        displayBinary(binaryList[i], i);
    }
}

function displayBinary(binaryArray, index) {
    //background(220);
    textAlign(CENTER)
    if (binaryArray == null) return
    let x = width - 20;
    for (let i = binaryArray.length - 1; i >= 0; i--) {
        if (i == (currFrame % binaryArray.length)) {
            stroke(255, 0, 0)
            fill(255, 0, 0)
        } else {
            stroke(0, 0, 0)
            fill(0, 0, 0)

        }
        text(binaryArray[i], x, (height * 0.5) + (index * 30));
        x -= 25;
    }
    if (currPatternIndex == index) {
        stroke(255, 0, 0)
        fill(255, 0, 0)
    } else {
        stroke(0, 0, 0)
        fill(0, 0, 0)
    }
    textAlign(LEFT)
    let samplePath = samples[index].file;
    let sampleNames = samplePath.split('/')
    let sampleName = sampleNames[sampleNames.length - 1];
    text(sampleName.split('.')[0], 50, (height * 0.5) + (index * 30));
}

function incrementVariable() {
    currFrame++;

    for (let i = 0; i < samples.length; i++) {
        play(i, samples[i]);
    }
}

function play(index, sample) {

    if (binaryList[index] == null) return;

    if (binaryList[index][currFrame % binaryList[index].length] == 1) {
        sample.play();
    } else {
        // sample.stop();
    }
}


function keyPressed() {
    console.log(keyCode)
    if ((keyCode >= 48 && keyCode <= 57) || (/[!@#$%^&*(),.?":{}|<>]/.test(key))) {
        // Verifica se il tasto premuto è un numero (0-9)
        // inputNumbers[currNumber] += key;
        currInputText += key;
    } else if (keyCode === BACKSPACE) {
        // Se premi il tasto BACKSPACE, rimuovi l'ultimo carattere
        // inputNumbers[currNumber] = inputNumbers[currNumber].slice(0, -1);
        currInputText = currInputText.slice(0, -1);
    } else if (keyCode === 13) {

        inputTextList[currPatternIndex] = currInputText;
        let processedText = processText(currInputText);
        currInputText = "";

        if (Array.isArray(processedText[0])) {
            console.log("is array: "+processedText[0])
            for (let i = 0; i < processedText.length; i++) {
                console.log("is array: "+processedText[i])
                binaryList[currPatternIndex] = processedText[i];
                currPatternIndex = (currPatternIndex + 1) % samples.length

            }
        } else {
            console.log("is number: "+processedText)

            binaryList[currPatternIndex] = processedText
            currPatternIndex = (currPatternIndex + 1) % samples.length

        }
    } else if (keyCode === 40) {
        currPatternIndex = (currPatternIndex + 1) % samples.length
        currInputText = inputTextList[currPatternIndex];

    } else if (keyCode === 38) {
        if (currPatternIndex == 0) {
            currPatternIndex = samples.length - 1
        } else {
            currPatternIndex = (currPatternIndex - 1) % samples.length
        }
        currInputText = inputTextList[currPatternIndex];

    } else if (keyCode === 37) {
        timeRate += 25;
        clearInterval(intId)
        intId = setInterval(incrementVariable, timeRate);
    } else if (keyCode === 39) {
        timeRate -= 25;
        clearInterval(intId)
        intId = setInterval(incrementVariable, timeRate);
    } else if (keyCode === 32) {
        currSounds++;
        prepareSounds(soundsNames[currSounds % soundsNames.length]);
    }
}
