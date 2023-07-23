import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableElementComponent } from './user-table-element.component';

describe('UserTableElementComponent', () => {
  let component: UserTableElementComponent;
  let fixture: ComponentFixture<UserTableElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTableElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTableElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
