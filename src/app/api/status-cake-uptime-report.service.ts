import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatusCakeReport} from '../model/statusCakeReport-model';

@Injectable({
  providedIn: 'root'
})
export class StatusCakeUptimeReportService {

  constructor(private http: HttpClient) {
  }

  public getReports(testId: number): Observable<StatusCakeReport[]> {
    /*
    * curl -H "API:3VCi0OJreHfTC0y6pwkj" -H "Username: santosmatrixsapopt" -X GET https://app.statuscake.com/API/Tests
    * curl -H "API:3VCi0OJreHfTC0y6pwkj" -H "Username: santosmatrixsapopt" -X GET https://app.statuscake.com/API/Tests/Periods/\?TestID\=5104031
    * curl -H "API:3VCi0OJreHfTC0y6pwkj" -H "Username: santosmatrixsapopt" -X GET https://app.statuscake.com/API/Tests/Periods/\?TestID\=5202774
    * */

    const headers = new HttpHeaders()
    .set('API', '3VCi0OJreHfTC0y6pwkj')
    .set('Username', 'santosmatrixsapopt');

    const myObject: any = { TestID: '5104031'};

    const options = { params: new HttpParams({ fromObject: myObject }), headers: headers };
    return this.http.get<StatusCakeReport[]>('/api/', options);
  }
}
