// -------------------------------
// -- Lock/Unlock the Reference --
// -------------------------------
let lockReference = function lockReference(lockIt) {
	let cmd = require('node-cmd')
	let touch = require('./_touchFile')
	let blank = require('./_blankLine')

	return new Promise(function(resolve, reject) {
		if(lockIt) {
			touch('./backstop_data/bitmaps_reference/LOCKED')
			blank()
			console.log('\nReference is now LOCKED...'.bgGray.white)

			resolve()
		}
		else {
			cmd.run('rimraf backstop_data/bitmaps_reference/LOCKED', function(data) {
				// console.log('', data)
				console.log('\nReference is now UNLOCKED...'.bgGray.white)

				resolve()
			})
		}
	})
}


// *************
// ** Exports **
// *************
module.exports = lockReference
