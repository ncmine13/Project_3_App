console.log("hooked up")

var children = $('.week').children();
var days = $('.week').find("input")
console.log(days)

//what if theyre lying????
var today = new Date();
var toDay = today.getDay();

//adding a class "today" if today is the day on the week calendar
var newDays = [];
for(i=0; i<days.length; i++) {
	var parsedDays = parseInt(days[i].value)
	if (parsedDays === toDay) {
		console.log(days[i].value)
		console.log("yes")
		var thisDay = $(days[i]).prev()
		$(thisDay).addClass("today")
	}
	else console.log("no")
}
