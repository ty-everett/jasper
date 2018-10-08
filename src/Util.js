/* eslint-disable */
class Util
{

  constructor (jasper)
  {
    this.jasper = jasper
  }

  speakText = (text, display = true) =>
  {
    window.responsiveVoice.speak(text, "UK English Male", {rate: 1.1})
    if (display)
    {
      this.updateDisplay(text)
    }
  }

  updateDisplay = (text) =>
  {
    this.jasper.display.setState({text: text})
  }

  runLocalCommand = (command) =>
  {
    console.log('Util: Running local command:', command)
  	command = window.encodeURIComponent(command)
  	if (command.length > 0){
  		var xhr = new window.XMLHttpRequest()
  		xhr.open('GET', 'http://localhost:3000/runLocal?auth=8765&cmd=' + command)
      xhr.send()
  	}
  }

  searchWikipedia = (v) =>
  {
  	var pr = function(v){
  		this.speakText(v.query.search[0].snippet.replace(/(<([^>]+)>)/ig,""));
  	}
  	/*$.ajax({
          url: 'http://en.wikipedia.org/w/api.php',
          data: { action: 'query', list: 'search', srsearch: v, format: 'json' },
          dataType: 'jsonp',
          success: pr
      });*/
  }

  playYouTubeVideo = (video) =>
  {
  	var url = 'https://www.googleapis.com/youtube/v3/search'
    url += '?part=snippet'
    url += '&key=AIzaSyDAKDaBy_JDwcScSHqDQimOOLjdPImLanc'
    url += '&q=' + window.encodeURIComponent(video)
    var xhr = new window.XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onreadystatechange = () =>
    {
      if (xhr.readyState === 4)
      {
        var response = xhr.responseText
        console.log(response)
        var responseJSON = window.JSON.parse(response)
        var videoURL = "https://www.youtube.com/watch?v=" + responseJSON.items[0].id.videoId
        this.runLocalCommand("sudo -u pi cvlc --no-video " + videoURL)
      }
    }
    xhr.send()
  }

  parseNumbers = (s) =>
  {
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
  	return s;
  }

  parseDayOfWeek = (s) =>
  {
  	var r = "error";
  	if(s=="Sun")r="Sunday";
  	if(s=="Mon")r="Monday";
  	if(s=="Tue")r="Tuesday";
  	if(s=="Wed")r="Wednesday";
  	if(s=="Thu")r="Thursday";
  	if(s=="Fri")r="Friday";
  	if(s=="Sat")r="Saturday";
  	return r;
  }

  sayRandomJoke()
  {
    switch(Math.floor((Math.random() * 10) + 1)){
      case 1:
        this.speakText("The only problem I have with circles... is that they're pointless!")
        break
      case 2:
        this.speakText("What's black and white, and red all over? ... A newspaper!")
        break
      case 3:
        this.speakText("What gets wetter and wetter the more it dries? ... A towel!")
        break
      case 4:
        this.speakText("What do you call it when Batman skips church? ... Christian bail!")
        break
      case 5:
        this.speakText("Why don't they play poker in the jungle? ... Too many cheetahs!")
        break
      case 6:
        this.speakText("How many tickles does it take to make an octopus laugh? ... Ten tickles!")
        break
      case 7:
        this.speakText("Why does Snoop Dogg use an umbrella? ... For drizzle!")
        break
      case 8:
        this.speakText("How does a squid go into battle? ... Well armed!")
        break
      case 9:
        this.speakText("How did the hipster burn his tongue? ... He drank his coffee before it was cool!")
        break
      default:
        this.speakText("What is the bull frog's favorite soft drink? ... Croak a cola!");
    }
  }

  blink()
  {
    this.jasper.display.setState({eyesClosed: true})
    setTimeout(() => {this.jasper.display.setState({eyesClosed: false})}, 200)
  }

  randomlyBlink()
  {
    setInterval(() => {
      var randomChance = Math.floor((Math.random() * 5) + 1)
      if (randomChance === 1)
      {
        this.blink()
      }
    }, 2000)
  }

  introduce (input)
  {
    var introduceToWhom = ''
    if(input.indexOf('to ') !== -1)
    {
      introduceToWhom = input.substr(input.indexOf('to ') + 3)
    }
    var introduction = 'Hi ' + introduceToWhom + '. I\'m Jasper. '
    introduction += 'I\'m a virtual assistant written in JavaScript, '
    introduction += 'inspired by the original Project JASPER code. I was brought '
    introduction += 'into the world by my good friend Ty, who works on me '
    introduction += 'in his spair time. I can do many things, including '
    introduction += 'checking the weather, telling jokes, playing songs on-demand, '
    introduction += 'reading the latest headlines, getting info from wikipedia and '
    introduction += 'much more! I\'m always here when you need me. I\'ll '
    introduction += 'start listening when you say, "Hey Jasper".'
    this.speakText(introduction, false)
    this.updateDisplay('It\'s nice to meet you!')
  }

  flipCoin()
  {
    const coin = Math.floor((Math.random() * 2) + 1)
    if(coin === 1){
      this.speakText("It's heads", false);
      this.updateDisplay("HEADS!");
    }else{
      this.speakText("It's tails", false);
      this.updateDisplay("TAILS!");
    }
  }

  playSong (request)
  {
    var includeLyricsInSearch = true
    if (request.startsWith('play me '))
    {
      request = request.substr(8)
    }
    if (request.startsWith('play '))
    {
      request = request.substr(5)
    }
    if (request.startsWith('find me '))
    {
      request = request.substr(8)
    }
    if (request.startsWith('find '))
    {
      request = request.substr(5)
    }
    if (request.startsWith('let me hear '))
    {
      request = request.substr(12)
    }
    if (request.startsWith('let\'s hear '))
    {
      request = request.substr(11)
    }
    if (request.startsWith('lets hear '))
    {
      request = request.substr(10)
    }
    if (request.startsWith('search youtube for '))
    {
      request = request.substr(19)
      includeLyricsInSearch = false
    }
    if (request.startsWith('the song '))
    {
      request = request.substr(9)
      includeLyricsInSearch = true
    }
    this.speakText('Sure thing. Just a sec.', false)
    this.updateDisplay('Playing ' + request)
    this.playYouTubeVideo(request + includeLyricsInSearch ? ' lyrics' : '')
  }

}

export default Util
