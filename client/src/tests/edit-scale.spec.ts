import { expect, test } from 'vitest'
import { note, notes, notesStringFromArray } from '../music-theory/utils';
import { expandScale } from '../music-theory/expand-scale';
import { buildScale } from '../music-theory/build-scale';
import { applyTraversalPattern } from '../music-theory/edit-scale';

// For improved readability as test results get longer and longer:
// Reduce object array to notes string
// Concatenate rows because using '\' in multi-line strings may create false-negative test results
// Be careful to add an extra space character on all lines except the last

const cMajor = buildScale({
    tonic: 'C',
    scaleType: 'major'
});

const cMajorFiveNotes = expandScale(cMajor, {
    initialRegister: 4,
    minNote: note("C", 4),
    maxNote: note("G", 4)
});

const cMajorFiveNotesFullRange = expandScale(cMajor, {
    initialRegister: 4,
    minNote: note("B", 3),
    maxNote: note("G", 4)
});

const cMajorOneOctave = expandScale(cMajor, {
    initialRegister: 4,
    minNote: note("C", 4),
    maxNote: note("B", 7),
    octaves: 1
});

const cMajorNinthFullRange = expandScale(cMajor, {
    initialRegister: 4,
    minNote: note("C", 4),
    maxNote: note("D", 5)
});


const cMajorSmallFullRangeLower = expandScale(cMajor, {
    initialRegister: 4,
    minNote: note("C", 3),
    maxNote: note("G", 4)
});

test('empty pattern', () => {
    expect(applyTraversalPattern(cMajorOneOctave, [], cMajor, note("C", 4), note("B", 7))).toEqual(cMajorOneOctave);
});


test('zero step', () => {
    const notes = applyTraversalPattern(cMajorOneOctave, [0], cMajor, note("C", 4), note("B", 7));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 C4 D4 D4 E4 E4 F4 F4 G4 G4 A4 A4 B4 B4 C5 C5 " +
        "B4 B4 A4 A4 G4 G4 F4 F4 E4 E4 D4 D4 C4"
    );
});

test('zero in the middle of pattern', () => {
    const notes = applyTraversalPattern(cMajorOneOctave, [1, 0], cMajor, note("C", 4), note("C", 5));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 D4 D4 D4 E4 E4 E4 F4 F4 F4 G4 G4 G4 A4 A4 A4 B4 B4 B4 C5 C5 " +
        "C5 B4 B4 B4 A4 A4 A4 G4 G4 G4 F4 F4 F4 E4 E4 E4 D4 D4 D4 C4 C4 C4"
    );
});

test('zero in the middle of pattern, adjust range to get better rhythm', () => {
    const notes = applyTraversalPattern(cMajorNinthFullRange, [1, 0], cMajor, note("C", 4), note("D", 5));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 D4 D4 D4 E4 E4 E4 F4 F4 F4 G4 G4 G4 A4 A4 A4 B4 B4 B4 C5 C5 C5 D5 D5 " +
        "C5 B4 B4 B4 A4 A4 A4 G4 G4 G4 F4 F4 F4 E4 E4 E4 D4 D4 D4 C4 C4 C4"
    );
});

// When range permits pattern to exceed the original top note of the scale, what should happen? Do we add 'filler' material?
// It would be nice for the scale to be continuous, i.e. repeat the pattern on the notes that went above the original top note
// Currently, system will end up creating a 'jump' (e.g. C5 D5 E5 -> back to B4 A4 G4...)
test('pattern is NOT allowed to surpass top note of scale when a number of octaves is specified', () => {
    const notes = applyTraversalPattern(cMajorOneOctave, [1, 1], cMajor, note("C", 4), note("C", 6));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 D4 E4 D4 E4 F4 E4 F4 G4 F4 G4 A4 G4 A4 B4 A4 B4 C5 " +
        "B4 A4 G4 A4 G4 F4 G4 F4 E4 F4 E4 D4 E4 D4 C4 C4"
    );
});

// If penultimate pattern ends on tonic, should it repeat the tonic note or not?
// Currently, test says it should repeat
test('small full range scale, penultimate pattern ends on tonic', () => {
    const notes = applyTraversalPattern(cMajorFiveNotes, [1, 1], cMajor, note("C", 4), note("G", 4));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 D4 E4 D4 E4 F4 E4 F4 G4 " +
        "F4 E4 D4 E4 D4 C4 C4"
    );
});

