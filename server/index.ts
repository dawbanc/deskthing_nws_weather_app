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
  
  sendDate();
  sendWeather();

  runEveryMin(sendDate);
  runEveryMin(sendWeather); // to debug change to hour once done debugging
};

// Main Entrypoint of the server
DeskThing.on("start", start);