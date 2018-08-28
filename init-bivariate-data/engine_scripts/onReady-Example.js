// jshint ignore: start
// ==============================
// == puppeteer engine example ==
// ==============================
module.exports = async (page, scenario, vp) => {
	console.log('onReady-Example.js is running for: ', scenario.label)

	// ------------------------------------------------------------------------------------
	// -- puppeteer script here to interact with page                                    --
	// -- docs here => https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md --
	// ------------------------------------------------------------------------------------
	// await require('./helpers/clickAndHoverHelper')(page, scenario)
  
	// // add more ready handlers here...
	const testData = require("./data/test-data.json")
	await page.evaluate( testData => {
		console.log("This custom script is running inside your web app!", testData.sometext)
		document.querySelectorAll(".container > p")[3].append(testData.sometext)
	}, testData)
}


// ===========================
// == chromy engine example ==
// ===========================
// module.exports = function (chromy, scenario, vp) {
// 	console.log("onReady-Example.js is running for: ", vp.label)

	// ------------------------------------------------------
	// -- chrome script here to interact with page         --
	// -- docs here => https://github.com/OnetapInc/chromy --
	// ------------------------------------------------------
	// const testData = require("./data/test-data.json")
	
	// return chromy
	// 	.evaluate(`_testData = " ${testData.sometext}"`)
	// 	.evaluate(function() {
	// 		console.log("This custom script is running inside your web app!")
	// 		document.querySelectorAll(".container > p")[3].append(_testData)
	// 	})
// }
