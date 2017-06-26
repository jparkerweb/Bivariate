// -----------------------------------
// -- Restore an Archived Reference --
// -----------------------------------
// jshint esversion: 6

var restoreReference = function restoreReference() {
	var inquirer = require('inquirer');
	var blank = require('./_blankLine');
	var checkForExistingReferences = require('./_checkForExistingReferences');
	var checkForArchiveReferences = require('./_checkForArchiveReferences');
	var moveFolder = require('./_moveFolder');

	return new Promise(function(resolve, reject) {

		return checkForExistingReferences(false)
			.then(function([returnedReferenceList, isLocked]){
				return new Promise(function(resolve, reject) {
					if(returnedReferenceList.length > 0) {
						blank();
						var errorMsg = "You must ARCHIVE or DELETE your existing Reference before Restoring";
						console.log(errorMsg.bgRed.white);

						reject(errorMsg);
					} else {
						resolve();
					}
				});
			})
			.then(function() {
				return checkForArchiveReferences(false)
					.then(function(returnedReferenceList) {
						if(returnedReferenceList.length > 0) {
							var questionsRestoreArchiveReference = require('./_questionsRestoreArchiveReference')(returnedReferenceList);

							return inquirer.prompt(questionsRestoreArchiveReference)
								.then(function (answer) {
									if(answer.restoreReference === '<<-- Back --') {
										resolve();
									}
									else {
										// Do Restore
										blank();
										console.log(("Restoring Archive...").green);

										var sourceFolder = './backstop_data/bitmaps_reference';
										var archiveFolder = './bivariate_data/bitmaps_reference_archive';
										archiveFolder += '/' + answer.restoreReference;
										archiveFolder = archiveFolder.replace('[LOCKED]  ', '');

										return moveFolder(archiveFolder, sourceFolder, true)
											.then(function() {
												blank();
												console.log(("--------------------").bgBlue.white);
												console.log(("- RESTORE complete -").bgBlue.white);
												console.log(("--------------------").bgBlue.white);
												blank();
												resolve();
											});
									}
								});
						} else {
							blank();
							console.log(("You do not have any Archive References to Restore").bgRed.white);

							resolve();
						}
					});
			})
			.catch(resolve);
	});
};


// *************
// ** Exports **
// *************
module.exports = restoreReference;
