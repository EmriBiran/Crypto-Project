function myMove() {
  var elem = document.getElementById("animate"); 
  var elem2 = document.getElementById("animate"); 
  var pos = 0;
  var pos2 = -1800;
  var id = setInterval(frame, 5);
  function frame() {
    if (pos == 1800 || pos2 == 0) {
      clearInterval(id);
	  myMove();
    } 
	else {
      pos++; 
	  pos2++; 
      elem.style.left = pos + "px";
      elem2.style.left = pos2 + "px"; 
    }
  }
}