// -----------------
// - delete folder -
// -----------------
var blank = require('./_blankLine');

var deleteFolder = function(friendlyName, path, confirm) {
	var inquirer = require('inquirer');
	var cmd = require('node-cmd');

	return new Promise(function(resolve, reject) {
		// DELETE Test directories
		var questionsConfirmTestDelete = [
			{
				type: 'confirm',
				name: 'confirmDelete',
				message: 'Are you sure you want to DELETE your ' + friendlyName + ':',
				default: false
			}
		];

		blank();
		if(confirm) {
			return inquirer.prompt(questionsConfirmTestDelete)
				.then(function (answer) {
					return new Promise(function(resolve, reject) {
						if(answer.confirmDelete) {
							cmd.get('rimraf ./'+ path, function(data) {
								console.log((friendlyName + ' Deleted...').bgRed.white);

								resolve();
							});
						} else {
							blank();
							console.log((friendlyName + ' ').bgBlue.white + 'NOT'.bgBlue.white + (' Deleted...').bgBlue.white);

							resolve();
						}
					});
				})
				.then(function() {
					resolve();
				});
		}
		else {
			cmd.get('rimraf ./'+ path);
			resolve();
		}
	});
};

// *************
// ** Exports **
// *************
module.exports = deleteFolder;
