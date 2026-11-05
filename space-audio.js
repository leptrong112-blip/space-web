/**
 * SpaceAudio - Web Audio API synthesizer for cosmic ambiance and sound effects.
 * Engineered for wide stereo openness, warm cinematic pads, and deep spatial reverb
 * (eliminating boxy/muffled mid-range resonance and harsh mono sawtooth sweeps).
 * 100% offline, zero-dependency.
 */
(() => {
    let ctx = null;
    let ambientGain = null;
    let ambientNodes = [];
    let isAmbientPlaying = false;
    let reverbBuffer = null;

    function getContext() {
        if (!ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) ctx = new AudioCtx();
        }
        if (ctx && ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
        }
        return ctx;
    }

    // Build a lush, wide stereo cosmic reverb impulse response so sounds breathe in open space
    // instead of feeling trapped inside the listener's ears.
    function getReverbImpulse(c) {
        if (reverbBuffer && reverbBuffer.sampleRate === c.sampleRate) {
            return reverbBuffer;
        }
        const duration = 3.4;
        const length = Math.floor(c.sampleRate * duration);
        const impulse = c.createBuffer(2, length, c.sampleRate);
        const left = impulse.getChannelData(0);
        const right = impulse.getChannelData(1);

        let lpL = 0, lpR = 0;
        for (let i = 0; i < length; i++) {
            const t = i / length;
            // Smooth pre-delay fade-in (first 35ms) + long exponential cosmic tail
            const env = Math.min(1, i / (c.sampleRate * 0.035)) * Math.pow(1 - t, 2.6);
            const rawL = (Math.random() * 2 - 1) * env;
            const rawR = (Math.random() * 2 - 1) * env;
            // Gentle damping so high frequencies decay naturally without harshness
            lpL = lpL * 0.72 + rawL * 0.28;
            lpR = lpR * 0.72 + rawR * 0.28;
            left[i] = lpL * 0.55;
            right[i] = lpR * 0.55;
        }
        reverbBuffer = impulse;
        return reverbBuffer;
    }

    function createStereoPanner(c, panValue) {
        if (c.createStereoPanner) {
            const p = c.createStereoPanner();
            p.pan.setValueAtTime(panValue, c.currentTime);
            return p;
        }
        const g = c.createGain();
        return g;
    }

    // Auto-unlock audio context on first user gesture
    const unlock = () => {
        const c = getContext();
        if (c && c.state === 'running') {
            ['click', 'keydown', 'touchstart'].forEach(e => window.removeEventListener(e, unlock));
        }
    };
    ['click', 'keydown', 'touchstart'].forEach(e => window.addEventListener(e, unlock, { passive: true }));

    const SpaceAudio = {
        get isPlaying() {
            return isAmbientPlaying;
        },

        startAmbient(volume = 0.24) {
            const c = getContext();
            if (!c) return false;
            this.stopAmbient(0.25);

            isAmbientPlaying = true;
            const now = c.currentTime;

            ambientGain = c.createGain();
            ambientGain.gain.setValueAtTime(0.0001, now);
            ambientGain.gain.exponentialRampToValueAtTime(Math.max(volume, 0.01), now + 2.8);
            ambientGain.connect(c.destination);

            // Stereo reverb bus for spaciousness
            const convolver = c.createConvolver();
            convolver.buffer = getReverbImpulse(c);
            const wetGain = c.createGain();
            wetGain.gain.setValueAtTime(0.65, now);
            convolver.connect(wetGain);
            wetGain.connect(ambientGain);

            const dryGain = c.createGain();
            dryGain.gain.setValueAtTime(0.55, now);
            dryGain.connect(ambientGain);

            // High-cut filter with ZERO resonant peak (Q = 0.5) at 1400Hz so the sound is warm & open,
            // never boxy or ear-plugging like a 220Hz Q=3 filter.
            const masterFilter = c.createBiquadFilter();
            masterFilter.type = 'lowpass';
            masterFilter.frequency.setValueAtTime(1350, now);
            masterFilter.Q.setValueAtTime(0.5, now);
            masterFilter.connect(dryGain);
            masterFilter.connect(convolver);

            // Slow breathing modulation on filter cutoff (950Hz <-> 1750Hz)
            const lfo = c.createOscillator();
            const lfoGain = c.createGain();
            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(0.055, now);
            lfoGain.gain.setValueAtTime(380, now);
            lfo.connect(lfoGain);
            lfoGain.connect(masterFilter.frequency);
            lfo.start(now);

            // Interstellar-inspired open cosmic chord (Dmaj9 / Aadd9 open voicing):
            // Pure sub foundation + wide stereo upper harmonics
            const voicesConfig = [
                { freq: 55.00,  type: 'sine',     gain: 0.34, pan:  0.0,  detune:  0 }, // A1 deep warm sub
                { freq: 110.00, type: 'sine',     gain: 0.22, pan: -0.35, detune: -4 }, // A2 left
                { freq: 164.81, type: 'sine',     gain: 0.18, pan:  0.38, detune:  5 }, // E3 right (open fifth)
                { freq: 220.00, type: 'triangle', gain: 0.09, pan: -0.62, detune:  7 }, // A3 wide left
                { freq: 246.94, type: 'sine',     gain: 0.11, pan:  0.58, detune: -6 }, // B3 wide right (9th air)
                { freq: 329.63, type: 'sine',     gain: 0.07, pan:  0.22, detune:  3 }  // E4 crystalline top
            ];

            ambientNodes = [convolver, wetGain, dryGain, masterFilter, lfo, lfoGain];

            voicesConfig.forEach(v => {
                const osc = c.createOscillator();
                osc.type = v.type;
                osc.frequency.setValueAtTime(v.freq, now);
                osc.detune.setValueAtTime(v.detune, now);

                const g = c.createGain();
                g.gain.setValueAtTime(v.gain, now);

                const panner = createStereoPanner(c, v.pan);
                osc.connect(g);
                g.connect(panner);
                panner.connect(masterFilter);
                osc.start(now);

                ambientNodes.push(osc, g, panner);
            });

            return true;
        },

        stopAmbient(fadeSec = 1.5) {
            if (!ambientGain || !ctx) {
                isAmbientPlaying = false;
                return;
            }
            try {
                const now = ctx.currentTime;
                ambientGain.gain.cancelScheduledValues(now);
                ambientGain.gain.setValueAtTime(Math.max(ambientGain.gain.value, 0.0001), now);
                ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + fadeSec);
                const nodesToStop = ambientNodes;
                setTimeout(() => {
                    nodesToStop.forEach(n => {
                        try { if (n.stop) n.stop(); n.disconnect(); } catch {}
                    });
                }, fadeSec * 1000 + 120);
            } catch {}
            ambientNodes = [];
            ambientGain = null;
            isAmbientPlaying = false;
        },

        toggleAmbient(volume = 0.24) {
            if (isAmbientPlaying) {
                this.stopAmbient();
                return false;
            } else {
                return this.startAmbient(volume);
            }
        },

        /**
         * Cinematic 3-stage Warp Sound:
         * 1. Silky stereo solar-wind air whoosh (opens the ears instead of clogging them)
         * 2. Deep, clean sub-bass gravity drop (felt in the chest, zero muddy 250Hz buzz)
         * 3. Luminous harmonic arrival bloom chord as the nebula unfolds before the ship
         */
        playWarp() {
            const c = getContext();
            if (!c) return;
            const now = c.currentTime;

            const master = c.createGain();
            master.gain.setValueAtTime(0.45, now);
            master.connect(c.destination);

            const reverb = c.createConvolver();
            reverb.buffer = getReverbImpulse(c);
            const revGain = c.createGain();
            revGain.gain.setValueAtTime(0.75, now);
            reverb.connect(revGain);
            revGain.connect(master);

            // 1. Wide Stereo Cosmic Wind (Filtered Velvet Noise - no harshness)
            const noiseDur = 4.6;
            const noiseLen = Math.floor(c.sampleRate * noiseDur);
            const noiseBuf = c.createBuffer(2, noiseLen, c.sampleRate);
            for (let ch = 0; ch < 2; ch++) {
                const data = noiseBuf.getChannelData(ch);
                let b0 = 0, b1 = 0, b2 = 0;
                for (let i = 0; i < noiseLen; i++) {
                    const w = Math.random() * 2 - 1;
                    // Soft pink-ish smoothing so it sounds like silk air, not static
                    b0 = 0.99 * b0 + w * 0.08;
                    b1 = 0.96 * b1 + w * 0.12;
                    b2 = 0.85 * b2 + w * 0.16;
                    data[i] = (b0 + b1 + b2) * 0.28;
                }
            }
            const noiseSrc = c.createBufferSource();
            noiseSrc.buffer = noiseBuf;

            // Notch out the boxy 200-450Hz range completely so ears feel open and clear!
            const antiMud = c.createBiquadFilter();
            antiMud.type = 'peaking';
            antiMud.frequency.setValueAtTime(310, now);
            antiMud.Q.setValueAtTime(1.2, now);
            antiMud.gain.setValueAtTime(-14, now);

            const windFilter = c.createBiquadFilter();
            windFilter.type = 'bandpass';
            windFilter.Q.setValueAtTime(0.65, now);
            windFilter.frequency.setValueAtTime(420, now);
            windFilter.frequency.exponentialRampToValueAtTime(2400, now + 1.8);
            windFilter.frequency.exponentialRampToValueAtTime(580, now + 4.4);

            const windGain = c.createGain();
            windGain.gain.setValueAtTime(0.001, now);
            windGain.gain.exponentialRampToValueAtTime(0.26, now + 1.5);
            windGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

            noiseSrc.connect(antiMud);
            antiMud.connect(windFilter);
            windFilter.connect(windGain);
            windGain.connect(master);
            windGain.connect(reverb);
            noiseSrc.start(now);
            noiseSrc.stop(now + noiseDur);

            // 2. Clean Sub-Bass Horizon Pulse (Pure Sine 68Hz -> 38Hz -> 55Hz)
            const subOsc = c.createOscillator();
            const subGain = c.createGain();
            subOsc.type = 'sine';
            subOsc.frequency.setValueAtTime(68, now);
            subOsc.frequency.exponentialRampToValueAtTime(38, now + 1.4);
            subOsc.frequency.exponentialRampToValueAtTime(55, now + 4.2);

            subGain.gain.setValueAtTime(0.001, now);
            subGain.gain.linearRampToValueAtTime(0.32, now + 0.45);
            subGain.gain.exponentialRampToValueAtTime(0.18, now + 2.4);
            subGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.4);

            subOsc.connect(subGain);
            subGain.connect(master);
            subOsc.start(now);
            subOsc.stop(now + 4.5);

            // 3. Shimmering Harmonic Glide & Arrival Bloom Chord (Aadd9 -> Dmaj9)
            // Instead of a rising siren, gentle crystalline intervals bloom as the destination appears
            const bloomNotes = [
                { freq: 110.00, start: 0.2, peak: 1.8, end: 5.2, gain: 0.14, pan: -0.3 }, // A2
                { freq: 164.81, start: 0.5, peak: 2.1, end: 5.4, gain: 0.13, pan:  0.35 }, // E3
                { freq: 220.00, start: 1.2, peak: 2.8, end: 5.6, gain: 0.11, pan: -0.55 }, // A3
                { freq: 277.18, start: 2.1, peak: 3.4, end: 5.8, gain: 0.10, pan:  0.52 }, // C#4 (Arrival warmth)
                { freq: 329.63, start: 2.4, peak: 3.7, end: 6.0, gain: 0.09, pan: -0.25 }, // E4
                { freq: 493.88, start: 2.7, peak: 3.9, end: 6.2, gain: 0.06, pan:  0.25 }  // B4 (Starlight air)
            ];

            bloomNotes.forEach(n => {
                const osc = c.createOscillator();
                const g = c.createGain();
                const pan = createStereoPanner(c, n.pan);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(n.freq * 0.995, now + n.start);
                osc.frequency.exponentialRampToValueAtTime(n.freq, now + n.peak);

                g.gain.setValueAtTime(0.0001, now + n.start);
                g.gain.exponentialRampToValueAtTime(n.gain, now + n.peak);
                g.gain.exponentialRampToValueAtTime(0.0001, now + n.end);

                osc.connect(g);
                g.connect(pan);
                pan.connect(reverb);
                pan.connect(master);

                osc.start(now + n.start);
                osc.stop(now + n.end + 0.1);
            });
        },

        playScan() {
            const c = getContext();
            if (!c) return;
            const now = c.currentTime;

            const reverb = c.createConvolver();
            reverb.buffer = getReverbImpulse(c);
            const revGain = c.createGain();
            revGain.gain.setValueAtTime(0.45, now);
            reverb.connect(revGain);
            revGain.connect(c.destination);

            // Delicate, warm glass-like harmonic chime when touching a celestial story point
            [440, 659.25, 880].forEach((freq, idx) => {
                const osc = c.createOscillator();
                const gain = c.createGain();
                const pan = createStereoPanner(c, (idx - 1) * 0.35);
                const start = now + idx * 0.09;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, start);

                gain.gain.setValueAtTime(0.0001, start);
                gain.gain.exponentialRampToValueAtTime(0.11 / (idx * 0.4 + 1), start + 0.03);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.4);

                osc.connect(gain);
                gain.connect(pan);
                pan.connect(c.destination);
                pan.connect(reverb);

                osc.start(start);
                osc.stop(start + 1.5);
            });
        },

        playEasterEgg() {
            const c = getContext();
            if (!c) return;
            const now = c.currentTime;

            const reverb = c.createConvolver();
            reverb.buffer = getReverbImpulse(c);
            reverb.connect(c.destination);

            // Celestial chime chord (Cmaj9)
            const freqs = [130.81, 196.00, 246.94, 293.66, 392.00, 493.88];
            freqs.forEach((freq, idx) => {
                const osc = c.createOscillator();
                const gain = c.createGain();
                const start = now + idx * 0.18;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, start);

                gain.gain.setValueAtTime(0.001, start);
                gain.gain.exponentialRampToValueAtTime(0.2 / (idx + 1), start + 0.06);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + 3.8);

                osc.connect(gain);
                gain.connect(c.destination);
                gain.connect(reverb);

                osc.start(start);
                osc.stop(start + 3.9);
            });
        }
    };

    window.SpaceAudio = SpaceAudio;
})();
