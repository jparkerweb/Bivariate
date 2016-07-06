// -------------------------------------------------
// -- update report name with selected test group --
// -------------------------------------------------

var updateReportName = function updateReportName(reportName) {
    var replace = require('replace');

    return new Promise(function(resolve, reject) {

        replace({
            regex: /(<div class="container"><h1>).*(<\/h1><\/div>)/,
            replacement: '$1' + reportName + ' - report$2',
            paths: ['./node_modules/backstopjs/compare/index.html'],
            recursive: false,
            silent: true,
        })
        .then(function(){
            console.log('\nReport Name Updated\n');
            resolve();
        });
    });
};



// *************
// ** Exports **
// *************
module.exports = updateReportName;
