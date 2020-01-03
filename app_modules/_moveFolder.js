// ---------------
// - Move Folder -
// ---------------

let blank = require('./_blankLine')

let moveFolder = function moveit(fromLocation, toLocation, logit) {
	let mv = require('mv')
	let colors = require('colors')

	return new Promise(function(resolve, reject) {
		if (typeof logit === 'undefined' ) { logit = false; }

		if (logit) {
			console.log("fromLocation", fromLocation)
			console.log("toLocation", toLocation)
		}
		
		mv(fromLocation, toLocation, {mkdirp: true}, function(err) {
			// done. it first created all the necessary directories, and then
			// tried fs.rename, then falls back to using ncp to copy the dir
			// to dest and then rimraf to remove the source dir

			if(err) {
				reject(err)
			} else {
				if (logit) {
					blank()
					console.log(('moved: "' + fromLocation + '" to "' + toLocation + '"').bgWhite.black)
				}
				resolve()
			}
		})
	})
}


// *************
// ** Exports **
// *************
module.exports = moveFolder
