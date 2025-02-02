import { DeskThing } from "deskthing-server"

export interface WeatherData {
  temperature: number;
  temperature_scale: string;
  wind_speed: number;
  wind_speed_scale: string;
  wind_direction: string;
  humitidity: string;
  time: string;
}

export interface ParsedWeatherData {
  temperature: string;
  humidity: string;
  wind: string;
  last_updated: string;
}

function degreesToCardinal(degrees: number): string {
  const directions = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", 
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N" 
  ]; 

  const index = Math.round((degrees % 360) / 22.5); 
  return directions[index]; 
}

export async function getWeather(latitude: number, longitude: number): Promise<WeatherData | null> {
  try {
    const general_uri = `https://api.weather.gov/points/${latitude},${longitude}`;
    const response = await fetch(general_uri); 

    if (!response.ok) {
      DeskThing.sendLog(`General NWS HTTP error: ${response.status}`);
      return null;                                                      // Return null to indicate failure
    }
    const data = await response.json();

    const observationStationsURI = data.properties.observationStations; // Get observation stations URI
    const observationResponse = await fetch(observationStationsURI);    // Pull data from API on stations
    const observationData = await observationResponse.json();           // we convert that data to JSON              

    let stationsURI = observationData.observationStations[0];           // We can then extract out the URLs for the nearby stations
    stationsURI += "/observations/latest";                              // We need to get the observations from that station
    const stationResponse = await fetch(stationsURI);    
    const stationData = await stationResponse.json();                   

    const roundedHumidity: string = stationData.properties.relativeHumidity.value.toFixed(2);

    const now = new Date();
    const dateString = now.toISOString();

    const ourWeatherData : WeatherData = {
      temperature: stationData.properties.temperature.value,
      temperature_scale: stationData.properties.temperature.unitCode,
      wind_speed: stationData.properties.windSpeed.value,
      wind_speed_scale: stationData.properties.windSpeed.unitCode,
      wind_direction: degreesToCardinal(stationData.properties.windDirection.value),
      humitidity: roundedHumidity,
      time: dateString,
    }; 

    return ourWeatherData as WeatherData;                                         // Type assertion after checking response.ok
  } catch (error) {
      DeskThing.sendLog(error);
    return null;                                                        // Return null in case of any error
  }
}