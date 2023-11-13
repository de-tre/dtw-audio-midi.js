// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/extractFeatures.js":[function(require,module,exports) {
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var sampleRate = 22050;
var frameSize = 2048;
var hopLength = 512;
var midiPitches = 128;
var pitchClasses = 12;
var pitchRef = 69;
var freqRef = 440;
var ctx = new (window.AudioContext || window.webkitAudioContext)({
  sampleRate: "".concat(sampleRate)
});
ctx.sampleRate = sampleRate;

// Audio feature extraction pipeline
var analyseAudio = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(URL) {
    var signal, magSpec, logComp, logSpec, C, normC;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          ctx.resume();
          _context.next = 3;
          return x(URL);
        case 3:
          signal = _context.sent;
          _context.next = 6;
          return Y(signal);
        case 6:
          magSpec = _context.sent;
          _context.next = 9;
          return logCompression(magSpec, 0.01).array();
        case 9:
          logComp = _context.sent;
          _context.next = 12;
          return computeSpecLogFreq(logComp, sampleRate, frameSize, midiPitches);
        case 12:
          logSpec = _context.sent;
          _context.next = 15;
          return computeChroma(logSpec, pitchClasses, midiPitches);
        case 15:
          C = _context.sent;
          _context.next = 18;
          return normalizeFeature(C, 0.001);
        case 18:
          normC = _context.sent;
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
          return _context.abrupt("return", normC);
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function analyseAudio(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Extract audio signal
var x = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(URL) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log("Step: Decoding");
          return _context2.abrupt("return", fetch(URL).then(function (data) {
            return data.arrayBuffer();
          }).then(function (arrayBuffer) {
            return ctx.decodeAudioData(arrayBuffer);
          }).then(function (audioData) {
            console.log("--Audio duration: ".concat(convertHMS(audioData.length / sampleRate), " minutes"));
            return audioData.getChannelData(0);
          }));
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function x(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

// Compute magnitude power spectrogram, return Promise
var Y = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(x) {
    var result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log("Step: Magnitude spectrogram");
          result = tf.tidy(function () {
            return tf.square(tf.abs(tf.transpose(tf.signal.stft(tf.tensor1d(x), frameSize, hopLength, frameSize, tf.signal.hannWindow))));
          });
          console.log(result.array());
          return _context3.abrupt("return", result.array());
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function Y(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

// Compute log-frequency spectrogram
// Y = linear frequency magnitude spectrogram
var computeSpecLogFreq = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(Y, sampleRate, frameSize, midiPitches) {
    var Y_LF, p, k, lowerK, upperK, slicedY;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          console.log("Step: Log-frequency spectrogram");

          // Since the number of columns isn't fixed, declaring the rows is enough (else, columns = frame count) 
          Y_LF = new Array(midiPitches).fill(0); // Extract the corresponding k-th bins with k ∈ P(p) from the STFT Y
          // and sum them up
          p = 0;
        case 3:
          if (!(p < midiPitches)) {
            _context4.next = 14;
            break;
          }
          k = poolPitch(p, sampleRate, frameSize, pitchRef, freqRef);
          lowerK = k[0];
          upperK = k.at(-1) + 1;
          _context4.next = 9;
          return Y.slice(lowerK, upperK);
        case 9:
          slicedY = _context4.sent;
          Y_LF[p] = summedByCol(slicedY);
        case 11:
          p++;
          _context4.next = 3;
          break;
        case 14:
          console.log(Y_LF);
          return _context4.abrupt("return", Y_LF);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function computeSpecLogFreq(_x4, _x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

// Compute the chroma
// Y_LF = log-freq spectrogram
// pitchClasses = number of pitch classes, e.g. {C, C#, D, D#, E, F, F#, G, G#, A, A#, B}
var computeChroma = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(Y_LF, pitchClasses) {
    var C, _loop, c;
    return _regeneratorRuntime().wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          console.log("Step: Chroma");
          C = []; // Sum up all rows from the log-frequency spectrogram into their
          // respective pitch classes
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(c) {
            return _regeneratorRuntime().wrap(function _loop$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  C[c] = summedByCol(Y_LF.filter(function (e, index) {
                    return index % pitchClasses == c;
                  }));
                case 1:
                case "end":
                  return _context5.stop();
              }
            }, _loop);
          });
          c = 0;
        case 4:
          if (!(c < pitchClasses)) {
            _context6.next = 9;
            break;
          }
          return _context6.delegateYield(_loop(c), "t0", 6);
        case 6:
          c++;
          _context6.next = 4;
          break;
        case 9:
          _context6.t1 = scaled;
          _context6.t2 = C;
          _context6.next = 13;
          return getMaxFromNDimArr(C);
        case 13:
          _context6.t3 = _context6.sent;
          _context6.t4 = 1 / _context6.t3;
          _context6.next = 17;
          return (0, _context6.t1)(_context6.t2, _context6.t4);
        case 17:
          return _context6.abrupt("return", _context6.sent);
        case 18:
        case "end":
          return _context6.stop();
      }
    }, _callee5);
  }));
  return function computeChroma(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

// Normalize features
var normalizeFeature = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(X, threshhold) {
    var K, N, normX, v, n, sumOfSquares, k, s, _k, _k2;
    return _regeneratorRuntime().wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          console.log("Step: Normalize");
          K = pitchClasses;
          N = X[0].length; // Frames
          normX = arrayFilled(K, N);
          v = 1 / Math.sqrt(K);
          for (n = 0; n < N; n++) {
            sumOfSquares = 0;
            for (k = 0; k < K; k++) {
              sumOfSquares += Math.pow(X[k][n], 2);
            }
            s = Math.sqrt(sumOfSquares);
            if (s > threshhold) {
              for (_k = 0; _k < K; _k++) {
                normX[_k][n] = X[_k][n] / s;
              }
            } else {
              for (_k2 = 0; _k2 < K; _k2++) {
                normX[_k2][n] = v;
              }
            }
          }
          return _context7.abrupt("return", normX);
        case 7:
        case "end":
          return _context7.stop();
      }
    }, _callee6);
  }));
  return function normalizeFeature(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

// Read the MIDI file
function parseMIDI(_x12) {
  return _parseMIDI.apply(this, arguments);
} // Compute chroma from MIDI, all in one
function _parseMIDI() {
  _parseMIDI = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(file) {
    var currentMidi;
    return _regeneratorRuntime().wrap(function _callee8$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          console.log("Step: Parse MIDI");
          currentMidi = null;
          return _context9.abrupt("return", new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (e) {
              var midi = new Midi(e.target.result);
              currentMidi = midi;
              resolve(currentMidi);
            };
            reader.readAsArrayBuffer(file);
          }));
        case 3:
        case "end":
          return _context9.stop();
      }
    }, _callee8);
  }));
  return _parseMIDI.apply(this, arguments);
}
var analyseMIDI = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(file) {
    var midi, ratio, C, tracks, totalTracksNum, i, trackNotesNum, j, currentTrackNote, pitch, noteOnTime, durationNote, noteOffTime, k;
    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          console.log("Step: Analyse MIDI");
          _context8.next = 3;
          return parseMIDI(file);
        case 3:
          midi = _context8.sent;
          // At ratio = 1000, there would be a column for each ms, which makes the computation needlessly slow. 
          // Thus, this reduces the temporal resolution
          ratio = 1000 / 20; // This defines the time grid resolution of the features
          C = arrayFilled(pitchClasses, Math.round(midi.duration * ratio)); // Get duration of the entire MIDI file
          // console.log(midi);
          console.log("--MIDI duration: ".concat(convertHMS(midi.duration), " minutes"));
          tracks = midi.tracks;
          totalTracksNum = midi.tracks.length;
          for (i = 0; i < totalTracksNum; i++) {
            trackNotesNum = tracks[i].notes.length;
            for (j = 0; j < trackNotesNum; j++) {
              currentTrackNote = tracks[i].notes[j]; // Readability
              pitch = currentTrackNote.midi % pitchClasses;
              noteOnTime = Math.round(currentTrackNote.time * ratio);
              durationNote = Math.round(currentTrackNote.duration * ratio); // Add the notes in the feature matrix by their velocities (over all tracks)
              noteOffTime = noteOnTime + durationNote;
              for (k = noteOnTime; k < noteOffTime; k++) {
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
          _context8.next = 13;
          return normalizeFeature(C, 0.001);
        case 13:
          return _context8.abrupt("return", _context8.sent);
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee7);
  }));
  return function analyseMIDI(_x13) {
    return _ref7.apply(this, arguments);
  };
}();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58608" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/extractFeatures.js"], null)
//# sourceMappingURL=/extractFeatures.b4b1f798.js.map