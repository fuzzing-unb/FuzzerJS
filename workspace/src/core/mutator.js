
class Mutator {

    constructor() {
    }

    mutate(input) {

        switch (Math.floor(Math.random() * 3)) {
            case 0:
                input = this._insertRandomCharacter(input)
            case 1:
                input = this._deleteRandomCharacter(input)
            case 2:
                input = this._flipRandomCharacter(input)
        }

        return input = input.replace(/"/g, '');
    }

    _insertRandomCharacter(input) {

        let position = Math.floor(Math.random() * input.length)
        let randomCharacter = String.fromCharCode(this._getRandomIntInRange(32, 127));

        return input.substring(0, position) + randomCharacter + input.substring(position, input.length);

    }

    _deleteRandomCharacter(input) {

        if (input == "") {
            return this._insertRandomCharacter(input)
        }

        let position = Math.floor(Math.random() * input.length - 1)

        return input.substring(0, position) + input.substring(position + 1, input.length);
    }

    _flipRandomCharacter(input) {

        if (input == "") {
            return this._insertRandomCharacter(input)
        }

        let position = Math.floor(Math.random() * input.length)
        let randomCharacter = String.fromCharCode(this._getRandomIntInRange(32, 127));

        return input.substring(0, position) + randomCharacter + input.substring(position + 1, input.length);

    }

    _getRandomIntInRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

}

module.exports = Mutator