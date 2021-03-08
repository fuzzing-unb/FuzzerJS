const Fuzzer = require('./fuzzer');

class RandomFuzzer extends Fuzzer {

    #minLength;
    #maxLength;
    #charStart;
    #charRange;

    constructor(minLength = 10, maxLength = 100, charStart = 32, charRange = 32) {
        super()
        this.#minLength = minLength;
        this.#maxLength = maxLength;
        this.#charStart = charStart;
        this.#charRange = charRange;
    }

    fuzz(){
        var stringLength = this.getRandomIntInRange(this.#minLength, this.#maxLength + 1);
        var out = "";
        for (let index = 0; index < stringLength; index++) {
            out += String.fromCharCode(this.getRandomIntInRange(this.#charStart, this.#charStart + this.#charRange));
        }
        return out;
    }

    getRandomIntInRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

}

module.exports = RandomFuzzer