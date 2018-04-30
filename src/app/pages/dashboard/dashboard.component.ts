import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from './../../service/app.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './../../common/modal/modal.component';

import { ProfessionalInformationComponent } from './../../pages/professional-information/professional-information.component';
import { PersonalInformationComponent } from './../../pages/personal-information/personal-information.component';
import { PracticeInformationComponent } from './../../pages/practice-information/practice-information.component';
import { RegistrationInformationComponent } from './../../pages/registration-information/registration-information.component';
import { AffiliationsComponent } from './../../pages/affiliations/affiliations.component';
import { EducationAndTrainingComponent } from './../../pages/education-and-training/education-and-training.component';
import { PracticeTimingComponent } from './../../pages/practice-timing/practice-timing.component';
import * as jQuery from 'jquery';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('myAwesomeAnimation', [
        state('small', style({
            transform: 'scale(1)',
        })),
        state('large', style({
            transform: 'scale(1.4)',
        })),
        transition('small => large', animate('100ms ease-in')),
    ]),
  ]
})
export class DashboardComponent implements OnInit {

  about: boolean;
  availability: boolean;
  dashboard: boolean;
  title = 'app';
  loading:boolean=false;
  response:any;
  addPatientAnimate={
    state:'small'
  }
  patientAnimate={
    state:'small'
  }
  calenderAnimate={
    state:'small'
  }
  settingsAnimate={
    state:'small'
  }
  logoutAnimate={
    state:'small'
  }

  closeResult: string;
  DashboardData:any;
  Doctor:any;
  constructor(private appService:AppService,private router:Router,private modalService: NgbModal) {
    
  }


  ngOnInit(){
    this.response={};
    this.animateMe('',this.addPatientAnimate);
    this.dashboard = true;
  }

  
  mouseEnter(element){
    jQuery(element).find("path").attr("fill","#12375C")
    jQuery(element).parent('div').addClass("hightlight");
  }
  mouseLeave(element){
    if(!jQuery(element).parent('div').hasClass("activeIcon")){
      jQuery(element).parent('div').removeClass("hightlight");

      jQuery(element).find("path").attr("fill","#fff")
    }
  }

  animateMe(element,part) {
    console.log(jQuery(element).parent('div').hasClass("activeIcon"))
    if(!jQuery(element).parent('div').hasClass("activeIcon")){
      part.state = (part.state === 'small' ? 'large' : 'small');
    }
    
  }


  ngAfterContentInit(){
    this.appService.getDoctor(sessionStorage.getItem("auth_key")).subscribe(data=>{
      this.DashboardData=JSON.parse(data._body);
      this.Doctor= this.DashboardData.data;
      console.log(this.Doctor);
      console.log(data);
    }),error=>{
      this.router.navigate(['/errorPage']);
    }
  }

  menuToggle(response){
    console.log("response-----------",response);
    var boxsize=$(".sidenav").width();
    if(!response){
      $(".sidenav").animate({
        width:0
      },function(){
        $(".list").hide()
        $(".side-navbar").animate({
          width:100
        })
      })
    }
    else{
      $(".sidenav").animate({
        width: 193
      },function(){
        $(".side-navbar").animate({
          width:200
        })
      })
      $(".list").show(1000)
    }
  }


  open(requestPage) {

    switch (requestPage) {
      case "PersonalInformationComponent":
        this.modalService.open(PersonalInformationComponent).componentInstance.id = this.Doctor.id;
        //this.router.navigate(['/dashboard/Personal']);   
        break;

      case "PracticeTimingComponent":
        this.modalService.open(PracticeTimingComponent,{
           size: 'lg'
        }).componentInstance.id = this.Doctor.id;
        //this.router.navigate(['/dashboard/professional']); 
        break;

      case "PracticeInformationComponent":
        this.modalService.open(PracticeInformationComponent).componentInstance.id = this.Doctor.id;
        //this.router.navigate(['/dashboard/professional']); 
        break;
        
      case "RegistrationInformationComponent":
        this.modalService.open(RegistrationInformationComponent).componentInstance.id = this.Doctor.id;
        //this.router.navigate(['/dashboard/professional']); 
        break;

      case "AffiliationsComponent":
        this.modalService.open(AffiliationsComponent,{
          size: 'lg'
        }).componentInstance.id = this.Doctor.id;
        //this.router.navigate(['/dashboard/professional']); 
        break;

      case "EducationAndTrainingComponent":
        this.modalService.open(EducationAndTrainingComponent,{
          size: 'lg'
        }).componentInstance.id = this.Doctor.id;
        //this.router.navigate(['/dashboard/professional']); 
        break;

        
      default:
        alert('not developed')
        break;
    }
    
  }

  resetAll(){
    this.dashboard = false;
    this.availability = false;
    this.about = false;

  }

  changeComponent(response) {
    this.resetAll();
    console.log(response);
    switch(response) {
      case 'availability': this.availability = true;
                        break;
      case 'dashboard': this.dashboard = true;
                        break;
      case 'about': this.about = true;
                        break;
    }
  }

}
