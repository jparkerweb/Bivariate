// --------------------------------------
// - setup "Restore Reference" question -
// --------------------------------------

let questionsRestoreArchiveReference = function(archiveReferenceList) {
	let referenceList = ['<<-- Back --']
	referenceList = referenceList.concat(archiveReferenceList)

	let questionsList = [
		{
			type: 'list',
			name: 'restoreReference',
			message: 'Select a Test Group:',
			choices: referenceList
		}
	]

	return questionsList
}


// *************
// ** Exports **
// *************
module.exports = questionsRestoreArchiveReference
