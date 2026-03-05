
import { Interval, Measure, Note, NoteDuration, NoteDurations, Scale, TimeSignature } from "./types";
import { convertNoteToPitchNumber, isNoteInRange } from "./utils";


const QUARTER_NOTE_TICKS: number = 60;
const FALLBACK_FILL_DURATION: NoteDuration = '16';

export function applyTraversalPattern(notes: Note[], pattern: number[], scale: Scale, minNote: Note, maxNote: Note) {
    let newNotes: Note[] = [];
    let scaleLength = scale.ascending.length;

    for (let i = 0; i < notes.length - 1; i++) {
        let curr = notes[i];


        // Always include base note; an empty traversal pattern should result in a 'regular' scale
        let patternNotes: Note[] = [curr];

        // Derive direction (ascending/descending encoded as +1/-1)
        let direction = 1;
        if (i - 1 >= 0 && convertNoteToPitchNumber(curr) < convertNoteToPitchNumber(notes[i - 1])) {
            direction = -1;
        }

        let currScale = direction == 1 ? scale.ascending : (scale.descending ? scale.descending : scale.ascending);

        // Find where we are in the scale
        let originalScaleIndex = currScale.findIndex((noteName) => curr.name === noteName);
        if (originalScaleIndex < 0) {
            console.error(`Note ${curr.name} does not belong to scale ${scale}. Aborting traversal pattern application`);
            return notes;
        }

        let scaleIndexOfNewNote = originalScaleIndex;
        let newRegister = curr.register;

        for (let interval of pattern) {
            // Need to walk through the interval step-by-step to identify register changes across B/C
            // We can't just compare pitch numbers because an 'interval' is defined in scale steps, not semitones
            for (let j = 1; j < interval + 1; j++) {
                let noteNameOnPath = currScale[((scaleIndexOfNewNote + direction * j) % scaleLength + scaleLength) % scaleLength];
                if (direction > 0 && noteNameOnPath.charAt(0) === 'C') {
                    newRegister++;
                    break;
                } else if (direction < 0 && noteNameOnPath.charAt(0) === 'B') {
                    newRegister--;
                    break;
                }
            }

            scaleIndexOfNewNote = ((scaleIndexOfNewNote + direction * interval) % scaleLength + scaleLength) % scaleLength;
            let newNote: Note = {
                name: currScale[scaleIndexOfNewNote],
                register: newRegister,
            };

            if (!isNoteInRange(newNote, minNote, maxNote)) {
                // Pattern, including base note, should be skipped if any note goes out of range
                // We want all pattern instances to be complete; no truncation
                patternNotes = [];
                break;
            }
            patternNotes.push(newNote);
        }
        newNotes = newNotes.concat(patternNotes);
    };

    newNotes.push(notes[notes.length - 1]);

    return newNotes;
}

export function addRhythms(notes: Note[], rhythm: NoteDuration[]): Note[] {
    if (rhythm.length === 0) {
        console.error(`Rhythm is empty; defaulting to all quarter notes`);
        rhythm = ["q"];
    }

    let rhythmIndex = 0;
    for (let note of notes) {
        note.duration = rhythm[rhythmIndex];
        rhythmIndex = (rhythmIndex + 1) % rhythm.length;
    }
    return notes;
}

function getNoteDurationInTicks(duration: NoteDuration) {
    switch (duration) {
        case "q": return QUARTER_NOTE_TICKS;
        case "q.": return QUARTER_NOTE_TICKS * 1.5;
        case "h": return QUARTER_NOTE_TICKS * 2;
        case "h.": return QUARTER_NOTE_TICKS * 2 * 1.5;
        case "w": return QUARTER_NOTE_TICKS * 4;
        case "8": return QUARTER_NOTE_TICKS / 2;
        case "8.": return QUARTER_NOTE_TICKS / 2 * 1.5;
        case "16": return QUARTER_NOTE_TICKS / 4;
        default:
            return QUARTER_NOTE_TICKS;
    }
}


export function divideScaleIntoMeasures(notes: Note[], timeSignature: TimeSignature): Measure[] {
    // Add rhythms and split into measures of notes
    let measures: Measure[] = [];
    let ticksPerMeasure = timeSignature.numerator * QUARTER_NOTE_TICKS;

    let newMeasure: Measure = [];
    let newMeasureDurationInTicks = 0;

    for (let note of notes) {
        if (!note.duration) {
            console.log("Skipping note due to missing duration");
            continue;
        }
        newMeasure.push(note);
        newMeasureDurationInTicks += getNoteDurationInTicks(note.duration);
        if (newMeasureDurationInTicks >= ticksPerMeasure) {
            measures.push([...newMeasure]);
            newMeasure = [];
            newMeasureDurationInTicks = 0;
        }
    }

    // Final measure has indeterminate length
    if (newMeasure.length > 0) {
        measures.push([...fillMeasure(newMeasure, timeSignature)]);
    }

    return measures;
}

function fillMeasure(measure: Note[], timeSignature: TimeSignature): Note[] {
    let ticksPerMeasure = timeSignature.numerator * QUARTER_NOTE_TICKS;
    let measureDurationInTicks = 0;

    for (let note of measure) {
        measureDurationInTicks += getNoteDurationInTicks(note.duration!);
    }

    // Base case: Already full
    if (measureDurationInTicks === ticksPerMeasure) {
        return measure;
    }

    // Base case: Change to whole note
    if (measure.length === 1) {
        return [{ ...measure[0], duration: "w" }];
    }

    let remainingDuration = ticksPerMeasure - measureDurationInTicks;

    // Simple case: Attempt to change final note to a single duration ("convenient fit")
    let finalNote = measure.at(-1)!;
    // Exclude final note's original duration from tick count, because we are trying to replace it
    let remainingDurationExceptOne = remainingDuration + getNoteDurationInTicks(finalNote.duration!);
    for (let newDuration of NoteDurations) {
        if (getNoteDurationInTicks(newDuration) === remainingDurationExceptOne) {
            return [...measure.slice(0, -1), { ...finalNote, duration: newDuration }];
        }
    }

    // TODO: Last resort - greedy ties
    // Requires supporting tied notes

    // Temporary last resort - fill with lowest supported duration 
    let newMeasure: Measure = [...measure];
    while (remainingDuration > 0) {
        newMeasure.push({
            name: 'B',
            register: 4,
            duration: FALLBACK_FILL_DURATION,
            isRest: true
        });
        remainingDuration -= getNoteDurationInTicks(FALLBACK_FILL_DURATION);
    }

    return newMeasure;
}