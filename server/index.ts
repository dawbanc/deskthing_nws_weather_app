import { DeskThing, SocketData, AppSettings} from "deskthing-server";
export { DeskThing };

import { setupSettings } from "./settings";
import { WeatherData, getWeather } from "./weather"; 
import { runEveryMin, runEveryHour } from "./time";
import { sendDate, sendWeather } from "./sendingData";

const handleRequest = async (request: SocketData) => {
  if (request.request === "weatherData") {
    sendWeather();
  } else if (request.request === "timeData") {
    sendDate();
  }
};

const stop = async () => {
  DeskThing.sendLog('NWS Server Stopped');
};

const start = async () => {
  let settingsData = await DeskThing.getData();
  await setupSettings(settingsData);
  
  runEveryMin(sendDate);
  //runEveryMin(sendWeather); // TODO: change to hour once done debugging
  runEveryHour(sendWeather);
};

const update = async () => {
  DeskThing.sendLog("UPDATING SETTINGS")

  let settingsData = await DeskThing.getData();
  await setupSettings(settingsData);

  sendDate();
  sendWeather();
};

// on any get, update
DeskThing.on('get', handleRequest);

// on stop
DeskThing.on('stop', stop);

// Main Entrypoint of the server
DeskThing.on("start", start);