import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ISimpleTable } from 'app/shared/model/simple-table.model';
import { AccountService } from 'app/core/auth/account.service';
import { SimpleTableService } from './simple-table.service';

@Component({
  selector: 'jhi-simple-table',
  templateUrl: './simple-table.component.html'
})
export class SimpleTableComponent implements OnInit, OnDestroy {
  simpleTables: ISimpleTable[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected simpleTableService: SimpleTableService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.simpleTableService
      .query()
      .pipe(
        filter((res: HttpResponse<ISimpleTable[]>) => res.ok),
        map((res: HttpResponse<ISimpleTable[]>) => res.body)
      )
      .subscribe((res: ISimpleTable[]) => {
        this.simpleTables = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSimpleTables();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISimpleTable) {
    return item.id;
  }

  registerChangeInSimpleTables() {
    this.eventSubscriber = this.eventManager.subscribe('simpleTableListModification', response => this.loadAll());
  }
}
