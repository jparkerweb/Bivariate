module.exports = async (page, scenario, vp) => {
	console.log('onReady-Example.js is running for: ', scenario.label)

	await require('./helpers/clickAndHoverHelper')(page, scenario)
  
	// add more ready handlers here...

	const testData = require("./data/test-data.json")
	await page.evaluate( testData => {
		console.log("This custom script is running inside your web app!", testData.sometext)
		document.querySelectorAll(".container > p")[3].append(testData.sometext)
	}, testData)
}
