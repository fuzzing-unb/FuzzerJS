const fs = require('fs');

// fuzzers
const BlackboxGenerationBased = require('../../src/fuzzers/blackboxGenerationBased');
const BlackboxMutationBased = require('../../src/fuzzers/blackboxMutationBased');
const GreyboxMutationBased = require('../../src/fuzzers/greyboxMutationBased');

inputs = []
scriptPath = ""
outputPath = ""
trials = 50
fuzzer = ""
seeds = []
coverage = false
report = 0
grammar = ""
mutation = false

fuzzerTypes = ["black", "grey"]
reportTypes = ['0', '1', '2']

// console.log(process.argv)

// // Validate inputs
inputs = process.argv.slice(2)
if (inputs.length == 0) {
    throw "Write at least one parameter"
}

// scriptPath = "/usr/src/workspace/samples/programs/CGIdecode.js";
// outputPath = "/usr/src/workspace/output.txt";
// scriptPath = inputs[0]

// if (typeof inputs[1] !== 'undefined') {
//     trials = inputs[1] 
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
        trials = inputs[index].substring(3, inputs[index].length)
        if (!Number.isInteger(Number(trials))) {
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

    if (input.startsWith("-G=")) {
        grammar = input.substring(3, inputs[index].length)
        if (grammar == "") {
            throw "value for -G is mandatory"
        }
    }

    if (input.startsWith("-M")) {
        mutation = true
    }

}


// MANDATORY VALIDATIONS
if (!fuzzerTypes.includes(fuzzer)) {
    throw "value for -F must be [black] or [grey]"
}
if (scriptPath == "") {
    throw "value for -P is mandatory"
}


if (fuzzer == "black") {
    if (mutation) {
        BlackboxMutationBased.run(scriptPath, trials, outputPath, report, seeds, grammar, coverage)
    } else {
        BlackboxGenerationBased.run(scriptPath, trials, outputPath, report, grammar)
    }

} else {
    if (fuzzer == "grey") {

        if (seeds.length <= 0 && grammar == "") {
            if (seeds.length <= 0) {
                throw "value for -S is mandatory"
            }
            if (grammar == "") {
                throw "value for -G is mandatory"
            }
        }

        GreyboxMutationBased.run(scriptPath, trials, outputPath, report, seeds, grammar)

    }
    else {
        console.log("incorrect parameters")
    }
}
