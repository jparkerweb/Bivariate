// -----------------------------------------------------------
// - Configuration for other misc options used for all Tests -
// -----------------------------------------------------------

module.exports = function(testGroup) {
    return {
        "id": testGroup,

        // The Viewports
        "viewports": require('./__config-viewports'),

        // Paths
        "paths": {
            "bitmaps_reference": "backstop_data/bitmaps_reference/" + testGroup,
            "bitmaps_test": "backstop_data/bitmaps_test/" + testGroup,
            "casper_scripts": "bivariate_data/casper_scripts",
            "html_report": "backstop_data/html_report/" + testGroup,
            "ci_report": "backstop_data/ci_report/" + testGroup
        },

        // report
        "ci": {
            "testSuiteName" :  testGroup
        },

        "casperFlags": [],
        "engine": "phantomjs",
        //"engine": "slimerjs",
        "report": ["browser"],
        // "report": ["CLI", "browser"],
        "debug": false,
    };
};
