import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsComponent } from './add-news.component';
import {LoginComponent} from "../../../login/login.component";
import {HttpClient} from "@angular/common/http";

describe('AddNewsComponent', () => {
  let component: AddNewsComponent;
  let fixture: ComponentFixture<AddNewsComponent>;
  class HttpClientMock{}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewsComponent ],
      providers: [
        AddNewsComponent,
        {provide: HttpClient, useClass: HttpClientMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('generate form', () =>{
    it('should generate form', () =>{
      //component.loginForm = new FormGroup<any>({
      //email: "asd@asd",
      //password: "123456qwe"})

      component.ngOnInit()
      expect(component.addNewsForm.value).toEqual({news_content: ''})
    })
  })
});
