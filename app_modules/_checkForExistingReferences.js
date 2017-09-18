// -------------------------------
// - get existing reference data -
// -------------------------------

var walk = require('walk');                     // file system walker (get file names)
var forEach = require('mout/array/forEach');    // foreach array util
var sort = require('mout/array/sort');          // sort array util
var getPath = require('./_getPath');
var blank = require('./_blankLine');


function checkForExistingReferences(logit) {
	if (typeof logit === 'undefined' ) { logit = false; }

	var existingReferenceList = [];
	var baseDir = getPath("backstop_data/bitmaps_reference");
	var walker = walk.walk(baseDir, { followLinks: false });
	var checkIfFileExists = require('./_checkIfFileExists');
	var isLocked = false;

	return new Promise(function(resolve, reject) {
		walker.on('directories', function (root, dirStatsArray, next) {
			forEach(dirStatsArray, function(val){
				existingReferenceList.push(val.name);
			});

			checkIfFileExists(baseDir + 'LOCKED')
				.then(function(lock){
					isLocked = lock;
					next();
				});
		});

		walker.on('end', function(){
			existingReferenceList = sort(existingReferenceList);

			if (logit) {
				if (existingReferenceList.length > 0) {
					blank();
					console.log(('------------------------').bgBlue.white);
					console.log(('- Generated References -').bgBlue.white);

					if(isLocked) {
						console.log(('-                     -').bgBlue.white);
						console.log(('-       ').bgBlue.white + ('LOCKED').bgRed.white + ('        -').bgBlue.white);
					}

					console.log(('------------------------').bgBlue.white);


					forEach(existingReferenceList, function(val){
						var displayVal = ' ' + val + ' ';
						console.log(displayVal.bgBlue.white);
					});
					blank();
				} else {
					existingReferenceList = [];
					blank();
					console.log(('!!! No Reference Data Exits !!!').bgRed.white);
				}
			}

			resolve([existingReferenceList, isLocked]);
		});
	});
}


// *************
// ** Exports **
// *************
module.exports = checkForExistingReferences;
