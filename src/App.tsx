import React, { useEffect, useState } from 'react'
import { DeskThing, SocketData } from 'deskthing-client'

const App: React.FC = () => {

    const [temperature_data, setTemperatureData] = useState <string | null>(null);
    const [dateData, setDateData] = useState<string | null>(null);

    useEffect(() => {

        const onWeatherData = async (data: SocketData) => {
            console.log('Received weather data from server!')
            //setWeatherData(data.payload)
            //thisWeather.set_weather(data.payload);

            try {
                const parsed_weather_data = JSON.parse(data.payload);
                setTemperatureData(parsed_weather_data.temperature);
            } catch (error) {
                console.error("Error parsing weather JSON:", error);
            }
        };

        const onDateData = async (data: SocketData) => {
            console.log('Received date data from server!')
            setDateData(data.payload);
        }

        const weatherListener = DeskThing.on('weatherData', onWeatherData);
        const dateListener = DeskThing.on('dateData', onDateData);

        return () => {
            weatherListener();
            dateListener();
        }
    })

    return (
        <div className="bg-slate-800 w-screen h-screen flex justify-center items-center">
            <p className="font-bold text-5xl text-white">NWS-Weather:
            {dateData && (
                <pre className="text-white mt-2">{dateData}</pre>
            )}
            {temperature_data && (
                <pre className="text-white mt-2">{temperature_data}</pre>
            )}
            </p>
        </div>
    )
}

export default App
