import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusCakeReport } from '../model/statusCakeReport-model';

@Injectable({
  providedIn: 'root'
})
export class StatusCakeUptimeReportService {

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      console.log(data);
    });
  }

  public getJSON(): Observable<StatusCakeReport[]> {
    return this.http.get<StatusCakeReport[]>('./assets/api/status-cake-uptime-report.json');
  }
}
