// ----------------
// -- Test Group --
// ----------------

var mixIn = require("mout/object/mixIn");
var testGroup = __filename.slice(__dirname.length + 1, -3);
var configCommon = require('./__config-common')(testGroup);
var baseURLs = require("./__config-baseURLs");


module.exports = mixIn(
    {
        // ---------------
        // -- Scenarios --
        // ---------------
        "scenarios": [
            require('./_example-site--home')(baseURLs),
            require('./_example-site--trees')(baseURLs)
        ],
    },
        configCommon
);
