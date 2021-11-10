// -----------------
// - delete folder -
// -----------------
let blank = require('./_blankLine')

let deleteFolder = function(friendlyName, path, confirm) {
	let inquirer = require('inquirer')
	let cmd = require('node-cmd')

	return new Promise(function(resolve, reject) {
		// DELETE Test directories
		let questionsConfirmTestDelete = [
			{
				type: 'confirm',
				name: 'confirmDelete',
				message: 'Are you sure you want to DELETE your ' + friendlyName + ':',
				default: false
			}
		]

		blank()
		if(confirm) {
			return inquirer.prompt(questionsConfirmTestDelete)
				.then(function (answer) {
					return new Promise(function(resolve, reject) {
						if(answer.confirmDelete) {
							cmd.run('rimraf ./'+ path, function(data) {
								console.log((friendlyName + ' Deleted...').bgRed.white)

								resolve()
							})
						} else {
							blank()
							console.log((friendlyName + ' ').bgGray.white + 'NOT'.bgGray.white + (' Deleted...').bgGray.white)

							resolve()
						}
					})
				})
				.then(function() {
					resolve()
				})
		}
		else {
			cmd.run('rimraf ./'+ path)
			resolve()
		}
	})
}

// *************
// ** Exports **
// *************
module.exports = deleteFolder
