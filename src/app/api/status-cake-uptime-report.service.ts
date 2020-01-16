import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class StatusCakeUptimeReportService {

  constructor(private http: HTTP) {
  }

  public getReports(testId: string) {

    return this.http.get(
        'https://app.statuscake.com/API/Tests/Periods', { TestID: testId }, { API: '3VCi0OJreHfTC0y6pwkj',
          Username: 'santosmatrixsapopt' });
  }
}
