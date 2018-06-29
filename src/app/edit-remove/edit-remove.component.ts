import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-remove',
  templateUrl: './edit-remove.component.html',
  styleUrls: ['./edit-remove.component.css']
})
export class EditRemoveComponent implements OnInit {

  @Input() model = {id: ''};
  @Input() edit_link: any[];
  removingId = -1;

  @Output() cancelModel: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  removingModel($event, id) {
    event.stopPropagation();
    this.removingId = id;
  }

  cancelRemoving($event) {
    event.stopPropagation();
    this.removingId = -1;
  }

  removeModel($event, id) {
    event.stopPropagation();
    this.cancelModel.emit(this.model.id);
  }

  goToEdit() {
    this.router.navigate(this.edit_link);
  }

}
