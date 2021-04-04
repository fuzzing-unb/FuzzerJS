const MutationFuzzer = require('./mutationFuzzer');
const Runner = require('./runner');

class MutationCoverageFuzzer extends MutationFuzzer {

    _coveragesSeen = []

    _reset() {
        // super._reset()
        this._seedIndex = 0
        this._coveragesSeen = []
    }

    /**
     * Run function(inp) while tracking coverage.
       If we reach new coverage,
       add inp to population and its coverage to population_coverage
     */
    run(runner) {

        let resultRunner = super.run(runner)
        let result = resultRunner.result
        let outcome = resultRunner.outcome
        
        let newCoverage = runner.getCoverage().toString()
        if (outcome == Runner.PASS && !this._coveragesSeen.includes(newCoverage)) {
            // if (outcome == Runner.PASS) {
            // if (!this._population.includes(this._output)) this._population.push(this._output)
            this._population.push(this._output)
            this._coveragesSeen.push(newCoverage)
        }

        return result
    }

    getCoveragesSeen() {
        return this._coveragesSeen
    }

}

module.exports = MutationCoverageFuzzer