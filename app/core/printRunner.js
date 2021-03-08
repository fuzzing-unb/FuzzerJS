const Runner = require('./runner');

class PrintRunner extends Runner{

    run(inp){
        console.log(inp);
        return Object.freeze([inp, Runner.UNRESOLVED]);
    }
}

module.exports = PrintRunner