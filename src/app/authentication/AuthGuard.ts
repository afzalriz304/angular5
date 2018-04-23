import { Router,CanActivate} from "@angular/router";
import { Injectable } from '@angular/core';
import { UserService } from './userService';

@Injectable()
export class AuthGuard implements CanActivate{

	constructor(private userService:UserService,private router:Router){}

	canActivate(){

    	if(this.userService.isLoggedIn()){
	    	return true;
	    }else{
	    	this.router.navigate(['/login'])
	    	return false;
	    }

  }
}