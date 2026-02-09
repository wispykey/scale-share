import type { Scale, Note } from "./types";
import { convertNoteToPitchNumber, modifyPitchName } from "./utils";


interface ScaleExpansionOptions {
    initialRegister: number,
    minNote: Note,
    maxNote: Note,
    octaves?: number
}

function isNoteInRange(note: Note, minNote: Note, maxNote: Note): boolean {
    let minPitchNumber = convertNoteToPitchNumber(minNote);
    let maxPitchNumber = convertNoteToPitchNumber(maxNote);
    let notePitchNumber = convertNoteToPitchNumber(note);
    return notePitchNumber <= maxPitchNumber && notePitchNumber >= minPitchNumber;
}



function selectFirstNote(scale: Scale, initialRegister: number, minNote: Note, maxNote: Note): Note {
    // Base case: tonic of scale, at register initialRegister, is already in range
    let firstNote = {
        name: scale.ascending[0],
        register: initialRegister,
    };

    let currRegister = initialRegister;
    // Increment register of tonic until it is in range
    while (currRegister <= maxNote.register) {
        if (isNoteInRange(firstNote, minNote, maxNote)) return firstNote;
        currRegister++;
        firstNote.register = currRegister;
    }

    // Last resort: Return note register 4, even though it is out of range.
    // TODO: Return error to inform user on frontend
    firstNote.register = initialRegister;
    return firstNote;
}

function applyScaleDegreeAlterations(scale: Scale, notes: Note[]) {
    if (scale.type === 'harmonic-minor') {
        // raise all the sevenths
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].name === scale.ascending[6]) {
                notes[i].name = modifyPitchName('raise', notes[i].name);
            }
        }
    }
    if (scale.type === 'melodic-minor') {
        // raise all the sixths and sevenths, only when ascending

        // starting at second note to allow comparison between two adjacent notes
        // this is OK because we assume scales will always start on tonic; never on sixth/seventh
        for (let i = 1; i < notes.length; i++) {
            // Check if ascending by comparing absolute pitch numbers, e.g. 71 >? 70
            if (convertNoteToPitchNumber(notes[i]) <= convertNoteToPitchNumber(notes[i - 1]))
                continue;
            // can't just use i directly, because scale may not always land on tonic at top/bottom notes
            if (notes[i].name === scale.ascending[5] || notes[i].name === scale.ascending[6]) {
                notes[i].name = modifyPitchName('raise', notes[i].name);
            }
        }

    }
}

export function expandScale(scale: Scale, options: ScaleExpansionOptions): Note[] {
    // Surely there is a better way than setting 12 to be sufficiently large for 'full-range'
    let numOctaves: number = options.octaves ?? 12;
    let firstNote = selectFirstNote(scale, options.initialRegister, options.minNote, options.maxNote);
    // INVARIANT: notes.length > 0
    let notes: Note[] = [firstNote];
    let currRegister = firstNote.register;

    function addNotesInDirection(direction: 'up' | 'down', finalNote?: Note) {
        const ascending = direction === 'up';
        const scaleLength = scale.ascending.length;
        // Find where we left off in the scale; not always exact begin/end of scale due to range restrictions
        let prevNote = notes.at(-1);
        let step = ascending ? 1 : scaleLength - 1;
        let currScale = ascending ? scale.ascending : (scale.descending !== undefined ? scale.descending : scale.ascending);
        let start = (currScale.findIndex(n => n === prevNote!.name) + step) % currScale.length;
        // Handle register increase/decrease boundary
        let boundaryPitch = ascending ? 'B' : 'C';

        for (let i = 0; i < numOctaves; i++) {
            for (let j = 0; j < currScale.length; j++) {
                prevNote = notes.at(-1);
                // Land on tonic at the end of full-range scale
                if (finalNote && prevNote!.name === finalNote.name && prevNote!.register === finalNote.register) return;
                // Temp copy of register is needed to allow incrementing post-validation
                let nextRegister = currRegister;
                let nextIndex = (start + j * step) % scaleLength;
                if (prevNote!.name.charAt(0) === boundaryPitch) {
                    nextRegister += (ascending ? 1 : -1);
                }
                let nextNote = {
                    name: currScale[nextIndex],
                    register: nextRegister,
                };
                if (!isNoteInRange(nextNote, options.minNote, options.maxNote)) return;
                notes.push(nextNote);
                currRegister = nextRegister;
            }
        }
    }

    // Always start going up
    addNotesInDirection('up');

    // Down if number of octaves is set; down-then-up for full-range.
    if (options.octaves) {
        addNotesInDirection('down', firstNote);
    } else {
        addNotesInDirection('down');
        addNotesInDirection('up', firstNote);
    }

    applyScaleDegreeAlterations(scale, notes);


    return notes;
}
