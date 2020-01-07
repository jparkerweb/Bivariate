// -----------------------------
// -- update -all- test group --
// -----------------------------
// jshint esversion: 6

let updateAllTestGroup = function updateAllTestGroup() {
	let colors = require("colors")                 // pretty console colors
	let forEach = require('mout/array/forEach')    // foreach array util
	let getAllTestFiles = require('./_getAllTestFiles')
	let path = require('path')

	return new Promise(function(resolve, reject) {
		getAllTestFiles()
			.then(function(testGroups) {				
				let allTestFilePath = path.join(process.cwd(), "./bivariate_data/test_scripts/-all-tests-.js")
				let scenariosStringStart = "\"scenarios\": \["
				let scenariosStringEnd = "\n\t\t\]"
				let scenarioList = ""

				/// loop trough tests and create regex replace string for -all- scenario
				forEach(testGroups, function(val) {
					val = val.replace(/\\/g,"\/")
					scenarioList += "\n\t\t\trequire\(\'\.\/" + val + "\'\)\(baseURLs\),"
				})

				let scenariosString = scenariosStringStart + scenarioList + scenariosStringEnd

				const copy = require('recursive-copy')
				const replaceInFile = require('replace-in-file')

				let templateTest = path.join(__dirname, '../init-bivariate-data/templates/-all-tests-.js')
				let allTestFile = path.join(process.cwd(), './bivariate_data/test_scripts/-all-tests-.js')

				copy(templateTest, allTestFile, { overwrite: true }, function(error, results) {
					if (error) {
						console.error('failed to create Test file: ' + error)
					}
					else {
						let templateOptions = {
							files: allTestFilePath,
							from: [
								/\"scenarios\"\: \[[\s\S]*\]/gm
							],
							to: [
								scenariosString
							]
						}
		
						try {
							// update -all-tests-.js script scenario with all test files
							const changes = replaceInFile.sync(templateOptions)
							// console.log('Modified files:', changes.join(', '))
							
							if (changes) {
								// console.log(("test files:").yellow.bold)
								// console.log(testGroups)
								resolve('UPDATED -all-tests-.js scenario with all test files')
							}
						}
						catch (error) {
							console.error('Error occurred:', error)
						}
					}
				})
			})
	})
}


// *************
// ** Exports **
// *************
module.exports = updateAllTestGroup
