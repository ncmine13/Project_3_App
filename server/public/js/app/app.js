console.log("hooked up")

//logic to determine what the date is at the time of login, check in button will only appear if the there hasn't already been a post request. counter on the login button? Or generate box check after finishing post request? Definitely linked to post request. After post, turn the text on the
var days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]
$('.test').click(function(event){
	console.log("clicked")
	var date = new Date();
	var stringDate = date.toString()
	var sliced = stringDate.slice(0,3)
	console.log(typeof(sliced))
	console.log(sliced);

	return sliced;
})
//1 hour = 3.6e+6 milliseconds

//possibility: hidden input
//postwassent: true . if post was sent, hide check in button
