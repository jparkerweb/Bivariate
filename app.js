#!/usr/bin/env node

// **********************************************
// ** Bivariate is an opinionated interface    **
// ** for writing and running BackstopJS tests **
// **********************************************
// jshint esversion: 6

let colors = require("colors")                 // pretty console colors
let inquirer = require('inquirer')             // prompt questions and gather answers
let Spinner = require('cli-spinner').Spinner   // cool console spinner (progress indicator)
let spawn = require('child_process').spawn     // built in node module for spawning child processes
let path = require('path')

let pjson = require('./package.json')
let pressEnterToContinue = require('./app_modules/_pressEnterToContinue')
let cls = require('./app_modules/_clearConsole')
let blank = require('./app_modules/_blankLine')
let asciiLogo = require('./app_modules/_asciiLogo')
let checkIfDirectoryExists = require('./app_modules/_checkIfDirectoryExists')
let checkForExistingTests = require('./app_modules/_checkForExistingTests')
let checkForExistingReports = require('./app_modules/_checkForExistingReports')
let checkForExistingReferences = require('./app_modules/_checkForExistingReferences')
let testGroupActions = require('./app_modules/_testGroupActions')
let getTestGroups = require('./app_modules/_getTestGroups')
let getApproveGroups = require('./app_modules/_getApproveGroups')
let getPath = require('./app_modules/_getPath')
let deleteFolder = require('./app_modules/_deleteFolder')
let updateHeader = require('./app_modules/_updateHeader')

let testConfig
// options:
//		runcmdoutput: true / false <-- log stdout/stderr



// -----------------
// - setup spinner -
// -----------------
let spinner = new Spinner(' ')
spinner.setSpinnerString(25)


