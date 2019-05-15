document.getElementsByClassName("tablink")[0].click();

function ReadMore() {
	var dots = document.getElementById("dots");
	var moreText = document.getElementById("more");
	var btnText = document.getElementById("myBtn");
	
	if (dots.style.display === "none") {
		dots.style.display = "inline";
		btnText.innerHTML = "Read more"; 
		moreText.style.display = "none";
	} else {
		dots.style.display = "none";
		btnText.innerHTML = "Read less"; 
		moreText.style.display = "inline";
	}
}
		
function openLink(evt, linkName) 
{
	var i, x, tablinks;
	x = document.getElementsByClassName("myLink");
	for (i = 0; i < x.length; i++) 
		x[i].style.display = "none";
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < x.length; i++) 
		tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
	document.getElementById(linkName).style.display = "block";
	evt.currentTarget.className += " w3-red";
}

function validMail(){
	var frmvalidator  = new Validator("contactform");
	frmvalidator.addValidation("name","req","Please provide your name");
	frmvalidator.addValidation("email","req","Please provide your email");
	frmvalidator.addValidation("email","email", "Please enter a valid email address");
}

function loadDoc() 
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			myFunction(this);
		}
	};
	xhttp.open("GET", "cd_catalog.xml", true);
	xhttp.send();
}

function myFunction(xml)
{
	var i;
	var xmlDoc = xml.responseXML;
	var table="<tr><th>Artist</th><th>Title</th></tr>";
	var x = xmlDoc.getElementsByTagName("CD");
	for (i = 0; i <x.length; i++) 
	{ 
		table += "<tr><td>" +
		x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
		"</td><td>" +
		x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
		"</td></tr>";
	}
	document.getElementById("demo").innerHTML = table;
}




