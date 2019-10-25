import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from 'app/shared/shared.module';
import { SimpleTableComponent } from './simple-table.component';
import { SimpleTableDetailComponent } from './simple-table-detail.component';
import { SimpleTableUpdateComponent } from './simple-table-update.component';
import { SimpleTableDeletePopupComponent, SimpleTableDeleteDialogComponent } from './simple-table-delete-dialog.component';
import { simpleTableRoute, simpleTablePopupRoute } from './simple-table.route';

const ENTITY_STATES = [...simpleTableRoute, ...simpleTablePopupRoute];

@NgModule({
  imports: [BlogSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SimpleTableComponent,
    SimpleTableDetailComponent,
    SimpleTableUpdateComponent,
    SimpleTableDeleteDialogComponent,
    SimpleTableDeletePopupComponent
  ],
  entryComponents: [SimpleTableDeleteDialogComponent]
})
export class BlogSimpleTableModule {}
