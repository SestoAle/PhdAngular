import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { PhdProgramService } from '../../services/phd-program.service';
import { PhdProgram } from '../../model/phdProgram';

@Component({
  selector: 'app-add-phd',
  templateUrl: './add-phd.component.html',
  styleUrls: ['./add-phd.component.css']
})
export class AddPhdComponent implements OnInit {

  toolbarTitle = 'Add PhD Program';
  newPhd = new PhdProgram();
  update = false;
  loading = false;

  constructor(private location: Location, private phdService: PhdProgramService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.update = false;

    // Get id of PhD from route parameter
    const id = +this.route.snapshot.paramMap.get('id');
    // Check if this is an update operation or a create one:
    // if parameter id of routing is > 0, then is an update operation
    if (id >= 0) {
      this.update = true;
      this.phdService.getPhd(id).subscribe(
        result => { this.newPhd = result; },
        error => { console.log(error); }
      );
    }
  }

  addPhd() {
    this.loading = true;
    let observable;
    // If it's an update operation, make a Patch request
    // If it isn't, make a Post request
    if (!this.update) {
      observable = this.phdService.addPhd(this.newPhd);
    } else {
      observable = this.phdService.patchPhd(this.newPhd.id, this.newPhd);
    }
    observable.subscribe(
        data => { this.location.back(); },
        error => { console.log(error); });
  }
}
