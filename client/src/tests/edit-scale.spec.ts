import { expect, test } from 'vitest'
import { note, notes, notesStringFromArray } from '../music-theory/utils';
import { expandScale } from '../music-theory/expand-scale';
import { buildScale } from '../music-theory/build-scale';
import { applyTraversalPattern } from '../music-theory/edit-scale';



const cMajor = buildScale({
    tonic: 'C',
    scaleType: 'major'
});

const cMajorFiveNotes = expandScale(cMajor, {
    initialRegister: 4,
    minNote: note("C", 4),
    maxNote: note("G", 4)
})

const cMajorOneOctave = expandScale(cMajor, {
    initialRegister: 4,
    minNote: note("C", 4),
    maxNote: note("B", 7), // set 'maxNote' deliberately high so that 'octaves' restricts range
    octaves: 1
});

test('empty pattern', () => {
    expect(applyTraversalPattern(cMajorOneOctave, [], cMajor, note("C", 4), note("B", 7))).toEqual(cMajorOneOctave);
});


test('zero step', () => {
    const notes = applyTraversalPattern(cMajorOneOctave, [0], cMajor, note("C", 4), note("B", 7));
    // Reduce object array to notes string for readability in test differences
    // Concatenate rows because using '\' in multi-line strings may create false-negative test results
    // Be careful to add an extra space character on all lines except the last
    expect(notesStringFromArray(notes)).toEqual(
        "C4 C4 D4 D4 E4 E4 F4 F4 G4 G4 A4 A4 B4 B4 C5 C5 " +
        "B4 B4 A4 A4 G4 G4 F4 F4 E4 E4 D4 D4 C4"
    );
});

test('zero in the middle of pattern', () => {
    const notes = applyTraversalPattern(cMajorOneOctave, [1, 0], cMajor, note("C", 4), note("C", 5));
    // Reduce object array to notes string for readability in test differences
    // Concatenate rows because using '\' in multi-line strings may create false-negative test results
    // Be careful to add an extra space character on all lines except the last
    expect(notesStringFromArray(notes)).toEqual(
        "C4 D4 D4 D4 E4 E4 E4 F4 F4 F4 G4 G4 G4 A4 A4 A4 B4 B4 B4 C5 C5 " +
        "C5 B4 B4 B4 A4 A4 A4 G4 G4 G4 F4 F4 F4 E4 E4 E4 D4 D4 D4 C4 C4 C4"
    );
});

// When range permits pattern to exceed the original top note of the scale, what should happen? Do we add 'filler' material?
// It would be nice for the scale to be continuous, i.e. repeat the pattern on the notes that went above the original top note
// Currently, system will end up creating a 'jump' (e.g. C5 D5 E5 -> back to B4 A4 G4...)
test('pattern is allowed to surpass top note of scale due to octave restriction', () => {
    const notes = applyTraversalPattern(cMajorOneOctave, [1, 1], cMajor, note("C", 4), note("C", 6));
    expect(notesStringFromArray(notes)).toEqual(
        "C4 D4 E4 D4 E4 F4 E4 F4 G4 F4 G4 A4 G4 A4 B4 A4 B4 C5 B4 C5 D5 C5 D5 E5 " +
        "D5 C5 B4 C5 B4 A4 B4 A4 G4 A4 G4 F4 G4 F4 E4 F4 E4 D4 E4 D4 C4"
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
        "F4 E4 D4 E4 D4 C4 D4 C4 B3 C4"
    );
});
