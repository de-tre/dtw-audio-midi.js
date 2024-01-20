const sampleRate = 22050;
const frameSize = 2048;
const hopLength = 512;

const midiPitches = 128;
const pitchClasses = 12;
const pitchRef = 69;
const freqRef = 440;

let ctx = new (window.AudioContext || window.webkitAudioContext)({sampleRate: `${sampleRate}`});
// ctx.sampleRate = sampleRate;

// import FFT from 'fft.js';


async function analyseAudio(audioBuffer) {
    // Create a new Web Worker instance
    const cqtWorker = new Worker('cqtWorker.js');

    // Send audio data to the worker
    cqtWorker.postMessage({
        audioBuffer: audioBuffer.getChannelData(0), // Assuming mono channel
        sampleRate: audioBuffer.sampleRate, // Reading the sample rate
        minFreq: 27.5, // Example value, adjust as needed
        binsPerOctave: 12, // Example value
        Q: 1 // Example Q factor
    });

    return new Promise((resolve, reject) => {
        cqtWorker.onmessage = function(e) {
            const { spectrogram } = e.data;

            // Continue with feature extraction using the CQT spectrogram
            // For example, computeSpecLogFreq, computeChroma, etc.

            let C = computeChroma(logSpec, pitchClasses, midiPitches);
            let normC = normalizeFeature(C, 0.001);
        
            /* let plot = [
                {
                    z: logSpec,
                    type: 'heatmap',
                    colorscale: 'Greys'
                }
            ];
            let plotAudio = chromaHeatMap(plot, 'Spectrum X_n');
            Plotly.newPlot('audiofeatures', plot, plotAudio['layout'], {scrollZoom: false}); */
        
            // Save some resources
            signal = null;
            magSpec = null;
            logComp = null;
            logSpec = null;
            C = null;
            ctx.suspend();
        
            resolve(finalFeatures);
            
            return normC;
        };

        cqtWorker.onerror = function(e) {
            reject(e.message);
        };

        // Send audio data to the worker
        cqtWorker.postMessage({
            audioBuffer: audioBuffer.getChannelData(0), // Assuming mono channel
            sampleRate: audioBuffer.sampleRate,
            minFreq: 27.5, // Example value, adjust as needed
            binsPerOctave: 12, // Example value
            Q: 1 // Example Q factor
        });
    });
}


// // Audio feature extraction pipeline
// let analyseAudio = async (URL) => {
//     ctx.resume();

//     let signal = await x(URL);
//     let magSpec = await Y(signal);
//     let logComp = await logCompression(magSpec, 0.01).array();
//     let logSpec = await computeSpecLogFreq(logComp, sampleRate, frameSize, midiPitches);
//     let C = await computeChroma(logSpec, pitchClasses, midiPitches);
//     let normC = await normalizeFeature(C, 0.001);

//     /* let plot = [
//         {
//             z: logSpec,
//             type: 'heatmap',
//             colorscale: 'Greys'
//         }
//     ];
//     let plotAudio = chromaHeatMap(plot, 'Spectrum X_n');
//     Plotly.newPlot('audiofeatures', plot, plotAudio['layout'], {scrollZoom: false}); */

//     // Save some resources
//     signal = null;
//     magSpec = null;
//     logComp = null;
//     logSpec = null;
//     C = null;
//     ctx.suspend();

//     return normC;
// }

// Extract audio signal
let x = async (URL) => {
    console.log("Step: Decoding");
    return fetch(URL)
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(audioData => {
        console.log(`--Audio duration: ${convertHMS(audioData.length/sampleRate)} minutes`)
        return audioData.getChannelData(0)
    })
        
}

// Compute magnitude power spectrogram, return Promise
let Y = async x => {
    console.log("Step: Magnitude spectrogram");
    let result = tf.tidy(() => tf.square(tf.abs(tf.transpose(tf.signal.stft(tf.tensor1d(x), frameSize, hopLength, frameSize, tf.signal.hannWindow)))));
    console.log(result.array());
    return result.array();
}

