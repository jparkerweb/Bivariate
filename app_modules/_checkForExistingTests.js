// --------------------------
// - get existing test data -
// --------------------------

var walk = require('walk');                     // file system walker (get file names)
var forEach = require('mout/array/forEach');    // foreach array util
var sort = require('mout/array/sort');          // sort array util
var blank = require('./_blankLine');

function checkForExistingTests(logit) {
    if (typeof logit === 'undefined' ) { logit = false; }

    var existingTestList = [];
    var baseDir = "./backstop_data/bitmaps_test/";
    var walker = walk.walk(baseDir, { followLinks: false });

    return new Promise(function(resolve, reject) {
        walker.on('file', function(root, stat, next) {
            var currentFile = stat.name;
            var currentDir = root;

            if(currentFile === "compare.json") {
                currentDir = (currentDir.replace(baseDir + '\\', ''));
                existingTestList.push(currentDir);
            }

            next();
        });

        walker.on('end', function(){
            existingTestList = sort(existingTestList);

            if (logit) {
                if (existingTestList.length > 0) {
                    blank();
                    console.log(('-----------------------').bgCyan.white);
                    console.log(('- Existing References -').bgCyan.white);
                    console.log(('-----------------------').bgCyan.white);

                    forEach(existingTestList, function(val){
                        console.log((' ' + val + ' ').bgCyan.white.bold);
                    });

                    blank();
                } else {
                    blank();
                    console.log(('!!! No Test Data Exits !!!').bgRed.white);
                }
            }

            resolve(existingTestList);
        });
    });
}


// *************
// ** Exports **
// *************
module.exports = checkForExistingTests;
