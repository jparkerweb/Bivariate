// --------------
// - Touch File -
// --------------

var touchFile = function moveit(fileName) {
	var touch = require('touch')

	return new Promise(function(resolve, reject) {
		touch(fileName)
		resolve()
	})
}


// *************
// ** Exports **
// *************
module.exports = touchFile
