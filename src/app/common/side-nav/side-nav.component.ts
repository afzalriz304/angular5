import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {

  @Output() selectComponent = new EventEmitter<String>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  changeComponent(component){
    this.selectComponent.emit(component);
  }

  about() {
    window.open ("http://www.epilen.com/about/");

  }

}
