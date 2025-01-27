import React, { useEffect } from 'react'
import { DeskThing, SocketData } from 'deskthing-client'
import { WeatherData } from './components/weather.tsx'

let test: string;

const App: React.FC = () => {

    useEffect(() => {
        const onAppData = async (data: SocketData) => {
            console.log('Received data from the server!')
            console.log(data.app)
            console.log(data.payload)
            test = data.payload;
        }


        const removeListener = DeskThing.on('data', onAppData)


        return () => {
            removeListener()
        }
    })

    return (
        <div className="bg-slate-800 w-screen h-screen flex justify-center items-center">
            <p className="font-bold text-5xl text-white">NWS-Weather</p>
            <p>{test}</p>
        </div>

    )
}

export default App
