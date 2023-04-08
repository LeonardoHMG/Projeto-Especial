import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDepartamentoComponent } from './dialog-departamento.component';

describe('DialogDepartamentoComponent', () => {
  let component: DialogDepartamentoComponent;
  let fixture: ComponentFixture<DialogDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDepartamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
