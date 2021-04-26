const START_SYMBOL = "<start>"

// sample digit grammar
const DIGIT_GRAMMAR = {
    "<start>": 
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
}

// sample aritmetic expression grammar
const EXPR_GRAMMAR = {
    "<start>":
        ["<expr>"],

    "<expr>":
        ["<term> + <expr>", "<term> - <expr>", "<term>"],

    "<term>":
        ["<factor> * <term>", "<factor> / <term>", "<factor>"],

    "<factor>":
        [
        // "<factor>",
         "+<factor>",
         "-<factor>",
         "(<expr>)",
         "<integer>.<integer>",
         "<integer>"],

    "<integer>":
        ["<digit><integer>", "<digit>"],

    "<digit>":
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
}

// sample CGI grammar
CGI_GRAMMAR = {
    "<start>":
        ["<string>"],

    "<string>":
        ["<letter>", "<letter><string>"],

    "<letter>":
        ["<plus>", "<percent>", "<other>"],

    "<plus>":
        ["+"],

    "<percent>":
        ["%<hexdigit><hexdigit>"],

    "<hexdigit>":
        ["0", "1", "2", "3", "4", "5", "6", "7",
            "8", "9", "a", "b", "c", "d", "e", "f"],

    "<other>":  // Actually, could be _all_ letters
        ["0", "1", "2", "3", "4", "5", "a", "b", "c", "d", "e", "-", "_"],
}

// sample URL grammar
URL_GRAMMAR = {
    "<start>":
        ["<url>"],
    "<url>":
        ["<scheme>://<authority><path><query>"],
    "<scheme>":
        ["http", "https", "ftp", "ftps"],
    "<authority>":
        ["<host>", "<host>:<port>", "<userinfo>@<host>", "<userinfo>@<host>:<port>"],
    "<host>":  // Just a few
        ["cispa.saarland", "www.google.com", "fuzzingbook.com"],
    "<port>":
        ["80", "8080", "<nat>"],
    "<nat>":
        ["<digit>", "<digit><digit>"],
    "<digit>":
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "<userinfo>": // Just one
        ["user:password"],
    "<path>":  // Just a few
        ["", "/", "/<id>"],
    "<id>":  // Just a few
        ["abc", "def", "x<digit><digit>"],
    "<query>":
        ["", "?<params>"],
    "<params>":
        ["<param>", "<param>&<params>"],
    "<param>":  // Just a few
        ["<id>=<id>", "<id>=<nat>"],
}

// sample aritmetic expression in EBNF grammar
// EXPR_EBNF_GRAMMAR = {
//     "<start>":
//         ["<expr>"],

//     "<expr>":
//         ["<term> + <expr>", "<term> - <expr>", "<term>"],

//     "<term>":
//         ["<factor> * <term>", "<factor> / <term>", "<factor>"],

//     "<factor>":
//         ["<sign>?<factor>", "(<expr>)", "<integer>(.<integer>)?"],

//     "<sign>":
//         ["+", "-"],

//     "<integer>":
//         ["<digit>+"],

//     "<digit>":
//         srange(string.digits)
// }

exports.START_SYMBOL = START_SYMBOL
exports.DIGIT_GRAMMAR = DIGIT_GRAMMAR
exports.EXPR_GRAMMAR = EXPR_GRAMMAR 
exports.CGI_GRAMMAR = CGI_GRAMMAR
exports.URL_GRAMMAR = URL_GRAMMAR
// exports.EXPR_EBNF_GRAMMAR = EXPR_EBNF_GRAMMAR