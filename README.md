## SnackkMediaApp
<p align="center">
  <img src="https://user-images.githubusercontent.com/9936714/73213043-674ffc00-4147-11ea-8396-6e9a67f1aa90.png" alt="iphone app" width=600>
</p>
Home Automation app to control IoT devices over MQTT.

## Overview

App works as a home automation dashboard, enabling the control of IoT devices based on esp8266 hardware. 
The firmware runing on these IoT devices can be found here [esp8266-home-automation](https://github.com/snackk/esp8266-home-automation).

### Analytics
Reads data from status cake API and displays a graphic of them. Pressing the power button will trigger a power switch on a computer, by acting as an MQTT broker that emits **wake up** to a given topic, 'wol/push'.

### Lights
Pressing the send button will trigger lights to lighten up matcvhing the chosen color, by acting as an MQTT broker that emits **light** events to a given topic, 'lights/push'.

## <a name="prerequisites"></a> Prerequisites

* npm
* ionic-cli
* cocoapods

## Installation

First, install the [prerequisites](#prerequisites):
```sh
$ npm install -g ionic
$ brew install cocoapods
$ npx cap sync
```

Now, there are several ways to run a ionic app:

### ionic-cli
```sh
$ ionic serve
```

## Deploy

To deploy the app for android/ios we run the following:

```sh
$ ionic capacitor run ios --prod
```

## Problems

Refer to the ionic documentation [ionic](https://ionicframework.com/docs/).

  Written by [@snackk](https://github.com/snackk)
