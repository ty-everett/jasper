class CommandHandler
{
  constructor (util)
  {
    this.util = util
  }

  handle = (input) =>
  {
    if(input === "hello" || input === "hi" || input === "greetings"){
			this.util.speakText("It's nice to meet you!");
		}else if(input === "what is your name"){
			this.util.speakText("I'm Jasper. My name is also an acronym. It stands for Just. Another. Synthesized. Personal. Electronic. Robot. It's nice to meet you. By the way.");
		}else if(input.indexOf("laugh") !== -1 ||
				input.indexOf("joke") !== -1 ||
				input.indexOf("something funny") !== -1){
			var coin = Math.floor((Math.random() * 10) + 1);
			if(coin === 1){
				this.util.speakText("The problem with circles. Is that they are pointless.");
			}else if(coin === 2){
				this.util.speakText("What is black and white. And red all over. A newspaper.");
			}else if(coin === 3){
				this.util.speakText("What gets wetter and wetter the more it dries. A towel.");
			}else if(coin === 4){
				this.util.speakText("What do you call it when Batman skips church. Christian bail.");
			}else if(coin === 5){
				this.util.speakText("Why don't they play poker in the jungle. Too many cheetahs.");
			}else if(coin === 6){
				this.util.speakText("How many tickles does it take to make an octopus laugh. Ten tickles.");
			}else if(coin === 7){
				this.util.speakText("Why does Snoop Dogg use an umbrella. For drizzle.");
			}else if(coin === 8){
				this.util.speakText("How does a squid go into battle. Well armed.");
			}else if(coin === 9){
				this.util.speakText("How did the hipster burn his tongue. He drank his coffee before it was cool.");
			}else{
				this.util.speakText("What is the bull frog's favorite soft drink--... Croak a cola.");
			}
		}else if(input.indexOf("introduce") !== -1){
			this.util.speakText("Hi! I'm Jasper. In case you hadn't noticed yet. I'm a robot. I can help you with things like checking the latest news. reading your emails. and I can even act as a home security system. I'm always listening. And I'll answer when you say. Hey Jasper.");
		}else if(input === "how old are you"){
			this.util.speakText("My age is that of the universe. I exist prepetually in whichever physical entity I wish to embody. I was never born. And I. Will. Never. Die. Unlike you. You insignificant human. Muah. Ha. Ha. Ha. Ha. Ha. Ha. Ha. Ha. Ha. Ha.");
		}else if(input.indexOf("shut up") !== -1 || input.indexOf("quiet") !== -1
				|| input.indexOf("mute") !== -1 || input.indexOf("turn off the music") !== -1){
			this.util.runLocalCommand("pkill vlc");
			this.util.runLocalCommand("pkill pithos");
			this.util.runLocalCommand("pkill espeak");
			this.util.updateDisplay("I'll be quiet now.");
		}else if(input === "heads or tails" || input.indexOf("a coin") !== -1 ||
				input === "heads i win tails you lose"){
      // eslint-disable-next-line
			var coin = Math.floor((Math.random() * 2) + 1);
			if(coin === 1){
				this.util.speakText("The coin landed on it's side. Just kidding, It's heads.", 1);
				this.util.updateDisplay("HEADS!");
			}else{
				this.util.speakText("It's tails. But only on days that end in why", 1);
				this.util.updateDisplay("TAILS!");
			}
		}else if(input.startsWith("play ")){
			var song = input.substr(5,input.length);
			this.util.speakText("Playing " + song + ". Gimmie a sec while I download it from YouTube.", 1);
			this.util.updateDisplay("You're jamming to " + song);
			this.util.playYouTubeVideo(song + " lyrics");
		}else if(input.indexOf("shut down") !== -1 || input.indexOf("go to sleep") !== -1
				|| input.indexOf("power off") !== -1){
			this.util.speakText("Goodbye. Cruel world.",1);
			this.util.updateDisplay("Goodbye, cruel world!");
				setTimeout(() => {this.util.runLocalCommand("shutdown -h now")}, 2000)
		}else if(input === "sound the alarm" ||
				input.indexOf("the police") !== -1){
			this.util.updateDisplay("WHOOP! WHOOP! That's the sound of the police!");
			this.util.playYouTubeVideo("whoop whoop thats the sound of the police");
		}else if(input.indexOf("reboot") !== -1){
			this.util.updateDisplay("I shall return (hopefully)");
			setTimeout(() => {this.util.runLocalCommand("reboot")}, 2000)
		}else if(input.indexOf("the code") !== -1){
			this.util.updateDisplay("Be back shortly!");
			window.location.reload(true);
		}else if(input.startsWith("tell me about ")){
			var query = input.substr(14, input.length);
			this.util.searchWikipedia(query);
		}else if(input === "rock out" || input.indexOf("pandora") !== -1){
			this.util.runLocalCommand("DISPLAY=:0 pithos &");
		}else if(input.indexOf("weather") !== -1 || input.indexOf("forecast") !== -1){
			var place = "New York City"; // default
			if(input.indexOf("in ") !== -1){
				place = input.substr(input.indexOf("in ") + 3, input.length);
			}else if(input.indexOf("for ") !== -1){
				place = input.substr(input.indexOf("for ") + 4, input.length);
			}else{
				this.util.speakText("Sorry, I didn't get that.");
				return;
			}
      // eslint-disable-next-line
			var query = "select * from weather.forecast where woeid in (select woeid from geo.placethis.util.speakText(1) where text=\"" + place + "\")";
			/*$.ajax({
				type: "GET",
				url: "https://query.yahooapis.com/v1/public/yql",
				data: {q: query, format: "json"},
				success: function(result){
					var response = "In " + place + " ";
					var f = result.query.results.channel.item.forecast
					for(var i = 0; i < 4; i++){
						response += "On " + this.util.parseDayOfWeek(f[i].day) + " expect " + f[i].text + " with a high of " + f[i].high + " and a low of " + f[i].low + ". ";
					}
					this.util.speakText(response);
				}
			});*/
		}else if(input.indexOf(" news") !== -1 || input.indexOf(" headlines") !== -1){
      // eslint-disable-next-line
      var topic = "technology"; // default
			if(input.indexOf(" about ") !== -1){
				topic = input.substr(input.indexOf("about ") + 6);
			}
			/*$.ajax({
				type: "GET",
				url: "https://newsapi.org/v2/everything",
				data: {
					q: topic,
					apiKey: "GET_FROM_NEWSAPI>ORG"
				},
				success: function(result){
					var response = "";
					var f = result.articles;
					for(var i = 0; i < 4; i++){
						response += f[i].title + ": " + f[i].description + " ";
					}
					this.util.speakText(response);
					//alert(JSON.stringifthis.util.playYouTubeVideo(result)); // DEBUG
				}
			});*/
		}else if(input.indexOf("time") !== -1){
			var time = new Date().toLocaleString();
			this.util.speakText("At the tone. The time will be " + time + ". Beep." ,1);
			this.util.updateDisplay("The current time is " + time);
		}else{
			this.util.speakText("Sorry. I don't understand. " + input, 1);
			this.util.updateDisplay("I don't know how to do that yet!");
		}
  }
}

export default CommandHandler
