import type { Accidental, PitchName, PitchLetter, Note } from "./types";

export function splitPitchName(pitchName: PitchName): [PitchLetter, Accidental] {
    // Is there a better way to handle this? Is it worth making PitchClass its own typed object with fields?
    return [pitchName.slice(0, 1) as PitchLetter, pitchName.slice(1) as Accidental];
}

export function makePitchName(pitchLetter: PitchLetter, accidental: Accidental): PitchName {
    return `${pitchLetter}${accidental}` as PitchName;
}

export const PitchClasses = {
    'C': 0, 'Cn': 0, 'B#': 0, 'Dbb': 0,
    'C#': 1, 'Db': 1, 'B##': 1,
    'D': 2, 'Dn': 2, 'C##': 2, 'Ebb': 2,
    'D#': 3, 'Eb': 3, 'Fbb': 3,
    'E': 4, 'En': 4, 'Fb': 4, 'D##': 4,
    'F': 5, 'Fn': 5, 'E#': 5, 'Gbb': 5,
    'F#': 6, 'Gb': 6, 'E##': 6,
    'G': 7, 'Gn': 7, 'F##': 7, 'Abb': 7,
    'G#': 8, 'Ab': 8,
    'A': 9, 'An': 9, 'G##': 9, 'Bbb': 9,
    'A#': 10, 'Bb': 10, 'Cbb': 10,
    'B': 11, 'Bn': 11, 'Cb': 11, 'A##': 11
} as const satisfies Record<string, number>;

const pitchClassToPitchNames: PitchName[][] =
    Object.entries(PitchClasses).reduce((acc, [name, cls]) => {
        (acc[cls] ??= []).push(name as PitchName);
        return acc;
    }, Array.from({ length: 12 }, () => [] as PitchName[]));

export function convertPitchNameToPitchClass(pitchName: PitchName) {
    return pitchClassToPitchNames.findIndex((aliases) => aliases.find(value => value === pitchName));
}

export function convertNoteToPitchNumber(note: Note): number {
    let register = note.register;
    let pitchClass = convertPitchNameToPitchClass(note.name);
    if (note.name === 'Cb') {
        register--;
    } else if (note.name === 'B#') {
        register++;
    }
    return pitchClass + ((register + 1) * 12);
}

// Will prefer natural > # name by default
export function convertPitchNumberToNote(pitchNumber: number): Note {
    return {
        name: pitchClassToPitchNames[pitchNumber % 12][0],
        register: Math.floor(pitchNumber / 12) - 1,
    };
}
