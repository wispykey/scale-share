import { expect, test } from 'vitest'
import { buildScale } from '../music-theory/build-scale'

test("builds a C major scale", () => {
    expect(buildScale({
        type: 'major',
        tonic: 'C'
    })).toEqual({
        ascending: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    })
});

test("builds a C# major scale", () => {
    expect(buildScale({
        type: 'major',
        tonic: 'C#'
    })).toEqual({
        ascending: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#']
    })
});

test("builds a Gb major scale", () => {
    expect(buildScale({
        type: 'major',
        tonic: 'Gb'
    })).toEqual({
        ascending: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F']
    })
});

test("builds an A natural minor scale", () => {
    expect(buildScale({
        type: 'natural-minor',
        tonic: 'A'
    })).toEqual({
        ascending: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    })
});

test("builds a G# natural minor scale", () => {
    expect(buildScale({
        type: 'natural-minor',
        tonic: 'G#'
    })).toEqual({
        ascending: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#']
    })
});

test("builds an Ab natural minor scale", () => {
    expect(buildScale({
        type: 'natural-minor',
        tonic: 'Ab'
    })).toEqual({
        ascending: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb']
    })
});


test("builds an A harmonic minor scale", () => {
    expect(buildScale({
        type: 'harmonic-minor',
        tonic: 'A'
    })).toEqual({
        ascending: ['A', 'B', 'C', 'D', 'E', 'F', 'G#']
    })
});


test("builds an Ab harmonic minor scale", () => {
    expect(buildScale({
        type: 'harmonic-minor',
        tonic: 'Ab'
    })).toEqual({
        ascending: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'G']
    })
});

test("builds a D# harmonic minor scale", () => {
    expect(buildScale({
        type: 'harmonic-minor',
        tonic: 'D#'
    })).toEqual({
        ascending: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C##']
    })
});


test("builds a C melodic minor scale", () => {
    expect(buildScale({
        type: 'melodic-minor',
        tonic: 'C'
    })).toEqual({
        ascending: ['C', 'D', 'Eb', 'F', 'G', 'A', 'B'],
        descending: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb']
    })
});

test("builds a D# melodic minor scale", () => {
    expect(buildScale({
        type: 'melodic-minor',
        tonic: 'D#'
    })).toEqual({
        ascending: ['D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C##'],
        descending: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#']
    })
});
