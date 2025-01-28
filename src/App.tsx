import React, { useEffect, useState } from 'react'
import { DeskThing, SocketData } from 'deskthing-client'
//import { WeatherData } from './components/weather.tsx'

const App: React.FC = () => {

    const [weatherData, setWeatherData] = useState<string | null>(null);

    useEffect(() => {

        const onWeatherData = async (data: SocketData) => {
            console.log('Received data from the server!')
            console.log(data.app)
            console.log(data.payload)
            setWeatherData(JSON.stringify(data.payload))
        };

        const listener = DeskThing.on('weatherData', onWeatherData);

        return () => {
            listener();
        }
    })

    return (
        <div className="bg-slate-800 w-screen h-screen flex justify-center items-center">
            <p className="font-bold text-5xl text-white">NWS-Weather</p>
            {weatherData && (
                <pre className="test-white mt-4">{weatherData}</pre>
            )}
        </div>

    )
}

export default App
