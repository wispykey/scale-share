import { expect, test } from "vitest";
import type { Scale } from "../music-theory/types";
import { expandScale } from "../music-theory/expand-scale";
import { note, notes } from "../music-theory/utils";


const scale: Scale = {
    ascending: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
}

test("should create C major one octave", () => {
    expect(expandScale(scale, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("B", 7),
        octaves: 1
    })).toEqual(
        notes("C4 D4 E4 F4 G4 A4 B4 C5 B4 A4 G4 F4 E4 D4 C4")
    );
});

test("should create C major two octaves", () => {
    expect(expandScale(scale, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("B", 7),
        octaves: 2
    })).toEqual(
        notes("C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5 G5 A5 B5 C6 B5 A5 G5 F5 E5 D5 C5 B4 A4 G4 F4 E4 D4 C4")
    );
});

test("should create C major first five notes", () => {
    expect(expandScale(scale, {
        initialRegister: 4,
        minNote: note("C", 4),
        maxNote: note("G", 4),
        octaves: 1
    })).toEqual(
        notes("C4 D4 E4 F4 G4 F4 E4 D4 C4")
    );
});

test("should create C major first five notes, then dip below to B3 and up", () => {
    expect(expandScale(scale, {
        initialRegister: 4,
        minNote: note("B", 3),
        maxNote: note("G", 4),
    })).toEqual(
        notes("C4 D4 E4 F4 G4 F4 E4 D4 C4 B3 C4")
    );
});