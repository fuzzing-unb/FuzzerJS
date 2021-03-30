const { execSync } = require('child_process');
const fs = require('fs')
const path = require('path');
/**
 * Steps
 * 1. Instrument file
 * 2. Run nyc
 * 3. Get coverage info
 * 4. Delete temporal files
 */

const CoverageJS = function () {

    _extension = ".js"

    _dirScript = ""
    _scriptName = ""
    _script = ""

    _dirScriptInstrumented = ""
    _scriptInstrumentedName = ""
    _scriptInstrumented = ""

    _dirTemp = ".fuzzerjs-temporal"
    _dirReport = "report"
    _lcovFile = "lcov.info"

    _coverageLines = []
    _totalLines = 0

    _status = false;

    function run(pathFile, inputValue = "") {

        // Create temporal directory
        createDirectory(_dirTemp)

        // Validations
        _validatePath(pathFile)

        // 1. Instrument file
        _instrumentFile(pathFile)

        // 2. Run nyc
        _runNYC(inputValue)

        // 3. Get coverage information
        _readInfoCoverageFile()

        // 4. Delete temporal files
        _deleteTemporalFiles()

        return Object.freeze({
            coverage: _coverageLines,
            totalLines: _totalLines,
            status: _status
        });
    }

    function _instrumentFile(pathFile) {

        [_script, _dirScript, _scriptName] = _splitPath(pathFile)

        // _scriptInstrumentedName = `${_scriptName}_instrumented`

        // _dirScriptInstrumented = _dirTemp

        // _scriptInstrumented = path.join(_dirScriptInstrumented, `${_scriptInstrumentedName}${_extension}`)

        // _runCMD(`nyc instrument ${_script} > ${_scriptInstrumented}`)

    }

    function _runNYC(inputValue) {

        commandNYC = "nyc "
        // commandNYC += "--reporter=text "
        commandNYC += "--reporter=lcov "
        commandNYC += `--report-dir=${path.join(_dirTemp, _dirReport)} `
        commandNYC += `node ${_script} "${inputValue}"`

        _status = _runCMD(commandNYC)
        // const reportText = _runCMD(commandNYC)
        //reportText ? console.log(reportText) : null

    }

    function _splitPath(pathFile) {

        var extension = path.extname(pathFile);
        var filename = path.basename(pathFile, extension);
        var dirname = path.dirname(pathFile)

        return Object.freeze([pathFile, dirname, filename]);
    }

    function _validatePath(pathFile) {

        if (!pathFile) {
            throw "path is empty"
        }

        try {
            if (!fs.existsSync(pathFile)) {
                throw `${pathFile} does not exist.`
            }
        } catch (err) {
            throw err
        }

        if (_extension != path.extname(pathFile)) {
            throw `${pathFile} extension is not permitted.`
        }

    }

    function _readInfoCoverageFile() {

        flagSF = 0

        try {
            content = fs.readFileSync(path.join(_dirTemp, _dirReport, _lcovFile), { encoding: 'utf8' });
        } catch (err) {
            // An error occurred
            //throw err;
            return;
        }

        _totalLines = 0
        lines = content.split('\n')

        for (let index = 0; index < lines.length; index++) {

            line = lines[index];

            if (line.startsWith("SF:") && line.includes(_scriptName)) {
                flagSF = 1;
            }

            if (flagSF) {
                if (line.startsWith("DA:")) {

                    line = line.substring(3, line.lenght)

                    line = line.split(",")

                    if (line[1] > 0) {
                        _coverageLines.push(line[0])
                    }

                    _totalLines += 1
                }
            }
        }
    }

    function _runCMD(cmd) {
        try {

            const execSyncResult = execSync(cmd, {
                // cwd: './',
                encoding: 'utf8',
                // stdio: 'inherit'
            })

            return true;

        } catch (error) {
            // error.status;  // 0 : successful exit, but here in exception it has to be greater than 0
            // error.message; // Holds the message you typically want.
            // error.stderr;  // Holds the stderr output. Use `.toString()`.
            // error.stdout;  // Holds the stdout output. Use `.toString()`.
            // console.log('error here')
            return false;
        }
    }

    function _deleteTemporalFiles() {
        _deleteDirectory(_dirTemp)
        //Delete temporal file .nyc_output create by nyc 
        _deleteDirectory(".nyc_output")
        _deleteDirectory("node_modules")
    }

    function createDirectory(dirName) {
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }
    }

    function _deleteDirectory(dirName) {
        fs.rmdirSync(dirName, { recursive: true })
    }

    return {
        run,
    }

    // return{
    //     run:run,
    //     // change:change
    // }
}();

module.exports = exports = CoverageJS;
