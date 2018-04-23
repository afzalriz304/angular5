import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from './../../service/app.service';
import { NgModel,FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {



  name:String='';
  email:String='';
  password:String='';
  regNo:String='';
  regYear:String='';
  regState:String='';
  states:any;
  years:any;

  //form validation 
  registerForm_part_1:FormGroup;
  registerForm_part_2:FormGroup;
  post:any;


  constructor(private appService:AppService,private router:Router,private fb:FormBuilder) { 

    this.registerForm_part_1  =  fb.group({
      'password'  :  [null,Validators.compose([Validators.required,Validators.minLength(8)])],
      'name'  :  [null,Validators.required],
      'email'  :  [null,Validators.email]
    })

    this.registerForm_part_2  =  fb.group({
      'regNo'  :  [null,Validators.required],
      'regYear'  :  [null,Validators.required],
      'model'  :  [null,Validators.required]
    })
  }

  ngOnInit() {
    
    //get states
    this.appService.getStates().subscribe(data=>{
      this.states=JSON.parse(data._body);
    },error=>{

    })

    //get years
    this.appService.getYears().subscribe(data=>{
      this.years=JSON.parse(data._body);
    },error=>{

    })
  }

  public model: any;

  formatter = (result: string) => result.toUpperCase();

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  save(){
    let body={
      "name":this.name,
      "email":this.email,
      "password":this.password,
      "registrationInfo":{
        "regNo":this.regNo,
        "regYear":this.regYear,
        "regState":this.model
      }
    }
    
    this.appService.register(body).subscribe(data =>{
      
      var Data  =  JSON.parse(data._body);
      console.log(Data);
      window.sessionStorage.setItem("auth_key",Data.data);
      this.router.navigate(['/dashboard']);
    },error=>{
      this.router.navigate(['/errorPage']);
    })
  }

  nextForm(){
    jQuery("#form-part-1").slideUp();
    jQuery("#form-part-2").slideDown();
  }

  prevForm(){
    jQuery("#form-part-2").slideUp();
    jQuery("#form-part-1").slideDown();
  }

}
