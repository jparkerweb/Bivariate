// -------------------
// -- Update Header --
// -------------------
// jshint esversion: 6

var updateHeader = function updateHeader(testPath) {
	// return new Promise(function(resolve, reject) {
		const replaceInFile = require('replace-in-file');
		testPath = "backstop_data/html_report/" + testPath + "/index.html"

		// let find1 = ".ReactModal__Body--open {"
		let replacement1 = "a[href=\"https://garris.github.io/BackstopJS/\"] { display:none !important; } \n .ReactModal__Body--open {"
		
		// let find2 = "<div id=\"root\">"
		let replacement2 = "<a style='position:absolute; right:32px; top:10px; display:inline-block; z-index:10000;' href='https://github.com/jparkerweb/bivariate/' target='_blank'><img src='data:image/png;base64,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' /></a><div id='root'>"
		
		
		templateOptions = {
			files: [testPath],
			from: [
				/BackstopJS/g,
				/\.ReactModal__Body--open {/,
				/<div id=\"root\">/
			],
			to: [ "Bivariate", replacement1, replacement2 ]
		}
		try {
			const changes = replaceInFile.sync(templateOptions)
			// console.log('Modified files:', changes.join(', '));
		}
		catch (error) {
			console.error('error updating header:', error)
		}
	// })
}


// *************
// ** Exports **
// *************
module.exports = updateHeader
