const httpProgram = (input) => {

    _supportedSchemes = ["http:", "https:"]
    _result = new URL(input)

    // return _result
    if (!_supportedSchemes.includes(_result.protocol)) {
        throw "Scheme not supported"
    }

    if (_result.hostname == "") {
        throw "Host must be non-empty"
    }

    // Do something with the URL
    return true
}

inputs = []
inputs = process.argv.slice(2)

// console.log(CGIdecode(inputs.toString())) 
if (inputs.length == 1) {
    console.log(httpProgram(inputs[0]))
} else {
    throw "the number of parameters is incorrect"
}