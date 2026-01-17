/**
 * Types to represent notes and scales independent of register
 */

export const PitchLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type PitchLetter = typeof PitchLetters[number];

// Must be in decreasing order to allow greedy approach when filling final measure
export const NoteDurations = ['w', 'h.', 'h', 'q.', 'q', '8.', '8', '16'] as const;
export type NoteDuration = typeof NoteDurations[number];

export type Accidental = '#' | '##' | 'b' | 'bb' | 'n' | '';
export type Articulation = 's' | 't';

export type PitchClass = `${PitchLetter}${Accidental}`;

export type PitchCollection = PitchClass[];

export type Scale = {
    ascending: PitchCollection,
    descending?: PitchCollection,
}

export type ScaleType =
    'major' |
    'natural-minor' |
    'harmonic-minor' |
    'melodic-minor';