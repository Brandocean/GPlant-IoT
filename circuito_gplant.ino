#include <Arduino.h>
#include "DHT.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

#define DHTTYPE DHT11 // DHT 11
#define sensorPin A0


const char* ssid = "IZZI-1A1C";           
const char* password = "C863FC231A1C";
String aName = "data_plant";
const char* host = "dweet.io";  
const char* serverName = "http://gplant-env-1.eba-2mea4cph.us-east-1.elasticbeanstalk.com/lecture"; 
//cambio de arrays
String arrayVariables[] = {"Temperatura","Humedad","Humedad_Tierra","Luz"};
float arrayValues[] = {0,0,0,0};
//0
int numberVariables=sizeof(arrayValues)/sizeof(arrayVariables);


WiFiServer server(80);
uint8_t DHTPin = D2;
int SensorTierra = D1;

DHT dht(DHTPin, DHTTYPE);


float tierra;
float Humidity;
float Temperature;
float luz;

void post(float humidity, float tierra, float temperature, float luz){
  WiFiClient client;
  HTTPClient http;
  http.begin(client,serverName);
  http.addHeader("Content-Type","application/json");

 
  int httpResponseCode = http.POST("{ \"plantNo\": \"P005\", \"humedad\": "+String(tierra)+", \"temp_int\": "+String(temperature)+", \"humedad_out\": "+String(humidity)+", \"luz_solar\": "+String(luz)+" }"); 
  // if httpResponseCode == 200 OK
  http.end();
  /*
   * {
   *   "plantNo": "P005",
   *   "humedad": 100,
   *   "temp_int": 35,
   *   "humedad_out": 36,
   *   "luz_solar": 75
   * }
   */
}


void setup()
{    
  Serial.begin(115200);
  pinMode(DHTPin, INPUT);
  dht.begin();
  pinMode(SensorTierra,INPUT);
        

  Serial.println("Conectando...");
  Serial.println(ssid);

  WiFi.begin(ssid, password); 
  int retries=0;
  while ((WiFi.status() != WL_CONNECTED)&&(retries<30))
  {  
    retries++;
    delay(500);
    Serial.print(".");      
  }  
  if(retries==30){
    Serial.println(F("WiFi conenction FAILED"));
  }
  if (WiFi.status() == WL_CONNECTED){
  Serial.println("");
  Serial.println("WiFi conectada..!");
  Serial.print("IP del servidor: "); 
  Serial.println(WiFi.localIP());   
  }
  //server.begin();
  Serial.println("HTTP server started");
}

String getDweetString(){
  int i = 0;
  //use the dweet GET to post to dweet
  String dweetHttpGet="GET /dweet/for/";
  dweetHttpGet=dweetHttpGet+String(aName)+"?";
//AUMENTAR ITERADOR SEGUN EL NUM DE SENSORES
  for(i=0;i<(4);i++){
    if(i==numberVariables-1){
      //the lastone doesnt have a "&" at the end
      dweetHttpGet=dweetHttpGet + String(arrayVariables[i]) + "=" + String(arrayValues[i]);
    }
    else
      dweetHttpGet=dweetHttpGet + String(arrayVariables[i]) + "="+ String(arrayValues[i]) + "&";
  }
  dweetHttpGet=dweetHttpGet+" HTTP/1.1\r\n"+
               "Host: " +
                 host +
               "\r\n" +
               "Connection: close\r\n\r\n";
  return dweetHttpGet;//this is our freshly made http string request
}

void sendDweet(){
  WiFiClient client;
  const int httpPort = 80;

  //connect to dweet.io
  if (!client.connect(host, httpPort)){
    Serial.println("connection failed");
    return;
  }
  client.print(getDweetString());
  delay(10); //wait...
  while (client.available()){
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }
  Serial.println();
  Serial.println("closing connection");
}

void loop()
{
  Temperature = dht.readTemperature();
  Humidity = dht.readHumidity();
  Humidity= Humidity/50*100;
  luz = analogRead(sensorPin);
  tierra=analogRead(SensorTierra);
  tierra= map(tierra,0,1023,100,0);

  arrayVariables[0] = {"Temperatura"};
  arrayVariables[1] = {"Humedad"};
  arrayVariables[2] = {"Humedad_Tierra"};
  arrayVariables[3] = {"Luz"};
  
  arrayValues[0] = {Temperature};
  arrayValues[1] = {Humidity};
  arrayValues[2] = {tierra};
  arrayValues[3] = {luz};

  Serial.print("Sending dweet to ");
  Serial.print(host);
  Serial.print("/follow/");
  Serial.print(aName);
  Serial.println();
  post(Humidity, tierra, Temperature, luz);
  sendDweet();
  delay(1000);
}
