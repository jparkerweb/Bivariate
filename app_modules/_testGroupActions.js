// --------------------------------------------------------
// -- ask which Test Group the action should be taken on --
// --------------------------------------------------------
// jshint esversion: 6

var testGroupActions = function testGroupActions(answerTestType, matchArr, spinner, testConfig) {
	var inquirer = require('inquirer');
	var questionsTestGroup = require('./_questionsTestGroup');
	var backstopjs = require('backstopjs');
	var deleteFolder = require('./_deleteFolder');
	var blank = require('./_blankLine');
	var cls = require('./_clearConsole');
	var asciiLogo = require('./_asciiLogo');
	var getPath = require('./_getPath');
	var colors = require("colors");

	return new Promise(function(resolve, reject) {
		var matchPrefix = '';
		var onlyShowMatch = true;

		if(answerTestType === 'reference') {
			matchPrefix = '[EXISTING]  ';
			onlyShowMatch = false;
		}
		else if(answerTestType === 'delete-testgroup-reference') {
			onlyShowMatch = false;
		}

		return questionsTestGroup(matchArr, matchPrefix, onlyShowMatch)
			.then(function([question, matchedPrefix]) {
				blank();

				inquirer.prompt(question).then(function (answerTestGroup) {
					var exitMessage = "";
					var testPath = "";

					//cleanup selected group
					answerTestGroup.testGroup = answerTestGroup.testGroup.replace(matchedPrefix, '');

					if (answerTestGroup.testGroup !== '<<-- Back --') {
						// run test type
						var shortCircuit = false;

						blank();
						console.log(("\n\n------- please wait, running \'" + answerTestType + "\' -------").bgBlue.white);
						spinner.start();

						switch(answerTestType) {
							// Start Reporting Server
							case 'open-report':
								exitMessage = 'Opening Report for \"' + answerTestGroup.testGroup +'\" in your Browser.\nIf the Report displays zero results, rerun the Test for the selected Group.';
								shortCircuit = true;

								// run selected action on the test group
								backstopjs('openReport', {
										config: require(getPath('bivariate_data/test_scripts/' + answerTestGroup.testGroup + '.js'))
									})
									.then(function() {
										spinner.stop();
										resolve('\n' + exitMessage + ' \n');
									});

								break;

							case 'test':
								deleteFolder('Test: ' + answerTestGroup.testGroup, 'backstop_data/bitmaps_test/' + answerTestGroup.testGroup, false)
									.then(function() {
										exitMessage = 'Finished running TEST on "' + answerTestGroup.testGroup + '".\nOpening the Report in your Browser.';
										testPath = answerTestGroup.testGroup;
									});

								break;

							case 'reference':
								exitMessage = 'Finished creating a REFERENCE for "' + answerTestGroup.testGroup + '".\nYou can now run a Test for this group.';

								break;

							case 'approve':
								exitMessage = 'Finished APPROVing your existing Reference for group "' + answerTestGroup.testGroup + '".\nYou can now run a Test for this group.';

								break;

							case 'delete-testgroup-tests':
								shortCircuit = true;
								spinner.stop();
								cls();
								asciiLogo();

								deleteFolder('Group Test Results: ' + answerTestGroup.testGroup, 'backstop_data/bitmaps_test/' + answerTestGroup.testGroup, true)
									.then(function() {
										resolve('');
									});

								break;

							case 'delete-testgroup-reference':
								shortCircuit = true;
								spinner.stop();
								cls();
								asciiLogo();

								deleteFolder('Group References: ' + answerTestGroup.testGroup, 'backstop_data/bitmaps_reference/' + answerTestGroup.testGroup, true)
									.then(function() {
										resolve('');
									});

								break;

							case 'delete-testgroup-reference':

								break;

							default:
							//statements
						}

						if(!shortCircuit) {
							// run selected action on the test group
							backstopjs(answerTestType, {
									config: require(getPath('bivariate_data/test_scripts/' + answerTestGroup.testGroup + '.js'))
								})
								.then(function() {
									spinner.stop();
									resolve('\n' + exitMessage + ' \n');
								})
								.catch(function(err) {
									spinner.stop();
									resolve(['\n' + ' Mismatch(es) Found > '.bgMagenta.white + '\n' + exitMessage + ' \n\n', testPath]);
								});
						}
					}
					else {
						exitMessage = '';
						resolve(exitMessage);
					}
				});
			});


	});
};


module.exports = testGroupActions;
