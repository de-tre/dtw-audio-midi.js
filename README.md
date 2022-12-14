# dynamic time warping / audio-midi
Implementation of DTW algorithm between any audio type and MIDI files.  
Basis algorithm for extracting audio features is STFT, running at:  
`sampleRate = 22050`,  
`frameSize = 1024` and  
`hopLength = 512`.  
  
Results are plotted, with various outputs in the console.  
A Sakoe-chiba band is the current optimization.  
Saving the path as JSON on button click.  
  
Here is what it would look like for an obvious example.  
See what impact the long silence at the end of the audio file has on the alignment:

![Chromas](https://github.com/de-tre/dtw-audio-midi.js/blob/main/screenshots/Chromas.png)

![Cost matrix, path, console](https://github.com/de-tre/dtw-audio-midi.js/blob/main/screenshots/Cost%20matrix%2C%20path%2C%20console.png)
