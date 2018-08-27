# ![Bivariate](bivariate.png)

***An opinionated interface for writing, running, and saving BackstopJS tests***


## Goal
**Bivariate**'s goal is to allow for an approachable Visual Regression Testing suite that can be organized to accommodate small and large projects without overwhelming complexity.


![Bivariate App](./documentation/menu.gif)  

This goal is achieved by enforcing an opinionated grouping structure, providing a method to easily write tests via manageable object files, as well as allowing for all of BackstopJS's commands to be run from an interface.


## Installation
**Bivariate** runs in [Node](https://nodejs.org).

* Install [NodeJS](https://nodejs.org)

* Install the Latest version of Bivariate via NPM.  
It is *recommended* to install Bivariate *globaly*, but it can run locally if required:  
  
  global install (*recommended*):  
  `npm install bivariate -g`

  local install:  
  `npm install bivariate`

* Ensure you have version 59 or greater of [Chrome](https://www.google.com/chrome/browser/) installed.
  Bivariate utilizes headless Chrome which started shipping in Chrome v59

* From your project directory, run Bivariate:  
  if installed globally:  
  `bivariate`

  if only installed locally:  
  `npx bivariate`
  
* Generate `bivariate_data`:  
  If Bivariate doesn't detect any existing Bivarte tests it will ask you would like to generate the starting configuration files.  

  ![Bivariate App](./documentation/first-run.gif)  


## Folder Structure

*All tests, scripts, and configuration files are stored in the `bivariate_data` parent folder.*

`bivariate_data`  
|  
+---- `test_scripts` holds user defined configuration and tests used to instruct BackstopJS  
|  
+---- `engine_scripts` holds user defined Puppeteer scripts for interacting with the Chrome DOM before saving a screen shot  
|  
+---- `bitmaps_reference_archive` holds archived *references* that can be restored and tested against  


### test_scripts

Out of the box, BackstopJS gets all of its config and test data from a single JSON file, which isn't very maintainable over time.  Luckily, **Bivariate** takes advantage of Node's module system to break this all apart and just return what is needed (*a simple array of objects*).

##### Configuration files

All configuration files are prefixed with a double underscore: \_\_  

###### \_\_config-baseURLs.js
holds the *base* URLs for all References and Tests to be run.  
```js
...
  // do not use a trailing slash in the base URLs
  theURLS.baseURL = "http://your-base-url";
  theURLS.baseRefURL = "http://your-base-reference-url";
...
```

###### \_\_config-common.js  
set of *common* config values (rendering engine, ports, etc.) that shouldn't need to be adjusted in most cases.

###### \_\_config-viewports.js  
 configure any number of *viewports* to test against (this can include any number of defined screen resolutions).


##### Individual Tests  
All individual tests are prefixed with a single underscore: \_  

Use the example tests as a template to create your own.  Tests are easy to setup and for the most part only require you to fill out the value for a few variables:
* label
* route
* selectors

`_example-test--home.js` :

````js
// -------------------
// - test definition -
// -------------------

// * tests should be saved as: '_test-name.js'
//   if you have a lot of tests you can store
//   related tests in named subdirectories
//   for better organization

var label = 'Example Test - Home Page'; // test name
var route = '/index.html';              // the route for this test (start with a '/')
var selectors = [                       // selectors for elements to be "captured" (CSS selector syntax)
    "body",
    "h1",
    ".hero",
    ".nav",
    ".body-content"
];
var onBeforeScript = null;          // Runs before each scenario
                                    // -- use for setting cookies or other env state
                                    // (.js suffix is optional / looks for file in 'engine_scripts' dir)
var onReadyScript = null;           // Runs after onReady event on all scenarios
                                    // -- use for simulating interactions
                                    // (.js suffix is optional / looks for file in 'engine_scripts' dir)
var hideSelectors = [];             // hide elements from view by changing its "visibility" to "hidden"
var removeSelectors = [];           // remove elements from the DOM before screen capture



// -------------------------------------------------------------------
// - advanced options can be overwritten in the options object below -
// -------------------------------------------------------------------
module.exports = function(baseURLs) {
    var url = (baseURLs.baseURL + route);
    var referenceUrl = baseURLs.baseRefURL === null ? null : (baseURLs.baseRefURL + route);
    var options = {
        "label": label,
        "url": url,
        "referenceUrl": referenceUrl,
        "hideSelectors": hideSelectors,
        "removeSelectors": removeSelectors,
        "selectors": selectors,
        "readyEvent": null,
        "delay": 100,
        "misMatchThreshold" : 0.1,
        "onBeforeScript": onBeforeScript,
        "onReadyScript": onReadyScript
    };

    if(baseURLs.baseRefURL === null) {
        delete options.referenceUrl;
    }

    return options;
};

````

##### Test Groups  
Bivariate presents and runs tests using a grouping concept.  A `test group` is a collection of `tests` that are run together.  A test group is a .js file that does not start with any underscores.  

Use the provide file `example-test-group.js` as a template for your own.  Note that all that is required is to fill in the `Senarios` section to include which tests you want run.

`example-test-group.js` :

````js
// ----------------
// -- Test Group --
// ----------------

var mixIn = require("./../libs/mout-mixin/mixIn");
var testGroup = __filename.slice(__dirname.length + 1, -3);
var configCommon = require('./__config-common')(testGroup);
var baseURLs = require("./__config-baseURLs");


module.exports = mixIn(
    {
        // ---------------
        // -- Scenarios --
        // ---------------
        "scenarios": [
            require('./_example-site--home')(baseURLs),
            require('./_example-site--paints')(baseURLs)
        ],
    },
        configCommon
);
````



### engine_scripts

engine scripts are used to interact with your web pages using the `before` and `on ready` events.  Each test you create has an optional parameter of `onBeforeScript` & `onReadyScript`.  These can simply point to script files in the 'engine_scripts' directory.  The two example scripts found in the `engine_scripts` directory should be self explanitory (`onBefore-Example.js` & `onReady-Example.js`).  In addition you can refer to the [Puppeteer Docs](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) for more advanced examples.


### bitmaps_reference_archive
The `bitmaps_reference_archive` folder holds archived `references` which can be created, archived, and restored using the **Bivariate** app.


----

## App

Example run of the test scripts generated by Bivariate:  

![Bivariate App Example Run](./documentation/example-run.gif)  
  
  

For more info, reference `example-site` README for a walk through example of **Bivariate** in action.  
#### [Example Site Docs](./example-site/README.md)
