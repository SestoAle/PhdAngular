import { Component, OnInit, Input } from '@angular/core';

import { Registration } from '../../model/registration';

@Component({
  selector: 'app-cfu-list',
  templateUrl: './cfu-list.component.html',
  styleUrls: ['./cfu-list.component.css']
})
export class CfuListComponent implements OnInit {

  @Input() registrations: Registration[] = [];
  @Input() totalCfu = 0;

  constructor() { }

  ngOnInit() {
  }

}
