import Title from "./components/Title";
import Temp from "./components/Temp.js";
import FiveDayForecast from "./components/FiveDayForecast.js";
import DailyForecast from "./components/DailyForecast";
import Info from "./components/Info";
import Actionbar from "./components/Actionbar";
import React, { useEffect, useState } from "react";
import { getIconUrl } from "./utils";
import "./App.css";
import DeniedPage from './components/DeniedPage';

const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall`;
const currentUrl = `https://api.openweathermap.org/data/2.5/weather`;
const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast`;

const apiKey = '7ef98c2e3b5b9ceea5c1d9fc071a8c85';//process.env.REACT_APP_API_KEY;

const fetchAll = async(setState, searchParams) => {
  const state = {};
  const getSetter = name => s => state[name] = s;

  console.log(apiKey);
  //first fetch current data, other requests need id and coord
  await fetchApi(currentUrl, getSetter('current'), {
    appid: apiKey,
    ...searchParams,
  });

  const id = state.current.id;
  const {lat, lon} = state.current.coord;
  await fetchApi(forecastUrl, getSetter('forecast'), {
    appid: apiKey,
    exclude: 'current,minutely',
    ...{lat, lon}
  });
  await fetchApi(fiveDayUrl, getSetter('fiveDayForecast'), {
    appid: apiKey,
    'id': id,
  });

  console.log(id, state);
  setState(state);
}

const fetchApi = async(baseUrl, setState, params) => {
  const argsStr = Object.keys(params).map(key => `${key}=${params[key]}`).join('&'); 
  const res = await fetch(
    `${baseUrl}?${argsStr}`, {method: "GET"}
  );

  const json = await res.json();
  setState(json);
}

const fetchCity = (setState, city)=> fetchAll(setState, {q: city});

const fetchLocation = (setState, lat, lon)=> fetchAll(setState, {lat, lon});

function App() {
  const [{current, forecast, fiveDayForecast}, setForecast] = useState({
    current: undefined,
    forecast: undefined,
    fiveDayForecast: undefined,
  });
  /*
  const [currentData, setCurrentData] = useState(undefined);
  const [fiveDayForecast, setFiveDayForecast] = useState(undefined);
  */
  const [loc, setLoc] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [denied, setDenied] = useState(false);

  //Ask for location, called onMount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLoc({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        (err) => setDenied(true),
      );
    } else {
      alert("Geolocation not supported, please enter your city manually");
      setDenied(true);
    }
  }, []);

  //
  useEffect(() => {
    if (!loc) return;    
    fetchLocation(setForecast, loc.lat, loc.lon);
  }, [loc]);

  useEffect(() => {
    if (!city) return;    
    fetchCity(setForecast, city);
  }, [city]);

  console.log(denied);

  if(denied)  return <DeniedPage callback={c => {
    setDenied(false);
    setCity(c);
  }}/>

  if (!current) return <p> loading... </p>;

  const main = current.main;
  return (
    <>
      <div id="page1">
        <div id="top">
          <Title
            icon={getIconUrl(current.weather[0].icon, 4)}
            city={fiveDayForecast.city.name}
            country={fiveDayForecast.city.country}
            description={current.weather[0].description}
          />
          <Actionbar callback={c => setCity(c)}/>
        </div>
        <Temp temp={main.temp} min={main.temp_min} max={main.temp_max} />
        <Info
          wind={current.wind.speed}
          pressure={main.pressure}
          humidity={main.humidity}
        />
        <DailyForecast json={forecast.hourly} />
      </div>
      <div id="page2">
        <h2>5 Day Forecast</h2>
        <FiveDayForecast
          daily={forecast.daily}
          hourly={fiveDayForecast}/>
      </div>
    </>
  );
}

export default App;
