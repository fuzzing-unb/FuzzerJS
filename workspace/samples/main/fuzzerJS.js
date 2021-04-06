const fs = require('fs');

// fuzzers
const BlackboxGenerationBased = require('../../src/fuzzers/blackboxGenerationBased');
const BlackboxMutationBased = require('../../src/fuzzers/blackboxMutationBased');


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
outputPath = ""
times = 50
fuzzer = ""
seeds = []
coverage = false
report = 0

fuzzerTypes = ["black", "grey"]
reportTypes = ['0', '1', '2']
// scriptPath = "/usr/src/workspace/samples/programs/CGIdecode.js";
// outputPath = "/usr/src/workspace/output.txt";
// scriptPath = inputs[0]

// if (typeof inputs[1] !== 'undefined') {
//     times = inputs[1] 
// }

for (let index = 0; index < inputs.length; index++) {
    const input = inputs[index];

    if (input.startsWith("-F=")) {
        fuzzer = inputs[index].substring(3, inputs[index].length)
    }

    if (input.startsWith("-P=")) {
        scriptPath = input.substring(3, inputs[index].length)
    }

    if (input.startsWith("-T=")) {
        times = inputs[index].substring(3, inputs[index].length)
        if (!Number.isInteger(Number(times))) {
            throw "value for -T must be integer number"
        }
    }

    if (input.startsWith("-O=")) {
        outputPath = inputs[index].substring(3, inputs[index].length)
        if (!fs.existsSync(outputPath)) {
            throw "output path does not exist."
        }
    }

    if (input.startsWith("-S=")) {
        seeds = inputs[index].substring(3, inputs[index].length)
        seeds = seeds.split(',');
    }

    if (input.startsWith("-C")) {
        coverage = true
    }

    if (input.startsWith("-R=")) {
        report = inputs[index].substring(3, inputs[index].length)
        if (!reportTypes.includes(report)) {
            throw "value for -R must be 0, 1 or 2"
        }
    }

}


// MANDATORY VALIDATIONS
if (!fuzzerTypes.includes(fuzzer)) {
    throw "value for -F must be [black] or [grey]"
}
if (scriptPath == "") {
    throw "value for -P is mandatory"
}



// // blackbox generation-based fuzzer

if (fuzzer == "black") {
    if (seeds.length > 0) {
        BlackboxMutationBased.run(scriptPath, times, outputPath, report, seeds, coverage)
    } else {
        BlackboxGenerationBased.run(scriptPath, times, outputPath, report)
    }

} else {
    // if (coverage) {

    //     // Test Coverage
    //     randomFuzzer = new RandomFuzzer()
    //     inp = randomFuzzer.fuzz()
    //     inp = inp.replace(/"/g, "");
    //     console.log(inp)
    //     console.log(CoverageJS.run(scriptPath, inp))
    // }
    // else {
    console.log("incorrect parameters")
    // }
}

// node samples/main/fuzzerJS.js -P=/usr/src/workspace/samples/programs/CGIdecode.js -C

/**
 * SAMPLES = node samples/main/fuzzerJS.js
 *
 * FOR BLACK BOX GENERATION-BASED
 *
 * -F=black -P=/usr/src/workspace/samples/programs/CGIdecode.js
 *
 * -F=black -P=/usr/src/workspace/samples/programs/CGIdecode.js -T=200
 *
 * -F=black -P=/usr/src/workspace/samples/programs/CGIdecode.js -T=200 -S=hello,bye
 *
 * -F=black -P=/usr/src/workspace/samples/programs/CGIdecode.js -T=100 -S=hello,bye -O=/usr/src/workspace/
 * 
 * -F=black -P=/usr/src/workspace/samples/programs/CGIdecode.js -T=20 -R=2
 *
 *
 *
 *
 *
 */
/**
 * COMMANDS
 *
 * -F = [black,grey][MANDATORY] -- fuzzer type
 *
 * -P = [string][MANDATORY] -- script's path
 *
 * -T = [number] -- times of iterations
 *
 * -O = [string][MANDATORY] -- output's folder
 *
 * -S = [string separate by comma] -- seeds
 *
 * -R = [0,1,2] -- 0: report only fails, 1: report only passes, 2: report all
 */


