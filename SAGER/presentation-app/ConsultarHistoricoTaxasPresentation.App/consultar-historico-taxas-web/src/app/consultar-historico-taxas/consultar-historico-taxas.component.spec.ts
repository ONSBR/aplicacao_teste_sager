import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarHistoricoTaxasComponent } from './consultar-historico-taxas.component';

describe('ConsultarHistoricoTaxasComponent', () => {
  let component: ConsultarHistoricoTaxasComponent;
  let fixture: ComponentFixture<ConsultarHistoricoTaxasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarHistoricoTaxasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarHistoricoTaxasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
