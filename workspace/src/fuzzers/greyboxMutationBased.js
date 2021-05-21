// core
const GreyboxFuzzer = require('../core/greyboxFuzzer');
const Mutator = require('../core/mutator');
const PowerSchedule = require('../core/powerSchedule');
const NodeScriptCoverageRunner = require('../core/nodeScriptCoverageRunner');
const FuzzerGrammar = require('../core/fuzzerGrammar');

// Utils
const TimeTaker = require('../utils/timeTaker');
const WriteOutput = require('../utils/writeOutput');
const ResultAnaliser = require('../utils/resultAnaliser');


const GreyboxMutationBased = function () {

    function run(scriptPath, trials, outputPath, reportType = 0, seeds = [], grammar) {

        if (grammar != "") {
            let fuzzerGrammar = new FuzzerGrammar(grammar)
            seeds = fuzzerGrammar.fuzzes(Math.round((5 / 100) * trials));
        }

        greybox_fuzzer = new GreyboxFuzzer(seeds, new Mutator(), new PowerSchedule())

        TimeTaker.setStart()
        result = greybox_fuzzer.runs(new NodeScriptCoverageRunner(scriptPath), trials = trials)
        TimeTaker.setEnd()


        ResultAnaliser.setSeeds(seeds)
        ResultAnaliser.setReportType(reportType)
        ResultAnaliser.setTrials(trials)
        ResultAnaliser.setResult(greybox_fuzzer.getResults())

        WriteOutput.run(TimeTaker, ResultAnaliser, outputPath)

    }

    return {
        run,
    }
}();

module.exports = exports = GreyboxMutationBased;