import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {NgbActiveModal,NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './../../service/app.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-registration-information',
  templateUrl: './registration-information.component.html',
  styleUrls: ['./registration-information.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationInformationComponent implements OnInit {

  constructor(private appService:AppService,private activeModal: NgbActiveModal) { }

  @Input() id;
  years:any;
  cities:any;
  registrationInfo:any;
  registartionInfoData:any;
  
  ngOnInit() {

    



  	//get registration Data
  	this.appService.getDoctorRegistrationInfo(this.id).subscribe(data=>{
  		this.registartionInfoData	=	JSON.parse(data._body);
      console.log("data",this.registartionInfoData)
  		this.registrationInfo		=	this.registartionInfoData.data;
  		console.log("info",this.registrationInfo);
  	},error=>{

  	})

  	//get years
  	this.appService.getYears().subscribe(data=>{
  		this.years=JSON.parse(data._body);
  	},error=>{

  	})

  	//get cities
    this.appService.getStates().subscribe(data=>{
      this.cities=JSON.parse(data._body);
    },error=>{

    })

  }

  formatter = (result: string) => result.toUpperCase();

  searchCity = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.cities.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));



  updateDoctorRegistrationInfo(){
  	this.appService.updateDoctorRegistrationInfo(this.id,this.registrationInfo).subscribe(data=>{
      console.log(data);
  		this.activeModal.close();
  	},error=>{})
  }

}
