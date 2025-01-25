import { DeskThing, SocketData } from "deskthing-server";
export { DeskThing };

import { setupSettings } from "./settings";
//import { getWeather } from "./weather"; // TODO: uncomment when done 
import { sendImage, sendSampleData } from "./sendingData";

const start = async () => {
  const Data = await DeskThing.getData();
  setupSettings(Data);
};

const stop = async () => {
  DeskThing.sendLog('Server Stopped');
};

// Main Entrypoint of the server
DeskThing.on("start", start);

// Main exit point of the server
DeskThing.on("stop", stop);

const handleRequest = async (socketData: SocketData) => {
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

DeskThing.on('get', handleRequest)