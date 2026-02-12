import { Injectable } from '@angular/core';
import { buildScale } from '../../music-theory/build-scale';
import { Scale, ScaleFormOptions } from '../../music-theory/types';
import { expandScale } from '../../music-theory/expand-scale';
import { divideScaleIntoMeasures } from '../../music-theory/edit-scale';

@Injectable({
    providedIn: 'root',
})
export class ScaleBuilderService {
    createScale(options: ScaleFormOptions) {
        console.log(options);
        let scale: Scale = buildScale({ ...options });
        console.log(scale);
        let notes = expandScale(scale, { ...options });
        console.log(notes);
        let phrase = divideScaleIntoMeasures(notes, { numerator: 4, denominator: 4 });

        return phrase;



    }
}
