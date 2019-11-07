// -----------------------------------------------
// - check to see if the passed directory exists -
// -----------------------------------------------

var walk = require('walk') // file system walker (get file names)

function checkForExistingDirectory(checkDir) {
	var walker = walk.walk(checkDir, { followLinks: false })
	var exists = false

	return new Promise(function(resolve, reject) {
		walker.on('directories', function (root, dirStatsArray, next) {
			exists = true
			next()
		})

		walker.on('end', function() {
			if(exists) {
				resolve()
			} else {
				reject()
			}
		})
	})
}


// *************
// ** Exports **
// *************
module.exports = checkForExistingDirectory
