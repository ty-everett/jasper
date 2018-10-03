# JasperJS 

## Project Jasper Implemented in JavaScript

### Attribution

This project as heavily inspired by the great work of the
http://jasperproject.github.io/ team. While none of their code was used
in this project, it most certainly wouldn't be what it is without
their ideas and creativity.

### Overview

Project Jasper is a personal assistant capable of doing many things
built with a Raspberry Pi. In July 2017 I wanted to do something
similar but had no interest in learning Python. The code was far
from complete or professional (as you can see by this repo's
history), but I managed to get a working system built with PHP,
JavaScript and some useful public APIs.

Back in December of 2017 I decided to post it to GitHub. As the
project evolved, I decided to convert it to a NodeJS package and
make the code a bit more modern and up-to-date. This repository
is the result of those efforts. Your thoughts (and pull requests)
are welcome.

### Features

- Voice recognition with WebkitSpeech
- Synthesis with ReactiveVoice
- Music playback with Pandora (pithos)
- Wikipedia integration (general knowledge)
- Yahoo Weather API integration
- An assortment of bad jokes (more are always welcome!)
- Ability to "flip a coin"
- Ability to introduce itself
- Ability to play any song on demand (searches YouTube)
- More features coming soon

### Dependencies

There are a number of dependencies required in order to run
the project. Most notably, you will need a microphone, speaker
and touchscreen to plug into your Raspberry Pi. It should be
possible to run Jasper from the browser, but I'll leave that
for those ambitious enough to try.

Other software dependencies are NodeJS, pithos (pandora), VLC
(YouTube), Chromium (app frame), and espeak (TTS).

### Contributing

If you run into probblems, feel free to open an issue. If
you want to help, I'd be happy to acept a pull request with
your changes.

### License

This project is licensed AGPL 3.0. It shall eternally remain
free and open-source software.
