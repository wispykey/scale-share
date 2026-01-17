import type { PitchClass, PitchCollection, ScaleType } from "./types";

interface ScaleOptions {
    tonic: PitchClass,
    type: ScaleType
}

type ScaleBuilderFunction = (tonic: PitchClass) => PitchCollection;

const SCALE_BUILDER_STRATEGIES: Record<string, ScaleBuilderFunction> = {
    'major': (tonic: PitchClass) => buildMajorScale(tonic),
    'natural-minor': (tonic: PitchClass) => buildNaturalMinorScale(tonic),
    'harmonic-minor': (tonic: PitchClass) => buildHarmonicMinorScale(tonic),
    'melodic-minor': (tonic: PitchClass) => buildMelodicMinorScale(tonic),
}


function applyKeySignature(tonic: PitchClass, scaleType: ScaleType, collection: PitchCollection): PitchCollection {
    return collection;
}


function buildMajorScale(tonic: PitchClass): PitchCollection {
    return [];
}

function buildNaturalMinorScale(tonic: PitchClass): PitchCollection {
    return [];
}

function buildHarmonicMinorScale(tonic: PitchClass): PitchCollection {
    return [];
}

function buildMelodicMinorScale(tonic: PitchClass): PitchCollection {
    return [];
}


export function buildScale(options: ScaleOptions): PitchCollection {
    return SCALE_BUILDER_STRATEGIES[options.type](options.tonic);
}