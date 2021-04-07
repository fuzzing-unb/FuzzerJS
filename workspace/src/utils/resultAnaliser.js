const Runner = require('../core/runner');
// const Return = require('../models/return');

const resultAnaliser = function () {

    _result = []
    _resultPASS = []
    _resultFAIL = []
    _resultUNRESOLVED = []

    _trials = 0;
    _seeds = []
    _reportType = 0

    /**
     * setters
     */
    function setResult(result) {
        _result = result
        _analisis()
    }

    function setSeeds(seeds) {
        _seeds = seeds
    }

    function setReportType(reportType) {
        _reportType = reportType
    }

    function setPass(resultPASS) {
        this._resultPASS.push(resultPASS)
    }

    function setFail(resultFail) {
        this._resultFAIL.push(resultFail)
    }

    function setTrials(trials) {
        _trials = trials
    }

    /**
     * getters
     */

    function getPasses() {
        return _resultPASS
    }

    function getFails() {
        return [].concat(_resultFAIL, _resultUNRESOLVED);
    }

    function getTrials() {
        return _trials
    }

    function getSeeds() {
        return _seeds
    }

    function getReportType() {
        return _reportType
    }


    /**
     * functions
     */
    function _analisis() {

        reset()
        for (let index = 0; index < this._result.length; index++) {

            let result = this._result[index].result
            result["index"] = index + 1
            switch (this._result[index].outcome) {
                case Runner.PASS:
                    this._resultPASS.push(result)
                    break;
                case Runner.FAIL:
                    this._resultFAIL.push(result)
                    break;
                case Runner.UNRESOLVED:
                    this._resultUNRESOLVED.push(result)
                    break;

                default:
                    break;
            }
        }
    }

    function reset() {
        _resultPASS = []
        _resultFAIL = []
        _resultUNRESOLVED = []

    }

    return {
        //setters
        setResult,
        setSeeds,
        setReportType,
        setPass,
        setFail,
        setTrials,
        //getters
        getSeeds,
        getReportType,
        getPasses,
        getFails,
        getTrials
    }

}();

module.exports = exports = resultAnaliser;

