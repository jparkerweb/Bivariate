// ----------------
// -- Test Group --
// ----------------

var mixIn = require("./../libs/mout-mixin/mixIn");
var testGroup = __filename.slice(__dirname.length + 1, -3);
var configCommon = require('./__config-common')(testGroup);
var baseURLs = require("./__config-baseURLs");


module.exports = mixIn(
	{
		// ---------------
		// -- Scenarios --
		// ---------------
		"scenarios": [
			require('./_example-test--home')(baseURLs)
		],
	},
		configCommon
);
