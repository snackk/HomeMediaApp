import { Component } from '@angular/core';
import { MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  private topicName = 'wol/push';

  constructor(private mqttService: MqttService) {
  }

  public pushWol(): void {
    this.unsafePublish(this.topicName, 'WAAAAT');
  }

  private unsafePublish(topic: string, message: string): void {
    this.mqttService.unsafePublish(topic, message, {qos: 0, retain: true});
  }
}
