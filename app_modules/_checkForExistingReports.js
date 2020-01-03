// ------------------------
// - get existing reports -
// ------------------------

let walk = require('walk')                     // file system walker (get file names)
let forEach = require('mout/array/forEach')    // foreach array util
let sort = require('mout/array/sort')          // sort array util
let unique = require('mout/array/unique')      // unique array util
let blank = require('./_blankLine')

function checkForExistingReports(logit) {
	if (typeof logit === 'undefined' ) { logit = false }

	let existingReportList = []
	let baseDir = "./backstop_data/html_report/"
	let walker = walk.walk(baseDir, { followLinks: false })

	return new Promise(function(resolve, reject) {
		let currentBase = ''

		walker.on('file', function(root, stat, next) {
			let currentFile = stat.name
			let currentDir = root

			if(currentFile.substr(-3) === 'png') {
				currentDir = (currentDir.replace(baseDir + '\\', ''))
				currentBase = currentDir
				existingReportList.push(currentBase)
			}

			next()
		})

		walker.on('end', function() {
			existingReportList = unique(existingReportList)
			existingReportList = sort(existingReportList)

			if (logit) {
				if (existingReportList.length > 0) {
					blank()
					console.log(('--------------------').bgGray.white)
					console.log(('- Existing Reports -').bgGray.white)
					console.log(('--------------------').bgGray.white)

					forEach(existingReportList, function(val) {
						let displayVal = ' ' + val + ' '
						console.log(displayVal.bgGray.white)
					})

					blank()
				} else {
					blank()
					console.log(('!!! No Reports Exit !!!').bgRed.white)
				}
			}

			resolve(existingReportList)
		})
	})
}


// *************
// ** Exports **
// *************
module.exports = checkForExistingReports
