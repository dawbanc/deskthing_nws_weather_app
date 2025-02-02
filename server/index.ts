import { DeskThing, SocketData, AppSettings} from "deskthing-server";
export { DeskThing };

import { setupSettings } from "./settings";
import { WeatherData, getWeather } from "./weather"; 
import { runEveryMin, runEveryHour } from "./time";
import { sendDate, sendWeather } from "./sendingData";

const stop = async () => {
  DeskThing.sendLog('Server Stopped');
};

const start = async () => {
  let settingsData = await DeskThing.getData();
  await setupSettings(settingsData);
  
  // Wait one second after initialization to send the first set of data
  await setTimeout(() => {}, 1000);
  sendDate();
  sendWeather();

  runEveryMin(sendDate);
  runEveryMin(sendWeather); // to debug change to hour once done debugging
};

const update = async () => {
  DeskThing.sendLog("UPDATING SETTINGS")

  let settingsData = await DeskThing.getData();
  await setupSettings(settingsData);

  sendDate();
  sendWeather();
};

DeskThing.on('stop', stop);

// On settings change? testing
//DeskThing.on('settings', update);

// Main Entrypoint of the server
DeskThing.on("start", start);