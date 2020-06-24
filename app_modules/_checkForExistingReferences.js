// -------------------------------
// - get existing reference data -
// -------------------------------

let walk = require('walk')                     // file system walker (get file names)
let forEach = require('mout/array/forEach')    // foreach array util
let sort = require('mout/array/sort')          // sort array util
let getPath = require('./_getPath')
let blank = require('./_blankLine')


function checkForExistingReferences(logit) {
	if (typeof logit === 'undefined' ) { logit = false; }

	let existingReferenceList = []
	let baseDir = getPath("backstop_data/bitmaps_reference")
	let walker = walk.walk(baseDir, { followLinks: false })
	let checkIfFileExists = require('./_checkIfFileExists')
	let isLocked = false

	return new Promise(function(resolve, reject) {
		walker.on('directories', function (root, dirStatsArray, next) {
			forEach(dirStatsArray, function(val) {
				existingReferenceList.push(val.name)
			})

			checkIfFileExists(baseDir + '/LOCKED')
				.then(function(lock) {
					isLocked = lock
					next()
				})
		})

		walker.on('end', function() {
			existingReferenceList = sort(existingReferenceList)

			if (logit) {
				if (existingReferenceList.length > 0) {
					blank()
					console.log(('------------------------').bgGray.white)
					console.log(('- Generated References -').bgGray.white)
					console.log(('------------------------').bgGray.white)

					if(isLocked) {
						console.log(('-        ').bgRed.white + ('LOCKED').bgRed.white + ('        -').bgRed.white)
					}



					forEach(existingReferenceList, function(val) {
						let displayVal = ' ' + val + ' '
						console.log(displayVal.bgGray.white)
					})
					blank()
				} else {
					existingReferenceList = []
					blank()
					console.log(('!!! No Reference Data Exits !!!').bgRed.white)
				}
			}

			resolve([existingReferenceList, isLocked])
		})
	})
}


// *************
// ** Exports **
// *************
module.exports = checkForExistingReferences
