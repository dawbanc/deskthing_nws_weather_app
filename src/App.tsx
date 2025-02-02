import React, { useEffect, useState } from 'react'
import { DeskThing, SocketData } from 'deskthing-client'

const App: React.FC = () => {

    const [temperature_data, setTemperatureData] = useState <string | null>(null);
    const [time_data, setTimeData] = useState<string | null>(null);
    const [date_data, setDateData] = useState<string | null>(null);
    const [last_updated, setLastUpdated] = useState<string | null>(null);

    useEffect(() => {

        const onWeatherData = async (data: SocketData) => {
            console.log('Received weather data from server!')
            try {
                const parsed_weather_data = JSON.parse(data.payload);
                setTemperatureData(parsed_weather_data.temperature);
                setLastUpdated(parsed_weather_data.last_updated);
            } catch (error) {
                console.error("Error parsing weather JSON:", error);
            }
        };

        const onDateData = async (data: SocketData) => {
            console.log('Received date data from server!')
            try {
                const parsed_date_data = JSON.parse(data.payload);
                //setDateData(parsed_date_data.date);
                setTimeData(parsed_date_data.time);
            } catch (error) {
                console.error("Error parsing date JSON:", error);
            }
        }

        const weatherListener = DeskThing.on('weatherData', onWeatherData);
        const dateListener = DeskThing.on('dateData', onDateData);

        return () => {
            weatherListener();
            dateListener();
        }
    })

    return (
        <div className="bg-slate-800 w-screen h-screen flex flex-col"> 
            <div className="flex justify-between items-center p-10"> 
                <div className="text-white text-6xl font-semibold">
                {time_data && (
                    <span>{time_data}</span>
                )}
                </div>
                <div className="text-white text-6xl font-bold pr-8"> 
                {temperature_data && (
                    <span>{temperature_data}</span> 
                )}
                </div>
            </div>
            <div className="flex-grow flex justify-center items-center"> </div> 
            <div className="flex justify-between items-end p-4">
                <div className="text-white text-xl">
                    NWS-Weather App
                </div>
                <div className="text-white text-sm">
                {last_updated && (
                    <span>Last Updated: {last_updated}</span>
                )}
                </div>
            </div>
        </div>
    )
}

export default App
