import { expect, test } from "vitest";
import type { Scale } from "../music-theory/types";
import { expandScale } from "../music-theory/expand-scale";
import { note, notes } from "../music-theory/utils";
import { buildScale } from "../music-theory/build-scale";


const cMajor: Scale = buildScale({
    tonic: 'C',
    scaleType: 'major'
});

const cMajorTriad: Scale = buildScale({
    tonic: 'C',
    scaleType: 'major-triad-arpeggio'
})

const cFlatMajor: Scale = buildScale({
    tonic: 'Cb',
    scaleType: 'major'
});

const cFlatMajorTriad: Scale = buildScale({
    tonic: 'Cb',
    scaleType: 'major-triad-arpeggio'
});

const aSharpMinor: Scale = buildScale({
    tonic: 'A#',
    scaleType: 'natural-minor'
});

const aSharpMinorTriad: Scale = buildScale({
    tonic: 'A#',
    scaleType: 'minor-triad-arpeggio'
});

const fSharpMajor: Scale = buildScale({
    tonic: 'F#',
    scaleType: 'major'
});

const aMelodicMinor: Scale = buildScale({
    tonic: 'A',
    scaleType: 'melodic-minor'
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


test("should create A# natural minor full range, using correct registers for B#", () => {
    expect(expandScale(cMajor, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("F", 6),
    })).toEqual(
        notes("A#4 B#4 C#5 D#5 E#5 F#5 G#5 \
            A#5 B#5 C#6 D#6 E#6 \
            D#6 C#6 B#5 A#5 \
            G#5 F#5 E#5 D#5 C#5 B#4 A#4 \
            G#4 F#4 E#4 D#4 C#4 B#3 \
            C#4 D#4 E#4 F#4 G#4 A#4")
    );
});

test("should create Cb major full range, using correct registers for Cb", () => {
    expect(expandScale(cFlatMajor, {
        initialRegister: 4,
        minNote: note("Cb", 4),
        maxNote: note("F", 6),
    })).toEqual(
        notes("Cb4 Db4 Eb4 Fb4 Gb4 Ab4 Bb4 Cb5 \
            Db5 Eb5 Fb5 Gb5 Ab5 Bb5 Cb6 \
            Db6 Eb6 Fb6 Eb6 Db6 Cb6 \
            Bb5 Ab5 Gb5 Fb5 Eb5 Db5 Cb5 \
            Bb4 Ab4 Gb4 Fb4 Eb4 Db4 Cb4")
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
        maxNote: note("C", 5),
    })).toEqual(
        notes("C4 E4 G4 C5 G4 E4 C4")
    );
});


test("should create one octave C major arpeggio due to range restriction", () => {
    expect(expandScale(cMajorTriad, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("C", 5),
        octaves: 2
    })).toEqual(
        notes("C4 E4 G4 C5 G4 E4 C4")
    );
});

test("should create two octave C major arpeggio despite larger range", () => {
    expect(expandScale(cMajorTriad, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("C", 7),
        octaves: 2
    })).toEqual(
        notes("C4 E4 G4 C5 E5 G5 C6 G5 E5 C5 G4 E4 C4")
    );
});


test("should create two octave C major arpeggio despite larger range", () => {
    expect(expandScale(cMajorTriad, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("C", 7),
        octaves: 2
    })).toEqual(
        notes("C4 E4 G4 C5 E5 G5 C6 G5 E5 C5 G4 E4 C4")
    );
});


test("should create a small, full-range C major arpeggio", () => {
    expect(expandScale(cMajorTriad, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("G", 4)
    })).toEqual(
        notes("C4 E4 G4 E4 C4")
    );
});

test("should create a small, full-range C major arpeggio that goes below starting note", () => {
    expect(expandScale(cMajorTriad, {
        initialRegister: 4,
        minNote: note("G", 3),
        maxNote: note("G", 4)
    })).toEqual(
        notes("C4 E4 G4 E4 C4 G3 C4")
    );
});


