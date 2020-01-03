// -------------------------------------------------------------
// -- function that will display a message and wait for the   --
// -- user to press an key (accepts a message and a callback) --
// -------------------------------------------------------------

let pressEnterToContinue = function(message, cb) {
	let readline = require('readline')

	let rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	rl.question(message, function (answer) {
		rl.close()
		if(cb) { cb(); }
	})
}


// *************
// ** Exports **
// *************
module.exports = pressEnterToContinue
