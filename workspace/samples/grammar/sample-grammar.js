// console.log('sample grammar')

const { START_SYMBOL, EXPR_GRAMMAR, URL_GRAMMAR, CGI_GRAMMAR } = require('../../src/core/constant/grammar');
const { simpleGrammarFuzzer } = require('../../src/core/simpleGrammarFuzzer');

// console.log(simpleGrammarFuzzer(EXPR_GRAMMAR))
// console.log(simpleGrammarFuzzer(EXPR_GRAMMAR, START_SYMBOL, 3, 100, false))
for (let index = 0; index < 10; index++) {
    // console.log(simpleGrammarFuzzer(EXPR_GRAMMAR, START_SYMBOL, 5, 100, false))
    // console.log(simpleGrammarFuzzer(URL_GRAMMAR, START_SYMBOL, 5, 100, false))
    console.log(simpleGrammarFuzzer(CGI_GRAMMAR, START_SYMBOL, 5, 100, false))
}

