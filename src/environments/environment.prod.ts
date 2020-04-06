import {IMqttServiceOptions} from 'ngx-mqtt';

export const environment = {
  production: true
};

export const mqttConfig: IMqttServiceOptions = {
  hostname: 'host.cloudmqtt.com',
  port: 38345,
  protocol: 'wss',
  username: 'user',
  password: 'password'
};

export const statusCakeConfig = {
  api: 'apiKey',
  username: 'username'
};
