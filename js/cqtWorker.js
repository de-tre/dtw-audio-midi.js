// Inside cqtWorker.js
self.onmessage = function(e) {
    const { audioBuffer, sampleRate, minFreq, binsPerOctave, Q } = e.data;
    const kernel = createCQTKernel(sampleRate, minFreq, binsPerOctave, Q);
    const spectrogram = computeCQT(audioBuffer, kernel);
    self.postMessage({ spectrogram });
};

// Helper functions like createCQTKernel and computeCQT should be included or imported here

function createCQTKernel(sampleRate, minFreq, binsPerOctave, Q) {
    const k = binsPerOctave * Math.log2(sampleRate / minFreq);
    const kernel = new Float32Array(k);

    for (let n = 0; n < k; n++) {
        const freq = minFreq * Math.pow(2, n / binsPerOctave);
        const length = Math.ceil(Q * sampleRate / freq);
        const wavelet = new Float32Array(length);

        for (let i = 0; i < length; i++) {
            const window = 0.5 * (1 - Math.cos(2 * Math.PI * i / length)); // Hann window
            wavelet[i] = window * Math.cos(2 * Math.PI * i * freq / sampleRate);
        }

        kernel[n] = wavelet;
    }

    return kernel;
}

function computeCQT(audioBuffer, kernel) {
    const spectrogram = [];

    for (let i = 0; i < audioBuffer.length; i += kernel[0].length) {
        const segment = audioBuffer.subarray(i, i + kernel[0].length);
        const spectrum = new Float32Array(kernel.length);

        for (let j = 0; j < kernel.length; j++) {
            let sum = 0;
            for (let k = 0; k < kernel[j].length; k++) {
                sum += kernel[j][k] * segment[k];
            }
            spectrum[j] = sum;
        }

        spectrogram.push(spectrum);
    }

    return spectrogram;
}