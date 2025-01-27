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

  let settings: AppSettings | null = await DeskThing.getSettings();
  let settingsParse = await JSON.parse(JSON.stringify(settings));

  if (settingsParse == null) {
    DeskThing.sendLog("SETTINGS returned NULL");
  } 

  let latitude = settingsParse.latitude.value;
  let longitude = settingsParse.longitude.value;
  let temperature_scale = settingsParse.temperature_scale.value;
  let wind_speed_scale = settingsParse.wind_speed_scale.value;

  let weatherData = await getWeather(latitude, longitude);
  //DeskThing.sendLog(JSON.stringify(weatherData));
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