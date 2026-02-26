import { Component, inject } from '@angular/core';
import { ScaleBuilderService } from '../_services/scale-builder.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ScaleFormOptions } from '../../music-theory/types';
import { ScoreRendererService } from '../_services/score-renderer.service';
import { createPhrase } from '../../music-theory/create-phrase';

@Component({
  selector: 'app-scale-builder',
  imports: [ReactiveFormsModule],
  templateUrl: './scale-builder.html',
  styleUrl: './scale-builder.scss',
})
export class ScaleBuilder {
  builder: ScaleBuilderService = inject(ScaleBuilderService);
  renderer: ScoreRendererService = inject(ScoreRendererService);

  fb = new FormBuilder();

  form = new FormGroup({
    tonic: new FormControl('C'),
    scaleType: new FormControl('major'),
    initialRegister: new FormControl(4),
    minNote: new FormControl({
      name: 'Bb',
      register: 3
    }),
    maxNote: new FormControl({
      name: 'F#',
      register: 6
    }),
    rhythm: new FormControl([]),
    timeSignature: new FormControl({
      numerator: 4,
      denominator: 4
    }),
    articulationPattern: new FormControl([]),
    showKeySignature: new FormControl(false),
    showExtraAccidentals: new FormControl(false)
  });



  ngOnInit() {
    this.form.valueChanges.subscribe(values => {
      this.renderer.render(values as ScaleFormOptions);
    });
  }
}
