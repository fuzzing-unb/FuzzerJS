// core
const RandomFuzzer = require('../core/randomFuzzer');
const NodeScriptRunner = require('../core/nodeScriptRunner');

// utils
const TimeTaker = require('../utils/timeTaker');
const WriteOutput = require('../utils/writeOutput');
const ResultAnaliser = require('../utils/resultAnaliser');

const BlackboxGenerationBased = function () {

    function run(scriptPath, trials, outputPath, reportType = 0) {

        let fuzzer = new RandomFuzzer(min_length = 4, max_length = 4, char_start = 32, char_range = 96)

        TimeTaker.setStart()
        result = fuzzer.runs(new NodeScriptRunner(scriptPath), trials = trials)
        TimeTaker.setEnd()

        ResultAnaliser.setReportType(reportType)
        ResultAnaliser.setResult(result)

        WriteOutput.run(TimeTaker, ResultAnaliser, outputPath)
    }

    return {
        run,
    }
}();

module.exports = exports = BlackboxGenerationBased;