import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BlogTestModule } from '../../../test.module';
import { SimpleTableDeleteDialogComponent } from 'app/entities/simple-table/simple-table-delete-dialog.component';
import { SimpleTableService } from 'app/entities/simple-table/simple-table.service';

describe('Component Tests', () => {
  describe('SimpleTable Management Delete Component', () => {
    let comp: SimpleTableDeleteDialogComponent;
    let fixture: ComponentFixture<SimpleTableDeleteDialogComponent>;
    let service: SimpleTableService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [SimpleTableDeleteDialogComponent]
      })
        .overrideTemplate(SimpleTableDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SimpleTableDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SimpleTableService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
