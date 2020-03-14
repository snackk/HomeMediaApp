import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class StatusCakeUptimeReportService {

  constructor(private http: HTTP) {
  }

  public getReports(testid: string) {
    return this.http.get(
        'https://app.statuscake.com/Workfloor/Orion/uptime/clusterInflux.php', { type: 'uptime_perf', testid: testid, span: 'Day' },
        { API: '3VCi0OJreHfTC0y6pwkj', Username: 'santosmatrixsapopt' });
  }
}
