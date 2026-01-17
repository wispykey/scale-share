import { MAJOR_KEY_SIGNATURES, MINOR_KEY_SIGNATURES } from "./key-signatures";
import { type Accidental, PitchLetters, type PitchClass, type PitchCollection, type PitchLetter, type Scale, type ScaleType, Accidentals } from "./types";

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

function shiftScaleToStartOnTonic(tonic: PitchClass, collection: PitchCollection) {
    let shiftAmount = tonic.charCodeAt(0) - PitchLetters[0].charCodeAt(0);
    let newCollection: PitchCollection = [];

    for (let i = 0; i < collection.length; i++) {
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
    let ascendingScale: PitchClass[] = [...PitchLetters];

    ascendingScale = applyKeySignature(tonic, 'natural-minor', ascendingScale);
    ascendingScale = shiftScaleToStartOnTonic(tonic, ascendingScale);

    return {
        ascending: ascendingScale
    };
}

function splitPitchName(pitchName: PitchClass): [PitchLetter, Accidental] {
    // Is there a better way to handle this? Is it worth making PitchClass its own typed object with fields?
    return [pitchName.slice(0, 1) as PitchLetter, pitchName.slice(1) as Accidental];
}

export function makePitchName(pitchLetter: PitchLetter, accidental: Accidental): PitchClass {
    return `${pitchLetter}${accidental}` as PitchClass;
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

function buildHarmonicMinorScale(tonic: PitchClass): Scale {
    let ascendingScale: PitchCollection = [...PitchLetters];

    ascendingScale = applyKeySignature(tonic, 'natural-minor', ascendingScale);
    ascendingScale = shiftScaleToStartOnTonic(tonic, ascendingScale);

    ascendingScale = modifyScaleDegrees('raise', [7], ascendingScale);


    return { ascending: ascendingScale };
}

function buildMelodicMinorScale(tonic: PitchClass): Scale {
    return { ascending: [] };
}


export function buildScale(options: ScaleOptions): Scale {
    return SCALE_BUILDER_STRATEGIES[options.type](options.tonic);
}