import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantertarefaComponent } from './mantertarefa.component';

describe('MantertarefaComponent', () => {
  let component: MantertarefaComponent;
  let fixture: ComponentFixture<MantertarefaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantertarefaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantertarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
