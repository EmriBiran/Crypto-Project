<!DOCTYPE html>
<html>
<head>
	<title>Crypto Project</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<link rel="stylesheet" type="text/css" href="CSS/W3.css">
	<link rel="stylesheet" type="text/css" href="CSS/mystyle.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="scripts/mainScript.js"></script>
	<?php include 'PHPS/mainPHP.php';?>
<!--
	<style>
		body,h1,h2,h3,h4,h5,h6 {font-family: "Raleway", Arial, Helvetica, sans-serif}
		.myLink {display: none}
		#more {display: none;}
	</style>		-->
</head>

<body class = "w3-light-grey">
<!-- top Div -->
	<div class="w3-container ">
		<div class="w3-half w3-opacity w3-xlarge " >
			<b>Wolcome to Lior & Emri's Project</b>
		</div>
		<div class="w3-half w3-opacity w3-xlarge" align="right" >
			<b">Find Us On:</b>
			<i class="fa fa-linkedin w3-hover-opacity   "></i>
			<i class="fa fa-facebook-official w3-hover-opacity "></i>
		</div>
	</div>

<!-- Search and background picture -->
	<div class="w3-display-container w3-content w3-hide-small" style="max-width:100%;">
	<img class="w3-image" src="photos/bitRail_MainCover.jpg" width="100%" height="0%">
		<div class="w3-display-middle" style="width:65%; height:90%;">
			
			<div class="w3-bar w3-black">
				<button class="w3-bar-item w3-button tablink" onclick="openLink(event, 'SearchArea');"><i class="fa fa-money w3-margin-right"></i>_Find My Money</button>
			</div>
		
			<!-- Search Tab -->
			<div id="SearchArea" class="w3-container w3-white w3-padding-16 myLink" >
				<div class="w3-row-padding" >
					<div class="w3-half">
						<h3>Find your Forked Coins with us in seconds</h3>	  
					</div>
					<div class="w3-half">
						<div class="w3-threequarter">
							<h5></h5>
							<input class="w3-input w3-border EnterKeyDesign" type="text" placeholder="Enter Wallet Public Key"></input>	 
						</div>
						<div class="w3-quarter">
							<h5></h5>
							<button type="button" class="w3-button w3-red w3-padding " align="right">Search</button>
						</div>
					</div>
				</div>			
			</div>
			<div class="w3-container">	
				<h1>The XMLHttpRequest Object</h1>
				<button type="button" onclick="loadDoc()">Get my CD collection</button>
				<table id="demo"></table>
			</div>
	
		</div>
	</img>
	</div>
	
	<!-- Info Tab -->
	<div class="TopPic w3-container w3-padding-48" style="top:0%;">
			<p class="SetPosTxtInfo" > Dear BITCOIN user, we happy to have you in our website! here you can find coins that belongs to you and you didn't even know existing!<span id="dots">...</span>
			<span id="more" > Since August 2017 we are Witnessing many Hard Forks of the BITCOIN,
			users of the coin who purchased BITCOIN prior to those Forks are enjoying coins in the "new" fork in the amount of
			the regular BITCOIN.
			</span><button class="w3-button w3-dark-grey" onclick="ReadMore()" id="myBtn">Read more</button></p>
	</div>
	
	<div class="w3-container w3-padding-64">
	</div>
	
<!-- coins photo Container -->
	<div class="w3-container w3-padding-32 w3-black">
		<h1 align="center">We support finding the following coins </h1>		
		<div class="w3-row"><br>
			<table>
				<tr>
					<img src="photos/ABC.jpg" class="CoinsPic"></img>
				</tr>
				<tr>
					<img src="photos/UNITED.png" class="CoinsPic"></img>
				</tr>
				<tr>
					<img src="photos/GOD.png" class="CoinsPic"></img>
				</tr>
				<tr>
					<img src="photos/GOLD.png" class="CoinsPic"></img>
				</tr>
				<tr>
					<img src="photos/DIAMOND.png" class="CoinsPic"></img>
				</tr>
				<tr>
					<img src="photos/SUPER.png" class="CoinsPic"></img>
				</tr>
				<tr>
					<img src="photos/SV.png" class="CoinsPic"></img>
				</tr>
				<tr>
					<img src="photos/LIGHTNING.png" class="CoinsPic"></img>
				</tr>
			</table>
		</div>
	</div>
		
		<!-- Newsletter -->
		<div class="w3-container w3-padding-32 w3-panel w3-black w3-card">
				<h2 class="w3-threequarter ">Get the latest new's first - Join our Mail Spread!</h2>
				<input class="w3-input w3-border-0 w3-quarter w3-padding" type="text" placeholder="Your Email address">
				<b class="w3-threequarter">Dear user, we will let you know when there is a new fork and	whew we support finding new coins and more money for you.</b>
				<button type="button" class="w3-quarter w3-button w3-red w3-padding">Subscribe</button>
		</div>
		
		<!-- Contact -->
		<div class="w3-container">
			<div class="w3-quarter">
				<h3>Contact Us</h3>
				<i class="fa fa-map-marker" style="width:30px"></i> Tel Aviv, ISRAEL<br>
				<i class="fa fa-phone w3-border-0" style="width:30px"></i> Phone: +97250-9016004<br>
				<i class="fa fa-envelope w3-border-0" style="width:30px"> </i> Email: matangur117@gmail.com<br>
			</div>
			<div class="w3-threequarter ">
				<form name="contact_form" action="" method="post"> <!-- action="PHP/mainPHP.php"-->
				<p><input class="w3-input w3-border w3-padding w3-half" type="text" placeholder="Name" name="name"></p>
				<p><input class="w3-input w3-border w3-padding w3-half" type="text" placeholder="Email" name="email"></p>
				<p><input class="w3-input w3-padding-32 w3-border" type="text" placeholder="Message" name="message"></p>
				<!-- </span><button class="w3-button w3-dark-grey w3-black w3-padding w3-border-0" align="right" onclick="validMail()" id="myBtn">SEND MESSAGE</button></p> -->
				<input class="w3-button w3-black w3-padding w3-border-0" align="right" type="submit" name="submit" value="send email"/>
				</form>
				<?php
					if(isset$_POST{'submit'})
					{
						$name=$_POST['name'];
						$email=$_POST['email'];
						$message=$_POST['message'];
						$adminwebsite="liorraines@gmail.com";
						$headers="replay-to:$email";
						mail($adminwebsite,$name,$email,$message,$headers); 
					}
                ?>
			</div>
		</div>
		
		

		
<!-- End page content -->
	
	
	
	<script>

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
				table += "<tr><td>" +	x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +	"</td><td>" +
				x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +	"</td></tr>";
			}
			document.getElementById("demo").innerHTML = table;
		}

	</script>

</body>
</html>
