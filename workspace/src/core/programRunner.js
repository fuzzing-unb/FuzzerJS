const { spawnSync } = require('child_process');

const Runner = require('./runner');

class ProgramRunner extends Runner {

    _program;

    constructor(program) {
        super();
        this._program = program;
    }

    runScript(inp) {

        const command = spawnSync(this._program, { input: inp }); // run console program

        return Object({
            status: command.status,
            stdin: inp,
            stdout: command.stdout ? command.stdout.toString() : '',
            stderr: command.stderr ? command.stderr.toString() : '',
        });

        // command = {
        //     status: 0,
        //     signal: null,
        //     output: [ null, <Buffer 61 62 63>, <Buffer > ],
        //     pid: 14,
        //     stdout: <Buffer 61 62 63>,
        //     stderr: <Buffer >
        // }
    }

    run(inp = "") {

        var outcome = Runner.UNRESOLVED;
        var result = this.runScript(inp);
        
        if (result.status == 0) {
            outcome = Runner.PASS;
        } else if (result.status < 0){
            outcome = Runner.FAIL;
        } else {
            outcome = Runner.UNRESOLVED;
        }

        return Object({result, outcome}); 
    }

}

module.exports = ProgramRunner;