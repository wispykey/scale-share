import { expect, test } from 'vitest'
import { convertNoteToPitchNumber, convertPitchNameToPitchClass, convertPitchNumberToNote, note, notes } from '../music-theory/utils'


test("convert C4 to pitch number", () => {
    expect(convertNoteToPitchNumber({
        name: "C",
        register: 4
    })).toEqual(60);
});

test("convert Cb4 to pitch number", () => {
    expect(convertNoteToPitchNumber({
        name: "Cb",
        register: 4
    })).toEqual(59);
});

test("convert B#3 to pitch number", () => {
    expect(convertNoteToPitchNumber({
        name: "B#",
        register: 3
    })).toEqual(60);
});

test("convert Cb5 to pitch number", () => {
    expect(convertNoteToPitchNumber({
        name: "Cb",
        register: 5
    })).toEqual(71);
});

test("convert B#4 to pitch number", () => {
    expect(convertNoteToPitchNumber({
        name: "B#",
        register: 4
    })).toEqual(72);
});

test("convert C to pitch class", () => {
    expect(convertPitchNameToPitchClass("C")).toEqual(0);
});

test("convert F to pitch class", () => {
    expect(convertPitchNameToPitchClass("F")).toEqual(5);
});

test("convert B to pitch class", () => {
    expect(convertPitchNameToPitchClass("B")).toEqual(11);
});

test("convert B# to pitch class", () => {
    expect(convertPitchNameToPitchClass("B#")).toEqual(0);
});

test("convert B## to pitch class", () => {
    expect(convertPitchNameToPitchClass("B##")).toEqual(1);
});

test("convert Cb to pitch class", () => {
    expect(convertPitchNameToPitchClass("Cb")).toEqual(11);
});

test("convert Cbb to pitch class", () => {
    expect(convertPitchNameToPitchClass("Cbb")).toEqual(10);
});


test("convert 60 to C4", () => {
    expect(convertPitchNumberToNote(60)).toEqual({
        name: "C",
        register: 4
    });
});

test("convert 66 to F#4", () => {
    expect(convertPitchNumberToNote(66)).toEqual({
        name: "F#",
        register: 4
    });
});

test("convert 71 to B4", () => {
    expect(convertPitchNumberToNote(71)).toEqual({
        name: "B",
        register: 4
    });
});


test("convert valid notes in note string", () => {
    expect(notes("C4 D#4 F##4 G5 B3 Bb2 Bbb6 A4")).toEqual([
        note("C", 4),
        note("D#", 4),
        note("F##", 4),
        note("G", 5),
        note("B", 3),
        note("Bb", 2),
        note("Bbb", 6),
        note("A", 4)
    ])
});

// test("throw on invalid notes in note string", () => {
//     expect(notes("C")).toThrow(Error);
// })