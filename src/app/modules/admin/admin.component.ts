import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  step: number = 0;
  constructor() {
    var activeTab = localStorage.getItem("activeItem");
    if(activeTab!== undefined && activeTab !== null && activeTab !== "")
    {
      this.step = +activeTab;
    }
  }
  changeTab(index){
    this.step = index;
    localStorage.setItem("activeItem",index);
  }
  ngOnInit() {}
}
