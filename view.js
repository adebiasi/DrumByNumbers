const BACKGROUND_COLOR = 220;

const
    CANVAS_WIDTH = 1200
const
    CANVAS_HEIGHT = 800
const
    NUMBER_FONT_SIZE = 120;
const
    BINARY_FONT_SIZE = 55;
const
    SPACE_RHYTHM_DISPLAY_Y = 60;
const
    POS_RHYTHM_DISPLAY_Y = 100;
const
    POS_TYPED_TEXT_DISPLAY_Y = CANVAS_HEIGHT - 200;
const
    POS_TYPED_TEXT_DISPLAY_X = CANVAS_WIDTH / 2;
const
    SPACE_RHYTHM_DISPLAY_X = 50;
const
    POS_RHYTHM_NAME_DISPLAY_X = 200;
const
    POS_RHYTHM_PATTERN_DISPLAY_X = 300;

class View {

    static setup() {
        createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        textAlign(CENTER, CENTER);
    }

    static draw(currInputText, binaryList, samples) {

        background(BACKGROUND_COLOR);
        stroke(0, 0, 0)
        fill(0, 0, 0)
        textAlign(CENTER)
        textSize(NUMBER_FONT_SIZE);

        text(currInputText, POS_TYPED_TEXT_DISPLAY_X, POS_TYPED_TEXT_DISPLAY_Y);

        View.displayBinaryList(binaryList, samples);
    }

    static displayBinaryList(binaryList, samples) {
        textSize(BINARY_FONT_SIZE);
        textAlign(CENTER)
        for (let i = 0; i < samples.length; i++) {
            View.displayBinary(binaryList[i], samples, i);
        }
    }


    static displayBinary(binaryArray, samples, index) {
        //background(220);
        textAlign(CENTER)
        if (binaryArray == null) return
        let x = POS_RHYTHM_PATTERN_DISPLAY_X;
        for (let i = 0; i < binaryArray.length; i++) {
            if (i == (currFrame % binaryArray.length)) {
                stroke(255, 0, 0)
                fill(255, 0, 0)
            } else {
                stroke(0, 0, 0)
                fill(0, 0, 0)

            }
            let symbol = '.'
            if (binaryArray[i] == 1) {
                symbol = 'X'
            }
            text(symbol, x, POS_RHYTHM_DISPLAY_Y + (index * SPACE_RHYTHM_DISPLAY_Y));
            x += SPACE_RHYTHM_DISPLAY_X;
        }
        if (currPatternIndex == index) {
            stroke(255, 0, 0)
            fill(255, 0, 0)
        } else {
            stroke(0, 0, 0)
            fill(0, 0, 0)
        }
        textAlign(RIGHT)
        let samplePath = samples[index].file;
        let sampleNames = samplePath.split('/')
        let sampleName = sampleNames[sampleNames.length - 1];
        text(sampleName.split('.')[0], POS_RHYTHM_NAME_DISPLAY_X, POS_RHYTHM_DISPLAY_Y + (index * SPACE_RHYTHM_DISPLAY_Y));
    }
}