import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  step: number = 0;
  constructor() {
    var activeTab = localStorage.getItem('activeTabStaffPage');
    if (activeTab !== undefined && activeTab !== null && activeTab !== '') {
      this.step = +activeTab;
    }
  }

  ngOnInit() {}
  changeTab(index) {
    this.step = index;
    localStorage.setItem('activeTabStaffPage', index);
  }
}
