# Electrical runout analyzer -- frontend

Frontend of the `e-runout` project is a SPA (single page application) built with React and Bootstrap. 

The frontend uses WebSockets to communicate with the backend. ASyncAPI documentation about the WebSocket API can be found in [documentation/asyncapi.yaml](../documentation/asyncapi.yaml). It is recommended to use e.g. [AsyncAPI Studio](https://studio.asyncapi.com/) to view the API documentation.


## The webapp

The webapp contains two pages: `Measure` and `Calibrate`.

### Measure

The `Measure` page is used to create and view measurements. When you press the `Start` button, a new measurement is created with the parameters given in the webapp. Data points are not recorded until the rotary encoder hits the trigger point. After the trigger point, data points are sampled and saved to the new measurement. If either the configured cycle count is reached or the measurement is stopped, the newly created measurement will be added to the measurement list.

**NOTE: Remember to calibrate the Eddy current sensor on the `Calibrate` tab before measuring for the first time!**

### Calibrate

The `Calibrate` page is used to create and view calibrations. **Calibrations use the same data structure internally as regular measurements.** As opposed to the `Measure` page, data points are added to existing calibrations. Thus, you will need to first create an empty calibration and select it to add data points. To set the calibration cofficient, press the `Use calibration` button.

## Getting started
### Development

To start the frontend development server, run the following commands in the `client` folder.

1. `npm install`
2. `npm start`

The development server can be accessed from `localhost:3001` by default.


### Production build

To build a production webapp, run `npm run build` and it will be built into `build` folder. The backend serves contents from this folder in development environment. 

It is recommended, however, to use the production environment using `docker-compose` as described in the project root [README.md](../README.md) file.