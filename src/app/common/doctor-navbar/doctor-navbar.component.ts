import { Component, OnInit, ViewEncapsulation,EventEmitter, Output } from '@angular/core';
import { AppService } from './../../service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-navbar',
  templateUrl: './doctor-navbar.component.html',
  styleUrls: ['./doctor-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorNavbarComponent implements OnInit {

  Doctor: any;
  DashboardData: any;
  constructor(private appService:AppService, private router:Router) { }

  @Output() toggleMenu = new EventEmitter<boolean>();

  isCollapsed = true;

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.appService.getDoctor(sessionStorage.getItem("auth_key")).subscribe(data=>{
      this.DashboardData=JSON.parse(data._body);
      this.Doctor= this.DashboardData.data;
      console.log('name of the doctor',this.Doctor.name);
      console.log(data);
    }),error=>{
      this.router.navigate(['/errorPage']);
    }
  }

  toggleMenuEvent(){
  	this.isCollapsed = !this.isCollapsed;
  	this.toggleMenu.emit(this.isCollapsed);
  }

}
