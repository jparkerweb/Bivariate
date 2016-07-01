// -------------------------------
// - get existing reference data -
// -------------------------------

var walk = require('walk');                     // file system walker (get file names)
var forEach = require('mout/array/forEach');    // foreach array util
var sort = require('mout/array/sort');          // sort array util
var blank = require('./_blankLine');


var checkForArchiveReferences = function checkForArchiveReferences(logit) {
    if (typeof logit === 'undefined' ) { logit = false; }

    var archiveReferenceList = [];
    var baseDir = "./bivariate_data/bitmaps_reference_archive/";
    var walker = walk.walk(baseDir, { followLinks: false });
    var checkIfFileExists = require('./_checkIfFileExists');

    return new Promise(function(resolve, reject) {
        walker.on('directory', function (path, stat, next) {
            if (path === baseDir) {
                checkIfFileExists(baseDir + stat.name + '/LOCKED')
                    .then(function(isLocked) {
                        archiveReferenceList.push((isLocked ? '[LOCKED]  ' : '') + stat.name);
                    });
            }

            next();
        });

        walker.on('end', function(){
            archiveReferenceList = sort(archiveReferenceList);

            if (logit) {
                if (archiveReferenceList.length > 0) {
                    blank();
                    console.log(('------------------' + '\n').bgCyan.white);
                    console.log(('Archive References' + '\n').bgCyan.white);
                    console.log(('------------------' + '\n').bgCyan.white);

                    forEach(archiveReferenceList, function(val){
                        console.log((' ' + val + ' ').bgCyan.white.bold);
                    });

                    blank();
                } else {
                    blank();
                    console.log(('!!! No Archive Data Exits !!!').bgRed.white);
                }
            }

            resolve(archiveReferenceList);
        });
    });
};


// *************
// ** Exports **
// *************
module.exports = checkForArchiveReferences;
