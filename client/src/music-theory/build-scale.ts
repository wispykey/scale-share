import { InvalidMajorKeyError, InvalidMinorKeyError } from "./errors";
import { type PitchName, type Scale, type ScaleType, MajorScaleNotes, NaturalMinorScaleNotes, ScaleBaseOptions, TRIAD_SCALE_DEGREES_AS_INDICES } from "./types";
import { isMajorScaleKey, isMinorScaleKey } from "./utils";

type ScaleBuilderFunction = (tonic: PitchName) => Scale;

const SCALE_BUILDER_STRATEGIES: Record<ScaleType, ScaleBuilderFunction> = {
    'major': (tonic: PitchName) => buildMajorScale(tonic),
    'natural-minor': (tonic: PitchName) => buildNaturalMinorScale(tonic),
    // Contextual alteration to specific scale degrees (i.e. 6, 7) are handled later, during scale expansion
    // so we just use natural minor to set the foundation here
    'harmonic-minor': (tonic: PitchName) => buildHarmonicMinorScale(tonic),
    'melodic-minor': (tonic: PitchName) => buildMelodicMinorScale(tonic),
    'major-triad-arpeggio': (tonic: PitchName) => buildMajorTriadArpeggio(tonic),
    'minor-triad-arpeggio': (tonic: PitchName) => buildMinorTriadArpeggio(tonic)
}

function buildMajorTriadArpeggio(tonic: PitchName): Scale {
    if (!isMajorScaleKey(tonic)) throw new InvalidMajorKeyError(tonic);
    let scale: Scale = {
        ascending: MajorScaleNotes[tonic as keyof typeof MajorScaleNotes],
        scaleType: 'major-triad-arpeggio'
    }
    scale.ascending = scale.ascending.filter((_value, index) => TRIAD_SCALE_DEGREES_AS_INDICES.includes(index));
    return scale;
}

function buildMinorTriadArpeggio(tonic: PitchName): Scale {
    if (!isMinorScaleKey(tonic)) throw new InvalidMinorKeyError(tonic);
    let scale: Scale = {
        ascending: NaturalMinorScaleNotes[tonic as keyof typeof NaturalMinorScaleNotes],
        scaleType: 'minor-triad-arpeggio'
    }
    scale.ascending = scale.ascending.filter((_value, index) => TRIAD_SCALE_DEGREES_AS_INDICES.includes(index));
    return scale;
}

function buildMajorScale(tonic: PitchName): Scale {
    if (!isMajorScaleKey(tonic)) throw new InvalidMajorKeyError(tonic);
    return {
        ascending: MajorScaleNotes[tonic as keyof typeof MajorScaleNotes],
        scaleType: 'major'
    }
}

function buildHarmonicMinorScale(tonic: PitchName): Scale {
    if (!isMinorScaleKey(tonic)) throw new InvalidMinorKeyError(tonic);
    return {
        ascending: NaturalMinorScaleNotes[tonic as keyof typeof NaturalMinorScaleNotes],
        scaleType: 'harmonic-minor'
    }
}

function buildMelodicMinorScale(tonic: PitchName): Scale {
    if (!isMinorScaleKey(tonic)) throw new InvalidMinorKeyError(tonic);
    return {
        ascending: NaturalMinorScaleNotes[tonic as keyof typeof NaturalMinorScaleNotes],
        scaleType: 'melodic-minor'
    }
}


function buildNaturalMinorScale(tonic: PitchName): Scale {
    if (!isMinorScaleKey(tonic)) throw new InvalidMinorKeyError(tonic);
    return {
        ascending: NaturalMinorScaleNotes[tonic as keyof typeof NaturalMinorScaleNotes],
        scaleType: 'natural-minor'
    }
}

export function buildScale(options: ScaleBaseOptions): Scale {
    return SCALE_BUILDER_STRATEGIES[options.scaleType](options.tonic);
}