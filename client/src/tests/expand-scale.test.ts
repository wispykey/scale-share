import { expect, test } from "vitest";
import type { Scale } from "../music-theory/types";
import { expandScale } from "../music-theory/expand-scale";
import { note, notes } from "../music-theory/utils";
import { buildScale } from "../music-theory/build-scale";


const cMajor: Scale = buildScale({
    tonic: 'C',
    type: 'major'
});

const cMajorTriad: Scale = buildScale({
    tonic: 'C',
    type: 'major-triad-arpeggio'
})

const fSharpMajor: Scale = buildScale({
    tonic: 'F#',
    type: 'major'
});

const aMelodicMinor: Scale = buildScale({
    tonic: 'A',
    type: 'melodic-minor'
});

test("should create C major one octave", () => {
    expect(expandScale(cMajor, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("B", 7), // set 'maxNote' deliberately high so that 'octaves' restricts range
        octaves: 1
    })).toEqual(
        notes("C4 D4 E4 F4 G4 A4 B4 C5 \
            B4 A4 G4 F4 E4 D4 C4")
    );
});

test("should create C major two octaves", () => {
    expect(expandScale(cMajor, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("B", 7),
        octaves: 2
    })).toEqual(
        notes("C4 D4 E4 F4 G4 A4 B4 C5 \
            D5 E5 F5 G5 A5 B5 C6 \
            B5 A5 G5 F5 E5 D5 C5 \
            B4 A4 G4 F4 E4 D4 C4")
    );
});

test("should create C major first five notes", () => {
    expect(expandScale(cMajor, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("G", 4), // set 'maxNote' deliberately low so that it restricts range instead of 'octaves'
        octaves: 1
    })).toEqual(
        notes("C4 D4 E4 F4 G4 F4 E4 D4 C4")
    );
});

test("should create C major full range (small)", () => {
    expect(expandScale(cMajor, {
        initialRegister: 4,
        minNote: note("B", 3),
        maxNote: note("G", 4),
        // no octaves specified; should follow ascend-to-max, descend-to-min, ascend-to-start-position
    })).toEqual(
        notes("C4 D4 E4 F4 G4 \
            F4 E4 D4 C4 \
            B3 C4")
    );
});


test("should create C major full range (large)", () => {
    expect(expandScale(cMajor, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("F", 6),
    })).toEqual(
        notes("C4 D4 E4 F4 G4 A4 B4 C5 \
            D5 E5 F5 G5 A5 B5 C6 \
            D6 E6 F6 E6 D6 C6 \
            B5 A5 G5 F5 E5 D5 C5 \
            B4 A4 G4 F4 E4 D4 C4")
    );
});

test("should create F# major without top F#", () => {
    expect(expandScale(fSharpMajor, {
        initialRegister: 3,
        minNote: note("F#", 3),
        maxNote: note("F", 4),
    })).toEqual(
        notes("F#3 G#3 A#3 B3 C#4 D#4 E#4 \
                D#4 C#4 B3 A#3 G#3 F#3")
    );
});

test("should create F# major with enharmonic max range note", () => {
    expect(expandScale(fSharpMajor, {
        initialRegister: 3,
        minNote: note("F#", 3),
        maxNote: note("Gb", 4),
    })).toEqual(
        notes("F#3 G#3 A#3 B3 C#4 D#4 E#4 F#4 \
            E#4 D#4 C#4 B3 A#3 G#3 F#3")
    );
});


test("should create A melodic minor full range", () => {
    expect(expandScale(aMelodicMinor, {
        initialRegister: 4,
        minNote: note("Bb", 3),
        maxNote: note("E", 6)
    })).toEqual(
        notes("A4 B4 C5 D5 E5 F#5 G#5 \
            A5 B5 C6 D6 E6 \
            D6 C6 B5 A5 \
            G5 F5 E5 D5 C5 B4 A4 \
            G4 F4 E4 D4 C4 B3 \
            C4 D4 E4 F#4 G#4 A4")
    );
});


