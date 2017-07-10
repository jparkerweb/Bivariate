// ***********************************************************************
// ** Bivariate is an interface for BackstopJS, which uses CasperJS and **
// ** requres Python to be installed on your machine                    **
// ***********************************************************************
// jshint esversion: 6

var colors = require("colors");                 // pretty console colors
var inquirer = require('inquirer');             // prompt questions and gather answers
var Spinner = require('cli-spinner').Spinner;   // cool console spinner (progress indicator)
var spawn = require('child_process').spawn;     // built in node module for spawing child processes

var pressEnterToContinue = require('./app_modules/_pressEnterToContinue');
var cls = require('./app_modules/_clearConsole');
var blank = require('./app_modules/_blankLine');
var asciiLogo = require('./app_modules/_asciiLogo');
var checkIfDirectroyExists = require('./app_modules/_checkIfDirectoryExists');
var checkForExistingTests = require('./app_modules/_checkForExistingTests');
var checkForExistingReferences = require('./app_modules/_checkForExistingReferences');
var testGroupActions = require('./app_modules/_testGroupActions');
var getTestGroups = require('./app_modules/_getTestGroups');
var deleteFolder = require('./app_modules/_deleteFolder');


// -----------------
// - setup spinner -
// -----------------
var spinner = new Spinner(' ');
spinner.setSpinnerString(25);


