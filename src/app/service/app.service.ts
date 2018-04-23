import { Injectable } from '@angular/core';
import { API_URL} from './../app.url-constant';
import { Headers, Http, RequestOptions, Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {

  constructor(private http:Http) { }

  transfer:any;

  private messageSource = new BehaviorSubject<object>(this.transfer);
  currentMessage = this.messageSource.asObservable();


  changeMessage(response) {
    this.messageSource.next(response);
  }

  errorHandler(error) {
    console.log(' error ', error.json())
    return Observable.throw(error.json());
  }

  successResponse(response) {
    return response;
  }


  //to register Doctor----
  register(data){
  	let url	=	API_URL	+ 'doctor/registration';
  	return this.http.post(url,data,{ withCredentials: true }).map(this.successResponse).catch(this.errorHandler);
  }

  //Login 
  login(data){
    let url  =  API_URL + 'login?username='+data.username+"&password="+data.password;
    return this.http.post(url,data,{ withCredentials: true }).map(this.successResponse).catch(this.errorHandler);
  }

  //get Doctor
  getDoctor(data){
    let url =  API_URL + 'doctor/' + data+ '/dashboard';
    return this.http.get(url,{ withCredentials: true }).map(this.successResponse).catch(this.errorHandler);
  }

  //getDoctor Personal information
  getDoctorPersonalInfo(id){
    let url = API_URL + 'doctor/' + id + '/personalInfo';
    return this.http.get(url,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler); 
  }

  //change personal Information
  changePersonalInfo(id,data){
    let url  =  API_URL + 'doctor/' +id+ '/update/personalInfo';
    return this.http.post(url,data,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler);
  }

  //get Doctor professional Information
  getDoctorProfessionalInfo(id){
    let url  =  API_URL + 'doctor/' +id+ '/professionalInfo';
    return this.http.get(url,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler);
  }

  //update Doctor professional Info
  changeDoctorProfessionalInfo(id,data){
    let url  =  API_URL + 'doctor/' +id+ '/update/professionalInfo';
    return this.http.post(url,data,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler); 
  }

  //get Doctor practice info
  getDoctorPracticeInfo(id){
    let url  =  API_URL + 'doctor/' +id+ '/practiceInfo';
    return this.http.get(url,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler); 
  }

  //update Doctor Practice info
  updateDoctorPracticeInfo(id,data){
    let url  =  API_URL + 'doctor/' +id+ '/update/practiceInfo';
    return this.http.post(url,data,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler); 
  }


  //--------------------------------

  //get Registration info
  getDoctorRegistrationInfo(id){
    let url  =  API_URL + 'doctor/' +id+ '/registrationInfo';
    return this.http.get(url,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler); 
  }

  //update Registration info
  updateDoctorRegistrationInfo(id,data){
    let url  =  API_URL + 'doctor/' +id+ '/update/registrationInfo';
    return this.http.post(url,data,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler); 
  }  

  //--------------------------------

  getDoctorAffiliationInfo(id){
    let url  =  API_URL + 'doctor/' +id+ '/retrieve/affiliations';
    return this.http.get(url,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler); 
  }

  updateDoctorAffiliation(id,data){
    let url  =  API_URL + 'doctor/' +id+ '/add/affiliation';
    return this.http.post(url,data,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler); 
  }

  //--------------------------------

  //get Doctors Availiability
  getDoctorAvailiability(id){
    let url  =  API_URL + 'doctor/' +id+ '/retrieve/doctorsAvailbility';
    return this.http.get(url,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler); 
  }

  //updateDoctors Availiability
  updateDoctorAvailiability(id,data){
    let url  =  API_URL + 'doctor/' +id+ '/addSlotByDay';
    return this.http.post(url,data,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler); 
  }

  //change Slot Status
  changeSlotStatus(id,day,status){
    let body={
      "day":day,
      "status":status
    }

    let url  =  API_URL + 'doctor/' +id+ '/changeSlotStatus';
    return this.http.post(url,body,{withCredentials:true}).map(this.successResponse).catch(this.errorHandler);
  }

  //--------------------------------
  //get states 
  getStates(){
    let url  =  './assets/json-data/indian-state.json';
    return this.http.get(url).map(this.successResponse).catch(this.errorHandler);
  }

  //get years 
  getYears(){
    let url  =  './assets/json-data/years.json';
    return this.http.get(url).map(this.successResponse).catch(this.errorHandler);
  }

  //get month 
  getMonth(){
    let url  =  './assets/json-data/month.json';
    return this.http.get(url).map(this.successResponse).catch(this.errorHandler);
  }

  //get Date 
  getDate(){
    let url  =  './assets/json-data/date.json';
    return this.http.get(url).map(this.successResponse).catch(this.errorHandler);
  }

  //get Specialities
  getSpecialities(){
    let url  =  './assets/json-data/speciality.json';
    return this.http.get(url).map(this.successResponse).catch(this.errorHandler);
  }

}
