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
  @ViewChild('lineCanvas', {static: false}) lineCanvas: ElementRef;

  private subscription: Subscription;
  private topicName = 'wol/push';
  private lineChart: Chart;
  public messagePayload: string;

  constructor(private mqttService: MqttService,
              private uptimeReport: StatusCakeUptimeReportService) {
    this.initMqtt();
  }

  public initMqtt(): void {
    this.subscription = this.mqttService
    .observe(this.topicName)
    .subscribe((message: IMqttMessage) => {
      this.messagePayload = message.payload.toString();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    var statusStream: number[] = [];
    var dataStream: string[] = [];

    this.uptimeReport.getJSON().subscribe(data => {
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

      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: dataStream.reverse(),
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
              data: statusStream.reverse(),
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
    });
  }
}

