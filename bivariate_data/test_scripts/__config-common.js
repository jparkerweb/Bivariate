// -----------------------------------------------------------
// - Configuration for other misc options used for all Tests -
// -----------------------------------------------------------

module.exports = function(testGroup) {
    return {
        // The Viewports
        "viewports": require('./__config-viewports'),

        // Paths
        "paths": {
            "bitmaps_reference": "../../backstop_data/bitmaps_reference/" + testGroup,
            "bitmaps_test": "../../backstop_data/bitmaps_test/" + testGroup,
            "compare_data": "../../backstop_data/bitmaps_test/" + testGroup + "/compare.json",
            "casper_scripts": "../../bivariate_data/casper_scripts"
        },

        //"engine": "slimerjs",
        "engine": "phantomjs",
        "report": ["CLI", "browser"],
        //"report": ["CLI"],
        "cliExitOnFail": false,
        "casperFlags": [],
        "debug": false,
        "port": 3001  // report web server port
    };
};
