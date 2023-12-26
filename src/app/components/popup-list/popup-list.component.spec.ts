import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupListComponent } from './popup-list.component';

describe('PopupListComponent', () => {
  let component: PopupListComponent;
  let fixture: ComponentFixture<PopupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
