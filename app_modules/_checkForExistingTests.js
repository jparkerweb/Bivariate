// --------------------------
// - get existing test data -
// --------------------------

let walk = require('walk')                     // file system walker (get file names)
let forEach = require('mout/array/forEach')    // foreach array util
let sort = require('mout/array/sort')          // sort array util
let unique = require('mout/array/unique')      // unique array util
let blank = require('./_blankLine')

function checkForExistingTests(logit, removeSubDir) {
	if (typeof logit === 'undefined' ) { logit = false }
	if (typeof removeSubDir === 'undefined' ) { removeSubDir = false }

	let existingTestList = []
	let baseDir = "./backstop_data/bitmaps_test/"
	let walker = walk.walk(baseDir, { followLinks: false })

	return new Promise(function(resolve, reject) {
		let currentBase = ''

		walker.on('file', function(root, stat, next) {
			let currentFile = stat.name
			let currentDir = root

			if(currentFile.substr(-3) === 'png') {
				currentDir = (currentDir.replace(baseDir + '\\', ''))
				currentBase = currentDir
				existingTestList.push(currentBase)
			}

			next()
		})

		walker.on('end', function() {
			existingTestList = unique(existingTestList)
			existingTestList = sort(existingTestList)

			if (removeSubDir) {
				let existingTestListNoSubDir = []
				forEach(existingTestList, function(val) {
					existingTestListNoSubDir.push(val.substr(0, val.lastIndexOf("\\")))
				})
				existingTestList = existingTestListNoSubDir
			}

			if (logit) {
				if (existingTestList.length > 0) {
					blank()
					console.log(('-------------------').bgGray.white)
					console.log(('- Generated Tests -').bgGray.white)
					console.log(('-------------------').bgGray.white)

					forEach(existingTestList, function(val) {
						let displayVal = ' ' + val + ' '
						console.log(displayVal.bgGray.white)
					})

					blank()
				} else {
					blank()
					console.log(('!!! No Test Data Exits !!!').bgRed.white)
				}
			}

			resolve(existingTestList)
		})
	})
}


// *************
// ** Exports **
// *************
module.exports = checkForExistingTests
