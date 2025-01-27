import { DeskThing } from "deskthing-server"

export interface WeatherData {
    temperature: number;
    temperature_scale: string;
    wind_speed: number;
    wind_speed_scale: string;
    temperature_high: number;
    temperature_low: number;
    humitidity: number;
  }

  export async function getWeather(latitude: number, longitude: number): Promise<WeatherData | null> {
    try {
      const general_uri = `https://api.weather.gov/points/${latitude},${longitude}`;
      DeskThing.sendLog(general_uri);
      const response = await fetch(general_uri); 

      if (!response.ok) {
        DeskThing.sendLog(`General NWS HTTP error: ${response.status}`);
        return null;                                                      // Return null to indicate failure
      }
      const data = await response.json();

      const observationStationsURI = data.properties.observationStations; // Get observation stations URI
      const observationResponse = await fetch(observationStationsURI);    // Pull data from API on stations
      const observationData = await observationResponse.json();           // we convert that data to JSON
      DeskThing.sendLog(observationStationsURI);
      DeskThing.sendLog(JSON.stringify(observationData));                 

      let stationsURI = observationData.observationStations[0];           // We can then extract out the URLs for the nearby stations
      stationsURI += "/observations/latest";                              // We need to get the observations from that station
      const stationData = await fetch(stationsURI);    
      DeskThing.sendLog(JSON.stringify(stationData));                   

      return data as WeatherData;                                         // Type assertion after checking response.ok
    } catch (error) {
        DeskThing.sendLog(error);
      return null;                                                        // Return null in case of any error
    }
  }