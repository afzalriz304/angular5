import { Component, OnInit, ViewEncapsulation, EventEmitter, Output,Input  } from '@angular/core';

@Component({
  selector: 'app-add-slot-template',
  templateUrl: './add-slot-template.component.html',
  styleUrls: ['./add-slot-template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddSlotTemplateComponent implements OnInit {

  constructor() { }

  @Input() daySlotObject:any;
  @Input() slotType:string="";
  @Output() submitTimeSlot = new EventEmitter<object>();  

  public isCollapsed = true;
  
  slot:any;

  ngOnInit() {
  	console.log("child---",this.daySlotObject);
  	console.log("child---",this.slotType);
  	/*this.slot=this.slotObj;*/
  	this.slot={
  		"fromHH":"",
  		"fromMM":"",
  		"fromPeriod":"",
  		"toHH":"",
  		"toMM":"",
  		"toPeriod":""
  	}
  }

  onSubmitTimeSlot(timeObj){
  	timeObj.slotType=this.slotType;
  	console.log("timeObj",timeObj);
  	this.submitTimeSlot.emit(timeObj);
  }

}
