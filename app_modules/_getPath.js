// ---------------------
// - resolve file path -
// ---------------------

var path = require('path')

var getPath = function(localPath) {
	var fullPath = path.join(process.cwd(), localPath)
	return(fullPath)
}


// *************
// ** Exports **
// *************
module.exports = getPath
