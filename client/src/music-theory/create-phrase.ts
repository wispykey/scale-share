import { addRhythms, applyTraversalPattern, divideScaleIntoMeasures } from "./edit-scale";
import { buildScale } from "./build-scale";
import { expandScale } from "./expand-scale";
import { Phrase, ScaleFormOptions } from "./types";

export function createPhrase(options: ScaleFormOptions): Phrase {
    const scale = buildScale({ ...options });
    let notes = expandScale(scale, { ...options });
    notes = applyTraversalPattern(notes, [], scale, options.minNote, options.maxNote);
    notes = addRhythms(notes, options.rhythm);
    let measures = divideScaleIntoMeasures(notes, options.timeSignature);
    return {
        measures: measures,
        tonic: options.tonic,
        scaleType: options.scaleType,
        timeSignature: options.timeSignature,
        showKeySignature: options.showKeySignature,
        showExtraAccidentals: options.showExtraAccidentals,
        articulationPattern: options.articulationPattern
    };
}