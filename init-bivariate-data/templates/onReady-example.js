module.exports = function (chromy, scenario, vp) {
	console.log("onReady-_____name_____.js is running for: ", vp.label)

	// // chrome script here to interact with page
	// // docs here => https://github.com/OnetapInc/chromy
	// return chromy
		// .goto("http://mypage.com/login")
		// .wait("input#username")
		// .type("input#username", "user")
		// .type("input#password", "somepassword")
		// .click("button#loginButton", {waitLoadEvent: true})
		// 	.evaluate(function() {
		// 		console.log("This custom script is running inside your web app!")
		// 		document.querySelector(".some-button").click()
		// 	})
}
