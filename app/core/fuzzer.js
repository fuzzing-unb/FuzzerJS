const assert = require('assert');

const Runner = require('./runner');
// const PrintRunner = require('./printRunner');

class Fuzzer {

    constructor() {
    }

    fuzz() {
        return "";
    }

    // run(runner: Runner){
    run(runner) {
        assert(runner instanceof Runner); //validate type

        return runner.run(this.fuzz());
    }

    runs(runner, trials = 10) {
        assert(runner instanceof Runner); //validate type

        var outcomes = [];
        for (let index = 0; index < trials; index++) {
            outcomes.push(this.run(runner));
        }
        return outcomes;
    }
}

module.exports = Fuzzer