// ---------------
// - Move Folder -
// ---------------

var blank = require('./_blankLine');

var moveFolder = function moveit(fromLocation, toLocation, logit) {
    var mv = require('mv');
    var colors = require('colors');

    return new Promise(function(resolve, reject){
        if (typeof logit === 'undefined' ) { logit = false; }

        mv(fromLocation, toLocation, {mkdirp: true}, function(err) {
            // done. it first created all the necessary directories, and then
            // tried fs.rename, then falls back to using ncp to copy the dir
            // to dest and then rimraf to remove the source dir

            if(err) {
                reject(err);
            } else {
                if (logit) {
                    blank();
                    console.log(('moved: "' + fromLocation + '" to "' + toLocation + '"').bgWhite.black);
                }
                resolve();
            }
        });
    });
};


// *************
// ** Exports **
// *************
module.exports = moveFolder;
