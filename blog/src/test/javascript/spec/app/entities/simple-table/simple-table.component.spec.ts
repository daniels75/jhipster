import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { SimpleTableComponent } from 'app/entities/simple-table/simple-table.component';
import { SimpleTableService } from 'app/entities/simple-table/simple-table.service';
import { SimpleTable } from 'app/shared/model/simple-table.model';

describe('Component Tests', () => {
  describe('SimpleTable Management Component', () => {
    let comp: SimpleTableComponent;
    let fixture: ComponentFixture<SimpleTableComponent>;
    let service: SimpleTableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [SimpleTableComponent],
        providers: []
      })
        .overrideTemplate(SimpleTableComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SimpleTableComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SimpleTableService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SimpleTable(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.simpleTables[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
