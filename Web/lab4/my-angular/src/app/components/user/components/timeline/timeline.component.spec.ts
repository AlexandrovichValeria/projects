import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent } from './timeline.component';
import {LoginComponent} from "../../../login/login.component";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../../../../services/login.service";

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;
  class HttpClientMock{}
  /*const loginServiceMock = {
    logout: 'returnValue1',
    method2: 'returnValue2'
  }*/
  //const mockGetNewsById = jest.fn(x => 42 + x);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineComponent ],
      providers: [
        TimelineComponent,
        {provide: HttpClient, useClass: HttpClientMock}]
        //{provide: LoginService, useClass: loginServiceMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*describe('exit method', () => {
    it('should return mock var', () => {

      expect(component.exit()).toBe()
    })
  })*/

  /*describe('check img_dir', () => {
    it('should set img_dir', () => {
      //component.loginForm = new FormGroup<any>({
      //email: "asd@asd",
      //password: "123456qwe"})
      component.user.id = '1';
      component.ngOnInit()
      expect(component.img_dir).toEqual("/assets/photos/1.jpg")
    })
  })*/
});
