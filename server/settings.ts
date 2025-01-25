import { DeskThing, DataInterface, SettingsType } from "deskthing-server";

/**The following function is used to setup the settings for the app.
 * This portion of the example will walk through the way you can define and add settings and ensure they are up-to-date with existing data.
 * It's usually a good idea to extract this 
 * @param Data - DataInterface | undefined
 */
export const setupSettings = async (Data: DataInterface | null) => {
    
    const api_uri = await fetch('https://api.weather.gov/points/lat,long}');
    const { lat, long } = await api_uri.json();

    // We require Latitude and Longitude so we can get data from nearby
    // Temperature scale sets whether we will send celcius or freedom units to the deskthing client
    // Wind speed scale sets whether we will send kilometers per hour or freedom units to the deskthing client
    const requiredSettings = [
      "latitude",
      "longitude",
      "temperature_scale",
      "wind_speed_scale"
    ];

    const hasAllSettings = requiredSettings.every(
      (setting) => Data?.settings?.[setting]
    );
  
    if (!hasAllSettings) {
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