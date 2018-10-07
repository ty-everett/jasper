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
  	command = window.encodeURI(command);
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

  playYouTubeVideo = (v) =>
  {
  	var url = 'https://www.googleapis.com/youtube/v3/search';
  	var params = {
  		part: 'snippet',
  		key: 'AIzaSyDAKDaBy_JDwcScSHqDQimOOLjdPImLanc',
  		q: v
  	};
  	/*$.getJSON(url, params, function (searchTerm) {
  		vurl = "https://www.youtube.com/watch?v=" + searchTerm.items[0].id.videoId;
  		run("sudo -u pi cvlc --no-video " + vurl);
  	});*/
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

}

export default Util
