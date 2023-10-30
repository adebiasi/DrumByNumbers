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

}