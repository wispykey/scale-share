import { Component, inject } from '@angular/core';
import { ScaleBuilderService } from '../_services/scale-builder.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    scale: new FormControl('major'),
  });



  ngOnInit() {
    this.form.setValue({ tonic: 'C', scale: 'major' });
    this.form.valueChanges.subscribe(values => {
      console.log('Form changed:', values);
      // call your scale builder service here
    });
  }
}
