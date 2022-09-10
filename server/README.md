# e-runout server

This Node.js backend uses Socket.IO to communicate with the client and 'serialport' npm package to communicate with the Teensy microcontroller. Measurements are saved into a MongoDB database using the 'mongoose' npm library. More information about the libraries used can be found from [helpful-links.md](../documentation/helpful-links.md). 

## Getting started

### Development

The development server can be started by running `npm install` and `npm run dev`. The default port is 3000.


### Production

The backend server relies on other services to be running. Please refer to the [repository README](../README.md).
