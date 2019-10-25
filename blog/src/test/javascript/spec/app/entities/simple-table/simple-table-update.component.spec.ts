import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { SimpleTableUpdateComponent } from 'app/entities/simple-table/simple-table-update.component';
import { SimpleTableService } from 'app/entities/simple-table/simple-table.service';
import { SimpleTable } from 'app/shared/model/simple-table.model';

describe('Component Tests', () => {
  describe('SimpleTable Management Update Component', () => {
    let comp: SimpleTableUpdateComponent;
    let fixture: ComponentFixture<SimpleTableUpdateComponent>;
    let service: SimpleTableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [SimpleTableUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SimpleTableUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SimpleTableUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SimpleTableService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SimpleTable(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SimpleTable();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
