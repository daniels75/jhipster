import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISimpleTable } from 'app/shared/model/simple-table.model';

@Component({
  selector: 'jhi-simple-table-detail',
  templateUrl: './simple-table-detail.component.html'
})
export class SimpleTableDetailComponent implements OnInit {
  simpleTable: ISimpleTable;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ simpleTable }) => {
      this.simpleTable = simpleTable;
    });
  }

  previousState() {
    window.history.back();
  }
}
