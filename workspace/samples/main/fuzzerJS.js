const CoverageJS = require('../../coverageJS/coverageJS');
const RandomFuzzer = require('../../core/randomFuzzer');

inputs = [] 

scriptPath = ""
testscriptPath = ""

// console.log(process.argv)
// Validate inputs
inputs = process.argv.slice(2)
if(inputs.length == 0){
    throw "Write at least one parameter"
}

scriptPath = inputs[0]
// testscriptPath = inputs[1]

// CoverageJS.run('./programs/CGIdecode.js','./samples/coverage/test-cgidecode.js')

randomFuzzer = new RandomFuzzer()
inp = randomFuzzer.fuzz()
inp = inp.replace(/"/g, "");
console.log(inp)
console.log(CoverageJS.run(scriptPath, inp))

// console.log(CoverageJS.run(scriptPath, "abc"))
// console.log(CoverageJS.run(scriptPath, "5<+ 49;2:1#?>/$:*(,/88$42/$'$3+%6/3=*4)-;!'+'%.5'(8.#<34$;=();5%91!2;(6:*'6(:8*-/..)8&"))
// 5<+ 49;2:1#?>/$:*(,/88$42/$'$3+%6/"3=*4)-;!'+'%.5'(8.#<34$";=();5"%91!2;(6:*'6(:8*-/..)8&


