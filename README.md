## SnackkMediaApp

<img src="https://user-images.githubusercontent.com/9936714/73213043-674ffc00-4147-11ea-8396-6e9a67f1aa90.png" alt="iphone app" style="float: left;" width=450>
Home Automation app to control IoT devices over MQTT.

## Overview

App has two major functionalities, remotely turn on my personal computer and for the time being control the desk lights.

## <a name="prerequisites"></a> Prerequisites

* npm
* ionic-cli
* cordova

## Installation

First, install the [prerequisites](#prerequisites):
```sh
$ npm install -g ionic
$ npm install -g cordova
```

Now, there are several ways to run a ionic app:

### ionic-cli
```sh
$ ionic serve
```

### cordova-cli
```sh
$ ionic cordova run browser
```

## Deploy

To deploy the app for android/ios we run the following:

```sh
$ ionic cordova build ios --prod
```

## Problems

Refer to the ionic documentation [ionic](https://ionicframework.com/docs/).

  Written by [@snackk](https://github.com/snackk)
