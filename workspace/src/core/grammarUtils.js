// get nonterminals from string or tuple
const RE_NONTERMINAL = /(<[^<> ]*>)/g

const nonterminals = (expansion) => {

    /**
     * In later chapters, we allow expansions to be tuples,
     * with the expansion being the first element
    */ 
    if (typeof expansion === 'object') {
        expansion = expansion[0]
    }

    return expansion.match(RE_NONTERMINAL) == null ? [] : expansion.match(RE_NONTERMINAL)
};

// console.log(nonterminals("<term> * <factor>"))
// console.log(nonterminals("1 < 3 > 2"))
// console.log(nonterminals(["<1>", {'option': 'value'}])) //tuple

exports.nonterminals = nonterminals;