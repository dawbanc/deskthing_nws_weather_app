import { DeskThing, SocketData } from "deskthing-server";
export { DeskThing };

import { setupSettings } from "./settings";
import { WeatherData, getWeather } from "./weather"; 
import { sendImage, sendSampleData } from "./sendingData";

const start = async () => {
  let Data = await DeskThing.getData();
  setupSettings(Data);
};

const stop = async () => {
  DeskThing.sendLog('Server Stopped');
};

const handleRequest = async () => {
  const data = await getWeather(38.89, -77.02);
  DeskThing.sendLog(JSON.stringify(data, null, 2));
}

// Main Entrypoint of the server
DeskThing.on("start", start);

// Main exit point of the server
DeskThing.on("stop", stop);

DeskThing.sendLog('Trying request');
DeskThing.on('get', handleRequest);


/*const handleRequest = async (socketData: SocketData) => {
  switch (socketData.request) {
    case 'sampleData':
      sendSampleData()
      break
    case 'image':
      sendImage()
      break
    default:
      DeskThing.sendError('Invalid Request')
      break
  }
}
*/

/*
DeskThing.on('get', handleRequest)
*/