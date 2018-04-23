import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import * as jQuery from 'jquery';
import { AppService } from './../../service/app.service';
import { Affiliation } from './../../model/Affiliation';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-affiliations',
  templateUrl: './affiliations.component.html',
  styleUrls: ['./affiliations.component.css'],
  encapsulation: ViewEncapsulation.None
})


  /*const pastAffiliations:Affiliation[]=[];
  const activeAffiliations:Affiliation[]=[];*/

export class AffiliationsComponent implements OnInit {

  public isCollapsed = true;

  @Input() id;
  constructor(private appService:AppService) { }

  
  year:any;
  month:any;
  cities:any;
  isChecked = false;
  affiliationData:any;
  affiliation:any;
  hospital:any;
  hosId:String;
  depCode:number;  
  depName:String;
  hospitalName:String;
  hospitalCity:String;
  dateStarted:String;
  dateEnd:String;
  toMM:any;
  toYY:any;
  fromMM:any;
  fromYY:any;
  designation:String;
  affilitionsList:any;
  activeAffiliations:any[]=[];
  pastAffiliations:any[]=[];
  loading:boolean=false;


  ngOnInit() {

    this.loading  =  true;

    //get Affiliation Data
    this.appService.getDoctorAffiliationInfo(this.id).subscribe(data=>{
      this.affiliationData  =  JSON.parse(data._body);
      this.affiliation      =  this.affiliationData.data;
      
      this.hospital  =  this.affiliation.hospitals;
      this.affilitionsList =  this.affiliation.affiliationData
      this.settingAffiliation(this.affilitionsList);
      
    },error=>{

    })

  	//get years
    this.appService.getYears().subscribe(data=>{
      this.year=JSON.parse(data._body);
    },error=>{
      
    })

    //get month
    this.appService.getMonth().subscribe(data=>{
      this.month=JSON.parse(data._body);
      console.log(this.month)
    },error=>{
      
    })

    //get cities
    this.appService.getStates().subscribe(data=>{
      this.cities=JSON.parse(data._body);
    },error=>{

    })

  }

  ngAfterViewInit(){
    this.loading  =  false;
  }

  settingAffiliation(affiliations){
    affiliations.forEach((aff,index) => {
      if(aff.dateEnd=="till Present"){
         var dateFrom  = this.settingDate(aff.dateStarted); 
         this.activeAffiliations.push(new Affiliation(aff.city,aff.dateEnd,dateFrom,aff.depCode,aff.depName,
                                                      aff.designation,aff.hosId,aff.hosName,aff.hospitalIcon));
      }else{

         var dateFrom  = this.settingDate(aff.dateStarted);
         var dateEnd   = this.settingDate(aff.dateEnd);
         this.pastAffiliations.push(new Affiliation(aff.city,dateEnd,dateFrom,aff.depCode,aff.depName,
                                                      aff.designation,aff.hosId,aff.hosName,aff.hospitalIcon)); 
      }
    })
  }

  settingDate(date):string{

    var formattedDate;
    var mon  =  date.split("/");
    console.log("mon",mon[0])
    var index=0;
    this.month.forEach((month,index)=>{
      console.log("index",index);
      if(index==mon[0]){
        console.log("here")
        formattedDate = month +" "+mon[1];
      }
    })
    return formattedDate;
  }

  formatter = (result: string) => result.toUpperCase();

  searchCity = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.cities.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));


  searchHospital = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.hospital.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));






  changeTab(tab,currentTab){
  	this.resetTabs();
  	$(currentTab).addClass('active');
  	$("#"+tab).show(300);
  }

  resetTabs(){
  	$('.nav-item').removeClass('active');
  	$('.tabs').hide(300);
  }

  checkBoxEvent(){
    if(!this.isChecked){
      $("#uptoDate").hide();
      $("#toSpan").hide();
      this.dateEnd  =  "till Present";
    }else{
      $("#uptoDate").show();
      $("#toSpan").show();
      this.dateEnd  = this.toMM +"/"+ this.toYY;
    }
  }

  updateAffilition(){
    
    let body={
      "hostId":this.id,
      "hosName":this.hospitalName,
      "city":this.hospitalCity,
      "dateStarted":this.fromMM+"/"+this.fromYY,
      "dateEnd":this.isChecked ? "till Present" :this.toMM +"/"+ this.toYY,
      "designation":this.designation
    }
    
    this.appService.updateDoctorAffiliation(this.id,body).subscribe(data=>{
      console.log(data);
    },error=>{

    })
    console.log(body);
  }
}
