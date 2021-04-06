const { spawnSync } = require('child_process');

const Runner = require('./runner');

class NodeScriptRunner extends Runner {

    _node = "node"
    _scriptPath;

    constructor(scriptPath) {
        super();
        this._scriptPath = scriptPath;
    }

    runScript(inp) {

        const command = spawnSync(this._node, [this._scriptPath, inp]); // run console program

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
        } else if (result.status < 0) {
            outcome = Runner.FAIL;
        } else {
            outcome = Runner.UNRESOLVED;
        }

        return Object({result, outcome});
    }

}

module.exports = NodeScriptRunner;

        // let cmd = [this._node, this._scriptPath, `"${inp.replace(/"/g, "")}"`].join(" ")
        // try {

        //     const execSyncResult = execSync(cmd, { encoding: 'utf8' })

        //     return Object({
        //         status: 0,
        //         stdin: inp,
        //         stdout: execSyncResult,
        //         stderr: "",
        //     });

        // } catch (error) {
        //     return Object({
        //         status: -1,
        //         stdin: inp,
        //         stdout: error.stdout.toString(),
        //         stderr: error.stderr.toString(),
        //     });
        // }