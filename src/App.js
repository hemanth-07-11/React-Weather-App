import { useFetch } from './components/useFetch';
import { useState } from 'react';
import SearchForm from './components/SearchForm';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import 'open-weather-icons/dist/css/open-weather-icons.css';

function App() {

  const weatherKey = '46f0c4db101bf29eed000013457f3888';
  const [city, setCity] = useState({name: 'Chennai', lat: 13.0827, lng: 80.2707});
  const { loading, data, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lng}&exclude=hourly,minutely&units=metric&appid=${weatherKey}`
  );

  const renderWeather = () => {
    if(loading)
      return <h1>Loading...</h1>
    else if(error)
      return (
        <>
        <h1>Error</h1>
        <p>{JSON.stringify(error, 2, null)}</p>
        </>
      );
    else{
      return (
        <>
          <CurrentWeather city={city.name} data={data.current} />
          <WeatherForecast data={data.daily.splice(3)}/>
        </>
      );      
    }
  }

  return (
    <div className='container-sm'>
      <SearchForm changeCity={setCity}/>
      {renderWeather()}
    </div>
  );
}

export default App;
