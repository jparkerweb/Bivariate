module.exports = async (page, scenario, vp) => {
	console.log("onBefore-Example.js is running for: ", scenario.label)

	// // puppeteer script here to interact before ready script runs
	// // docs here => https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
	// await page.goto("http://www.google.com")
	// if (await page.waitForSelector("input#lst-ib") !== null) {
	// 	await page.type("input#lst-ib", "puppeteer is cool")
	// 	await page.click("input[type='submit']")
	// }
}
