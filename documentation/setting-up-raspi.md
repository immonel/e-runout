# Setting up Raspberry Pi for e-runout

It is recommended to install Ubuntu Server for running the application. Note that internet connection is required to pull the repository and Docker images.

### Pulling the repository

```sh
$ git pull https://version.aalto.fi/gitlab/tiainet2/e-runout.git
```

### Wifi-AP

The `wifi-ap` container requires `wpa_supplicant` to be disabled, which controls the `wlan0` interface by default. Please refer to [sdelrio/rpi-hostap](https://github.com/sdelrio/rpi-hostap) documentation for more details.

### Startup script

It is recommended to setup the application to run on startup with e.g. crontab or an init script.