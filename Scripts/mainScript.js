/*function createTable(var rows = 5 ){
	var table = '';
	var cols = 3;
	for(var r = 0; r < rows; r++){
		table += '<tr>';
		for(var c = 1; c <= cols; c++){
			table += '<td>' + c+ '</td>';
		}
		table += '</tr>';
	}
	document.write('<table>' + table + '</table>');
}*/

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




