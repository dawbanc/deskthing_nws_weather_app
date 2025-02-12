import React, { useEffect, useState, useRef } from 'react'
import { DeskThing, SocketData } from 'deskthing-client'

const App: React.FC = () => {

    const [temperature_data, setTemperatureData] = useState <string | null>(null);
    const [time_data, setTimeData] = useState<string | null>(null);
    const [date_data, setDateData] = useState<string | null>(null);
    const [dotw_data, setDOTWData] = useState<string | null>(null);
    const [last_updated, setLastUpdated] = useState<string | null>(null);
    const [humidity, setHumidity] = useState<string | null>(null);
    const [wind, setWind] = useState<string | null>(null);
    const lastUpdate = useRef(0);

    useEffect(() => {

        const onWeatherData = async (data: SocketData) => {
            console.log('Received weather data from server!')
            try {
                const parsed_weather_data = JSON.parse(data.payload);
                setTemperatureData(parsed_weather_data.temperature);
                setHumidity(parsed_weather_data.humidity);
                setWind(parsed_weather_data.wind);
                setLastUpdated(parsed_weather_data.last_updated);
            } catch (error) {
                console.error("Error parsing weather JSON:", error);
            }
        };

        const onDateData = async (data: SocketData) => {
            console.log('Received date data from server!')
            try {
                const parsed_date_data = JSON.parse(data.payload);
                setTimeData(parsed_date_data.time);
                setDateData(parsed_date_data.date);
                setDOTWData(parsed_date_data.dotw);
            } catch (error) {
                console.error("Error parsing date JSON:", error);
            }
        }

        const weatherListener = DeskThing.on('weatherData', onWeatherData);
        const dateListener = DeskThing.on('dateData', onDateData);

        const getUpdate = () => {
            const currentTime = Date.now();
            if (currentTime - lastUpdate.current >= 1000) {
                DeskThing.send({type: 'get', request: 'update'});
                lastUpdate.current = currentTime;
            }
        }
        if ((temperature_data === null) || (time_data === null)) {
            getUpdate();    // Get initial values at load
        }
        
        return () => {
            weatherListener();
            dateListener();
        }
    })

    return (
        <div className="bg-slate-800 w-screen h-screen flex flex-col"> 
            <div className="flex justify-between items-center"> 
                <div className="flex flex-col items-end pt-16 pl-16">
                    <div className="text-white text-6xl font-bold"> 
                        {time_data && (
                            <span>{time_data}</span>
                        )}
                    </div>
                    <div className="text-white text-xl mt-2"> 
                        {date_data && (
                            <span>{date_data}</span> 
                        )}
                    </div>
                    <div className="text-white text-xl mt-2"> 
                        {dotw_data && (
                            <span>{dotw_data}</span> 
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-end pt-16 pr-16"> 
                    <div className="text-white text-6xl font-bold"> 
                        {temperature_data && (
                            <span>{temperature_data}</span> 
                        )}
                    </div>
                    <div className="text-white text-xl mt-2"> 
                        {humidity && (
                            <span>{humidity}</span> 
                        )}
                    </div>
                    <div className="text-white text-xl mt-2"> 
                        {wind && (
                            <span>{wind}</span> 
                        )}
                    </div>
                </div>
            </div>
        <div className="flex-grow flex justify-center items-center"> </div> 
            <div className="flex justify-between items-end p-4">
                <div className="text-white text-xl">
                    NWS-Weather App
                </div>
                <div className="text-white text-2xs">
                {last_updated && (
                    <span>Weather Last Updated: {last_updated}</span>
                )}
                </div>
            </div>
        </div>
    )
}

export default App
