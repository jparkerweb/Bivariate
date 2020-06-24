// -------------------------------
// - get existing reference data -
// -------------------------------

let walk = require('walk')                     // file system walker (get file names)
let forEach = require('mout/array/forEach')    // foreach array util
let sort = require('mout/array/sort')          // sort array util
let getPath = require('./_getPath')
let blank = require('./_blankLine')


let checkForArchiveReferences = function checkForArchiveReferences(logit) {
	if (typeof logit === 'undefined' ) { logit = false; }

	let archiveReferenceList = []
	let baseDir = getPath("bivariate_data/bitmaps_reference_archive")
	let walker = walk.walk(baseDir, { followLinks: false })
	let checkIfFileExists = require('./_checkIfFileExists')

	return new Promise(function(resolve, reject) {
		walker.on('directory', function (path, stat, next) {
			if (path === baseDir) {
				checkIfFileExists(baseDir + '/' + stat.name + '/LOCKED')
					.then(function(isLocked) {
						archiveReferenceList.push((isLocked ? '[LOCKED]  ' : '') + stat.name)
					})
			}

			next()
		})

		walker.on('end', function() {
			archiveReferenceList = sort(archiveReferenceList)

			if (logit) {
				if (archiveReferenceList.length > 0) {
					blank()
					console.log(('------------------' + '\n').bgGray.white)
					console.log(('Archive References' + '\n').bgGray.white)
					console.log(('------------------' + '\n').bgGray.white)

					forEach(archiveReferenceList, function(val) {
						let displayVal = ' ' + val + ' '
						console.log(displayVal.bgGray.white)
					})

					blank()
				} else {
					blank()
					console.log(('!!! No Archive Data Exits !!!').bgRed.white)
				}
			}

			resolve(archiveReferenceList)
		})
	})
}


// *************
// ** Exports **
// *************
module.exports = checkForArchiveReferences
