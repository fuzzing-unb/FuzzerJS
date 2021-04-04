
class PowerSchedule {

    _assignEnergy(population) {

        for (let index = 0; index < population.length; index++) {
            population[index].energy = 1;
        }
    }

    _normalizedEnergy(population) {

        let energy = []
        let sumEnergy = 0
        let normEnergy = []

        // get energy array from population
        // energy = population.forEach(element => {
        //     return element.energy
        // });
        for (let index = 0; index < population.length; index++) {
            energy.push(population[index].energy);
        }

        // get sum of array energy values
        for (let index = 0; index < energy.length; index++) {
            sumEnergy += energy[index];
        }

        // get energy normalize for each value
        for (let index = 0; index < energy.length; index++) {
            normEnergy.push(energy[index] / sumEnergy)
        }

        return normEnergy
    }

    choose(population) {

        this._assignEnergy(population)

        let normEnergy = this._normalizedEnergy(population)

        // emulate logic for np.random.choice in python
        let seedMax = Math.max(...normEnergy)
        let seedIndexes = []
        for (let index = 0; index < normEnergy.length; index++) {
            if (normEnergy[index] == seedMax) {
                seedIndexes.push(index)
            }
        }
        let seed = population[seedIndexes[Math.floor(Math.random() * seedIndexes.length)]]

        return seed
    }
}

module.exports = PowerSchedule;