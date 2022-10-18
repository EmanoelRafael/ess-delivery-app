import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompedidosComponent } from './acompedidos.component';

describe('AcompedidosComponent', () => {
  let component: AcompedidosComponent;
  let fixture: ComponentFixture<AcompedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcompedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcompedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
