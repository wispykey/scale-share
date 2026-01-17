import type { Accidental, PitchClass, PitchLetter } from "./types";

export function splitPitchName(pitchName: PitchClass): [PitchLetter, Accidental] {
    // Is there a better way to handle this? Is it worth making PitchClass its own typed object with fields?
    return [pitchName.slice(0, 1) as PitchLetter, pitchName.slice(1) as Accidental];
}

export function makePitchName(pitchLetter: PitchLetter, accidental: Accidental): PitchClass {
    return `${pitchLetter}${accidental}` as PitchClass;
}
