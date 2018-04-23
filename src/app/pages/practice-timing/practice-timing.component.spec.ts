import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeTimingComponent } from './practice-timing.component';

describe('PracticeTimingComponent', () => {
  let component: PracticeTimingComponent;
  let fixture: ComponentFixture<PracticeTimingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeTimingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
