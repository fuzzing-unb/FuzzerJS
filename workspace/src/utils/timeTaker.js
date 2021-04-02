const TimeTaker = function () {

    _startTime = null
    _endTime = null

    function setStart() {
        this._startTime = new Date()
    }

    function setEnd() {
        this._endTime = new Date()
    }

    function getDifference() {
        // return (this._endTime - this._startTime) / (1000 * 60 * 60 * 24)
        return (this._endTime - this._startTime) / 1000;
    }


    return {
        setStart,
        setEnd,
        getDifference,
    }

}();

module.exports = exports = TimeTaker;
