<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JASPER Controller</title>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script>
var run = function(v){
	v = encodeURI(v);
	var u = "/exec.php?cmd=" + v;
	$.ajax({
        type: "GET",
        url: u,
		success: function (a, b, c) {},
        error: function (errorMessage) {}
    });
}
var forward = function(){
	run("python /srv/http/motor/forward.py -1");
}
var back = function(){
	run("python /srv/http/motor/backward.py -1");
}
var left = function(){
	run("python /srv/http/motor/left.py -1");
}
var right = function(){
	run("python /srv/http/motor/right.py -1");
}
var stop = function(){
	run("python /srv/http/motor/stop.py");
}
var say = function(){
	var words = $("#words").val();
	run("espeak -s 120 \"" + words + "\"");
	$("#words").val("");
}
$(function(){
	$(document).keydown(function( e ) {
		if($("#words").is(":focus") == false){
			if ( e.which == 87 ) {
				forward();
			}
			if ( e.which == 83 ) {
				back();
			}
			if ( e.which == 65 ) {
				left();
			}
			if ( e.which == 68 ) {
				right();
			}
		}else{
			if(e.which == 13){
				say();
			}
		}
	});
	$(document).keyup(function( e ) {
		stop();
	});
});
</script>
<style>
body {
	font-family:helvetica;
	color:lime;
	background-color:red;
	-webkit-animation: colorchange 40s;
	-webkit-animation-iteration-count: infinite;
	padding:0px;
	margin:0px;
}
button {
	color:lime;
	background-color:transparent;
	border:0.1em solid lime;
	border-radius:0.2em;
	padding:0.2em;
	font-size:3em;
	height:1.6em;
	margin:0.2em;
}
iframe {
	width:40em;
	height:30em;
	margin:0px;
	padding:0px;
}
.frame {
	-webkit-transform:scale(0.49);
	margin:0px;
	padding:0px;
	margin-left:-6.2em;
	margin-top:-8em;
	margin-bottom:-8em;
}
#words {
	background-color:transparent;
	color:lime;
	border:none;
	border-bottom:1px solid lime;
	width:80%;
}
#saybtn {
	font-size:1em;
	width:auto;
}
@-webkit-keyframes colorchange {
  0%   {background: #003300;}
  25%  {background: #440044;}
  50%  {background: #220000;}
  75%  {background: black;}
  100% {background: #003300;}
}
</style>
</head>
<body>
<center>
<div class="frame">
<iframe src="http://192.168.1.10:8081/"></iframe>
</div>
<input type="text" id="words" placeholder="Make Jasper talk..." />
<button id="saybtn" onclick="say()">Say</button>
<br/>
<button onclick="forward()">^</button><br/>
<button onclick="left()">◄</button>
<button onclick="stop()">■</button>
<button onclick="right()">►</button><br/>
<button onclick="back()">V</button/>
</center>
<h1>Welcome to Jasper Controller!</h1>
<p>You can use the arrow keys (on a mobile device or tablet), or the WASD
keys (on a desktop or laptop) to move the robot around. You can see where
the robot is through the webcam.</p>
<h2>Some Privacy Conserns</h2>
<p>When using this webpage, keep in mind that you are controlling a real
robot at my house. This creates some privacy issues, because I don't
want people to be able to see what the people here are doing at all times.
For this reason, please obtain permission before logging on, and don't
log on in the middle of the night. If this becomes an issue, <b>your access
may be revoked and your IP address banned.</b></p>
</body>
</html>