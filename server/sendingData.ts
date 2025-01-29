import { DeskThing, AppSettings } from "deskthing-server"
import { getWeather } from "./weather"

export const sendWeather = async () => {
    let settings: AppSettings | null = await DeskThing.getSettings();
    let settingsParse = await JSON.parse(JSON.stringify(settings));

    let latitude = settingsParse.latitude.value;
    let longitude = settingsParse.longitude.value;
    let temperature_scale = settingsParse.temperature_scale.value;
    let wind_speed_scale = settingsParse.wind_speed_scale.value;

    let weatherData = await getWeather(latitude, longitude);
    DeskThing.sendLog(JSON.stringify(weatherData));
    DeskThing.send({type: "weatherData", payload: JSON.stringify(weatherData)});
}

export const sendDate = async () => {
    //let settings: AppSettings | null = await DeskThing.getSettings();
    //let settingsParse = await JSON.parse(JSON.stringify(settings));

    // TODO: use settings to allow for 12 hour or 24 hour format
    const now = new Date();

    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time_string: string = hours + ":" + minutes;

    DeskThing.sendLog("Sending Date/Time");
    DeskThing.send({type: "dateData", payload: time_string})
}