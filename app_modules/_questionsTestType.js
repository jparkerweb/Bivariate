// -------------------------------
// - setup "Test Type" questions -
// -------------------------------
var questionsTestType = [
	{
		type: 'list',
		name: 'testType',
		message: 'Welcome to Bivariate.\n  Please Choose an action.',
		choices: [
			{
				name: '',
				value: ''
			},
			{
				name: '- LIST generated References',
				value: 'list-references'
			},
			{
				name: '- LIST generated Tests',
				value: 'list-tests'
			},
			{
				name: '- Run TEST on Reference',
				value: 'test'
			},
			{
				name: '- Create REFERENCE',
				value: 'reference'
			},
			{
				name: '- Open REPORT for existing Test',
				value: 'openReport'
			},
			{
				name: '- BLESS existing Reference',
				value: 'bless'
			},
			{
				name: '- ARCHIVE current Reference',
				value: 'archive-reference'
			},
			{
				name: '- RESTORE Archived Reference',
				value: 'restore-reference'
			},
			{
				name: '- LOCK current Reference',
				value: 'lock-reference'
			},
			{
				name: '- UNLOCK current Reference',
				value: 'unlock-reference'
			},
			{
				name: '- DELETE a Test Group from generated Tests',
				value: 'delete-testgroup-tests'
			},
			{
				name: '- DELETE a Test Group from generated References',
				value: 'delete-testgroup-reference'
			},
			{
				name: '- DELETE all Test data',
				value: 'delete-tests'
			},
			{
				name: '- DELETE all Reference data',
				value: 'delete-reference'
			},
			{
				name: '- [-- EXIT --]',
				value: ''
			},
			{
				name: '',
				value: ''
			}
		],
		filter: function (val) {
			return val;
		}
	}
];


// *************
// ** Exports **
// *************
module.exports = questionsTestType;
