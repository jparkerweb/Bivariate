// -----------------------------------------------------------
// - Configuration for other misc options used for all Tests -
// -----------------------------------------------------------

module.exports = function(testGroup) {
	return {
		"id": testGroup,

		// -----------------
		// - The Viewports -
		// -----------------
		"viewports": require('./__config-viewports'),


		// ---------
		// - Paths -
		// ---------
		"paths": {
			"bitmaps_reference": "./backstop_data/bitmaps_reference/" + testGroup,
			"bitmaps_test": "./backstop_data/bitmaps_test/" + testGroup,
			"engine_scripts": "./bivariate_data/engine_scripts",
			"html_report": "./backstop_data/html_report/" + testGroup,
			"ci_report": "./backstop_data/ci_report/" + testGroup
		},


		// ----------
		// - Report -
		// ----------
		"ci": {
			"testSuiteName" :  testGroup
		},


		// ----------
		// - Engine -
		// ----------
		"engine": "puppeteer",	// headless chrome browser (recommended)
		// "engine": "chromy",


		// ------------------
		// - Engine Options -
		// ------------------
		"engineOptions": {
			"ignoreDefaultArgs": ["--hide-scrollbars"]
		},

		"asyncCaptureLimit": 6, // number of simultaneous browser windows to use
		"report": ["browser"],	// open report in browser
		"debug": false,			// command line verbose debug output
		"debugWindow": true,	// show chrome windows during test


		// --------------------------
		// - Bivariate Debug Option -
		// --------------------------
		"runcmdoutput": false
	}
}
