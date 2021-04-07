const MutationFuzzerPlus = require('./mutationFuzzerPlus');
const Seed = require('./seed');
const Runner = require('./runner');

class GreyBoxFuzzer extends MutationFuzzerPlus {

    _coveragesSeenPass = []
    _coveragesSeenFail = []
    _populationFail = []
    _results = []

    _reset() {
        this._seedIndex = 0
        this._coveragesSeenPass = []
        this._population = []
        this._coveragesSeenFail = []
        this._populationFail = []
        this._results = []
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

        let newCoverage = runner.getCoverage()
        if (newCoverage != '') {
            newCoverage = newCoverage.toString()
        }

        if (newCoverage != '') {

            // We have new coverage
            let seed = new Seed(this._input)
            seed.coverage = newCoverage

            if (outcome == Runner.PASS && !this._coveragesSeenPass.includes(newCoverage)) {
                this._population.push(seed)
                this._coveragesSeenPass.push(newCoverage)
                this._results.push(Object({result, outcome}))

            } else if (outcome != Runner.PASS && !this._coveragesSeenFail.includes(newCoverage)) {
                this._populationFail.push(seed)
                this._coveragesSeenFail.push(newCoverage)
                this._results.push(Object({result, outcome}))
            }

        }
        return Object({result, outcome});
    }

    getCoveragesSeen() {
        return this._coveragesSeenPass
    }

    getCoveragesSeenFail() {
        return this._coveragesSeenFail
    }

    getPopulationFail(){
        return this._populationFail
    }

    getResults(){
        return this._results
    }
}

module.exports = GreyBoxFuzzer