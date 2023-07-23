import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import {LoginComponent} from "../login/login.component";
import {HttpClient} from "@angular/common/http";

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  class HttpClientMock{}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      providers: [
        RegistrationComponent,
        {provide: HttpClient, useClass: HttpClientMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('generate form', () => {
    it('should generate form', () => {
      component.ngOnInit()
      expect(component.regForm.value).toEqual({email: '', name: '', date_of_birth: '', password: ''})
    })
  })

});
