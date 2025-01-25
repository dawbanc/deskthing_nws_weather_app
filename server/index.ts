import { DeskThing, SocketData } from "deskthing-server";
export { DeskThing };

import { setupSettings } from "./settings";
//import { getWeather } from "./weather"; // TODO: uncomment when done 
import { sendImage, sendSampleData } from "./sendingData";

/**
 * 
 *  ----------- Setup ------------------
 * 
 *  Every app needs the following two:
 * DeskThing.on('start', start)
 *
 * DeskThing.on('stop', stop)
 *
 * Both of these should be at the end of your index.ts page. 'start' is triggered when the server is started and 'stop' is triggered when the server is stopped.
 *
 *
 * The following start() function is triggered once the server starts. This is where all initialization should be done.
 */
const start = async () => {
  // This is being used to grab any associated data from the server once the app starts. This makes sure we dont try to initialize stuff twice if it already exists
  const Data = await DeskThing.getData();

  setupSettings(Data);
    // This will make Data.settings.theme.value equal whatever the user selects
};

const stop = async () => {
  // Function called when the server is stopped
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