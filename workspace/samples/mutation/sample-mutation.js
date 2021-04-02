const Mutator = require('../../src/core/mutator');
const MutationFuzzer = require('../../src/core/mutationFuzzer');
const NodeScriptRunner = require('../../src/core/nodeScriptRunner');
const NodeScriptCoverageRunner = require('../../src/core/nodeScriptCoverageRunner');
const MutationCoverageFuzzer = require('../../src/core/mutationCoverageFuzzer');

// seed = "http://www.google.com/search?q=fuzzing"
// console.log(new Mutator().mutate(seed))

// // Running MutationFuzzer class using fuzz method
// seed = ["http://www.google.com/search?q=fuzzing"]
// mutationFuzzer = new MutationFuzzer(seed=seed)
// console.log(mutationFuzzer.fuzz())
// console.log(mutationFuzzer.fuzz())
// console.log(mutationFuzzer.fuzz())

// //  Running FunctionRunner class
// scriptPathHttpProgram = "/usr/src/workspace/samples/programs/httpProgram.js"
// let httpRunner = new NodeScriptRunner(scriptPathHttpProgram)
// console.log(httpRunner.run("https://foo.bar/"))
// console.log(httpRunner.run("foo.bar/"))

// //  Running FunctionCoverageRunner class
// scriptPathHttpProgram = "/usr/src/workspace/samples/programs/httpProgram.js"
// let httpRunner  = new NodeScriptCoverageRunner(scriptPathHttpProgram)
// console.log(httpRunner.runScript("https://foo.bar/"))
// console.log(httpRunner.getCoverage())

// // Running MutationCoverageFuzzer class
scriptPathHttpProgram = "/usr/src/workspace/samples/programs/httpProgram.js"
// scriptPathCGIdecode = "/usr/src/workspace/samples/programs/CGIdecode.js";
seeds = ["http://www.google.com/search?q=fuzzing"]
// seeds = ["hello"]
mutationFuzzer = new MutationCoverageFuzzer(seed = seeds)

let httpRunner  = new NodeScriptCoverageRunner(scriptPathHttpProgram)

mutationFuzzer.runs(httpRunner, trials=50)
console.log(mutationFuzzer.getPopulation())
console.log(mutationFuzzer.getCoveragesSeen())


