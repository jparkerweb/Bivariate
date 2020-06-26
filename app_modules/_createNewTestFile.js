// ----------------------------
// -- Create a new Test File --
// ----------------------------
// jshint esversion: 6

let createTestFile = function createTestFile() {
	let inquirer = require('inquirer')
	let blank = require('./_blankLine')
	let questionsNewTest = require('./_questionsNewTest')
	let path = require('path')

	return new Promise(function(resolve, reject) {
		inquirer.prompt(questionsNewTest)
			.then(function (answerAction) {
				let copy = require('recursive-copy')

				let testName = answerAction.newTestName
					testName = testName.replace(/ /gm, '-')
				
				let testLabel = answerAction.newTestLabel || testName
				
				let newTestDirectory = answerAction.newTestDirectory
				let testRoute = answerAction.newTestRoute || 'index.html'
				let testSelectors = answerAction.newTestSelectors || '"document"'
				let testOnBeforeScript = answerAction.newTestOnBeforeScript.toLowerCase() === "y" ? true : false
				let testOnReadyScript = answerAction.newTestOnReadyScript.toLowerCase() === "y" ? true : false
				let testReadySelector = answerAction.newTestReadySelector|| ""
				let testCustomViewportObject = answerAction.newTestCustomViewportObject.toLowerCase() === "y" ?
					" { \"name\": \"custom-viewport\", \"width\": 1280, \"height\": 2000 } " : ""

				let testDelay = answerAction.newTestDelay || '300'
					testDelay = testDelay.replace(/ms/, '')

				let testDirectory = newTestDirectory.toLowerCase().length > 0 ? newTestDirectory.toLowerCase() + "/" : ""
					testDirectory = testDirectory.replace(/\/\//gm, '/')

				let testOnBeforeScriptName = testOnBeforeScript ? testDirectory + "onBefore-" + testName + ".js" : ""
				let testOnReadyScriptName = testOnReadyScript ? testDirectory + "onReady-" + testName + ".js" : ""

				let baseFolderTest = './bivariate_data/test_scripts/'
				let baseFolderScript = './bivariate_data/engine_scripts/'
				
				let testFile = baseFolderTest + newTestDirectory.toLowerCase() + '/_' + testName.toLowerCase() + '.js'
					testFile = testFile.replace(/\/\//gm, '/')
				
				let onBeforeScriptFile = baseFolderScript + newTestDirectory.toLowerCase() + '/onBefore-' + testName.toLowerCase() + '.js'
					onBeforeScriptFile = onBeforeScriptFile.replace(/\/\//gm, '/')
				
				let onReadyScriptFile = baseFolderScript + newTestDirectory.toLowerCase() + '/onReady-' + testName.toLowerCase() + '.js'
					onReadyScriptFile = onReadyScriptFile.replace(/\/\//gm, '/')
				
				let templateTest = path.join(__dirname, '../init-bivariate-data/templates/_example.js')
				let templateScriptOnBefore = path.join(__dirname, '../init-bivariate-data/templates/onBefore-example.js')
				let templateScriptOnReady = path.join(__dirname, '../init-bivariate-data/templates/onReady-example.js')

				let destTest = path.join(process.cwd(), testFile)
				let destOnBeforeScript = path.join(process.cwd(), onBeforeScriptFile)
				let destOnReadyScript = path.join(process.cwd(), onReadyScriptFile)

				const replaceInFile = require('replace-in-file')
				let templateOptions = ""


				copy(templateTest, destTest, { overwrite: true }, function(error, results) {
					if (error) {
						console.error('failed to create Test file: ' + error)
					}
					else {
						templateOptions = {
							files: [destTest],
							from: [
								/_____name_____/g, /_____label_____/g, /_____route_____/g,
								/_____selectors_____/g, /_____delay_____/g, /_____directory_____/g,
								/_____onBeforeScriptName_____/g, /_____onReadyScriptName_____/g,
								/_____readySelector_____/g, /_____customViewportObject_____/g
							],
							to: [
								testName, testLabel, testRoute,
								testSelectors, testDelay, testDirectory,
								testOnBeforeScriptName, testOnReadyScriptName,
								testReadySelector, testCustomViewportObject
							]
						}
						try {
							// update example script with users input selections
							const changes = replaceInFile.sync(templateOptions)
							// console.log('Modified files:', changes.join(', '))
							
							let copiedScripts = true
							if (testOnBeforeScript) {
								console.log("creating onBeforeScript")
								copy(templateScriptOnBefore, destOnBeforeScript, { overwrite: true }, function(error, results) {
									if (error) {
										copiedScripts = false
										console.error('failed to create onBefore Script file: ' + error)
									}
								})
							}
							if (testOnReadyScript) {
								console.log("creating onReadyScript")
								copy(templateScriptOnReady, destOnReadyScript, { overwrite: true }, function(error, results) {
									if (error) {
										copiedScripts = false
										console.error('failed to create onReady Script file: ' + error)
									}
								})
							}
							if (copiedScripts) {
								resolve('created new test')
							}
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
module.exports = createTestFile
