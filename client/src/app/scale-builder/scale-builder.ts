import { Component, inject } from '@angular/core';
import { ScaleBuilderService } from '../_services/scale-builder.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ScaleFormOptions } from '../../music-theory/types';

@Component({
  selector: 'app-scale-builder',
  imports: [ReactiveFormsModule],
  templateUrl: './scale-builder.html',
  styleUrl: './scale-builder.scss',
})
export class ScaleBuilder {
  builder: ScaleBuilderService = inject(ScaleBuilderService);

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
  });



  ngOnInit() {
    this.form.valueChanges.subscribe(values => {
      console.log('Form changed:', values);
      this.builder.createScale(values as ScaleFormOptions);
    });
  }
}
