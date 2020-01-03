// -----------------------------------
// -- Restore an Archived Reference --
// -----------------------------------
// jshint esversion: 6

let restoreReference = function restoreReference() {
	let inquirer = require('inquirer')
	let colors = require('colors')
	let blank = require('./_blankLine')
	let checkForExistingReferences = require('./_checkForExistingReferences')
	let checkForArchiveReferences = require('./_checkForArchiveReferences')
	let moveFolder = require('./_moveFolder')
	let getPath = require('./_getPath')

	return new Promise(function(resolve, reject) {

		return checkForExistingReferences(false)
			.then(function([returnedReferenceList, isLocked]) {
				return new Promise(function(resolve, reject) {
					if(returnedReferenceList.length > 0) {
						blank()
						let errorMsg = "You must ARCHIVE or DELETE your existing Reference before Restoring"
						console.log(errorMsg.bgRed.white)

						reject(errorMsg)
					} else {
						resolve()
					}
				})
			})
			.then(function() {
				return checkForArchiveReferences(false)
					.then(function(returnedReferenceList) {
						if(returnedReferenceList.length > 0) {
							let questionsRestoreArchiveReference = require('./_questionsRestoreArchiveReference')(returnedReferenceList)

							return inquirer.prompt(questionsRestoreArchiveReference)
								.then(function (answer) {
									if(answer.restoreReference === '<<-- Back --') {
										resolve()
									}
									else {
										// Do Restore
										blank()
										console.log(("Restoring Archive...").green)

										let sourceFolder = 'backstop_data/bitmaps_reference/'
										let archiveFolder = 'bivariate_data/bitmaps_reference_archive/'
										archiveFolder += '/' + answer.restoreReference
										archiveFolder = archiveFolder.replace('[LOCKED]  ', '')
										
										sourceFolder = getPath(sourceFolder)
										archiveFolder = getPath(archiveFolder)

										return moveFolder(archiveFolder, sourceFolder, true)
											.then(function() {
												blank()
												console.log(("--------------------").bgGray.white)
												console.log(("- RESTORE complete -").bgGray.white)
												console.log(("--------------------").bgGray.white)
												blank()
												resolve()
											})
											.catch(function(err) {
												console.log(err.bgRed.white)
											})
									}
								})
						} else {
							blank()
							console.log(("You do not have any Archive References to Restore").bgRed.white)

							resolve()
						}
					})
			})
			.catch(resolve)
	})
}


// *************
// ** Exports **
// *************
module.exports = restoreReference
