var cls = console.reset = function () {
	return process.stdout.write('\033c')
}

module.exports = cls
