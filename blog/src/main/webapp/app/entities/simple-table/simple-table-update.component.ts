import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISimpleTable, SimpleTable } from 'app/shared/model/simple-table.model';
import { SimpleTableService } from './simple-table.service';

@Component({
  selector: 'jhi-simple-table-update',
  templateUrl: './simple-table-update.component.html'
})
export class SimpleTableUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(2)]],
    content: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(protected simpleTableService: SimpleTableService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ simpleTable }) => {
      this.updateForm(simpleTable);
    });
  }

  updateForm(simpleTable: ISimpleTable) {
    this.editForm.patchValue({
      id: simpleTable.id,
      name: simpleTable.name,
      content: simpleTable.content
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const simpleTable = this.createFromForm();
    if (simpleTable.id !== undefined) {
      this.subscribeToSaveResponse(this.simpleTableService.update(simpleTable));
    } else {
      this.subscribeToSaveResponse(this.simpleTableService.create(simpleTable));
    }
  }

  private createFromForm(): ISimpleTable {
    return {
      ...new SimpleTable(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      content: this.editForm.get(['content']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISimpleTable>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
