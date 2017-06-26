// --------------------------------
// - setup "Test Group" questions -
// --------------------------------

var walk = require('walk'); // file system walker (get file names)

var getTestGroups = function() {
	return new Promise(function(resolve, reject) {
		var testGroupFileNames = [];
		var walker = walk.walk('./bivariate_data/test_scripts', { followLinks: false });

		walker.on('file', function(root, stat, next) {
			var currentFile = stat.name;
			if(currentFile.charAt(0) !== "_") {
				currentFile = currentFile.slice(0, -3);
				testGroupFileNames.push(currentFile);
			}
			next();
		});

		walker.on('end', function() {
			resolve(testGroupFileNames);
		});

	});
};


// *************
// ** Exports **
// *************
module.exports = getTestGroups;
