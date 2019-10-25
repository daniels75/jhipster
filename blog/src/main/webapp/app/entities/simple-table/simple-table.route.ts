import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SimpleTable } from 'app/shared/model/simple-table.model';
import { SimpleTableService } from './simple-table.service';
import { SimpleTableComponent } from './simple-table.component';
import { SimpleTableDetailComponent } from './simple-table-detail.component';
import { SimpleTableUpdateComponent } from './simple-table-update.component';
import { SimpleTableDeletePopupComponent } from './simple-table-delete-dialog.component';
import { ISimpleTable } from 'app/shared/model/simple-table.model';

@Injectable({ providedIn: 'root' })
export class SimpleTableResolve implements Resolve<ISimpleTable> {
  constructor(private service: SimpleTableService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISimpleTable> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SimpleTable>) => response.ok),
        map((simpleTable: HttpResponse<SimpleTable>) => simpleTable.body)
      );
    }
    return of(new SimpleTable());
  }
}

export const simpleTableRoute: Routes = [
  {
    path: '',
    component: SimpleTableComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.simpleTable.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SimpleTableDetailComponent,
    resolve: {
      simpleTable: SimpleTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.simpleTable.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SimpleTableUpdateComponent,
    resolve: {
      simpleTable: SimpleTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.simpleTable.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SimpleTableUpdateComponent,
    resolve: {
      simpleTable: SimpleTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.simpleTable.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const simpleTablePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SimpleTableDeletePopupComponent,
    resolve: {
      simpleTable: SimpleTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.simpleTable.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
