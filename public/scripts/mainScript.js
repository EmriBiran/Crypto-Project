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
		
		function loadCoinsTable() 
		{
			var xhttp = new XMLHttpRequest();
			var userPK = document.getElementById('PublicKey').value;
			alert(userPK);		
			xhttp.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200)	{
					buildTable(this);
				}
			};
			xhttp.open("GET", "/EXMPLExml.xml", true);
			xhttp.send();
		}


		function buildTable(xml) {
			var i;
			var xmlDoc = xml.responseXML;
			var table="<tr>";
			var div = "<h1></h1>"
			var coin = xmlDoc.getElementsByTagName("COIN");
			var len = coin.length;
			for (i = 0; i <len; i++) { 
				table += "<th><center>" + coin[i].getElementsByTagName("CoinName")[0].childNodes[0].nodeValue + "</center></th>";
			}
			table += "</tr>";
			for (i = 0; i <len; i++) { 
				table += "<td><center>" + coin[i].className + coin[i].getElementsByTagName("CoinBalance")[0].childNodes[0].nodeValue + "</center></td>";
			}
			table += "</tr>";
			document.getElementById("CoinsTable").innerHTML = table;
			document.getElementById("CoinsTableBackground").innerHTML = div;
			
		}
		
		function validMail(){
			var frmvalidator  = new Validator("contactform");
			frmvalidator.addValidation("name","req","Please provide your name");
			frmvalidator.addValidation("email","req","Please provide your email");
			frmvalidator.addValidation("email","email", "Please enter a valid email address");
		}
		
		function loadInstegram(){
			window.open('https://www.instagram.com/', '_blank');
		}
		
		function loadFacebook(){
			window.open('https://www.facebook.com/emri.biran', '_blank');
		}
		
		function MailSpread(){
			var MailNL = document.getElementById('MailNL').value;
			
			alert(MailNL);		
		}
