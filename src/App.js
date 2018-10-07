import React, { Component } from 'react'
import face from './res/face.png'
import faceSleepy from './res/facesleepy.png'
import './App.css'
import Jasper from './Jasper.js'

class App extends Component
{

  state =
  {
    title: 'JASPER',
    subtitle: 'A Tyler Sands Creation',
    eyesClosed: false,
    text: 'Say "Hey Jasper", then "What time is it", "Tell me a joke", "intruduce yourself", or anything else.'
  }

  constructor(props)
  {
    super(props)
    new Jasper(this)
  }

  reloadPage ()
  {
    window.location.reload(true)
  }

  render()
  {
    return (
      <div className="Jasper">
        <h1 className="JasperTitle">{this.state.title}</h1>
        <h4 className="JasperSubtitle">{this.state.subtitle}</h4>
        <img
          className="JasperFace"
          alt="JASPER Face"
          src={this.state.eyesClosed ? face : faceSleepy}
          onClick={this.reloadPage}
        />
        <p className="JasperText">{this.state.text}</p>
      </div>
    )
  }
}

export default App
