const { execSync } = require('child_process');
const fs = require('fs')
const path = require('path');
/**
 * Steps
 * 1. Instrument file
 * 2. Copy test file
 * 3. Run nyc
 * 4. Delete temporal files
 */

const CoverageJS = function () {

    _extension = ".js"

    _dirFile = ''
    _fileName = ''
    _file = ''

    _dirFileInstrumented = ''
    _fileInstrumentedName = ''
    _fileInstrumented = ''

    _dirFileCoverage = ''
    _fileCoverageName = ''
    _fileCoverage = ''



    function run(pathFile, pathTestFile, showTextReport = true) {

        // Validations
        _validatePath(pathFile)
        _validatePath(pathTestFile)
        // 1. Instrument file
        // _runCMD(`nyc instrument ${file} > ${instrumentedfile}`)
        _instrumentFile(pathFile)

        // * 2. Copy test file 
        _copyTestFile(pathTestFile)

        // * 3. Run nyc
        _runNYC(showTextReport)

        // * 4. Delete temporal files
        _deleteTemporalFiles()
    }

    function _instrumentFile(pathFile) {

        [_file, _dirFile, _fileName] = _splitPath(pathFile)

        _fileInstrumentedName = `${_fileName}_instrumented`

        _dirFileInstrumented = _dirFile

        _fileInstrumented = path.join(_dirFileInstrumented, `${_fileInstrumentedName}${_extension}`)

        _runCMD(`nyc instrument ${_file} > ${_fileInstrumented}`)

    }

    function _copyTestFile(pathTestFile) {

        [_fileCoverage, _dirFileCoverage, _fileCoverageName] = _splitPath(pathTestFile)

        _fileCoverageName = `${_fileCoverageName}_coverage`

        // _dirFileCoverage = xyz

        _fileCoverage = path.join(_dirFileCoverage, `${_fileCoverageName}${_extension}`)

        // Create coverage file
        const data = fs.readFileSync(pathTestFile, { encoding: 'utf8' })
        // fs.writeFileSync(_fileCoverage,
        //     data.replace(
        //         path.join(_dirFile, _fileName),
        //         path.join(_dirFileInstrumented, _fileInstrumentedName)
        //     )
        // );
        fs.writeFileSync(_fileCoverage,
            data.replace(
                `/${_fileName}`,
                `/${_fileInstrumentedName}`,
            )
        );
    }

    function _runNYC(showTextReport) {

        commandNYC = "nyc "

        showTextReport ? commandNYC += "--reporter=text " : null

        commandNYC += "--reporter=lcov "
        commandNYC += `--report-dir=${path.join('reports', _fileName)} `
        commandNYC += `--exclude=${_fileCoverage} `
        commandNYC += `node ${_fileCoverage}`

        const reportText = _runCMD(commandNYC)

        reportText ? console.log(reportText) : null

        //Delete temporal file .nyc_output create by nyc 
        _deleteLinux(".nyc_output")
        _deleteLinux("node_modules")

    }


    function _splitPath(pathFile) {

        var extension = path.extname(pathFile);
        var filename = path.basename(pathFile, extension);
        var dirname = path.dirname(pathFile)

        return Object.freeze([pathFile, dirname, filename]);
    }

    function _validatePath(pathFile) {
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


    function _runCMD(cmd) {
        try {

            const execSyncResult = execSync(cmd, {
                // cwd: './',
                encoding: 'utf8',
                // stdio: 'inherit'
            })

            return execSyncResult

        } catch (error) {
            // error.status;  // 0 : successful exit, but here in exception it has to be greater than 0
            // error.message; // Holds the message you typically want.
            // error.stderr;  // Holds the stderr output. Use `.toString()`.
            // error.stdout;  // Holds the stdout output. Use `.toString()`.
        }
    }

    function _deleteTemporalFiles() {
        _deleteFile(_fileInstrumented)
        _deleteFile(_fileCoverage)
    }

    function _deleteFile(filename) {
        try {
            fs.unlinkSync(filename)
            //file removed
        } catch (err) {
            console.error(err)
        }

    }

    function _deleteLinux(pathFile) {

        if (fs.existsSync(pathFile)) {
            execSync(`rm -r ${pathFile}`)
        }
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
