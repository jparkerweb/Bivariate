// --------------------------------------
// - setup "Restore Reference" question -
// --------------------------------------

var questionsRestoreArchiveReference = function(archiveReferenceList) {
    var referenceList = ['<<-- Back --'];
    referenceList = referenceList.concat(archiveReferenceList);

    var questionsList = [
        {
            type: 'list',
            name: 'restoreReference',
            message: 'Select a Test Group:',
            choices: referenceList
        }
    ];

    return questionsList;
};


// *************
// ** Exports **
// *************
module.exports = questionsRestoreArchiveReference;
