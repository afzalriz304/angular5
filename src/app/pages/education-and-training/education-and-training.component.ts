import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from './../../service/app.service';

@Component({
  selector: 'app-education-and-training',
  templateUrl: './education-and-training.component.html',
  styleUrls: ['./education-and-training.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EducationAndTrainingComponent implements OnInit {


  constructor(private appService : AppService) { }

  public isCollapsed = true;

  availableSlot:any;

  ngOnInit() {
    /*this.appService.currentMessage(this.availableSlot).subscribe(data=>{
      
    })*/
  }


  changeTab(tab,currentTab){
  	this.resetTabs();
  	$(currentTab).addClass('active');
  	$("#"+tab).show(300);
  }

  resetTabs(){
  	$('.nav-item').removeClass('active');
  	$('.tabs').hide(300);
  }

}
