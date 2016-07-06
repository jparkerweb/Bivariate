// -------------------
// - test definition -
// -------------------

// * tests should be saved as: '_test-name.js'
//   if you have a lot of tests you can store
//   related tests in named subdirectories
//   for better organization

var label = 'Example Test - Paints'; // test name
var route = '/paints.html';              // the route for this test (start with a '/')
var selectors = [                       // selectors for elements to be "captured" (CSS selector syntax)
    "body",
    ".body-content"
];
var onBeforeScript = null;          // Runs before each scenario
                                    // -- use for setting cookies or other env state
                                    // (.js suffix is optional / looks for file in 'casper_script' dir)
var onReadyScript = null;           // Runs after onReady event on all scenarios
                                    // -- use for simulating interactions
                                    // (.js suffix is optional / looks for file in 'casper_script' dir)
var hideSelectors = [];             // hide elements from view by changing its "visibility" to "hidden"
var removeSelectors = [];           // remove elements from the DOM before screen capture



// ---------------------------------------------
// - advanced options can be overwritten below -
// ---------------------------------------------
module.exports = function(baseURLs) {
    return {
        "label": label,
        "url": (baseURLs.baseURL + route).replace(/\/\//,'/'),
        "referenceUrl": (baseURLs.baseRefURL + route).replace(/\/\//,'/'),
        "hideSelectors": hideSelectors,
        "removeSelectors": removeSelectors,
        "selectors": selectors,
        "readyEvent": null,
        "delay": 100,
        "misMatchThreshold" : 0.1,
        "onBeforeScript": onBeforeScript,
        "onReadyScript": onReadyScript
    };
};
