import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReprocessamentosPendentesComponent } from './lista-reprocessamentos-pendentes.component';

describe('ListaReprocessamentosPendentesComponent', () => {
  let component: ListaReprocessamentosPendentesComponent;
  let fixture: ComponentFixture<ListaReprocessamentosPendentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReprocessamentosPendentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReprocessamentosPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
