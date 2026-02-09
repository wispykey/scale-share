import { expect, test } from 'vitest'
import { buildScale } from '../music-theory/build-scale'

test("builds a C major scale", () => {
    expect(buildScale({
        type: 'major',
        tonic: 'C'
    })).toEqual({
        ascending: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        type: 'major'
    })
});

test("builds a C# major scale", () => {
    expect(buildScale({
        type: 'major',
        tonic: 'C#'
    })).toEqual({
        ascending: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
        type: 'major'
    })
});

test("builds a Gb major scale", () => {
    expect(buildScale({
        type: 'major',
        tonic: 'Gb'
    })).toEqual({
        ascending: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],
        type: 'major'
    })
});

test("builds an A natural minor scale", () => {
    expect(buildScale({
        type: 'natural-minor',
        tonic: 'A'
    })).toEqual({
        ascending: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        type: 'natural-minor'
    })
});

test("builds a G# natural minor scale", () => {
    expect(buildScale({
        type: 'natural-minor',
        tonic: 'G#'
    })).toEqual({
        ascending: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'],
        type: 'natural-minor'
    })
});

test("builds an Ab natural minor scale", () => {
    expect(buildScale({
        type: 'natural-minor',
        tonic: 'Ab'
    })).toEqual({
        ascending: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'],
        type: 'natural-minor'
    })
});


test("builds an A natural minor scale as base, even when harmonic is specified", () => {
    expect(buildScale({
        type: 'harmonic-minor',
        tonic: 'A'
    })).toEqual({
        ascending: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        type: 'harmonic-minor'
    })
});


test("builds an Ab natural minor scale as base, even when harmonic is specified", () => {
    expect(buildScale({
        type: 'harmonic-minor',
        tonic: 'Ab'
    })).toEqual({
        ascending: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'],
        type: 'harmonic-minor'
    })
});

test("builds a D# natural minor scale as base, even when harmonic is specified", () => {
    expect(buildScale({
        type: 'harmonic-minor',
        tonic: 'D#'
    })).toEqual({
        ascending: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'],
        type: 'harmonic-minor'
    })
});


test("builds a C natural minor scale as base, even when melodic is specified", () => {
    expect(buildScale({
        type: 'melodic-minor',
        tonic: 'C'
    })).toEqual({
        ascending: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
        type: 'melodic-minor'
    })
});


test("builds a D# natural minor scale as base, even when melodic is specified", () => {
    expect(buildScale({
        type: 'melodic-minor',
        tonic: 'D#'
    })).toEqual({
        ascending: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'],
        type: 'melodic-minor'
    })
});
