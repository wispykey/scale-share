import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleSelector } from './scale-selector';

describe('ScaleSelector', () => {
  let component: ScaleSelector;
  let fixture: ComponentFixture<ScaleSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScaleSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScaleSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
