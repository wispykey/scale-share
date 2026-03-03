import { expect, test } from 'vitest'
import { convertNoteToPitchNumber, convertPitchNameToPitchClass, convertPitchNumberToNote, findAscendingBoundaryIndex, getPitchNameFromInterval, note, notes } from '../music-theory/utils'


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


test("compute correct major intervals away from C", () => {
    expect(getPitchNameFromInterval('C', 'M2')).toEqual('D');
    expect(getPitchNameFromInterval('C', 'M3')).toEqual('E');
    expect(getPitchNameFromInterval('C', 'M6')).toEqual('A');
    expect(getPitchNameFromInterval('C', 'M7')).toEqual('B');
});

test("compute correct perfect intervals away from C", () => {
    expect(getPitchNameFromInterval('C', 'P1')).toEqual('C');
    expect(getPitchNameFromInterval('C', 'P4')).toEqual('F');
    expect(getPitchNameFromInterval('C', 'P5')).toEqual('G');
});

test("compute correct minor intervals away from C", () => {
    expect(getPitchNameFromInterval('C', 'm2')).toEqual('Db');
    expect(getPitchNameFromInterval('C', 'm3')).toEqual('Eb');
    expect(getPitchNameFromInterval('C', 'm6')).toEqual('Ab');
    expect(getPitchNameFromInterval('C', 'm7')).toEqual('Bb');
});

test("compute correct diminished intervals away from C", () => {
    expect(getPitchNameFromInterval('C', 'd2')).toEqual('Dbb');
    expect(getPitchNameFromInterval('C', 'd3')).toEqual('Ebb');
    expect(getPitchNameFromInterval('C', 'd4')).toEqual('Fb');
    expect(getPitchNameFromInterval('C', 'd5')).toEqual('Gb');
    expect(getPitchNameFromInterval('C', 'd6')).toEqual('Abb');
    expect(getPitchNameFromInterval('C', 'd7')).toEqual('Bbb');
});

test("compute correct augmented intervals away from C", () => {
    expect(getPitchNameFromInterval('C', 'A1')).toEqual('C#');
    expect(getPitchNameFromInterval('C', 'A2')).toEqual('D##');
    expect(getPitchNameFromInterval('C', 'A3')).toEqual('E##');
    expect(getPitchNameFromInterval('C', 'A4')).toEqual('F#');
    expect(getPitchNameFromInterval('C', 'A5')).toEqual('G#');
    expect(getPitchNameFromInterval('C', 'A6')).toEqual('A##');
    expect(getPitchNameFromInterval('C', 'A7')).toEqual('B##');
});



test("compute correct major intervals away from F#", () => {
    expect(getPitchNameFromInterval('F#', 'M2')).toEqual('G#');
    expect(getPitchNameFromInterval('F#', 'M3')).toEqual('A#');
    expect(getPitchNameFromInterval('F#', 'M6')).toEqual('D#');
    expect(getPitchNameFromInterval('F#', 'M7')).toEqual('E#');
});

test("compute correct perfect intervals away from F#", () => {
    expect(getPitchNameFromInterval('F#', 'P1')).toEqual('F#');
    expect(getPitchNameFromInterval('F#', 'P4')).toEqual('B');
    expect(getPitchNameFromInterval('F#', 'P5')).toEqual('C#');
});

test("compute correct minor intervals away from F#", () => {
    expect(getPitchNameFromInterval('F#', 'm2')).toEqual('G');
    expect(getPitchNameFromInterval('F#', 'm3')).toEqual('A');
    expect(getPitchNameFromInterval('F#', 'm6')).toEqual('D');
    expect(getPitchNameFromInterval('F#', 'm7')).toEqual('E');
});

test("compute correct diminished intervals away from F#", () => {
    expect(getPitchNameFromInterval('F#', 'd2')).toEqual('Gb');
    expect(getPitchNameFromInterval('F#', 'd3')).toEqual('Ab');
    expect(getPitchNameFromInterval('F#', 'd4')).toEqual('Bb');
    expect(getPitchNameFromInterval('F#', 'd5')).toEqual('C');
    expect(getPitchNameFromInterval('F#', 'd6')).toEqual('Db');
    expect(getPitchNameFromInterval('F#', 'd7')).toEqual('Eb');
});

test("compute correct augmented intervals away from F#", () => {
    expect(getPitchNameFromInterval('F#', 'A1')).toEqual('F##');
    expect(getPitchNameFromInterval('F#', 'A2')).toEqual('G##');
    expect(getPitchNameFromInterval('F#', 'A3')).toEqual('A##');
    expect(getPitchNameFromInterval('F#', 'A4')).toEqual('B#');
    expect(getPitchNameFromInterval('F#', 'A5')).toEqual('C##');
    expect(getPitchNameFromInterval('F#', 'A6')).toEqual('D##');
    expect(getPitchNameFromInterval('F#', 'A7')).toEqual('E##');
});


test("throw error on invalid intervals", () => {

});

test("should find index of C when it is the first note of arpeggio", () => {
    expect(findAscendingBoundaryIndex(['C', 'E', 'G'])).toEqual(0);
});

test("should find index of C when it is the first note of scale", () => {
    expect(findAscendingBoundaryIndex(['C', 'D', 'E', 'F', 'G', 'A', 'B'])).toEqual(0);
});

test("should find index of C when it the last note of scale", () => {
    expect(findAscendingBoundaryIndex(['D', 'E', 'F', 'G', 'A', 'Bb', 'C'])).toEqual(6);
});

test("should find index of C when it is a middle note of scale", () => {
    expect(findAscendingBoundaryIndex(['F', 'G', 'A', 'Bb', 'C', 'D', 'E'])).toEqual(4);
});


test("should find index of F in a collection without pitch class 0", () => {
    expect(findAscendingBoundaryIndex(['E', 'G', 'B'])).toEqual(0);
});

test("should find index of D in a collection without pitch class 0", () => {
    expect(findAscendingBoundaryIndex(['B', 'D', 'F#'])).toEqual(1);
});

test("should find index of F in a collection without pitch class 0", () => {
    expect(findAscendingBoundaryIndex(['G', 'B', 'D'])).toEqual(2);
});




// Cb should trigger a register change, despite its pitch class belonging to the previous octave (pitch class 11)
test("should find index of Cb when it is the first note of arpeggio", () => {
    expect(findAscendingBoundaryIndex(['Cb', 'E', 'G'])).toEqual(0);
});

test("should find index of Cb when it is the first note of scale", () => {
    expect(findAscendingBoundaryIndex(['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb'])).toEqual(0);
});

test("should find index of Cb when it the last note of scale", () => {
    expect(findAscendingBoundaryIndex(['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb'])).toEqual(6);
});

test("should find index of Cb when it is a middle note of scale", () => {
    expect(findAscendingBoundaryIndex(['Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'])).toEqual(5);
});


// B# should not trigger a register change, despite its pitch class belonging to the next octave (pitch class 0)
test("should find index of the note after B# when it is the first note of arpeggio", () => {
    expect(findAscendingBoundaryIndex(['B#', 'D#', 'F#'])).toEqual(1);
});

test("should find index 0 as wraparound when B# is the last note of scale", () => {
    expect(findAscendingBoundaryIndex(['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B#'])).toEqual(0);
});

test("should find index of the note after B# when it is a middle note of scale", () => {
    expect(findAscendingBoundaryIndex(['F#', 'G#', 'A#', 'B#', 'D', 'E'])).toEqual(4);
});

