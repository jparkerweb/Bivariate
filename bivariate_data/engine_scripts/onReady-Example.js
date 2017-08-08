module.exports = function (chromy, scenario, vp) {
	console.log('onReady-Example.js is running for: ', vp.label);

	const testData = require('./data/test-data.json');
	
	return chromy
		.evaluate(`_testData = '" " + ${testData.sometext}'`)
		.evaluate(function() {
			console.log('This custom script is running inside your web app!');
			document.querySelectorAll(".container > p")[3].append(_testData);
		});
};