test("should create A melodic minor full range, with max range on raised scale degree 6", () => {
    expect(expandScale(aMelodicMinor, {
        initialRegister: 4,
        minNote: note("Bb", 3),
        maxNote: note("F#", 6)
    })).toEqual(
        notes("A4 B4 C5 D5 E5 F#5 G#5 \
            A5 B5 C6 D6 E6 F#6 \
            E6 D6 C6 B5 A5 \
            G5 F5 E5 D5 C5 B4 A4 \
            G4 F4 E4 D4 C4 B3 \
            C4 D4 E4 F#4 G#4 A4")
    );
});

test("should create A melodic minor full range, with max range on raised scale degree 7", () => {
    expect(expandScale(aMelodicMinor, {
        initialRegister: 4,
        minNote: note("Bb", 3),
        maxNote: note("G#", 6)
    })).toEqual(
        notes("A4 B4 C5 D5 E5 F#5 G#5 \
            A5 B5 C6 D6 E6 F#6 G#6 \
            F#6 E6 D6 C6 B5 A5 \
            G5 F5 E5 D5 C5 B4 A4 \
            G4 F4 E4 D4 C4 B3 \
            C4 D4 E4 F#4 G#4 A4")
    );
});

test("should create A melodic minor full range, with max range on natural scale degree 6", () => {
    expect(expandScale(aMelodicMinor, {
        initialRegister: 4,
        minNote: note("Bb", 3),
        maxNote: note("F", 6)
    })).toEqual(
        // Note the lack of F#6 at the top of range
        notes("A4 B4 C5 D5 E5 F#5 G#5 \
            A5 B5 C6 D6 E6 \
            D6 C6 B5 A5 \
            G5 F5 E5 D5 C5 B4 A4 \
            G4 F4 E4 D4 C4 B3 \
            C4 D4 E4 F#4 G#4 A4")
    );
});

test("should create A melodic minor full range, with max range on natural scale degree 7", () => {
    expect(expandScale(aMelodicMinor, {
        initialRegister: 4,
        minNote: note("Bb", 3),
        maxNote: note("G", 6)
    })).toEqual(
        notes("A4 B4 C5 D5 E5 F#5 G#5 \
            A5 B5 C6 D6 E6 F#6 \
            E6 D6 C6 B5 A5 \
            G5 F5 E5 D5 C5 B4 A4 \
            G4 F4 E4 D4 C4 B3 \
            C4 D4 E4 F#4 G#4 A4")
    );
});

test("should create A melodic minor full range, with min range on raised scale degree 7", () => {
    expect(expandScale(aMelodicMinor, {
        initialRegister: 4,
        minNote: note("G#", 4),
        maxNote: note("A", 5)
    })).toEqual(
        notes("A4 B4 C5 D5 E5 F#5 G#5 A5 \
            G5 F5 E5 D5 C5 B4 A4")
    );
});

test("should create A melodic minor full range, with min range on natural scale degree 7", () => {
    expect(expandScale(aMelodicMinor, {
        initialRegister: 4,
        minNote: note("G", 4),
        maxNote: note("A", 5)
    })).toEqual(
        notes("A4 B4 C5 D5 E5 F#5 G#5 A5 \
            G5 F5 E5 D5 C5 B4 A4 \
            G4 A4")
    );
});

test("should create A melodic minor full range, with min range on raised scale degree 6", () => {
    expect(expandScale(aMelodicMinor, {
        initialRegister: 4,
        minNote: note("F#", 4),
        maxNote: note("A", 5)
    })).toEqual(
        notes("A4 B4 C5 D5 E5 F#5 G#5 A5 \
            G5 F5 E5 D5 C5 B4 A4 \
            G4 A4")
    );
});

test("should create A melodic minor full range, with min range on natural scale degree 6", () => {
    expect(expandScale(aMelodicMinor, {
        initialRegister: 4,
        minNote: note("F", 4),
        maxNote: note("A", 5)
    })).toEqual(
        notes("A4 B4 C5 D5 E5 F#5 G#5 A5 \
            G5 F5 E5 D5 C5 B4 A4 \
            G4 F4 G4 A4")
    );
});

test("should create one octave C major arpeggio", () => {
    expect(expandScale(cMajorTriad, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("C", 5)
    })).toEqual(
        notes("C4 E4 G4 C5 G4 E4 C4")
    );
});