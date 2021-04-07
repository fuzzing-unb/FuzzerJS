const fs = require('fs');

const WriteOutput = function () {

    function run(TimeTaker, ResultAnaliser, outputPath) {

        let _n = "\n"

        //create file body
        let body = ""
        body += `Elapsed time: ${TimeTaker.getDifference()} ${_n}`
        body += `seeds: ${ResultAnaliser.getSeeds().toString()} ${_n}`
        body += `# trials: ${ResultAnaliser.getTrials()} ${_n}`

        switch (ResultAnaliser.getReportType()) {
            case '0':
            case 0:
                body += _generateExecutionInformation('fails', ResultAnaliser.getFails())
                break;
            case '1':
            case 1:
                body += _generateExecutionInformation('passes', ResultAnaliser.getPasses())
                break;
            case '2':
            case 2:
                body += _generateExecutionInformation('fails', ResultAnaliser.getFails())
                body += _generateExecutionInformation('passes', ResultAnaliser.getPasses())
                break;
            default:
                throw "Report type unknown"
        }


        //write file
        if (outputPath == "") {
            outputPath = `${process.cwd()}`
        }

        outputPath = `${outputPath}/output`
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }
        outputPath = `${outputPath}/output_${Date.now()}.txt`

        try {
            fs.writeFileSync(outputPath, body);
            console.log(`Output at > ${outputPath}`)
        } catch (err) {
            // An error occurred
            throw err;
        }
    }

    function _generateExecutionInformation(type, informations = []) {

        let _n = "\n"
        let bodyInformation = ""

        bodyInformation += _n
        bodyInformation += `> total ${type} executions : ${informations.length}`
        bodyInformation += _n
        bodyInformation += _n
        for (let index = 0; index < informations.length; index++) {

            bodyInformation += `Execution #: ${index + 1} ${_n}`
            if (informations[index].coverage !== undefined) {
                bodyInformation += `coverage: ${informations[index].coverage.toString()} ${_n}`
            }
            bodyInformation += `stdin: ${informations[index].stdin} ${_n}`
            bodyInformation += `stdout: ${informations[index].stdout} ${_n}`
            bodyInformation += `stderr: ${informations[index].stderr} ${_n}`
            bodyInformation += _n
        }

        return bodyInformation
    }


    return {
        run
    }

}();

module.exports = exports = WriteOutput;