// ----------------------------
// - abracadabra - it's Magic -
// ----------------------------
function abracadabra(msg) {
	testConfig = require(getPath('bivariate_data/test_scripts/__config-common.js'))()

	cls()
	asciiLogo()

	if (typeof msg === 'undefined' ) { msg = '' }
	console.log('----------------------------------'.bgWhite.black + pjson.version.bgWhite.black + '-'.bgWhite.black)
	console.log((msg).bgWhite.black)

	let questionsTestType = require('./app_modules/_questionsTestType')

	inquirer.prompt(questionsTestType).then(function (answerAction) {
		if (answerAction.testType !== '') {

			switch(answerAction.testType) {
				// CREATE NEW BLANK TEST
				case 'create-new-test':
					require('./app_modules/_createNewTestFile')()
						.then(function() {
							blank()
							pressEnterToContinue('test created, make sure to include it in the \n' + 'Scenarios'.yellow.bold + ' section of a ' + 'Test Group'.yellow.bold + ' to run it \n\n.press enter to continue...', abracadabra) // restart app
						})
						.catch(function(err) {
							console.log(err.bgRed.white)
						})
					break

				// CREATE NEW BLANK TEST
				case 'create-new-test-group':
					require('./app_modules/_createNewTestGroupFile')()
						.then(function() {
							blank()
							pressEnterToContinue('blank test group created, make sure to include any tests you want it to run in the \n' + 'Scenarios'.yellow.bold + ' section. \n\n.press enter to continue...', abracadabra) // restart app
						})
						.catch(function(err) {
							console.log(err.bgRed.white)
						})
					break

				// UPDATE -all- TEST GROUP WITH EXISTING TEST FILES
				case 'update-all-test-group':
					require('./app_modules/_updateAllTestGroup')()
						.then(function() {
							// blank()
							pressEnterToContinue('-all-tests-.js'.yellow.bold + ' scenario was updated/created with all ' + 'test files'.yellow.bold + '\n\n.press enter to continue...', abracadabra) // restart app
						})
						.catch(function(err) {
							console.log(err.bgRed.white)
						})
					break

				// OPEN REPORT
				case 'open-report':
					checkForExistingReferences(false)
						.then(function([existingReferenceList, isLocked]) {

							if(existingReferenceList.length > 0) {
								checkForExistingTests(false).then(function(testList) {
									if(testList.length > 0) {
										testGroupActions(answerAction.testType, existingReferenceList, spinner, testConfig)
											.then(function(message) {
												abracadabra(message)
											})
									}
									else {
										blank()
										console.log(('Please run a Test before attempting to open a Report.').bgRed.white)
										blank()

										pressEnterToContinue('press enter to continue...', abracadabra)
									}
								})

							}
							else {
								blank()
								console.log(('Please create a Reference and run a Test before attempting to open a Report.').bgRed.white)
								blank()

								pressEnterToContinue('press enter to continue...', abracadabra)
							}
						})

					break

				// DELETE Test directories
				case 'delete-tests':
					spinner.stop()
					checkForExistingTests(false)
						.then(function(testList) {
							if(testList.length > 0) {
								deleteFolder('Test Results', 'backstop_data/bitmaps_test')
									.then(function() {
										pressEnterToContinue('press enter to continue...', abracadabra)
									})
							}
							else {
								blank()
								console.log(('!!! No Test Data Exists !!!').bgRed.white)
								pressEnterToContinue('press enter to continue...', abracadabra)
							}
						})

					break

				// DELETE Report directories
				case 'delete-reports':
					spinner.stop()
					checkForExistingReports(false)
						.then(function(testList) {
							if(testList.length > 0) {
								deleteFolder('Reports', 'backstop_data/html_report', true)
									.then(function() {
										pressEnterToContinue('press enter to continue...', abracadabra)
									})
							}
							else {
								blank()
								console.log(('!!! No Reports Exist !!!').bgRed.white)
								pressEnterToContinue('press enter to continue...', abracadabra)
							}
						})

					break

				// DELETE REFERENCES
				case 'delete-reference':
				case 'delete-testgroup-reference':
					checkForExistingReferences(false)
						.then(function([existingReferenceList, isLocked]) {
							blank()

							if (existingReferenceList.length === 0) {
								console.log(('You do not have a Current Reference to Delete.').bgRed.white)

								pressEnterToContinue('press enter to continue...', abracadabra)
							}

							else if (isLocked) {
								console.log(('The Current Reference is Locked.').bgRed.white)
								console.log(('You must Unlock is before it can be Deleted or altered.').bgRed.white)

								pressEnterToContinue('press enter to continue...', abracadabra)
							}

							else if(!isLocked && existingReferenceList.length > 0) {
								// DELETE Reference Group
								if(answerAction.testType === 'delete-testgroup-reference') {
									testGroupActions(answerAction.testType, existingReferenceList, spinner, testConfig)
										.then(function(message) {
											pressEnterToContinue('press enter to continue...', function() {
												abracadabra(message)
											})
										})
								}
								// DELETE Reference directories
								else {
									console.log("deleting references:", existingReferenceList)
									deleteFolder('Current References', 'backstop_data/bitmaps_reference', true)
										.then(function() {
											pressEnterToContinue('Press enter to continue...', abracadabra)
										})
								}
							}
						})

					break

				// LIST existing references
				case 'list-references':
					checkForExistingReferences(true)
						.then(function() {
							pressEnterToContinue('press enter to continue...', abracadabra) // restart app
						})

					break

				// LIST existing tests
				case 'list-tests':
					checkForExistingTests(true)
						.then(function() {
							pressEnterToContinue('press enter to continue...', abracadabra) // restart app
						})

					break

				// ARCHIVE current References
				case 'archive-reference':
					require('./app_modules/_archiveReference')()
						.then(function() {
							blank()
							pressEnterToContinue('press enter to continue...', abracadabra) // restart app
						})
						.catch(function(err) {
							console.log(err.bgRed.white)
						})

					break

				// RESTORE an Archived Reference
				case 'restore-reference':
					let restoreReference = require('./app_modules/_restoreReference')
					restoreReference()
						.then(function() {
							blank()
							pressEnterToContinue('press enter to continue...', abracadabra) // restart app
						})
						.catch(function(err) {
							console.log(err.bgRed.white)
						})

					break

				// LOCK / UNLOCK Current Reference
				case 'lock-reference':
				case 'unlock-reference':
					checkIfDirectoryExists(getPath('backstop_data/bitmaps_reference'))
						.then(function() {
							let lockIt = (answerAction.testType === 'lock-reference' ? true : false)

							require('./app_modules/_lockReference')(lockIt)
								.then(function() {
									pressEnterToContinue('press enter to continue...', abracadabra)
								})
						})
						.catch(function() {
							blank()
							console.log(('No Reference exists to ' + answerAction.testType.toUpperCase() + ', please Create or Restore a REFERENCE first.').bgRed.white)

							pressEnterToContinue('press enter to continue...', abracadabra)
						})

					break

				// CREATE REFERENCE
				case 'reference':
					checkForExistingReferences(false)
						.then(function([existingReferenceList, isLocked]) {
							if(isLocked) {
								blank()
								console.log(('You must first Unlock the Reference before').bgRed.white)
								console.log(('adding additional Test Groups to it.').bgRed.white)

								pressEnterToContinue('press enter to continue...', abracadabra)
							}
							else {
								testGroupActions(answerAction.testType, existingReferenceList, spinner, testConfig)
									.then(function(message) {
										pressEnterToContinue(message + "Press enter to return to the main menu...", abracadabra)
									})
									.catch(function() {
										pressEnterToContinue('An Error Occurred, press enter to return to the main menu...', abracadabra)
									})
							}
						})

					break

				// RUN APPROVE
				case 'approve':
					// test to see if a test exists
					console.log(getPath('backstop_data/bitmaps_test'))
					checkIfDirectoryExists(getPath('backstop_data/bitmaps_test'))
						.then(function() {
							// APPROVE
							if(answerAction.testType === 'approve') {
								getApproveGroups()
									.then(function(approveGroups) {
										// console.log("approveGroups", approveGroups)
										if(approveGroups.length > 0) {
											console.log(('When running this command, all images (with changes) from your').bgWhite.black)
											console.log(('most recent test batch will be promoted to your reference collection.').bgWhite.black)
											console.log(('Subsequent tests will be compared against your updated reference files.').bgWhite.black)

											testGroupActions(answerAction.testType, approveGroups, spinner, testConfig)
												.then(function(message) {
													pressEnterToContinue(message + '"Press enter to continue...', abracadabra)
												})
										}
										else {
											blank()
											console.log(('You don\'t have any matching REFERENCE & TEST Groups to Approve.').bgRed.white)
											pressEnterToContinue('"Press enter to continue...', abracadabra)
										}
									})
							}
						})
						.catch(function() {
							blank()
							console.log(('You don\'t have any matching REFERENCE & TEST Groups to Approve.').bgRed.white)
							pressEnterToContinue('"Press enter to continue...', abracadabra)
						})

					break

				// RUN TEST
				case 'test':
					// test to see if a reference exists
					checkIfDirectoryExists(getPath('backstop_data/bitmaps_reference'))
						.then(function() {

							checkForExistingReferences(false)
								.then(function([existingReferenceList, isLocked]) {
									// TEST
									getTestGroups()
										.then(function(testGroups) {
											if(testGroups.length > 0) {
												testGroupActions(answerAction.testType, existingReferenceList, spinner, testConfig)
													.then(function([message, testPath]) {
														updateHeader(testPath)
														message = (typeof message === "undefined") ? "" : message
														pressEnterToContinue(message + '"Press enter to continue...', abracadabra)
													})
											}
											else {
												blank()
												console.log(('You don\'t have any Test Groups to run a Test from.').bgRed.white)
											}
										})
								})
						})
						.catch(function() {
							blank()
							console.log(('No Reference exists to ' + answerAction.testType.toUpperCase() + ', please Create or Restore a REFERENCE first.').bgRed.white)

							pressEnterToContinue('press enter to continue...', abracadabra)
						})

					break

				case 'delete-testgroup-tests':
					checkForExistingTests(false)
						.then(function(existingTests) {

							testGroupActions(answerAction.testType, existingTests, spinner, testConfig)
								.then(function(message) {
									pressEnterToContinue('press enter to continue...', function() {
										abracadabra(message)
									})
								})
						})

					break

				default:
					testGroupActions(answerAction.testType, [], spinner, testConfig)
						.then(function(message) {
							abracadabra(message)
						})
			} //\ end switch
		}
		else {
			cls()
			asciiLogo()

			console.log('\nThanks for using '.green + 'Bivariate'.cyan)
			console.log('Have a Great Day!\n'.green)
		}
	})
}






