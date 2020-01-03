// ----------------------------------
// - setup "New Test" name question -
// ----------------------------------

let questionsNewTest = [
	{
		type: 'input',
		name: 'newTestName',
		message: '\n--------\n- NAME -\n--------\n Give your New Test a Name (ex: search-form--filled-in):\n'
	},
	{
		type: 'input',
		name: 'newTestLabel',
		message: '\n---------\n- LABEL -\n---------\n Provide a Label for your test that will be displayed\n in test reports [default is your Test Name]:\n'
	},
	{
		type: 'input',
		name: 'newTestDirectory',
		message: '\n-------------\n- DIRECTORY -\n-------------\n Provide a sub-directory for this test to be created in\n [if you don\'t provide a value it will be placed in the root]\n (ex: search/form):\n'
	},
	{
		type: 'input',
		name: 'newTestRoute',
		message: '\n---------\n- ROUTE -\n---------\n What Route is this test for? do not start with a "/"\n  (ex: search/search-form):\n'
	},
	{
		type: 'input',
		name: 'newTestSelectors',
		message: '\n-------------\n- SELECTORS -\n-------------\n Provide a comma separate list of string as selectors for\n different screen shots [default if none provided\n will be "document"]\n Each selector must be in quotes!\n (ex: "document", ".search-form", "#someId"):\n'
	},
	{
		type: 'input',
		name: 'newTestOnBeforeScript',
		message: '\n--------------------\n- ON BEFORE SCRIPT? -\n--------------------\n Create an "onBefore" script file? y\\N:\n'
	},
	{
		type: 'input',
		name: 'newTestOnReadyScript',
		message: '\n--------------------\n- ON READY SCRIPT? -\n--------------------\n Create an "onReady" script file? y\\N:\n'
	},
	{
		type: 'input',
		name: 'newTestReadySelector',
		message: '\n------------------\n- READY SELECTOR -\n------------------\n Provide an optional Selector to wait for before\n allowing test to continue:\n'
	},
	{
		type: 'input',
		name: 'newTestDelay',
		message: '\n---------\n- DELAY -\n---------\n Delay in milliseconds before capture [default is 300]:\n'
	},
	{
		type: 'input',
		name: 'newTestCustomViewportObject',
		message: '\n---------\n- CUSTOM VIEWPORT -\n---------\n Create a custom "viewports" object for this test? y\\N:\n'
	}
]


// *************
// ** Exports **
// *************
module.exports = questionsNewTest
