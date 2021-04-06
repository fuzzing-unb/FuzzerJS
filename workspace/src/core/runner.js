
class Runner {

    static PASS = "PASS";
    static FAIL = "FAIL";
    static UNRESOLVED = "UNRESOLVED";

    constructor(){
    }

    run(inp){
        return Object([inp, Runner.UNRESOLVED]);
    }
}

module.exports = Runner