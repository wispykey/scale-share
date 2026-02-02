/**
 * Types to represent notes and scales independent of register
 */

// Order matters; starts on 'A' for simplified ASCII-based arithmetic
export const PitchLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type PitchLetter = typeof PitchLetters[number];

// Must be in decreasing order to allow greedy approach when filling final measure
export const NoteDurations = ['w', 'h.', 'h', 'q.', 'q', '8.', '8', '16'] as const;
export type NoteDuration = typeof NoteDurations[number];

export const Accidentals = ['bb', 'b', '', '#', '##'] as const;
export type Accidental = typeof Accidentals[number];

export type Articulation = 's' | 't';

export type PitchName = `${PitchLetter}${Accidental}`;

export type PitchCollection = PitchName[];

export type Scale = {
    ascending: PitchCollection,
    descending?: PitchCollection,
}

export type ScaleType =
    'major' |
    'natural-minor' |
    'harmonic-minor' |
    'melodic-minor';


export type Note = {
    name: PitchName,
    register: number,
    duration?: NoteDuration,
    isRest?: boolean
    // isTiedToNextNote: boolean - to support a 'linked list' implementation of ties
}


export const ScaleIntervalsMap = {
    'major': ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'],
    'natural-minor': ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    // Harmonic and melodic minor scales are implemented as contextual rules 
} as const satisfies Partial<Record<ScaleType, readonly Interval[]>>;


export const Intervals = [
    'P1', 'A1',
    'm2', 'M2', 'd2', 'A2',
    'm3', 'M3', 'd3', 'A3',
    'P4', 'd4', 'A4',
    'd5', 'P5', 'A5',
    'm6', 'M6', 'd6', 'A6',
    'm7', 'M7', 'd7', 'A7',
    // We do not support octave intervals (other than implied P8), in order to cleanly loop back to tonic always
] as const;
export type Interval = typeof Intervals[number];

// Currently do not support keys with double-sharps/flats in key signature
export const MajorScaleNotes = {
    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'C#': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
    'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
    'Gb': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],
    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
    'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
    'Cb': ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb'],
} as const satisfies Partial<Record<PitchName, PitchName[]>>;


export const NaturalMinorScaleNotes = {
    'A': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    'A#': ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#'],
    'Bb': ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'],
    'B': ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
    'C': ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    'C#': ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'],
    'D': ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
    'D#': ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'],
    'Eb': ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'],
    'E': ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
    'F': ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'],
    'F#': ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'],
    'G': ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
    'G#': ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'],
    'Ab': ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'],
} as const satisfies Partial<Record<PitchName, PitchName[]>>;