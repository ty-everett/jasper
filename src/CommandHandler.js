class CommandHandler
{
  constructor (util)
  {
    this.util = util
  }

  handle = (input) =>
  {
    switch (true) {
      case input === '':
        this.util.speakText('I didn\'t get that. You need to continue speaking, right after you say "Hey Jasper".', false)
        this.util.updateDisplay('I was listening. Keep going right after you say "Hey Jasper".')
        break
      case input === 'hello':
      case input === 'hi':
      case input === 'greetings':
        this.util.speakText('Hi! My name is Jasper. It\'s nice to meet you!')
        break
      case input.indexOf('introduce yourself') !== -1:
        this.util.introduce(input)
        break
      case input.indexOf('a joke') !== -1:
      case input.indexOf('something funny') !== -1:
        this.util.sayRandomJoke()
        break
      case input.indexOf('shut up') !== -1:
      case input.indexOf('be quiet') !== -1:
      case input.indexOf('mute') !== -1:
      case input.indexOf('stop the music') !== -1:
      case input.indexOf('pause the music') !== -1:
      case input.indexOf('turn off the music') !== -1:
        this.util.runLocalCommand("pkill vlc")
        this.util.runLocalCommand("pkill pithos")
        this.util.runLocalCommand("pkill espeak")
        this.util.updateDisplay("I'll be quiet now.")
        window.responsiveVoice.cancel()
        break
      case input === 'heads or tails':
      case input === 'heads i win tails you lose':
      case input.indexOf('a coin') !== -1:
      case input.indexOf('coin toss') !== -1:
        this.util.flipCoin()
        break
      case input.startsWith('play '):
      case input.startsWith('search youtube for '):
      case input.startsWith('let me hear '):
      case input.startsWith('let\'s hear '):
      case input.startsWith('lets hear '):
      case input.startsWith('find the song '):
      case input.startsWith('find me the song '):
        this.util.playSong(input)
        break
      case input === 'shut down':
      case input === 'power off':
      case input === 'down with the system':
        this.util.runLocalCommand('shutdown -h now')
        break
      case input === 'reboot':
      case input === 'restart the system':
        this.util.runLocalCommand('shutdown -r now')
        break
      default:
        var message = 'I\'m sorry, but I don\'t understand that yet. '
        message += 'If it\'s something you think would be cool, go bug Ty about it.'
        this.util.speakText(message)
        break
    }
    /*
	   if(input.startsWith("tell me about ")){
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
			$.ajax({
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
			});
		}else if(input.indexOf(" news") !== -1 || input.indexOf(" headlines") !== -1){
      // eslint-disable-next-line
      var topic = "technology"; // default
			if(input.indexOf(" about ") !== -1){
				topic = input.substr(input.indexOf("about ") + 6);
			}
			$.ajax({
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
			});
		}else if(input.indexOf("time") !== -1){
			var time = new Date().toLocaleString();
			this.util.speakText("At the tone. The time will be " + time + ". Beep." ,1);
			this.util.updateDisplay("The current time is " + time);
    }*/
  }
}

export default CommandHandler
