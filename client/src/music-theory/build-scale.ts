import { MAJOR_KEY_SIGNATURES, MINOR_KEY_SIGNATURES } from "./key-signatures";
import { PitchLetters, type PitchClass, type PitchCollection, type Scale, type ScaleType } from "./types";

interface ScaleOptions {
    tonic: PitchClass,
    type: ScaleType
}

type ScaleBuilderFunction = (tonic: PitchClass) => Scale;

const SCALE_BUILDER_STRATEGIES: Record<string, ScaleBuilderFunction> = {
    'major': (tonic: PitchClass) => buildMajorScale(tonic),
    'natural-minor': (tonic: PitchClass) => buildNaturalMinorScale(tonic),
    'harmonic-minor': (tonic: PitchClass) => buildHarmonicMinorScale(tonic),
    'melodic-minor': (tonic: PitchClass) => buildMelodicMinorScale(tonic),
}

function getKeySignature(tonic: PitchClass, scaleType: ScaleType): PitchCollection | null {
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

function applyKeySignature(tonic: PitchClass, scaleType: ScaleType, collection: PitchCollection): PitchCollection {
    let keySignature: PitchCollection | null = getKeySignature(tonic, scaleType);
    if (!keySignature) return collection;

    let newCollection: PitchCollection = [];

    for (let pitchClassInKey of keySignature) {
        for (let pitchClassInCollection of collection) {
            if (pitchClassInKey.charAt(0) == pitchClassInCollection) {
                newCollection.push(pitchClassInKey);
                // Will only apply to one note in scale, can break early
                break;
            }
        }
    }

    return newCollection;
}

function shiftScaleToStartOnTonic(tonic: PitchClass, collection: PitchCollection) {
    let shiftAmount = tonic.charCodeAt(0) - PitchLetters[0].charCodeAt(0);
    let newCollection: PitchCollection = [];

    for (let i = 0; i < shiftAmount; i++) {
        newCollection.push(collection[(i + shiftAmount) % collection.length]);
    }

    return newCollection;
}


function buildMajorScale(tonic: PitchClass): Scale {
    let ascendingScale: PitchClass[] = [...PitchLetters];

    ascendingScale = applyKeySignature(tonic, 'major', ascendingScale);
    ascendingScale = shiftScaleToStartOnTonic(tonic, ascendingScale);

    return {
        ascending: ascendingScale
    };
}

function buildNaturalMinorScale(tonic: PitchClass): Scale {
    return { ascending: [] };
}

function buildHarmonicMinorScale(tonic: PitchClass): Scale {
    return { ascending: [] };
}

function buildMelodicMinorScale(tonic: PitchClass): Scale {
    return { ascending: [] };
}


export function buildScale(options: ScaleOptions): Scale {
    return SCALE_BUILDER_STRATEGIES[options.type](options.tonic);
}