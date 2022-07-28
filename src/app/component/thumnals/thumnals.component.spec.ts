import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumnalsComponent } from './thumnals.component';

describe('ThumnalsComponent', () => {
  let component: ThumnalsComponent;
  let fixture: ComponentFixture<ThumnalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumnalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumnalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
