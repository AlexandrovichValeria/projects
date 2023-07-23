import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import 'zone.js'
//import 'zone.js/testing';
//import 'zone.js/testing';
//import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  class HttpClientMock{}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        LoginComponent,
        {provide: HttpClient, useClass: HttpClientMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check sum', () => {
    it ('should be sum', () => {
      component.sum(1, 3)
      expect(component.summ).toEqual(4)
    })
  })

  describe('generate form', () =>{
    it('should generate form', () =>{
      //component.loginForm = new FormGroup<any>({
        //email: "asd@asd",
        //password: "123456qwe"})

      component.ngOnInit()
      expect(component.loginForm.value).toEqual({email: '', password: ''})
  })
})
});
