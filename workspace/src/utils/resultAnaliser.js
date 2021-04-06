const Runner = require('../core/runner');

const resultAnaliser = function () {

    _result = []
    _resultPASS = []
    _resultFAIL = []
    _resultUNRESOLVED = []

    _times = 0;
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


    /**
     * getters
     */

    function getPasses() {
        return _resultPASS
    }

    function getFails() {
        return [].concat(_resultFAIL, _resultUNRESOLVED);
    }

    function getTimes() {
        return _times
    }

    function getSeeds(){
        return _seeds
    }

    function getReportType(){
        return _reportType
    }


    /**
     * functions
     */
    function _analisis() {

        _reset()

        _times = this._result.length
        for (let index = 0; index < _times; index++) {

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

    function _reset() {
        _resultPASS = []
        _resultFAIL = []
        _resultUNRESOLVED = []

        _times = 0
    }

    return {
        setResult,
        setSeeds,
        setReportType,
        getSeeds,
        getReportType,
        getPasses,
        getFails,
        getTimes
    }

}();

module.exports = exports = resultAnaliser;

