import { DeskThing, DataInterface, SettingsType } from "deskthing-server";

/**
 * 
 * ----------- Settings ------------------
 * 
 * The following function is used to setup the settings for the app.
 * 
 * This portion of the example will walk through the way you can define and add settings and ensure they are up-to-date with existing data.
 * 
 * It's usually a good idea to extract this 
 * 
 * @param Data - DataInterface | undefined
 */
export const setupSettings = async (Data: DataInterface | null) => {
    
    const api_uri = await fetch('https://api.weather.gov/points/lat,long}');
    const { lat, long } = await api_uri.json();

    const requiredSettings = [
      "latitude",
      "longitude",
      "temperature_scale",
      "wind_speed_scale"
    ];

    // This checks if there are any settings missing
    const hasAllSettings = requiredSettings.every(
      (setting) => Data?.settings?.[setting]
    );
  
    // If any of the settings are missing, then add them
    if (!hasAllSettings) {
      // Defined the settings object. SettingsType is an interface of any setting type. This sets up the key-value pair of settings
      const Settings: { [key: string]: SettingsType } = {
        latitude: {
          label: "Latitude",
          value: lat,
          description: "Latitude of weather data point you wish",
          type: 'number',
          min: -180,
          max: 180,
        },
        longitude: {
          label: "Longitude",
          value: long,
          description: "Longitude of weather data point you wish",
          type: 'number',
          min: -180,
          max: 180,
        },
        temperature_scale: {
          label: "Temperature Scale",
          value: "°F",
          type: "select",
          options: [
            { label: "Fahrenheit", value: "°F" },
            { label: "Celcius", value: "°C" },
          ],
        },
        wind_speed_scale: {
          label: "Wind Speed Scale",
          value: "MPH",
          type: 'select',
          options: [
            { label: "Miles Per Hour", value: "MPH" },
            { label: "Kilometers Per Hour", value: "km/h"}
          ]
        },
      };
  
      // This adds the settings to the server. When the user changes a setting, the 'data' callback is triggered
      DeskThing.addSettings(Settings);
    }
  }