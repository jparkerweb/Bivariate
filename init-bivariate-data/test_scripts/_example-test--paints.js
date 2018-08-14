// -------------------
// - test definition -
// -------------------

// * tests should be saved as: '_test-name.js'
//   if you have a lot of tests you can store
//   related tests in named subdirectories
//   for better organization

var label = 'Example Test - Paints'
var route = '/paints.html'
var selectors = [ "document", ".body-content" ]
var onBeforeScript = null
var onReadyScript = null
var readySelector = ""
var hideSelectors = []
var removeSelectors = []

// ---------
// - label -
// ---------
// used on reports and screen shot file names (should be unique between tests)

// ---------
// - route -
// ---------
// the route for this test (start with a "/")

// -------------
// - selectors - (array or strings)
// -------------
// selectors for elements to be "captured" (CSS selector syntax)

// ------------------
// - onBeforeScript -
// ------------------
// Runs before each scenario
// use for setting cookies or other env state
// (.js suffix is optional / looks for file in "engine_scripts" dir)

// -----------------
// - onReadyScript -
// -----------------
// Runs after onReady event on all scenarios
// use for simulating interactions
// (.js suffix is optional / looks for file in "engine_scripts" dir)

// -----------------
// - readySelector -
// -----------------
// Selector to look for before continuing

// -----------------
// - hideSelectors -
// -----------------
// hide elements from view by changing its "visibility" to "hidden"

// -------------------
// - removeSelectors -
// -------------------
// remove elements from the DOM before screen capture



// -------------------------------------------------------------------
// - advanced options can be overwritten in the options object below -
// -------------------------------------------------------------------
module.exports = function(baseURLs) {
	var url = (baseURLs.baseURL + route)
	var referenceUrl = baseURLs.baseRefURL === null ? null : (baseURLs.baseRefURL + route)
	var options = {
		"label": label,
		"url": url,
		"referenceUrl": referenceUrl,
		"readySelector": readySelector,
		"hideSelectors": hideSelectors,
		"removeSelectors": removeSelectors,
		"selectors": selectors,
		"selectorExpansion": true,
		"readyEvent": null,
		"delay": 300,
		"misMatchThreshold" : 0.1,
		"onBeforeScript": onBeforeScript,
		"onReadyScript": onReadyScript
	}

	if(baseURLs.baseRefURL === null) {
		delete options.referenceUrl
	}

	return options
}
