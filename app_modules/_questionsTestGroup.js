// --------------------------------
// - setup "Test Group" questions -
// --------------------------------

var intersection = require('mout/array/intersection');
var xor = require('mout/array/xor');
var forEach = require('mout/array/forEach');
var sort = require('mout/array/sort');
var getTestGroups = require('./_getTestGroups');

var questionsTestGroup = function(matchArr, matchPrefix, onlyShowMatch) {
    return new Promise(function(resolve, reject) {
        var testGroupFileNames = ['<<-- Back --'];

        getTestGroups()
            .then(function(testGroups) {
                if(matchArr.length > 0) {
                    if(!onlyShowMatch) {
                        var arrCommon = intersection(testGroups, matchArr);
                        var arrPrefixed = [];
                        var arrUnique = xor(testGroups, matchArr);

                        forEach(arrCommon, function(val){
                            arrPrefixed.push(matchPrefix + val);
                        });

                        arrUnique = sort(arrUnique);
                        arrPrefixed = sort(arrPrefixed);
                        testGroups = arrUnique.concat(arrPrefixed);

                    }
                    else {
                        testGroups = intersection(testGroups, matchArr);
                        testGroups = sort(testGroups);
                    }
                }

                testGroupFileNames = testGroupFileNames.concat(testGroups);

                var questionsTestGroup = [
                    {
                        type: 'list',
                        name: 'testGroup',
                        message: 'Select a Test Group:',
                        choices: testGroupFileNames
                    }
                ];

                resolve([questionsTestGroup, matchPrefix]);
            });
    });
};


// *************
// ** Exports **
// *************
module.exports = questionsTestGroup;
