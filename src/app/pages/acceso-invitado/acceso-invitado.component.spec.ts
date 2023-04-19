import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoInvitadoComponent } from './acceso-invitado.component';

describe('AccesoInvitadoComponent', () => {
  let component: AccesoInvitadoComponent;
  let fixture: ComponentFixture<AccesoInvitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesoInvitadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesoInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
