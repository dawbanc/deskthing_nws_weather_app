import React, { useEffect, useState } from 'react'

// export type WeatherData {
//   temperature: number;
//   temperature_scale: string;
//   wind_speed: number;
//   wind_speed_scale: string;
//   //temperature_high: number;                                         // NWS doesn't natively supply daily highs/lows
//   //temperature_low: number;                                          // I will need to approximate manually
//   humitidity: string;
// }

export const [weatherData, setWeatherData] = useState<string | null>(null);
export const [temperature, setTemperature] = useState<string | null>(null); 

export class Weather {
  private weather: string | null = "";
  private temperature: string | null = "";

  constructor() {
  }

  public set_weather(weather_in: string){
    this.weather = weather_in;
    const weather_parsed = JSON.parse(weather_in);
    this.temperature = weather_parsed.temperature;
  }

  get_temperature(): string | null {
    return this.temperature;
  }
}