/**
 * AquaSense_ESP32.ino
 * 
 * Hardware: ESP32 Development Board
 * Purpose: Connects to WiFi and pushes Sensor Data (DO, pH, Temp) to Firebase Realtime Database.
 * 
 * Required Libraries:
 * 1. Firebase ESP Client (by Mobizt)
 * 2. WiFi
 */

#include <WiFi.h>
#include <Firebase_ESP_Client.h>

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// ----------------------------------------------------
// USER CONFIGURATION (EDIT THESE)
// ----------------------------------------------------
#define WIFI_SSID "gojo"
#define WIFI_PASSWORD "nakul2006"

// Firebase Config
#define API_KEY "AIzaSyBi4eSBRzKR-6PK5BGNief9HkFxZN8AP7I"
#define DATABASE_URL "https://aquasense-a9b7e-default-rtdb.firebaseio.com/" 

// ----------------------------------------------------

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

// Mock Sensor Variables
float doVal = 6.8;
float phVal = 7.5;
float tempVal = 25.0;

void setup() {
  Serial.begin(115200);
  
  // 1. WiFi Connection
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  // 2. Firebase Configuration
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  // Sign up for anonymous authentication
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("ok");
    signupOK = true;
  } else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 5000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();

    // -------------------------
    // READ SENSORS (Mocking for now)
    // -------------------------
    // In real hardware: doVal = analogRead(DO_PIN);
    
    // Simulate slight fluctuation
    doVal = 6.5 + ((random(0, 100) / 100.0) * 0.5); 
    phVal = 7.4 + ((random(0, 100) / 100.0) * 0.2);
    tempVal = 25.0 + ((random(0, 100) / 100.0) * 0.5);

    // -------------------------
    // CREATE JSON PAYLOAD
    // -------------------------
    FirebaseJson json;
    json.set("do", doVal);
    json.set("ph", phVal);
    json.set("temp", tempVal);

    Serial.printf("Pushing Data: DO:%.2f pH:%.2f Temp:%.2f -> ", doVal, phVal, tempVal);

    // -------------------------
    // SEND TO FIREBASE
    // -------------------------
    // Path: /aquasense/liveData
    if (Firebase.RTDB.setJSON(&fbdo, "/aquasense/liveData", &json)) {
      Serial.println("PASSED");
    } else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  }
}
