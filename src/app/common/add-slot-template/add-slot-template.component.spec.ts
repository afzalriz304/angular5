import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlotTemplateComponent } from './add-slot-template.component';

describe('AddSlotTemplateComponent', () => {
  let component: AddSlotTemplateComponent;
  let fixture: ComponentFixture<AddSlotTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSlotTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSlotTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
