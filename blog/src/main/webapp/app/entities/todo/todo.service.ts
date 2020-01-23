import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITodo } from 'app/shared/model/todo.model';

type EntityResponseType = HttpResponse<ITodo>;
type EntityArrayResponseType = HttpResponse<ITodo[]>;

@Injectable({ providedIn: 'root' })
export class TodoService {
  public resourceUrl = SERVER_API_URL + 'api/todos';

  constructor(protected http: HttpClient) {}

  create(todo: ITodo): Observable<EntityResponseType> {
    return this.http.post<ITodo>(this.resourceUrl, todo, { observe: 'response' });
  }

  update(todo: ITodo): Observable<EntityResponseType> {
    return this.http.put<ITodo>(this.resourceUrl, todo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITodo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITodo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
