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