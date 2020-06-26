// jshint ignore: start
// =============================
// == puppeteer engine script ==
// =============================
module.exports = async (page, scenario, vp) => {
	console.log("onBefore script is running for: ", scenario.label)

	// ------------------------------------------------------------------------------------
	// -- puppeteer script here to interact with page                                    --
	// -- docs here => https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md --
	// ------------------------------------------------------------------------------------
	// await page.goto("http://www.google.com")
	// if (await page.waitForSelector("input#lst-ib") !== null) {
	// 	await page.type("input#lst-ib", "puppeteer is cool")
	// 	await page.click("input[type='submit']")
	// }
	// page.waitFor(3000)
}
