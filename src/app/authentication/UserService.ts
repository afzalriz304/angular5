import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

	isLoggedIn():boolean{

		if(sessionStorage.getItem("auth_key")!=undefined){
			return true;
		}else{
			return false;
		}
	}
}