// Compute log-frequency spectrogram
// Y = linear frequency magnitude spectrogram
let computeSpecLogFreq = async (Y, sampleRate, frameSize, midiPitches) => {
    console.log("Step: Log-frequency spectrogram");

    // Since the number of columns isn't fixed, declaring the rows is enough (else, columns = frame count) 
    let Y_LF = new Array(midiPitches).fill(0);

    // Extract the corresponding k-th bins with k ∈ P(p) from the STFT Y
    // and sum them up
    for (let p = 0; p < midiPitches; p++) {
        let k = poolPitch(p, sampleRate, frameSize, pitchRef, freqRef);
        let lowerK = k[0];
        let upperK = k.at(-1)+1;
        let slicedY = await Y.slice(lowerK, upperK);
        Y_LF[p] = summedByCol(slicedY);
    }
    console.log(Y_LF);
    return Y_LF;
}

// Compute the chroma
// Y_LF = log-freq spectrogram
// pitchClasses = number of pitch classes, e.g. {C, C#, D, D#, E, F, F#, G, G#, A, A#, B}
let computeChroma = async (Y_LF, pitchClasses) => {
    console.log("Step: Chroma");

    let C = [];

    // Sum up all rows from the log-frequency spectrogram into their
    // respective pitch classes
    for (let c = 0; c < pitchClasses; c++) {
        C[c] = summedByCol(Y_LF.filter((e, index) => index % pitchClasses == c));
    }

    // Normalize by the max coefficient
    return await scaled(C, 1/await getMaxFromNDimArr(C));
};

// Normalize features
let normalizeFeature = async (X, threshhold) => {
    console.log("Step: Normalize");

    const K = pitchClasses;   
    const N = X[0].length;    // Frames
    let normX = arrayFilled(K, N);
    let v = 1 / Math.sqrt(K);

    for (let n = 0; n < N; n++) {

        let sumOfSquares = 0;
        for(let k = 0; k < K; k++) {
            sumOfSquares += X[k][n] ** 2;
        }
        let s = Math.sqrt(sumOfSquares);
        if (s > threshhold) {
            for(let k = 0; k < K; k++) {
                normX[k][n] = X[k][n] / s;
            }
        } else {
            for(let k = 0; k < K; k++) {
                normX[k][n] = v;
            }
        }
    }
    return normX;
}

// Read the MIDI file
async function parseMIDI (file) {
    console.log("Step: Parse MIDI");

    let currentMidi = null;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
        const midi = new Midi(e.target.result);
        currentMidi = midi;
        resolve(currentMidi);
    };
    reader.readAsArrayBuffer(file);
    })
}

// Compute chroma from MIDI, all in one
let analyseMIDI = async (file) => {
    console.log("Step: Analyse MIDI");

    let midi = await parseMIDI(file);

    // At ratio = 1000, there would be a column for each ms, which makes the computation needlessly slow. 
    // Thus, this reduces the temporal resolution
    let ratio = 1000 / 20;

    // This defines the time grid resolution of the features
    let C = arrayFilled(pitchClasses, Math.round(midi.duration * ratio));

    // Get duration of the entire MIDI file
    // console.log(midi);
    console.log(`--MIDI duration: ${convertHMS(midi.duration)} minutes`);

    let tracks = midi.tracks;
    let totalTracksNum = midi.tracks.length;

    for(let i = 0; i < totalTracksNum; i++) {
        let trackNotesNum = tracks[i].notes.length;

        for(let j = 0; j < trackNotesNum; j++) {
            let currentTrackNote = tracks[i].notes[j];

            // Readability
            let pitch = currentTrackNote.midi % pitchClasses;
            let noteOnTime = Math.round(currentTrackNote.time * ratio);
            let durationNote = Math.round(currentTrackNote.duration * ratio);

            // Add the notes in the feature matrix by their velocities (over all tracks)
            let noteOffTime = noteOnTime+durationNote;
            for(let k = noteOnTime; k < noteOffTime; k++) {
                C[pitch][k] = C[pitch][k] + currentTrackNote.velocity;
            }
            
            // Get info from each note
            // console.log(`
            //     MIDI: ${note.midi},
            //     Time ms: ${Math.round(note.time * 1000)},
            //     Duration ms: ${Math.round(note.duration * 1000)},
            //     Pitch: ${note.pitch},
            //     Velocity: ${note.velocity}
            //     `);
        }
    }

    // Save memory
    midi = null;

    // Return normalized chroma
    return await normalizeFeature(C, 0.001);
}