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
  
	// await page.waitFor("#someElementId")
	// await page.type("#someinput", "some text to type")
	// await page.click("button[type='submit']")
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
