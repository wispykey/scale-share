import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleBuilder } from './scale-builder';

describe('ScaleBuilder', () => {
  let component: ScaleBuilder;
  let fixture: ComponentFixture<ScaleBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScaleBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScaleBuilder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
