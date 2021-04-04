const crashme = (input) => {

    if (input.length > 0 && input[0] == 'b') {
        if (input.length > 1 && input[1] == 'a') {
            if (input.length > 2 && input[2] == 'd') {
                if (input.length > 3 && input[3] == '!') {
                    throw "exception"
                }
            }
        }
    }
}

inputs = []
inputs = process.argv.slice(2)

// console.log(CGIdecode(inputs.toString())) 
if (inputs.length == 1) {
    console.log(crashme(inputs[0]))
} else {
    throw "the number of parameters is incorrect"
}