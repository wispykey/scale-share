import { MAJOR_KEY_SIGNATURES, MINOR_KEY_SIGNATURES } from "./key-signatures";
import { PitchLetters, type PitchName, type PitchCollection, type Scale, type ScaleType, Accidentals } from "./types";
import { splitPitchName, makePitchName } from "./utils";

interface ScaleOptions {
    tonic: PitchName,
    type: ScaleType
}

type ScaleBuilderFunction = (tonic: PitchName) => Scale;

const SCALE_BUILDER_STRATEGIES: Record<string, ScaleBuilderFunction> = {
    'major': (tonic: PitchName) => buildMajorScale(tonic),
    'natural-minor': (tonic: PitchName) => buildNaturalMinorScale(tonic),
    'harmonic-minor': (tonic: PitchName) => buildHarmonicMinorScale(tonic),
    'melodic-minor': (tonic: PitchName) => buildMelodicMinorScale(tonic),
}

function getKeySignature(tonic: PitchName, scaleType: ScaleType): PitchCollection | null {
    switch (scaleType) {
        case 'major':
            if (!(tonic in MAJOR_KEY_SIGNATURES))
                return null;
            return MAJOR_KEY_SIGNATURES[tonic];
        default:
            if (!(tonic in MINOR_KEY_SIGNATURES))
                return null;
            return MINOR_KEY_SIGNATURES[tonic];
    }
}

function applyKeySignature(tonic: PitchName, scaleType: ScaleType, collection: PitchCollection): PitchCollection {
    let keySignature: PitchCollection | null = getKeySignature(tonic, scaleType);
    if (!keySignature) return collection;

    let newCollection: PitchCollection = [];

    for (let pitchClassInCollection of collection) {
        let pitchClassToAdd = pitchClassInCollection;
        for (let pitchClassInKey of keySignature) {
            if (pitchClassInKey.charAt(0) == pitchClassInCollection) {
                pitchClassToAdd = pitchClassInKey;
            }
        }
        newCollection.push(pitchClassToAdd);
    }

    return newCollection;
}

function shiftScaleToStartOnTonic(tonic: PitchName, collection: PitchCollection) {
    let shiftAmount = tonic.charCodeAt(0) - PitchLetters[0].charCodeAt(0);
    let newCollection: PitchCollection = [];

    for (let i = 0; i < collection.length; i++) {
        newCollection.push(collection[(i + shiftAmount) % collection.length]);
    }

    return newCollection;
}


function buildMajorScale(tonic: PitchName): Scale {
    let ascendingScale: PitchName[] = [...PitchLetters];

    ascendingScale = applyKeySignature(tonic, 'major', ascendingScale);
    ascendingScale = shiftScaleToStartOnTonic(tonic, ascendingScale);

    return {
        ascending: ascendingScale
    };
}

function buildNaturalMinorScale(tonic: PitchName): Scale {
    let ascendingScale: PitchName[] = [...PitchLetters];

    ascendingScale = applyKeySignature(tonic, 'natural-minor', ascendingScale);
    ascendingScale = shiftScaleToStartOnTonic(tonic, ascendingScale);

    return {
        ascending: ascendingScale
    };
}


function modifyScaleDegrees(mode: 'raise' | 'lower', scaleDegrees: number[], collection: PitchCollection): PitchCollection {
    let newCollection = [...collection];
    for (let scaleDegree of scaleDegrees) {
        let index = scaleDegree - 1;

        if (index < 0 || index >= collection.length)
            throw new Error(`Scale degree ${scaleDegree} is out of bounds for scale of length ${collection.length}`);

        const naturalIndex = Accidentals.findIndex(a => a === '');
        const pitchClassAtIndex = collection[index];
        const [pitchLetter, pitchAccidental] = splitPitchName(pitchClassAtIndex);

        let accidentalIndex = Accidentals.findIndex(a => a === pitchAccidental);

        if (accidentalIndex < 0) {
            accidentalIndex = naturalIndex;
        }

        if (mode === 'raise' && accidentalIndex === Accidentals.length - 1) {
            console.error(`Cannot raise a double sharp (##); aborting raising of ${pitchClassAtIndex} in ${collection}`);
            break;
        }

        if (mode === 'lower' && accidentalIndex === 0) {
            console.error(`Cannot lower a double flat (bb); aborting lowering of ${pitchClassAtIndex} in ${collection}`);
            break;
        }

        let direction = mode === 'raise' ? 1 : -1;
        accidentalIndex += direction;
        let newAccidental = (accidentalIndex === naturalIndex) ? '' : Accidentals[accidentalIndex];

        newCollection[index] = makePitchName(pitchLetter, newAccidental);

    }

    return newCollection;
}


function buildHarmonicMinorScale(tonic: PitchName): Scale {
    let ascendingScale: PitchCollection = [...PitchLetters];

    ascendingScale = applyKeySignature(tonic, 'natural-minor', ascendingScale);
    ascendingScale = shiftScaleToStartOnTonic(tonic, ascendingScale);

    ascendingScale = modifyScaleDegrees('raise', [7], ascendingScale);

    return { ascending: ascendingScale };
}


function buildMelodicMinorScale(tonic: PitchName): Scale {
    // Do descending first to save one iteration (raise once, instead of raise->lower back down)
    let descendingScale: PitchCollection = [...PitchLetters];

    descendingScale = applyKeySignature(tonic, 'natural-minor', descendingScale);
    descendingScale = shiftScaleToStartOnTonic(tonic, descendingScale);

    let ascendingScale = modifyScaleDegrees('raise', [6, 7], descendingScale);

    return {
        ascending: ascendingScale,
        descending: descendingScale
    };
}


export function buildScale(options: ScaleOptions): Scale {
    return SCALE_BUILDER_STRATEGIES[options.type](options.tonic);
}