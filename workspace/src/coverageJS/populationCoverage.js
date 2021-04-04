const CoverageJS = require('./coverageJS');

const populationCoverage = (population, scriptPath) => {

    let allCoverage = [];
    let cumulativeCoverage = [];

    for (let index = 0; index < population.length; index++) {
        // 
        let result = CoverageJS.run(scriptPath, population[index]);

        // allCoverage = allCoverage.concat(result.coverage);
        allCoverage = Array.from(new Set(allCoverage.concat(result.coverage)))
        cumulativeCoverage.push(allCoverage.length)
    }

    //sort
    allCoverage.sort(function (a, b) {
        return a - b;
    });

    return Object.freeze([allCoverage, cumulativeCoverage]);

};

exports.populationCoverage = populationCoverage;