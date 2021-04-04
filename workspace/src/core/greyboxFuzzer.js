const MutationFuzzerPlus = require('./mutationFuzzerPlus');
const Seed = require('./seed');

class GreyBoxFuzzer extends MutationFuzzerPlus {

    _coveragesSeen = []

    _reset() {
        this._seedIndex = 0
        this._coveragesSeen = []
        this._population = []
    }

    run(runner) {
        /**
         * Run function(inp) while tracking coverage.
           If we reach new coverage,
           add inp to population and its coverage to population_coverage
         */

        let resultRunner = super.run(runner)
        let result = resultRunner.result
        let outcome = resultRunner.outcome

        let newCoverage = runner.getCoverage().toString()

        if (newCoverage != '' && !this._coveragesSeen.includes(newCoverage)) {
            // We have new coverage
            let seed = new Seed(this._input)
            seed.coverage = runner.getCoverage().toString()
            this._population.push(seed)
            this._coveragesSeen.push(newCoverage)
        }

        return Object.freeze([result, outcome]);
    }
}

module.exports = GreyBoxFuzzer