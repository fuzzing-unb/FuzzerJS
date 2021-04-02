const fs = require('fs');

const RandomFuzzer = require('../core/randomFuzzer');
const NodeScriptRunner = require('../core/nodeScriptRunner');

const TimeTaker = require('../utils/timeTaker');
const ResultAnaliser = require('../utils/resultAnaliser');


const BlackboxGenerationBased = function () {

    function run(scriptPath, times, outputPath) {

        let fuzzer = new RandomFuzzer(min_length = 4, max_length = 4, char_start = 32, char_range = 96)

        TimeTaker.setStart()
        result = fuzzer.runs(new NodeScriptRunner(scriptPath), trials = times)
        TimeTaker.setEnd()

        // console.log(TimeTaker.getDifference())
        ResultAnaliser.setResult(result)
        // console.log(ResultAnaliser.getFails().length)
        // console.log(ResultAnaliser.getFails())

        _generateOut(outputPath)
    }

    function _generateOut(outputPath) {

        let _n = "\n"
        let fails = ResultAnaliser.getFails()
        //create file body
        let body = ""
        body += `Elapsed time: ${TimeTaker.getDifference()} ${_n}`
        body += `# executions: ${ResultAnaliser.getTimes()} ${_n}`
        body += `# fail executions: ${fails.length} ${_n}`
        body += _n
        body += `fail executions information`
        body += _n
        for (let index = 0; index < fails.length; index++) {
            
            body += `stdin: ${fails[index].stdin} ${_n}`
            body += `stdout: ${fails[index].stdout} ${_n}`
            body += `stderr: ${fails[index].stderr} ${_n}`
            body += _n
        }


        //write file
        try {
            fs.writeFileSync(outputPath, body);
        } catch (err) {
            // An error occurred
            throw err;
        }

    }

    return {
        run,
    }
}();

module.exports = exports = BlackboxGenerationBased;