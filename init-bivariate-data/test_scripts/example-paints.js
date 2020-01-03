// ----------------
// -- Test Group --
// ----------------

let mixIn = require("./../libs/mout-mixin/mixIn")
let testGroup = __filename.slice(__dirname.length + 1, -3)
let configCommon = require('./__config-common')(testGroup)
let baseURLs = require("./__config-baseURLs")


module.exports = mixIn(
	{
		// ---------------
		// -- Scenarios --
		// ---------------
		"scenarios": [
			require('./_example-test--paints')(baseURLs)
		],
	},
		configCommon
)
