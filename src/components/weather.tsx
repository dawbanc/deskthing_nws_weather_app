

export type WeatherData {
  temperature: number;
  temperature_scale: string;
  wind_speed: number;
  wind_speed_scale: string;
  //temperature_high: number;                                         // NWS doesn't natively supply daily highs/lows
  //temperature_low: number;                                          // I will need to approximate manually
  humitidity: string;
}