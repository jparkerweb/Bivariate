module.exports = function (chromy, scenario, vp) {
	console.log('onReady-_____name_____.js is running for: ', vp.label);
	
	return chromy
		.evaluate(function() {
			// page interactions here
			console.log('This custom script is running inside your web app!');
		});
};
