#include <Arduino.h>
#include "QuadEncoder.h"
#include <sstream>

#define CYCLE_SIZE 1024

QuadEncoder heidenHain(1, 3, 4);

bool running = false;

void setup() {
  Serial.begin(1);
  Serial.println("Started up Teensy");
  // heidenHain.setInitConfig();
  // heidenHain.init();
}

void measure(size_t cycles) {
  running = true;
  // Serial.println("Started measuring");
  // Serial.print("Cycle count: ");
  // Serial.println(cycles);

  for (size_t i = 0; i < cycles; i++) {
    for (size_t j = 0; j < CYCLE_SIZE; j++) {
      if (!running) return;
      // Random value between 41 and 39 etc..
      int16_t sensor1value = rand() % (41 + 1 - 39) + 39;
      int16_t sensor2value = rand() % (51 + 1 - 49) + 49;

      int randomValue = sensor1value;
      randomValue = (randomValue << (sizeof(int16_t) * 8)) | sensor2value;
      Serial.println(randomValue);
      delayMicroseconds(900); // ~1024 times per second
    }
  }

  Serial.println();
  Serial.println("Measurement finished!");
}

void reboot() {
  Serial.end();
  SCB_AIRCR = 0x05FA0004;
}

// long value;
void loop() {

  // long newValue = heidenHain.read();
  // if (newValue != value) {
  //   value = newValue;
  //   Serial.print("Sensor value: ");
  //   Serial.println(value);
  // }
  
  if (Serial.available() > 0) {
    std::string input = std::string(Serial.readString().c_str());
    std::istringstream ss(input);

    std::string command;
    ss >> command;

    if (command == "START") 
    {
      size_t cycle_count;
      ss >> cycle_count;
      if (ss.fail()) {
        Serial.println("Invalid arguments.");
        Serial.println("USAGE: START <cycle count>");
      } else {
        measure(cycle_count);
      }
    } 
    else if (command == "STOP") 
    {
      running = false;
      Serial.println("Measuring stopped.");
    }
    else if (command == "RESTART")
    {
      Serial.println("Restarting...");
      reboot();
    }
    else 
    {
      Serial.println("Invalid command.");
      Serial.println("Available commands:");
      Serial.println("START <cycle count>\tSTOP\tRESTART");
    }
  }
}
