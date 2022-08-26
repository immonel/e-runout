# erunout -- Teensy microcontroller

This project uses the Teensy 4.0 microcontroller for reading the sensors, mostly because it has [hardware support](https://forum.pjrc.com/threads/58478-Teensy-4-x-H-W-Quadrature-Encoder-Library) for quadrature signals.


The Teensy will idle until it receives commands through the serial port. Supported commands are:

- `SAMPLE_CYCLES <count>`: Sample integer amount of cycles (full rotary encoder revolutions)
- `SAMPLE_UNTIL`: Sample data points until `STOP` command is received
- `SAMPLE_ONCE`: Sample a single data point and stop
- `STOP`: Stop reading and sending data points
- `REBOOT`: Reboots the microcontroller
- `ZERO`: Resets the touching TTL probe's value to zero.

## Reading the sensors

The TTL signals are read using the [Teensy hardware quadrature library](https://github.com/mjs513/Teensy-4.x-Quad-Encoder-Library). The Eddy current sensor's signal is read using [SPI](https://www.pjrc.com/teensy/td_libs_SPI.html).


## Data point format

The data point is sent to the Raspberry Pi using serial port as follows:

```
+--------------------------------+----------------+----------------+
| TTL sensor                     | Eddy probe     | Cycle          |
| 32 bits                        | 16 bits        | 16 bits        |
+--------------------------------+----------------+----------------+
```

The values are bit shifted into a 64-bit integer and parsed in the Node.js backend. The data points are delimited by a newline characted `\n`.

### Notes about the data format

- `Cycle` indicates the current cycle in a running measurement. It is currently not used in the backend, but it could have use in dividing the measurement into cycles or displaying in the chart where the cycle changes
- The data point is sent through serial with `Serial.println` encoded in ASCII. It is not ideal and the bit shifting is currently kind of useless since the values in the data point could just be delimited with a character, `18423,2495,1` for example. The original purpose was to send the bit-shifted 64-bit integer as binary, but delimiting separate data points reliably (and space efficiently) is not trivial and was left for future implementation.
- Sign of the Eddy current probe value is currently discarded since the negative values in voltage have no meaning in this application.