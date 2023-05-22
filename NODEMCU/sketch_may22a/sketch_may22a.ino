/*#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
SoftwareSerial testSerial(D7, D8);
const char* ssid     = "jjjjjjjjjj";
const char* password = "endingfairyngub";

// Set web server port number to 80
ESP8266WebServer server(80);

// Variable to store the HTTP request
String header;

// Current time
unsigned long currentTime = millis();
// Previous time
unsigned long previousTime = 0; 
// Define timeout time in milliseconds (example: 2000ms = 2s)
const long timeoutTime = 2000;

// Set your Static IP address
IPAddress local_IP(192, 168, 1, 184);
// Set your Gateway IP address
IPAddress gateway(192, 168, 1, 1);

IPAddress subnet(255, 255, 0, 0);
IPAddress primaryDNS(8, 8, 8, 8);   //optional
IPAddress secondaryDNS(8, 8, 4, 4); //optional

void setup() {
  Serial.begin(9600);
  testSerial.begin(115200);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
  }

  digitalWrite(LED_BUILTIN, HIGH);
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  server.on("/humidity", handle_humidity);
}

void loop() {
  // Echo
  //Serial.println(testSerial.available());
  /*String humidity;
  while (testSerial.available() >  0) { 
    //Serial.write(testSerial.read());
    humidity = testSerial.read();  
    //testSerial.write(testSerial.read());
    //testSerial.write("Fdsfsdfsd");
    
    //testSerial.write('\n');
    //yield();
  }
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    WiFiClient client;
    http.begin(client, humidity);
    int httpCode = http.GET();

    if (httpCode > 0) {
      String payload = http.getString();
Serial.println(payload);
    }
    http.end();
  } else {
    Serial.println("failed get");
  }
  //delay(1000);
}*/
/*
void handle_humidity() {
  String humidity = String (testSerial.read());
  server.send(200, "text/plain", humidity);
}
*/
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>
#include <ESP8266HTTPClient.h>
SoftwareSerial testSerial(D7, D8);

/* Put your SSID & Password */
const char* ssid = "jjjjjjjjjj";  // Enter SSID here
const char* password = "endingfairyngub";  //Enter Password here

/* Put IP Address details */
IPAddress local_ip(192,168,1,184);
IPAddress gateway(192,168,1,1);
IPAddress subnet(255,255,255,0);

ESP8266WebServer server(80);

const int t = 3600;
int arr[t];
int humidity;
int currentTime;
int lastTime;

void setup() {
  Serial.begin(9600);
  testSerial.begin(115200);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  WiFi.softAP(ssid, password);
  WiFi.softAPConfig(local_ip, gateway, subnet);
  delay(100);

  for (int i = 0; i < t; i++) {arr[i] = 0;}
  currentTime = millis();
  lastTime = currentTime;

  server.on("/", handle_OnConnect);
  server.on("/history", handle_array);

  server.begin();
  Serial.println("HTTP server started");
}

/*
void push_fronted(int hmd) {
  for (int i = 3600*12 - 1; i > 0; i--) {
    arr[i] = arr[i-1];
  }
  arr[0] = hmd;
}
*/
void loop() {
  currentTime = millis();
  server.handleClient();
  if (currentTime - lastTime > 1000) {
    String tmp = "";
    while (testSerial.available() >  0) { 
      //Serial.write(testSerial.read());
      /*humidity = testSerial.read();
      Serial.println(humidity); */
      // Serial.write(testSerial.read()); 
        char c = testSerial.read();
        tmp += c;
        Serial.print(c);
      //testSerial.write(testSerial.read());
      //testSerial.write("Fdsfsdfsd");
    
      //testSerial.write('\n');
      //yield();
    }
    if (tmp != "") {
      humidity = tmp.toInt();
      for (int i = t - 1; i > 0; i--) {
        arr[i] = arr[i-1];
      }
      arr[0] = humidity;
    }
    lastTime = currentTime;
  // Serial.println(str);
  // str = "";
  }
}

void handle_OnConnect() {
  server.enableCORS(true);
  server.send(200, "text/plain", "{ \"humidity\": " + String(humidity) + "}"); 
}

void handle_array() {
  server.enableCORS(true);
  String s = "[";
  for (int i = 0; i < t-1; i++) {s += String(arr[i]) + ",";}
  s += String(arr[t-1]) + "]";
  server.send(200, "text/plain", "{ \"humidity\": " + s + "}"); 
}