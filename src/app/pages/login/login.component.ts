import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../service/app.service';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {


  //form variables
  loginForm:FormGroup;


  constructor(private appService:AppService,private router:Router,private fb:FormBuilder) { 
    this.loginForm  =  fb.group({
      'username': [null,Validators.required],
      'password': [null,Validators.required]
    })
  }

  username:String='';
  loading:boolean=false;
  password:String='';

  ngOnInit() {
  }

  

  loginDoctor(){

  this.loading  =  true;


  let body ={
  		"username":this.username,
  		"password":this.password
	}

	this.appService.login(body).subscribe(data=>{
    console.log("data----------------",data);
    var response  =  JSON.parse(data._body);
    sessionStorage.setItem("auth_key",response.data);

		this.router.navigate(['home/dashboard']);
	}),error=>{
		this.router.navigate(['/errorPage']);
	}

  }

}
