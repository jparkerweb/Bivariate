// -----------------------------------------------------------------------------
// -- Bivariate Bookmarklet (Class List grabber / Puppeteer script generator) --
// -----------------------------------------------------------------------------

let toolboxStyle = `
.toolbox-target-outline { outline: 2px dashed hotpink; }
.toolbox-markup * { box-sizing: border-box; }
.toolbox-markup {
	position: fixed;
	top: 5px;
	width: 500px;
	height: 650px;
	border: 1px solid #888;
	color: #333;
	background: #efefef;
	border-radius: 4px;
	padding: 10px;
	text-align: left;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	opacity: .875;
	font-family:
		"SFMono-Regular",
		Consolas,
		"Liberation Mono",
		Menlo,
		Courier,
		monospace;
}		
.toolbox-markup--left {
	left: 5px;
}
.toolbox-markup--right {
	right: 5px;
}

.toolbox-markup button {
	padding: 2px 10px;
	text-transform: uppercase;
	border: 1px solid #777;
	margin-bottom: 6px;
	margin-right: 5px;
}

.toolbox-markup__message {
	margin-left: auto;
	color: maroon;
}

.toolbox-markup__class-list {
	flex: 1;
	overflow-y: auto;
	border: 1px solid #777;
	border-radius: 4px;
	background: #ffe;
	padding: 5px;
	width: 100%;
	margin-bottom: 10px;
}

.toolbox-markup__class-list__item {
	margin: 5px 0;
	padding: 5px;
	border-bottom: 1px solid #ddd;
	cursor: pointer;
}
.toolbox-markup__class-list__item--selected {
	outline: 2px solid #333;
}

.toolbox-markup__commands {
	flex: 1;
	overflow-y: auto;
	overflow-x: auto;
	border: 1px solid #777;
	border-radius: 4px;
	background: #000;
	color: lightgreen;
	opacity: .9;
	padding: 5px;
	width: 100%;
	margin-bottom: 10px;
	white-space: nowrap;
}
`
let documentHead = document.head || document.getElementsByTagName('head')[0]
let newStyle = document.createElement('style')
documentHead.appendChild(newStyle)
newStyle.type = 'text/css'
newStyle.appendChild(document.createTextNode(toolboxStyle))

let toolboxMarkupClassListInstructions = "Hover over an element in the page and press the 'b' key to add its class list here.  Once added you can click on it in this list to copy it to your clipboard.  After a class list item is selected you can additionally click a command button below to add the command to the command list builder.<br><br>The command list can be copied by clicking the copy button on the bottom, to be used in external puppeteer scripts."

let toolboxMarkup = `
<div class='toolbox-markup toolbox-markup--right'>
	<div style="display: flex;">
		<button type='button' class="toolbox-markup__move" onClick='toolboxMove("left")'>&lt;</button>
		<button type='button' class="toolbox-markup__move" onClick='toolboxMove("right")'>&gt;</button>
		<button type='button' class="toolbox-markup__button" onClick='toolboxClearClassList()'>clear</button>
		<span class="toolbox-markup__message -message-top"><span>
	</div>
	<div class="toolbox-markup__class-list">` + toolboxMarkupClassListInstructions + `</div>
	<div style="display: flex; flex-wrap: wrap;">
		<button type='button' class="toolbox-markup__command-button" onClick='toolboxCommand("waitForSelector")'>waitForSelector('.selector')</button>
		<button type='button' class="toolbox-markup__command-button" onClick='toolboxCommand("hover")'>hover('.selector')</button>
		<button type='button' class="toolbox-markup__command-button" onClick='toolboxCommand("click")'>click('.selector')</button>
		<button type='button' class="toolbox-markup__command-button" onClick='toolboxCommand("focus")'>focus('.selector')</button>
		<button type='button' class="toolbox-markup__command-button" onClick='toolboxCommand("type")'>type('.selector', 'some text')</button>
		<button type='button' class="toolbox-markup__command-button" onClick='toolboxCommand("waitFor")'>waitFor(300)</button>
	</div>
	<div class="toolbox-markup__divider"></div>
	<div class="toolbox-markup__commands"></div>
	<div style="display: flex;">
		<button type='button' class="toolbox-markup__button" onClick="toolboxCopyCommands()">copy</button>
		<button type='button' class="toolbox-markup__button" onClick="toolboxClearCommands()">clear</button>
		<span class="toolbox-markup__message -message-bottom"><span>
	</div>
</div>`
document.body.innerHTML = document.body.innerHTML + toolboxMarkup
	
