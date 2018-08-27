// -------------------
// - test definition -
// -------------------

// * tests should be saved as: '_test-name.js'
//   if you have a lot of tests you can store
//   related tests in named subdirectories
//   for better organization

var label = "Example Test - Home Page"
var route = "/index.html"
var selectors = [ "document", "h1", ".hero", ".nav", ".body-content" ]
var onBeforeScript = 'onBefore-Example.js'
var onReadyScript = 'onReady-Example.js'
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
	var baseurl = (baseURLs.baseURL)
	var basereferenceUrl = baseURLs.baseRefURL === null ? null : (baseURLs.baseRefURL)
	var options = {
		// [required] Tag saved with your reference images
		"label": label,
		// [required] Tag saved with your reference images
		"url": url,
		// Specify a different state or environment when creating reference.
		"referenceUrl": referenceUrl,
		// Wait until this selector exists before continuing.
		"readySelector": readySelector,
		// Array of selectors set to visibility: hidden
		"hideSelectors": hideSelectors,
		// Array of selectors set to display: none
		"removeSelectors": removeSelectors,
		// Array of selectors to capture. Defaults to document if omitted. Use "viewport" to capture the viewport size.
		"selectors": selectors,
		"selectorExpansion": true,
		// Wait until this string has been logged to the console.
		"readyEvent": null,
		// Move the pointer over the specified DOM element prior to screen shot.
		"hoverSelector": null,
		// *Puppeteer only* takes array of selectors -- simulates multiple sequential hover interactions.
		"hoverSelectors": null,
		// Click the specified DOM element prior to screen shot.
		"clickSelector": null,
		// *Puppeteer only* takes array of selectors -- simulates multiple sequential click interactions.
		"clickSelectors": null,
		// Wait for a selector after interacting with hoverSelector or clickSelector (optionally accepts
		// wait time in ms. Idea for use with a click or hover element transition. available with default onReadyScript)
		"postInteractionWait": null,
		// Scrolls the specified DOM element into view prior to screen shot (available with default onReadyScript)
		"scrollToSelector": null,
		// Wait for x milliseconds
		"delay": 300,
		// Percentage of different pixels allowed to pass test
		"misMatchThreshold": 0.1,
		"onBeforeScript": onBeforeScript,
		// After the above conditions are met -- use this script to modify UI state prior to screen shots e.g. hovers, clicks etc.
		"onReadyScript": onReadyScript,
		// If set to true -- any change in selector size will trigger a test failure.
		"requireSameDimensions": false
	}

	if(baseURLs.baseRefURL === null) {
		delete options.referenceUrl
	}

	return options
}
