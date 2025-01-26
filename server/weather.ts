import { DeskThing } from "deskthing-server"

export interface WeatherData {
    // Define the structure of the expected JSON response here.
    // This is crucial for TypeScript to provide type safety.
    // Example based on a typical /points response:
    "@id": string;
    "@type": string;
    cwa: string;
    forecastOffice: string;
    gridX: number;
    gridY: number;
    forecast: string;
    forecastHourly: string;
    forecastGridData: string;
    observationStations: string;
    relativeLocation: {
      type: string;
      coordinates: number[];
    };
    timeZone: string;
    // ... add other properties as needed based on the actual API response
  }

  export async function getWeather(latitude: number, longitude: number): Promise<WeatherData | null> {
    try {
      const uri = `https://api.weather.gov/points/${latitude},${longitude}`;
      DeskThing.sendLog(uri);
      const response = await fetch(uri); 

      if (!response.ok) {
        DeskThing.sendLog(`HTTP error ${response.status}`);
        return null; // Return null to indicate failure
      }
  
      const data = await response.json();
      DeskThing.sendLog(JSON.stringify(data));
      return data as WeatherData; // Type assertion after checking response.ok
    } catch (error) {
        DeskThing.sendLog(error);
      return null; // Return null in case of any error
    }
  }