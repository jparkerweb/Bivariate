// ----------------------------------
// -- Create a new Test Group File --
// ----------------------------------
// jshint esversion: 6

let createTestGroupFile = function createTestGroupFile() {
	let inquirer = require('inquirer')
	let blank = require('./_blankLine')
	let questionsNewTestGroup = require('./_questionsNewTestGroup')
	let path = require('path')

	return new Promise(function(resolve, reject) {
		inquirer.prompt(questionsNewTestGroup)
			.then(function (answerAction) {
				let copy = require('recursive-copy')

				let testGroupName = answerAction.newTestGroupName
					testGroupName = testGroupName.replace(/ /gm, '-')

				let baseFolderTestGroup = './bivariate_data/test_scripts/'
				
				let testGroupFile = baseFolderTestGroup + testGroupName.toLowerCase() + '.js'
					testGroupFile = testGroupFile.replace(/\/\//gm, '/')

				let templateTestGroup = path.join(__dirname, '../init-bivariate-data/templates/blank-test-group.js')

				let destTestGroup = path.join(process.cwd(), testGroupFile)

				const replaceInFile = require('replace-in-file')
				let templateOptions = ""

				copy(templateTestGroup, destTestGroup, { overwrite: true }, function(error, results) {
					if (error) {
						console.error('failed to create Test file: ' + error)
					}
					else {
						templateOptions = {
							files: [destTestGroup],
							from: [
								/_____testgroup_____/g
							],
							to: [
								testGroupName
							]
						}
						try {
							// update example script with users input selections
							const changes = replaceInFile.sync(templateOptions)
							// console.log('Modified files:', changes.join(', '))
							
							resolve('created new test group')
						}
						catch (error) {
							console.error('Error occurred:', error)
						}
					}
				})
			})
			.catch(function(err) {
				blank()
				console.log((err + '').bgRed.white)
				resolve()
			})
	})
}


// *************
// ** Exports **
// *************
module.exports = createTestGroupFile
