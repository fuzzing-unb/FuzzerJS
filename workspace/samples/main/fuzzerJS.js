const CoverageJS = require('../../src/coverageJS/coverageJS');
const RandomFuzzer = require('../../src/core/randomFuzzer');
const NodeScriptRunner = require('../../src/core/nodeScriptRunner');

const TimeTaker = require('../../src/utils/timeTaker');
const ResultAnaliser = require('../../src/utils/resultAnaliser');


const BlackboxGenerationBased = require('../../src/fuzzers/blackboxGenerationBased');

inputs = []

scriptPath = ""
testscriptPath = ""

// console.log(process.argv)
// // Validate inputs
inputs = process.argv.slice(2)
if (inputs.length == 0) {
    throw "Write at least one parameter"
}

scriptPath = ""
times = 50
fuzzer = 0
coverage = 0
// scriptPath = "/usr/src/workspace/samples/programs/CGIdecode.js";
outputPath = "/usr/src/workspace/output.txt";
// scriptPath = inputs[0]

// if (typeof inputs[1] !== 'undefined') {
//     times = inputs[1] 
// }

for (let index = 0; index < inputs.length; index++) {
    const input = inputs[index];
    // console.log(input)
    // switch (input) {
    //     case input.startsWith("-F="):
    //         scriptPath = input.substring(3, inputs[index].lenght)
    //         break;
    //     case input.startsWith("-T="):
    //         times = input.substring(3, inputs[index].lenght)
    //         break;

    //     default:
    //         break;
    // }


    if (input.startsWith("-P=")) {
        scriptPath = input.substring(3, inputs[index].lenght)
    }

    if (input.startsWith("-T=")) {
        times = inputs[index].substring(3, inputs[index].lenght)
    }

    if (input.startsWith("-F=")) {
        fuzzer = inputs[index].substring(3, inputs[index].lenght)
    }

    if (input.startsWith("-C")) {
        coverage = 1
    }

}




// // blackbox generation-based fuzzer

if (fuzzer == "black") {
    BlackboxGenerationBased.run(scriptPath, times, outputPath)
    console.log(`Output created at > ${outputPath}`)
} else {
    if (coverage) {

        // Test Coverage
        randomFuzzer = new RandomFuzzer()
        inp = randomFuzzer.fuzz()
        inp = inp.replace(/"/g, "");
        console.log(inp)
        console.log(CoverageJS.run(scriptPath, inp))
    }
    else {
        console.log("incorrect parameters")
    }
}

// node samples/main/fuzzerJS.js -P=/usr/src/workspace/samples/programs/CGIdecode.js -C


