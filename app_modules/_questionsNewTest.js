// ----------------------------------
// - setup "New Test" name question -
// ----------------------------------

var questionsNewTest = [
	{
		type: 'input',
		name: 'newTestName',
		message: 'Give your New Test a Name (ex: search-form--filled-in):'
	},
	{
		type: 'input',
		name: 'newTestLabel',
		message: 'Provide a Label for your test that will be displayed in test reports [default is your Test Name]:'
	},
	{
		type: 'input',
		name: 'newTestDirectory',
		message: 'Provide a sub-directroy for this test to be created in [default is none and will be placed in the root] (ex: search/form):'
	},
	{
		type: 'input',
		name: 'newTestRoute',
		message: 'What Route is this test for?  (ex: search/search-form):'
	},
	{
		type: 'input',
		name: 'newTestSelectors',
		message: 'Provide a comma seperate list of string as selectors for different screen shots [defailt if none provided will be "document" (ex: "document", ".search-form", "#someId"):'
	},
	{
		type: 'input',
		name: 'newTestDelay',
		message: 'Delay in milliseconds before capture (default is 300):'
	}
];


// *************
// ** Exports **
// *************
module.exports = questionsNewTest;
