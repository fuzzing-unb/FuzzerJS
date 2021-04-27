const assert = require('assert');

const PrintRunner = require('../../src/core/printRunner');
const RandomFuzzer = require('../../src/core/randomFuzzer');
const ProgramRunner = require('../../src/core/programRunner');
const FuzzerGrammar = require('../../src/core/fuzzerGrammar');



// p = new PrintRunner();
// // console.log(p.run('abc'));
// let [result, outcome] = p.run("Some input");
// console.log(outcome);

// f = new RandomFuzzer();
// console.log(f.fuzz());

// programRunner = new ProgramRunner('cat');
// console.log(programRunner.run('abc'));

// // Running Fuzzer && ProgramRunner class

randomFuzzer = new RandomFuzzer();
fuzzerGrammar = new FuzzerGrammar('EXPR_GRAMMAR');
programRunner = new ProgramRunner('cat');

// //  Using boths
// for (let index = 0; index < 10; index++) {
//     inp = randomFuzzer.fuzz();
//     let [result, outcome] = programRunner.run(inp);
//     // assert(result.stdout == inp);
//     console.log(result)
// }

// // Using only RandomFuzzer class, its method run
// for (let index = 0; index < 10; index++) {
//     let [result, outcome] = randomFuzzer.run(programRunner);
//     console.log(result);
//     // assert(outcome === 'PASS');
// }

// programRunnerCat = new PrintRunner('cat');
// results = randomFuzzer.runs(programRunner, 10);
// console.log(results);

// programRunnerBC = new ProgramRunner('bc');
// results = fuzzerGrammar.runs(programRunnerBC, 10);
// console.log(results);

// for (let index = 0; index < 10; index++) {
//     inp = simpleGrammarFuzzer(EXPR_GRAMMAR, START_SYMBOL, 3, 100, false);
//     let [result, outcome] = programRunner.run(inp);
//     // assert(result.stdout == inp);
//     console.log(result)
// }

// // use new function fuzzes to fuzzer grammar
results = fuzzerGrammar.fuzzes(10);
console.log(results);