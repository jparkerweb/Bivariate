// -------------------
// - test definition -
// -------------------

// * tests should be saved as: '_test-name.js'
//   if you have a lot of tests you can store
//   related tests in named subdirectories
//   for better organization

let label = "Example Test - Home Page"
let route = "/index.html"
let readySelector = ""
let hideSelectors = []
let removeSelectors = []
let selectors = [ "document", "h1", ".hero", ".nav", ".body-content" ]
let hoverSelector = null
let hoverSelectors = []
let clickSelector = null
let clickSelectors = []
let postInteractionWait = 100
let scrollToSelector = null
let delay = 300
let onBeforeScript = 'onBefore-Example.js'
let onReadyScript = 'onReady-Example.js'
let viewports = []

// ---------
// - label -
// ---------
// [required]
// used on reports and screen shot file names (should be unique between tests)

// ---------
// - route -
// ---------
// [required]
// the route for this test (start with a "/")

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

// -------------
// - selectors - (array or strings)
// -------------
// selectors for elements to be "captured" (CSS selector syntax)

// -----------------
// - hoverSelector -
// -----------------
// Move the pointer over the specified DOM element prior to screen shot.

// ------------------
// - hoverSelectors - (array)
// ------------------
// *Puppeteer only* takes array of selectors -- simulates multiple
// sequential hover interactions.

// -----------------
// - clickSelector -
// -----------------
// Click the specified DOM element prior to screen shot.

// ------------------
// - clickSelectors - (array)
// ------------------
// *Puppeteer only* takes array of selectors -- simulates
// multiple sequential click interactions.

// -----------------------
// - postInteractionWait -
// -----------------------
// Wait for a selector after interacting with hoverSelector or clickSelector
// (optionally accepts wait time in ms. Idea for use with a click or hover
// element transition. available with default onReadyScript)

// --------------------
// - scrollToSelector -
// --------------------
// Scrolls the specified DOM element into view prior to screen shot
// (available with default onReadyScript)

// ---------
// - delay -
// ---------
// Wait for x milliseconds

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

// -------------
// - viewports -
// -------------
// overwrite array of viewports
// example:
// let viewports = [
//    {
//        name: "huge-vertical-space",
//        width: 1920,
//        height: 4500
//    }
// ]

// -------------------------------------------------------------------
// - advanced options can be overwritten in the options object below -
// -------------------------------------------------------------------
module.exports = function(baseURLs) {
	let url = (baseURLs.baseURL + route)
	let referenceUrl = baseURLs.baseRefURL === null ? null : (baseURLs.baseRefURL + route)
	let options = {
		"label": label,									// [required] Tag saved with your reference images
		"url": url,										// [required] Tag saved with your reference images
		"referenceUrl": referenceUrl,					// Specify a different state or environment when creating reference.
		"readySelector": readySelector,					// Wait until this selector exists before continuing.
		"hideSelectors": hideSelectors,					// Array of selectors set to visibility: hidden
		"removeSelectors": removeSelectors,				// Array of selectors set to display: none
		"selectors": selectors,							// Array of selectors to capture. Defaults to document if omitted. Use "viewport" to capture the viewport size.
		"selectorExpansion": true,						// If you want BackstopJS to find and take screenshots of all matching selector instances then set to true.
		"readyEvent": null,								// Wait until this string has been logged to the console.
		"hoverSelector": hoverSelector,					// Move the pointer over the specified DOM element prior to screen shot.
		"hoverSelectors": hoverSelectors,				// *Puppeteer only* takes array of selectors -- simulates multiple sequential hover interactions.
		"clickSelector": clickSelector,					// Click the specified DOM element prior to screen shot.
		"clickSelectors": clickSelectors,				// *Puppeteer only* takes array of selectors -- simulates multiple sequential click interactions.
		"postInteractionWait": postInteractionWait,		// Wait for a selector after interacting with hoverSelector or clickSelector (optionally accepts wait time in ms. Idea for use with a click or hover element transition. available with default onReadyScript)
		"scrollToSelector": scrollToSelector,			// Scrolls the specified DOM element into view prior to screen shot (available with default onReadyScript)
		"delay": delay,									// Wait for x milliseconds	
		"misMatchThreshold": 0.1,						// Percentage of different pixels allowed to pass test
		"onBeforeScript": onBeforeScript,				// Used to set up browser state e.g. cookies.
		"onReadyScript": onReadyScript,					// After the above conditions are met -- use this script to modify UI state prior to screen shots e.g. hovers, clicks etc.
		"requireSameDimensions": false,					// If set to true -- any change in selector size will trigger a test failure.
		"viewports": viewports							// An array of screen size objects your DOM will be tested against. This configuration will override the viewports property assigned at the config root.
	}

	if (baseURLs.baseRefURL === null) {
		delete options.referenceUrl
	}

	return options
}
