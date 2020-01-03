// ---------------------
// - resolve file path -
// ---------------------

let path = require('path')

let getPath = function(localPath) {
	let fullPath = path.join(process.cwd(), localPath)
	return(fullPath)
}


// *************
// ** Exports **
// *************
module.exports = getPath
