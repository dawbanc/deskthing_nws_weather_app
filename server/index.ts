import { DeskThing, SocketData } from "deskthing-server";
export { DeskThing };

import { setupSettings } from "./settings";
import { getWeather } from "./weather"; 
import { sendImage, sendSampleData } from "./sendingData";

const start = async () => {
  const Data = await DeskThing.getData();
  setupSettings(Data);
};

const stop = async () => {
  DeskThing.sendLog('Server Stopped');
};

const handleRequest = async () => {
  const data = getWeather(38.89, -77.02);
  console.log(data);
}

// Main Entrypoint of the server
DeskThing.on("start", start);

// Main exit point of the server
DeskThing.on("stop", stop);

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