
const Fuzzer = require('./fuzzer');
const Seed = require('./seed');

class MutationFuzzerPlus extends Fuzzer {

    _seeds = []
    _population = []
    _seedIndex = 0
    _mutator = undefined
    _schedule = undefined
    _inputs = []
    _input = ""

    constructor(seeds, mutator, schedule) {
        super();
        this._seeds = seeds
        this._mutator = mutator
        this._schedule = schedule
        this._inputs = []
        this._reset()
    }

    _reset() {
        this._population = []
        for (let index = 0; index < this._seeds.length; index++) {
            this._population.push(new Seed(this._seeds[index]))
        }
        this._seedIndex = 0
    }

    _createCandidate() {

        let seed = this._schedule.choose(this._population)

        let candidate = seed.data

        let trials = Math.min(candidate.length, 1 << (Math.floor(Math.random() * 5) + 1))

        for (let index = 0; index < trials; index++) {
            candidate = this._mutator.mutate(candidate)
        }
        return candidate
    }

    fuzz() {

        if (this._seedIndex < this._seeds.length) {
            // Still seeding
            this._input = this._seeds[this._seedIndex]
            this._seedIndex += 1
        } else {
            // Mutating
            this._input = this._createCandidate()
        }

        this._inputs.push(this._input)
        return this._input
    }

    getPopulation() {
        return this._population
    }

    getInputs() {
        return this._inputs
    }

}

module.exports = MutationFuzzerPlus
