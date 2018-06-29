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
  error = '';

  constructor(private location: Location, private phdService: PhdProgramService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.update = false;
    const id = +this.route.snapshot.paramMap.get('id');
    if (id >= 0) {
      this.update = true;
      this.phdService.getPhd(id).subscribe(
        result => { this.newPhd = result; },
        error => { console.log(error); }
      );
    }
  }

  goBack() {
    this.location.back();
  }

  addPhd() {
    this.loading = true;
    this.error = '';
    if (!this.update) {
      this.phdService.addPhd(this.newPhd).subscribe(
        data => { this.location.back(); },
        error => { console.log(error); });
    } else {
      this.phdService.patchPhd(this.newPhd.id, this.newPhd).subscribe(
        data => { this.location.back(); },
        error => { console.log(error); });
    }
  }
}
