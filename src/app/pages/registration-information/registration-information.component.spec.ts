import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationInformationComponent } from './registration-information.component';

describe('RegistrationInformationComponent', () => {
  let component: RegistrationInformationComponent;
  let fixture: ComponentFixture<RegistrationInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
