import type { PitchName } from "./types";

export const MAJOR_KEY_SIGNATURES: Record<string, PitchName[]> = {
    "C": [],

    "G": ["F#"],
    "D": ["F#", "C#"],
    "A": ["F#", "C#", "G#"],
    "E": ["F#", "C#", "G#", "D#"],
    "B": ["F#", "C#", "G#", "D#", "A#"],
    "F#": ["F#", "C#", "G#", "D#", "A#", "E#"],
    "C#": ["F#", "C#", "G#", "D#", "A#", "E#", "B#"],

    "F": ["Bb"],
    "Bb": ["Bb", "Eb"],
    "Eb": ["Bb", "Eb", "Ab"],
    "Ab": ["Bb", "Eb", "Ab", "Db"],
    "Db": ["Bb", "Eb", "Ab", "Db", "Gb"],
    "Gb": ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"],
    "Cb": ["Bb", "Eb", "Ab", "Db", "Gb", "Cb", "Fb"]
};

export const MINOR_KEY_SIGNATURES: Record<string, PitchName[]> = {
    "A": [],

    "E": ["F#"],
    "B": ["F#", "C#"],
    "F#": ["F#", "C#", "G#"],
    "C#": ["F#", "C#", "G#", "D#"],
    "G#": ["F#", "C#", "G#", "D#", "A#"],
    "D#": ["F#", "C#", "G#", "D#", "A#", "E#"],
    "A#": ["F#", "C#", "G#", "D#", "A#", "E#", "B#"],

    "D": ["Bb"],
    "G": ["Bb", "Eb"],
    "C": ["Bb", "Eb", "Ab"],
    "F": ["Bb", "Eb", "Ab", "Db"],
    "Bb": ["Bb", "Eb", "Ab", "Db", "Gb"],
    "Eb": ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"],
    "Ab": ["Bb", "Eb", "Ab", "Db", "Gb", "Cb", "Fb"]
};
