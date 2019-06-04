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
			var worngInput = false;
			for (i = 0; i < userPK.length; i++){
				if( (userPK.charCodeAt(i) < 48) || (userPK.charCodeAt(i) > 122) || ( (userPK.charCodeAt(i) > 57) && (userPK.charCodeAt(i) < 65) )){
					worngInput = true;
					//alert("you enterd: " + userPK[i]);
					break;
				}
			}
			if(userPK.length == 0);
			else if(userPK.length < 20 || userPK.length > 35 || worngInput)  alert("Invalid Input");
			else{
				try{
					xhttp.onreadystatechange = function()
					{
						if (this.readyState == 4 && this.status == 200)	{
							buildTable(this);
						}
					};
					xhttp.open("GET", "/EXMPLExml.xml", true);
					xhttp.send();
				}
				catch(err){
					alert("Sorry We Couldn't Find Your Balance");
				}
			}		
		
		}


		function buildTable(xml) {
			var i;
			var xmlDoc = xml.responseXML;
			var table;
			var div = "<h1></h1>";
			var coin = xmlDoc.getElementsByTagName("COIN");
			//var len = coin.length;
			var len = 3;
			table +="<tr><th><center>" + "BITCOIN" + "</center></th>";
			table +="<th><center>" + "BITCOIN CASH" + "</center></th>";
			table +="<th><center>" + "BITCOIN GOLD" + "</center></th></tr>";
			// table +="<tr>";
			// for (i = 0; i <len; i++) { 
			// 	table += "<th><center>" + coin[i].getElementsByTagName("CoinName")[0].childNodes[0].nodeValue + "</center></th>";
			// }
			// table += "</tr>";
			table += "<tr>";
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
			window.open('https://www.instagram.com/p/Bx7NWW-guoK/', '_blank');
		}
		
		function loadFacebook(){
			window.open('https://www.facebook.com/emri.biran', '_blank');
		}
		
		function MailSpread(){
			var MailNewList = document.getElementById('MailNL').value;
			var worngInput = true;

			for (i = 0; i < MailNewList.length; i++){
				if( MailNewList.charCodeAt(i) == 64 ){
					worngInput = false;
					alert("you enterd: " + MailNewList[i]);
					break;
				}
			}
			//alert(worngInput);		
		}
