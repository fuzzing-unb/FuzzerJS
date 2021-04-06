
const NodeScriptRunner = require('./nodeScriptRunner');
const CoverageJS = require('../coverageJS/coverageJS');

class NodeScriptCoverageRunner extends NodeScriptRunner {

    _coverage = []
    _resultCoverage = {}

    runScript(inp) {

        this._resultCoverage = CoverageJS.run(this._scriptPath,inp)

        this._coverage = this._resultCoverage.coverage

        let result = this._resultCoverage.result
        result.coverage = this._coverage
        return result
    }

    getCoverage(){
        return this._coverage
    }
}

module.exports = NodeScriptCoverageRunner;