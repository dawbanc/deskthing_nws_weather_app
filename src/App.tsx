import React, { useEffect, useState } from 'react'
import { DeskThing, SocketData } from 'deskthing-client'
//import { WeatherData } from './components/weather.tsx'

const App: React.FC = () => {

    const [weatherData, setWeatherData] = useState<string | null>(null);

    useEffect(() => {
        // const onAppData = async (data: SocketData) => {
        //     console.log('Received data from the server!')
        //     console.log(data.app)
        //     console.log(data.payload)
        //     test = data.payload;
        // }


        //const removeListener = DeskThing.on('data', onAppData)
        //DeskThing.on('')

        // const unsubscribe = DeskThing.on('weatherData', (data) => {
        //     setWeatherData(JSON.stringify(data.payload));
        // });

        // DeskThing.on('weatherData', (data) => {
        //     console.log("MY NWS DATA:")
        //     console.log(data.payload);
        //     test = JSON.stringify(data.payload);
        // })

        const onWeatherData = async (data: SocketData) => {
            console.log('Received data from the server!')
            console.log(data.app)
            console.log(data.payload)
            setWeatherData(JSON.stringify(data.payload))
        };

        const listener = DeskThing.on('weatherData', onWeatherData);

        return () => {
            //removeListener()
            //unsubscribe();
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
