import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  menuToggle(response) {
    console.log('response-----------', response);
    const boxsize = $('.sidenav').width();
    if (!response) {
      $('.sidenav').animate({
        width: 0
      }, function(){
        $('.list').hide();
        $('.side-navbar').animate({
          width: 100
        });
      });
    } else {
      $('.sidenav').animate({
        width: 193
      }, function(){
        $('.side-navbar').animate({
          width: 200
        });
      });
      $('.list').show(1000);
    }
  }

}
