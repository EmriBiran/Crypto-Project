		const LOWASCILTRS   = 48;
		const HIGHASCILTRS  = 122;
		const MIDASCILTRS1  = 57;
		const MIDASCILTRS2  = 65;
		const DOT 		   = 46;
		const SHTRODEL 	   = 64;
		const SHORTPK      = 26;
		const LONGPK       = 35;
		const SHORTMAIL    = 20;
		const LONGMAIL     = 50;
		const READYRSTTCTR = 4;
		const CONNECTSTATE = 200;
		const NOINPUT      = 0;
		const SUPPORTEDCOINS = 3;
		
		document.getElementsByClassName("tablink")[0].click();
		
		function loadInstegram(){
			window.open('https://www.instagram.com/p/Bx7NWW-guoK/', '_blank');
		}
		
		function loadFacebook(){
			window.open('https://www.facebook.com/emri.biran', '_blank');
		}

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
		








		function button2(){
			document.getElementById('show').style.visibility='hidden';
		}
		function button(){
			document.getElementById('show').style.visibility='visible';
		}

		function loadCoinsTable() 
		{
			var img;
			var xhttp = new XMLHttpRequest();
			var userPK = document.getElementById('PublicKey').value;
			var worngInput = false;
			for (i = 0; i < userPK.length; i++){
				if( (userPK.charCodeAt(i) < LOWASCILTRS) || (userPK.charCodeAt(i) > HIGHASCILTRS) ||
				 ( (userPK.charCodeAt(i) > MIDASCILTRS1) && (userPK.charCodeAt(i) < MIDASCILTRS2) )){
					worngInput = true;
					// alert("you enterd: " + userPK[i]);
					break;
				}
			}
			if(userPK.length == NOINPUT);			// do not react
			else if( userPK.length < SHORTPK )	alert("Input Is Too Short");
			else if( userPK.length > LONGPK ) 	alert("Input Is Too Long");
			else if( worngInput )  				alert("Invalid Input");
			else{
				document.getElementById('show').style.visibility='visible';
				try{
					xhttp.onreadystatechange = function()
					{
						if(this.readyState == READYRSTTCTR && this.status == CONNECTSTATE)
							window.setTimeout(() => { 
								// loader.className += " hidden" ;
								buildTable(this);
								document.getElementById('show').style.visibility='hidden';
							}, 2000);						
					};
					retVar = xhttp.open("GET", "/EXMPLExml.xml", true);
					xhttp.send();
				}
				catch(err){
					alert("Sorry We Could Not Find Your Balance");
				}
			}		
		}

		function buildTable(xml) {
			var i;
			var xmlDoc = xml.responseXML;
			var table;
			var coin = xmlDoc.getElementsByTagName("COIN");
			//var len = coin.length;
			var len = SUPPORTEDCOINS;
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
		}
		
		function MailSpread(){
			var MailNewList = document.getElementById('MailNL').value;
			var Shtrodel = false;
			var Dot = false ;

			for (i = 0; i < MailNewList.length; i++){
				if( SHTRODEL == MailNewList.charCodeAt(i) )
					Shtrodel = true;
				if( DOT == MailNewList.charCodeAt(i) )
					Dot = true;
			}
			if(MailNewList.length == 0);
			else if( MailNewList.length < SHORTMAIL || MailNewList.length > LONGMAIL )  alert("Invalid Input");
			else if( !Shtrodel || !Dot )  								  				alert("Please enter a valid email address");
			else														   				alert("Congratulations Email Addres Added To Mail Spread!");
			// we can add authintication from database
		}

		
	
