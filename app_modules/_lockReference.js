// -------------------------------
// -- Lock/Unlock the Reference --
// -------------------------------
var lockReference = function lockReference(lockIt) {
	var cmd = require('node-cmd')
	var touch = require('./_touchFile')
	var blank = require('./_blankLine')

	return new Promise(function(resolve, reject) {
		if(lockIt) {
			touch('./backstop_data/bitmaps_reference/LOCKED')
			blank()
			console.log('\nReference is now LOCKED...'.bgBlue.white)

			resolve()
		}
		else {
			cmd.get('rimraf backstop_data/bitmaps_reference/LOCKED', function(data) {
				// console.log('', data)
				console.log('\nReference is now UNLOCKED...'.bgBlue.white)

				resolve()
			})
		}
	})
}


// *************
// ** Exports **
// *************
module.exports = lockReference
