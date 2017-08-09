// --------------------------
// - run BackstopJS command -
// --------------------------

var spawn = require('child_process').spawn;

var runBackstopCommand = function(backstopCommand, testGroup, testConfig) {
	return new Promise(function(resolve, reject) {
		var npmRunCmd = spawn(
			'npm.cmd',
			[
				'run',
				backstopCommand,
				'--',
				'--configPath=bivariate_data/test_scripts/' + testGroup + '.js'
			],
			{ cwd: './node_modules/backstopjs'}
		);

		if(testConfig.runcmdoutput) {
			// -- standard output --
			npmRunCmd.stdout.on('data', function (data) {
				console.log('' + data);
			});
	
			// -- error output --
			npmRunCmd.stderr.on('data', function (data) {
				console.log(('stderr: ' + data).bgRed.white);
			});

			// -- exit --
			npmRunCmd.on('exit', function (code) {
				console.log(('child process exited with code ' + code).bgBlue.white);
				resolve();
			});
		}
		else {
			// -- exit --
			npmRunCmd.on('exit', function (code) {
				resolve();
			});
		}

	});
};


// *************
// ** Exports **
// *************
module.exports = runBackstopCommand;
