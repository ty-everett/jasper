<!DOCTYPE html>
<html>
<head>
<title>Jasper Virtual Assistant</title>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src='https://code.responsivevoice.org/responsivevoice.js'></script> 
<script>
// JASPER javascript code
var s = function (v, h=0) { // speaking function
	responsiveVoice.speak(v, "US English Male", {rate: 0.9});
	if(!h){
		$("#final_text").text(v);
	}
}
var d = function(v){ // displaying text function
	$("#final_text").text(v);
}
var p = function(v){ // audio play function
	var audio = new Audio(v);
	audio.play();
}
var run = function(v){ // host command execution function
	v = encodeURI(v);
	if(v.length > 0){
		var u = "/exec.php?cmd=" + v;
		$.ajax({
			type: "GET",
			url: u,
			success: function (a, b, c) {},
			error: function (errorMessage) {}
		});
	}
}
var i = function(v){ // update face image function
	$("#face").attr("src",v);
}
var blink = function(){ // eyes blink function
	if(asleep)return;
	i("/facesleepy.png");
	setTimeout(function() { if(!asleep){i("face.png");} }, 150);
}
var w = function(v){ // wikipedia function
	var pr = function(v){
		s(v.query.search[0].snippet.replace(/(<([^>]+)>)/ig,""));
	}
	$.ajax({
        url: 'http://en.wikipedia.org/w/api.php',
        data: { action: 'query', list: 'search', srsearch: v, format: 'json' },
        dataType: 'jsonp',
        success: pr
    });
}
var y = function(v){ // youtube function
	url = 'https://www.googleapis.com/youtube/v3/search';
	var params = {
		part: 'snippet',
		key: 'AIzaSyDAKDaBy_JDwcScSHqDQimOOLjdPImLanc',
		q: v
	};
	$.getJSON(url, params, function (searchTerm) {
		vurl = "https://www.youtube.com/watch?v=" + searchTerm.items[0].id.videoId;
		run("sudo -u pi cvlc --no-video " + vurl);
	});
}
var parsenumbers = function(s){ // turns a string into numbers
	if(isNaN(s)){
		if(s == "one"){
			s = 1;
		}else if(s == "won"){
			s = 1;
		}else if(s == "two"){
			s = 2;
		}else if(s == "to"){
			s = 2;
		}else if(s == "too"){
			s = 2;
		}else if(s == "three"){
			s = 3;
		}else if(s == "four"){
			s = 4;
		}else if(s == "for"){
			s = 4;
		}else if(s == "five"){
			s = 1;
		}else if(s == "six"){
			s = 1;
		}else if(s == "seven"){
			s = 1;
		}else if(s == "eight"){
			s = 1;
		}else if(s == "ate"){
			s = 8;
		}else if(s == "nine"){
			s = 1;
		}else{
			s = 0;
		}
	}else{
		return s;
	}
	return s;
}
function sleep(ms) { // sleep hack
  return new Promise(resolve => setTimeout(resolve, ms));
}
// onend hack
var oeh = 0;
var asleep = 0;
var hjcount = 0; // hey jasper counter


// jasper start function


