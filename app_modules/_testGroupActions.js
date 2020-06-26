// --------------------------------------------------------
// -- ask which Test Group the action should be taken on --
// --------------------------------------------------------
// jshint esversion: 6

let testGroupActions = function testGroupActions(answerTestType, matchArr, spinner, testConfig) {
	let inquirer = require('inquirer')
	let questionsTestGroup = require('./_questionsTestGroup')
	let backstopjs = require('backstopjs')
	let deleteFolder = require('./_deleteFolder')
	let blank = require('./_blankLine')
	let cls = require('./_clearConsole')
	let asciiLogo = require('./_asciiLogo')
	let getPath = require('./_getPath')
	let colors = require("colors")

	return new Promise(function(resolve, reject) {
		let matchPrefix = ''
		let onlyShowMatch = true

		if(answerTestType === 'reference') {
			matchPrefix = '[EXISTING]  '
			onlyShowMatch = false
		}
		else if(answerTestType === 'delete-testgroup-reference') {
			onlyShowMatch = false
		}

		return questionsTestGroup(matchArr, matchPrefix, onlyShowMatch)
			.then(function([question, matchedPrefix]) {
				blank()

				inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))
				inquirer.prompt(question).then(function (answerTestGroup) {
					let exitMessage = ""
					let testPath = ""

					//cleanup selected group
					answerTestGroup.testGroup = answerTestGroup.testGroup.replace(matchedPrefix, '')
					if (answerTestGroup.testGroup !== '<<-- Back --') {
						// run test type
						let shortCircuit = false

						blank()
						console.log(("\n\n------- please wait, running \'" + answerTestType + "\' -------").bgGray.white)
						spinner.start()

						switch(answerTestType) {
							// Start Reporting Server
							case 'open-report':
								exitMessage = 'Opening Report for \"' + answerTestGroup.testGroup +'\" in your Browser.\nIf the Report displays zero results, rerun the Test for the selected Group.'
								shortCircuit = true

								// run selected action on the test group
								backstopjs('openReport', {
										config: require(getPath('bivariate_data/test_scripts/' + answerTestGroup.testGroup + '.js'))
									})
									.then(function() {
										spinner.stop()
										resolve('\n' + exitMessage + ' \n')
									})

								break

							// run test against reference
							case 'test':
								deleteFolder('Test: ' + answerTestGroup.testGroup, 'backstop_data/bitmaps_test/' + answerTestGroup.testGroup, false)
									.then(function() {
										exitMessage = 'Finished running TEST on "' + answerTestGroup.testGroup + '".\nOpening the Report in your Browser.'
										testPath = answerTestGroup.testGroup
									})

								break

							// create reference
							case 'reference':
								exitMessage = 'Finished creating a REFERENCE for "' + answerTestGroup.testGroup + '".\nYou can now run a Test for this group.'

								break

							// approve test
							case 'approve':
								deleteFolder('Test: ' + answerTestGroup.testGroup, 'backstop_data/bitmaps_test/' + answerTestGroup.testGroup, false)
									.then(function() {
										exitMessage = 'Finished APPROVing your existing Test for group "' + answerTestGroup.testGroup + '".'
										// exitMessage = 'Finished running TEST on "' + answerTestGroup.testGroup + '".\nOpening the Report in your Browser.'
										testPath = answerTestGroup.testGroup
									})

								break

							// delete test group
							case 'delete-testgroup-tests':
								shortCircuit = true
								spinner.stop()
								cls()
								asciiLogo()

								deleteFolder('Group Test Results: ' + answerTestGroup.testGroup, 'backstop_data/bitmaps_test/' + answerTestGroup.testGroup, true)
									.then(function() {
										resolve('')
									})

								break

							// delete reference group
							case 'delete-testgroup-reference':
								shortCircuit = true
								spinner.stop()
								cls()
								asciiLogo()

								deleteFolder('Group References: ' + answerTestGroup.testGroup, 'backstop_data/bitmaps_reference/' + answerTestGroup.testGroup, true)
									.then(function() {
										resolve('')
									})

								break

							default:
								//statements
						}

						if(!shortCircuit) {
							// run selected action on the test group
							backstopjs(answerTestType, {
									config: require(getPath('bivariate_data/test_scripts/' + answerTestGroup.testGroup + '.js'))
								})
								.then(function() {
									spinner.stop()
									resolve(['\n' + exitMessage + ' \n', testPath])
								})
								.catch(function(err) {
									spinner.stop()
									resolve(['\n' + ' Mismatch(es) Found > '.bgMagenta.white + '\n' + exitMessage + ' \n\n', testPath])
								})
						}
					}
					else {
						exitMessage = ''
						resolve(exitMessage)
					}
				})
			})


	})
}


module.exports = testGroupActions
