import { DeskThing, AppSettings } from "deskthing-server"
import { getWeather, ParsedWeatherData } from "./weather"
import { ParsedDateData } from "./date";

export const sendWeather = async () => {
    let settings: AppSettings | null = await DeskThing.getSettings();
    let settingsParse = await JSON.parse(JSON.stringify(settings));

    let latitude = settingsParse.latitude.value;
    let longitude = settingsParse.longitude.value;
    let temperature_scale = settingsParse.temperature_scale.value;
    let wind_speed_scale = settingsParse.wind_speed_scale.value;

    let weatherData = await getWeather(latitude, longitude);

    if (weatherData != null) {
        let temp_int = weatherData.temperature;
        let temp_scale = "";

        // If the temperature is in C, leave it alone. Otherwise convert it to C
        if (weatherData.temperature_scale === "wmoUnit:degC") {
            temp_int = temp_int;
        } else {
            temp_int = (temp_int - 32) * (5/9);
        }

        // Convert the temperature to what the user specified in settings
        if (temperature_scale === "°F") {
            temp_int = (temp_int * (9/5)) + 32;
        } else if (temperature_scale === "°C") {
            temp_int = temp_int;
        } else {
            temp_int = temp_int + 273.15;
        }
        const final_temp: string = Math.floor(temp_int) + " " + temperature_scale;

        const data_to_send: ParsedWeatherData = { // placeholder while I develop this
            temperature: final_temp,
            humidity:  weatherData.humitidity + "%",
            wind: "10mph NW",
        }
        //DeskThing.sendLog(JSON.stringify(weatherData));
        DeskThing.send({type: "weatherData", payload: JSON.stringify(data_to_send)});
    }
}

export const sendDate = async () => {
    let settings: AppSettings | null = await DeskThing.getSettings();
    let settingsParse = await JSON.parse(JSON.stringify(settings));

    let format = settingsParse.time_format.value;
    


    const now = new Date();
    let ampm = "";

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');

    if (format === "12") {
        ampm = hours >= 12 ? " PM" : " AM"; // before modifying hours, check the AM/PM
        hours = hours % 12;
        hours = hours || 12; // handle midnight (or hour 0)
    }

    const time_string: string = hours + ":" + minutes + ampm;

    const data_to_send: ParsedDateData = {
        time: time_string,
        date: "1/20/25",
    }

    DeskThing.sendLog("Sending Date/Time");
    DeskThing.send({type: "dateData", payload: JSON.stringify(data_to_send)})
}