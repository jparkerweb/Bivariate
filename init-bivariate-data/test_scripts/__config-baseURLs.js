// --------------------------------------------------
// - Configuration for BASE URLs used for all Tests -
// --------------------------------------------------

module.exports = function(){
	var theURLS = {}

	// * note *
	// leave off the trailing slash on the baseURL and baseRefURL values

	// ------------------------------------------------
	// -- Base URL - base url used for running Tests --
	// ------------------------------------------------
	// theURLS.baseURL = "http://localhost:4444"
	theURLS.baseURL = "https://jparkerweb.github.io/Bivariate/changed"

	// ----------------------------------------------------------------
	// -- Base Reference URL - base url used for creating References --
	// ----------------------------------------------------------------
	// if you want the reference url to be the same as the
	// base url just assign a value of null.  Example:
	// theURLS.baseRefURL = null
	// theURLS.baseRefURL = "http://localhost:2222"
	theURLS.baseRefURL = "https://jparkerweb.github.io/Bivariate/unchanged"

	return(theURLS)
}()
