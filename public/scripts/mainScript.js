		// defines
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
		
		// Instegram connection
		function loadInstegram(){
			window.open('https://www.instagram.com/p/BsxuZZJAu6s/', '_blank');
		}
		
		// Facebook connection
		function loadFacebook(){
			window.open('https://www.facebook.com/emri.biran', '_blank');
		}

		// /* Information container */
		function ReadMore() {
			var dots = document.getElementById("dots");
			var moreText = document.getElementById("more");
			var btnText = document.getElementById("myBtn");
			
			if (dots.style.display === "none") {	// read mode
				dots.style.display = "inline";
				btnText.innerHTML = "Read more"; 
				moreText.style.display = "none";
			} 
			else {									// read less
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

		// Table for Coins balance
		function loadCoinsTable() 
		{
			var img;
			var xhttp = new XMLHttpRequest();
			var userPK = document.getElementById('PublicKey').value;
			var worngInput = false;
			// validate PK length
			if(userPK.length == NOINPUT)
				return;		// do not react to no input
			else if( userPK.length < SHORTPK )
			{
				alert("Input Is Too Short");
				return;
			}
			else if( userPK.length > LONGPK )
			{
				 alert("Input Is Too Long");
				 return;
			}
			// looking for char mistakes in input
			for (i = 0; i < userPK.length; i++){ 	
				if( (userPK.charCodeAt(i) < LOWASCILTRS) || (userPK.charCodeAt(i) > HIGHASCILTRS) ||
				 ( (userPK.charCodeAt(i) > MIDASCILTRS1) && (userPK.charCodeAt(i) < MIDASCILTRS2) )){
					worngInput = true;
					break;
				}
			}
			if( worngInput ) 
			{
				alert("Invalid Input");
				return;
			}
			else{
				// if PK is ok activate waiting bar
				document.getElementById('show').style.visibility='visible';
				try{
					xhttp.onreadystatechange = function()
					{
						if(this.readyState == READYRSTTCTR && this.status == CONNECTSTATE)
							window.setTimeout(() => { 
								buildTable(this);										   // coins table builder
								document.getElementById('show').style.visibility='hidden'; // make watinig ber hide
							}, 2000);													   // create an active wait					
					};
					retVar = xhttp.open("POST", "/balances.xml", true);	// xml connector
					xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					xhttp.send("public_key=" + userPK);														  // send xml to FrontEnd
				}
				catch(err){
					alert("Sorry We Could Not Find Your Balance");						  // there is no such PK
				}
			}		
		}


		// build dynamic table
		function buildTable(xml) {
			var i;
			var xmlDoc = xml.responseXML;					// conact to XML file with coin data
			var table;
			var coin = xmlDoc.getElementsByTagName("COIN");	// pull data from "COIN" section
			//var len = coin.length;
			var len = SUPPORTEDCOINS;						// number of supported coins
			
			// build table
			 table +="<tr>";
			 try{ 
				 // this will raise a error only if the xml file is not complete means the DB returned empty
			 	for (i = 0; i <len; i++) { 
					table += "<th><center>" + coin[i].getElementsByTagName("CoinName")[0].childNodes[0].nodeValue + "</center></th>";
				 }
			}
			catch(err)
			{
				document.getElementById('show').style.visibility='hidden';
				alert("Sorry We Could Not Find Your Address");
				return;
			}
			table += "</tr>";
			table += "<tr>";
			
			// fetch coins value
			for (i = 0; i <len; i++) { 
				try
				{
					table += "<td><center>" + coin[i].className + coin[i].getElementsByTagName("CoinBalance")[0].childNodes[0].nodeValue + "</center></td>";
				}
				catch(err)
				{
					table += "<td><center>"+ "" +"</center></td>"; // if it is a empty field
				}
			}
			table += "</tr>";
			document.getElementById("CoinsTable").innerHTML = table;		// send back table to FrontEnd
		}
		

		// /* contact us box */
		function MailSpread(){
			var MailNewList = document.getElementById('MailNL').value; // fetch user input
			var Shtrodel = false;
			var Dot = false ;

			for (i = 0; i < MailNewList.length; i++){		// validate mail input char's
				if( SHTRODEL == MailNewList.charCodeAt(i) )
					Shtrodel = true;
				if( DOT == MailNewList.charCodeAt(i) )
					Dot = true;
			}
			if(MailNewList.length == 0);	// validate mail input length
			else if( MailNewList.length < SHORTMAIL || MailNewList.length > LONGMAIL )  alert("Invalid Input");
			else if( !Shtrodel || !Dot )  								  				alert("Please enter a valid email address");
			else														   				alert("Congratulations Email Addres Added To Mail Spread!");
			// we can add authintication from database
		}

		
	