// ----------------------------
// - abracadabra - it's Magic -
// ----------------------------
function abracadabra(msg) {
    cls();
    asciiLogo();

    if (typeof msg === 'undefined' ) { msg = ''; }
    console.log((msg).bgWhite.black);

    var questionsTestType = require('./app_modules/_questionsTestType');

    inquirer.prompt(questionsTestType).then(function (answerAction) {
        if (answerAction.testType !== '') {

            switch(answerAction.testType) {
                // OPEN REPORT
                case 'openReport':
                    checkForExistingReferences(false)
                        .then(function([existingReferenceList, isLocked]) {

                            if(existingReferenceList.length > 0) {
                                checkForExistingTests(false).then(function(testList){
                                    if(testList.length > 0) {
                                        testGroupActions(answerAction.testType, existingReferenceList, spinner)
                                            .then(function(message){
                                                abracadabra(message);
                                            });
                                    }
                                    else {
                                        blank();
                                        console.log(('Please run a Test before attempting to open a Report.').bgRed.white);
                                        blank();

                                        pressEnterToContinue('press enter to continue...', abracadabra);
                                    }
                                });

                            }
                            else {
                                blank();
                                console.log(('Please create a Reference and run a Test before attempting to open a Report.').bgRed.white);
                                blank();

                                pressEnterToContinue('press enter to continue...', abracadabra);
                            }
                        });

                    break;

                // DELETE Test directories
                case 'delete-tests':
                    spinner.stop();
                    checkForExistingTests(false)
                        .then(function(testList) {
                            if(testList.length > 0) {
                                deleteFolder('Test Results', 'backstop_data/bitmaps_test')
                                    .then(function() {
                                        pressEnterToContinue('press enter to continue...', abracadabra);
                                    });
                            }
                            else {
                                blank();
                                console.log(('!!! No Test Data Exists !!!').bgRed.white);
                                pressEnterToContinue('press enter to continue...', abracadabra);
                            }
                        });

                    break;

                // DELETE REFERENCES
                case 'delete-reference':
                case 'delete-testgroup-reference':
                    checkForExistingReferences(false)
                        .then(function([existingReferenceList, isLocked]) {
                            blank();

                            if (existingReferenceList.length === 0) {
                                console.log(('You do not have a Current Reference to Delete.').bgRed.white);

                                pressEnterToContinue('press enter to continue...', abracadabra);
                            }

                            else if (isLocked) {
                                console.log(('The Current Refererence is Locked.').bgRed.white);
                                console.log(('You must Unlock is before it can be Deleted or altered.').bgRed.white);

                                pressEnterToContinue('press enter to continue...', abracadabra);
                            }

                            else if(!isLocked && existingReferenceList.length > 0) {
                                // DELETE Refererence Group
                                if(answerAction.testType === 'delete-testgroup-reference') {
                                    testGroupActions(answerAction.testType, existingReferenceList, spinner)
                                        .then(function(message){
                                            pressEnterToContinue('press enter to continue...', function(){
                                                abracadabra(message);
                                            });
                                        });
                                }
                                // DELETE Reference directories
                                else {
                                    deleteFolder('Current References', 'backstop_data/bitmaps_reference')
                                        .then(function() {
                                            pressEnterToContinue('press enter to continue...', abracadabra);
                                        });
                                }
                            }
                        });


                    break;

                // LIST existing references
                case 'list-references':
                    checkForExistingReferences(true)
                        .then(function() {
                            pressEnterToContinue('press enter to continue...', abracadabra); // restart app
                        });

                    break;

                // LIST existing tests
                case 'list-tests':
                    checkForExistingTests(true)
                        .then(function(){
                            pressEnterToContinue('press enter to continue...', abracadabra); // restart app
                        });

                    break;

                // ARCHIVE current References
                case 'archive-reference':
                    require('./app_modules/_archiveReference')()
                        .then(function() {
                            blank();
                            pressEnterToContinue('press enter to continue...', abracadabra); // restart app
                        })
                        .catch(function(err) {
                            console.log((err).bgRed.white.bold);
                        });

                    break;

                // RESTORE an Archived Reference
                case 'restore-reference':
                    var restoreReference = require('./app_modules/_restoreReference');
                    restoreReference()
                        .then(function() {
                            blank();
                            pressEnterToContinue('press enter to continue...', abracadabra); // restart app
                        })
                        .catch(function(err) {
                            console.log((err).bgRed.white.bold);
                        });

                    break;

                // LOCK / UNLOCK Current Reference
                case 'lock-reference':
                case 'unlock-reference':
                    checkIfDirectroyExists('./backstop_data/bitmaps_reference')
                        .then(function() {
                            var lockIt = (answerAction.testType === 'lock-reference' ? true : false);

                            require('./app_modules/_lockReference')(lockIt)
                                .then(function() {
                                    pressEnterToContinue('press enter to continue...', abracadabra);
                                });
                    })
                    .catch(function() {
                        blank();
                        console.log(('No Reference exists to ' + answerAction.testType.toUpperCase() + ', please Create or Restore a Reference first.').bgRed.white);

                        pressEnterToContinue('press enter to continue...', abracadabra);
                    });

                    break;

                // CREATE REFERENCE
                case 'reference':
                    checkForExistingReferences(false)
                        .then(function([existingReferenceList, isLocked]) {
                            if(isLocked) {
                                blank();
                                console.log(('You must first Unlock the Reference before').bgRed.white);
                                console.log(('adding additional Test Groups to it.').bgRed.white);

                                pressEnterToContinue('press enter to continue...', abracadabra);
                            }
                            else {
                                testGroupActions(answerAction.testType, existingReferenceList, spinner)
                                    .then(function(message){
                                        pressEnterToContinue(message + "Press enter to return to the main menu...", abracadabra);
                                    })
                                    .catch(function(){
                                        pressEnterToContinue('An Error Occured, press enter to return to the main menu...', abracadabra);
                                    });
                            }
                        });

                    break;

                // RUN TEST
                case 'bless':
                case 'test':
                    // test to see if a reference exists
                    checkIfDirectroyExists('./backstop_data/bitmaps_reference')
                        .then(function() {

                            checkForExistingReferences(false)
                                .then(function([existingReferenceList, isLocked]) {
                                    // BLESS
                                    if(answerAction.testType === 'bless') {
                                        testGroupActions(answerAction.testType, existingReferenceList, spinner)
                                            .then(function(message){
                                                abracadabra(message);
                                            });
                                    }
                                    // TEST
                                    else {
                                        getTestGroups()
                                            .then(function(testGroups) {
                                                if(testGroups.length > 0) {
                                                    testGroupActions(answerAction.testType, existingReferenceList, spinner)
                                                        .then(function(message){
                                                            abracadabra(message);
                                                        });
                                                }
                                                else {
                                                    blank();
                                                    console.log(('You don\'t have any Test Groups to run a Test from.').bgRed.white);
                                                }
                                            });
                                    }
                                });
                        })
                        .catch(function() {
                            blank();
                            console.log(('No Reference exists to ' + answerAction.testType.toUpperCase() + ', please Create or Restore a Reference first.').bgRed.white);

                            pressEnterToContinue('press enter to continue...', abracadabra);
                        });

                    break;

                case 'delete-testgroup-tests':
                    checkForExistingTests(false)
                        .then(function(existingTests) {

                            testGroupActions(answerAction.testType, existingTests, spinner)
                                .then(function(message){
                                    pressEnterToContinue('press enter to continue...', function(){
                                        abracadabra(message);
                                    });
                                });
                        });

                    break;

                default:
                    testGroupActions(answerAction.testType, [], spinner)
                        .then(function(message){
                            abracadabra(message);
                        });
            } //\ end switch
        }
        else {
            var npmRunStop = spawn('npm.cmd', ['run', 'stop'], {
                cwd: './node_modules/backstopjs'
            });

            // -- error output --
            npmRunStop.stderr.on('data', function (data) {
                console.log(('stderr: ' + data).bgRed.white);
            });

            // -- exit --
            npmRunStop.on('exit', function (code) {
                cls();
                asciiLogo();

                console.log(('\nThanks for using ').green + ('Bivariate').bold.cyan);
                console.log(('Have a Great Day!\n').green);
            });
        }
    });
}






// *************
// ** Run App **
// *************
abracadabra();
