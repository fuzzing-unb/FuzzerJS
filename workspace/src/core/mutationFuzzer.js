
const Mutator = require('./mutator');
const Fuzzer = require('./fuzzer');

class MutationFuzzer extends Fuzzer{

    _seed = []
    _population = []
    _seedIndex = 0
    _minMutations = 0
    _maxMutations = 0
    _output = ""

    constructor(seed, minMutations = 2, maxMutations = 10) {
        super();
        this._seed = seed
        this._minMutations = minMutations
        this._maxMutations = maxMutations
        this._reset()
    }

    _reset(){
        this._population = this._seed
        this._seedIndex = 0
    }

    _mutate(input){
        return new Mutator().mutate(input)
    }

    _createCandidate(){
        let candidate = this._population[Math.floor(Math.random() * this._population.length)]
        let trials =  Math.floor(Math.random() * (this._maxMutations - this._minMutations) ) + this._minMutations;
        for (let index = 0; index < trials; index++) {
            candidate = this._mutate(candidate)
        }
        return candidate
    }

    fuzz(){
       
        if (this._seedIndex < this._seed.length) {
            // Still seeding
            this._output = this._seed[this._seedIndex]
            this._seedIndex += 1
        } else {
            // Mutating
            this._output = this._createCandidate()
        }

        return this._output
    }

    getPopulation(){
        return this._population
    }
}

module.exports = MutationFuzzer
