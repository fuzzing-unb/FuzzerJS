class Return {

    index = 0
    stdin = ""
    stdout = ""
    stderr = ""
    coverage = []

    // constructor(){
    // }
    create(index = 0, stdin = "", stdout = "", stderr = "", coverage = []){
        this.index = index
        this.stdin = stdin
        this.stdout = stdout
        this.stderr = stderr
        this.coverage = coverage

        return this
    }
}

module.exports = Return