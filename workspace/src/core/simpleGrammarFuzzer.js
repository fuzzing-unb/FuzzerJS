const { START_SYMBOL } = require('./constant/grammar');
const { nonterminals } = require('./grammarUtils');

const simpleGrammarFuzzer = (grammar, startSymbol = START_SYMBOL,
    maxNonterminals = 10, maxExpansionTrials = 100,
    log = false) => {

    term = startSymbol
    expansionTrials = 0

    while (nonterminals(term).length > 0) {
        nonTerminals = nonterminals(term)
        
        symbolToExpand = nonTerminals[Math.floor(Math.random() * nonTerminals.length)]
        expansions = grammar[symbolToExpand]
        expansion = expansions[Math.floor(Math.random() * expansions.length)]
        newTerm = term.replace(symbolToExpand, expansion)

        if (nonterminals(newTerm).length < maxNonterminals){
            term = newTerm
            if (log){
                console.log(symbolToExpand + " -> " + expansion + " = " + term)
            }
            expansionTrials = 0
        }
        else{
            expansionTrials += 1
            if (expansionTrials >= maxExpansionTrials)
                throw ("Cannot expand " + repr(term))
        }
    }

    return term
};

exports.simpleGrammarFuzzer = simpleGrammarFuzzer;