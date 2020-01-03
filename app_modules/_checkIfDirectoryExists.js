// -----------------------------------------------
// - check to see if the passed directory exists -
// -----------------------------------------------

let walk = require('walk') // file system walker (get file names)

function checkForExistingDirectory(checkDir) {
	let walker = walk.walk(checkDir, { followLinks: false })
	let exists = false

	return new Promise(function(resolve, reject) {
		walker.on('directories', function (root, dirStatsArray, next) {
			// console.log("directory exists")
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
