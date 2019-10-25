import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISimpleTable } from 'app/shared/model/simple-table.model';
import { SimpleTableService } from './simple-table.service';

@Component({
  selector: 'jhi-simple-table-delete-dialog',
  templateUrl: './simple-table-delete-dialog.component.html'
})
export class SimpleTableDeleteDialogComponent {
  simpleTable: ISimpleTable;

  constructor(
    protected simpleTableService: SimpleTableService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.simpleTableService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'simpleTableListModification',
        content: 'Deleted an simpleTable'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-simple-table-delete-popup',
  template: ''
})
export class SimpleTableDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ simpleTable }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SimpleTableDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.simpleTable = simpleTable;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/simple-table', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/simple-table', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
