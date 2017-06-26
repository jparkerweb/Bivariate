// -----------------------------------
// -- Archive the current Reference --
// -----------------------------------
// jshint esversion: 6

var archiveReference = function archiveReference() {
	var inquirer = require('inquirer');
	var blank = require('./_blankLine');
	var checkForExistingReferences = require('./_checkForExistingReferences');
	var checkIfDirectroyExists = require('./_checkIfDirectoryExists');
	var moveFolder = require('./_moveFolder');

	return new Promise(function(resolve, reject) {
		checkForExistingReferences(false)
			.then(function([existingReferenceList, isLocked]) {

				if(existingReferenceList.length > 0) {
					blank();
					var questionsReferenceArchiveName = require('./_questionsReferenceArchiveName');

					inquirer.prompt(questionsReferenceArchiveName)
						.then(function (answerAction) {
							var sourceFolder = './backstop_data/bitmaps_reference';
							var archiveFolder = './bivariate_data/bitmaps_reference_archive';
							archiveFolder += '/' + answerAction.archiveName;

							return checkIfDirectroyExists(archiveFolder)
								.then(function() {
									blank();
									console.log(('Archive name is already in use, try again.').bgRed.white);
									return(false);
								})
								.catch(function() {
									return moveFolder(sourceFolder, archiveFolder, true)
									.then(function(){
										return(true);
									});
								});
						})
						.then(function(proceed){
							if(proceed) {
								blank();
								console.log(('--------------------').bgBlue.white);
								console.log(('- ARCHIVE complete -').bgBlue.white);
								console.log(('--------------------').bgBlue.white);
								blank();
							}

							resolve();
						})
						.catch(function(err){
							blank();
							console.log((err + '').bgRed.white);
							resolve();
						});
				}
				else {
					blank();
					console.log(('You must have and exisiting Reference to Archive it.').bgRed.white);
					console.log(('Either Restore or Create a Reference first.').bgRed.white);
					resolve();
				}
			});
	});

};


// *************
// ** Exports **
// *************
module.exports = archiveReference;
