// HERE there is code to help us in the development

// const fs = require('fs');

// var basename = "input.txt";
// var fuzzerData = fuzzer();

//// FS ASYNC
// fs.writeFile(basename, fuzzerData, function (err) {
//     if (err) throw err;
//     console.log('Saved!');
// });

// fs.readFile(basename, 'utf8', function (err, data) {
//     if (err) throw err;
//     console.log(data);
//     return data;
//     // assert(data === fuzzerData);
// });

//// FS SYNC
// try {
//     fs.writeFileSync(basename, fuzzerData);
// } catch (err) {
//     // An error occurred
//     throw err;
// }

// try {
//     content = fs.readFileSync(basename, { encoding: 'utf8' });
// } catch (err) {
//     // An error occurred
//     throw err;
// }

// console.log(content);

// // Invoking external program
// program = "bc";
// program = "cat";
// var basename = "input.txt";
// var fuzzerData = fuzzer();

// try {
//     fs.writeFileSync(basename, fuzzerData);
// } catch (err) {
//     // An error occurred
//     throw err;
// }


