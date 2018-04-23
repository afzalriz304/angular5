import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AppService } from './../../service/app.service';
import { NgbActiveModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-professional-information',
  templateUrl: './professional-information.component.html',
  styleUrls: ['./professional-information.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfessionalInformationComponent implements OnInit {


	@Input() id;
  

  response:any;
  professionalData:any;
  states:any;
  specialities:any;

  constructor(private appService:AppService,private activeModal: NgbActiveModal) { }

  ngOnInit() {

    //get cities
    this.appService.getStates().subscribe(data=>{
      this.states=JSON.parse(data._body);
    },error=>{

    })

    //get speciality
    this.appService.getSpecialities().subscribe(data=>{
      var response  =  JSON.parse(data._body);
      this.specialities=response.specialities;
    })

    //get professional data
    this.appService.getDoctorProfessionalInfo(this.id).subscribe(data=>{
      this.response  =  JSON.parse(data._body);
      if(this.response.status)
        this.professionalData  =  this.response.data;
      

      console.log(this.professionalData)
    },error=>{

    })
  }

  ngAfterContentInit(){

    
  }

  formatter = (result: string) => result.toUpperCase();

  searchCity = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));


  //update professional info
  updateProfessionalProfile(){
    this.appService.changeDoctorProfessionalInfo(this.id,this.professionalData).subscribe(data=>{
      console.log(data);
      this.activeModal.close();
    },error=>{

    })
  }

}
