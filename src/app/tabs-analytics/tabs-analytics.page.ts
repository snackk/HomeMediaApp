import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Chart} from 'chart.js';
import {StatusCakeUptimeReportService} from '../api/status-cake-uptime-report.service';
import {StatusCakeReport} from '../model/statusCake-model';

@Component({
  selector: 'app-tabs-analytics',
  templateUrl: 'tabs-analytics.page.html',
  styleUrls: ['tabs-analytics.page.scss']
})
export class TabsAnalyticsPage implements AfterViewInit, OnDestroy {
  @ViewChild('mediaCanvas', {static: false}) mediaCanvas: ElementRef;

  private subscription: Subscription;
  private topicName = 'wol/push';
  private lineChart: Chart;
  private mediaId = '5104031';
  public messagePayload: string;
  public data: any;

  constructor(private mqttService: MqttService,
              private uptimeReport: StatusCakeUptimeReportService) {
    this.initMqtt();
  }

  ngAfterViewInit() {
    this.generateReports(this.mediaId, this.mediaCanvas);
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

  private generateReports(mediaId: string, canvas: ElementRef): void {
    const statusStream: number[] = [];
    const dataStream: Date[] = [];

    this.uptimeReport.getReports(mediaId)
        .then(p => {
          const dat: StatusCakeReport[] = JSON.parse(p.data).data[0].data;
          for (let i = 25; i > 0; i--) {
            let index = dat.length - i;
            dataStream.push(new Date(dat[index].x));
            statusStream.push(dat[index].y);
          }
          this.lineChart = this.buildChart(canvas, statusStream, dataStream);
    });
  }

  private buildChart(canvas: ElementRef, statusStream: number[], dataStream: Date[]): Chart {
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
              maxTicksLimit: 2,
              min: 0
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

