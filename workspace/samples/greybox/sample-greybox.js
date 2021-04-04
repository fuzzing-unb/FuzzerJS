const Mutator = require('../../src/core/mutator');
const PowerSchedule = require('../../src/core/powerSchedule');
const Seed = require('../../src/core/seed');
const NodeScriptCoverageRunner = require('../../src/core/nodeScriptCoverageRunner');
const NodeScriptRunner = require('../../src/core/nodeScriptRunner');
const MutationFuzzerPlus = require('../../src/core/mutationFuzzerPlus');
const GreyboxFuzzer = require('../../src/core/greyboxFuzzer');
const TimeTaker = require('../../src/utils/timeTaker');

const { populationCoverage } = require('../../src/coverageJS/populationCoverage');


// // Test Mutator
// console.log(new Mutator().mutate("good"))

// // test PowerSchedule
// let population = [new Seed("A"), new Seed("B"), new Seed("C")]
// let schedule = new PowerSchedule()
// let hits = {
//     "A": 0,
//     "B": 0,
//     "C": 0
// }

// for (let index = 0; index < 1000; index++) {
//     let seed = schedule.choose(population)
//     hits[seed.data] += 1
// }
// console.log(hits)


// //  Coverage statements
// scriptPathCrashme = "/usr/src/workspace/samples/programs/crashme.js"
// crashmeRunner = new NodeScriptCoverageRunner(scriptPathCrashme)
// // crashmeRunner.run("good")
// crashmeRunner.run("ba")
// console.log(crashmeRunner.getCoverage())

// // Test Mutation Fuzzer Plus class
// seed = ["good"]
// seed = ["good","look"]
// mutation_fuzzer = new MutationFuzzerPlus(seed, new Mutator(), new PowerSchedule())
// console.log(mutation_fuzzer.fuzz())
// console.log(mutation_fuzzer.fuzz())
// console.log(mutation_fuzzer.fuzz())


// // BLACKBOX MUTATION-BASED FUZZER
// n = 100
// // seed = ["good"]
// seed = ["beast"]
// scriptPathCrashme = "/usr/src/workspace/samples/programs/crashme.js"

// blackbox_fuzzer = new MutationFuzzerPlus(seed, new Mutator(), new PowerSchedule())

// TimeTaker.setStart()
// r = blackbox_fuzzer.runs(new NodeScriptRunner(scriptPathCrashme), trials=n)
// TimeTaker.setEnd()

// console.log(`It took the blackbox mutation-based fuzzer ${TimeTaker.getDifference()} seconds to generate and execute ${n} inputs.`)

// TimeTaker.setStart()
// populationCoverageResult = populationCoverage(blackbox_fuzzer.getInputs(), scriptPathCrashme)
// // allCoverage, cumulativeCoverage
// maxCoverage = Math.max(...populationCoverageResult[1])
// TimeTaker.setEnd()
// console.log(`It took the blackbox mutation-based fuzzer ${TimeTaker.getDifference()} seconds to achieved a maximum coverage of ${maxCoverage} statements.`)
// console.log(populationCoverageResult[0])
// console.log(blackbox_fuzzer.getInputs())


// // GREYBOX MUTATION-BASED FUZZER
n = 100
// seed = ["good"]
seed = ["bsb"]
scriptPathCrashme = "/usr/src/workspace/samples/programs/crashme.js"

greybox_fuzzer = new GreyboxFuzzer(seed, new Mutator(), new PowerSchedule())

TimeTaker.setStart()
r = greybox_fuzzer.runs(new NodeScriptCoverageRunner(scriptPathCrashme), trials=n)
TimeTaker.setEnd()

console.log(`It took the greybox mutation-based fuzzer ${TimeTaker.getDifference()} seconds to generate and execute ${n} inputs.`)

console.log(greybox_fuzzer.getInputs()) 
console.log(greybox_fuzzer.getPopulation())
console.log(greybox_fuzzer.getCoveragesSeen()) 

// TimeTaker.setStart()
// populationCoverageResult = populationCoverage(greybox_fuzzer.getInputs(), scriptPathCrashme)
// // allCoverage, cumulativeCoverage
// maxCoverage = Math.max(...populationCoverageResult[1])
// TimeTaker.setEnd()
// console.log(`It took the blackbox mutation-based fuzzer ${TimeTaker.getDifference()} seconds to achieved a maximum coverage of ${maxCoverage} statements.`)
