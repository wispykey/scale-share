import { type Accidental, type PitchName, type PitchLetter, type Note, type Interval, NaturalMinorScaleNotes, MajorScaleNotes, Accidentals, type MajorScaleKey, type MinorScaleKey } from "./types";

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

export function note(noteName: PitchName, noteRegister: number) {
    return { name: noteName, register: noteRegister }
}

export function notes(noteString: string): Note[] {
    return noteString
        .trim()
        .split(/\s+/)
        .map(token => {
            const match = token.match(/^([A-G])(bb|b|##|#|n)?(\d+)$/);
            if (!match) {
                throw new Error(`Invalid note: ${token}`);
            }
            const [, letter, accidental = "", register] = match;

            return {
                // Can we strengthen/prove these 
                name: makePitchName(letter as PitchLetter, accidental as Accidental),
                register: Number(register),
            };
        });
}

export function modifyPitchName(mode: 'raise' | 'lower', pitchName: PitchName): PitchName {

    const naturalIndex = Accidentals.findIndex(a => a === '');
    const [pitchLetter, pitchAccidental] = splitPitchName(pitchName);

    let accidentalIndex = Accidentals.findIndex(a => a === pitchAccidental);

    if (accidentalIndex < 0) {
        accidentalIndex = naturalIndex;
    }

    if (mode === 'raise' && accidentalIndex === Accidentals.length - 1) {
        console.error(`Cannot raise a double sharp (##); aborting raising of ${pitchName}`);
        return pitchName;
    }

    if (mode === 'lower' && accidentalIndex === 0) {
        console.error(`Cannot lower a double flat (bb) aborting raising of ${pitchName}`);
        return pitchName;
    }

    let direction = mode === 'raise' ? 1 : -1;
    accidentalIndex += direction;
    let newAccidental = (accidentalIndex === naturalIndex) ? '' : Accidentals[accidentalIndex];

    return makePitchName(pitchLetter, newAccidental);
}


export function getPitchNameFromInterval(pitchName: PitchName, interval: Interval) {
    // Parse
    if (interval.length != 2) return;

    let quality = interval.charAt(0);
    let size = +interval.charAt(1);

    // Validate
    if (!(['m', 'M', 'd', 'P', 'A'].includes(quality))) return;
    if (!size || size > 7 || size < 1) return;

    // Use major scale and major intervals as a starting reference point
    let scale = MajorScaleNotes[pitchName as keyof typeof MajorScaleNotes];
    if (!scale) return;

    switch (quality) {
        case 'm':
            return modifyPitchName('lower', scale[size - 1]);
        case 'd':
            // Perfect intervals (e.g. P1, P4, P5) are only one step away from diminished
            if (size === 1 || size === 4 || size === 5) {
                return modifyPitchName('lower', scale[size - 1]);
            } else {
                // All others are two steps away
                return modifyPitchName('lower', modifyPitchName('lower', scale[size - 1]));
            }
        case 'A':
            if (size === 1 || size === 4 || size === 5) {
                return modifyPitchName('raise', scale[size - 1]);
            } else {
                return modifyPitchName('raise', modifyPitchName('raise', scale[size - 1]));
            }
        case 'P':
        case 'M':
        default:
            return scale[size - 1];
    }


}


export function isMajorScaleKey(value: string): value is MajorScaleKey {
    return value in MajorScaleNotes;
}

export function isMinorScaleKey(value: string): value is MinorScaleKey {
    return value in NaturalMinorScaleNotes;
}