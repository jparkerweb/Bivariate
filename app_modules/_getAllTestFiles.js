// ----------------------
// - get all test files -
// ----------------------

let walk = require('walk') // file system walker (get file names)

let getAllTestFiles = function() {
	return new Promise(function(resolve, reject) {
		let allTestFileNames = []
		let walker = walk.walk('./bivariate_data/test_scripts', { followLinks: true })

		walker.on('file', function(root, stat, next) {
			let currentFile = stat.name
			if(currentFile.charAt(0) === "_" && currentFile.charAt(1) !== "_") {
				currentFile = currentFile.slice(0, -3)
				currentFile = root + '\/' + currentFile
				currentFile = currentFile.replace(/\\/g, "/")
				currentFile = currentFile.replace(/\.\/bivariate_data\/test_scripts\//g, "")
				allTestFileNames.push(currentFile)
			}
			next()
		})

		walker.on('end', function() {
			resolve(allTestFileNames)
		})

	})
}


// *************
// ** Exports **
// *************
module.exports = getAllTestFiles
