// --------------------------------------------------
// - setup "Archive Reference" destination question -
// --------------------------------------------------

let questionsReferenceArchiveName = [
	{
		type: 'input',
		name: 'archiveName',
		message: 'Give your Reference Archive a name:',
		validate(input) {
			if (!input || (input && input.trim() === '')) {
				return "Archive name can't be empty"
			} else {
				return true
			}
		}
	}
]


// *************
// ** Exports **
// *************
module.exports = questionsReferenceArchiveName
