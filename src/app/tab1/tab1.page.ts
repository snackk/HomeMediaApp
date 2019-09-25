import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {IMqttMessage, MqttService} from 'ngx-mqtt';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnDestroy {

  private subscription: Subscription;
  private topicName = 'wol/push';
  public messagePayload: string;

  constructor(private mqttService: MqttService) {
    console.log(this.mqttService);
    this.initMqtt();
  }

  public initMqtt(): void {
    this.subscription = this.mqttService
    .observe(this.topicName)
    .subscribe((message: IMqttMessage) => {
      this.messagePayload = message.payload.toString();
    });
  }

  public pushWol(): void {
    this.unsafePublish(this.topicName, 'testeersdfs');
  }

  private unsafePublish(topic: string, message: string): void {
    this.mqttService.unsafePublish(topic, message, {qos: 0, retain: true});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

