// -----------------------------------
// - setup "Approve Group" questions -
// -----------------------------------

let forEach = require('mout/array/forEach')    // foreach array util
let checkForExistingTests = require('./_checkForExistingTests')
let checkForExistingReferences = require('./_checkForExistingReferences')

let getApproveGroups = function() {
	return new Promise(function(resolve, reject) {
		checkForExistingReferences(false)
			.then(function(refGroups) {
				if(refGroups.length > 0) {
					// console.log("have ref groups")
					checkForExistingTests(false, true)
					.then(function(testGroups) {
						if(testGroups.length > 0) {
								// console.log("have test groups")
								// only return test groups have have a reference
								let approveGroups = refGroups[0].filter(value => testGroups.includes(value))
								resolve(approveGroups)
							}
							else {
								reject("no tests to update with approval")
							}
						})
				}
				else {
					reject("no references to update with approval")
				}
			})
	})
}


// *************
// ** Exports **
// *************
module.exports = getApproveGroups
