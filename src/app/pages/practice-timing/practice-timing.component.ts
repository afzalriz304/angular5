import { Component, OnInit, ViewEncapsulation,Input } from '@angular/core';
import {NgbModal, NgbActiveModal, ModalDismissReasons,NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './../../service/app.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs/Observable';


const slots =[
	{
		day:"Mon",
		name:"monday",
		avail:true
	},{
		day:"Tue",
		name:"tuesday",
		avail:true
	},{
		day:"Wed",
		name:"wednesday",
		avail:true
	},{
		day:"Thu",
		name:"thursday",
		avail:true
	},{
		day:"Fri",
		name:"friday",
		avail:true
	},{
		day:"Sat",
		name:"saturday",
		avail:true
	},{
		day:"Sun",
		name:"sunday",
		avail:true
	}
]


@Component({
  selector: 'app-practice-timing',
  templateUrl: './practice-timing.component.html',
  styleUrls: ['./practice-timing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PracticeTimingComponent implements OnInit {

  constructor( private activeModal: NgbActiveModal, private appService:AppService, private router:Router,private config:NgbTooltipConfig) { }

  public isCollapsed = true;
  
  @Input() id;

  response:any;
  weekSlot:object[];
  slotDay:string;
  slotObject:any;
  mode:number=0;
  morning:string;
  evening:string;
  afternoon:string;
  night:string;
  slotType:string;

  ngOnInit() {
  	this.config.placement = 'right';
  	this.config.triggers = 'click';
  	this.response=[];
  	this.weekSlot=slots;
  	this.slotDay="monday";
    
    this.morning="morning";
    this.afternoon="afternoon";
    this.evening="evening";
    this.night="night";

    this.slotObject={
    day:"Mon",
    name:"monday",
    avail:true
    }

    //get Availiability
    this.appService.getDoctorAvailiability(this.id).subscribe(data=>{
      console.log(JSON.parse(data._body));
    })
  }



  changeTab(tab,currentTab){
  	this.resetTabs();
    tab=="face2face" ? this.mode=0 : this.mode=1;
  	$(currentTab).addClass('active');
  	$("#"+tab).show(300);
  }

  resetTabs(){
  	$('.nav-item').removeClass('active');
  	$('.tabs').hide(300);
  }

  openTooltip(slot){
    this.slotObject=slot;
    console.log("parent---",this.slotObject);
  	this.slotDay=slot.name;
  }

  onSubmitSlot(response){
    console.log("day",this.slotObject);
    console.log("response",response);

    let body={
      "day":this.slotObject.name,
      "timeRangeAndMode":{
        "fromTime":{
          "hour":parseInt(response.fromHH),
          "minute":parseInt(response.fromMM),
          "seconds":0
        },
        "toTime":{
          "hour":parseInt(response.toHH),
          "minute":parseInt(response.toMM),
          "seconds":0
        },
        "mode":this.mode,
        "slotType":response.slotType
      }
    }

    console.log("finalObj",body);

    this.appService.updateDoctorAvailiability(this.id,body).subscribe(data=>{
      console.log(data._body);
    })


  }

  //delete the slot
  deleteSlot(day,status){
    
    var action;
    !status ? action = "free" : action="available";
    if(confirm("Are you want to "+ action)){
      console.log("yes")

      if(status){
        $("#"+day).removeAttr("disabled")
        this.appService.changeSlotStatus(this.id,day,true).subscribe(data=>{
          console.log(data);
        });
      }else{
        this.appService.changeSlotStatus(this.id,day,false).subscribe(data=>{
          console.log(data);
        });
        $("#"+day).attr("disabled","disabled")
      }

      //!status ? $("#"+day).attr("disabled","disabled") :$("#"+day).removeAttr("disabled");
    }else{
      console.log("no");
      if(!status){
        $("#"+day).removeAttr("disabled")
        this.appService.changeSlotStatus(this.id,day,true).subscribe(data=>{
          console.log(data);
        });
      }else{
        this.appService.changeSlotStatus(this.id,day,false).subscribe(data=>{
          console.log(data);
        });
        $("#"+day).attr("disabled","disabled")
      }
      //status ? $("#"+day).attr("disabled","disabled") :$("#"+day).removeAttr("disabled");
    }
  }

}
