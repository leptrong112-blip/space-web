/**
 * SpaceAudio - Web Audio API synthesizer for cosmic ambiance and sound effects.
 * 100% offline, zero-dependency, works without remote CDNs or external audio servers.
 */
(() => {
    let ctx = null;
    let ambientGain = null;
    let ambientNodes = [];
    let isAmbientPlaying = false;

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

        startAmbient(volume = 0.3) {
            const c = getContext();
            if (!c) return false;
            this.stopAmbient(0.3);

            isAmbientPlaying = true;
            ambientGain = c.createGain();
            ambientGain.gain.setValueAtTime(0.001, c.currentTime);
            ambientGain.gain.exponentialRampToValueAtTime(Math.max(volume, 0.01), c.currentTime + 2.5);
            ambientGain.connect(c.destination);

            // Filter for deep, gentle warmth
            const filter = c.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(220, c.currentTime);
            filter.Q.setValueAtTime(3, c.currentTime);
            filter.connect(ambientGain);

            // Subtle LFO modulation on filter for breathing space effect
            const lfo = c.createOscillator();
            const lfoGain = c.createGain();
            lfo.frequency.setValueAtTime(0.08, c.currentTime); // very slow oscillation
            lfoGain.gain.setValueAtTime(80, c.currentTime);
            lfo.connect(lfoGain);
            lfoGain.connect(filter.frequency);
            lfo.start();

            // Layer 1: Deep sub drone (55Hz - A1)
            const osc1 = c.createOscillator();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(55, c.currentTime);
            const g1 = c.createGain();
            g1.gain.setValueAtTime(0.6, c.currentTime);
            osc1.connect(g1);
            g1.connect(filter);
            osc1.start();

            // Layer 2: Detuned fifth (82.4Hz - E2)
            const osc2 = c.createOscillator();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(82.4, c.currentTime);
            const g2 = c.createGain();
            g2.gain.setValueAtTime(0.35, c.currentTime);
            osc2.connect(g2);
            g2.connect(filter);
            osc2.start();

            // Layer 3: Warm octave shimmer (110Hz - A2 with detune)
            const osc3 = c.createOscillator();
            osc3.type = 'triangle';
            osc3.frequency.setValueAtTime(110, c.currentTime);
            osc3.detune.setValueAtTime(7, c.currentTime);
            const g3 = c.createGain();
            g3.gain.setValueAtTime(0.15, c.currentTime);
            osc3.connect(g3);
            g3.connect(filter);
            osc3.start();

            ambientNodes = [osc1, osc2, osc3, lfo, g1, g2, g3, lfoGain, filter];
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
                ambientGain.gain.setValueAtTime(ambientGain.gain.value, now);
                ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + fadeSec);
                const nodesToStop = ambientNodes;
                setTimeout(() => {
                    nodesToStop.forEach(n => {
                        try { if (n.stop) n.stop(); n.disconnect(); } catch {}
                    });
                }, fadeSec * 1000 + 100);
            } catch {}
            ambientNodes = [];
            ambientGain = null;
            isAmbientPlaying = false;
        },

        toggleAmbient(volume = 0.3) {
            if (isAmbientPlaying) {
                this.stopAmbient();
                return false;
            } else {
                return this.startAmbient(volume);
            }
        },

        playWarp() {
            const c = getContext();
            if (!c) return;
            const now = c.currentTime;

            // Pitch rise
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(60, now);
            osc.frequency.exponentialRampToValueAtTime(900, now + 1.6);
            osc.frequency.exponentialRampToValueAtTime(40, now + 2.4);

            const filter = c.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(300, now);
            filter.frequency.exponentialRampToValueAtTime(3000, now + 1.4);
            filter.frequency.exponentialRampToValueAtTime(150, now + 2.5);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.4, now + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(c.destination);

            osc.start(now);
            osc.stop(now + 2.6);
        },

        playScan() {
            const c = getContext();
            if (!c) return;
            const now = c.currentTime;

            [520, 780, 1040].forEach((freq, idx) => {
                const osc = c.createOscillator();
                const gain = c.createGain();
                const start = now + idx * 0.08;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, start);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.5, start + 0.12);

                gain.gain.setValueAtTime(0.001, start);
                gain.gain.exponentialRampToValueAtTime(0.2, start + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.15);

                osc.connect(gain);
                gain.connect(c.destination);

                osc.start(start);
                osc.stop(start + 0.16);
            });
        },

        playEasterEgg() {
            const c = getContext();
            if (!c) return;
            const now = c.currentTime;

            // Celestial chime chord (Cmaj9)
            const freqs = [130.81, 196.00, 246.94, 293.66, 392.00, 493.88];
            freqs.forEach((freq, idx) => {
                const osc = c.createOscillator();
                const gain = c.createGain();
                const start = now + idx * 0.18;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, start);

                gain.gain.setValueAtTime(0.001, start);
                gain.gain.exponentialRampToValueAtTime(0.25 / (idx + 1), start + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + 3.5);

                osc.connect(gain);
                gain.connect(c.destination);

                osc.start(start);
                osc.stop(start + 3.6);
            });
        }
    };

    window.SpaceAudio = SpaceAudio;
})();
