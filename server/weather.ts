import { DeskThing } from "deskthing-server"

async function getWeather(latitude: number, longitude: number) {
    const uri = 'https://api.weather.gov/points/${latitude},${longitude}'; // weather.gov API for lat/long
    this.deskthing.sendLog('Fetching data from weather.gov for ${latitude}, ${longitude}');
    const response = await fetch(uri); // fetch data from weather.gov
    if (!response.ok) {
        this.deskthing.sendError('Failed to fetch data from weather.gov: ${response.statusText}');
    }
    const data = response.json();
    this.deskthing.sendLog(JSON.stringify(data, null, 2));
}