// -----------------------------------
// -- Archive the current Reference --
// -----------------------------------
// jshint esversion: 6

let archiveReference = function archiveReference() {
	let inquirer = require('inquirer')
	let blank = require('./_blankLine')
	let checkForExistingReferences = require('./_checkForExistingReferences')
	let checkIfDirectoryExists = require('./_checkIfDirectoryExists')
	let moveFolder = require('./_moveFolder')

	return new Promise(function(resolve, reject) {
		checkForExistingReferences(false)
			.then(function([existingReferenceList, isLocked]) {

				if(existingReferenceList.length > 0) {
					blank()
					let questionsReferenceArchiveName = require('./_questionsReferenceArchiveName')

					// inquirer.registerPrompt('confirm-validated', require('inquirer-confirm-validated'))
					inquirer.prompt(questionsReferenceArchiveName)
						.then(function (answerAction) {
							let sourceFolder = './backstop_data/bitmaps_reference'
							let archiveFolder = './bivariate_data/bitmaps_reference_archive'
							archiveFolder += '/' + answerAction.archiveName

							return checkIfDirectoryExists(archiveFolder)
								.then(function() {
									blank()
									console.log(('Archive name is already in use, try again.').bgRed.white)
									return(false)
								})
								.catch(function() {
									return moveFolder(sourceFolder, archiveFolder, true)
									.then(function() {
										return(true)
									})
								})
						})
						.then(function(proceed) {
							if(proceed) {
								blank()
								console.log(('--------------------').bgGray.white)
								console.log(('- ARCHIVE complete -').bgGray.white)
								console.log(('--------------------').bgGray.white)
								blank()
							}

							resolve()
						})
						.catch(function(err) {
							blank()
							console.log((err + '').bgRed.white)
							resolve()
						})
				}
				else {
					blank()
					console.log(('You must have and existing Reference to Archive it.').bgRed.white)
					console.log(('Either Restore or Create a Reference first.').bgRed.white)
					resolve()
				}
			})
	})

}


// *************
// ** Exports **
// *************
module.exports = archiveReference
