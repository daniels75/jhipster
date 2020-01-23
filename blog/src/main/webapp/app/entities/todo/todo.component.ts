import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITodo } from 'app/shared/model/todo.model';
import { AccountService } from 'app/core/auth/account.service';
import { TodoService } from './todo.service';

@Component({
  selector: 'jhi-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit, OnDestroy {
  todos: ITodo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected todoService: TodoService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.todoService
      .query()
      .pipe(
        filter((res: HttpResponse<ITodo[]>) => res.ok),
        map((res: HttpResponse<ITodo[]>) => res.body)
      )
      .subscribe((res: ITodo[]) => {
        this.todos = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTodos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITodo) {
    return item.id;
  }

  registerChangeInTodos() {
    this.eventSubscriber = this.eventManager.subscribe('todoListModification', response => this.loadAll());
  }
}
