// core
const MutationCoverageFuzzer = require('../core/mutationCoverageFuzzer');
const MutationFuzzer = require('../core/mutationFuzzer');
const NodeScriptCoverageRunner = require('../core/nodeScriptCoverageRunner');
const NodeScriptRunner = require('../core/nodeScriptRunner');

// Utils
const TimeTaker = require('../utils/timeTaker');
const WriteOutput = require('../utils/writeOutput');
const ResultAnaliser = require('../utils/resultAnaliser');

const BlackboxMutationBased = function () {

    function run(scriptPath, trials, outputPath, reportType = 0, seeds = [], coverage = false){

        let mutationFuzzer = new MutationFuzzer(seed = seeds)

        TimeTaker.setStart()
        if (coverage) {
            result = mutationFuzzer.runs(new NodeScriptCoverageRunner(scriptPath), trials = trials)
            
        } else {
            result = mutationFuzzer.runs(new NodeScriptRunner(scriptPath), trials = trials)
            
        }
        TimeTaker.setEnd()
       
        ResultAnaliser.setSeeds(seeds)
        ResultAnaliser.setReportType(reportType)
        ResultAnaliser.setTrials(trials)
        ResultAnaliser.setResult(result)
        
        WriteOutput.run(TimeTaker, ResultAnaliser, outputPath)

    }

    return {
        run,
    }
}();

module.exports = exports = BlackboxMutationBased;