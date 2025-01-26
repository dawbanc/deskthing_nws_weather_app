import { DeskThing, SocketData, AppSettings} from "deskthing-server";
export { DeskThing };

import { setupSettings } from "./settings";
import { WeatherData, getWeather } from "./weather"; 
import { sendImage, sendSampleData } from "./sendingData";

const stop = async () => {
  DeskThing.sendLog('Server Stopped');
};

//const handleRequest = async () => {
//  const data = await getWeather(38.89, -77.02);
//  DeskThing.sendLog(JSON.stringify(data, null, 2));
//}

const start = async () => {
  let settingsData = await DeskThing.getData();
  await setupSettings(settingsData);

  //const settings = await DeskThing.getSettings();
  let settings: AppSettings | null = await DeskThing.getSettings();

  //DeskThing.sendLog(JSON.stringify(settings, null, 2));
  //DeskThing.sendLog(settings["latitude"]);
  if (settings != null) {
    DeskThing.sendLog("Tests: ");
    DeskThing.sendLog(JSON.stringify(settings["latitude"]));
    DeskThing.sendLog(JSON.stringify(settings["longitude"]));
    DeskThing.sendLog(JSON.stringify(settings["temperature_scale"]));
    DeskThing.sendLog(JSON.stringify(settings["wind_speed_scale"]));
  } else {
    DeskThing.sendLog("SETTINGS is NULL");
  }
  

  //const weatherData = await getWeather(settings[latitude], settings.longitude);
};

// Main Entrypoint of the server
DeskThing.on("start", start);

// Main exit point of the server
//DeskThing.on("stop", stop);

//DeskThing.sendLog('Trying request');
//DeskThing.on('get', handleRequest);


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