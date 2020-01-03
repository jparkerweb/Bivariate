// jshint ignore: start
module.exports = async (page, scenario) => {
	let hoverSelector = scenario.hoverSelectors || scenario.hoverSelector
	let clickSelector = scenario.clickSelectors || scenario.clickSelector
	let scrollToSelector = scenario.scrollToSelector
	let postInteractionWait = scenario.postInteractionWait // selector [str] | ms [int]

	if (hoverSelector) {
		await page.waitFor(hoverSelector)
		await page.hover(hoverSelector)
	}

	if (clickSelector) {
		await page.waitFor(clickSelector)
		await page.click(clickSelector)
	}

	if (postInteractionWait) {
		await page.waitFor(postInteractionWait)
	}

	if (scrollToSelector) {
		await page.waitFor(scrollToSelector)
		await page.evaluate(scrollToSelector => {
			document.querySelector(scrollToSelector).scrollIntoView()
		}, scrollToSelector)
	}
}
