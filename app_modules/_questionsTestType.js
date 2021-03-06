// -------------------------------
// - setup "Test Type" questions -
// -------------------------------
// TODO: Add back the following options
// {
// 	name: '- DELETE a Test Group from generated Tests',
// 	value: 'delete-testgroup-tests'
// },
// {
// 	name: '- DELETE a Test Group from generated References',
// 	value: 'delete-testgroup-reference'
// },

let questionsTestType = [
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
				name: '- APPROVE an existing Test',
				value: 'approve'
			},
			{
				name: '- Create REFERENCE',
				value: 'reference'
			},
			{
				name: '- Open REPORT for existing Test',
				value: 'open-report'
			},
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
				name: '',
				value: ''
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
				name: '',
				value: ''
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
				name: '- DELETE all Report data',
				value: 'delete-reports'
			},
			// {
			// 	name: '- DELETE ALL data (Test, Reference, Report)',
			// 	value: 'delete-all-data'
			// },
			{
				name: '',
				value: ''
			},
			{
				name: '- CREATE new blank Test file',
				value: 'create-new-test'
			},
			{
				name: '- CREATE new blank Test Group file',
				value: 'create-new-test-group'
			},
			{
				name: '- UPDATE/CREATE `-all-tests-` test group with all existing test files',
				value: 'update-all-test-group'
			},
			{
				name: '',
				value: ''
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
			return val
		}
	}
]


// *************
// ** Exports **
// *************
module.exports = questionsTestType
