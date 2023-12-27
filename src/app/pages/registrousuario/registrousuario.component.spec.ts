import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrousuarioComponent } from './registrousuario.component';

describe('RegistrousuarioComponent', () => {
  let component: RegistrousuarioComponent;
  let fixture: ComponentFixture<RegistrousuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrousuarioComponent]
    });
    fixture = TestBed.createComponent(RegistrousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
