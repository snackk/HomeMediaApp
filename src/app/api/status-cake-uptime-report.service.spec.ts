import { TestBed } from '@angular/core/testing';

import { StatusCakeUptimeReportService } from './status-cake-uptime-report.service';

describe('StatusCakeUptimeReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusCakeUptimeReportService = TestBed.get(StatusCakeUptimeReportService);
    expect(service).toBeTruthy();
  });
});
