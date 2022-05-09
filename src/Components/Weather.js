import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsWind } from "react-icons/bs";
import { BsCloud } from "react-icons/bs";
import { BsWater } from "react-icons/bs";




const Weather = () => {


    const [weather, setWeather] = useState({})
    const [temperature, setTemperature] = useState(0);
    const [isCelsius, setIsCelcius ] = useState(true)
   
 useEffect(() => {

  function success(pos) {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=cc65d347eb745ec214c081b0bbb6a399&units=metric`)
     .then(res => {

       console.log(res);
      setWeather(res.data);
      setTemperature(res.data.main.temp)
     }
     )};

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
   navigator.geolocation.getCurrentPosition(success, error,);

 }, []);



 let changeUnit = () => {

  if(isCelsius){
  
   //Esta es la conversion a Farenheit
  setTemperature(temperature * 9 / 5 + 32 );
  setIsCelcius(false);

  } else {
    
  setTemperature((temperature -32) *5 / 9 );
  setIsCelcius(true);
     //Esta es la conversion a Celcius

  }
 }


return (

  <>
   

<div className='content'>

   <div className='card'>

     <h1>Weather App</h1>


  <div className='info'>

     <h3>{weather.name} {weather.sys?.country}</h3>

     <div className='pressure'>Pressure: {weather.main?.pressure}mb</div>
     &nbsp;
     
     <div className='cardinfo'>
     <div className='windspeed'><BsWind size={25}/> Wind Speed: {weather.wind?.speed}</div>
     <div className='description'><BsCloud size={25}/> "{weather.weather?.[0].description}"</div>
     <div className='sealevel'><BsWater size={25}/> Sea Level: {weather.main?.sea_level} msl</div>
     </div>

    <div className='icon'>
     <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}alt="" />
      <p><button className='button' onClick={changeUnit}>C° / F°</button></p>
      <h3>{temperature.toFixed(1)}°</h3>
    </div>

  </div>

  </div>
  
  </div>
      


        </>
    );
}

export default Weather;

  