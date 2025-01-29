import React, { useEffect, useState } from 'react'
import { DeskThing, SocketData } from 'deskthing-client'
//import { WeatherData } from './components/weather.tsx'

const App: React.FC = () => {

    const [weatherData, setWeatherData] = useState<string | null>(null);
    const [dateData, setDateData] = useState<string | null>(null);

    useEffect(() => {

        const onWeatherData = async (data: SocketData) => {
            console.log('Received weather data from server!')
            setWeatherData(JSON.stringify(data.payload))
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
            <p className="font-bold text-5xl text-white">NWS-Weather: {dateData && (
                <pre>{dateData}</pre>
            )}</p>
        </div>

    )
}

export default App
