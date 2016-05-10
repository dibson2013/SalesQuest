/* Here's the things that this item needs to do:
- Store account information email and password
- Store the number of dials per day
- Calculate and display the number of dials per week
- Store the number of leads and closes
- A nifty logo
- A graph of statistics of dials per week, leads generated per week, accounts closed per week and sales per week
- Go specific in Campaign - Right now there is a smartphone campaign  */



var now = new Date().getHours();

// Check for week_dials and update
if (localStorage.getItem("week_dials") === null) {
	localStorage.setItem("week_dials", 0);
} else {
	$(".counter").text(localStorage.getItem("week_dials"))
}

//Timer hits every hour and runs check if its after 6
//If it is, run checkout, if not send timed popup with calls remaining to 50
//var myVar = setInterval(function(){ myTimer() }, 3000);

/* function myTimer() {
    var d = new Date();
    var t = d.toLocaleString();
    document.getElementById("demo").innerHTML = t;
} */

//Checkout code - add day_dials to week_dials and reset day_dials to 0
function checkout(day_dials, week_dials) {
	current_week_dials = parseInt(localStorage.getItem("week_dials")) + parseInt(x);
	localStorage.setItem("week_dials", current_week_dials);
	$(".counter").html(localStorage.getItem("week_dials"));
}

// adjust progress bar to current dials
function changeWidth(x) {
	y = x * 2
	$("#num-prog").width(y + '%');
	if (y >= 100) {
		$(".complete").show()
	} else {
		$(".complete").fadeOut(1000)
	}
	localStorage.setItem("day_dials", x)
}

//if numbers are entered  or plus or minus is clicked update progress bar
$("#numbers").focusout(function() {
	var x = $("#numbers").val();
	changeWidth(x);
})

$(".plus").click(function() {
	x = $("#numbers").val();
	x++
	$("#numbers").val(x);
	changeWidth(x);		
})

$(".minus").click(function() {
	x = $("#numbers").val();
	x--
	$("#numbers").val(x);
	changeWidth(x);
})

//If checkout is clicked, update week_dials scoreboard
$(".co").click(function() {	
	x = $("#numbers").val();
	if (x === "") {
		return;
	}
	current_week_dials = parseInt(localStorage.getItem("week_dials")) + parseInt(x);	
	localStorage.setItem("week_dials", current_week_dials);
	$(".counter").html(localStorage.getItem("week_dials"));
	$("#numbers").val(0);
	changeWidth(0);
})

//If reset is clicked, reset week_dials to 0
$(".reset").click(function() {	
	localStorage.setItem("week_dials", 0);
	$(".counter").html(localStorage.getItem("week_dials"));
})

$(document).ready()

// if Save text is clicked, save written text to localstorage and save by timestamp
$(".save-text-button").click(function() {
	var text = $(".expanding").val();
	localStorage.setItem(new Date().toLocaleString(), text)
	var exportItem = "<div></div>"
	var savedText = ("<div class=\"export-list\"><li>" + new Date().toLocaleString() + "</li>" + "<a href=\"#\"><button type=\"button\" class=\"btn btn-main export-text-button\">Export</button></div><a>")
	$(".saved-text").append(savedText)
})

$(".export-current-text-button").click(function() {
	var textToWrite = $(".expanding").val();
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileName = "writing_for_" + new Date().toLocaleString();
	var downloadLink = document.createElement("a");
	downloadLink.download = fileName;
	downloadLink.innerHTML = "Download File"
	if (window.URL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
	
})


$("body").on('click', ".export-text-button", function(){
		var entryRef = $(this).parent().prev().text()
    var textToWrite = localStorage.getItem(entryRef);		
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});		
    var fileName = "writing_for_" + entryRef + ".txt";
		console.log(fileName + " ready for download. Contents: " + textToWrite)
		var downloadLink = document.createElement("a");
		downloadLink.download = fileName;
		downloadLink.innerHTML = "Download File"
		if (window.URL != null)
		{
			// Chrome allows the link to be clicked
			// without actually adding it to the DOM.
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		}
		else
		{
			// Firefox requires the link to be added to the DOM
			// before it can be clicked.
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
			downloadLink.onclick = destroyClickedElement;
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
		}

		downloadLink.click();
})
