#include <Arduino.h>
#include "QuadEncoder.h"

#define SS_PIN    10
#define MOSI_PIN  11
#define MISO_PIN  12
#define SCK_PIN   13
#define RING_BUFFER_SIZE 1024

QuadEncoder heidenHain(1, 3, 4);

// struct ringbuffer {
//   int buffer [RING_BUFFER_SIZE];
//   size_t head = 0;
//   size_t tail = 0;
// } rbuf;

// /*  Returns the oldest value in the buffer and removes it from the buffer  */
// int rbuf_get(ringbuffer rbuf) {
//   int value = rbuf.buffer[rbuf.tail];
//   rbuf.tail = (rbuf.tail + 1) % RING_BUFFER_SIZE;
//   return value;
// }

// /*  Inserts value into ring buffer and advances head  */
// void rbuf_put(ringbuffer rbuf, int value) {
//   rbuf.buffer[rbuf.head] = value;
//   rbuf.head = (rbuf.head + 1) % RING_BUFFER_SIZE;
// }

void setup() {
  Serial.begin(1);
  heidenHain.setInitConfig();
  heidenHain.init();
}

long value;
void loop() {

  long newValue = heidenHain.read();
  if (newValue != value) {
    value = newValue;
    Serial.print("Sensor value: ");
    Serial.println(value);
  }
  
}
