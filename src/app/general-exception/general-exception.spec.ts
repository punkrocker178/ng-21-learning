import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralException } from './general-exception';

describe('GeneralException', () => {
  let component: GeneralException;
  let fixture: ComponentFixture<GeneralException>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralException],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralException);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
