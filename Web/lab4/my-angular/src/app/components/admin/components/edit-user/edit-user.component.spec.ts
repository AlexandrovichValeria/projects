import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import {LoginComponent} from "../../../login/login.component";
import {HttpClient} from "@angular/common/http";

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  class HttpClientMock {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserComponent ],
      providers: [
        EditUserComponent,
        {provide: HttpClient, useClass: HttpClientMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*describe('generate form', () => {
    it('should generate form', () => {
      //component.loginForm = new FormGroup<any>({
      //email: "asd@asd",
      //password: "123456qwe"})
      let spy = jest.spyOn(HttpClientMock, 'get').mockImplementation(() => 'Hello');
      component.ngOnInit()
      expect(component.userEditForm.value).toEqual({name: '', date_of_birth: '', email: '', role: '', status: ''})
    })
  })*/
});
