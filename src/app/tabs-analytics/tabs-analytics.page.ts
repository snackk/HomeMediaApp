import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Chart } from 'chart.js';
import { StatusCakeUptimeReportService } from '../api/status-cake-uptime-report.service';
import { Status } from '../model/statusCakeReport-model';

@Component({
  selector: 'app-tabs-analytics',
  templateUrl: 'tabs-analytics.page.html',
  styleUrls: ['tabs-analytics.page.scss']
})
export class TabsAnalyticsPage implements AfterViewInit, OnDestroy {
  @ViewChild('mediaCanvas', {static: false}) mediaCanvas: ElementRef;
  @ViewChild('ledCanvas', {static: false}) ledCanvas: ElementRef;

  private subscription: Subscription;
  private topicName = 'wol/push';
  private lineChart: Chart;
  private mediaId: number = 5104031;
  private ledId: number = 5104031;
  public messagePayload: string;

  constructor(private mqttService: MqttService,
              private uptimeReport: StatusCakeUptimeReportService) {
    this.initMqtt();
  }

  ngAfterViewInit() {
    this.generateReports(this.mediaId, this.mediaCanvas);
    this.generateReports(this.ledId, this.ledCanvas);
  }

  private initMqtt(): void {
    this.subscription = this.mqttService.observe(this.topicName)
    .subscribe((message: IMqttMessage) => {
      this.messagePayload = message.payload.toString();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private generateReports(testId: number, canvas: ElementRef): void {
    const statusStream: number[] = [];
    const dataStream: string[] = [];

    this.uptimeReport.getReports(testId)
    .subscribe(data => {
      data.forEach(el => {
        dataStream.push(el.End);
        dataStream.push(el.Start);
        if (el.Status == Status.Down) {
          statusStream.push(0);
          statusStream.push(0);
        }
        if (el.Status == Status.Up) {
          statusStream.push(1);
          statusStream.push(1);
        }
      });

      this.lineChart = this.buildChart(canvas, statusStream.reverse(), dataStream.reverse());
    });
  }

  private buildChart(canvas: ElementRef, statusStream: number[], dataStream: string[]): Chart {
    new Chart(canvas.nativeElement, {
      type: 'line',
      data: {
        labels: dataStream,
        datasets: [
          {
            label: 'uptime monitoring',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderColor: 'rgba(0,0,0,0.3)',
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: 'rgba(0,0,0,0.3)',
            pointBackgroundColor: 'rgba(0,0,0,0.2)',
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: 'rgba(0,0,0,0.3)',
            pointHoverBorderColor: 'rgba(0,0,0,0.2)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: statusStream,
            spanGaps: false
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 2
            },
            gridLines: {
              drawBorder: false,
              display: true
            }
          }],
          xAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              display: false
            }
          }]
        }
      }
    });
  }
}

