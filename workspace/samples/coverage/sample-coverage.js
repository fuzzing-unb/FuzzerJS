const CoverageJS = require('../../src/coverageJS/coverageJS');
const RandomFuzzer = require('../../src/core/randomFuzzer');
const { populationCoverage } = require('../../src/coverageJS/populationCoverage');


let _trials = 100;
let _randomFuzzer = new RandomFuzzer();
let _scriptPath = "/usr/src/workspace/samples/programs/CGIdecode.js";

// let coverage, status
// coverage = CoverageJS.run(_scriptPath,"Hello+world")
// console.log(CoverageJS.run(_scriptPath,"Hello+world"))
// console.log(CoverageJS.run('./programs/CGIdecode.js', "%20"))
// console.log(CoverageJS.run('./programs/CGIdecode.js',"abc"))
// console.log(CoverageJS.run('./programs/CGIdecode.js', "%?a"))


let scriptPathHttpProgram = "/usr/src/workspace/samples/programs/httpProgram.js"
console.log(CoverageJS.run(scriptPathHttpProgram,"http://www.google.com/search?q=fuzzing"))


// function population_coverage(population, scriptPath) {

//     let allCoverage = [];
//     let cumulativeCoverage = [];

//     for (let index = 0; index < population.length; index++) {
//         // 
//         let result =  CoverageJS.run(scriptPath, population[index]);

//         // allCoverage = allCoverage.concat(result.coverage);
//         allCoverage = Array.from(new Set(allCoverage.concat(result.coverage)))
//         cumulativeCoverage.push(allCoverage.length)
//     }

//     return Object.freeze([allCoverage, cumulativeCoverage]);

// }

function hundred_inputs() {
    let population = [];
    for (let index = 0; index < _trials; index++) {
        population.push(_randomFuzzer.fuzz().replace(/"/g, ""));
    }
    return population;
}

// console.log(populationCoverage(hundred_inputs(), _scriptPath))
// console.log(population_coverage(["abc", "a%c"], _scriptPath))




