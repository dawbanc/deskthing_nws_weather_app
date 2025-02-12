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
        
        // -------------------------------------------------------------------------------------------
        // TEMPERATURE CALC
        // -------------------------------------------------------------------------------------------
        let temp_int = weatherData.temperature;
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

        // -------------------------------------------------------------------------------------------
        // WIND CALC
        // -------------------------------------------------------------------------------------------
        let wind_int = weatherData.wind_speed;
        
        // If speed is in mph, convert it to km/hr
        if (weatherData.wind_speed_scale === "wmoUnit:km_h-1") {
            wind_int = wind_int;
        } else {
            wind_int = wind_int * 1.60934; 
        }

        // Convert speed to what the user specified in settings
        if (wind_speed_scale === "MPH") {
            wind_int = wind_int * 0.621371;
        } else {
            wind_int = wind_int;
        }
        const final_wind: string = Math.floor(wind_int) + " " + wind_speed_scale + " " + weatherData.wind_direction;

        // -------------------------------------------------------------------------------------------
        // WEATHER DATA TO SEND
        // -------------------------------------------------------------------------------------------
        const data_to_send: ParsedWeatherData = { // placeholder while I develop this
            temperature: final_temp,
            humidity:  weatherData.humitidity + "%",
            wind: final_wind,
            last_updated: weatherData.time,
        }
        //DeskThing.sendLog(JSON.stringify(weatherData));
        DeskThing.send({type: "weatherData", payload: JSON.stringify(data_to_send)});
    }
}

export const sendDate = async () => {
    let settings: AppSettings | null = await DeskThing.getSettings();
    let settingsParse = await JSON.parse(JSON.stringify(settings));

    let time_format = settingsParse.time_format.value;
    
    // -------------------------------------------------------------------------------------------
    // TIME CALCULATION
    // -------------------------------------------------------------------------------------------
    
    const now = new Date();
    let ampm = "";

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');

    if (time_format === "12") {
        ampm = hours >= 12 ? " PM" : " AM"; // before modifying hours, check the AM/PM
        hours = hours % 12;
        hours = hours || 12; // handle midnight (or hour 0)
    }

    const time_string: string = hours + ":" + minutes + ampm;

    // -------------------------------------------------------------------------------------------
    // Day Of The Week CALCULATION
    // -------------------------------------------------------------------------------------------
    let day_of_the_week_format = "long";
    
    let day_of_the_week_string: string;

    if (day_of_the_week_format === "long") { //e.g., Monday
        const dayNamesLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        day_of_the_week_string = dayNamesLong[now.getDay()];
    } else if (day_of_the_week_format === "short") { //e.g., Mon
        const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        day_of_the_week_string = dayNamesShort[now.getDay()];
    } else { // Default to long format if not specified
        const dayNamesLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        day_of_the_week_string = dayNamesLong[now.getDay()];
    }

    // -------------------------------------------------------------------------------------------
    // DATE CALCULATION
    // -------------------------------------------------------------------------------------------
    let dateFormat = settingsParse.date_format.value; 
    
    let date_string: string;
    switch (dateFormat) {
        case "USA":
            date_string = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`;
            break;
        case "EUR":
            date_string = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
            break;
        case "ISO":
            date_string = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            break;
        case "MDY":  
            const monthNamesMDY = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            date_string = `${monthNamesMDY[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
            break;
        case "DMY": 
            const monthNamesDMY = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            date_string = `${now.getDate()} ${monthNamesDMY[now.getMonth()]}, ${now.getFullYear()}`;
            break;
        default: // Default to ISO if the format is not recognized.
            date_string = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            break;
    }

    // -------------------------------------------------------------------------------------------
    // DATE DATA TO SEND
    // -------------------------------------------------------------------------------------------
    const data_to_send: ParsedDateData = {
        time: time_string,
        dotw: day_of_the_week_string,
        date: date_string,
    }

    //DeskThing.sendLog("Sending Date/Time");
    DeskThing.send({type: "dateData", payload: JSON.stringify(data_to_send)})
}