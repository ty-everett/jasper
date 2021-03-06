//import startSound from './res/start.wav'
import stopSound from './res/stop.wav'

import Util from './Util.js'
import CommandHandler from './CommandHandler.js'

class Jasper
{
  constructor(display)
  {
    console.log('Jasper: ctor called')
    this.display = display
    // check if WebkitSpeachRecognition is present
    if (typeof window.webkitSpeechRecognition === 'undefined')
    {
      alert('You must use a browser that supports speech recognition to use JASPER')
    } else
    {
      // A state for the application, either "waiting", "listening", or "dead"
      this.state = 'waiting'
      // is speech recognition running?
      this.recognizing = false
      // create the recognizer
      this.recognizer = new window.webkitSpeechRecognition()
      this.recognizer.continuous = true
      this.recognizer.interimResults = true
      // bind recognizer events
      this.recognizer.onerror = this.onSpeechError
      this.recognizer.onend = this.onSpeechEnd
      this.recognizer.onstart = this.onSpeechStart
      this.recognizer.onresult = this.onSpeechResult
      // set up utils and command handler
      this.util = new Util(this)
      this.commandHandler = new CommandHandler(this.util)
      // randomly blink Jasper's eyes
      this.util.randomlyBlink()
      // start listening
      this.recognizer.start()
      this.util.speakText("Jasper is ready", false)
    }
  }

  onSpeechResult = (event) =>
  {
    const result = event.results[event.results.length - 1]
    const transcript = result[0].transcript
    if (this.state === 'listening')
    {
      this.util.updateDisplay(transcript)
    }
    if (result[0].transcript.toLowerCase().indexOf('hey jasper') !== -1 &&
        this.state === 'waiting')
    {
      this.setState('listening')
    } else if (result.isFinal && this.state === 'listening')
    {
      this.handleCommand(transcript)
    }
  }

  onSpeechError = (event) =>
  {
    console.error(event)
    this.recognizing = false
    this.setState('dead')
  }

  onSpeechStart = (event) =>
  {
    this.recognizing = true
    console.log('Jasper: onSpeechStart called')
  }

  setState = (newState) =>
  {
    console.log('Jasper: state from', this.state, 'to', newState)
    if (this.state === 'waiting' && newState === 'listening')
    {
      this.util.updateDisplay("listening...")
    }
    if (this.state === 'listening' && newState === 'waiting')
    {
      new Audio(stopSound).play()
    }
    if (newState === 'dead')
    {
      if(this.recognizing === false)
      {
        try {
          this.recognizer.start()
          newState = this.state
          if (newState === 'dead')
          {
            newState = 'listening'
          }
        } catch (e) {}
      }
    }
    this.state = newState
  }

  onSpeechEnd = (event) =>
  {
    console.log('Jasper: onSpeechEnd called')
    this.recognizing = false
    this.setState('dead')
  }

  handleCommand = (command) =>
  {
    // ensure the input is in all lower case
    command = command.toLowerCase()
    command = command.trim()
    // if there is anything before the first "hey jasper" then delete it
    if (command.indexOf('hey jasper') !== -1)
    {
      command = command.substr(command.indexOf('hey jasper'))
    }
    // strip any "hey jasper" or "jasper" from the beginning
    while (command.startsWith('jasper'))
    {
      command = command.substr(7)
    }
    while (command.startsWith('hey jasper'))
    {
      command = command.substr(11)
    }

    console.log('Jasper: Processing command:', command)

    try{
      this.commandHandler.handle(command)
    } catch (e)
    {
      var message = 'It seems like I have just crashed. The error was: '
      message += e.message
      this.util.speakText(message)
      this.util.updateDisplay(e.message + ' stack: ' + e.stack)
    }

    // set the state back to waiting
    this.setState('waiting')
  }

}

export default Jasper
