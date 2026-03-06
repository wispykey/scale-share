import { expect, test } from 'vitest'
import { buildScale } from '../music-theory/build-scale'
import { MajorScaleKeys, MajorScales, MinorScaleKeys, NaturalMinorScales } from '../music-theory/types';



for (const key of MajorScaleKeys) {
    test(`${key} major scale`, () => {
        expect(buildScale({
            scaleType: 'major',
            tonic: `${key}`
        })).toEqual({
            ascending: MajorScales[key],
            scaleType: 'major'
        })
    });
}

for (const key of MinorScaleKeys) {
    test(`${key} natural minor scale`, () => {
        expect(buildScale({
            scaleType: 'natural-minor',
            tonic: `${key}`
        })).toEqual({
            ascending: NaturalMinorScales[key],
            scaleType: 'natural-minor'
        })
    });
}


for (const key of MinorScaleKeys) {
    test(`builds ${key} natural minor scale, even when harmonic is specified`, () => {
        expect(buildScale({
            scaleType: 'harmonic-minor',
            tonic: `${key}`
        })).toEqual({
            ascending: NaturalMinorScales[key],
            scaleType: 'harmonic-minor'
        })
    });
}


for (const key of MinorScaleKeys) {
    test(`builds ${key} natural minor scale, even when melodic is specified`, () => {
        expect(buildScale({
            scaleType: 'melodic-minor',
            tonic: `${key}`
        })).toEqual({
            ascending: NaturalMinorScales[key],
            scaleType: 'melodic-minor'
        })
    });
}


for (const key of MajorScaleKeys) {
    test(`${key} major arpeggio`, () => {
        let scale = MajorScales[key];
        expect(buildScale({
            scaleType: 'major-triad-arpeggio',
            tonic: `${key}`
        })).toEqual({
            ascending: [scale[0], scale[2], scale[4]],
            scaleType: 'major-triad-arpeggio'
        })
    });
}


for (const key of MinorScaleKeys) {
    test(`${key} minor arpeggio`, () => {
        let scale = NaturalMinorScales[key];
        expect(buildScale({
            scaleType: 'minor-triad-arpeggio',
            tonic: `${key}`
        })).toEqual({
            ascending: [scale[0], scale[2], scale[4]],
            scaleType: 'minor-triad-arpeggio'
        })
    });
}

