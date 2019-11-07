// --------------------------------
// - setup "Test Group" questions -
// --------------------------------

var intersection = require('mout/array/intersection')
var xor = require('mout/array/xor')
var forEach = require('mout/array/forEach')
var sort = require('mout/array/sort')
var getTestGroups = require('./_getTestGroups')
var fuzzy = require('fuzzy')

var questionsTestGroup = function(matchArr, matchPrefix, onlyShowMatch) {
	return new Promise(function(resolve, reject) {
		var testGroupFileNames = ['<<-- Back --']

		getTestGroups()
			.then(function(testGroups) {
				if(matchArr.length > 0) {
					if(!onlyShowMatch) {
						var arrCommon = intersection(testGroups, matchArr)
						var arrPrefixed = []
						var arrUnique = xor(testGroups, matchArr)

						forEach(arrCommon, function(val) {
							arrPrefixed.push(matchPrefix + val)
						})

						arrUnique = sort(arrUnique)
						arrPrefixed = sort(arrPrefixed)
						testGroups = arrUnique.concat(arrPrefixed)

					}
					else {
						testGroups = intersection(testGroups, matchArr)
						testGroups = sort(testGroups)
					}
				}
				else if(onlyShowMatch) {
					testGroups = []
				}

				testGroupFileNames = testGroupFileNames.concat(testGroups)


				var questionsTestGroup = [
					{
						type: 'autocomplete',
						name: 'testGroup',
						message: 'Select a Test Group:',
						source: function(answerTestGroup, input) {
							input = input || ''
							return new Promise(function(resolve) {
								setTimeout(function() {
									var fuzzyResult = fuzzy.filter(input, testGroupFileNames)
									resolve(
										fuzzyResult.map(function(el) {
											return el.original
										})
									)
								}, 300)
							})
						}
					}
				]

				resolve([questionsTestGroup, matchPrefix])
			})
	})
}


// *************
// ** Exports **
// *************
module.exports = questionsTestGroup
