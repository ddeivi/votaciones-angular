import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCandidatosComponent } from './ver-candidatos.component';

describe('VerCandidatosComponent', () => {
  let component: VerCandidatosComponent;
  let fixture: ComponentFixture<VerCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
