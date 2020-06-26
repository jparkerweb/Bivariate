// jshint ignore: start
// =============================
// == puppeteer engine script ==
// =============================
module.exports = async (page, scenario, vp) => {
	console.log('onReady script is running for: ', scenario.label)

	// ------------------------------------------------------------------------------------
	// -- puppeteer script here to interact with page                                    --
	// -- docs here => https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md --
	// ------------------------------------------------------------------------------------
	// await require('./helpers/clickAndHoverHelper')(page, scenario)

	// await page.waitForSelector('#someinput')
	// await page.type("#someinput", "some text to type", {delay: 20})
	// await page.click("button[type='submit']")
	// await page.waitFor(500)
	// await page.hover('.some-selector-you-want-to-hover-over)
}

