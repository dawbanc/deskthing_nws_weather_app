import { DeskThing } from "deskthing-server"

export interface WeatherData {
    temperature: number;
    temperature_scale: string;
    wind_speed: number;
    wind_speed_scale: string;
    //temperature_high: number;                                         // NWS doesn't natively supply daily highs/lows
    //temperature_low: number;                                          // I will need to approximate manually
    humitidity: number;
  }

export async function getWeather(latitude: number, longitude: number): Promise<WeatherData | null> {
  try {
    const general_uri = `https://api.weather.gov/points/${latitude},${longitude}`;
    //DeskThing.sendLog(general_uri);
    const response = await fetch(general_uri); 

    if (!response.ok) {
      DeskThing.sendLog(`General NWS HTTP error: ${response.status}`);
      return null;                                                      // Return null to indicate failure
    }
    const data = await response.json();

    const observationStationsURI = data.properties.observationStations; // Get observation stations URI
    const observationResponse = await fetch(observationStationsURI);    // Pull data from API on stations
    const observationData = await observationResponse.json();           // we convert that data to JSON
    //DeskThing.sendLog(observationStationsURI);
    //DeskThing.sendLog(JSON.stringify(observationData));                 

    let stationsURI = observationData.observationStations[0];           // We can then extract out the URLs for the nearby stations
    stationsURI += "/observations/latest";                              // We need to get the observations from that station
    const stationResponse = await fetch(stationsURI);    
    //DeskThing.sendLog(JSON.stringify(stationResponse));
    const stationData = await stationResponse.json();                   

    const ourWeatherData : WeatherData = {
      temperature: stationData.properties.temperature.value,
      temperature_scale: stationData.properties.temperature.unitCode,
      wind_speed: stationData.properties.windSpeed.value,
      wind_speed_scale: stationData.properties.windSpeed.unitCode,
      humitidity: stationData.properties.relativeHumidity.value,
    }; 

    return ourWeatherData as WeatherData;                                         // Type assertion after checking response.ok
  } catch (error) {
      DeskThing.sendLog(error);
    return null;                                                        // Return null in case of any error
  }
}