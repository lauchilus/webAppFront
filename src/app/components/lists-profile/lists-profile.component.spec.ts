import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsProfileComponent } from './lists-profile.component';

describe('ListsProfileComponent', () => {
  let component: ListsProfileComponent;
  let fixture: ComponentFixture<ListsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListsProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
