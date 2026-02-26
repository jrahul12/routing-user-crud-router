import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSingleCardComponent } from './user-single-card.component';

describe('UserSingleCardComponent', () => {
  let component: UserSingleCardComponent;
  let fixture: ComponentFixture<UserSingleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSingleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSingleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
