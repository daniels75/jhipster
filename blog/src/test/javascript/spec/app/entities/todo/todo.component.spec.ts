import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { TodoComponent } from 'app/entities/todo/todo.component';
import { TodoService } from 'app/entities/todo/todo.service';
import { Todo } from 'app/shared/model/todo.model';

describe('Component Tests', () => {
  describe('Todo Management Component', () => {
    let comp: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;
    let service: TodoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [TodoComponent],
        providers: []
      })
        .overrideTemplate(TodoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TodoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TodoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Todo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.todos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
