// --------------------------------------------------------
// -- ask which Test Group the action should be taken on --
// --------------------------------------------------------
// jshint esversion: 6

var testGroupActions = function testGroupActions(answerTestType, matchArr, spinner) {
    var inquirer = require('inquirer');
    var questionsTestGroup = require('./_questionsTestGroup');
    var runBackstopCommand = require('./_runBackstopCommand');
    var deleteFolder = require('./_deleteFolder');
    var blank = require('./_blankLine');
    var cls = require('./_clearConsole');
    var asciiLogo = require('./_asciiLogo');

    return new Promise(function(resolve, reject) {
        var matchPrefix = '';
        var onlyShowMatch = true;

        if(answerTestType === 'reference') {
            matchPrefix = '[EXISTING]  ';
            onlyShowMatch = false;
        }

        return questionsTestGroup(matchArr, matchPrefix, onlyShowMatch)
            .then(function([question, matchedPrefix]) {
                blank();
                inquirer.prompt(question).then(function (answerTestGroup) {
                    var exitMessage = "";

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
                            case 'openReport':
                                exitMessage = 'Opening Report for \"' + answerTestGroup.testGroup +'\" in your Browser.\nIf the Report displays zero results, rerun the Test for the selected Group.';
                                shortCircuit = true;

                                // run selected action on the test group
                                runBackstopCommand('start', answerTestGroup.testGroup)
                                    .then(function() {
                                        return runBackstopCommand(answerTestType, answerTestGroup.testGroup)
                                            .then(function() {
                                                spinner.stop();
                                                resolve('\n' + exitMessage + ' \n');
                                            });
                                    });

                                break;

                            case 'test':
                                exitMessage = 'Finished running TEST on "' + answerTestGroup.testGroup + '".\nOpening the Report in your Browser.';

                                break;

                            case 'reference':
                                exitMessage = 'Finished creating a REFERENCE for "' + answerTestGroup.testGroup + '".\nYou can now run a Test for this group.';

                                break;

                            case 'bless':
                                exitMessage = 'Finished BLESSing your existing Reference for group "' + answerTestGroup.testGroup + '".\nYou can now run a Test for this group.';

                                break;

                            case 'delete-testgroup-tests':
                                shortCircuit = true;
                                spinner.stop();
                                cls();
                                asciiLogo();

                                deleteFolder('Group Test Results: ' + answerTestGroup.testGroup, 'backstop_data/bitmaps_test/' + answerTestGroup.testGroup)
                                    .then(function() {
                                        resolve('');
                                    });

                                break;

                            case 'delete-testgroup-reference':
                                shortCircuit = true;
                                spinner.stop();
                                cls();
                                asciiLogo();

                                deleteFolder('Group References: ' + answerTestGroup.testGroup, 'backstop_data/bitmaps_reference/' + answerTestGroup.testGroup)
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
                            return runBackstopCommand(answerTestType, answerTestGroup.testGroup)
                                .then(function() {
                                    spinner.stop();
                                    resolve('\n' + exitMessage + ' \n');
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
