class RhythmsGenerator {

    static decimalToPatternList(decimalList) {
        let res = []

        for (let i = 0; i < decimalList.length; i++) {
            res.push(RhythmsGenerator.decimalToPattern(decimalList[i]));
        }
        return res;
    }

    static decimalToPattern(decimal) {
        let binaryArray = []; // Azzera l'array
        while (decimal > 0) {
            let remainder = decimal % 2; // Calcola la cifra binaria corrente
            binaryArray.unshift(remainder); // Aggiungi la cifra all'inizio dell'array
            decimal = Math.floor(decimal / 2); // Dividi il numero decimale per 2
        }

        const numberOfZerosToAdd = 16 - binaryArray.length;

        for (let i = 0; i < numberOfZerosToAdd; i++) {
            binaryArray.unshift(0);
        }

        if (binaryArray.length > 16) return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        return binaryArray;
    }

    static intervals(numbers) {
        let res = []

        for (let i = 0; i < numbers.length; i++) {
            res.push(1);
            for (let j = 0; j < numbers[i] - 1; j++) {
                res.push(0);
            }
        }

        return res;

    }

    static euclideanRhythms(pulses, steps) {
console.log("euclideanRhythms: "+pulses+" "+steps);
        if (pulses > steps) pulses = steps;

        // step 0
        let a = "1";
        let b = "0";
        let k = pulses;
        let m = steps - pulses;

        let cpy, tmp;

        do {
            cpy = a;
            a += b;
            if (k <= m) {  // step 1
                m -= k;
            } else {       // step 2, 3
                b = cpy;
                tmp = k;
                k = m;
                m = tmp - m;
            }
        } while (m > 1 & k > 1);

        // step 4
        let rhythm = "";
        while (k > 0) (rhythm += a, --k);
        while (m > 0) (rhythm += b, --m);

        return rhythm.split('');
    }

    static generaArray(config, x) {
        const n = config.length;
        const probMap = {'L': 0.1, 'M': 0.4, 'H': 0.8};

        // Mappa la configurazione nei pesi
        const pesi = config.map(c => probMap[c] || 0);

        // Normalizza i pesi
        const somma = pesi.reduce((a, b) => a + b, 0);
        const distribuzione = pesi.map(p => p / somma);

        // Estrai x indici con probabilità pesata (senza ripetizioni)
        const selezionati = RhythmsGenerator.weightedSample(distribuzione, x);

        // Costruisci l'array finale
        const risultato = Array(n).fill(0);
        selezionati.forEach(i => risultato[i] = 1);

        return risultato;
    }

// Funzione di campionamento pesato senza ripetizioni
    static weightedSample(prob, count) {
        const n = prob.length;
        const scelti = new Set();

        while (scelti.size < count) {
            let r = Math.random();
            let somma = 0;

            for (let i = 0; i < n; i++) {
                somma += prob[i];
                if (r <= somma && !scelti.has(i)) {
                    scelti.add(i);
                    break;
                }
            }
        }

        return Array.from(scelti);
    }

    static rhythmDistribution(x) {
            const config = ['M', 'M', 'H', 'L', 'H', 'M', 'M', 'H', 'M', 'M', 'L', 'H', 'M', 'M', 'H', 'M'];
        return this.generaArray(config, x)
    }

    static calculateLCMForList(numbers) {
        // Function to calculate the GCD of two numbers
        function calculateGCD(x, y) {
            while (y !== 0) {
                const temp = y;
                y = x % y;
                x = temp;
            }
            return x;
        }

        // Function to calculate the LCM of a list of numbers
        function calculateLCMList(numbers) {
            let lcm = numbers[0];
            for (let i = 1; i < numbers.length; i++) {
                const currentNumber = numbers[i];
                const gcd = calculateGCD(lcm, currentNumber);
                lcm = (lcm * currentNumber) / gcd;
            }
            return lcm;
        }

        if (numbers.length < 2) {
            console.log("The list must contain at least two numbers.");
            return;
        }

        return calculateLCMList(numbers);
    }

    static processText(currText) {

        const regexEuclideanRhythm = /^\d+,\d+$/;
        const matchEuclideanRhythm = regexEuclideanRhythm.exec(currText);

        const regexIntervals = /^\d+(\.\d+)+$/;
        const matchIntervals = regexIntervals.exec(currText);

        const regexDistribution = /m(\d+)/;
        const matchDistribution = regexDistribution.exec(currText);
        if (matchIntervals) {
            const numbers = matchIntervals[0].split('.');
            return RhythmsGenerator.intervals(numbers);
        } else if (matchEuclideanRhythm) {
            const numbers = matchEuclideanRhythm[0].split(',');
            const pulses = parseFloat(numbers[0]);
            const steps = parseFloat(numbers[1]);

            return RhythmsGenerator.euclideanRhythms(pulses, steps);
        } else if (matchDistribution) {
            const number = matchDistribution[1];
            console.log(number)
            return RhythmsGenerator.rhythmDistribution(number)
        } else {
            return RhythmsGenerator.decimalToPattern(currText);
        }
    }


    static expandText(currText) {
        const regexCrossRhythm = /^\d+(\:\d+)+$/;
        const matchCrossRhythm = regexCrossRhythm.exec(currText);

        let list = []

        if (matchCrossRhythm) {
            const numbers = matchCrossRhythm[0].split(':');
            let lcm = RhythmsGenerator.calculateLCMForList(numbers);
            for (let i = 0; i < numbers.length; i++) {
                list.push(numbers[i] + ',' + lcm);
            }
        } else {
            list.push(currText)
        }

        return list;

    }
}