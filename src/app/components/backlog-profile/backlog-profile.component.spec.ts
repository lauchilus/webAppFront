import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogProfileComponent } from './backlog-profile.component';

describe('BacklogProfileComponent', () => {
  let component: BacklogProfileComponent;
  let fixture: ComponentFixture<BacklogProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BacklogProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
