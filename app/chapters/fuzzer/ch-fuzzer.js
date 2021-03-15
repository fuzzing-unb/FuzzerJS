const assert = require('assert');

const PrintRunner = require('../../core/printRunner');
const RandomFuzzer = require('../../core/randomFuzzer');
const ProgramRunner = require('../../core/programRunner');

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
programRunner = new ProgramRunner('cat');

// //  Using boths
// for (let index = 0; index < 10; index++) {
//     inp = randomFuzzer.fuzz();
//     let [result, outcome] = programRunner.run(inp);
//     assert(result.stdout == inp);
// }

// // Using only RandomFuzzer class, its method run

// for (let index = 0; index < 10; index++) {
//     let [result, outcome] = randomFuzzer.run(programRunner);
//     console.log(result);
//     assert(outcome === 'PASS');
// }

programRunnerCat = new PrintRunner('cat');
results = randomFuzzer.runs(programRunner, 10);
console.log(results);
