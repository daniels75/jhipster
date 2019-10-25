import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISimpleTable } from 'app/shared/model/simple-table.model';

type EntityResponseType = HttpResponse<ISimpleTable>;
type EntityArrayResponseType = HttpResponse<ISimpleTable[]>;

@Injectable({ providedIn: 'root' })
export class SimpleTableService {
  public resourceUrl = SERVER_API_URL + 'api/simple-tables';

  constructor(protected http: HttpClient) {}

  create(simpleTable: ISimpleTable): Observable<EntityResponseType> {
    return this.http.post<ISimpleTable>(this.resourceUrl, simpleTable, { observe: 'response' });
  }

  update(simpleTable: ISimpleTable): Observable<EntityResponseType> {
    return this.http.put<ISimpleTable>(this.resourceUrl, simpleTable, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISimpleTable>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISimpleTable[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
