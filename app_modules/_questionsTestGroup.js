// --------------------------------
// - setup "Test Group" questions -
// --------------------------------

let intersection = require('mout/array/intersection')
let xor = require('mout/array/xor')
let forEach = require('mout/array/forEach')
let sort = require('mout/array/sort')
let getTestGroups = require('./_getTestGroups')
let fuzzy = require('fuzzy')

let questionsTestGroup = function(matchArr, matchPrefix, onlyShowMatch) {
	return new Promise(function(resolve, reject) {
		let testGroupFileNames = ['<<-- Back --']

		getTestGroups()
			.then(function(testGroups) {
				if(matchArr.length > 0) {
					if(!onlyShowMatch) {
						let arrCommon = intersection(testGroups, matchArr)
						let arrPrefixed = []
						let arrUnique = xor(testGroups, matchArr)

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

				let questionsTestGroup = [
					{
						type: 'autocomplete',
						name: 'testGroup',
						message: 'Select a Test Group:',
						source: function(answerTestGroup, input) {
							input = input || ''
							return new Promise(function(resolve) {
								setTimeout(function() {
									let fuzzyResult = fuzzy.filter(input, testGroupFileNames)
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
