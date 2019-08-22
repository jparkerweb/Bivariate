// ------------------------
// - get existing reports -
// ------------------------

var walk = require('walk');                     // file system walker (get file names)
var forEach = require('mout/array/forEach');    // foreach array util
var sort = require('mout/array/sort');          // sort array util
var unique = require('mout/array/unique');      // unique array util
var blank = require('./_blankLine');

function checkForExistingReports(logit) {
	if (typeof logit === 'undefined' ) { logit = false; }

	var existingReportList = [];
	var baseDir = "./backstop_data/html_report/";
	var walker = walk.walk(baseDir, { followLinks: false });

	return new Promise(function(resolve, reject) {
		var currentBase = '';

		walker.on('file', function(root, stat, next) {
			var currentFile = stat.name;
			var currentDir = root;

			if(currentFile.substr(-3) === 'png') {
				currentDir = (currentDir.replace(baseDir + '\\', ''));
				currentBase = currentDir;
				existingReportList.push(currentBase);
			}

			next();
		});

		walker.on('end', function(){
			existingReportList = unique(existingReportList);
			existingReportList = sort(existingReportList);

			if (logit) {
				if (existingReportList.length > 0) {
					blank();
					console.log(('--------------------').bgBlue.white);
					console.log(('- Existing Reports -').bgBlue.white);
					console.log(('--------------------').bgBlue.white);

					forEach(existingReportList, function(val){
						var displayVal = ' ' + val + ' ';
						console.log(displayVal.bgBlue.white);
					});

					blank();
				} else {
					blank();
					console.log(('!!! No Reports Exit !!!').bgRed.white);
				}
			}

			resolve(existingReportList);
		});
	});
}


// *************
// ** Exports **
// *************
module.exports = checkForExistingReports;
