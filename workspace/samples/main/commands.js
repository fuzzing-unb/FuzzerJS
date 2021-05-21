// node samples/main/fuzzerJS.js -P=/usr/src/workspace/samples/programs/CGIdecode.js -C

/**
 * COMMANDS
 *
 * -F = [black,grey][MANDATORY] -- fuzzer type
 *
 * -P = [string][MANDATORY] -- script path
 *
 * -T = [number] -- trials of iterations
 *
 * -O = [string] -- output folder
 *
 * -S = [string separate by comma] -- seeds
 *
 * -G = [string] -- grammar’s name
 * 
 * -M = -- mutation flag
 * 
 * -R = [0,1,2] -- 0: report only fails, 1: report only passes, 2: report all
 * 
 */

/** SAMPLES
 * 
 * node samples/main/fuzzerJS.js 
 * 
 * * * * FOR BLACK BOX 
 * 
 * * simple
 * -F=black -P=./samples/programs/CGIdecode.js 
 * 
 * * GENERATION-BASED
 * -F=black -P=./samples/programs/CGIdecode.js -T=200 -O=/usr/src/workspace/ -R=2
 * 
 * * GRAMMAR-BASED
 * -F=black -P=./samples/programs/CGIdecode.js -T=200 -O=/usr/src/workspace/ -G=CGI_GRAMMAR -R=2
 * 
 * * MUTATION-BASED
 *  
 * -F=black -P=./samples/programs/CGIdecode.js -T=200 -M -S=hello+world -O=/usr/src/workspace/ -R=2
 * 
 * * GRAMMAR-MUTATION-BASED
 * 
 * -F=black -P=./samples/programs/CGIdecode.js -T=200 -M -G=CGI_GRAMMAR -O=/usr/src/workspace/ -R=2
 * 
 * 
* * * * FOR GREYBOX BOX 
 * 
 * 
 * * MUTATION-BASED + COVERAGE
 * -F=grey -P=./samples/programs/CGIdecode.js -C -T=200 -S=hello+world -O=/usr/src/workspace/ -R=2
 * 
 * * GRAMMAR-MUTATION-BASED + COVERAGE
 * -F=grey -P=./samples/programs/CGIdecode.js -C -T=200 -G=CGI_GRAMMAR -O=/usr/src/workspace/ -R=2
 *  
 * 
 * 
 * 
 */


