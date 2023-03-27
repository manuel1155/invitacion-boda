import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnversoComponent } from './anverso.component';

describe('AnversoComponent', () => {
  let component: AnversoComponent;
  let fixture: ComponentFixture<AnversoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnversoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnversoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
