const assert = require('assert');

const Runner = require('./runner');

const { START_SYMBOL, EXPR_GRAMMAR, CGI_GRAMMAR, DIGIT_GRAMMAR, URL_GRAMMAR } = require('../../src/core/constant/grammar');
const { simpleGrammarFuzzer } = require('../../src/core/simpleGrammarFuzzer');

class FuzzerGrammar {

    // GRAMMARS = ['EXPR_GRAMMAR', 'CGI_GRAMMAR', 'DIGIT_GRAMMAR', 'URL_GRAMMAR']

    constructor(grammar) {
        this._grammar = grammar;
    }

    fuzz() {

        let grammar = '';

        switch (this._grammar) {
            case 'EXPR_GRAMMAR':
                grammar = EXPR_GRAMMAR;
                break;
            case 'CGI_GRAMMAR':
                grammar = CGI_GRAMMAR;
                break;
            case 'DIGIT_GRAMMAR':
                grammar = DIGIT_GRAMMAR;
                break;
            case 'URL_GRAMMAR':
                grammar = URL_GRAMMAR;
                break;
            default:
                throw 'Grammar not found.'
        }

        return simpleGrammarFuzzer(grammar, START_SYMBOL, 5, 100, false);

    }

    fuzzes(trials) {

        var outcomes = [];
        for (let index = 0; index < trials; index++) {
            outcomes.push(this.fuzz())            
        }

        return outcomes
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

module.exports = FuzzerGrammar