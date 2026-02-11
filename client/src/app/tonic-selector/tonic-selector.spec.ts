import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TonicSelector } from './tonic-selector';

describe('TonicSelector', () => {
  let component: TonicSelector;
  let fixture: ComponentFixture<TonicSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TonicSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TonicSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
