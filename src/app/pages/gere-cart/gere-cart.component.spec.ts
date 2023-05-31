import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GereCartComponent } from './gere-cart.component';

describe('GereCartComponent', () => {
  let component: GereCartComponent;
  let fixture: ComponentFixture<GereCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GereCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GereCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
