
const NodeScriptRunner = require('./nodeScriptRunner');
const CoverageJS = require('../coverageJS/coverageJS');

class NodeScriptCoverageRunner extends NodeScriptRunner {

    _coverage = []
    _resultCoverage = {}

    runScript(inp) {

        this._resultCoverage = CoverageJS.run(this._scriptPath,inp)

        this._coverage = this._resultCoverage.coverage

        // return this._resultCoverage.result
        return this._resultCoverage.result
    }

    getCoverage(){
        return this._coverage
    }
}

module.exports = NodeScriptCoverageRunner;