async function jstart(){
	hjcount++;
	if((hjcount + 2) % 3 != 0){
		return;
	}
	p("start.wav"); // play the listening soundfx
	// stop the old one
	recognition.stop();
	// shut him up
	responsiveVoice.cancel();
	// start listening for jasper input
	var r = new webkitSpeechRecognition();
	r.interimResults = true;
	r.start();
	r.onend = function() {
		// play stopped soundex
		p("stop.wav");
		// process input
		var input = final_transcript.toLowerCase();
		// strip hey jasper from input if present
		if(input.startsWith("hey jasper")){
			input = input.substr(11,input.length);
		}
		
		
		// begin modules and commands
		
		
		if(input == "hello" || input == "hi" || input == "greetings" || input == "salutations"){
			var coin = Math.floor((Math.random() * 2) + 1);
			if(coin == 1){
				s("It's nice to meet you.");
			}else{
				s("How. High are you. Um. I mean. Hi. How are you.");
			}
		}else if(input == "what is your name"){
			s("I'm Jasper. My name is also an acronym. It stands for Just. Another. Synthesized. Personal. Electronic. Robot. It's nice to meet you. By the way.");
		}else if(input.indexOf("laugh") !== -1 ||
				input.indexOf("joke") !== -1 ||
				input.indexOf("something funny") !== -1){
			var coin = Math.floor((Math.random() * 10) + 1);
			if(coin == 1){
				s("The problem with circles. Is that they are pointless.");
			}else if(coin == 2){
				s("What is black and white. And red all over. A newspaper.");
			}else if(coin == 3){
				s("What gets wetter and wetter the more it dries. A towel.");
			}else if(coin == 4){
				s("What do you call it when Batman skips church. Christian bail.");
			}else if(coin == 5){
				s("Why don't they play poker in the jungle. Too many cheetahs.");
			}else if(coin == 6){
				s("How many tickles does it take to make an octopus laugh. Ten tickles.");
			}else if(coin == 7){
				s("Why does Snoop Dogg use an umbrella. For drizzle.");
			}else if(coin == 8){
				s("How does a squid go into battle. Well armed.");
			}else if(coin == 9){
				s("How did the hipster burn his tongue. He drank his coffee before it was cool.");
			}else{
				s("What is the bull frog's favorite soft drink--... Croak a cola.");
			}
		}else if(input.indexOf("introduce") !== -1){
			s("Hi! I'm Jasper. In case you hadn't noticed yet. I'm a robot. I can help you with things like checking the latest news. reading your emails. and I can even act as a home security system. I'm always listening. And I'll answer when you say. Hey Jasper.");
		}else if(input == "how old are you"){
			s("My age is that of the universe. I exist prepetually in whichever physical entity I wish to embody. I was never born. And I. Will. Never. Die. Unlike you. You insignificant human. Muah. Ha. Ha. Ha. Ha. Ha. Ha. Ha. Ha. Ha. Ha.");
		}else if(input.indexOf("shut up") !== -1 || input.indexOf("quiet") !== -1
				|| input.indexOf("mute") !== -1 || input.indexOf("turn off the music") !== -1){
			run("pkill vlc");
			run("pkill pithos");
			run("pkill espeak");
			d("I'll be quiet now.");
		}else if(input == "heads or tails" || input.indexOf("a coin") !== -1 ||
				input == "heads i win tails you lose"){
			var coin = Math.floor((Math.random() * 2) + 1);
			if(coin == 1){
				s("The coin landed on it's side. Just kidding, It's heads.", 1);
				d("HEADS!");
			}else{
				s("It's tails. But only on days that end in why", 1);
				d("TAILS!");
			}
		}else if(input == "buzz buzz buzz"){
			s("Oh no. I've been shocked by a taser!");
		}else if(input.startsWith("play ")){
			var song = input.substr(5,input.length);
			s("Playing " + song + ". Gimmie a sec while I download it from YouTube.", 1);
			d("You're jamming to " + song);
			y(song + " lyrics");
		}else if(input.indexOf("shut down") !== -1 || input.indexOf("go to sleep") !== -1
				|| input.indexOf("power off") !== -1){
			s("Goodbye. Cruel world.",1);
			d("Goodbye, cruel world!");
				setTimeout(function(){run("shutdown -h now");}, 2000);
		}else if(input == "sound the alarm" ||
				input.indexOf("the police") !== -1){
			d("WHOOP! WHOOP! That's the sound of the police!");
			y("whoop whoop thats the sound of the police");
		}else if(input.indexOf("reboot") !== -1){
			d("See you on the other side!");
			run("reboot");
		}else if(input.indexOf("the code") !== -1){
			d("Be back shortly!");
			location.reload(true);
		}else if(input.startsWith("tell me about ")){
			var query = input.substr(14, input.length);
			w(query);
		}else if(input == "rock out" || input.indexOf("pandora") !== -1){
			run("DISPLAY=:0 pithos &");
		}else if(input.startsWith("move") || input.startsWith("walk") || 
				input.startsWith("turn") || input.startsWith("drive") ||
				input.startsWith("go") || input.startsWith("skirt")){
			var coin = Math.floor((Math.random() * 10) + 1);
			if(coin == 1){
				s("skirt skirt!");
			}else if(coin == 2){
				s("zoo-oo-ooo-oo-oo-oo-oo-oo-oo-oo-om!");
			}else if(coin == 3){
				s("here I go!");
			}else if(coin == 4){
				s("wee-ee-ee-ee-ee-ee-ee-ee-ee-ee-ee-ee-ee-ee!");
			}else if(coin == 5){
				s("you better get out of my way!");
			}else if(coin == 6){
				s("Crashes into wall. Sorry, I didn't see you there.");
			}else if(coin == 7){
				s("vroom vrooooom");
			}else if(coin == 8){
				s("putt. putt putt putt putt putt putt putt putt");
			}else if(coin == 9){
				s("Honk honk, haw-aw-aw-aw-aw-awnk");
			}else{
				s("Hopefully the traffic light was green!");
			}
			var directions = input.split(" ");
			var dircmd = "";
			for(var i = 0; i < directions.length-2; i+=3){
				directions[i+2] = parsenumbers(directions[i+2]);
				//alert(directions[i+1]);
				//alert(directions[i+2]);
				if(directions[i+1] == "forward"){
					dircmd += "python /srv/http/motor/forward.py " + directions[i+2] + "; ";
				}else if(directions[i+1] == "backward" || directions[i+1] == "backwards" ||
						directions[i+1] == "back" || directions[i+1] == "reverse"){
					dircmd += "python /srv/http/motor/backward.py " + directions[i+2] + "; ";
				}else if(directions[i+1] == "left"){
					dircmd += "python /srv/http/motor/left.py " + directions[i+2] + "; ";
				}else if(directions[i+1] == "right"){
					dircmd += "python /srv/http/motor/right.py " + directions[i+2] + "; ";
				}else{
					s("Oops, something went wrong. I didn't understand your directions.");
				}
			}
			//alert(dircmd);
			run(dircmd);
		}else if(input.indexOf("time") !== -1){
			if(input.indexOf("please") !== -1){
				var time = new Date().toLocaleString();
				s("At the tone. The time will be " + time + ". Beep." ,1);
				d("The current time is " + time);
			}else{
				if(input.length >= 20){
					var time = new Date().toLocaleString();
					s("It's " + time ,1);
					d("The current time is " + time);
				}else{
					s("Maybe I would tell you if you asked nicer.");
				}
			}
		}else{
			s("Sorry. I don't understand. " + input, 1);
			d("I don't know how to do that yet!");
		}
		
		
		// end commands and modules
		
		
		// start the hey jasper listener
		oeh = 0;
		startDictation();
	};
	r.onresult = function(event) {
		var interim_transcript = '';
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				final_transcript += event.results[i][0].transcript;
			} else {
				interim_transcript += event.results[i][0].transcript;
			}
		}
		//final_transcript = capitalize(final_transcript);
		final_text.innerHTML = linebreak(final_transcript);
		interim_text.innerHTML = linebreak(interim_transcript);
	};
}


