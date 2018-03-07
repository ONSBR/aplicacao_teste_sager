import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCenarioComponent } from './dialog-cenario.component';

describe('DialogCenarioComponent', () => {
  let component: DialogCenarioComponent;
  let fixture: ComponentFixture<DialogCenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCenarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
