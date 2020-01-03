// -----------------------------------------------
// - check to see if the passed directory exists -
// -----------------------------------------------

let walk = require('walk') // file system walker (get file names)

function checkForExistingFile(checkFile) {
	let walker = walk.walk(checkFile, { followLinks: false })
	let exists = false

	return new Promise(function(resolve, reject) {
		walker.on("file", function (root, fileStats, next) {
			exists = true
			next()
		})

		walker.on('end', function() {
			resolve(exists)
		})
	})
}


// *************
// ** Exports **
// *************
module.exports = checkForExistingFile