test('small full range scale', () => {
    const notes = applyTraversalPattern(cMajorFiveNotes, [1, 1], cMajor, note("C", 2), note("G", 4));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 D4 E4 D4 E4 F4 E4 F4 G4 " +
        "F4 E4 D4 E4 D4 C4 C4"
    );
});

test('very long pattern (a scale on each note) that exceeds max range early on', () => {
    const notes = applyTraversalPattern(cMajorNinthFullRange, [1, 1, 1, 1, 1, 1, 1], cMajor, note("C", 4), note("D", 5));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 D4 E4 F4 G4 A4 B4 C5 " + "D4 E4 F4 G4 A4 B4 C5 D5 " +
        "C5 B4 A4 G4 F4 E4 D4 C4 C4"
    );
});


test('small full range scale, expands lower', () => {
    const notes = applyTraversalPattern(cMajorSmallFullRangeLower, [1, 1], cMajor, note("C", 3), note("G", 4));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 D4 E4 D4 E4 F4 E4 F4 G4 " +
        "F4 E4 D4 E4 D4 C4 D4 C4 B3 " +
        "C4 B3 A3 B3 A3 G3 A3 G3 F3 G3 F3 E3 F3 E3 D3 E3 D3 C3 " +
        "D3 E3 F3 E3 F3 G3 F3 G3 A3 G3 A3 B3 A3 B3 C4 B3 C4 D4 C4"
    );
});

test('small full range scale, expands lower with downwards step in pattern', () => {
    const notes = applyTraversalPattern(cMajorSmallFullRangeLower, [1, -1], cMajor, note("C", 3), note("G", 4));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 D4 C4 D4 E4 D4 E4 F4 E4 F4 G4 F4 " +
        "F4 E4 F4 E4 D4 E4 D4 C4 D4 C4 B3 C4 " +
        "B3 A3 B3 A3 G3 A3 G3 F3 G3 F3 E3 F3 E3 D3 E3 D3 C3 D3 " +
        "D3 E3 D3 E3 F3 E3 F3 G3 F3 G3 A3 G3 A3 B3 A3 B3 C4 B3 C4"
    );
});

test('small full range scale, pattern dips below starting note', () => {
    const notes = applyTraversalPattern(cMajorFiveNotesFullRange, [1, -2, 1], cMajor, note("B", 3), note("G", 4));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 D4 B3 C4 D4 E4 C4 D4 E4 F4 D4 E4 F4 G4 E4 F4 " +
        "F4 E4 G4 F4 E4 D4 F4 E4 D4 C4 E4 D4 C4 B3 D4 C4 C4"
    );
});


test('thirds in C major', () => {
    const notes = applyTraversalPattern(cMajorNinthFullRange, [2], cMajor, note("C", 4), note("D", 5));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 E4 D4 F4 E4 G4 F4 A4 G4 B4 A4 C5 B4 D5 " +
        "C5 A4 B4 G4 A4 F4 G4 E4 F4 D4 E4 C4 C4"
    );
});


test('fourths in C major', () => {
    const notes = applyTraversalPattern(cMajorNinthFullRange, [3], cMajor, note("C", 4), note("D", 5));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 F4 D4 G4 E4 A4 F4 B4 G4 C5 A4 D5 " +
        "C5 G4 B4 F4 A4 E4 G4 D4 F4 C4 C4"
    );
});


test('fifths in C major', () => {
    const notes = applyTraversalPattern(cMajorNinthFullRange, [4], cMajor, note("C", 4), note("D", 5));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 G4 D4 A4 E4 B4 F4 C5 G4 D5 " +
        "C5 F4 B4 E4 A4 D4 G4 C4 C4"
    );
});


test('sixths in C major', () => {
    const notes = applyTraversalPattern(cMajorNinthFullRange, [5], cMajor, note("C", 4), note("D", 5));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 A4 D4 B4 E4 C5 F4 D5 " +
        "C5 E4 B4 D4 A4 C4 C4"
    );
});



test('sevenths in C major', () => {
    const notes = applyTraversalPattern(cMajorNinthFullRange, [6], cMajor, note("C", 4), note("D", 5));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 B4 D4 C5 E4 D5 " +
        "C5 D4 B4 C4 C4"
    );
});