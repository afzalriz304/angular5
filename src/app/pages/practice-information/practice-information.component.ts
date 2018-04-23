import { Component, OnInit, ViewEncapsulation ,Input} from '@angular/core';
import {NgbActiveModal,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './../../service/app.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-practice-information',
  templateUrl: './practice-information.component.html',
  styleUrls: ['./practice-information.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PracticeInformationComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal,private appService:AppService) { }

  @Input() id;
  practiceInfoData:any;
  experienceList:String[]=[];
  practiceInfo:any;
  languages:any;
  response:any;
  professionalData:any;
  states:any;
  specialities:any;

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
  	
  	//get Doctor Practice Info---
  	this.appService.getDoctorPracticeInfo(this.id).subscribe(data=>{
  		this.practiceInfoData	=	JSON.parse(data._body);
  		this.practiceInfo		=	this.practiceInfoData.data;
      console.log(this.practiceInfoData.data)
  	},error=>{

  	})

  	//set experience list
  	for(let i=0;i<39;i++){
  		this.experienceList.push(i+'-'+(i+1));
  	}

  }

  formatter = (result: string) => result.toUpperCase();

  searchCity = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));


  updateDoctorPracticeInfo(){
    console.log(this.practiceInfo);
  	this.appService.updateDoctorPracticeInfo(this.id,this.practiceInfo).subscribe(data=>{
  		console.log(data);
  		this.activeModal.close();
  	},error=>{})
  }

}
