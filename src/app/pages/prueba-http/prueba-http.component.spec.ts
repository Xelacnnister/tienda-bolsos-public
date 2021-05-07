import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaHttpComponent } from './prueba-http.component';

describe('PruebaHttpComponent', () => {
  let component: PruebaHttpComponent;
  let fixture: ComponentFixture<PruebaHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaHttpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
