// jshint ignore: start
// ==============================
// == puppeteer engine example ==
// ==============================
module.exports = async (page, scenario, vp) => {
	console.log("onBefore-Example.js is running for: ", scenario.label)

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


// ===========================
// == chromy engine example ==
// ===========================
// module.exports = function (chromy, scenario, vp) {
// 	console.log("onBefore-Example.js is running for: ", vp.label)

	// ------------------------------------------------------
	// -- chrome script here to interact with page         --
	// -- docs here => https://github.com/OnetapInc/chromy --
	// ------------------------------------------------------
	// return chromy
		// .goto("http://mypage.com/login")
		// .wait("input#username")
		// .type("input#username", "user")
		// .type("input#password", "somepassword")
		// .click("button#loginButton", {waitLoadEvent: true})
// }
