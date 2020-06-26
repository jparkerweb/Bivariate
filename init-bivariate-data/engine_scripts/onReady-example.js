// jshint ignore: start
// ==============================
// == puppeteer engine example ==
// ==============================
module.exports = async (page, scenario, vp) => {
	console.log('onReady script is running for: ', scenario.label)

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

	// other interaction examples:
	// await page.waitForSelector('.some-selector-you-want-to-wait-to-appear-in-the-DOM')
	// await page.click('.some-selector-you-want-clicked')
	// await page.waitFor(500)
	// await page.hover('.some-selector-you-want-to-hover-over)
	// await page.type('input.some-input[type="text"]', 'text you want to type in the input', {delay: 20})
}