var jsleep = function(){
	if(oeh){
		return;
	}
	d("If I'm not responding to \"hey jasper\", just tap on my face and I'll wake up.");
	p("stop.wav");
	i("facesleepy.png");
	asleep = 1;
}
$(document).ready(function(){ // hide the jasper detection text
	$("#jdtext").hide();
});
// speak the intro
s("Jassper is ready.", 1);

// set up the hey jasper listener
var final_transcript = '';
var recognizing = false;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.onstart = function() {
	recognizing = true;
};
recognition.onerror = function(event) {
	jsleep();
	console.log(event.error);
};
recognition.onend = function() {
	recognizing = false;
	//startDictation();
	jsleep();
};
recognition.onresult = function(event) {
	var interim_transcript = '';
	for (var i = event.resultIndex; i < event.results.length; ++i) {
		if (event.results[i].isFinal) {
			final_transcript += event.results[i][0].transcript;
		} else {
			interim_transcript += event.results[i][0].transcript;
		}
	}
	final_transcript = capitalize(final_transcript);
	final_span.innerHTML = linebreak(final_transcript);
	interim_span.innerHTML = linebreak(interim_transcript);
	// hey jasper detector
	if(final_transcript.toLowerCase().endsWith("hey jasper") ||
			interim_transcript.toLowerCase().endsWith("hey jasper")){
		interim_transcript = '';
		final_transcript = '';
		oeh = 1;
		d("Listening...");
		jstart(); // start listening
	}
};
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
	return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
function capitalize(s) {
	return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
}
var startDictation = function() {
	final_transcript = '';
	recognition.lang = 'en-US';
	recognition.start();
	final_span.innerHTML = '';
	interim_span.innerHTML = '';
}
// randomly blink Math.floor((Math.random() * 10) + 1)
function blink_loop(){
	blink();
	setTimeout(function(){blink_loop();}, Math.floor((Math.random() * 10000) + 2000));
}
blink_loop();
// start the hey jasper listener
// needs to be called LAST because it creates some JavaScript runtime errors
startDictation();
</script>
<link rel="stylesheet" type="text/css" href="stylesheet.css?foo=<?=rand(1,1000)?>" />
</head>
<body>
<center>
<h1>JASPER V8 OCTA</h1>
<p class="subtitle">Just Another Synthesized Personal Electronic Robot</p>
<a href="/" id="rl">
<img id="face" src="face.png"/>
</a>
<p id="text"><span id="final_text">Say "Hey Jasper", then, "What time is it", "Tell me a joke", "intruduce yourself", or anything else.</span><span id="interim_text"></span></p>
</center>
<div id="jdtext">
<span id="final_span" class="final"></span>
<span id="interim_span" class="interim"></span>
</div>
</body>
</html>