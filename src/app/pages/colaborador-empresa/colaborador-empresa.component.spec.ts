import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorEmpresaComponent } from './colaborador-empresa.component';

describe('ColaboradorEmpresaComponent', () => {
  let component: ColaboradorEmpresaComponent;
  let fixture: ComponentFixture<ColaboradorEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboradorEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradorEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
