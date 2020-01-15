import { Component } from '@angular/core';
import { MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public topicName = 'wol/push';
  public isPower: boolean = true;

  constructor(private mqttService: MqttService) {
  }

  public pushWol(): void {
    if(this.isPower) {
      this.unsafePublish(this.topicName, 'W');
    }
  }

  private unsafePublish(topic: string, message: string): void {
    this.mqttService.unsafePublish(topic, message, {qos: 0, retain: true});
  }
}