let toolboxLastBivariateElementClassList = null
let toolbox = document.querySelector(".toolbox-markup")
let toolboxClassList = document.querySelector(".toolbox-markup__class-list")
let toolboxClassListItemId = 0
let toolboxClassListItemSelected = ""

document.body.addEventListener("keydown", event => {
event = event || window.event
toolboxClassListItemId++

if (event.code === 'KeyB' && !toolboxLastBivariateElementClassList.includes('toolbox-markup') && toolboxLastBivariateElementClassList !== "") {
	if (toolboxClassList.innerHTML === toolboxMarkupClassListInstructions) { toolboxClassList.innerHTML = "" }

	toolboxClassList.innerHTML += "<div class='toolbox-markup__class-list__item' onClick='toolboxSelectClassListItem(\"toolboxItem" + toolboxClassListItemId + "\", \"" + toolboxLastBivariateElementClassList + "\")' id='toolboxItem" + toolboxClassListItemId + "'>" + toolboxLastBivariateElementClassList + "</div>"
	toolboxClassList.scrollTop = toolboxClassList.scrollHeight
}
})

document.body.addEventListener("mouseover", event => {
event = event || window.event
let targetElm = event.target || event.srcElement

if (targetElm.classList) {
	toolboxLastBivariateElementClassList = targetElm.classList.value.replace(/ /g, ".")
	if (toolboxLastBivariateElementClassList !== "") { toolboxLastBivariateElementClassList = "." + toolboxLastBivariateElementClassList }

	if (targetElm.classList.value !== "" && !targetElm.classList.value.includes('toolbox-markup')) {
		targetElm.classList.add("toolbox-target-outline")
		setTimeout(function(){ 
			targetElm.classList.remove("toolbox-target-outline")
		}, 350)
	}
}
}, false)

function toolboxMove(direction) {
if (direction === 'left') {
	toolbox.classList.add('toolbox-markup--left')
	toolbox.classList.remove('toolbox-markup--right')
} else {
	toolbox.classList.add('toolbox-markup--right')
	toolbox.classList.remove('toolbox-markup--left')
}
}

function toolboxClearClassList() {
let classListItems = document.querySelector(".toolbox-markup__class-list")
	classListItems.innerHTML = toolboxMarkupClassListInstructions

toolboxClassListItemSelected = ""
}

function toolboxSelectClassListItem(classListItemId, classListItemStr) {
let currentlySelected = document.querySelector(".toolbox-markup__class-list__item--selected")
if (currentlySelected) {currentlySelected.classList.remove("toolbox-markup__class-list__item--selected") }

let toBeSelected = document.querySelector("#" + classListItemId)
if (toBeSelected) { toBeSelected.classList.add("toolbox-markup__class-list__item--selected") }

toolboxClassListItemSelected = classListItemStr
toolboxCopyStringToClipboard(classListItemStr)

let toolboxMessageTop = document.querySelector(".toolbox-markup__message.-message-top")
	toolboxMessageTop.innerHTML = "item class copied to clipboard"

	window.setTimeout(function(){
		toolboxMessageTop.innerHTML = ""
	}, 1500)
}

function toolboxCommand(command) {
let newCommand = "await page." + command
if (command === 'waitFor') {
	newCommand += "(300)"
} else if (command === 'type') {
	newCommand += "(\"" + toolboxClassListItemSelected + "\", \"some text\", {delay: 20})"
}
else {
	newCommand += "(\"" + toolboxClassListItemSelected + "\")"
}

let commandList = document.querySelector(".toolbox-markup__commands")
	if (commandList.innerHTML.length > 0) { commandList.innerHTML += "<br>" }
	commandList.innerHTML += newCommand
	commandList.scrollTop = commandList.scrollHeight
}

function toolboxCopyCommands() {
let commandList = document.querySelector(".toolbox-markup__commands")
toolboxCopyStringToClipboard(commandList.innerText)

let toolboxMessageBottom = document.querySelector(".toolbox-markup__message.-message-bottom")
	toolboxMessageBottom.innerHTML = "command copied to clipboard"

	window.setTimeout(function(){
		toolboxMessageBottom.innerHTML = ""
	}, 1500)
}

function toolboxClearCommands() {
let commandList = document.querySelector(".toolbox-markup__commands")
	commandList.innerHTML = ""
}

function toolboxCopyStringToClipboard(str) {
let el = document.createElement('textarea')
el.value = str
el.setAttribute('readonly', '')
el.style.position = 'absolute'
el.style.left = '-9999px'
document.body.appendChild(el)
el.select()
document.execCommand('copy')
document.body.removeChild(el)
}
