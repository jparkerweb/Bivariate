// ----------------------------
// -- Create a new Test File --
// ----------------------------
// jshint esversion: 6

var createTestFile = function createTestFile() {
	var inquirer = require('inquirer');
	var blank = require('./_blankLine');
	var questionsNewTest = require('./_questionsNewTest');
	var path = require('path');

	return new Promise(function(resolve, reject) {
		inquirer.prompt(questionsNewTest)
			.then(function (answerAction) {
				var copy = require('recursive-copy');

				var testName = answerAction.newTestName
					testName = testName.replace(/ /gm, '-')
				
				var testLabel = answerAction.newTestLabel || testName
				
				var newTestDirectory = answerAction.newTestDirectory
				var testRoute = answerAction.newTestRoute || 'index.html'
				var testSelectors = answerAction.newTestSelectors || '"document"'
				var testOnBeforeScript = answerAction.newTestOnBeforeScript.toLowerCase() === "y" ? true : false
				var testOnReadyScript = answerAction.newTestOnReadyScript.toLowerCase() === "y" ? true : false
				var testReadySelector = answerAction.newTestReadySelector|| ""

				var testDelay = answerAction.newTestDelay || '300'
					testDelay = testDelay.replace(/ms/, '')

				var testDirectory = newTestDirectory.toLowerCase().length > 0 ? newTestDirectory.toLowerCase() + "/" : ""
					testDirectory = testDirectory.replace(/\/\//gm, '/')

				var testOnBeforeScriptName = testOnBeforeScript ? testDirectory + "onBefore-" + testName + ".js" : ""
				var testOnReadyScriptName = testOnReadyScript ? testDirectory + "onReady-" + testName + ".js" : ""

				var baseFolderTest = './bivariate_data/test_scripts/';
				var baseFolderScript = './bivariate_data/engine_scripts/';
				
				var testFile = baseFolderTest + newTestDirectory.toLowerCase() + '/_' + testName.toLowerCase() + '.js'
					testFile = testFile.replace(/\/\//gm, '/')
				
				var scriptFile = baseFolderScript + newTestDirectory.toLowerCase() + '/onReady-' + testName.toLowerCase() + '.js'
					scriptFile = scriptFile.replace(/\/\//gm, '/')
				
				var templateTest = path.join(__dirname, '../init-bivariate-data/templates/_example.js');
				var templateScriptOnBefore = path.join(__dirname, '../init-bivariate-data/templates/onBefore-example.js');
				var templateScriptOnReady = path.join(__dirname, '../init-bivariate-data/templates/onReady-example.js');

				var destTest = path.join(process.cwd(), testFile);
				var destScript = path.join(process.cwd(), scriptFile);

				const replaceInFile = require('replace-in-file');
				let templateOptions = ""


				copy(templateTest, destTest, { overwrite: true }, function(error, results) {
					if (error) {
						console.error('failed to create Test file: ' + error);
					}
					else {
						templateOptions = {
							files: [destTest],
							from: [
								/_____name_____/g, /_____label_____/g, /_____route_____/g,
								/_____selectors_____/g, /_____delay_____/g, /_____directory_____/g,
								/_____onBeforeScriptName_____/g, /_____onReadyScriptName_____/g, /_____readySelector_____/g
							],
							to: [
								testName, testLabel, testRoute,
								testSelectors, testDelay, testDirectory,
								testOnBeforeScriptName, testOnReadyScriptName, testReadySelector
							]
						}
						try {
							// update example script with users input selections
							const changes = replaceInFile.sync(templateOptions);
							// console.log('Modified files:', changes.join(', '));
							
							let copiedScripts = true
							if (testOnBeforeScript) {
								copy(templateScriptOnBefore, destScript, { overwrite: true }, function(error, results) {
									if (error) {
										copiedScripts = false
										console.error('failed to create onBefore Script file: ' + error);
									}
								})
							}
							if (testOnReadyScript) {
								copy(templateScriptOnReady, destScript, { overwrite: true }, function(error, results) {
									if (error) {
										copiedScripts = false
										console.error('failed to create onReady Script file: ' + error);
									}
								})
							}
							if (copiedScripts) {
								resolve('created new test');
							}
						}
						catch (error) {
							console.error('Error occurred:', error);
						}
					}
				})
			})
			.catch(function(err){
				blank();
				console.log((err + '').bgRed.white);
				resolve();
			});
	})
}


// *************
// ** Exports **
// *************
module.exports = createTestFile;
