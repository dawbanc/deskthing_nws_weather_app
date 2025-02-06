# deskthing_nws_weather_app
Deskthing: National Weather Service Weather App 

A fork of Riprod's weather app (https://github.com/ItsRiprod/Deskthing-Apps/tree/master/weather) that uses the National Weather Service (NWS) api instead of OpenMeteo API to get more accurate weather information in the US.

The app requests data from NWS at the load as well as at the top of the hour.

NOTE: AFAIK this app will only work for weather data within the US. 

## Features

Currently displays:
- Time (in 12 or 24 hour format)
- Temperature (in Farenheit or Celcius)
- Relative Humidity
- Wind speed and direction

## Future Features

Things I would like to display:
- Date
- Day of the week
- Daily High and Low
- Feels Like Data
- Forcast
- Generally make the data prettier
- Photos to Github/Discord Post
- Album Art
- Different Layouts to Highlight Different Things

## Installation

Current release (v0.1.x) was created on v0.10.3 of the deskthing app and v0.10.2 of the client. It is recommended to use these versions or newer. 

Download the release file, (.zip). Then in the DeskThing app, you can click on downloads, then Upload App.
Navigate to the .zip file downloaded, then select Open. 
Initiate the app, then I suggest manually inputting the coordinates you would like to monitor. The location is originally based off of IP so it should be pretty close, but for me it selects a city about 30 miles away. 

## Resources

This was made thanks to all Riprod's hard work on the Deskthing app:    https://github.com/ItsRiprod/DeskThing
The template I used is summarized in another one of their repos:        https://github.com/ItsRiprod/deskthing-template

The weather API used:   https://www.weather.gov/documentation/services-web-api
The location API used:  https://ip-api.com/
