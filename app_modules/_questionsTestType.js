// -------------------------------
// - setup "Test Type" questions -
// -------------------------------
// TODO: Add back the following options
// {
// 	name: '- APPROVE most recent Test',
// 	value: 'approve'
// },
// {
// 	name: '- DELETE a Test Group from generated Tests',
// 	value: 'delete-testgroup-tests'
// },
// {
// 	name: '- DELETE a Test Group from generated References',
// 	value: 'delete-testgroup-reference'
// },

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
				name: '- LIST generated References',
				value: 'list-references'
			},
			{
				name: '- LIST generated Tests',
				value: 'list-tests'
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
