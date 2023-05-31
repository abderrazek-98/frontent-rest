import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGerantComponent } from './add-gerant.component';

describe('AddGerantComponent', () => {
  let component: AddGerantComponent;
  let fixture: ComponentFixture<AddGerantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGerantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
