// --------------
// - Touch File -
// --------------

let touchFile = function moveit(fileName) {
	let touch = require('touch')

	return new Promise(function(resolve, reject) {
		touch(fileName)
		resolve()
	})
}


// *************
// ** Exports **
// *************
module.exports = touchFile
