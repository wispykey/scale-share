import { expect, test } from 'vitest'
import { buildScale } from '../music-theory/build-scale'

test("builds a C major scale", () => {
    expect(buildScale({
        scaleType: 'major',
        tonic: 'C'
    })).toEqual({
        ascending: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        scaleType: 'major'
    })
});

test("builds a C# major scale", () => {
    expect(buildScale({
        scaleType: 'major',
        tonic: 'C#'
    })).toEqual({
        ascending: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
        scaleType: 'major'
    })
});

test("builds a Gb major scale", () => {
    expect(buildScale({
        scaleType: 'major',
        tonic: 'Gb'
    })).toEqual({
        ascending: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],
        scaleType: 'major'
    })
});

test("builds an A natural minor scale", () => {
    expect(buildScale({
        scaleType: 'natural-minor',
        tonic: 'A'
    })).toEqual({
        ascending: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        scaleType: 'natural-minor'
    })
});

test("builds a G# natural minor scale", () => {
    expect(buildScale({
        scaleType: 'natural-minor',
        tonic: 'G#'
    })).toEqual({
        ascending: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'],
        scaleType: 'natural-minor'
    })
});

test("builds an Ab natural minor scale", () => {
    expect(buildScale({
        scaleType: 'natural-minor',
        tonic: 'Ab'
    })).toEqual({
        ascending: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'],
        scaleType: 'natural-minor'
    })
});


test("builds an A natural minor scale as base, even when harmonic is specified", () => {
    expect(buildScale({
        scaleType: 'harmonic-minor',
        tonic: 'A'
    })).toEqual({
        ascending: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        scaleType: 'harmonic-minor'
    })
});


test("builds an Ab natural minor scale as base, even when harmonic is specified", () => {
    expect(buildScale({
        scaleType: 'harmonic-minor',
        tonic: 'Ab'
    })).toEqual({
        ascending: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'],
        scaleType: 'harmonic-minor'
    })
});

test("builds a D# natural minor scale as base, even when harmonic is specified", () => {
    expect(buildScale({
        scaleType: 'harmonic-minor',
        tonic: 'D#'
    })).toEqual({
        ascending: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'],
        scaleType: 'harmonic-minor'
    })
});


test("builds a C natural minor scale as base, even when melodic is specified", () => {
    expect(buildScale({
        scaleType: 'melodic-minor',
        tonic: 'C'
    })).toEqual({
        ascending: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
        scaleType: 'melodic-minor'
    })
});


test("builds a D# natural minor scale as base, even when melodic is specified", () => {
    expect(buildScale({
        scaleType: 'melodic-minor',
        tonic: 'D#'
    })).toEqual({
        ascending: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'],
        scaleType: 'melodic-minor'
    })
});


test("builds a C major triad arpeggio", () => {
    expect(buildScale({
        scaleType: 'major-triad-arpeggio',
        tonic: 'C'
    })).toEqual({
        ascending: ['C', 'E', 'G'],
        scaleType: 'major-triad-arpeggio'
    })
});

test("builds a F# major triad arpeggio", () => {
    expect(buildScale({
        scaleType: 'major-triad-arpeggio',
        tonic: 'F#'
    })).toEqual({
        ascending: ['F#', 'A#', 'C#'],
        scaleType: 'major-triad-arpeggio'
    })
});


test("builds a F# minor triad arpeggio", () => {
    expect(buildScale({
        scaleType: 'minor-triad-arpeggio',
        tonic: 'F#'
    })).toEqual({
        ascending: ['F#', 'A', 'C#'],
        scaleType: 'minor-triad-arpeggio'
    })
});

