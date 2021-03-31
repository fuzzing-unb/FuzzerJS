const CGIdecode = (input) => {

    var hexValues = {
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4,
        '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
        'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15,
        'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15,
    }

    var output = ""
    var i = 0

    while (i < input.length) {

        value = input[i]

        if (value == '+') {
            output += ' '
        } else if (value == '%') {
            digitHigh = input[i + 1]
            digitLow = input[i + 2]
            i += 2

            if (digitHigh in hexValues && digitLow in hexValues) {

                hexValue = hexValues[digitHigh] * 16 + hexValues[digitLow]

                output += String.fromCharCode(hexValue)
            } else {
                throw "Invalid encoding"
            }

        } else {
            output += value
        }

        i++
    }

    return output
};

// exports.CGIdecode = CGIdecode;

inputs = []
inputs = process.argv.slice(2)

// console.log(CGIdecode(inputs.toString())) 
if (inputs.length == 1) {
    console.log(CGIdecode(inputs[0]))
} else {
    throw "the number of parameters is incorrect"
}

