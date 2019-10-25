import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { SimpleTableDetailComponent } from 'app/entities/simple-table/simple-table-detail.component';
import { SimpleTable } from 'app/shared/model/simple-table.model';

describe('Component Tests', () => {
  describe('SimpleTable Management Detail Component', () => {
    let comp: SimpleTableDetailComponent;
    let fixture: ComponentFixture<SimpleTableDetailComponent>;
    const route = ({ data: of({ simpleTable: new SimpleTable(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [SimpleTableDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SimpleTableDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SimpleTableDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.simpleTable).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