// *************
// ** Run App **
// *************
checkIfDirectoryExists(getPath('bivariate_data'))
	.then(function() {
		let libsSrc = path.join(__dirname, 'init-bivariate-data/libs/')
		let libsDest = path.join(process.cwd(), 'bivariate_data/libs/')
		let copy = require('recursive-copy')

		copy(libsSrc, libsDest, { overwrite: true }, function(error, results) {
			if (error) {
				console.error('libs failed: ' + error)
			} else {
				abracadabra()
			}
		})
	})
	.catch(function() {
		return inquirer.prompt(
				[{
					type: 'confirm',
					name: 'confirmInit',
					message: 'No "bivariate_data" folder found.\nWould like like to generate the base/example test and configuration files?',
					default: true
				}]
			)
			.then(function (answer) {
				return new Promise(function(resolve, reject) {
					if(answer.confirmInit) {
						let src = path.join(__dirname, 'init-bivariate-data')
						let desc = path.join(process.cwd(), 'bivariate_data')

						console.log("GENERATE DATA......")
						// console.log("src", src)
						// console.log("desc", desc)

						let copy = require('recursive-copy')

						copy(src, desc, function(error, results) {
							if (error) {
								console.error('config file generation failed: ' + error)
							} else {
								console.log('Generated base/example test and configuration files.')

								return inquirer.prompt(
									[{
										type: 'confirm',
										name: 'confirmStartapp',
										message: 'Would you like to run Bivariate with the newly generated example tests and configuration?',
										default: true
									}]
								)
								.then(function (answer) {
									return new Promise(function(resolve, reject) {
										if(answer.confirmStartapp) {
											abracadabra()
										} else {
											cls()
											asciiLogo()

											console.log('\nThanks for using '.green + 'Bivariate'.cyan)
											console.log('Have a Great Day!\n'.green)

											resolve()
										}
									})
								})
							}
						})

					} else {
						blank()
						console.log('You can not run Bivariate without a "bivariate_data" folder containing your tests and configuration files')

						resolve()
					}
				})
			})
	})
