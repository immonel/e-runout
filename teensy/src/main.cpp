#include <Arduino.h>
#include "QuadEncoder.h"
#include <sstream>
#include <SPI.h>

#define SS_PIN 10

QuadEncoder heidenHain1(1, 1, 2);
QuadEncoder heidenHain2(2, 3, 4, 0, 7);

bool running = false;

void setup() {
  Serial.setTimeout(50);
  Serial.begin(1);
  Serial.println("Started up Teensy");
  
  // Setup QuadEncoders
  heidenHain1.setInitConfig();
  heidenHain1.init();
  heidenHain2.setInitConfig();
  heidenHain2.EncConfig.IndexTrigger = ENABLE;
  // heidenHain2.EncConfig.INDEXTriggerMode = RISING_EDGE;
  heidenHain2.init();

  // Setup SPI
  pinMode(SS_PIN, OUTPUT);
  digitalWrite(SS_PIN, HIGH);
  SPI.begin();
  SPI.beginTransaction(SPISettings(2000000, MSBFIRST, SPI_MODE1));
}

int16_t readSPI() {
  digitalWrite(SS_PIN, LOW);
  int16_t result = 0;
  byte data = SPI.transfer(0);

  // Extract high byte
  result += data & 0b00001111;
  result <<= 8;

  // Extract lower byte
  data = SPI.transfer(0);
  result += data;

  digitalWrite(SS_PIN, HIGH);
  return result;
}

void stopMeasurement() {
  if (running) {
    running = false;
    // Indicates end of data points
    Serial.println(0l);
    Serial.println("Measurement finished!");
  }
}

void checkStop() {
  if (Serial.available() > 0)
  {
    std::string input = std::string(Serial.readString().c_str());
    std::istringstream ss(input);

    std::string command;
    ss >> command;

    if (command == "STOP")
    {
      stopMeasurement();
    }
  }
}

void takeDataPoint() {
  static int32_t heidenHain1Value;
  static int16_t eddyValue;
  
  heidenHain1Value = heidenHain1.read();
  eddyValue = readSPI();

  /* 
    Data point format:
    +--------------------------------+----------------+----------------+
    | TTL sensor                     | Eddy probe     | Cycle          |
    | 32 bits                        | 16 bits        | 16 bits        |
    +--------------------------------+----------------+----------------+
  */
  uint64_t dataPoint =
    ((uint64_t) heidenHain1Value << 32) |
    ((uint64_t) eddyValue        << 16) |
    (uint64_t)  heidenHain2.indexCounter;

  /* Debug print */
  // Serial.printf("HH1: %d\tHH2: %d\tEddy: %d\tCycle: %d\n", 
  //   heidenHain1Value, 
  //   heidenHain2Value, 
  //   eddyValue,
  //   heidenHain2.indexCounter);
  // Serial.printf("%016llx\n", dataPoint);

  Serial.println(dataPoint);
}

void sampleOnce() {
  running = true;
  heidenHain2.indexCounter = 1;
  takeDataPoint();
  stopMeasurement();
}

void sampleCycles(size_t cycles) {
  running = true;
  int32_t heidenHain2Value;
  uint32_t maxEncoderValue = 0;

  // Reset rotary encoder
  heidenHain2.write(0);
  heidenHain2.indexCounter = 0;

  while (running) {
    heidenHain2Value = abs(heidenHain2.read());
    if (heidenHain2.indexCounter > cycles) break;

    if (heidenHain2.indexCounter > 0) {
      if (heidenHain2Value > maxEncoderValue) {
        takeDataPoint();
        maxEncoderValue = heidenHain2Value;
      }
    } else {
      // Reset rotary encoder if not yet at trigger point
      heidenHain2.write(0);
    }
    // Check if stop command has been given
    checkStop();
  }
  stopMeasurement();
}

void sampleUntilStop() {
  running = true;
  heidenHain2.indexCounter = 1;
  int32_t heidenHain2Value;
  int32_t prevEncoderValue = 0;
  while (running) {
    heidenHain2Value = abs(heidenHain2.read());
    if (heidenHain2Value != prevEncoderValue) {
      takeDataPoint();
      prevEncoderValue = heidenHain2Value;
    }
    checkStop();
  }
}

void reboot() {
  Serial.println("Restarting...");
  Serial.end();
  SCB_AIRCR = 0x05FA0004;
}

void loop() {
  if (Serial.available() > 0) {
    std::string input = std::string(Serial.readString().c_str());
    std::istringstream ss(input);

    std::string command;
    ss >> command;

    if (command == "SAMPLE_CYCLES")
    {
      size_t cycle_count;
      ss >> cycle_count;
      if (ss.fail()) {
        Serial.println("Invalid arguments.");
        Serial.println("USAGE: SAMPLE_CYCLES <cycle count>");
      } else {
        sampleCycles(cycle_count);
      }
    }
    else if (command == "SAMPLE_ONCE")
    {
      sampleOnce();
    }
    else if (command == "SAMPLE_UNTIL")
    {
      sampleUntilStop();
    }
    else if (command == "STOP") 
    {
      stopMeasurement();
    }
    else if (command == "REBOOT")
    {
      reboot();
    }
    else if (command == "ZERO")
    {
      Serial.println("Zeroing encoder...");
      heidenHain1.write(0);
    }
    else 
    {
      Serial.println("Invalid command.");
    }
  }
}
